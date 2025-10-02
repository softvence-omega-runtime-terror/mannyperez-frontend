
import Wrapper from "@/components/layout/Wrapper";
import { Card } from "@/components/ui/card";


export default function WorkSteps() {
  const steps = [
    {
      number: 1,
      title: "Browse & Discover",
      description: "Explore thousands of DTF transfers, vinyl, fabric, and craft supplies from verified sellers.",
      color: "bg-pink-600",
      position: "left"
    },
    {
      number: 2,
      title: "Join Live Events",
      description: "Participate in live shopping events for exclusive deals and real-time interaction with sellers.",
      color: "bg-yellow-500",
      position: "right"
    },
    {
      number: 3,
      title: "Buy with Confidence",
      description: "Purchase from proof-verified sellers with secure payments and buyer protection.",
      color: "bg-cyan-500",
      position: "left"
    }
  ];

  return (
    <div className=" px-4">
      <Wrapper>
        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1.5 bg-accent-foreground transform -translate-x-1/2 shadow-lg" />
          <div className="hidden md:block absolute size-6 bg-accent-foreground rounded-full  transform -translate-x-1/2 left-1/2">
          </div>
          <div className="hidden md:block absolute size-6 bg-accent-foreground rounded-full bottom-0 transform -translate-x-1/2 left-1/2">
          </div>

          {/* Steps */}
          <div className="space-y-10 md:space-y-14">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative"
              >
                <div className={`flex flex-col-reverse md:flex-row items-center gap-8 ${
                  step.position === "right" ? "md:flex-row-reverse" : ""
                }`}>
                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${
                    step.position === "left" ? "text-center md:text-right" : "text-center md:text-left"
                  }`}>
                    <Card className="p-8 bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <h3 className=" text-gray-900 ">
                        {step.title}
                      </h3>
                      <p className=" leading-relaxed">
                        {step.description}
                      </p>
                    </Card>
                  </div>

                  {/* Number Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center  inset-shadow-2xl  border-6 border-accent-foreground`} >
                      <span className="text-white text-2xl font-bold">{step.number}</span>
                    </div>
                  </div>
                  {/* Spacer for alignment */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}