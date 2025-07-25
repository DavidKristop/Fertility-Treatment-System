"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ContractHeader from "@/components/contracts/ContractHeader"
import ContractFilters from "@/components/contracts/ContractFilters"
import ContractList from "@/components/contracts/ContractList"
import { getPatientContracts } from "@/api/contract"
import { useContractManagement } from "@/hooks/useContractManagement"
import { getPageTitle, getPageDescription } from "@/utils/contractHelpers"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

export default function PatientContracts() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  // Business logic hook
  const contractManager = useContractManagement({
    fetchFunction: getPatientContracts,
    userRole: "patient",
  })

  const handleViewContract = (contract: ContractResponse) => {
    navigate(`/patient/contracts/${contract.id}`)
  }

  const handleSignContract = (contractId: string) => {
    navigate(`/patient/contracts/${contractId}/sign`)
  }

  const handleDownloadContract = (contractId: string) => {
    const contract = contractManager.contracts.find((c) => c.id === contractId)
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, "_blank")
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  useEffect(()=>{
    setTitle("Hợp đồng điều trị")
    setBreadCrumbs([{ label: "Trang tổng quan", path: "/patient/dashboard" },
      { label: "Hợp đồng điều trị" }])
  },[])

  return (
    <div className="space-y-6">
      <ContractHeader
        title={getPageTitle(contractManager.statusFilter)}
        description={getPageDescription(contractManager.statusFilter, "patient")}
        onRefresh={() => contractManager.fetchContracts(contractManager.currentPage)}
        loading={contractManager.loading}
      />

      <ContractFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={contractManager.statusFilter}
        onStatusFilterChange={contractManager.setStatusFilter}
        searchPlaceholder="Tìm kiếm theo mô tả điều trị, protocol, hoặc bác sĩ..."
      />

      <ContractList
        contracts={contractManager.contracts}
        loading={contractManager.loading}
        error={contractManager.error}
        statusFilter={contractManager.statusFilter}
        searchTerm={searchTerm}
        currentPage={contractManager.currentPage}
        totalPages={contractManager.totalPages}
        totalElements={contractManager.totalElements}
        onViewContract={handleViewContract}
        onSignContract={handleSignContract}
        onDownloadContract={handleDownloadContract}
        onPageChange={contractManager.handlePageChange}
        onRefresh={() => contractManager.fetchContracts(contractManager.currentPage)}
        showPatientInfo={false}
        userRole="patient"
      />
    </div>
  )
}
