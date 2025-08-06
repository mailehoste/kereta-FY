import React, { useState, useMemo } from 'react';
import { Grid3X3, List, ArrowUpDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CarCard } from '@/components/CarCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ComparisonTool } from '@/components/ComparisonTool';
import { Car, FilterState } from '@/types/car';
import { mockCars } from '@/data/cars';

const initialFilters: FilterState = {
  priceRange: [20000, 500000],
  brands: [],
  yearRange: [2010, 2024],
  mileageRange: [0, 200000],
  fuelTypes: [],
  bodyTypes: [],
  transmissions: [],
  locations: [],
};

type SortOption = 'price-asc' | 'price-desc' | 'year-asc' | 'year-desc' | 'mileage-asc' | 'mileage-desc';

export function CarListings() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCarsForComparison, setSelectedCarsForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    let filtered = mockCars.filter((car) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = `${car.brand} ${car.model} ${car.year}`.toLowerCase();
        if (!searchableText.includes(query)) return false;
      }

      // Price range filter
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) return false;

      // Year range filter
      if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) return false;

      // Mileage range filter
      if (car.mileage < filters.mileageRange[0] || car.mileage > filters.mileageRange[1]) return false;

      // Fuel type filter
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(car.fuelType)) return false;

      // Body type filter
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(car.bodyType)) return false;

      // Transmission filter
      if (filters.transmissions.length > 0 && !filters.transmissions.includes(car.transmission)) return false;

      // Location filter
      if (filters.locations.length > 0 && !filters.locations.includes(car.location)) return false;

      return true;
    });

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-asc':
          return a.year - b.year;
        case 'year-desc':
          return b.year - a.year;
        case 'mileage-asc':
          return a.mileage - b.mileage;
        case 'mileage-desc':
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy, searchQuery]);

  const handleCompareToggle = (carId: string, checked: boolean) => {
    if (checked && selectedCarsForComparison.length < 3) {
      setSelectedCarsForComparison([...selectedCarsForComparison, carId]);
    } else if (!checked) {
      setSelectedCarsForComparison(selectedCarsForComparison.filter(id => id !== carId));
    }
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-4xl text-foreground mb-4">
            Premium Used Cars in Klang Valley
          </h1>
          <p className="font-open-sans text-lg text-muted-foreground">
            Discover quality pre-owned vehicles from trusted dealers across KL, Selangor, and surrounding areas
          </p>
        </div>

        {/* Search and Controls */}
        <Card className="mb-6 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1">
                <Input
                  placeholder="Search by brand, model, or year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg border-secondary/20"
                />
              </div>
              
              <div className="flex gap-4 items-center">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-48 border-secondary/20">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="year-desc">Year: Newest First</SelectItem>
                    <SelectItem value="year-asc">Year: Oldest First</SelectItem>
                    <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
                    <SelectItem value="mileage-desc">Mileage: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-secondary/20 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-secondary/20"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Tool */}
        {selectedCarsForComparison.length > 0 && (
          <div className="mb-6">
            <ComparisonTool
              cars={mockCars}
              selectedCars={selectedCarsForComparison}
              onRemoveCar={(carId) => setSelectedCarsForComparison(
                selectedCarsForComparison.filter(id => id !== carId)
              )}
              onAddCar={() => setShowComparison(true)}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
                resultsCount={filteredAndSortedCars.length}
              />
            </div>
          )}

          {/* Car Listings */}
          <div className="flex-1">
            {filteredAndSortedCars.length === 0 ? (
              <Card className="border-secondary/20">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <h3 className="font-montserrat font-semibold text-xl mb-2">No cars found</h3>
                    <p className="text-muted-foreground font-open-sans mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button variant="hero" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredAndSortedCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onCompare={handleCompareToggle}
                    isComparing={selectedCarsForComparison.includes(car.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}