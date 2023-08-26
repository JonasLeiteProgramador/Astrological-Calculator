const tela = document.querySelector(".visor");
const teclas = document.getElementById("btns");
const btnHistorico = document.getElementById("btn-Historico");
const historico = JSON.parse(localStorage.getItem("historico")) || [];
const entradas = [];

let numeroAtual = "";
let operadorSelecionado = "";
let valorAnterior = "";
let teclaPressionadaPeloTeclado = false;

function formatarNumero(numero) {
  if (numero % 1 !== 0) {
    return numero.toFixed(8);
  }
  return numero.toString();
}

function atualizarTela(valor) {
  tela.textContent = valor;
}

function adicionarEntrada(entrada) {
  entradas.push(entrada);
}

function calcularResultado() {
  const numeroAtualConvertido = parseFloat(numeroAtual);

  switch (operadorSelecionado) {
    case "+":
      return valorAnterior + numeroAtualConvertido;
    case "-":
      return valorAnterior - numeroAtualConvertido;
    case "*":
      return valorAnterior * numeroAtualConvertido;
    case "/":
      if (numeroAtualConvertido === 0) {
        atualizarTela("Erro Divisão por zero");
        return null;
      }
      return valorAnterior / numeroAtualConvertido;
    case "√":
      return Math.sqrt(numeroAtualConvertido);
    case "%":
      return valorAnterior * (numeroAtualConvertido / 100);
    default:
      return numeroAtualConvertido;
  }
}

function realizarCalculo() {
  adicionarEntrada(numeroAtual);
  adicionarEntrada(operadorSelecionado);

  const resultado = calcularResultado();

  if (resultado !== null) {
    atualizarTela(formatarNumero(resultado));
    valorAnterior = resultado;
    numeroAtual = resultado.toString();

    adicionarEntrada("=");
    adicionarEntrada(numeroAtual);
    atualizarHistorico();
  }

  operadorSelecionado = "";
}

function clicarTecla(textoBtn) {
  if (textoBtn === "." && numeroAtual.includes(".")) {
    return;
  }

  numeroAtual += textoBtn;
  atualizarTela(numeroAtual);
}

function limparCalculadora() {
  numeroAtual = "";
  operadorSelecionado = "";
  valorAnterior = "";
  atualizarTela("");
}

function atualizarHistorico() {
  const calculoCompleto = entradas.join(" ");
  historico.push(calculoCompleto);
  localStorage.setItem("historico", JSON.stringify(historico));
}

teclas.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const textoBtn = event.target.textContent;

    if (!isNaN(textoBtn) || textoBtn === ".") {
      clicarTecla(textoBtn);
    } else if (["+", "-", "*", "/", "√", "%"].includes(textoBtn)) {
      if (numeroAtual !== "") {
        adicionarEntrada(numeroAtual);
      }

      if (operadorSelecionado !== "") {
        realizarCalculo();
      }

      operadorSelecionado = textoBtn;
      valorAnterior = parseFloat(numeroAtual);
      numeroAtual = "";
    } else if (textoBtn === "=") {
      if (operadorSelecionado !== "") {
        realizarCalculo();
      }
    } else if (textoBtn === "C") {
      limparCalculadora();
    }
  }
});

btnHistorico.addEventListener("click", () => {
  window.location.href = "historico-calculo.html";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "h" || event.key === "H") {
    window.location.href = "historico-calculo.html";
  }
});
document.addEventListener("keydown", (event) => {
  const teclaPressionada = event.key;

  if (
    !isNaN(teclaPressionada) || // Dígitos numéricos
    teclaPressionada === "." || // Ponto decimal
    ["+", "-", "*", "/", "√", "%"].includes(teclaPressionada) || // Operadores
    teclaPressionada === "Backspace" || // Tecla Backspace
    teclaPressionada === "c" || teclaPressionada === "C" || // Tecla C (para limpar)
    teclaPressionada === "Enter" // Tecla Enter
  ) {
    if (teclaPressionada === "Enter") {
      event.preventDefault(); // Impede que a tecla Enter envie o formulário (caso exista)
      if (operadorSelecionado !== "") {
        realizarCalculo();
      }
    } else {
      teclaPressionadaPeloTeclado = true;
    }
  }
});

document.addEventListener("keyup", (event) => {
  const teclaPressionada = event.key;

  if (!teclaPressionadaPeloTeclado) {
    return;
  }

  if (!isNaN(teclaPressionada) || teclaPressionada === ".") {
    clicarTecla(teclaPressionada);
  } else if (["+", "-", "*", "/", "√", "%"].includes(teclaPressionada)) {
    if (numeroAtual !== "") {
      adicionarEntrada(numeroAtual);
    }

    if (operadorSelecionado !== "") {
      realizarCalculo();
    }

    operadorSelecionado = teclaPressionada;
    valorAnterior = parseFloat(numeroAtual);
    numeroAtual = "";
  } else if (teclaPressionada === "Backspace") {
    limparCalculadora();
  }

  teclaPressionadaPeloTeclado = false;
});

const dataHoraDiv = document.querySelector(".data-hora");

function atualizarDataHora() {
  const dataHoraAtual = new Date();
  const formato = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  };
  const dataHoraFormatada = dataHoraAtual.toLocaleDateString("pt-BR", formato);
  dataHoraDiv.textContent = dataHoraFormatada;
}

setInterval(atualizarDataHora, 1000);
