import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface TextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  type?: 'input' | 'textarea';
  placeholder?: string;
  maxLength?: number;
}

const TextEditor: React.FC<TextEditorProps> = ({
  label,
  value,
  onChange,
  description,
  type = 'input',
  placeholder,
  maxLength
}) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-2">
        <Label className="text-sm font-semibold">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      {type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="min-h-[100px] resize-none"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}

      {maxLength && (
        <div className="text-right text-xs text-muted-foreground">
          {value.length}/{maxLength}
        </div>
      )}
    </Card>
  );
};

export default TextEditor;