import React from 'react';
import { FilterX, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterState } from '@/types/car';
import { malaysianBrands, bodyTypes, locations, fuelTypes, transmissions } from '@/data/cars';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  resultsCount: number;
}

export function FilterSidebar({ filters, onFiltersChange, onClearFilters, resultsCount }: FilterSidebarProps) {
  const formatCurrency = (value: number) => `RM ${value.toLocaleString()}`;

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  return (
    <div className="w-80 space-y-6">
      {/* Header */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 font-montserrat">
              <SlidersHorizontal className="h-5 w-5 text-secondary" />
              Filters
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-cta"
            >
              <FilterX className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
          <p className="text-sm text-muted-foreground font-open-sans">
            {resultsCount} cars found
          </p>
        </CardHeader>
      </Card>

      {/* Price Range */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{formatCurrency(filters.priceRange[0])}</span>
              <span>{formatCurrency(filters.priceRange[1])}</span>
            </div>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value)}
              max={500000}
              min={20000}
              step={5000}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Brand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-64 overflow-y-auto">
          {malaysianBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleArrayFilter('brands', brand)}
              />
              <label 
                htmlFor={`brand-${brand}`} 
                className="text-sm font-open-sans cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Year Range */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Year Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
            <Slider
              value={filters.yearRange}
              onValueChange={(value) => updateFilter('yearRange', value)}
              max={2024}
              min={2010}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mileage Range */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Mileage Range (km)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{filters.mileageRange[0].toLocaleString()} km</span>
              <span>{filters.mileageRange[1].toLocaleString()} km</span>
            </div>
            <Slider
              value={filters.mileageRange}
              onValueChange={(value) => updateFilter('mileageRange', value)}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Body Type */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Body Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {bodyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`body-${type}`}
                checked={filters.bodyTypes.includes(type)}
                onCheckedChange={() => toggleArrayFilter('bodyTypes', type)}
              />
              <label 
                htmlFor={`body-${type}`} 
                className="text-sm font-open-sans cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Fuel Type */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Fuel Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fuelTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`fuel-${type}`}
                checked={filters.fuelTypes.includes(type)}
                onCheckedChange={() => toggleArrayFilter('fuelTypes', type)}
              />
              <label 
                htmlFor={`fuel-${type}`} 
                className="text-sm font-open-sans cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transmission */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Transmission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {transmissions.map((transmission) => (
            <div key={transmission} className="flex items-center space-x-2">
              <Checkbox
                id={`transmission-${transmission}`}
                checked={filters.transmissions.includes(transmission)}
                onCheckedChange={() => toggleArrayFilter('transmissions', transmission)}
              />
              <label 
                htmlFor={`transmission-${transmission}`} 
                className="text-sm font-open-sans cursor-pointer"
              >
                {transmission}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="border-secondary/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-montserrat">Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.locations.includes(location)}
                onCheckedChange={() => toggleArrayFilter('locations', location)}
              />
              <label 
                htmlFor={`location-${location}`} 
                className="text-sm font-open-sans cursor-pointer"
              >
                {location}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}