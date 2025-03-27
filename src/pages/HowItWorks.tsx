
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import HowItWorksModal from '@/components/modals/HowItWorksModal';

const HowItWorksPage = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">How TransacShield Works</h1>
            <p className="text-xl text-muted-foreground">
              Understand our smart contract-powered escrow system for secure global transactions
            </p>
          </div>
          
          <div className="my-10 flex justify-center">
            <Button 
              size="lg"
              onClick={() => setShowModal(true)}
            >
              View Interactive Smart Contract Demo
            </Button>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Secure Smart Contract Escrow</h2>
            <p>
              TransacShield utilizes blockchain technology to create a trustless environment for 
              international transactions. Our smart contracts serve as an automated neutral third 
              party that holds funds in escrow until all conditions of the transaction are met.
            </p>
            
            <h3>Key Benefits</h3>
            <ul>
              <li>
                <strong>Reduced Fees:</strong> By eliminating traditional intermediaries, we reduce 
                transaction fees by up to 50%.
              </li>
              <li>
                <strong>Enhanced Security:</strong> Blockchain technology ensures that transactions 
                are secure, transparent, and immutable.
              </li>
              <li>
                <strong>Global Accessibility:</strong> Operate across borders without concern for 
                traditional banking limitations.
              </li>
              <li>
                <strong>Multi-Currency Support:</strong> Use both fiat and cryptocurrencies, with 
                automatic conversion at the best available rates.
              </li>
            </ul>
            
            <h2>Dispute Resolution</h2>
            <p>
              Even with the best systems, disputes can sometimes arise between buyers and sellers. 
              TransacShield offers a unique community-driven dispute resolution process that ensures 
              fair outcomes for all parties involved.
            </p>
            
            <h3>The Voting Mechanism</h3>
            <p>
              When a dispute is raised, our platform engages a decentralized community of arbitrators 
              who review evidence submitted by both parties. These arbitrators then vote on the outcome, 
              with the smart contract automatically executing the majority decision.
            </p>
            
            <p>
              This system removes the possibility of bias from centralized authority and ensures that 
              the wisdom of the crowd prevails. Arbitrators are incentivized to make fair judgments 
              through our reputation and staking system.
            </p>
            
            <h2>Multi-Currency Integration</h2>
            <p>
              TransacShield supports a wide range of payment options to accommodate diverse transaction needs:
            </p>
            
            <h3>Fiat Currencies</h3>
            <p>
              We support all major global currencies, including USD, EUR, GBP, JPY, AUD, CAD, and many 
              more. Real-time exchange rates ensure fair value when converting between currencies.
            </p>
            
            <h3>Cryptocurrencies</h3>
            <p>
              For those who prefer blockchain-based transactions, we support popular cryptocurrencies 
              like BTC, ETH, USDC, USDT, BNB, and others. Our smart contracts ensure secure handling 
              of crypto transactions.
            </p>
            
            <h2>Getting Started</h2>
            <p>
              Ready to experience the future of secure transactions? Creating an account takes just a 
              few minutes, and you can start your first transaction immediately after registration.
            </p>
            
            <p>
              For more detailed information, check out our interactive demo that walks through the 
              entire process from contract creation to successful completion.
            </p>
          </div>
        </div>
      </main>
      
      <HowItWorksModal 
        open={showModal} 
        onOpenChange={setShowModal} 
      />
      
      <Separator />
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
