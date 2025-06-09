import { useState, useEffect, useCallback } from "react"

interface PaginationOptions<T> {
  fetchFn: (page: number) => Promise<{ data: T[]; total: number; totalPages: number }>
  dependencies?: any[]
  initialPage?: number
  onPageChange?: (page: number) => void
}

interface PaginationResult<T> {
  data: { data: T[]; total: number; } | null
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
  goToPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  refresh: () => void
}

export function usePagination<T = any>({
  fetchFn,
  dependencies = [],
  initialPage = 1,
  onPageChange,
}: PaginationOptions<T>): PaginationResult<T> {
  const [data, setData] = useState<{ data: T[]; total: number; totalPages: number } | null>(null)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch data function
  const fetchData = useCallback(
    async (page: number) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchFn(page)
        setData(result)
        setTotalPages(result.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setData(null)
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    },
    [fetchFn],
  )

  // Effect to fetch data when dependencies change
  useEffect(() => {
    // Reset to page 1 when dependencies change (except on initial load)
    if (dependencies.length > 0) {
      setCurrentPage(1)
      fetchData(1)
    } else {
      fetchData(currentPage)
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

  // Effect to fetch data when page changes
  useEffect(() => {
    if (dependencies.length === 0 || currentPage === 1) {
      fetchData(currentPage)
    }
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  // Navigation functions
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page)
        onPageChange?.(page)
      }
    },
    [currentPage, totalPages, onPageChange],
  )

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1
      setCurrentPage(newPage)
      onPageChange?.(newPage)
    }
  }, [currentPage, totalPages, onPageChange])

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1
      setCurrentPage(newPage)
      onPageChange?.(newPage)
    }
  }, [currentPage, onPageChange])

  const refresh = useCallback(() => {
    fetchData(currentPage)
  }, [fetchData, currentPage])

  return {
    data,
    currentPage,
    totalPages,
    isLoading,
    error,
    goToPage,
    nextPage,
    prevPage,
    refresh,
  }
}
