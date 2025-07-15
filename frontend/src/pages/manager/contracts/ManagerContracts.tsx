"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ManagerLayout from "@/components/manager/ManagerLayout"
import ContractHeader from "@/components/contracts/ContractHeader"
import ContractFilters from "@/components/contracts/ContractFilters"
import ContractList from "@/components/contracts/ContractList"
import { getContracts } from "@/api/contract"
import { useContractManagement } from "@/hooks/useContractManagement"
import { getPageTitle, getPageDescription } from "@/utils/contractHelpers"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function ManagerContracts() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Business logic hook
  const contractManager = useContractManagement({
    fetchFunction: getContracts,
    userRole: "manager",
  })

  const breadcrumbs = [{ label: "Trang tổng quan", path: "/manager/dashboard" }, { label: "Quản lý hợp đồng" }]

  const handleViewContract = (contract: ContractResponse) => {
    navigate(`/manager/contracts/${contract.id}`)
  }

  const handleDownloadContract = (contractId: string) => {
    const contract = contractManager.contracts.find((c) => c.id === contractId)
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, "_blank")
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  return (
    <ManagerLayout title={getPageTitle(contractManager.statusFilter)} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <ContractHeader
          title={getPageTitle(contractManager.statusFilter)}
          description={getPageDescription(contractManager.statusFilter, "manager")}
          onRefresh={() => contractManager.fetchContracts(contractManager.currentPage)}
          loading={contractManager.loading}
        />

        <ContractFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={contractManager.statusFilter}
          onStatusFilterChange={contractManager.setStatusFilter}
          searchPlaceholder="Tìm kiếm theo tên bệnh nhân, bác sĩ, hoặc phác đồ..."
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
          onDownloadContract={handleDownloadContract}
          onPageChange={contractManager.handlePageChange}
          onRefresh={() => contractManager.fetchContracts(contractManager.currentPage)}
          showPatientInfo={true}
          userRole="manager"
        />
      </div>
    </ManagerLayout>
  )
}
