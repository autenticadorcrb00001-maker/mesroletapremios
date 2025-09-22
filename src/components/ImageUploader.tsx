import React, { useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { storageManager } from '@/lib/storage';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (base64: string) => void;
  description?: string;
  acceptedTypes?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  description,
  acceptedTypes = "image/*"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const base64 = await storageManager.imagemParaBase64(file);
      onChange(base64);
    } catch (err) {
      setError('Erro ao processar a imagem');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-2">
        <Label className="text-sm font-semibold">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="space-y-3">
          <div className="relative group">
            <img
              src={value}
              alt={label}
              className="w-full h-32 object-cover rounded-lg border-2 border-dashed border-gray-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Remover</span>
              </Button>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleClick}
            disabled={isLoading}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Alterar Imagem
          </Button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-sm text-gray-600 mb-2">
            Clique para selecionar uma imagem
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG, GIF até 5MB
          </p>
        </div>
      )}

      {isLoading && (
        <div className="text-center text-sm text-blue-600">
          Processando imagem...
        </div>
      )}

      {error && (
        <div className="text-center text-sm text-red-600">
          {error}
        </div>
      )}
    </Card>
  );
};

export default ImageUploader;