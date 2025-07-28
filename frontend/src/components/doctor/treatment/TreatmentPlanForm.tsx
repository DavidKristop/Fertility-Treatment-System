import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTreatment, existByPatientId } from "@/api/treatment";
import { getPatients } from "@/api/patient-management";
import { getProtocols } from "@/api/treatment-protocol";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Autocomplete, TextField } from "@mui/material";
import type { PatientProfile,  DrugResponse, TreatmentCreateRequest, ProtocolResponse, ServiceResponse } from "@/api/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  patientEmail: z.string().email("Invalid email address"),
  protocolTitle: z.string().min(1, "Protocol is required"),
  medicalHistory: z.string().min(1, "Medical history is required").max(500),
  paymentType: z.enum(["FULL", "BY_PHASE"]),
  description: z.string().min(1, "Description is required").max(500),
  title: z.string().min(1, "Title is required").max(50),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateTreatmentForm() {
  const [selectedPatient, setSelectedPatient] = useState<{ email: string; fullName: string; medicalHistory: string; id: string } | null>(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [protocolSearch, setProtocolSearch] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolResponse | null>(null);
  const [patients, setPatients] = useState<{ email: string; fullName: string; medicalHistory: string; id: string }[]>([]);
  const [protocols, setProtocols] = useState<ProtocolResponse[]>([]);
  const [hasTreatment, setHasTreatment] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentType: "FULL",
    },
  });


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients(patientSearch, 0, 10);
        if (response?.payload?.content) {
          setPatients(
            response?.payload?.content.map((p: PatientProfile) => ({
              email: p.email,
              fullName: p.fullName || "",
              medicalHistory: p.medicalHistory || "",
              id: p.id,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchProtocols = async () => {
      try {
        const response = await getProtocols(0, 10, protocolSearch);
        if (response?.payload?.content) {
          setProtocols(response?.payload?.content as ProtocolResponse[]);
        }
      } catch (error) {
        console.error("Error fetching protocols:", error);
      }
    };

    fetchPatients();
    fetchProtocols();
  }, [patientSearch, protocolSearch]);

  useEffect(()=>{
    const existTreatmentByPatientId = async () => {
      try {
        const res = await existByPatientId(
          selectedPatient?.id,
          ["IN_PROGRESS","AWAITING_CONTRACT_SIGNED"]
        );
        setHasTreatment(res?.payload || false);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
      } 
    };
    
    if(selectedPatient){
      existTreatmentByPatientId();
      setValue("medicalHistory", selectedPatient.medicalHistory);
    }
  },[selectedPatient])

  const onSubmit = async (data: FormValues) => {
    try {
      setIsCreating(true);
      if (!selectedPatient || !selectedProtocol) {
        throw new Error("Please select both patient and protocol");
      }

      const treatmentData = {
        paymentMode: data.paymentType as "FULL" | "BY_PHASE",
        title: data.title,
        protocolId: selectedProtocol.id,
        userId: selectedPatient.id,
        medicalHistory: data.medicalHistory,
        description: data.description
      } as TreatmentCreateRequest;

      await createTreatment(treatmentData);
      // Reset form after successful submission
      reset();
      setSelectedPatient(null);
      setSelectedProtocol(null);
      setPatientSearch("");
      setProtocolSearch("");
      toast.success("Treatment created successfully");
      navigate("/doctor/treatment-plans");
    } catch (error) {
      console.error("Error creating treatment:", error);
      toast.error(error instanceof Error ? error.message : "Lỗi khi tạo dữ liệu");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
      <input autoComplete="false" name="hidden" type="text" style={{ display: "none" }} />
      <div className="space-y-2">
        <Label htmlFor="patientEmail">Email của bệnh nhân</Label>
        <Autocomplete
          value={selectedPatient}
          onChange={(_, newValue) => {
            setValue("patientEmail", newValue?.email || "");
            setSelectedPatient(newValue);
          }}
          inputValue={patientSearch}
          onInputChange={(_, newInputValue) => {
            setPatientSearch(newInputValue);
          }}
          options={patients}
          getOptionLabel={(option) => option.email}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search patient by email..."
              error={!!errors.patientEmail}
              helperText={errors.patientEmail?.message}
            />
          )}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Tiêu đề</Label>
        <TextField
          fullWidth
          {...register("title")}
          placeholder="Enter title"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalHistory">Lịch sử bệnh</Label>
        <Textarea
          {...register("medicalHistory")}
          disabled={!selectedPatient}
          placeholder="Medical history will be auto-filled when patient is selected..."
          className="resize-none"
        />
        {errors.medicalHistory && (
          <p className="text-sm text-red-500">{errors.medicalHistory.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="protocolTitle">Tiêu đề của phác đồ</Label>
        <Autocomplete
          value={selectedProtocol}
          onChange={(_, newValue) => {
            setValue("protocolTitle", newValue?.title || "");
            setSelectedProtocol(newValue);
            setValue("description", newValue?.description || "");
          }}
          inputValue={protocolSearch}
          onInputChange={(_, newInputValue) => {
            setProtocolSearch(newInputValue);
          }}
          options={protocols}
          getOptionLabel={(option) => `${option.title} - ${option.description.substring(0, 50)}... (${option.estimatedPrice.toLocaleString("vi-VN")} đ)`}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search protocol by title..."
              error={!!errors.protocolTitle}
              helperText={errors.protocolTitle?.message}
            />
          )}
          className="w-full"
        />
      </div>

      {selectedProtocol && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết của phác đồ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tiêu đề</Label>
                  <Input value={selectedProtocol.title} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Mô tả</Label>
                  <Textarea
                    value={selectedProtocol.description}
                    disabled
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Giá ước tính</Label>
                  <Input value={selectedProtocol.estimatedPrice.toLocaleString("vi-VN")+" đ"} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Giai đoạn</Label>
                  <Accordion type="single" collapsible className="w-full">
                    {selectedProtocol.phases.map((phase) => (
                      <AccordionItem key={phase.id} value={phase.id}>
                        <AccordionTrigger>
                          {phase.title} (Giai đoạn {phase.position})
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {phase.services && phase.services.length > 0 && (
                              <div>
                                <h3 className="font-medium">Dịch vụ</h3>
                                <ul className="list-disc list-inside space-y-2">
                                  {phase.services.map((service: ServiceResponse) => (
                                    <li key={service.id}>
                                      {service.name} - {service.price.toLocaleString("vi-VN")+" đ"}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {phase.drugs && phase.drugs.length > 0 && (
                              <div>
                                <h3 className="font-medium">Thuốc</h3>
                                <ul className="list-disc list-inside space-y-2">
                                  {phase.drugs.map((drug: DrugResponse) => (
                                    <li key={drug.id}>
                                      {drug.name} - {drug.price.toLocaleString("vi-VN")+" đ"}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="paymentType">Phương thức thanh toán</Label>
        <select
          {...register("paymentType")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="FULL">Thanh toán toàn bộ</option>
          <option value="BY_PHASE">Thanh toán theo giai đoạn</option>
        </select>
      </div>

      <Button type="submit" className={`w-full ${isCreating ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`} disabled={hasTreatment || isCreating}>
        {isCreating ? "Đang tạo..." : "Tạo kế hoạch điều trị"}
      </Button>
      {hasTreatment && (
        <p className="text-red-500 mt-2">
          Bệnh nhân đã có một kế hoạch điều trị đang trong trạng thái điều trị hoặc là đang chờ kí hợp đồng.
        </p>
      )}
    </form>
  );
}
