
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HowItWorksModal from '@/components/modals/HowItWorksModal';

const Hero = () => {
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      
      {/* Abstract Shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            Revolutionizing Cross-Border Transactions
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 animate-fade-in-down">
            Secure Escrow for <span className="text-primary">Global</span> Transactions
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 animate-fade-in-down animate-delay-100">
            Smart contract-powered escrow service eliminating intermediaries, reducing fees, 
            and providing transparent cross-border transactions.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-down animate-delay-200">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => setShowHowItWorksModal(true)}
            >
              How It Works
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in-up animate-delay-200">
              <div className="text-3xl font-semibold text-foreground">50%</div>
              <div className="text-muted-foreground mt-1">Lower Fees</div>
            </div>
            <div className="animate-fade-in-up animate-delay-300">
              <div className="text-3xl font-semibold text-foreground">99.9%</div>
              <div className="text-muted-foreground mt-1">Uptime</div>
            </div>
            <div className="animate-fade-in-up animate-delay-400">
              <div className="text-3xl font-semibold text-foreground">10K+</div>
              <div className="text-muted-foreground mt-1">Transactions</div>
            </div>
            <div className="animate-fade-in-up animate-delay-500">
              <div className="text-3xl font-semibold text-foreground">150+</div>
              <div className="text-muted-foreground mt-1">Countries</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="container mt-20 animate-fade-in-up animate-delay-300">
        <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
          <div className="glass rounded-2xl p-8 border border-white/20">
            <div className="aspect-video rounded-xl bg-white/80 shadow-sm overflow-hidden flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-1">Dashboard Preview</h3>
                <p className="text-muted-foreground text-sm">
                  Secure and intuitive interface for managing your transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Modal */}
      <HowItWorksModal 
        open={showHowItWorksModal} 
        onOpenChange={setShowHowItWorksModal} 
      />
    </section>
  );
};

export default Hero;
