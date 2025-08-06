import React, { useState } from 'react';
import { X, Plus, BarChart3, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car } from '@/types/car';

interface ComparisonToolProps {
  cars: Car[];
  selectedCars: string[];
  onRemoveCar: (carId: string) => void;
  onAddCar: () => void;
}

interface ComparisonRow {
  label: string;
  key: keyof Car | 'maintenanceCost' | 'insuranceCost' | 'fuelEconomy';
  format?: (value: any) => string;
  category: 'price' | 'specs' | 'features' | 'costs';
}

const comparisonRows: ComparisonRow[] = [
  // Price Category
  { label: 'Price', key: 'price', format: (val) => `RM ${val.toLocaleString()}`, category: 'price' },
  { label: 'Road Tax', key: 'roadTax', format: (val) => `RM ${val}/year`, category: 'price' },
  
  // Specs Category
  { label: 'Year', key: 'year', category: 'specs' },
  { label: 'Mileage', key: 'mileage', format: (val) => `${val.toLocaleString()} km`, category: 'specs' },
  { label: 'Engine', key: 'engineCC', format: (val) => `${val}CC`, category: 'specs' },
  { label: 'Fuel Type', key: 'fuelType', category: 'specs' },
  { label: 'Transmission', key: 'transmission', category: 'specs' },
  { label: 'Body Type', key: 'bodyType', category: 'specs' },
  
  // Features Category
  { label: 'Condition', key: 'condition', category: 'features' },
  { label: 'Puspakom Status', key: 'puspakomStatus', category: 'features' },
  { label: 'Insurance Expiry', key: 'insuranceExpiry', category: 'features' },
  { label: 'Location', key: 'location', category: 'features' },
  
  // Costs Category (estimated)
  { label: 'Est. Insurance Cost', key: 'insuranceCost', format: (val) => `RM ${val}/year`, category: 'costs' },
  { label: 'Est. Maintenance Cost', key: 'maintenanceCost', format: (val) => `RM ${val}/year`, category: 'costs' },
  { label: 'Est. Fuel Economy', key: 'fuelEconomy', format: (val) => `${val} km/L`, category: 'costs' },
];

// Mock function to estimate costs
const getEstimatedCosts = (car: Car) => {
  // Simple estimation based on car value and age
  const carAge = new Date().getFullYear() - car.year;
  const insuranceCost = Math.round(car.price * 0.015); // ~1.5% of car value
  const maintenanceCost = Math.round((carAge * 500) + (car.mileage / 1000 * 10));
  const fuelEconomy = car.engineCC <= 1300 ? 15 : car.engineCC <= 1800 ? 12 : 10;
  
  return { insuranceCost, maintenanceCost, fuelEconomy };
};

export function ComparisonTool({ cars, selectedCars, onRemoveCar, onAddCar }: ComparisonToolProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const selectedCarData = cars.filter(car => selectedCars.includes(car.id));
  
  if (selectedCarData.length === 0) {
    return (
      <Card className="border-secondary/20">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="font-montserrat font-semibold text-xl mb-2">Compare Cars</h3>
          <p className="text-muted-foreground text-center font-open-sans mb-4">
            Select cars from the listings to compare their specifications, features, and costs.
          </p>
          <Button variant="hero" onClick={onAddCar}>
            <Plus className="mr-2 h-4 w-4" />
            Select Cars to Compare
          </Button>
        </CardContent>
      </Card>
    );
  }

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'price', label: 'Price' },
    { key: 'specs', label: 'Specifications' },
    { key: 'features', label: 'Features' },
    { key: 'costs', label: 'Running Costs' },
  ];

  const filteredRows = activeCategory === 'all' 
    ? comparisonRows 
    : comparisonRows.filter(row => row.category === activeCategory);

  return (
    <Card className="border-secondary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-montserrat">
            <ArrowRightLeft className="h-5 w-5 text-secondary" />
            Car Comparison ({selectedCarData.length}/3)
          </CardTitle>
          {selectedCarData.length < 3 && (
            <Button variant="outline" size="sm" onClick={onAddCar}>
              <Plus className="mr-2 h-4 w-4" />
              Add Car
            </Button>
          )}
        </div>
        
        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(category.key)}
              className="text-xs"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 font-montserrat font-semibold border-b border-secondary/20">
                  Specification
                </th>
                {selectedCarData.map((car) => (
                  <th key={car.id} className="text-center p-4 border-b border-secondary/20 min-w-64">
                    <div className="space-y-2">
                      <img
                        src={car.mainImage}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-montserrat font-semibold">
                          {car.brand} {car.model}
                        </h4>
                        <p className="text-sm text-muted-foreground">{car.year}</p>
                        <p className="font-semibold text-cta">
                          RM {car.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveCar(car.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.label} className="border-b border-secondary/20">
                  <td className="p-4 font-medium font-open-sans text-muted-foreground">
                    {row.label}
                  </td>
                  {selectedCarData.map((car) => {
                    let value;
                    if (['insuranceCost', 'maintenanceCost', 'fuelEconomy'].includes(row.key)) {
                      const costs = getEstimatedCosts(car);
                      value = costs[row.key as keyof typeof costs];
                    } else {
                      value = car[row.key as keyof Car];
                    }
                    
                    const displayValue = row.format ? row.format(value) : value;
                    
                    return (
                      <td key={car.id} className="p-4 text-center font-open-sans">
                        {row.key === 'puspakomStatus' ? (
                          <Badge 
                            variant={value === 'Valid' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {displayValue}
                          </Badge>
                        ) : (
                          <span className="font-medium">{displayValue}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedCarData.length > 0 && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground font-open-sans">
              <strong>Note:</strong> Insurance and maintenance costs are estimates based on car value, age, and mileage. 
              Actual costs may vary based on coverage, service history, and individual circumstances.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}