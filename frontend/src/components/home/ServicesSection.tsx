import { NavLink } from "react-router-dom"; 
import { Card, CardFooter } from "@/components/ui/card"; 

export default function ServicesSection() {
  return (
    <div className="outer-container">
      <div className="max-container flex flex-col items-center py-8 lg:py-16">
        <h2 className="text-center text-4xl font-semibold uppercase text-blue-700/90 border-b-2 border-blue-800/80 pb-3 mb-8 w-fit">
          Dịch vụ
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center w-full">
          <Card className="w-[90%] lg:w-[40%] rounded-2xl shadow-sm transition hover:shadow-lg overflow-hidden py-0 gap-0">
            {/* Image for the service */}
            <img
              alt="Service IUI"
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              className="w-full h-auto object-cover"
            />

            <CardFooter className="bg-blue-900/90 saturate-80 p-4">
              <NavLink to="#" className="w-full">
                <h3 className="text-white text-2xl font-bold text-center">
                  Dịch vụ IUI
                </h3>
              </NavLink>
            </CardFooter>
          </Card>

          <Card className="w-[90%] lg:w-[40%] rounded-2xl shadow-sm transition hover:shadow-lg overflow-hidden py-0 gap-0">
            <img
              alt="Service IVF"
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              className="w-full h-auto object-cover"
            />
            <CardFooter className="bg-blue-900/90 saturate-80 p-4">
              <NavLink to="#" className="w-full">
                <h3 className="text-white text-2xl font-bold text-center">
                  Dịch vụ IVF
                </h3>
              </NavLink>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}