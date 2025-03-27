
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DisputeResolution from '@/components/dispute/DisputeResolution';

const DisputesPage = () => {
  // Sample dispute data
  const activeDisputes = [
    {
      transactionId: "tx_78912345",
      amount: 2500,
      currency: "USD",
      title: "Product Not As Described",
      description: "The seller shipped a different product than what was listed in the original agreement. The product received is of lower quality and does not match the specifications we agreed upon.",
      buyerAddress: "0x1234...5678",
      sellerAddress: "0x8765...4321",
      evidenceUrls: ["evidence1.jpg", "evidence2.jpg"],
      status: 'active' as const,
      timeRemaining: "1 day 8 hours",
      votesFor: 24,
      votesAgainst: 7,
    },
    {
      transactionId: "tx_45678901",
      amount: 1800,
      currency: "EUR",
      title: "Late Delivery Dispute",
      description: "The product was delivered 3 weeks after the agreed-upon deadline, causing significant delays to our project timeline and resulting in financial losses.",
      buyerAddress: "0x2345...6789",
      sellerAddress: "0x9876...5432",
      evidenceUrls: ["evidence1.jpg"],
      status: 'active' as const,
      timeRemaining: "2 days 10 hours",
      votesFor: 12,
      votesAgainst: 15,
    }
  ];

  const resolvedDisputes = [
    {
      transactionId: "tx_23456789",
      amount: 3500,
      currency: "USDC",
      title: "Incomplete Service Delivery",
      description: "The agreed-upon services were only partially delivered, with key components missing from the final deliverable.",
      buyerAddress: "0x3456...7890",
      sellerAddress: "0x0987...6543",
      evidenceUrls: ["evidence1.jpg", "evidence2.jpg", "evidence3.jpg"],
      status: 'resolved' as const,
      votesFor: 32,
      votesAgainst: 8,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Dispute Resolution</h1>
            <p className="text-xl text-muted-foreground">
              Community-driven voting system to resolve transaction disputes fairly
            </p>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="active">Active Disputes</TabsTrigger>
              <TabsTrigger value="resolved">Resolved Disputes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-8">
              {activeDisputes.length > 0 ? (
                activeDisputes.map((dispute, index) => (
                  <DisputeResolution key={index} {...dispute} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No active disputes at this time</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resolved" className="space-y-8">
              {resolvedDisputes.length > 0 ? (
                resolvedDisputes.map((dispute, index) => (
                  <DisputeResolution key={index} {...dispute} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No resolved disputes to display</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 bg-muted/30 p-6 rounded-lg border border-border">
            <h2 className="text-xl font-medium mb-4">How Dispute Resolution Works</h2>
            <p className="mb-4">
              TransacShield uses a decentralized voting mechanism to ensure fair resolution of disputes between buyers and sellers. 
              Community members review evidence and vote on the outcome, with the smart contract automatically executing the majority decision.
            </p>
            <div className="flex justify-center mt-6">
              <Button>Learn More About Dispute Resolution</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Separator />
      <Footer />
    </div>
  );
};

export default DisputesPage;
