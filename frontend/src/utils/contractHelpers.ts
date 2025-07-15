type ContractStatusFilter = "all" | "pending" | "signed"

export const getPageTitle = (statusFilter: ContractStatusFilter): string => {
  switch (statusFilter) {
    case "pending":
      return "Hợp đồng chờ ký"
    case "signed":
      return "Hợp đồng đã ký"
    default:
      return "Quản lý hợp đồng"
  }
}

export const getPageDescription = (statusFilter: ContractStatusFilter, userRole: "patient" | "manager"): string => {
  const roleText = userRole === "patient" ? "của bạn" : "trong hệ thống"

  switch (statusFilter) {
    case "pending":
      return `Danh sách các hợp đồng đang chờ ký ${roleText}`
    case "signed":
      return `Danh sách các hợp đồng đã được ký ${roleText}`
    default:
      return `Quản lý tất cả hợp đồng điều trị ${roleText}`
  }
}

export const getEmptyStateMessage = (statusFilter: ContractStatusFilter, userRole: "patient" | "manager"): string => {
  switch (statusFilter) {
    case "pending":
      return userRole === "patient" ? "Hợp đồng chờ ký" : "Không có hợp đồng nào đang chờ ký"
    case "signed":
      return userRole === "patient" ? "Bạn chưa có hợp đồng nào đã ký" : "Không có hợp đồng nào đã được ký"
    default:
      return userRole === "patient" ? "Bạn chưa có hợp đồng điều trị nào" : "Chưa có hợp đồng nào trong hệ thống"
  }
}

export const filterContracts = (contracts: any[], searchTerm: string, statusFilter: ContractStatusFilter) => {
  let filtered = contracts

  // Filter by status
  if (statusFilter === "pending") {
    filtered = filtered.filter((contract) => !contract.signed)
  } else if (statusFilter === "signed") {
    filtered = filtered.filter((contract) => contract.signed)
  }

  // Filter by search term
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(
      (contract) =>
        contract.treatment?.description?.toLowerCase().includes(term) ||
        contract.treatment?.protocol?.title?.toLowerCase().includes(term) ||
        contract.treatment?.doctor?.fullName?.toLowerCase().includes(term) ||
        contract.treatment?.patient?.fullName?.toLowerCase().includes(term),
    )
  }

  return filtered
}
