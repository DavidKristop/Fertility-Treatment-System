import StaffLayout from "@/components/staff/StaffLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const appointments = [
	{
		id: 1,
		patient: "Nguyễn Văn A",
		doctor: "BS. Trần Minh",
		time: "08:30 23/07/2025",
		status: "Đã xác nhận",
	},
	{
		id: 2,
		patient: "Trần Thị B",
		doctor: "BS. Trần Minh",
		time: "09:00 23/07/2025",
		status: "Chờ xác nhận",
	},
	{
		id: 3,
		patient: "Phạm Văn C",
		doctor: "BS. Lê Hoa",
		time: "10:00 23/07/2025",
		status: "Đã xác nhận",
	},
]

export default function StaffDashboard() {
	return (
		<StaffLayout
			title="Trang tổng quan"
			breadcrumbs={[{ label: "Trang tổng quan" }]}
		>
			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Lịch hẹn bệnh nhân & bác sĩ</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{appointments.map((appt) => (
							<div
								key={appt.id}
								className="flex items-center justify-between p-3 border rounded-lg"
							>
								<div>
									<div className="font-medium">{appt.patient}</div>
									<div className="text-sm text-muted-foreground">
										Bác sĩ: {appt.doctor}
									</div>
									<div className="text-xs text-gray-500">{appt.time}</div>
								</div>
								<Badge
									variant={
										appt.status === "Đã xác nhận" ? "default" : "secondary"
									}
								>
									{appt.status}
								</Badge>
							</div>
						))}
						{appointments.length === 0 && (
							<div className="text-gray-500 italic">Không có lịch hẹn nào</div>
						)}
					</CardContent>
				</Card>
			</div>
		</StaffLayout>
	)
}