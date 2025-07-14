import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback } from "react";
import type { ScheduleDetailResponse, ScheduleServiceSetRequest, ScheduleSetRequest, ServiceResponse, TreatmentScheduleResponse, TreatmentServiceResponse } from "@/api/types";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import { Views } from "react-big-calendar";
import { useFormik } from "formik";
import { scheduleSetRequestSchema } from "@/lib/validations/auth";
import { getDoctorScheduleInAMonth } from "@/api/schedule";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import { getServices } from "@/api/service";
import { Trash } from "lucide-react";

interface ScheduleCreateDialogProps {
  isOpen: boolean;
  unsetServices: TreatmentServiceResponse[];
  onClose: () => void;
}

export default function ScheduleCreateDialog({
  isOpen,
  unsetServices,
  onClose,
}: ScheduleCreateDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    undefined
  );
  const [schedules,setSchedules] = useState<ScheduleDetailResponse[]>([])
  const [unsetServicesState,setUnsetServicesState] = useState<ScheduleServiceSetRequest[]>(unsetServices.map((service)=>({
    ...service,
    isUnset:true,
    inputId:crypto.randomUUID(),
  })))

  const [searchServiceInput,setSearchServiceInput] = useState<string>("")
  const [services,setServices] = useState<ServiceResponse[]>([])

  const formik = useFormik<ScheduleSetRequest>({
    validationSchema: scheduleSetRequestSchema,
    initialValues:{
        scheduleId: "",
        appointmentDateTime: "",
        title: "",
        estimatedTime: "",
        scheduleServices: []
    },
    onSubmit: (values) => {
      // Handle form submission
    }
  })

  const fetchServices =useCallback(async (searchServiceInput:string) => {
    try {
      const res = await getServices({name:searchServiceInput});
      setServices(res?.payload?.content || []);
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Lỗi khi tải danh sách dịch vụ");
    }
  }, []);

  const fetchSchedules =useCallback(async (startDate:Date, endDate:Date) => {
    try {
      const res = await getDoctorScheduleInAMonth(startDate, endDate, ["PENDING"]);
      setSchedules(res.payload || []);
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Lỗi khi tải lịch hẹn");
    }
  }, []); 
  
  const handleRemoveService = useCallback((service: ScheduleServiceSetRequest) => {
    formik.setFieldValue(
      "scheduleServices",
      formik.values.scheduleServices.filter((s) => s.inputId !== service.inputId)
    );
    if (service.isUnset) {
      setUnsetServicesState((prev) => [...prev, service]);
    }
  }, []);

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày hẹn");
      return;
    }

    formik.handleSubmit();
    onClose();
  };

  useEffect(()=>{
    fetchServices(searchServiceInput);
  },[searchServiceInput])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{maxWidth: 1000}}>
        <DialogHeader>
          <DialogTitle>
            Tạo lịch hẹn mới
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="md:w-[60%] w-full">
            <ScheduleCalendar
              schedules={schedules}
              drugs={[]}
              onNavigate={fetchSchedules}
              calendarStyle={{height: 450}}
              canChangeView={false}
              initialView={Views.DAY}
            />
          </div>
          <div className="md:w-[40%] w-full md:max-h-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">Thông tin lịch hẹn</h2>
            
            <div>
              <Label htmlFor="title" className="my-2">Tiêu đề lịch hẹn</Label>
              <TextField
                fullWidth
                id="title"
                value={formik.values.title}
                onChange={(e) => formik.setFieldValue("title", e.target.value)}
                placeholder="Nhập tiêu đề lịch hẹn"
                error={!!formik.errors.title}
                helperText={formik.errors.title}
              />
            </div>

            {/* Service Selection Section */}
            <div className="space-y-4">
              {/* Service Search */}
              <div>
                <Label htmlFor="service" className="my-2">Tìm dịch vụ</Label>
                <Autocomplete
                  fullWidth
                  inputValue={searchServiceInput}
                  onInputChange={(_, newInputValue) => {
                    setSearchServiceInput(newInputValue);
                  }}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      formik.setFieldValue("scheduleServices", [...formik.values.scheduleServices, 
                        {
                          id: "",
                          serviceId: newValue.id,
                          name: newValue.name,
                          isUnset:false,
                          inputId:crypto.randomUUID(),
                        }
                      ]);
                    }
                  }}
                  options={services}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Nhập dịch vụ..."
                      className="w-full"
                    />
                  )}
                />
              </div>

              {/* List of Available Services */}
              <div className="bg-gray-50 p-2 rounded-lg border-gray-200 border">
                <h3 className="text-lg font-semibold mb-2">Danh sách dịch vụ có sẵn</h3>
                <div className="grid grid-cols-2 gap-2 h-[80px] overflow-y-auto">
                  {unsetServicesState.map((service) => (
                    <Button
                      key={service.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        formik.setFieldValue("scheduleServices", [...formik.values.scheduleServices, 
                          {
                            id: "",
                            serviceId: service.id,
                            name: service.name,
                            isUnset:false,
                            inputId:service.inputId,
                        }]);
                        setUnsetServicesState((prev) => prev.filter(s => s.inputId !== service.inputId));
                      }}
                    >
                      {service.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selected Services */}
              <div className="bg-gray-50 p-2 rounded-lg border-gray-200 border">
                <h3 className="text-lg font-semibold mb-2">Danh sách dịch vụ đã chọn</h3>
                <div className="space-y-2 h-[100px] overflow-y-auto">
                  {formik.values.scheduleServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md">
                      <span>{service.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveService(service)}
                      >
                        <Trash className="text-red-500"/>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/*Time input */}
              <div>
                <Label htmlFor="appointmentDateTime">Thời gian hẹn</Label>
                <input
                  type="time"
                  id="appointmentDateTime"
                  value={formik.values.appointmentDateTime}
                  onChange={(e) => formik.setFieldValue("appointmentDateTime", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                />
              </div>
              <div>
                <Label htmlFor="estimatedTime">Thời gian ước lượng</Label>
                <input
                  type="time"
                  id="estimatedTime"
                  value={formik.values.estimatedTime}
                  onChange={(e) => formik.setFieldValue("estimatedTime", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 mt-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            Tạo lịch hẹn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
