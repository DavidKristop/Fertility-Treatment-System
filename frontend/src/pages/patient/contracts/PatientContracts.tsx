"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PatientLayout from "@/components/patient/PatientLayout"
import ContractHeader from "@/components/contracts/ContractHeader"
import ContractFilters from "@/components/contracts/ContractFilters"
import ContractList from "@/components/contracts/ContractList"
import ContractSignModal from "@/components/contracts/ContractSignModal"
import { getPatientContracts } from "@/api/contract"
import { useContractManagement } from "@/hooks/useContractManagement"
import { usePatientContractActions } from "@/hooks/usePatientContractActions"
import { getPageTitle, getPageDescription } from "@/utils/contractHelpers"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function PatientContracts() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Business logic hooks
  const contractManager = useContractManagement({
    fetchFunction: getPatientContracts,
    userRole: "patient"
  })

  const patientActions = usePatientContractActions(() => 
    contractManager.fetchContracts(contractManager.currentPage)
  )

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Hợp đồng điều trị" },
  ]

  const handleViewContract = (contract: ContractResponse) => {
    navigate(`/patient/contracts/${contract.id}`)
  }

  const handleDownloadContract = (contractId: string) => {
    const contract = contractManager.contracts.find(c => c.id === contractId)
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, '_blank')
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  return (
    <PatientLayout title={getPageTitle(contractManager.statusFilter)} breadcrumbs={breadcrumbs}>
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
          onSignContract={(contractId) => patientActions.handleSignContract(contractId, contractManager.contracts)}
          onDownloadContract={handleDownloadContract}
          onPageChange={contractManager.handlePageChange}
          onRefresh={() => contractManager.fetchContracts(contractManager.currentPage)}
          showPatientInfo={false}
          userRole="patient"
        />
      </div>

      {/* Modals */}
      <ContractSignModal
        contract={patientActions.signingContract}
        isOpen={patientActions.isSignModalOpen}
        onClose={patientActions.closeSignModal}
        onConfirm={patientActions.handleConfirmSign}
        isLoading={patientActions.isSigningLoading}
      />
    </PatientLayout>
  )
}
