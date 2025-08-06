import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Key, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSearch } from './HeroSearch';
import heroShowroom from '@/assets/hero-car-showroom.jpg';
import heroHighway from '@/assets/hero-car-highway.jpg';
import heroDealership from '@/assets/hero-dealership.jpg';

const heroImages = [
  {
    src: heroShowroom,
    title: "Premium Luxury Cars",
    subtitle: "In the heart of Kuala Lumpur"
  },
  {
    src: heroHighway,
    title: "Drive Your Dreams",
    subtitle: "On Malaysian roads"
  },
  {
    src: heroDealership,
    title: "Trusted Dealerships",
    subtitle: "Across Klang Valley"
  }
];

export function HeroBanner() {
  const [currentImage, setCurrentImage] = useState(0);
  const [language, setLanguage] = useState<'en' | 'ms'>('en');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ms' : 'en');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 animate-float">
        <Key className="h-8 w-8 text-secondary opacity-60" />
      </div>
      <div className="absolute top-32 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-3 h-8 bg-malaysia-red rounded-full opacity-40" />
      </div>
      <div className="absolute bottom-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-3 h-8 bg-malaysia-blue rounded-full opacity-40" />
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-secondary/20 hover:bg-background/30 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6 text-primary-foreground" />
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-secondary/20 hover:bg-background/30 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Language Toggle */}
      <Button
        onClick={toggleLanguage}
        variant="ghost"
        size="sm"
        className="absolute top-6 right-6 z-20 bg-background/20 backdrop-blur-sm border border-secondary/20 text-primary-foreground hover:bg-background/30"
      >
        <Flag className="mr-2 h-4 w-4" />
        {language === 'en' ? 'Bahasa' : 'English'}
      </Button>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="font-montserrat font-bold text-5xl lg:text-7xl text-primary-foreground mb-6 leading-tight">
            {language === 'en' ? (
              <>
                Find Your Dream Car
                <br />
                <span className="text-secondary">In Klang Valley</span>
              </>
            ) : (
              <>
                Cari Kereta Impian Anda
                <br />
                <span className="text-secondary">Di Lembah Klang</span>
              </>
            )}
          </h1>
          
          <p className="font-open-sans text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {language === 'en' 
              ? "Premium used cars from trusted dealers across KL, Selangor, Shah Alam & Petaling Jaya"
              : "Kereta terpakai premium daripada pengedar yang dipercayai di KL, Selangor, Shah Alam & Petaling Jaya"
            }
          </p>

          {/* Image Indicators */}
          <div className="flex justify-center gap-3 mb-12">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImage 
                    ? 'bg-secondary scale-125' 
                    : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Search Component */}
        <div className="w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <HeroSearch />
        </div>
      </div>
    </div>
  );
}