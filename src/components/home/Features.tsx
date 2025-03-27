
import React from 'react';
import { Check } from 'lucide-react';

const features = [
  {
    title: "Smart Contract Escrow",
    description: "Secure funds in a decentralized escrow with automated conditions for release, ensuring trust between parties.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <path d="M3 9h18"/>
        <path d="M3 15h18"/>
        <path d="M9 3v18"/>
        <path d="M15 3v18"/>
      </svg>
    ),
    benefits: [
      "No trusted third party required",
      "Programmable release conditions",
      "Immutable transaction history",
      "Transparent process for all parties"
    ]
  },
  {
    title: "Multi-Currency Support",
    description: "Seamlessly transact in major fiat currencies and cryptocurrencies with real-time conversion rates.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" x2="9" y1="9" y2="9.01"/>
        <line x1="15" x2="15" y1="9" y2="9.01"/>
      </svg>
    ),
    benefits: [
      "USD, EUR, GBP, JPY, and more",
      "Bitcoin, Ethereum, and stablecoins",
      "Competitive exchange rates",
      "Minimal currency conversion fees"
    ]
  },
  {
    title: "Dispute Resolution",
    description: "Fair and efficient conflict resolution with optional third-party arbitration when disputes arise.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </svg>
    ),
    benefits: [
      "AI-assisted initial resolution",
      "Optional trusted arbitrators",
      "Clear resolution timeframes",
      "Fair decision enforcement"
    ]
  },
  {
    title: "Regulatory Compliance",
    description: "Built-in compliance checks to ensure transactions meet international regulations and standards.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="m9 11-6 6v3h9l3-3"/>
        <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
      </svg>
    ),
    benefits: [
      "KYC/AML verification",
      "Cross-border transaction compliance",
      "Regulatory reporting",
      "Secure data handling"
    ]
  }
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary bg-primary/10 py-1.5 px-4 rounded-full">
            Core Features
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-6 mb-4">
            Designed for Secure Global Transactions
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines blockchain technology with user-friendly interfaces to make
            cross-border transactions secure, fast, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-border bg-white shadow-subtle hover-scale"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check size={18} className="text-primary mr-2 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
