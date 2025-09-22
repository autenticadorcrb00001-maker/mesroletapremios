import React, { useState, useEffect } from 'react';
import RoletaCanvas from '@/components/RoletaCanvas';
import { carregarConfiguracoes, gerarConfetes, RoletaConfig } from '@/lib/roletaConfig';

export default function Roleta() {
  const [config, setConfig] = useState<RoletaConfig | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const configuracoes = carregarConfiguracoes();
    setConfig(configuracoes);

    // Verificar atualizações a cada 2 segundos
    const interval = setInterval(() => {
      const novasConfiguracoes = carregarConfiguracoes();
      setConfig(novasConfiguracoes);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handlePremio = () => {
    if (config) {
      gerarConfetes(config.corFundoTela);
      setShowPopup(true);
    }
  };

  if (!config) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div 
      className="min-h-screen flex justify-center items-center font-roboto overflow-x-hidden"
      style={{ 
        backgroundColor: config.corFundoTela,
        fontFamily: config.fontePersonalizada + ', Arial, sans-serif'
      }}
    >
      <div className="flex flex-col items-center gap-5 w-full max-w-[450px] p-4">
        <div 
          className="p-5 rounded-[20px] shadow-lg text-center relative w-full max-w-[400px]"
          style={{ backgroundColor: config.corFundoRoleta }}
        >
          {/* Logo superior */}
          <img 
            src={config.logoCimaData || 'assets/logo1.png'} 
            alt="Logo Superior"
            className="mb-3 max-w-full h-auto mx-auto"
            style={{ maxWidth: '200px' }}
          />
          
          {/* Descrições adicionais */}
          <div 
            className="text-center mb-2 text-base font-medium"
            style={{ color: config.corTexto }}
          >
            {config.descricaoAdicional1}
          </div>
          <div 
            className="text-center mb-2 text-base font-medium"
            style={{ color: config.corTexto }}
          >
            {config.descricaoAdicional2}
          </div>
          
          {/* Título principal */}
          <h2 
            className="font-bold text-xl mb-3 text-center w-full break-words"
            style={{ color: config.corTexto }}
            dangerouslySetInnerHTML={{ __html: config.textoDescricao }}
          />
          
          {/* Roleta */}
          <RoletaCanvas config={config} onPremio={handlePremio} />
        </div>
      </div>

      {/* Popup de prêmio */}
      {showPopup && (
        <div 
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-[20px] shadow-xl text-center z-[9999] w-[90%] max-w-[380px] transition-transform duration-400 ${
            showPopup ? 'scale-100' : 'scale-0'
          }`}
          style={{ 
            backgroundColor: config.corFundoPopup,
            color: '#ffffff'
          }}
        >
          <h2 className="font-bold text-2xl mb-3">
            {config.textoTituloPopup}
          </h2>
          <p 
            className="text-base mb-5 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: config.textoPopup }}
          />
          <a
            href={`https://wa.me/${config.numeroWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white no-underline px-5 py-3 rounded-xl font-bold transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: config.corBotaoWhatsapp }}
          >
            {config.textoBotaoWhatsapp}
          </a>
        </div>
      )}

      {/* Estilos para animações */}
      <style jsx>{`
        @keyframes subirConfete {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        
        @media (max-width: 500px) {
          .text-xl { font-size: 1rem; }
          .text-base { font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}