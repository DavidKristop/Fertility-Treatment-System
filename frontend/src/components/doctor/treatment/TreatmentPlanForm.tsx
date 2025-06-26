import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Save, User, FileText, Calendar, ChevronDown, ChevronUp, PlusCircle, Trash2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import ServiceSelectionDialog from "./ServiceSelectionDialog"
import DrugSelectionDialog from "./DrugSelectionDialog"
import { getAvailableServices, getAvailableDrugs, getTreatmentProtocolPhases } from "@/api/treatment"

// Import DateRange type from react-day-picker
import type { DateRange } from "react-day-picker"

// Simple date formatter
function formatDate(date: Date): string {
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

interface TreatmentProtocol {
  id: string
  title: string
  description: string
  type: string
  subtype: string
  isActive: boolean
}

interface Service {
  id: string
  name: string
  dateRange?: DateRange
  quantity: number
  price: number
}

interface Drug {
  id: string
  name: string
  dosage: string
  quantity: number
  price: number
}

interface PhaseData {
  expanded: boolean
  services?: Service[]
  drugs?: Drug[]
}

interface PhaseCollection {
  [key: string]: PhaseData
}

interface TreatmentPlanFormData {
  patientId: string
  protocolId: string
  startDate: string
  diagnosis: string
  notes: string
  phases: PhaseCollection
}

interface TreatmentPlanFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  availableProtocols: TreatmentProtocol[]
}

