import type { DrugResponse, ServiceResponse, TreatmentResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "./ui/accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

export default function TreatmentPhasesDetail({treatment}:{treatment:TreatmentResponse}){
    return <div className="space-y-4 w-full">
        <Card>
            <CardHeader>
                <CardTitle>Chi tiết của phác đồ</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div className="space-y-2">
                    <p>Tiêu đề</p>
                    <p>{treatment.protocol.title}</p>
                </div>
                <div className="space-y-2">
                    <p>Mô tả</p>
                    <p>{treatment.protocol.description}</p>
                </div>
                <div className="space-y-2">
                    <p>Giá ước tính</p>
                    <p>{treatment.protocol.estimatedPrice.toLocaleString("vi-VN")+" đ"}</p>
                </div>
                <div className="space-y-2">
                    <p>Giai đoạn</p>
                    <Accordion type="single" collapsible className="w-full">
                    {treatment.protocol.phases.map((phase) => (
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
}