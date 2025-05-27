import { NavLink } from 'react-router-dom'
export default function ServicesSection() {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 lg:col-span-12 mx-12 my-6">
            <div className="lg:col-span-2 text-center text-4xl font-bold uppercase text-blue-700/90">
                Dịch vụ
                <div className='w-25 border-b-2 border-blue-800/80 mx-auto my-5'></div>
            </div>

            <div className="w-[80%] h-auto col-span-1 overflow-hidden rounded-3xl shadow-sm transition hover:shadow-lg flex-col justify-center items-center justify-self-center">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    className="w-full h-auto object-cover"
                />

                <div className="bg-blue-900/90 filter saturate-80 p-4 sm:p-6">

                    <NavLink to="#">
                        <h3 className="text-white text-2xl font-bold text-center">
                            Dịch vụ IUI
                        </h3>
                    </NavLink>

                </div>
            </div>

            <div className="w-[80%] h-auto col-span-1 overflow-hidden rounded-3xl shadow-sm transition hover:shadow-lg flex-col justify-center items-center justify-self-center">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    className="w-full h-auto object-cover"
                />

                <div className="bg-blue-900/90 filter saturate-80 p-4 sm:p-6">

                    <NavLink to="#">
                        <h3 className="text-white text-2xl font-bold text-center">
                            Dịch vụ IVF
                        </h3>
                    </NavLink>

                </div>
            </div>
        </div>
    )
}