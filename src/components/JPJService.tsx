import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, FileText, CreditCard } from 'lucide-react';

export const JPJService: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('transfer');

  const services = [
    {
      id: 'transfer',
      name: 'Tukar Nama JPJ',
      nameEn: 'Ownership Transfer',
      price: 'RM 200 - 350',
      duration: '1-3 days',
      description: 'Complete ownership transfer service with JPJ'
    },
    {
      id: 'roadtax',
      name: 'Cukai Jalan',
      nameEn: 'Road Tax Renewal',
      price: 'RM 50',
      duration: 'Same day',
      description: 'Road tax renewal and processing'
    },
    {
      id: 'insurance',
      name: 'Insurans',
      nameEn: 'Insurance Processing',
      price: 'RM 100',
      duration: 'Same day',
      description: 'Insurance documentation and processing'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Document Submission',
      description: 'Submit required documents and payment',
      icon: FileText,
      duration: '30 minutes'
    },
    {
      step: 2,
      title: 'JPJ Processing',
      description: 'Our team handles JPJ submission',
      icon: Clock,
      duration: '1-2 days'
    },
    {
      step: 3,
      title: 'Collection Ready',
      description: 'Documents ready for collection',
      icon: CheckCircle,
      duration: 'Same day'
    }
  ];

  const requiredDocuments = [
    'Original Grant/Log Card',
    'Original IC (Buyer & Seller)',
    'Insurance Cover Note',
    'Borang JPJ K3 (if applicable)',
    'Company documents (if applicable)',
    'Puspakom B5 Report (for cars >5 years)',
    'Sales Agreement'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-card via-card to-luxury-platinum/20 border-luxury-platinum shadow-luxury">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl bg-gradient-luxury bg-clip-text text-transparent">
            Tukar Nama JPJ Service
          </CardTitle>
          <p className="text-muted-foreground">Professional JPJ Transfer & Documentation</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Service Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Service</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedService === service.id 
                      ? 'ring-2 ring-cta bg-gradient-platinum' 
                      : 'hover:bg-gradient-platinum/50'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardContent className="p-4 text-center">
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">{service.nameEn}</p>
                    <div className="mt-2 space-y-1">
                      <Badge variant="outline" className="bg-cta/10 text-cta border-cta/20">
                        {service.price}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{service.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Process Timeline</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {processSteps.map((step, index) => (
                <div key={step.step} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-luxury rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="h-4 w-4 text-cta" />
                      <h4 className="font-semibold text-sm">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block w-8 border-t border-dashed border-border mt-5"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
              <div className="bg-gradient-platinum p-4 rounded-lg border">
                <ul className="space-y-2">
                  {requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Service Benefits</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-cta" />
                    <h4 className="font-semibold">Transparent Pricing</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No hidden fees. Clear breakdown of all charges upfront.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-cta" />
                    <h4 className="font-semibold">Fast Processing</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Express service available. Standard processing within 1-3 days.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5 text-cta" />
                    <h4 className="font-semibold">Complete Service</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We handle everything from document preparation to JPJ submission.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Fees */}
          <div className="bg-gradient-platinum p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-center">Service Fees</h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="font-semibold text-cta">Individual Transfer</h4>
                <p className="text-2xl font-bold">RM 200</p>
                <p className="text-sm text-muted-foreground">Personal car transfer</p>
              </div>
              <div>
                <h4 className="font-semibold text-cta">Company Transfer</h4>
                <p className="text-2xl font-bold">RM 350</p>
                <p className="text-sm text-muted-foreground">Business/company transfer</p>
              </div>
              <div>
                <h4 className="font-semibold text-cta">Express Service</h4>
                <p className="text-2xl font-bold">RM +100</p>
                <p className="text-sm text-muted-foreground">Same day processing</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button variant="cta" size="lg" className="px-8">
              Book JPJ Transfer Service
            </Button>
            <p className="text-sm text-muted-foreground">
              Free consultation • Professional service • Money-back guarantee
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};