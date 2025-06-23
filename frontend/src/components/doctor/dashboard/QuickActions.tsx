import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, TestTube, Users, Activity } from "lucide-react"
import { Link } from "react-router-dom"

export default function QuickActions() {
  const quickActions = [
    {
      title: "Tạo lịch khám",
      description: "Đặt lịch khám mới cho bệnh nhân",
      icon: Calendar,
      href: "/doctor/appointments/calendar",
      color: "bg-blue-500",
    },
    {
      title: "Thêm bệnh nhân",
      description: "Thêm thông tin bệnh nhân mới",
      icon: Users,
      href: "/doctor/patients",
      color: "bg-green-500",
    },
    {
      title: "Ghi nhận kết quả",
      description: "Ghi nhận kết quả xét nghiệm",
      icon: TestTube,
      href: "/doctor/results/record",
      color: "bg-purple-500",
    },
    {
      title: "Kế hoạch điều trị",
      description: "Tạo kế hoạch điều trị mới",
      icon: Activity,
      href: "/doctor/treatment-plans",
      color: "bg-orange-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Thao tác nhanh
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:bg-gray-50">
                <div className="flex items-center gap-2 w-full">
                  <div className={`p-2 rounded-lg ${action.color} text-white`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
