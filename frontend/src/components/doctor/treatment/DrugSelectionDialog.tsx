"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowDown, ExpandIcon, Save, X, Trash } from "lucide-react"
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, TextField, Typography } from "@mui/material"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { assignDrugSetRequestSchema } from "@/lib/validations/auth"
import type { AssignDrugSetRequest, DrugResponse, DrugSetRequest } from "@/api/types"
import { getDrugs } from "@/api/drug"
import { useFormik } from "formik"
import type { FormikProps, FormikErrors, FormikTouched } from "formik"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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

  const formik = useFormik<AssignDrugSetRequest>({
    validationSchema: toFormikValidationSchema(assignDrugSetRequestSchema),
    initialValues:{
      assignDrugId:"",
      patientDrugs:[]
    },
    onSubmit:()=>{}
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
          {/* Drug Selection */}
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
                      id:"",
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
                    placeholder="Nhập dịch vụ..."
                    className="w-full"
                  />
                )}
              />
            </div>
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
          <Button type="submit" disabled={formik.isSubmitting} onClick={()=>formik.handleSubmit()}>
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
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemoveDrug}
          className="text-red-500 hover:text-red-600"
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-2 flex flex-col gap-2">
        <TextField
          fullWidth
          label="Hướng dẫn sử dụng"
          value={patientDrug.usageInstructions}
          error={drugTouched?.usageInstructions && Boolean(drugErrors?.usageInstructions)}
          helperText={drugTouched?.usageInstructions && drugErrors?.usageInstructions}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            newPatientDrugs[index] = {
              ...newPatientDrugs[index],
              usageInstructions: e.target.value
            };
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />

        {/* Dosage */}
        <TextField
          fullWidth
          label="Liều lượng"
          value={patientDrug.dosage}
          error={drugTouched?.dosage && Boolean(drugErrors?.dosage)}
          helperText={drugTouched?.dosage && drugErrors?.dosage}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            newPatientDrugs[index] = {
              ...newPatientDrugs[index],
              dosage: e.target.value
            };
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />

        {/* Amount */}
        <TextField
          fullWidth
          label="Số lượng"
          type="number"
          disabled={!formik.values.assignDrugId&&!patientDrug.id}
          value={patientDrug.amount}
          error={drugTouched?.amount && Boolean(drugErrors?.amount)}
          helperText={drugTouched?.amount && drugErrors?.amount}
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            const amount = parseInt(e.target.value);
            if (!isNaN(amount)) {
              newPatientDrugs[index] = {
                ...newPatientDrugs[index],
                amount: amount
              };
              formik.setFieldValue("patientDrugs", newPatientDrugs);
            }
          }}
        />

        {/* Start Date */}
        <DatePicker
          value={patientDrug.startDate}
          format="dd/MM/yyyy"
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            newPatientDrugs[index] = {
              ...newPatientDrugs[index],
              startDate: e
            };
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />

        {/* End Date */}
        <DatePicker
          value={patientDrug.endDate}
          format="dd/MM/yyyy"
          onChange={(e) => {
            const newPatientDrugs = [...formik.values.patientDrugs];
            newPatientDrugs[index] = {
              ...newPatientDrugs[index],
              endDate: e
            };
            formik.setFieldValue("patientDrugs", newPatientDrugs);
          }}
        />
      </div>
    </div>
  )
}