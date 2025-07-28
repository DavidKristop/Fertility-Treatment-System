import type { SidebarItem } from "@/api/types";
import { LayoutDashboard, Calendar, CalendarCheck, CalendarPlus, Activity, FileSignature, Pill, CreditCard, Bell, User, ClipboardList, AlertTriangle, BarChart, FileText, MessageSquare, PlusIcon, Settings, Users, DollarSign, ListCollapse, Plus } from "lucide-react";

//Patient
export const patientSidebarItemsProp: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Trang tổng quan",
      icon: LayoutDashboard,
      path: "/patient/dashboard",
    },
    {
      id: "appointments",
      label: "Lịch hẹn",
      icon: Calendar,
      children: [
        {
          id: "schedules",
          label: "Lịch khám",
          icon: CalendarCheck,
          path: "/patient/appointments/schedules",
        },
        {
          id: "schedule-appointment",
          label: "Đặt lịch hẹn",
          icon: CalendarPlus,
          path: "/patient/appointments/schedule",
        },
        {
          id: "my-requests",
          label: "Xem lịch hẹn đặt",
          icon: CalendarCheck,
          path: "/patient/appointments/my-request"
        }
      ],
    },
    {
      id: "treatment",
      label: "Kế hoạch điều trị",
      icon: Activity,
      path: "/patient/treatment",
    },
    {
      id: "contracts",
      label: "Hợp đồng",
      icon: FileSignature,
      path: "/patient/contracts",
    },
    {
      id: "assigned-drugs",
      label: "Đơn thuốc",
      icon: Pill,
      path: "/patient/assigned-drugs"
    },
    {
      id: "payments",
      label: "Thanh toán & Hóa đơn",
      icon: CreditCard,
      path: "/patient/payments",
    },
    {
      id: "notifications",
      label: "Thông báo",
      icon: Bell,
      path: "/patient/notifications",
    },
    {
      id: "profile",
      label: "Hồ sơ & Cài đặt",
      icon: User,
      path: "/patient/profile",
    },
  ]

//Doctor

export const doctorSidebarItemsProp: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Trang tổng quan",
      icon: LayoutDashboard,
      path: "/doctor/dashboard",
    },
  
    {
      id: "schedule",
      label: "Lịch khám",
      icon: Calendar,
      path: "/doctor/schedule",
    },
  
    {
      id: "assigned-drugs",
      label: "Đơn thuốc",
      icon: Pill,
      path: "/doctor/assigned-drugs",
    },
  
    {
      id: "pending-approvals",
      label: "Chờ duyệt",
      icon: ClipboardList,
      path: "/doctor/pending",
    },
  
    {
      id: "treatment-plans",
      label: "Kế hoạch điều trị",
      icon: Activity,
      path: "/doctor/treatment-plans",
    },
]

export const admindSideBarItemsProp: SidebarItem[] = [
    {
      id: "users",
      label: "Quản lý người dùng",
      icon: Users,
      path: "/admin/manage-users",
    },
    {
      id: "account",
      label: "Tạo tài khoản",
      icon: User,
      children: [
        {
          id: "account-manager",
          label: "Tạo tài khoản Quản lý",
          icon: PlusIcon,
          path: "/admin/create-manager",
        },
      ],
    },
    {
      id: "profile",
      label: "Hồ sơ & Cài đặt",
      icon: User,
      path: "/admin/profile",
    },
]

export const managerSideBarItemProps: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Trang tổng quan",
      icon: LayoutDashboard,
      path: "/manager/dashboard",
    },
    {
      id: "protocol",
      label: "Phác đồ điều trị",
      icon: FileText,
      children: [
        {
          id: "createprotocols",
          label: "Tạo phác đồ điều trị",
          icon: Plus,
          path: "/manager/createprotocols",
        },
        {
          id: "protocols",
          label: "Danh sách phác đồ điều trị",
          icon: ListCollapse,
          path: "/manager/protocols",
        },
      ],
    },
    {
      id: "drugsAndServicesManagement",
      label: "Quản lý thuốc & Dịch vụ",
      icon: FileText,
      children: [
        {
          id: "drugs",
          label: "Quản lý thuốc",
          icon: Pill,
          path: "/manager/drugs",
        },
        {
          id: "services",
          label: "Quản lý dịch vụ",
          icon: FileText,
          path: "/manager/services",
        },
      ],
    },
    {
      id: "contracts",
      label: "Hợp đồng",
      icon: FileText,
      path: "/manager/contracts",
    },
    {
      id: "create-doctor",
      label: "Tạo tài khoản bác sĩ",
      icon: User,
      path: "/manager/doctors/create",
    },
    {
      id: "profile",
      label: "Hồ sơ & Cài đặt",
      icon: User,
      path: "/manager/profile",
    },
];

//staff
export const staffSidebarItemsProp: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Trang tổng quan",
    icon: LayoutDashboard,
    path: "/staff/dashboard",
  },

  {
    id: "assigned-drugs",
    label: "Quản lý đơn thuốc",
    icon: FileText,
    path: "/staff/assigned-drugs",
  },

  {
    id: "payments",
    label: "Quản lý thanh toán",
    icon: DollarSign,
    path: "/staff/payments",
  },

  {
    id: "create-doctor",
    label: "Tạo tài khoản bác sĩ",
    icon: Plus,
    path: "/staff/doctors/create",
  },
  {
    id: "profile",
    label: "Hồ sơ & Cài đặt",
    icon: User,
    path: "/staff/profile",
  },
];