import { useLocation, useNavigate } from "react-router-dom"
import { useCallback } from "react"

interface UseUrlParamsReturn {
  getParam: (key: string) => string | null
  updateParams: (params: Record<string, string | null>) => void
  clearParams: () => void
  getAllParams: () => Record<string, string>
}

export function useUrlParams(): UseUrlParamsReturn {
  const location = useLocation()
  const navigate = useNavigate()

  // Get a specific parameter
  const getParam = useCallback(
    (key: string): string | null => {
      const searchParams = new URLSearchParams(location.search)
      return searchParams.get(key)
    },
    [location.search],
  )

  // Update multiple parameters
  const updateParams = useCallback(
    (params: Record<string, string | null>) => {
      const searchParams = new URLSearchParams(location.search)

      // Update or remove parameters
      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          searchParams.delete(key)
        } else {
          searchParams.set(key, value)
        }
      })

      // Create new URL
      const search = searchParams.toString()
      const query = search ? `?${search}` : ""

      // Navigate to new URL
      navigate(`${location.pathname}${query}`, { replace: true })
    },
    [location.search, location.pathname, navigate],
  )

  // Clear all parameters
  const clearParams = useCallback(() => {
    navigate(location.pathname, { replace: true })
  }, [location.pathname, navigate])

  // Get all parameters as an object
  const getAllParams = useCallback((): Record<string, string> => {
    const searchParams = new URLSearchParams(location.search)
    const params: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [location.search])

  return {
    getParam,
    updateParams,
    clearParams,
    getAllParams,
  }
}