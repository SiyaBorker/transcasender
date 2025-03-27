
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const CallToAction = () => {
  const handleContactSales = () => {
    window.location.href = "mailto:sales@transacshield.com?subject=TransacShield%20Inquiry";
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground">
          {/* Abstract Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary to-blue-700/80"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Ready to Transform Your Cross-Border Transactions?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl">
                Join thousands of businesses and individuals who are already saving time, 
                reducing costs, and eliminating intermediaries with TransacShield.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-white border-white/30 hover:bg-white/10 font-medium"
                  onClick={handleContactSales}
                >
                  <Mail size={16} className="mr-2" />
                  Contact Sales
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3 bg-white/10 rounded-xl p-6 border border-white/20 backdrop-blur-sm">
              <h3 className="text-xl font-medium mb-4">Start Transacting Today</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <span>Create a free account in minutes</span>
                </div>
                
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <span>No setup fees or monthly charges</span>
                </div>
                
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <span>Pay only for completed transactions</span>
                </div>
                
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                  </span>
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
