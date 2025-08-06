import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sliders as SliderIcon, Car, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

const malaysianBrands = [
  'Proton', 'Perodua', 'Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 
  'Nissan', 'Hyundai', 'Mazda', 'Volkswagen', 'Audi', 'Lexus'
];

const bodyTypes = [
  { name: 'Sedan', icon: '🚗' },
  { name: 'SUV', icon: '🚙' },
  { name: 'MPV', icon: '🚐' },
  { name: 'Hatchback', icon: '🚕' },
  { name: 'Coupe', icon: '🏎️' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

export function HeroSearch() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState([50000]);
  const [brand, setBrand] = useState('');
  const [year, setYear] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Navigate to cars page with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (brand) params.set('brand', brand);
    if (year) params.set('year', year);
    if (bodyType) params.set('bodyType', bodyType);
    params.set('maxPrice', budget[0].toString());
    
    navigate(`/cars?${params.toString()}`);
  };

  const handleValuation = () => {
    // For now, just navigate to cars page
    navigate('/cars');
  };

  const formatCurrency = (value: number) => {
    return `RM ${value.toLocaleString()}`;
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-background/95 backdrop-blur-lg border-secondary/20 shadow-luxury">
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Search & Filters */}
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Cari model kereta, jenama, atau tahun..."
                className="pl-12 h-14 text-lg font-open-sans border-secondary/20 focus:border-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="h-12 font-open-sans border-secondary/20">
                  <SelectValue placeholder="Jenama" />
                </SelectTrigger>
                <SelectContent className="bg-background border-secondary/20">
                  {malaysianBrands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="h-12 font-open-sans border-secondary/20">
                  <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent className="bg-background border-secondary/20">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SliderIcon className="h-5 w-5 text-secondary" />
                <span className="font-montserrat font-medium text-foreground">
                  Bajet: {formatCurrency(budget[0])}
                </span>
              </div>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={500000}
                min={20000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground font-open-sans">
                <span>RM 20,000</span>
                <span>RM 500,000+</span>
              </div>
            </div>
          </div>

          {/* Right Column - Body Types & Actions */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-montserrat font-semibold text-lg text-foreground">
                Jenis Badan Kereta
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {bodyTypes.map((type) => (
                  <button
                    key={type.name}
                    onClick={() => setBodyType(type.name)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 font-open-sans ${
                      bodyType === type.name
                        ? 'border-secondary bg-secondary/10 text-primary'
                        : 'border-secondary/20 hover:border-secondary/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                variant="cta" 
                size="xl" 
                className="w-full"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                Cari Kereta Impian Anda
              </Button>
              
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleValuation}
              >
                <Car className="mr-2 h-5 w-5" />
                Dapatkan Harga Kereta Anda
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground font-open-sans">
              <MapPin className="h-4 w-4 text-secondary" />
              <span>Serving Klang Valley: KL, Selangor, Shah Alam, Petaling Jaya</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}