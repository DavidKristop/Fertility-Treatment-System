import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ProtocolResponse } from "@/api/types"

interface ProtocolCardProps {
  protocol: ProtocolResponse
}

export default function ProtocolCard({ protocol }: ProtocolCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-[#004c77] to-[#006299] text-white rounded-t-lg p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight">{protocol.title}</h3>
          <p className="text-gray-100 text-sm">{protocol.description}</p>
          <div className="mt-4 pt-4 border-t border-white/20">
            <span className="text-3xl font-bold">
              {protocol.estimatedPrice.toLocaleString('vi-VN')}đ
            </span>
            <span className="text-sm ml-2 opacity-75">(Giá ước tính)</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Accordion type="single" collapsible className="space-y-2">
          {protocol.phases.map((phase, index) => (
            <AccordionItem 
              key={phase.id} 
              value={`phase-${index}`}
              className="border rounded-lg px-4 hover:bg-gray-50"
            >
              <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#004c77] text-white text-sm">
                    {index + 1}
                  </span>
                  <span className="text-[#004c77]">{phase.title}</span>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="pb-4">
                <div className="space-y-6 pl-11">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {phase.description}
                  </p>

                  {phase.services && phase.services.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#004c77] mb-3">Dịch vụ</h4>
                      <ul className="space-y-2">
                        {phase.services.map((service) => (
                          <li key={service.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">{service.name}</span>
                            <span className="text-gray-900 font-medium">
                              {service.price.toLocaleString('vi-VN')}đ{service.unit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* {phase.drugs && phase.drugs.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-[#004c77] mb-3">Thuốc</h4>
                      <ul className="space-y-2">
                        {phase.drugs.map((drug) => (
                          <li key={drug.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">{drug.name}</span>
                            <span className="text-gray-900 font-medium">
                              {drug.price.toLocaleString('vi-VN')}đ/{drug.unit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}