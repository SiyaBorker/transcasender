
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Initiate Transaction",
    description: "Buyer creates a new transaction with details of the purchase, selecting currency and setting conditions.",
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200"
  },
  {
    number: "02",
    title: "Fund Escrow",
    description: "Buyer funds the smart contract escrow with the agreed amount, which is securely locked.",
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200"
  },
  {
    number: "03",
    title: "Seller Confirmation",
    description: "Seller accepts the transaction and commits to delivering the goods or services.",
    color: "bg-green-50 text-green-600",
    borderColor: "border-green-200"
  },
  {
    number: "04",
    title: "Delivery & Verification",
    description: "Seller provides goods/services, and buyer verifies the delivery meets agreed terms.",
    color: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-200"
  },
  {
    number: "05",
    title: "Release of Funds",
    description: "Upon confirmation, funds are automatically released to the seller from the escrow.",
    color: "bg-emerald-50 text-emerald-600",
    borderColor: "border-emerald-200"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary bg-primary/10 py-1.5 px-4 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-6 mb-4">
            Simple, Secure Transaction Process
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform simplifies complex cross-border transactions with a straightforward, 
            secure process that protects both buyers and sellers.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[47px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px hidden sm:block z-0"></div>

          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } gap-8 md:gap-16 items-center`}
              >
                <div className="flex-1">
                  <div 
                    className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center text-3xl font-bold border-2 ${step.borderColor} relative z-10 mx-auto md:mx-0 bg-white`}
                  >
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
