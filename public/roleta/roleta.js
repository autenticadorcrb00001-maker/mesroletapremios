// public/roleta/roleta.js

window.addEventListener('load', function() {
    let tamanhoLogoSuperior = 220;

    const canvas = document.getElementById("roleta");
    const ctx = canvas.getContext("2d");
    const largura = canvas.width;
    const altura = canvas.height;
    const raio = largura / 2;
    let anguloAtual = 0;
    let espessuraBorda = 22;

    // Prêmios
    const premios = [
        { cor: "#FFC700", img: "assets/p1.png", imgSize: 80 },
        { cor: "#012ebd", img: "assets/p2.png", imgSize: 80 },
        { cor: "#FFC700", img: "assets/p3.png", imgSize: 85 },
        { cor: "#012ebd", img: "assets/p4.png", imgSize: 80 },
        { cor: "#FFC700", img: "assets/p5.png", imgSize: 95 },
        { cor: "#012ebd", img: "assets/p6.png", imgSize: 95 }
    ];

    // Logo central e seta
    const logoCentro = new Image();
    logoCentro.src = 'assets/logo2.png';
    const setaImg = new Image();
    setaImg.src = 'assets/seta.png';

    // Ajustes da seta
    let setaOffsetX = 75;
    let setaOffsetY = -2;
    let setaTamanho = 250;

    // Criação de objetos Image para cada prêmio
    premios.forEach(premio => {
        premio._imgObj = new Image();
        premio._imgObj.src = premio.img;
        premio._imgObj.onload = desenharRoleta;
    });

    // Função para desenhar a roleta
    function desenharRoleta() {
        ctx.clearRect(0, 0, largura, altura);
        const anguloFatia = (2 * Math.PI) / premios.length;

        premios.forEach((premio, i) => {
            const inicio = anguloAtual + i * anguloFatia;
            const fim = inicio + anguloFatia;

            // Fundo da fatia
            ctx.beginPath();
            ctx.moveTo(raio, raio);
            ctx.arc(raio, raio, raio - espessuraBorda, inicio, fim);
            ctx.closePath();
            ctx.fillStyle = premio.cor;
            ctx.fill();

            // Imagem do prêmio
            ctx.save();
            ctx.translate(raio, raio);
            ctx.rotate(inicio + anguloFatia / 2);
            if (premio._imgObj.complete) {
                ctx.drawImage(
                    premio._imgObj,
                    raio - espessuraBorda - premio.imgSize - 20,
                    -premio.imgSize / 2,
                    premio.imgSize,
                    premio.imgSize
                );
            }
            ctx.restore();
        });

        // Borda dourada gradiente
        ctx.beginPath();
        ctx.arc(raio, raio, raio - espessuraBorda / 2, 0, 2 * Math.PI);
        ctx.lineWidth = espessuraBorda + 4;
        const grad = ctx.createRadialGradient(raio, raio, raio - espessuraBorda, raio, raio, raio);
        grad.addColorStop(0, "#FFD700");
        grad.addColorStop(0.5, "#FFA500");
        grad.addColorStop(1, "#B8860B");
        ctx.strokeStyle = grad;
        ctx.stroke();

        // Logo central
        if (logoCentro.complete) {
            const tamanhoLogo = 90;
            ctx.save();
            ctx.beginPath();
            ctx.arc(raio, raio, tamanhoLogo / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.clip();
            ctx.drawImage(logoCentro, raio - tamanhoLogo / 2, raio - tamanhoLogo / 2, tamanhoLogo, tamanhoLogo);
            ctx.restore();
        }

        // Seta
        if (setaImg.complete) {
            ctx.drawImage(
                setaImg,
                largura - setaTamanho + setaOffsetX,
                raio - (setaTamanho / 2) + setaOffsetY,
                setaTamanho,
                setaTamanho
            );
        }
    }

    // Função de rotação da roleta
    function girar() {
        const indicePremio = 1; // prêmio fixo para teste
        const anguloFatia = (2 * Math.PI) / premios.length;
        const alvo = (2 * Math.PI) - (indicePremio * anguloFatia + anguloFatia / 2);
        const voltas = 5;
        const anguloFinal = (2 * Math.PI * voltas) + alvo;
        const duracao = 5000;
        let inicio = null;

        function animacao(timestamp) {
            if (!inicio) inicio = timestamp;
            let progresso = timestamp - inicio;
            let rotacao = easeOut(progresso, 0, anguloFinal, duracao);
            anguloAtual = rotacao % (2 * Math.PI);
            desenharRoleta();
            if (progresso < duracao) requestAnimationFrame(animacao);
            else premiado();
        }

        requestAnimationFrame(animacao);
    }

    // Função de easing
    function easeOut(t, b, c, d) { t /= d; return -c * t*(t-2) + b; }

    // Confetes e popup
    function premiado() {
        gerarConfetes();
        mostrarPopup();
    }

    function mostrarPopup() { document.getElementById('popup').classList.add('show'); }

    function gerarConfetes() {
        const cores = ["#FFD700","#FF4500","#1E90FF","#32CD32","#FF69B4"];
        const numConfetes = 120;
        for (let i = 0; i < numConfetes; i++) {
            const confete = document.createElement("div");
            confete.classList.add("confete");
            confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
            confete.style.left = Math.random() * window.innerWidth + "px";
            const size = Math.random() * 8 + 6;
            confete.style.width = size + "px";
            confete.style.height = size + "px";
            confete.style.animationDuration = (2.5 + Math.random() * 2) + "s";
            document.body.appendChild(confete);
            setTimeout(() => confete.remove(), 5000);
        }
    }

    // Deixa a função girar disponível globalmente
    window.girar = girar;

    // Desenhar inicialmente
    logoCentro.onload = desenharRoleta;
    setaImg.onload = desenharRoleta;
    desenharRoleta();
});
