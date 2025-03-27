
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Currency {
  code: string;
  name: string;
  type: 'fiat' | 'crypto';
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', type: 'fiat', symbol: '$' },
  { code: 'EUR', name: 'Euro', type: 'fiat', symbol: '€' },
  { code: 'GBP', name: 'British Pound', type: 'fiat', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', type: 'fiat', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', type: 'fiat', symbol: '¥' },
  { code: 'BTC', name: 'Bitcoin', type: 'crypto', symbol: '₿' },
  { code: 'ETH', name: 'Ethereum', type: 'crypto', symbol: 'Ξ' },
  { code: 'USDT', name: 'Tether', type: 'crypto', symbol: '₮' },
  { code: 'USDC', name: 'USD Coin', type: 'crypto', symbol: '$' },
];

export interface CurrencySelectorProps {
  onSelect?: (currency: Currency) => void;
  defaultCurrency?: string;
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  onSelect,
  defaultCurrency = 'USD',
  label,
  value,
  onValueChange,
}) => {
  const [selected, setSelected] = useState<string>(value || defaultCurrency);

  const handleSelect = (value: string) => {
    setSelected(value);
    
    if (onValueChange) {
      onValueChange(value);
    }
    
    const currency = currencies.find(c => c.code === value);
    if (currency && onSelect) {
      onSelect(currency);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select value={value !== undefined ? value : selected} onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          <div className="px-2 py-1.5 text-sm text-muted-foreground">Fiat Currencies</div>
          {currencies
            .filter(c => c.type === 'fiat')
            .map(currency => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center">
                  <span className="mr-2">{currency.symbol}</span>
                  <span>{currency.code}</span>
                  <span className="ml-2 text-muted-foreground text-xs">
                    - {currency.name}
                  </span>
                </div>
              </SelectItem>
            ))}
          <div className="px-2 py-1.5 text-sm text-muted-foreground border-t border-border mt-1 pt-1">
            Cryptocurrencies
          </div>
          {currencies
            .filter(c => c.type === 'crypto')
            .map(currency => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center">
                  <span className="mr-2">{currency.symbol}</span>
                  <span>{currency.code}</span>
                  <span className="ml-2 text-muted-foreground text-xs">
                    - {currency.name}
                  </span>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Export both as a named export and as the default export for backward compatibility
export { CurrencySelector };
export default CurrencySelector;
