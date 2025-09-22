import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { carregarConfiguracoes, salvarConfiguracoes, configuracoesPadrao, RoletaConfig } from '@/lib/roletaConfig';

export default function AdminPainel() {
  const [config, setConfig] = useState<RoletaConfig>(configuracoesPadrao);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return;
    }

    // Carregar configurações
    const configSalvas = carregarConfiguracoes();
    setConfig(configSalvas);
  }, [navigate]);

  const handleInputChange = (field: keyof RoletaConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataKey = `${field}Data` as keyof RoletaConfig;
      setConfig(prev => ({ ...prev, [dataKey]: e.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    salvarConfiguracoes(config);
    setMessage({ text: 'Configurações salvas com sucesso!', type: 'success' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleReset = () => {
    setConfig(configuracoesPadrao);
    salvarConfiguracoes(configuracoesPadrao);
    setMessage({ text: 'Configurações padrão restauradas!', type: 'success' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#f04d2e]">
            Painel de Controle - Roleta
          </h1>
          <div className="space-x-2">
            <Button onClick={() => navigate('/')} variant="outline">
              Ver Roleta
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue="textos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="textos">Textos</TabsTrigger>
            <TabsTrigger value="cores">Cores</TabsTrigger>
            <TabsTrigger value="imagens">Imagens</TabsTrigger>
            <TabsTrigger value="geral">Geral</TabsTrigger>
          </TabsList>

          <TabsContent value="textos">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Texto</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="textoBotaoGirar">Texto do Botão Girar</Label>
                  <Input
                    id="textoBotaoGirar"
                    value={config.textoBotaoGirar}
                    onChange={(e) => handleInputChange('textoBotaoGirar', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textoDescricao">Texto Principal da Roleta</Label>
                  <Input
                    id="textoDescricao"
                    value={config.textoDescricao}
                    onChange={(e) => handleInputChange('textoDescricao', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricaoAdicional1">Descrição Adicional 1</Label>
                  <Input
                    id="descricaoAdicional1"
                    value={config.descricaoAdicional1}
                    onChange={(e) => handleInputChange('descricaoAdicional1', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricaoAdicional2">Descrição Adicional 2</Label>
                  <Input
                    id="descricaoAdicional2"
                    value={config.descricaoAdicional2}
                    onChange={(e) => handleInputChange('descricaoAdicional2', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numeroWhatsapp">Número do WhatsApp</Label>
                  <Input
                    id="numeroWhatsapp"
                    value={config.numeroWhatsapp}
                    onChange={(e) => handleInputChange('numeroWhatsapp', e.target.value)}
                    placeholder="5511999999999"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textoTituloPopup">Título do Popup</Label>
                  <Input
                    id="textoTituloPopup"
                    value={config.textoTituloPopup}
                    onChange={(e) => handleInputChange('textoTituloPopup', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="textoPopup">Texto do Popup</Label>
                  <Input
                    id="textoPopup"
                    value={config.textoPopup}
                    onChange={(e) => handleInputChange('textoPopup', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textoBotaoWhatsapp">Texto do Botão WhatsApp</Label>
                  <Input
                    id="textoBotaoWhatsapp"
                    value={config.textoBotaoWhatsapp}
                    onChange={(e) => handleInputChange('textoBotaoWhatsapp', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cores">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Cores</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { key: 'corFundoTela', label: 'Fundo da Tela' },
                  { key: 'corFundoRoleta', label: 'Fundo da Roleta' },
                  { key: 'corBordaRoleta', label: 'Borda da Roleta' },
                  { key: 'corBotaoGirar', label: 'Botão Girar' },
                  { key: 'corFatiaPar', label: 'Fatias Pares' },
                  { key: 'corFatiaImpar', label: 'Fatias Ímpares' },
                  { key: 'corTexto', label: 'Texto' },
                  { key: 'corFundoPopup', label: 'Fundo do Popup' },
                  { key: 'corBotaoWhatsapp', label: 'Botão WhatsApp' },
                  { key: 'corDivisorFatias', label: 'Divisores das Fatias' }
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{label}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id={key}
                        type="color"
                        value={config[key as keyof RoletaConfig] as string}
                        onChange={(e) => handleInputChange(key as keyof RoletaConfig, e.target.value)}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <span className="text-sm text-gray-600">
                        {config[key as keyof RoletaConfig] as string}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="imagens">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Imagens</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: 'logoCima', label: 'Logo Superior' },
                  { key: 'logoCentro', label: 'Logo Central' },
                  { key: 'seta', label: 'Seta' },
                  { key: 'premio1', label: 'Prêmio 1' },
                  { key: 'premio2', label: 'Prêmio 2' },
                  { key: 'premio3', label: 'Prêmio 3' },
                  { key: 'premio4', label: 'Prêmio 4' },
                  { key: 'premio5', label: 'Prêmio 5' },
                  { key: 'premio6', label: 'Prêmio 6' }
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(key, file);
                      }}
                    />
                    {config[`${key}Data` as keyof RoletaConfig] && (
                      <img
                        src={config[`${key}Data` as keyof RoletaConfig] as string}
                        alt={label}
                        className="w-20 h-20 object-cover border rounded"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geral">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fontePersonalizada">Fonte Personalizada</Label>
                  <Select
                    value={config.fontePersonalizada}
                    onValueChange={(value) => handleInputChange('fontePersonalizada', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Lato">Lato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="premioSorteado">Prêmio Sorteado (0-5)</Label>
                  <Input
                    id="premioSorteado"
                    type="number"
                    min="0"
                    max="5"
                    value={config.premioSorteado}
                    onChange={(e) => handleInputChange('premioSorteado', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center gap-4 mt-6">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            Salvar Configurações
          </Button>
          <Button onClick={handleReset} variant="destructive">
            Restaurar Padrões
          </Button>
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline">Visualizar Roleta</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Preview da Roleta</DialogTitle>
              </DialogHeader>
              <div className="w-full h-96">
                <iframe
                  src="/"
                  className="w-full h-full border rounded"
                  title="Preview da Roleta"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {message && (
          <Alert className={`mt-4 ${message.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}