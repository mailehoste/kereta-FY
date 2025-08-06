import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, MapPin, Calendar, Gauge } from 'lucide-react';
import { malaysianBrands, locations } from '@/data/cars';

export const CarValuation: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    location: ''
  });
  const [valuation, setValuation] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const modelsByBrand: Record<string, string[]> = {
    'Toyota': ['Vios', 'Camry', 'Corolla', 'Innova', 'Fortuner', 'Hilux'],
    'Honda': ['City', 'Civic', 'Accord', 'CR-V', 'HR-V', 'BR-V'],
    'Proton': ['Saga', 'Persona', 'Iriz', 'X50', 'X70', 'Exora'],
    'Perodua': ['Myvi', 'Axia', 'Bezza', 'Alza', 'Aruz'],
    'BMW': ['320i', '520i', 'X1', 'X3', 'X5'],
    'Mercedes-Benz': ['C200', 'E200', 'CLA', 'GLA', 'GLC'],
    'Nissan': ['Almera', 'Teana', 'X-Trail', 'Navara'],
  };

  const conditions = [
    { value: 'excellent', label: 'Excellent', multiplier: 1.0 },
    { value: 'good', label: 'Good', multiplier: 0.9 },
    { value: 'fair', label: 'Fair', multiplier: 0.75 },
    { value: 'poor', label: 'Poor', multiplier: 0.6 }
  ];

  const calculateValuation = () => {
    if (!formData.brand || !formData.model || !formData.year || !formData.mileage || !formData.condition) {
      return;
    }

    // Mock valuation calculation
    const basePrice = 150000;
    const ageDepreciation = (2024 - parseInt(formData.year)) * 0.1;
    const mileageDepreciation = (parseInt(formData.mileage) / 100000) * 0.2;
    const conditionMultiplier = conditions.find(c => c.value === formData.condition)?.multiplier || 0.8;
    
    const estimatedValue = Math.max(
      basePrice * (1 - ageDepreciation - mileageDepreciation) * conditionMultiplier,
      20000
    );

    setValuation(Math.round(estimatedValue));
    setShowResult(true);
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-luxury-platinum/20 border-luxury-platinum shadow-luxury">
      <CardHeader className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <DollarSign className="h-6 w-6 text-cta" />
          <CardTitle className="text-2xl bg-gradient-luxury bg-clip-text text-transparent">
            Dapatkan Harga Kereta Anda
          </CardTitle>
        </div>
        <p className="text-muted-foreground">Get Instant Trade-In Value</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="brand">Car Make</Label>
              <Select value={formData.brand} onValueChange={(value) => {
                setFormData({ ...formData, brand: value, model: '' });
                setShowResult(false);
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {malaysianBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="model">Car Model</Label>
              <Select 
                value={formData.model} 
                onValueChange={(value) => {
                  setFormData({ ...formData, model: value });
                  setShowResult(false);
                }}
                disabled={!formData.brand}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {formData.brand && modelsByBrand[formData.brand]?.map((model) => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Year
                </Label>
                <Select value={formData.year} onValueChange={(value) => {
                  setFormData({ ...formData, year: value });
                  setShowResult(false);
                }}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mileage" className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Mileage (km)
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => {
                    setFormData({ ...formData, mileage: e.target.value });
                    setShowResult(false);
                  }}
                  placeholder="e.g. 50000"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Condition Rating</Label>
              <Select value={formData.condition} onValueChange={(value) => {
                setFormData({ ...formData, condition: value });
                setShowResult(false);
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition.value} value={condition.value}>
                      {condition.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location in Klang Valley
              </Label>
              <Select value={formData.location} onValueChange={(value) => {
                setFormData({ ...formData, location: value });
                setShowResult(false);
              }}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {showResult && valuation ? (
              <div className="bg-gradient-platinum p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-4 text-center">Estimated Trade-In Value</h3>
                
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-cta">
                    RM {valuation.toLocaleString()}
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Instant Valuation
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Free Assessment
                    </Badge>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Based on current market conditions</p>
                    <p>Final value subject to physical inspection</p>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Button variant="cta" size="lg" className="w-full">
                      Schedule Inspection
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Get Detailed Report
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-platinum p-6 rounded-lg border text-center">
                <h3 className="font-semibold text-lg mb-4">Ready to Value Your Car?</h3>
                <p className="text-muted-foreground mb-6">
                  Fill in the details on the left to get an instant valuation of your vehicle.
                </p>
                <Button 
                  onClick={calculateValuation}
                  variant="cta" 
                  size="lg" 
                  className="w-full"
                  disabled={!formData.brand || !formData.model || !formData.year || !formData.mileage || !formData.condition}
                >
                  Get My Car's Value
                </Button>
              </div>
            )}

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium mb-2">What You Get:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Instant market valuation</li>
                <li>• Free detailed inspection</li>
                <li>• Competitive trade-in offers</li>
                <li>• Hassle-free paperwork</li>
                <li>• Same-day payment</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};