import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RoletaConfig } from '@/types/config';

interface PreviewSectionProps {
  config: RoletaConfig;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ config }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Preview das Configurações</h3>
      
      <div className="space-y-4">
        {/* Preview de Cores */}
        <div>
          <h4 className="font-medium mb-2">Paleta de Cores</h4>
          <div className="grid grid-cols-5 gap-2">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg border mx-auto mb-1"
                style={{ backgroundColor: config.corFundoTela }}
              />
              <span className="text-xs">Fundo</span>
            </div>
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg border mx-auto mb-1"
                style={{ backgroundColor: config.corFundoRoleta }}
              />
              <span className="text-xs">Roleta</span>
            </div>
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg border mx-auto mb-1"
                style={{ backgroundColor: config.corBotaoGirar }}
              />
              <span className="text-xs">Botão</span>
            </div>
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg border mx-auto mb-1"
                style={{ backgroundColor: config.corFundoPopup }}
              />
              <span className="text-xs">Popup</span>
            </div>
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg border mx-auto mb-1"
                style={{ backgroundColor: config.corBotaoWhatsapp }}
              />
              <span className="text-xs">WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Preview de Textos */}
        <div>
          <h4 className="font-medium mb-2">Textos Principais</h4>
          <div className="space-y-2 text-sm">
            <div>
              <Badge variant="outline" className="mr-2">Descrição:</Badge>
              <span dangerouslySetInnerHTML={{ __html: config.textoDescricao }} />
            </div>
            <div>
              <Badge variant="outline" className="mr-2">Botão:</Badge>
              <span>{config.textoBotaoGirar}</span>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">WhatsApp:</Badge>
              <span>{config.numeroWhatsapp}</span>
            </div>
          </div>
        </div>

        {/* Preview de Configurações */}
        <div>
          <h4 className="font-medium mb-2">Configurações</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Badge variant="secondary" className="mr-2">Prêmio Fixo:</Badge>
              <span>#{config.premioSorteado}</span>
            </div>
            <div>
              <Badge variant="secondary" className="mr-2">Fonte:</Badge>
              <span>{config.fontePersonalizada}</span>
            </div>
          </div>
        </div>

        {/* Miniatura da Roleta */}
        <div>
          <h4 className="font-medium mb-2">Visualização da Roleta</h4>
          <div 
            className="w-32 h-32 rounded-full border-4 mx-auto relative"
            style={{ 
              backgroundColor: config.corFundoRoleta,
              borderColor: config.corBordaRoleta 
            }}
          >
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
              <span className="text-xs font-bold">LOGO</span>
            </div>
            {/* Fatias simuladas */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute w-full h-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? config.corFatiaPar : config.corFatiaImpar,
                    transform: `rotate(${i * 60}deg)`,
                    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PreviewSection;