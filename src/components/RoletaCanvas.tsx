import React, { useRef, useEffect, useState } from 'react';
import { RoletaConfig, premiosDefault, escurecerCor } from '@/lib/roletaConfig';

interface RoletaCanvasProps {
  config: RoletaConfig;
  onPremio: () => void;
}

export default function RoletaCanvas({ config, onPremio }: RoletaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [anguloAtual, setAnguloAtual] = useState(0);
  const [animacaoAtiva, setAnimacaoAtiva] = useState(false);
  const [imagens, setImagens] = useState<{ [key: string]: HTMLImageElement }>({});

  // Carregar imagens
  useEffect(() => {
    const novasImagens: { [key: string]: HTMLImageElement } = {};
    
    // Logo central
    const logoCentro = new Image();
    logoCentro.src = config.logoCentroData || 'assets/logo2.png';
    novasImagens.logoCentro = logoCentro;

    // Prêmios
    premiosDefault.forEach((premio, index) => {
      const img = new Image();
      const dataKey = `premio${index + 1}Data` as keyof RoletaConfig;
      img.src = (config[dataKey] as string) || premio.img;
      novasImagens[`premio${index}`] = img;
    });

    setImagens(novasImagens);
  }, [config]);

  // Desenhar roleta
  const desenharRoleta = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const largura = canvas.width;
    const altura = canvas.height;
    const raio = largura / 2;
    const espessuraBorda = 22;

    ctx.clearRect(0, 0, largura, altura);
    const anguloFatia = (2 * Math.PI) / premiosDefault.length;

    // Desenhar fatias
    premiosDefault.forEach((premio, i) => {
      const inicio = anguloAtual + i * anguloFatia;
      const fim = inicio + anguloFatia;
      const corFatia = (i % 2 === 0) ? config.corFatiaPar : config.corFatiaImpar;

      ctx.beginPath();
      ctx.moveTo(raio, raio);
      ctx.arc(raio, raio, raio - espessuraBorda, inicio, fim);
      ctx.closePath();
      ctx.fillStyle = corFatia;
      ctx.fill();

      // Divisores
      ctx.beginPath();
      ctx.arc(raio, raio, raio - espessuraBorda, inicio, inicio, false);
      ctx.lineWidth = 3;
      ctx.strokeStyle = config.corDivisorFatias;
      ctx.stroke();

      // Imagens dos prêmios
      const img = imagens[`premio${i}`];
      if (img && img.complete) {
        ctx.save();
        ctx.translate(raio, raio);
        ctx.rotate(inicio + anguloFatia / 2);
        ctx.drawImage(img, raio - espessuraBorda - premio.imgSize - 20, -premio.imgSize/2, premio.imgSize, premio.imgSize);
        ctx.restore();
      }
    });

    // Borda
    ctx.beginPath();
    ctx.arc(raio, raio, raio - espessuraBorda / 2, 0, 2 * Math.PI);
    ctx.lineWidth = espessuraBorda + 4;
    const grad = ctx.createRadialGradient(raio, raio, raio - espessuraBorda, raio, raio, raio);
    grad.addColorStop(0, config.corBordaRoleta);
    grad.addColorStop(1, escurecerCor(config.corBordaRoleta, 20));
    ctx.strokeStyle = grad;
    ctx.stroke();

    // Logo central
    const logoCentro = imagens.logoCentro;
    if (logoCentro && logoCentro.complete) {
      const tamanhoLogo = 90;
      ctx.save();
      ctx.beginPath();
      ctx.arc(raio, raio, tamanhoLogo/2, 0, 2*Math.PI);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.clip();
      ctx.drawImage(logoCentro, raio - tamanhoLogo/2, raio - tamanhoLogo/2, tamanhoLogo, tamanhoLogo);
      ctx.restore();
    }
  };

  // Redesenhar quando configurações ou ângulo mudam
  useEffect(() => {
    desenharRoleta();
  }, [config, anguloAtual, imagens]);

  // Função de animação easeOut
  const easeOut = (t: number, b: number, c: number, d: number) => {
    t /= d;
    return -c * t * (t - 2) + b;
  };

  // Função para girar
  const girar = () => {
    if (animacaoAtiva) return;

    const indicePremio = config.premioSorteado;
    const anguloFatia = (2 * Math.PI) / premiosDefault.length;
    const alvo = (2 * Math.PI) - (indicePremio * anguloFatia + anguloFatia / 2);
    const voltas = 5;
    const anguloFinal = (2 * Math.PI * voltas) + alvo;
    const duracao = 5000;
    let inicio: number | null = null;

    setAnimacaoAtiva(true);

    const animacao = (timestamp: number) => {
      if (!inicio) inicio = timestamp;
      const progresso = timestamp - inicio;
      const rotacao = easeOut(progresso, 0, anguloFinal, duracao);
      setAnguloAtual(rotacao % (2 * Math.PI));
      
      if (progresso < duracao) {
        requestAnimationFrame(animacao);
      } else {
        setAnimacaoAtiva(false);
        onPremio();
      }
    };
    
    requestAnimationFrame(animacao);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="block mx-auto rounded-full w-full h-auto"
        style={{ maxWidth: '400px' }}
      />
      
      {/* Seta animada */}
      <div className="absolute top-[59%] right-0 transform -translate-y-1/2 z-10 w-[90px] h-[90px] flex justify-center items-center">
        <img
          src={config.setaData || 'assets/seta.png'}
          alt="Seta"
          className={`w-[70px] h-[70px] transition-transform duration-100 ${
            animacaoAtiva ? 'animate-pulse' : 'animate-bounce'
          }`}
        />
      </div>

      {/* Botão girar */}
      <button
        onClick={girar}
        disabled={animacaoAtiva}
        className="w-full mt-4 px-6 py-3 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: config.corBotaoGirar }}
      >
        {config.textoBotaoGirar}
      </button>
    </div>
  );
}