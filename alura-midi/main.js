const listaDeTeclas = document.querySelectorAll(".tecla");

function tocaSom(idElementoAudio) {
  const elemento = document.querySelector(idElementoAudio);
  if (elemento && elemento.localName === "audio") {
    elemento.play();
  } else {
    console.log("Elemento nao encontrado ou invalido");
  }
}

for (let i = 0; i < listaDeTeclas.length; i++) {
  listaDeTeclas[i].onclick = function () {
    tocaSom(`#som_${listaDeTeclas[i].classList[1]}`);
  };

  listaDeTeclas[i].onkeydown = function (event) {
    if (event.code == "Enter" || event.code == "Space") {
      listaDeTeclas[i].classList.add("ativa");
    }
  };

  listaDeTeclas[i].onkeyup = function () {
    listaDeTeclas[i].classList.remove("ativa");
  };
}
