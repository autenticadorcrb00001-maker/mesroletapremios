import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Settings,
  Eye,
  Smartphone
} from 'lucide-react';

import ColorPicker from '@/components/ColorPicker';
import ImageUploader from '@/components/ImageUploader';
import TextEditor from '@/components/TextEditor';
import PreviewSection from '@/components/PreviewSection';
import { RoletaConfig, configPadrao } from '@/types/config';
import { storageManager } from '@/lib/storage';

export default function Index() {
  const [config, setConfig] = useState<RoletaConfig>(configPadrao);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Carregar configurações ao iniciar
  useEffect(() => {
    const configCarregada = storageManager.carregarConfig();
    setConfig(configCarregada);
  }, []);

  // Detectar mudanças
  useEffect(() => {
    const configOriginal = storageManager.carregarConfig();
    const temMudancas = JSON.stringify(config) !== JSON.stringify(configOriginal);
    setHasChanges(temMudancas);
  }, [config]);

  const handleConfigChange = (key: keyof RoletaConfig, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePremioChange = (premioKey: keyof RoletaConfig['premios'], value: string) => {
    setConfig(prev => ({
      ...prev,
      premios: {
        ...prev.premios,
        [premioKey]: value
      }
    }));
  };

  const salvarConfiguracoes = async () => {
    setIsLoading(true);
    try {
      storageManager.fazerBackup(); // Fazer backup antes de salvar
      storageManager.salvarConfig(config);
      setHasChanges(false);
      toast.success('Configurações salvas com sucesso!', {
        description: 'Suas alterações foram aplicadas à roleta.'
      });
    } catch (error) {
      toast.error('Erro ao salvar configurações', {
        description: 'Tente novamente em alguns instantes.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const restaurarPadrao = () => {
    if (confirm('Tem certeza que deseja restaurar as configurações padrão? Esta ação não pode ser desfeita.')) {
      storageManager.restaurarPadrao();
      setConfig(configPadrao);
      toast.success('Configurações restauradas!', {
        description: 'Todas as configurações foram resetadas para o padrão.'
      });
    }
  };

  const exportarConfiguracoes = () => {
    try {
      const configJson = storageManager.exportarConfig();
      const blob = new Blob([configJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'configuracoes-roleta.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Configurações exportadas!');
    } catch (error) {
      toast.error('Erro ao exportar configurações');
    }
  };

  const importarConfiguracoes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const configJson = e.target?.result as string;
        const novaConfig = storageManager.importarConfig(configJson);
        setConfig(novaConfig);
        toast.success('Configurações importadas!');
      } catch (error) {
        toast.error('Erro ao importar configurações', {
          description: 'Verifique se o arquivo está correto.'
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Painel da Roleta</h1>
                <p className="text-sm text-gray-600">Configure sua roleta de prêmios</p>
              </div>
            </div>
            
            {hasChanges && (
              <Badge variant="secondary" className="animate-pulse">
                Alterações não salvas
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Painel de Configurações */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Configurações</span>
                </CardTitle>
                <CardDescription>
                  Personalize todos os aspectos da sua roleta de prêmios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cores" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="cores" className="flex items-center space-x-1">
                      <Palette className="w-4 h-4" />
                      <span>Cores</span>
                    </TabsTrigger>
                    <TabsTrigger value="textos" className="flex items-center space-x-1">
                      <Type className="w-4 h-4" />
                      <span>Textos</span>
                    </TabsTrigger>
                    <TabsTrigger value="imagens" className="flex items-center space-x-1">
                      <ImageIcon className="w-4 h-4" />
                      <span>Imagens</span>
                    </TabsTrigger>
                    <TabsTrigger value="geral" className="flex items-center space-x-1">
                      <Settings className="w-4 h-4" />
                      <span>Geral</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Aba de Cores */}
                  <TabsContent value="cores" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ColorPicker
                        label="Cor de Fundo da Tela"
                        value={config.corFundoTela}
                        onChange={(cor) => handleConfigChange('corFundoTela', cor)}
                        description="Cor de fundo principal da página"
                      />
                      
                      <ColorPicker
                        label="Cor de Fundo da Roleta"
                        value={config.corFundoRoleta}
                        onChange={(cor) => handleConfigChange('corFundoRoleta', cor)}
                        description="Cor de fundo do container da roleta"
                      />
                      
                      <ColorPicker
                        label="Cor da Borda da Roleta"
                        value={config.corBordaRoleta}
                        onChange={(cor) => handleConfigChange('corBordaRoleta', cor)}
                        description="Cor da borda externa da roleta"
                      />
                      
                      <ColorPicker
                        label="Cor das Fatias Pares"
                        value={config.corFatiaPar}
                        onChange={(cor) => handleConfigChange('corFatiaPar', cor)}
                        description="Cor das fatias 1, 3, 5 da roleta"
                      />
                      
                      <ColorPicker
                        label="Cor das Fatias Ímpares"
                        value={config.corFatiaImpar}
                        onChange={(cor) => handleConfigChange('corFatiaImpar', cor)}
                        description="Cor das fatias 2, 4, 6 da roleta"
                      />
                      
                      <ColorPicker
                        label="Cor dos Divisores"
                        value={config.corDivisorFatias}
                        onChange={(cor) => handleConfigChange('corDivisorFatias', cor)}
                        description="Cor das linhas entre as fatias"
                      />
                      
                      <ColorPicker
                        label="Cor do Texto"
                        value={config.corTexto}
                        onChange={(cor) => handleConfigChange('corTexto', cor)}
                        description="Cor do texto principal"
                      />
                      
                      <ColorPicker
                        label="Cor do Botão Girar"
                        value={config.corBotaoGirar}
                        onChange={(cor) => handleConfigChange('corBotaoGirar', cor)}
                        description="Cor do botão de girar a roleta"
                      />
                      
                      <ColorPicker
                        label="Cor de Fundo do Popup"
                        value={config.corFundoPopup}
                        onChange={(cor) => handleConfigChange('corFundoPopup', cor)}
                        description="Cor de fundo do popup de prêmio"
                      />
                      
                      <ColorPicker
                        label="Cor do Botão WhatsApp"
                        value={config.corBotaoWhatsapp}
                        onChange={(cor) => handleConfigChange('corBotaoWhatsapp', cor)}
                        description="Cor do botão do WhatsApp"
                      />
                    </div>
                  </TabsContent>

                  {/* Aba de Textos */}
                  <TabsContent value="textos" className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <TextEditor
                        label="Descrição Principal"
                        value={config.textoDescricao}
                        onChange={(texto) => handleConfigChange('textoDescricao', texto)}
                        description="Texto principal que aparece acima da roleta (aceita HTML)"
                        type="textarea"
                        maxLength={200}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextEditor
                          label="Descrição Adicional 1"
                          value={config.descricaoAdicional1}
                          onChange={(texto) => handleConfigChange('descricaoAdicional1', texto)}
                          description="Primeira linha de descrição adicional"
                          maxLength={100}
                        />
                        
                        <TextEditor
                          label="Descrição Adicional 2"
                          value={config.descricaoAdicional2}
                          onChange={(texto) => handleConfigChange('descricaoAdicional2', texto)}
                          description="Segunda linha de descrição adicional"
                          maxLength={100}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextEditor
                          label="Texto do Botão Girar"
                          value={config.textoBotaoGirar}
                          onChange={(texto) => handleConfigChange('textoBotaoGirar', texto)}
                          description="Texto que aparece no botão de girar"
                          maxLength={50}
                        />
                        
                        <TextEditor
                          label="Número do WhatsApp"
                          value={config.numeroWhatsapp}
                          onChange={(numero) => handleConfigChange('numeroWhatsapp', numero)}
                          description="Número do WhatsApp (apenas números)"
                          placeholder="5511999999999"
                          maxLength={20}
                        />
                      </div>
                      
                      <Separator />
                      
                      <h4 className="font-semibold text-lg">Configurações do Popup</h4>
                      
                      <TextEditor
                        label="Título do Popup"
                        value={config.textoTituloPopup}
                        onChange={(texto) => handleConfigChange('textoTituloPopup', texto)}
                        description="Título que aparece no popup de prêmio"
                        maxLength={50}
                      />
                      
                      <TextEditor
                        label="Texto do Popup"
                        value={config.textoPopup}
                        onChange={(texto) => handleConfigChange('textoPopup', texto)}
                        description="Texto principal do popup (aceita HTML)"
                        type="textarea"
                        maxLength={500}
                      />
                      
                      <TextEditor
                        label="Texto do Botão WhatsApp"
                        value={config.textoBotaoWhatsapp}
                        onChange={(texto) => handleConfigChange('textoBotaoWhatsapp', texto)}
                        description="Texto do botão do WhatsApp no popup"
                        maxLength={50}
                      />
                    </div>
                  </TabsContent>

                  {/* Aba de Imagens */}
                  <TabsContent value="imagens" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ImageUploader
                        label="Logo Superior"
                        value={config.logoSuperior}
                        onChange={(base64) => handleConfigChange('logoSuperior', base64)}
                        description="Logo que aparece acima das descrições"
                      />
                      
                      <ImageUploader
                        label="Logo Central"
                        value={config.logoCentral}
                        onChange={(base64) => handleConfigChange('logoCentral', base64)}
                        description="Logo que aparece no centro da roleta"
                      />
                      
                      <ImageUploader
                        label="Imagem da Seta"
                        value={config.imagemSeta}
                        onChange={(base64) => handleConfigChange('imagemSeta', base64)}
                        description="Seta que indica o prêmio sorteado"
                      />
                    </div>
                    
                    <Separator />
                    
                    <h4 className="font-semibold text-lg">Imagens dos Prêmios</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure as 6 imagens que aparecerão nas fatias da roleta
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] as const).map((premioKey, index) => (
                        <ImageUploader
                          key={premioKey}
                          label={`Prêmio ${index + 1}`}
                          value={config.premios[premioKey]}
                          onChange={(base64) => handlePremioChange(premioKey, base64)}
                          description={`Imagem do prêmio da fatia ${index + 1}`}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  {/* Aba Geral */}
                  <TabsContent value="geral" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <Label className="text-sm font-semibold mb-3 block">Prêmio Fixo</Label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Selecione qual prêmio sempre será sorteado (1-6)
                        </p>
                        <select
                          value={config.premioSorteado}
                          onChange={(e) => handleConfigChange('premioSorteado', parseInt(e.target.value))}
                          className="w-full p-2 border rounded-md"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>Prêmio {num}</option>
                          ))}
                        </select>
                      </Card>
                      
                      <Card className="p-4">
                        <Label className="text-sm font-semibold mb-3 block">Fonte Personalizada</Label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Escolha a fonte do texto
                        </p>
                        <select
                          value={config.fontePersonalizada}
                          onChange={(e) => handleConfigChange('fontePersonalizada', e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="Roboto">Roboto</option>
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Courier New">Courier New</option>
                        </select>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-6">
            {/* Ações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>Ações</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={salvarConfiguracoes}
                  disabled={isLoading || !hasChanges}
                  className="w-full"
                  size="lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
                
                <Button 
                  onClick={restaurarPadrao}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restaurar Padrão
                </Button>
                
                <Separator />
                
                <Button 
                  onClick={exportarConfiguracoes}
                  variant="secondary"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Config
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importarConfiguracoes}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="secondary" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar Config
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <div className="sticky top-4">
              <PreviewSection config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}