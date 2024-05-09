const html = document.querySelector("html");

const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const startPauseBtn = document.getElementById("start-pause");
const spanEl = document.querySelector("#start-pause span");
const iconEl = document.querySelector("#start-pause img");

const campoTimer = document.getElementById("timer");
const campoTitle = document.querySelector(".app__title");
const campoImagem = document.querySelector(".app__image");

const botoes = document.querySelectorAll(".app__card-button");

const musicaBtn = document.getElementById("alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;

let tempoFoco = 1500;
let tempoCurto = 300;
let tempoLongo = 900;

let tempoDecorrido = 1500;
let intervaloId = null;

let finishAudio = new Audio("./sons/beep.mp3");
let playAudio = new Audio("./sons/play.wav");
let pauseAudio = new Audio("./sons/pause.mp3");

musicaBtn.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBtn.addEventListener("click", () => {
  tempoDecorrido = 1500;
  alterandoContexto("foco");
  focoBtn.classList.add("active");
});

curtoBtn.addEventListener("click", () => {
  tempoDecorrido = 300;
  alterandoContexto("descanso-curto");
  curtoBtn.classList.add("active");
});

longoBtn.addEventListener("click", () => {
  tempoDecorrido = 900;
  alterandoContexto("descanso-longo");
  longoBtn.classList.add("active");
});

startPauseBtn.addEventListener("click", () => {});

function alterandoContexto(contexto) {
  mostrarTimer();

  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  campoImagem.setAttribute("src", `./imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      campoTitle.innerHTML = `Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      campoTitle.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      campoTitle.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorrido <= 0) {
    finishAudio.play();
    alert("Tempo finalizado!");
    const focoAtivo = html.getAttribute("data-contexto") == "foco";
    if (focoAtivo) {
      const evento = new CustomEvent("focoFinalizado");
      document.dispatchEvent(evento);
    }
    zerar();
    return;
  }

  tempoDecorrido -= 1;
  mostrarTimer();
};

startPauseBtn.addEventListener("click", startPause);

function startPause() {
  if (intervaloId) {
    pauseAudio.play();
    zerar();
    return;
  } else {
    playAudio.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    spanEl.textContent = "Pausar";
    iconEl.setAttribute("src", "./imagens/pause.png");
  }
}

function zerar() {
  clearInterval(intervaloId);
  spanEl.textContent = "Começar";
  iconEl.setAttribute("src", "./imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTimer() {
  const tempo = new Date(tempoDecorrido * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  campoTimer.innerHTML = `${tempoFormatado}`;
}

mostrarTimer();
