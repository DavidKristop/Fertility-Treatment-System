"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowDown, Save, X, Trash } from "lucide-react"
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, TextField, Typography } from "@mui/material"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { assignDrugSetRequestSchema } from "@/lib/validations/auth"
import type { AssignDrugSetRequest, DrugResponse, DrugSetRequest, PhaseResponse } from "@/api/types"
import { getDrugs } from "@/api/drug"
import { useFormik } from "formik"
import type { FormikProps, FormikErrors, FormikTouched } from "formik"
import { DateField } from '@mui/x-date-pickers/DateField';
import { toast } from "react-toastify"
import { useTreatmentDetail } from "@/lib/context/TreatmentDetailContext"
import { setTreatmentPhase } from "@/api/treatment"


interface DrugSelectionDialogProps {
  open: boolean
  onClose: () => void
  assignDrug?: AssignDrugSetRequest
}

export default function DrugSelectionDialog({
  open,
  onClose,
  assignDrug
}: DrugSelectionDialogProps) {
  const {treatmentDetail,setTreatmentDetail} = useTreatmentDetail()

  const formik = useFormik<AssignDrugSetRequest>({
    validationSchema: toFormikValidationSchema(assignDrugSetRequestSchema),
    initialValues:{
      assignDrugId:"",
      patientDrugs:[]
    },
    onSubmit:async(values)=>{
      if(values.patientDrugs.length === 0){
        toast.error("Lịch hẹn phải có ít nhất một dịch vụ");
        return;
      }
      else{
        try{
          const res = await setTreatmentPhase({
            phaseId:treatmentDetail?.currentPhase.id||"",
            schedules:[],
            assignDrugs:[values],
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
        catch(err){
          console.error(err);
          toast.error((err as Error).message || "Lỗi khi tạo lịch hẹn");
        }
      }
    }
  })
  
  const [drugList, setDrugList] = useState<DrugResponse[]>([])

  const [searchDrugInput, setSearchDrugInput] = useState("")

  const fetchDrug = async ()=>{
    try{
      const respones = await getDrugs({
        name: searchDrugInput
      })
      setDrugList(respones.payload.content)
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if(open){
      formik.resetForm()
      setSearchDrugInput("")
      if(assignDrug) formik.setValues(assignDrug)
    }
  },[open])

  useEffect(() => {
    fetchDrug()
  }, [searchDrugInput])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-description="Điều chỉnh toa thuốc">
        <DialogHeader>
          <DialogTitle>Điều chỉnh toa thuốc</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!formik.values.assignDrugId&&
            <div>
              <Label htmlFor="drug">Chọn thuốc</Label>
              <Autocomplete
                fullWidth
                value={null}
                inputValue={searchDrugInput}
                onInputChange={(_, newInputValue) => {
                  setSearchDrugInput(newInputValue);
                }}
                onChange={(_, newValue) => {
                  if (newValue) {
                    const newPatientDrug:DrugSetRequest = {
                      patientDrugId:"",
                      drugId:newValue.id,
                      name:newValue.name,
                      dosage:"",
                      usageInstructions:"",
                      amount:1,
                      startDate:new Date(),
                      endDate:new Date(),
                      inputId:crypto.randomUUID()
                    } 
                    formik.setFieldValue("patientDrugs", [...formik.values.patientDrugs, newPatientDrug]);
                    
                    setSearchDrugInput("");
                  }
                }}
                options={drugList}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Nhập thuốc để thêm..."
                    className="w-full"
                  />
                )}
              />
            </div>
          }
          {/* Drug Selection */}
            <div className="max-h-[300px] overflow-y-auto">
              {formik.values.patientDrugs.map((patientDrug)=>
                <Accordion key={patientDrug.inputId}>
                  <AccordionSummary
                    expandIcon={<ArrowDown/>}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>{patientDrug.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <PatientDrugForm
                      patientDrug={patientDrug}
                      formik={formik}
                    />
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Hủy
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={formik.isSubmitting} onClick={()=>formik.handleSubmit()}>
            <Save className="h-4 w-4 mr-2" />
            Lưu toa thuốc
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const PatientDrugForm = ({
  patientDrug,
  formik
}:{
  patientDrug: DrugSetRequest,
  formik: FormikProps<AssignDrugSetRequest>
})=>{
  const index = formik.values.patientDrugs.indexOf(patientDrug);
  const drugErrors = formik.errors.patientDrugs?.[index] as FormikErrors<DrugSetRequest>;
  const drugTouched = formik.touched.patientDrugs?.[index] as FormikTouched<DrugSetRequest>;

  const handleRemoveDrug = () => {
    const newPatientDrugs = [...formik.values.patientDrugs];
    newPatientDrugs.splice(index, 1);
    formik.setFieldValue("patientDrugs", newPatientDrugs);
  };


  return(
    <div className="space-y-4">
      <div className="flex justify-end">
        {!patientDrug.patientDrugId&&
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemoveDrug}
            className="text-red-500 hover:text-red-600"
          >
            <Trash className="h-5 w-5" />
          </Button>
        }
      </div>
      <div className="space-y-2 flex flex-col gap-2">
        <TextField
          fullWidth
          label="Hướng dẫn sử dụng"
          value={patientDrug.usageInstructions||""}
          error={drugTouched?.usageInstructions && Boolean(drugErrors?.usageInstructions)}
          helperText={drugTouched?.usageInstructions && drugErrors?.usageInstructions}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            const newPatientDrug = newPatientDrugs.find((drug)=>drug.inputId===patientDrug.inputId);
            if(newPatientDrug){
              newPatientDrug.usageInstructions = e.target.value;
            }
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />

        {/* Dosage */}
        <TextField
          fullWidth
          label="Liều lượng"
          value={patientDrug.dosage||""}
          error={drugTouched?.dosage && Boolean(drugErrors?.dosage)}
          helperText={drugTouched?.dosage && drugErrors?.dosage}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            const newPatientDrug = newPatientDrugs.find((drug)=>drug.inputId===patientDrug.inputId);
            if(newPatientDrug){
              newPatientDrug.dosage = e.target.value;
            }
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />

        {/* Amount */}
        <TextField
          fullWidth
          label="Số lượng"
          type="number"
          disabled={Boolean(patientDrug.patientDrugId)}
          value={patientDrug.amount||""}
          error={drugTouched?.amount && Boolean(drugErrors?.amount)}
          helperText={drugTouched?.amount && drugErrors?.amount}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            const amount = parseInt(e.target.value);
            if (!isNaN(amount)) {
              const newPatientDrug = newPatientDrugs.find((drug)=>drug.inputId===patientDrug.inputId);
              if(newPatientDrug){
                newPatientDrug.amount = amount;
              }
              formik.setFieldValue("patientDrugs", newPatientDrugs);
              formik.setFieldValue("patientDrugs", newPatientDrugs);
            }
          }}
        />

        {/* Start Date */}
        <DateField
          value={patientDrug.startDate}
          format="dd/MM/yyyy"
          error={drugTouched?.startDate && Boolean(drugErrors?.startDate)}
          helperText={drugTouched?.startDate && drugErrors?.startDate}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            const newPatientDrug = newPatientDrugs.find((drug)=>drug.inputId===patientDrug.inputId);
            if(newPatientDrug){
              newPatientDrug.startDate = e;
            }
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />

        {/* End Date */}
        <DateField
          value={patientDrug.endDate}
          format="dd/MM/yyyy"
          error={drugTouched?.endDate && Boolean(drugErrors?.endDate)}
          helperText={drugTouched?.endDate && drugErrors?.endDate}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            const newPatientDrug = newPatientDrugs.find((drug)=>drug.inputId===patientDrug.inputId);
            if(newPatientDrug){
              newPatientDrug.endDate = e;
            }
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />
      </div>
    </div>
  )
}