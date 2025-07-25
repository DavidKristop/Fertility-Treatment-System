import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Không tìm thấy trang</h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm thời không khả dụng.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
