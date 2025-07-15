import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useCallback, useMemo } from "react";
import type { ScheduleDetailResponse, ScheduleResponse, ScheduleServiceSetRequest, ScheduleSetRequest, ServiceResponse, TreatmentScheduleResponse, TreatmentServiceResponse } from "@/api/types";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import { Views } from "react-big-calendar";
import { useFormik } from "formik";
import { scheduleSetRequestSchema } from "@/lib/validations/auth";
import { getDoctorScheduleInAMonth } from "@/api/schedule";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import { getServices } from "@/api/service";
import { Trash } from "lucide-react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { setTreatmentPhase } from "@/api/treatment";
import { useTreatmentDetail } from "@/lib/context/TreatmentDetailContext";
import type { PhaseResponse } from "@/api/types";

interface ScheduleSetDialog {
  isOpen: boolean;
  unsetServices: TreatmentServiceResponse[];
  schedule?:ScheduleSetRequest;
  phaseId:string;
  onClose: () => void;
}

export default function ScheduleSetDialog({
  isOpen,
  unsetServices,
  schedule,
  phaseId,
  onClose,
}: ScheduleSetDialog) {
  const {treatmentDetail,setTreatmentDetail} = useTreatmentDetail()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000));
  const [schedules,setSchedules] = useState<ScheduleDetailResponse[]>([])
  const memoizedSchedules = useMemo(() => schedules, [schedules]);
  const [previewSchedule,setPreviewSchedule] = useState<ScheduleResponse | undefined>()
  const [unsetServicesState,setUnsetServicesState] = useState<ScheduleServiceSetRequest[]>(unsetServices.map((service)=>({
    ...service,
    isUnset:true,
    inputId:crypto.randomUUID(),
  })))

  const [searchServiceInput,setSearchServiceInput] = useState<string>("")
  const [services,setServices] = useState<ServiceResponse[]>([])

  const formik = useFormik<ScheduleSetRequest>({
    validationSchema: toFormikValidationSchema(scheduleSetRequestSchema),
    initialValues:schedule||{
      scheduleId: "",
      appointmentDateTime: selectedDate,
      title: "",
      estimatedTime: new Date(selectedDate.getTime() + 10 * 60 * 1000),
      scheduleServices: []
    },
    onSubmit: async(values) => {
      if(values.scheduleServices.length === 0){
        toast.error("Lịch hẹn phải có ít nhất một dịch vụ");
        return;
      }
      else{
        const res = await setTreatmentPhase({
          phaseId,
          schedules:[values],
          assignDrugs:[],
        })
        if(res.payload){
          const newPhase = res.payload
          if(treatmentDetail)setTreatmentDetail({
            ...treatmentDetail,
            phases: treatmentDetail?.phases.map((phase:PhaseResponse)=>{
              if(phase.id === newPhase.id){
                return newPhase
              }
              return phase
            })||[],
          })
          onClose()
        }
      }
    },
    enableReinitialize: true
  })

  function dateRangeOverlaps(a_start:Date, a_end:Date, b_start:Date, b_end:Date) {
    if (a_start <= b_start && b_start <= a_end) return true;
    if (a_start <= b_end   && b_end   <= a_end) return true;
    if (b_start <  a_start && a_end   <  b_end) return true; 
    if (a_start < b_start && a_end > b_end) return true;
    return false;
  }

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
      setSelectedDate(startDate)
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
  }, [formik.values.scheduleServices,setUnsetServicesState]);



  useEffect(()=>{
    fetchServices(searchServiceInput);
  },[searchServiceInput])

  useEffect(()=>{
    if(isOpen){
      setSearchServiceInput("");
      formik.resetForm();
      setUnsetServicesState(unsetServices.map((service)=>({
        ...service,
        isUnset:true,
        inputId:crypto.randomUUID(),
      })))
    }
  },[isOpen])

  useEffect(()=>{
    const newAppointmentDatetime = new Date(selectedDate);
    newAppointmentDatetime.setHours(formik.values.appointmentDateTime.getHours());
    newAppointmentDatetime.setMinutes(formik.values.appointmentDateTime.getMinutes());
    formik.setFieldValue("appointmentDateTime",newAppointmentDatetime);

    const newEstimatedTime = new Date(selectedDate);
    newEstimatedTime.setHours(formik.values.estimatedTime.getHours());
    newEstimatedTime.setMinutes(formik.values.estimatedTime.getMinutes());
    formik.setFieldValue("estimatedTime",newEstimatedTime);
  },[selectedDate])

  useEffect(()=>{
    const {appointmentDateTime,estimatedTime} = formik.values
    if(appointmentDateTime && estimatedTime && appointmentDateTime.getTime() < estimatedTime.getTime()){
      setPreviewSchedule({
        id: "",
        title: formik.values.title,
        appointmentDateTime: appointmentDateTime.toISOString(),
        estimatedTime: estimatedTime.toISOString(),
        status: "PENDING",
      })
      const isOverlap = schedules.some(schedule=>dateRangeOverlaps(new Date(schedule.appointmentDateTime),new Date(schedule.estimatedTime),appointmentDateTime,estimatedTime))
      if(isOverlap) formik.setFieldError("estimatedTime","Lịch hẹn này đã bị trùng lặp")
      else formik.setFieldError("estimatedTime","")
    }
    else{
      setPreviewSchedule(undefined)
    }
  },[formik.values.appointmentDateTime,formik.values.estimatedTime,memoizedSchedules])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent style={{maxWidth: 1000}} aria-description="Create new schedule">
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
              initialDate={selectedDate}
              hasDatePicker={true}
              previewSchedule={previewSchedule}
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
                  value={null} // Add this line
                  inputValue={searchServiceInput}
                  onInputChange={(_, newInputValue) => {
                    setSearchServiceInput(newInputValue);
                  }}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      const newService = {
                        id: "",
                        serviceId: newValue.id,
                        name: newValue.name,
                        isUnset: false,
                        inputId: crypto.randomUUID(),
                      };
                      
                      // Create a new array with the new service
                      const updatedServices = [...formik.values.scheduleServices, newService];
                      
                      // Set the new value
                      formik.setFieldValue("scheduleServices", updatedServices);
                      
                      // Clear the search input
                      setSearchServiceInput("");
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
                      key={service.inputId}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        formik.setFieldValue("scheduleServices", [...formik.values.scheduleServices, service]);
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
                  {formik.values.scheduleServices.map((service) => (
                    <div key={service.inputId} className="flex items-center justify-between p-2 bg-white rounded-md">
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
                <TimeField
                  value={formik.values.appointmentDateTime}
                  onChange={(newDate)=>formik.setFieldValue("appointmentDateTime",newDate)}
                  format="HH:mm"
                  ampm={false}
                  fullWidth
                  error={!!formik.errors.appointmentDateTime}
                  helperText={formik.errors.appointmentDateTime ? String(formik.errors.appointmentDateTime) : ""}
                />
              </div>
              <div>
                <Label htmlFor="estimatedTime">Thời gian ước lượng</Label>
                <TimeField
                  value={formik.values.estimatedTime}
                  onChange={(newDate)=>formik.setFieldValue("estimatedTime",newDate)}
                  format="HH:mm"
                  ampm={false}
                  fullWidth
                  error={!!formik.errors.estimatedTime}
                  helperText={formik.errors.estimatedTime ? String(formik.errors.estimatedTime) : ""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button className="cursor-pointer" type="submit" onClick={()=>formik.handleSubmit()}>
            Tạo lịch hẹn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
