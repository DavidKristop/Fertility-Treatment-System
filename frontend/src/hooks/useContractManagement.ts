import { useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import type { ContractResponse } from "@/api/types"

type ContractStatusFilter = "all" | "pending" | "signed" 

interface UseContractManagementProps {
  fetchFunction: (params: any) => Promise<any>
  userRole: "patient" | "manager"
}

export const useContractManagement = ({ fetchFunction, userRole }: UseContractManagementProps) => {
  const [contracts, setContracts] = useState<ContractResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<ContractStatusFilter>("all")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  
  const pageSize = 10

  // Helper function to check if contract is expired
  const isContractExpired = useCallback((contract: ContractResponse): boolean => {
    return !contract.signed && new Date(contract.signDeadline) <= new Date()
  }, [])

  // Helper function to get contract status (excluding expired)
  const getContractStatus = useCallback((contract: ContractResponse): "pending" | "signed" => {
    if (contract.signed) return "signed"
    return "pending"
  }, [])

  const fetchContracts = useCallback(async (page = 0) => {
    setLoading(true)
    setError(null)
    try {
      const [signedResponse, unsignedResponse] = await Promise.all([
        fetchFunction({ page: 0, size: 100, isSigned: true }),
        fetchFunction({ page: 0, size: 100, isSigned: false })
      ])

      const allContracts = [
        ...signedResponse.payload.content,
        ...unsignedResponse.payload.content
      ]

      // Lọc bỏ hợp đồng hết hạn
      const validContracts = allContracts.filter(contract => !isContractExpired(contract))

      const sortedContracts = validContracts.sort((a, b) => 
        new Date(b.signDeadline).getTime() - new Date(a.signDeadline).getTime()
      )

      // Apply status filter
      let filteredContracts = sortedContracts
      if (statusFilter !== "all") {
        filteredContracts = sortedContracts.filter(contract => 
          getContractStatus(contract) === statusFilter
        )
      }

      const startIndex = page * pageSize
      const endIndex = startIndex + pageSize
      const paginatedContracts = filteredContracts.slice(startIndex, endIndex)

      setContracts(paginatedContracts)
      setTotalElements(filteredContracts.length)
      setTotalPages(Math.ceil(filteredContracts.length / pageSize))
      setCurrentPage(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải danh sách hợp đồng")
      toast.error("Không thể tải danh sách hợp đồng")
    } finally {
      setLoading(false)
    }
  }, [fetchFunction, statusFilter, pageSize, getContractStatus, isContractExpired])

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchContracts(newPage)
    }
  }, [totalPages, fetchContracts])

  useEffect(() => {
    fetchContracts(0)
  }, [statusFilter, fetchContracts])

  return {
    contracts,
    loading,
    error,
    statusFilter,
    setStatusFilter,
    currentPage,
    totalPages,
    totalElements,
    fetchContracts,
    handlePageChange,
    getContractStatus,
    isContractExpired
  }
}