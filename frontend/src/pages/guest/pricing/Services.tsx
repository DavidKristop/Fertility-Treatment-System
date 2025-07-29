import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ProtocolCard from "@/components/layout/ProtocolCard"
import { getActiveProtocols } from "@/api/service"
import type { ProtocolResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function Services() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [protocols, setProtocols] = useState<ProtocolResponse[]>([])
  const [totalPages, setTotalPages] = useState(0)

  const fetchProtocols = async () => {
    try {
      setLoading(true)
      const response = await getActiveProtocols(page, 6, search)
      setProtocols(response.payload.content)
      setTotalPages(response.payload.totalPages)
    } catch (error) {
      console.error("Error fetching protocols:", error)
      toast.error("Không thể tải danh sách gói điều trị")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProtocols()
  }, [page, search])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#004c77] mb-4">Bảng Giá Điều Trị</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tham khảo chi tiết các gói điều trị của chúng tôi. Giá có thể thay đổi tùy theo từng trường hợp cụ thể.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <Input
            className="bg-white border-2 border-gray-400 shadow-md"
            placeholder="Tìm kiếm gói điều trị..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
          />
        </div>

        {loading ? (
          <div className="text-center py-8">Đang tải...</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {protocols.map((protocol) => (
                <ProtocolCard key={protocol.id} protocol={protocol} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-10">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                >
                  Trang trước
                </Button>
                <span className="px-4 py-2 text-gray-700">
                  {page + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages - 1}
                >
                  Trang sau
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}