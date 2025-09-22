export interface RoletaConfig {
  corFundoTela: string;
  corFundoRoleta: string;
  corBordaRoleta: string;
  corBotaoGirar: string;
  corFatiaPar: string;
  corFatiaImpar: string;
  corTexto: string;
  textoBotaoGirar: string;
  textoDescricao: string;
  numeroWhatsapp: string;
  premioSorteado: number;
  corFundoPopup: string;
  corBotaoWhatsapp: string;
  textoTituloPopup: string;
  textoPopup: string;
  textoBotaoWhatsapp: string;
  fontePersonalizada: string;
  corDivisorFatias: string;
  descricaoAdicional1: string;
  descricaoAdicional2: string;
  // Dados das imagens em base64
  logoCimaData?: string;
  logoCentroData?: string;
  setaData?: string;
  premio1Data?: string;
  premio2Data?: string;
  premio3Data?: string;
  premio4Data?: string;
  premio5Data?: string;
  premio6Data?: string;
}

export const configuracoesPadrao: RoletaConfig = {
  corFundoTela: '#f04d2e',
  corFundoRoleta: '#f04d2e',
  corBordaRoleta: '#c73c23',
  corBotaoGirar: '#ff6b47',
  corFatiaPar: '#f04d2e',
  corFatiaImpar: '#ffffff',
  corTexto: '#ffffff',
  textoBotaoGirar: 'GIRAR A ROLETA',
  textoDescricao: 'Mês de prêmios: Roleta premiada<br>Shopee',
  numeroWhatsapp: 'SEUNUMERO',
  premioSorteado: 1,
  corFundoPopup: '#f04d2e',
  corBotaoWhatsapp: '#25D366',
  textoTituloPopup: 'Parabéns! 🎉',
  textoPopup: 'Você ganhou um <strong>cupom exclusivo de desconto</strong> baseado na sua última compra na Shopee.<br><strong>Exemplo</strong>: se você comprou um produto de <strong>R$1500</strong>, seu cupom será do mesmo valor.',
  textoBotaoWhatsapp: 'Receber seu Cupom',
  fontePersonalizada: 'Roboto',
  corDivisorFatias: '#ffffff',
  descricaoAdicional1: 'Participe da promoção especial',
  descricaoAdicional2: 'Gire a roleta e ganhe descontos incríveis!'
};

export const premiosDefault = [
  { img: "assets/p1.png", imgSize: 80 },
  { img: "assets/p2.png", imgSize: 80 },
  { img: "assets/p3.png", imgSize: 85 },
  { img: "assets/p4.png", imgSize: 80 },
  { img: "assets/p5.png", imgSize: 95 },
  { img: "assets/p6.png", imgSize: 95 }
];

export function carregarConfiguracoes(): RoletaConfig {
  const configSalvas = localStorage.getItem('configRoleta');
  if (configSalvas) {
    const config = JSON.parse(configSalvas);
    return { ...configuracoesPadrao, ...config };
  }
  return configuracoesPadrao;
}

export function salvarConfiguracoes(config: RoletaConfig): void {
  localStorage.setItem('configRoleta', JSON.stringify(config));
}

export function escurecerCor(cor: string, quantidade: number): string {
  let r = parseInt(cor.substring(1, 3), 16);
  let g = parseInt(cor.substring(3, 5), 16);
  let b = parseInt(cor.substring(5, 7), 16);
  
  r = Math.max(0, r - quantidade);
  g = Math.max(0, g - quantidade);
  b = Math.max(0, b - quantidade);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function gerarConfetes(corFundo: string): void {
  const cores = [corFundo, "#fff", "#FFAB91", "#FFCCBC", "#FFE0B2"];
  for (let i = 0; i < 120; i++) {
    const confete = document.createElement("div");
    confete.style.position = "fixed";
    confete.style.bottom = "0";
    confete.style.width = "10px";
    confete.style.height = "10px";
    confete.style.opacity = "0.9";
    confete.style.pointerEvents = "none";
    confete.style.borderRadius = "50%";
    confete.style.zIndex = "2";
    confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
    confete.style.left = Math.random() * window.innerWidth + "px";
    const size = Math.random() * 8 + 6;
    confete.style.width = size + "px";
    confete.style.height = size + "px";
    confete.style.animation = `subirConfete ${2.5 + Math.random() * 2}s linear forwards`;
    document.body.appendChild(confete);
    setTimeout(() => confete.remove(), 5000);
  }
}