import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calculator, PieChart } from 'lucide-react';

interface LoanCalculatorProps {
  initialPrice?: number;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ initialPrice = 150000 }) => {
  const [carPrice, setCarPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(15000);
  const [loanTerm, setLoanTerm] = useState(7);
  const [interestRate, setInterestRate] = useState(4.5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const minDownPayment = carPrice * 0.1;
  const loanAmount = carPrice - downPayment;

  useEffect(() => {
    if (downPayment < minDownPayment) {
      setDownPayment(minDownPayment);
    }
  }, [carPrice, minDownPayment]);

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    
    if (loanAmount > 0 && monthlyRate > 0) {
      const monthly = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
      setMonthlyPayment(monthly);
      setTotalInterest((monthly * numPayments) - loanAmount);
    } else {
      setMonthlyPayment(0);
      setTotalInterest(0);
    }
  }, [carPrice, downPayment, loanTerm, interestRate, loanAmount]);

  const bankLogos = [
    'Maybank', 'CIMB Bank', 'Public Bank', 'Hong Leong Bank', 'RHB Bank'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-card via-card to-luxury-platinum/20 border-luxury-platinum shadow-luxury">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="h-6 w-6 text-cta" />
            <CardTitle className="text-2xl bg-gradient-luxury bg-clip-text text-transparent">
              Kira Bayaran Bulanan
            </CardTitle>
          </div>
          <p className="text-muted-foreground">Calculate Your Monthly Payment</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="car-price" className="text-sm font-medium">Car Price (RM)</Label>
                <Input
                  id="car-price"
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="mt-1 text-lg font-semibold"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Down Payment: RM {downPayment.toLocaleString()} 
                  <span className="text-muted-foreground ml-2">
                    ({((downPayment / carPrice) * 100).toFixed(1)}%)
                  </span>
                </Label>
                <Slider
                  value={[downPayment]}
                  onValueChange={(value) => setDownPayment(value[0])}
                  min={minDownPayment}
                  max={carPrice * 0.9}
                  step={1000}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Min: RM {minDownPayment.toLocaleString()}</span>
                  <span>Max: RM {(carPrice * 0.9).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Loan Term</Label>
                  <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year} year{year > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Interest Rate (%)</Label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={3.5}
                    max={6.5}
                    step={0.1}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-platinum p-6 rounded-lg border">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-cta" />
                  Payment Breakdown
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly Payment:</span>
                    <span className="text-2xl font-bold text-cta">
                      RM {monthlyPayment.toLocaleString('en-MY', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Loan Amount:</span>
                    <span className="font-medium">RM {loanAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Total Interest:</span>
                    <span className="font-medium text-cta">RM {totalInterest.toLocaleString('en-MY', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Total Payment:</span>
                    <span className="font-bold">RM {(loanAmount + totalInterest).toLocaleString('en-MY', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              <Button variant="cta" size="lg" className="w-full">
                Apply for Financing
              </Button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-3 text-center">Partner Banks</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {bankLogos.map((bank) => (
                <div key={bank} className="bg-white px-4 py-2 rounded-md border text-sm font-medium shadow-sm">
                  {bank}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};