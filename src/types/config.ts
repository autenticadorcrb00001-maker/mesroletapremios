export interface RoletaConfig {
  // Cores
  corFundoTela: string;
  corFundoRoleta: string;
  corBordaRoleta: string;
  corFatiaPar: string;
  corFatiaImpar: string;
  corTexto: string;
  corBotaoGirar: string;
  corFundoPopup: string;
  corBotaoWhatsapp: string;
  corDivisorFatias: string;

  // Textos
  textoDescricao: string;
  descricaoAdicional1: string;
  descricaoAdicional2: string;
  textoBotaoGirar: string;
  numeroWhatsapp: string;
  textoTituloPopup: string;
  textoPopup: string;
  textoBotaoWhatsapp: string;

  // Configurações gerais
  premioSorteado: number;
  fontePersonalizada: string;

  // Imagens (base64)
  logoSuperior?: string;
  logoCentral?: string;
  imagemSeta?: string;
  premios: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    p6: string;
  };
}

export const configPadrao: RoletaConfig = {
  corFundoTela: '#f04d2e',
  corFundoRoleta: '#f04d2e',
  corBordaRoleta: '#c73c23',
  corFatiaPar: '#f04d2e',
  corFatiaImpar: '#ffffff',
  corTexto: '#ffffff',
  corBotaoGirar: '#ff6b47',
  corFundoPopup: '#f04d2e',
  corBotaoWhatsapp: '#25D366',
  corDivisorFatias: '#ffffff',
  
  textoDescricao: 'Mês de prêmios: Roleta premiada<br>Shopee',
  descricaoAdicional1: 'Participe da promoção especial',
  descricaoAdicional2: 'Gire a roleta e ganhe descontos incríveis!',
  textoBotaoGirar: 'GIRAR A ROLETA',
  numeroWhatsapp: 'SEUNUMERO',
  textoTituloPopup: 'Parabéns! 🎉',
  textoPopup: 'Você ganhou um <strong>cupom exclusivo de desconto</strong> baseado na sua última compra na Shopee.<br><strong>Exemplo</strong>: se você comprou um produto de <strong>R$1500</strong>, seu cupom será do mesmo valor.',
  textoBotaoWhatsapp: 'Receber seu Cupom',
  
  premioSorteado: 1,
  fontePersonalizada: 'Roboto',
  
  premios: {
    p1: '',
    p2: '',
    p3: '',
    p4: '',
    p5: '',
    p6: ''
  }
};