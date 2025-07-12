import { useState, useCallback } from "react"
import { toast } from "react-toastify"
import { signContract } from "@/api/contract"
import type { ContractResponse } from "@/api/types"

export const usePatientContractActions = (refreshContracts: () => void) => {
  const [isSignModalOpen, setIsSignModalOpen] = useState(false)
  const [signingContract, setSigningContract] = useState<ContractResponse | null>(null)
  const [isSigningLoading, setIsSigningLoading] = useState(false)

  const handleSignContract = useCallback((contractId: string, contracts: ContractResponse[]) => {
    const contract = contracts.find(c => c.id === contractId)
    if (contract) {
      setSigningContract(contract)
      setIsSignModalOpen(true)
    }
  }, [])

  const handleConfirmSign = useCallback(async (contractId: string) => {
    setIsSigningLoading(true)
    try {
      await signContract(contractId)
      toast.success("Ký hợp đồng thành công!")
      setIsSignModalOpen(false)
      setSigningContract(null)
      refreshContracts()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi khi ký hợp đồng")
    } finally {
      setIsSigningLoading(false)
    }
  }, [refreshContracts])

  const closeSignModal = useCallback(() => {
    setIsSignModalOpen(false)
    setSigningContract(null)
  }, [])

  return {
    isSignModalOpen,
    signingContract,
    isSigningLoading,
    handleSignContract,
    handleConfirmSign,
    closeSignModal
  }
}