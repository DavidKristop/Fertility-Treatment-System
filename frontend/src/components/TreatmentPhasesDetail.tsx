import type { DrugResponse, ServiceResponse, TreatmentResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "./ui/accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function TreatmentPhasesDetail({treatment}:{treatment:TreatmentResponse}){
    return (
        <div className="space-y-6 w-full">
            <Card className="border-0">
                <CardHeader className="flex flex-col gap-2">
                    <CardTitle className="text-2xl font-bold">Chi tiết của phác đồ</CardTitle>
                    <div className="flex gap-2">
                        <Badge variant="outline">{treatment.protocol.title}</Badge>
                        <Badge variant="secondary">{format(new Date(), 'dd/MM/yyyy')}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-muted-foreground">Mô tả</h3>
                            <p className="text-lg leading-relaxed">{treatment.protocol.description}</p>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-muted-foreground">Giá ước tính</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-primary">
                                    {treatment.protocol.estimatedPrice.toLocaleString("vi-VN")} đ
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-muted-foreground">Giai đoạn</h3>
                            <Accordion type="single" collapsible className="w-full border rounded-lg overflow-hidden">
                                {treatment.protocol.phases.map((phase) => (
                                    <AccordionItem key={phase.id} value={phase.id}>
                                        <AccordionTrigger className="flex items-center justify-between w-full p-4 text-left text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180">
                                            <div className="flex items-center gap-2">
                                                <span className="text-primary">Giai đoạn {phase.position}</span>
                                                <span className="font-bold">{phase.title}</span>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-4 pt-0">
                                            <div className="space-y-6">
                                                {phase.services && phase.services.length > 0 && (
                                                    <div className="border rounded-lg p-4">
                                                        <h4 className="text-lg font-semibold mb-2">Dịch vụ</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {phase.services.map((service: ServiceResponse) => (
                                                                <div key={service.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                                                                    <span className="font-medium">{service.name}</span>
                                                                    <span className="text-primary font-semibold">
                                                                        {service.price.toLocaleString("vi-VN")} đ
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {phase.drugs && phase.drugs.length > 0 && (
                                                    <div className="border rounded-lg p-4">
                                                        <h4 className="text-lg font-semibold mb-2">Thuốc</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {phase.drugs.map((drug: DrugResponse) => (
                                                                <div key={drug.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                                                                    <span className="font-medium">{drug.name}</span>
                                                                    <span className="text-primary font-semibold">
                                                                        {drug.price.toLocaleString("vi-VN")} đ
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
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
    )
}