import { getEvents } from "@/api/patient-management";
import type { PatientDrugResponse, PatientEventResponse, ScheduleStatus } from "@/api/types";
import PatientDrugDialog from "@/components/PatientDrugDialog";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function MySchedulePage(){
    const [events, setEvents] = useState<PatientEventResponse>();
    const [open,setOpen] = useState(false)
    const [drug,setDrug] = useState<PatientDrugResponse>();
    const {setBreadCrumbs} = useAuthHeader()
    const navigate = useNavigate()


    
    const fetchSchedules = useCallback(async (startDate:Date, endDate:Date, filterStatus?: ScheduleStatus | "ALL") => {
        try {
            const res = await getEvents(startDate, endDate, filterStatus==="ALL" || !filterStatus ? undefined : [filterStatus]);
            setEvents(res.payload);
        } catch (err) {
            console.error(err);
        }
    }, []); 

    useEffect(()=>{
        setBreadCrumbs([
            {label:"Trang tổng quan",path:"/patient/dashboard"},
            {label:"Lịch khám"}
        ])
    },[])

    return <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <ScheduleCalendar
                schedules={events?.scheduleResponse || []}
                onNavigate={fetchSchedules}
                onScheduleClick={(event)=>navigate(`/patient/schedule-result/${event.id}`)}
                onDrugClick={(event)=>{
                    setDrug(event)
                    setOpen(true)
                }}
                hasFilterStatus={true}
                drugs={events?.treatmentPatientDrugResponse || []}
            />
            <PatientDrugDialog open={open} onClose={()=>setOpen(false)} drug={drug}/>
        </div>
    </div>
}