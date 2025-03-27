
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import CallToAction from '@/components/home/CallToAction';
import Wallet from '@/components/wallet/Wallet';
import { Separator } from '@/components/ui/separator';
import TransactionCard from '@/components/ui/TransactionCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  // Sample transaction data for demonstration
  const sampleTransactions = [
    {
      id: '8a7b6c5d4e3f2g1h',
      type: 'buyer' as const,
      amount: 5000,
      currency: 'USD',
      description: 'Electronic Components Purchase',
      status: 'in_progress' as const,
      date: '2023-08-01',
      counterparty: 'Tech Supplies Ltd.',
      progress: 60,
    },
    {
      id: '7a6b5c4d3e2f1g0h',
      type: 'seller' as const,
      amount: 2500,
      currency: 'EUR',
      description: 'Software Development Services',
      status: 'pending' as const,
      date: '2023-07-28',
      counterparty: 'Global Solutions Inc.',
      progress: 20,
    },
    {
      id: '6a5b4c3d2e1f0g9h',
      type: 'buyer' as const,
      amount: 12000,
      currency: 'JPY',
      description: 'Artwork Commission',
      status: 'completed' as const,
      date: '2023-07-15',
      counterparty: 'Creative Arts Studio',
      progress: 100,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        
        {/* Wallet Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary bg-primary/10 py-1.5 px-4 rounded-full">
                Connect Your Wallet
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-6 mb-4">
                Start Secure Transactions Today
              </h2>
              <p className="text-muted-foreground text-lg">
                Connect your blockchain wallet to access our smart contract escrow service
                and begin making secure cross-border transactions.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Wallet />
            </div>
          </div>
        </section>
        
        {/* Sample Transactions Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary bg-primary/10 py-1.5 px-4 rounded-full">
                In Action
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mt-6 mb-4">
                See How TransacShield Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore sample transactions to understand how our escrow service facilitates
                secure cross-border payments between parties.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  {...transaction}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/transactions">
                <Button size="lg">
                  View All Transactions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <Separator />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
