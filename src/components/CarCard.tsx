import React, { useState } from 'react';
import { Heart, Eye, BarChart3, MapPin, Calendar, Fuel, Gauge, Settings, Badge, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge as BadgeComponent } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
  onCompare: (carId: string, checked: boolean) => void;
  isComparing: boolean;
}

export function CarCard({ car, onCompare, isComparing }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => `RM ${price.toLocaleString()}`;
  const formatMileage = (mileage: number) => `${mileage.toLocaleString()} km`;

  const getPuspakomBadgeColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-500';
      case 'Due Soon': return 'bg-yellow-500';
      case 'Expired': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-card hover:shadow-luxury transition-all duration-500 border-secondary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={car.mainImage}
          alt={`${car.brand} ${car.model}`}
          className={`w-full h-64 object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Image Gallery Indicator */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
          <Camera className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{car.images.length}</span>
        </div>

        {/* Location Badge */}
        <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <MapPin className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium text-primary">{car.location}</span>
        </div>

        {/* Heart Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute bottom-4 right-4 p-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            isLiked 
              ? 'bg-cta text-cta-foreground border-cta/20' 
              : 'bg-background/80 text-muted-foreground border-secondary/20 hover:text-cta'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Compare Checkbox */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <Checkbox
              id={`compare-${car.id}`}
              checked={isComparing}
              onCheckedChange={(checked) => onCompare(car.id, !!checked)}
            />
            <label 
              htmlFor={`compare-${car.id}`} 
              className="text-sm font-medium cursor-pointer"
            >
              Compare
            </label>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-montserrat font-bold text-xl text-foreground mb-1">
            {car.brand} {car.model}
          </h3>
          <p className="font-montserrat font-bold text-3xl text-cta">
            {formatPrice(car.price)}
          </p>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-secondary" />
            <span className="text-sm font-open-sans text-muted-foreground">
              {car.year}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-secondary" />
            <span className="text-sm font-open-sans text-muted-foreground">
              {formatMileage(car.mileage)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-secondary" />
            <span className="text-sm font-open-sans text-muted-foreground">
              {car.fuelType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-secondary" />
            <span className="text-sm font-open-sans text-muted-foreground">
              {car.engineCC}CC
            </span>
          </div>
        </div>

        {/* Malaysian-specific details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-open-sans text-muted-foreground">Road Tax:</span>
            <span className="text-sm font-medium">RM {car.roadTax}/year</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-open-sans text-muted-foreground">Insurance:</span>
            <span className="text-sm font-medium">{car.insuranceExpiry}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-open-sans text-muted-foreground">Puspakom:</span>
            <BadgeComponent className={`text-xs ${getPuspakomBadgeColor(car.puspakomStatus)} text-white`}>
              {car.puspakomStatus}
            </BadgeComponent>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="cta" size="sm" className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            Test Drive
          </Button>
          <Button variant="hero" size="sm" className="flex-1">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>

        {/* Dealer Info */}
        <div className="mt-4 pt-4 border-t border-secondary/20">
          <p className="text-xs font-open-sans text-muted-foreground">
            Available at <span className="font-medium text-foreground">{car.dealer}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}