import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Car, 
  Calendar, 
  FileSearch, 
  CreditCard, 
  FileText, 
  DollarSign,
  Globe
} from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ms'>('en');

  const quickActions = [
    {
      icon: Calendar,
      titleEn: 'Schedule Test Drive',
      titleMs: 'Tempah Test Drive',
      action: () => console.log('Schedule test drive')
    },
    {
      icon: FileSearch,
      titleEn: 'Check Car History',
      titleMs: 'Semak Sejarah Kereta',
      action: () => console.log('Check car history')
    },
    {
      icon: CreditCard,
      titleEn: 'Get Financing Options',
      titleMs: 'Pilihan Pembiayaan',
      action: () => console.log('Get financing')
    },
    {
      icon: FileText,
      titleEn: 'JPJ Transfer Service',
      titleMs: 'Perkhidmatan Tukar Nama JPJ',
      action: () => console.log('JPJ service')
    },
    {
      icon: DollarSign,
      titleEn: 'Trade-in My Car',
      titleMs: 'Trade-in Kereta Saya',
      action: () => console.log('Trade-in car')
    }
  ];

  const welcomeMessage = {
    en: "Hi! I'm here to help you find your perfect car",
    ms: "Hi! Saya di sini untuk membantu anda cari kereta yang sesuai"
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-luxury hover:bg-gradient-luxury/90 shadow-luxury transition-all duration-300 hover:scale-110"
          size="lg"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <div className="relative">
              <Car className="h-6 w-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-malaysia-red rounded-full border-2 border-white"></div>
            </div>
          )}
        </Button>
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-h-96 animate-slide-in-right">
          <Card className="bg-white border-luxury-platinum shadow-luxury">
            <CardHeader className="bg-gradient-luxury text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  <CardTitle className="text-lg">LuxCars Assistant</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(language === 'en' ? 'ms' : 'en')}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                    {language.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              {/* Welcome Message */}
              <div className="bg-gradient-platinum p-3 rounded-lg">
                <p className="text-sm font-medium">{welcomeMessage[language]}</p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Quick Actions</h4>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3 hover:bg-gradient-platinum/50"
                      onClick={action.action}
                    >
                      <action.icon className="h-4 w-4 mr-3 text-cta flex-shrink-0" />
                      <span className="text-sm">
                        {language === 'en' ? action.titleEn : action.titleMs}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{language === 'en' ? 'Online - Response within 2 minutes' : 'Online - Respons dalam 2 minit'}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};