<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roleta de Prêmios</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      display: flex;
      gap: 30px;
    }
    .roleta-container {
      background: white;
      padding: 20px;
      border-radius: 15px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      text-align: center;
    }
    canvas {
      display: block;
      margin: 0 auto;
    }
    button {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 20px;
      font-size: 16px;
    }
    button:hover {
      background: #c0392b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="roleta-container">
      <h2 id="titulo-roleta">Roleta de Prêmios</h2>
      <canvas id="roleta" width="400" height="400"></canvas>
      <button onclick="girar()">GIRAR A ROLETA</button>
    </div>
  </div>

  <script>
    const canvas = document.getElementById("roleta");
    const ctx = canvas.getContext("2d");
    const largura = canvas.width;
    const altura = canvas.height;
    const raio = largura / 2;

    const premios = [
      { texto: "10 Moedas", cor: "#3498db" },
      { texto: "20 Moedas", cor: "#1abc9c" },
      { texto: "50 Moedas", cor: "#2ecc71" },
      { texto: "Nada 😅", cor: "#7f8c8d" },
      { texto: "Cupom R$100", cor: "#f39c12" },
      { texto: "Sortudo! 🎁", cor: "#e74c3c" }
    ];

    let anguloAtual = 0;

    function desenharRoleta() {
      ctx.clearRect(0, 0, largura, altura);

      const anguloFatia = (2 * Math.PI) / premios.length;
      const espessuraBorda = 12;
      const espessuraDivisoria = espessuraBorda / 3;

      premios.forEach((premio, i) => {
        const inicio = anguloAtual + i * anguloFatia;
        const fim = inicio + anguloFatia;

        // Fatia
        ctx.beginPath();
        ctx.moveTo(raio, raio);
        ctx.arc(raio, raio, raio - espessuraBorda - 1, inicio, fim);
        ctx.closePath();
        ctx.fillStyle = premio.cor;
        ctx.fill();

        // Linha divisória
        ctx.strokeStyle = "black";
        ctx.lineWidth = espessuraDivisoria;
        ctx.stroke();

        // Texto
        ctx.save();
        ctx.translate(raio, raio);
        ctx.rotate(inicio + anguloFatia / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 16px Arial";
        ctx.fillText(premio.texto, raio - espessuraBorda - 10, 5);
        ctx.restore();
      });

      // Borda externa
      ctx.beginPath();
      ctx.arc(raio, raio, raio - espessuraBorda / 2, 0, 2 * Math.PI);
      ctx.lineWidth = espessuraBorda;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }

    function girar() {
      let graus = Math.floor(5000 + Math.random() * 5000);
      let angulo = (graus * Math.PI) / 180;
      let duracao = 5000;
      let inicio = null;

      function animacao(timestamp) {
        if (!inicio) inicio = timestamp;
        let progresso = timestamp - inicio;

        let rotacao = easeOut(progresso, 0, angulo, duracao);
        anguloAtual = rotacao;
        desenharRoleta();

        if (progresso < duracao) {
          requestAnimationFrame(animacao);
        }
      }
      requestAnimationFrame(animacao);
    }

    function easeOut(t, b, c, d) {
      t /= d;
      return -c * t*(t-2) + b;
    }

    desenharRoleta();
  </script>
</body>
</html>
