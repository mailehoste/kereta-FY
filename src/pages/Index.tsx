import React from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { LoanCalculator } from '@/components/LoanCalculator';
import { CarValuation } from '@/components/CarValuation';
import { JPJService } from '@/components/JPJService';
import { ChatWidget } from '@/components/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-open-sans">
      <HeroBanner />
      
      {/* Interactive Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
              Interactive Car Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate payments, get valuations, and handle documentation with our premium tools
            </p>
          </div>

          <LoanCalculator />
          <CarValuation />
          <JPJService />
        </div>
      </section>

      <ChatWidget />
    </div>
  );
};

export default Index;
