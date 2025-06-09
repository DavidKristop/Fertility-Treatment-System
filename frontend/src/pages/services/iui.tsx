import { Button } from "@/components/ui/button"
import demo_hospital from "src/assets/iui.png"
import { Calendar, Stethoscope, TestTube, Phone, CheckCircle, Clock } from "lucide-react"

export default function Iui() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="outer-container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 justify-items-center items-center max-container">
          {/* Content */}
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
              Intrauterine
              <span className="text-blue-600"> Insemination</span>
              <span className="block text-3xl md:text-4xl xl:text-5xl mt-2 text-muted-foreground">(IUI)</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A gentle, effective fertility treatment that helps couples achieve their dream of parenthood. IUI is a
              less invasive procedure that places specially prepared sperm directly into the uterus during ovulation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 justify-self-end">
            <div className="md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="Happy couple consultation with fertility doctor"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is IUI Section */}
      <section className="bg-slate-50 py-16 md:py-24 outer-container">
        <div className="mx-auto px-4 max-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="IUI procedure illustration"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What is IUI?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Intrauterine Insemination (IUI) is a fertility treatment where specially prepared sperm is placed
                directly into the uterus around the time of ovulation. This procedure increases the number of sperm that
                reach the fallopian tubes and subsequently increases the chance of fertilization.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Less Invasive</h3>
                    <p className="text-muted-foreground">Simpler procedure compared to IVF with minimal discomfort</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Cost-Effective</h3>
                    <p className="text-muted-foreground">
                      More affordable option for many couples starting fertility treatment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Natural Process</h3>
                    <p className="text-muted-foreground">Fertilization occurs naturally within the body</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IUI Process Steps */}
      <section className="py-16 md:py-24 mx-auto outer-container">
        <div className="px-4 max-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The IUI Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive IUI treatment follows a carefully planned timeline to maximize your chances of success.
            </p>
          </div>

          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold">Initial Consultation & Testing</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Your fertility journey begins with a comprehensive consultation including medical history review,
                physical examination, and fertility testing for both partners.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Fertility hormone blood tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Ultrasound examination</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Semen analysis</span>
                </div>
              </div>
            </div>
            <div className="md:max-w-[450px] justify-self-end">
              <img
                src={demo_hospital}
                alt="Doctor consultation"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative order-2 md:order-1 md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="Ovulation monitoring"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold">Ovulation Monitoring</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We carefully track your ovulation cycle using ultrasounds and blood tests to determine the optimal
                timing for the IUI procedure. Some patients may receive fertility medications to stimulate ovulation.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Regular monitoring appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Hormone level tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Ovulation prediction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold">Sperm Preparation</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                On the day of the procedure, a semen sample is collected and processed in our laboratory to concentrate
                the healthiest, most motile sperm for the insemination.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Sperm washing and concentration</span>
                </div>
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Quality assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Preparation for insemination</span>
                </div>
              </div>
            </div>
            <div className="md:max-w-[450px] justify-self-end">
              <img
                src={demo_hospital}
                alt="Laboratory sperm preparation"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1 md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="IUI procedure"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="text-2xl font-bold">IUI Procedure & Follow-up</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The prepared sperm is gently inserted into your uterus using a thin catheter. The procedure is quick,
                typically taking just a few minutes, and most women experience minimal discomfort.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">5-10 minute procedure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Pregnancy test in 2 weeks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Ongoing support and monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Content */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fertility Journey?</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Take the first step towards parenthood with our compassionate team of fertility specialists. Schedule
              your consultation today to learn if IUI is right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone className="w-4 h-4" />
                Schedule Consultation
              </Button>
              <Button size="lg" variant="secondary">
                Call (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}