"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, RefreshCw, Search, Download, Eye, CheckCircle } from "lucide-react"
import PatientLayout from "@/components/patient/PatientLayout"
import ContractDetailModal from "@/components/contracts/ContractDetailModal"
import { getPatientContracts } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function ContractHistory() {
  const [contracts, setContracts] = useState<ContractResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Lịch sử hợp đồng" },
  ]

  const fetchContracts = async () => {
    setLoading(true)
    setError(null)
    try {
      // Truyền isSigned: true để lấy hợp đồng đã ký
      const response = await getPatientContracts({ page: 0, size: 100, isSigned: true })
      setContracts(response.payload.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải lịch sử hợp đồng")
      toast.error("Không thể tải lịch sử hợp đồng")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContracts()
  }, [])

  const handleViewContract = (contract: ContractResponse) => {
    setSelectedContract(contract)
    setIsDetailModalOpen(true)
  }

  const handleDownloadContract = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId)
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, '_blank')
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.treatment?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.treatment?.protocol?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <PatientLayout title="Lịch sử hợp đồng" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Hợp đồng đã ký
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Danh sách tất cả hợp đồng điều trị đã được ký
            </p>
          </div>
          <Button 
            onClick={fetchContracts} 
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>


        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Tìm kiếm theo mô tả điều trị, protocol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Contracts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Danh sách hợp đồng ({filteredContracts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
                  <p>Đang tải lịch sử hợp đồng...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <FileText className="h-12 w-12 mx-auto mb-2" />
                  <p>{error}</p>
                </div>
                <Button onClick={fetchContracts} variant="outline">
                  Thử lại
                </Button>
              </div>
            )}

            {!loading && !error && filteredContracts.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mô tả điều trị</TableHead>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">
                          {contract.treatment?.description || "Điều trị không xác định"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {contract.treatment?.protocol?.title || "Chưa xác định"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Đã ký
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewContract(contract)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadContract(contract.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {!loading && !error && filteredContracts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có hợp đồng đã ký
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Không tìm thấy hợp đồng phù hợp với từ khóa tìm kiếm" 
                    : "Danh sách hợp đồng đã ký sẽ xuất hiện tại đây"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      <ContractDetailModal
        contract={selectedContract}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedContract(null)
        }}
      />
    </PatientLayout>
  )
}