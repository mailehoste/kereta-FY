export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid';
  engineCC: number;
  transmission: 'Manual' | 'Auto' | 'CVT';
  bodyType: 'Sedan' | 'SUV' | 'MPV' | 'Hatchback' | 'Coupe';
  images: string[];
  mainImage: string;
  location: string;
  roadTax: number;
  insuranceExpiry: string;
  puspakomStatus: 'Valid' | 'Expired' | 'Due Soon';
  features: string[];
  condition: 'Excellent' | 'Good' | 'Fair';
  dealer: string;
  isAvailable: boolean;
}

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  yearRange: [number, number];
  mileageRange: [number, number];
  fuelTypes: string[];
  bodyTypes: string[];
  transmissions: string[];
  locations: string[];
}

export interface ComparisonCar extends Car {
  maintenanceCost: number;
  insuranceCost: number;
  fuelEconomy: number;
}