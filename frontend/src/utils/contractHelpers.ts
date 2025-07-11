type ContractStatusFilter = "all" | "pending" | "signed"

export const getPageTitle = (statusFilter: ContractStatusFilter) => {
  switch (statusFilter) {
    case "pending":
      return "Hợp đồng chờ ký"
    case "signed":
      return "Hợp đồng đã ký"
    default:
      return "Tất cả hợp đồng"
  }
}

export const getPageDescription = (statusFilter: ContractStatusFilter, userRole: "patient" | "manager") => {
  switch (statusFilter) {
    case "pending":
      return userRole === "patient"
        ? "Danh sách hợp đồng điều trị cần được ký để bắt đầu quá trình điều trị"
        : "Danh sách hợp đồng điều trị đang chờ bệnh nhân ký"
    case "signed":
      return "Danh sách tất cả hợp đồng điều trị đã được ký"
    default:
      return userRole === "patient"
        ? "Quản lý tất cả hợp đồng điều trị của bạn"
        : "Quản lý tất cả hợp đồng điều trị của bệnh nhân"
  }
}