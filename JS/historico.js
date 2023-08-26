// Dentro do arquivo historico.js

const voltar = document.getElementById("btn-voltar");
const historicoLista = document.querySelector(".historico-lista");

const historico = JSON.parse(localStorage.getItem("historico")) || [];

historico.forEach(calculo => {
  const li = document.createElement("li");
  li.textContent = calculo;
  historicoLista.appendChild(li);
});

const btnLimparHistorico = document.getElementById("btn-limpar-historico");

btnLimparHistorico.addEventListener("click", () => {
  localStorage.removeItem("historico"); // Remove o histórico do localStorage
  historicoLista.innerHTML = ""; // Limpa a lista de histórico na página
});
voltar.addEventListener("click", () => {
  window.location.href = "index.html"; // Redireciona para a página de histórico
});