import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

interface ContractHeaderProps {
  title: string
  description: string
  onRefresh: () => void
  loading: boolean
}

export default function ContractHeader({ title, description, onRefresh, loading }: ContractHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <Button 
        onClick={onRefresh} 
        disabled={loading}
        variant="outline"
        size="sm"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
        Làm mới
      </Button>
    </div>
  )
}