import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  description?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, description }) => {
  const coresPredefinidas = [
    '#f04d2e', '#ff6b47', '#25D366', '#ffffff', '#000000',
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff',
    '#00ffff', '#ffa500', '#800080', '#008000', '#000080'
  ];

  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-2">
        <Label className="text-sm font-semibold">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 p-1 border-2 rounded-lg cursor-pointer"
          />
        </div>
        
        <div className="flex-1">
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            className="font-mono text-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {coresPredefinidas.map((cor) => (
          <button
            key={cor}
            onClick={() => onChange(cor)}
            className={`w-8 h-8 rounded-md border-2 transition-all hover:scale-110 ${
              value === cor ? 'border-gray-800 ring-2 ring-blue-500' : 'border-gray-300'
            }`}
            style={{ backgroundColor: cor }}
            title={cor}
          />
        ))}
      </div>
    </Card>
  );
};

export default ColorPicker;