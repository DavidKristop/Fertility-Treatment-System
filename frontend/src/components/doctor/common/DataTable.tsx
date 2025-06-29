import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { LucideIcon } from "lucide-react"

interface Column<T> {
  key: string
  label: string
  className?: string
  render?: (item: T) => React.ReactNode
}

interface PaginationConfig {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

interface DataTableProps<T> {
  title?: string
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  emptyMessage?: string
  emptyIcon?: LucideIcon
  pagination?: PaginationConfig
  actions?: React.ReactNode
  className?: string
}

export default function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  loading = false,
  emptyMessage = "Không có dữ liệu",
  emptyIcon: EmptyIcon,
  pagination,
  actions,
  className = "",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải dữ liệu...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      {title && (
        <CardHeader className="bg-white py-4 px-6 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">{data.length} mục</div>
              {actions}
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        {data.length === 0 ? (
          <div className="text-center py-8">
            {EmptyIcon && <EmptyIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />}
            <h3 className="text-lg font-medium text-muted-foreground mb-2">{emptyMessage}</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key} className={column.className}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id || index} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <TableCell key={column.key} className={column.className}>
                        {column.render ? column.render(item) : item[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
