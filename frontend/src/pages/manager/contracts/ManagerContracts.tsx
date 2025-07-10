import { useState } from "react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import ContractHeader from "@/components/contracts/ContractHeader"
import ContractFilters from "@/components/contracts/ContractFilters"
import ContractList from "@/components/contracts/ContractList"
import ContractDetailModal from "@/components/contracts/ContractDetailModal"
import { getContracts } from "@/api/contract"
import { useContractManagement } from "@/hooks/useContractManagement"
import { getPageTitle, getPageDescription } from "@/utils/contractHelpers"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function ManagerContracts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Business logic hook
  const contractManager = useContractManagement({
    fetchFunction: getContracts,
    userRole: "manager"
  })

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý hợp đồng" },
  ]

  const handleViewContract = (contract: ContractResponse) => {
    setSelectedContract(contract)
    setIsDetailModalOpen(true)
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

      {/* Detail Modal */}
      <ContractDetailModal
        contract={selectedContract}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedContract(null)
        }}
        showPatientInfo={true}
        userRole="manager"
      />
    </ManagerLayout>
  )
}