export default function TreatmentPlanForm({ onSubmit, onCancel, availableProtocols }: TreatmentPlanFormProps) {
  // State for storing protocol phases and available services/drugs
  const [protocolPhases, setProtocolPhases] = useState<Record<string, { id: string; title: string; description: string }[]>>({});
  const [availableServices, setAvailableServices] = useState<{ id: string; name: string; price: number; unit: string }[]>([]);
  const [availableDrugs, setAvailableDrugs] = useState<{ id: string; name: string; price: number; unit: string }[]>([]);
  // State for loading indicators
  const [loading, setLoading] = useState({
    services: false,
    drugs: false,
    phases: false
  });
  
  // Form data state
  const [formData, setFormData] = useState<TreatmentPlanFormData>({
    patientId: "",
    protocolId: "",
    startDate: "",
    diagnosis: "",
    notes: "",
    phases: {} as PhaseCollection // Will store phase-specific data including services and drugs
  });

  // Dialogs state
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [drugDialogOpen, setDrugDialogOpen] = useState(false);
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null);
  
  // Fetch available services and drugs on component mount
  useEffect(() => {
    const fetchServiceAndDrugData = async () => {
      setLoading(prev => ({ ...prev, services: true, drugs: true }));
      try {
        const [services, drugs] = await Promise.all([
          getAvailableServices(),
          getAvailableDrugs()
        ]);
        setAvailableServices(services);
        setAvailableDrugs(drugs);
      } catch (error) {
        console.error("Failed to fetch services or drugs:", error);
      } finally {
        setLoading(prev => ({ ...prev, services: false, drugs: false }));
      }
    };
    
    fetchServiceAndDrugData();
  }, []);
  
  // Fetch protocol phases when protocol is selected
  useEffect(() => {
    if (!formData.protocolId) return;
    
    const fetchProtocolPhases = async () => {
      setLoading(prev => ({ ...prev, phases: true }));
      try {
        const phases = await getTreatmentProtocolPhases(formData.protocolId);
        setProtocolPhases(prev => ({ 
          ...prev, 
          [formData.protocolId]: phases 
        }));
      } catch (error) {
        console.error("Failed to fetch protocol phases:", error);
      } finally {
        setLoading(prev => ({ ...prev, phases: false }));
      }
    };
    
    if (!protocolPhases[formData.protocolId]) {
      fetchProtocolPhases();
    }
  }, [formData.protocolId, protocolPhases]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const openServiceDialog = (phaseId: string) => {
    setActivePhaseId(phaseId);
    setServiceDialogOpen(true);
  };

  const openDrugDialog = (phaseId: string) => {
    setActivePhaseId(phaseId);
    setDrugDialogOpen(true);
  };

  const handleServiceSave = (serviceData: { serviceId: string; dateRange: DateRange | undefined; quantity: number }) => {
    if (!activePhaseId) return;
    
    const selectedService = availableServices.find(s => s.id === serviceData.serviceId);
    if (!selectedService) return;
    
    // Create a new service entry
    const newService: Service = {
      id: serviceData.serviceId,
      name: selectedService.name,
      dateRange: serviceData.dateRange,
      quantity: serviceData.quantity,
      price: selectedService.price * serviceData.quantity
    };
    
    // Update the phase services
    const updatedPhases = { ...formData.phases };
    if (!updatedPhases[activePhaseId].services) {
      updatedPhases[activePhaseId].services = [];
    }
    updatedPhases[activePhaseId].services = [...(updatedPhases[activePhaseId].services || []), newService];
    
    setFormData({ ...formData, phases: updatedPhases });
  };

  const handleDrugSave = (drugData: { drugId: string; dosage: string; quantity: number }) => {
    if (!activePhaseId) return;
    
    const selectedDrug = availableDrugs.find(d => d.id === drugData.drugId);
    if (!selectedDrug) return;
    
    // Create a new drug entry
    const newDrug: Drug = {
      id: drugData.drugId,
      name: selectedDrug.name,
      dosage: drugData.dosage,
      quantity: drugData.quantity,
      price: selectedDrug.price * drugData.quantity
    };
    
    // Update the phase drugs
    const updatedPhases = { ...formData.phases };
    if (!updatedPhases[activePhaseId].drugs) {
      updatedPhases[activePhaseId].drugs = [];
    }
    updatedPhases[activePhaseId].drugs = [...(updatedPhases[activePhaseId].drugs || []), newDrug];
    
    setFormData({ ...formData, phases: updatedPhases });
  };

  const handleRemoveService = (phaseId: string, serviceId: string) => {
    const updatedPhases = { ...formData.phases };
    updatedPhases[phaseId].services = updatedPhases[phaseId].services?.filter(
      service => service.id !== serviceId
    );
    setFormData({ ...formData, phases: updatedPhases });
  };

  const handleRemoveDrug = (phaseId: string, drugId: string) => {
    const updatedPhases = { ...formData.phases };
    updatedPhases[phaseId].drugs = updatedPhases[phaseId].drugs?.filter(
      drug => drug.id !== drugId
    );
    setFormData({ ...formData, phases: updatedPhases });
  };

  const selectedProtocol = availableProtocols.find((p) => p.id === formData.protocolId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Tạo kế hoạch điều trị mới
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Bệnh nhân
              </Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => setFormData({ ...formData, patientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bệnh nhân" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440011">Nguyễn Thị Lan (32 tuổi)</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440012">Trần Văn Nam (35 tuổi)</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440013">Lê Thị Hoa (28 tuổi)</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440014">Phạm Thị Mai (30 tuổi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ngày bắt đầu điều trị
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="protocol" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Phác đồ điều trị
            </Label>
            <Select
              value={formData.protocolId}
              onValueChange={(value) => setFormData({ ...formData, protocolId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn phác đồ điều trị" />
              </SelectTrigger>
              <SelectContent>
                {/* Show all available protocols directly */}
                <SelectItem value="550e8400-e29b-41d4-a716-446655440021">IVF Long Protocol</SelectItem>
                <SelectItem value="550e8400-e29b-41d4-a716-446655440023">IVF Short Protocol</SelectItem>
                <SelectItem value="550e8400-e29b-41d4-a716-446655440022">IUI Natural Protocol</SelectItem>
                <SelectItem value="550e8400-e29b-41d4-a716-446655440024">IUI Stimulated Protocol</SelectItem>
              </SelectContent>
            </Select>
            {selectedProtocol && <p className="text-sm text-muted-foreground mt-2">{selectedProtocol.description}</p>}
          </div>

          <div>
            <Label htmlFor="diagnosis">Chẩn đoán</Label>
            <Textarea
              id="diagnosis"
              placeholder="Nhập chẩn đoán chi tiết..."
              className="min-h-[80px]"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="notes">Ghi chú bổ sung</Label>
            <Textarea
              id="notes"
              placeholder="Ghi chú về kế hoạch điều trị, lưu ý đặc biệt..."
              className="min-h-[100px]"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* Protocol Phases */}
          {formData.protocolId && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Các giai đoạn điều trị</h3>
              
              {loading.phases ? (
                <div className="text-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                  <p className="text-muted-foreground">Đang tải giai đoạn điều trị...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {protocolPhases[formData.protocolId]?.map((phase, index) => (
                  <div key={phase.id} className="border rounded-lg">
                    <div 
                      className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        // Toggle phase expansion here
                        const updatedPhases = { ...formData.phases };
                        updatedPhases[phase.id] = updatedPhases[phase.id] 
                          ? { ...updatedPhases[phase.id], expanded: !updatedPhases[phase.id].expanded }
                          : { expanded: true, services: [], drugs: [] };
                        setFormData({ ...formData, phases: updatedPhases });
                      }}
                    >
                      <div>
                        <h4 className="font-medium">Giai đoạn {index + 1}: {phase.title}</h4>
                        <p className="text-sm text-muted-foreground">{phase.description}</p>
                      </div>
                      {formData.phases[phase.id]?.expanded ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />
                      }
                    </div>
                    
                    {formData.phases[phase.id]?.expanded && (
                      <div className="p-4 border-t bg-gray-50">
                        {/* Services & Drugs container */}
                        <div className="space-y-4">
                          {/* Service selection */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium">Dịch vụ</h5>                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={() => openServiceDialog(phase.id)}
                                >
                                  <PlusCircle className="h-4 w-4" />
                                  <span>Thêm dịch vụ</span>
                                </Button>
                            </div>
                            
                            {formData.phases[phase.id]?.services?.length ? (
                              <div className="border rounded-md overflow-hidden">
                                <table className="w-full">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="p-2 text-left font-medium text-sm">Dịch vụ</th>
                                      <th className="p-2 text-left font-medium text-sm">Lịch thực hiện</th>
                                      <th className="p-2 text-left font-medium text-sm">Số lượng</th>
                                      <th className="p-2 text-left font-medium text-sm">Thành tiền</th>
                                      <th className="p-2 text-center font-medium text-sm">Thao tác</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {formData.phases[phase.id]?.services?.map((service) => (
                                      <tr key={service.id}>
                                        <td className="p-2 border-t">{service.name}</td>
                                        <td className="p-2 border-t">
                                          {service.dateRange?.from && service.dateRange?.to
                                            ? `${formatDate(service.dateRange.from)} - ${formatDate(service.dateRange.to)}`
                                            : 'Chưa có lịch'}
                                        </td>
                                        <td className="p-2 border-t">{service.quantity} lần</td>
                                        <td className="p-2 border-t">{new Intl.NumberFormat('vi-VN').format(service.price)} ₫</td>
                                        <td className="p-2 border-t text-center">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleRemoveService(phase.id, service.id)}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="text-center py-8 border rounded-md bg-gray-50">
                                <p className="text-muted-foreground">Chưa có dịch vụ nào được thêm</p>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => openServiceDialog(phase.id)}
                                >
                                  <PlusCircle className="h-4 w-4 mr-1" />
                                  Thêm dịch vụ đầu tiên
                                </Button>
                              </div>
                            )}
                          </div>
                          
                          {/* Drug selection */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium">Thuốc</h5>                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline"
                                  className="flex items-center gap-1"
                                  onClick={() => openDrugDialog(phase.id)}
                                >
                                  <PlusCircle className="h-4 w-4" />
                                  <span>Thêm thuốc</span>
                                </Button>
                            </div>
                            
                            {formData.phases[phase.id]?.drugs?.length ? (
                              <div className="border rounded-md overflow-hidden">
                                <table className="w-full">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="p-2 text-left font-medium text-sm">Thuốc</th>
                                      <th className="p-2 text-left font-medium text-sm">Liều lượng</th>
                                      <th className="p-2 text-left font-medium text-sm">Số lượng</th>
                                      <th className="p-2 text-left font-medium text-sm">Thành tiền</th>
                                      <th className="p-2 text-center font-medium text-sm">Thao tác</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {formData.phases[phase.id]?.drugs?.map((drug) => (
                                      <tr key={drug.id}>
                                        <td className="p-2 border-t">{drug.name}</td>
                                        <td className="p-2 border-t">{drug.dosage}</td>
                                        <td className="p-2 border-t">{drug.quantity} {availableDrugs.find(d => d.id === drug.id)?.unit || 'liều'}</td>
                                        <td className="p-2 border-t">{new Intl.NumberFormat('vi-VN').format(drug.price)} ₫</td>
                                        <td className="p-2 border-t text-center">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleRemoveDrug(phase.id, drug.id)}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <div className="text-center py-8 border rounded-md bg-gray-50">
                                <p className="text-muted-foreground">Chưa có thuốc nào được thêm</p>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => openDrugDialog(phase.id)}
                                >
                                  <PlusCircle className="h-4 w-4 mr-1" />
                                  Thêm thuốc đầu tiên
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Tạo kế hoạch điều trị
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </form>
      </CardContent>
      
      {/* Service Selection Dialog */}
      <ServiceSelectionDialog
        open={serviceDialogOpen}
        onOpenChange={setServiceDialogOpen}
        onSave={handleServiceSave}
        availableServices={availableServices}
        phaseType={activePhaseId && formData.protocolId ? 
          protocolPhases[formData.protocolId]?.find((p) => p.id === activePhaseId)?.title || "" : ""}
      />
      
      {/* Drug Selection Dialog */}
      <DrugSelectionDialog
        open={drugDialogOpen}
        onOpenChange={setDrugDialogOpen}
        onSave={handleDrugSave}
        availableDrugs={availableDrugs}
        phaseType={activePhaseId && formData.protocolId ? 
          protocolPhases[formData.protocolId]?.find((p) => p.id === activePhaseId)?.title || "" : ""}
      />
    </Card>
  )
}
