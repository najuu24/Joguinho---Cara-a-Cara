let todasPerguntas = [
  "usaOculos",
  "temChapeu",
  "cabeloComprido",
  "barba",
  "mulher",
];

let perguntasTraduzidas = {
  usaOculos: "Usa óculos?",
  temChapeu: "Tem chapéu?",
  cabeloComprido: "Tem cabelo comprido?",
  barba: "Tem barba?",
  mulher: "É mulher?",
};

let perguntasRestantes = [];
let perguntasAtuais = [];
let personagemIA = null;
let personagens = [];

function carregarPersonagens() {
  fetch("../json/personagens.json")
    .then(res => res.json())
    .then(data => {
      personagens = data;
      sortearPersonagemIA();
      iniciarPerguntas();
    });
}

function sortearPersonagemIA() {
  const index = Math.floor(Math.random() * personagens.length);
  personagemIA = personagens[index];
  console.log("Personagem da IA:", personagemIA.nome);
}

function iniciarPerguntas() {
  perguntasRestantes = [...todasPerguntas];
  perguntasAtuais = [];
  for (let i = 0; i < 3; i++) {
    sortearPergunta(i);
  }
  atualizarPerguntas();
}

function sortearPergunta(pos) {
  if (perguntasRestantes.length === 0) return;
  const idx = Math.floor(Math.random() * perguntasRestantes.length);
  const sorteada = perguntasRestantes.splice(idx, 1)[0];
  perguntasAtuais[pos] = sorteada;
}

function atualizarPerguntas() {
  const container = document.getElementById("container-perguntas");
  container.innerHTML = "";

  perguntasAtuais.forEach((pergunta, index) => {
    container.innerHTML += `
      <div class="pergunta">
        <span>${perguntasTraduzidas[pergunta]}</span>
        <button onclick="fazerPergunta('${pergunta}')">Perguntar</button>
        <button onclick="sortearPergunta(${index}); atualizarPerguntas();">🔁</button>
      </div>
    `;
  });
}

function fazerPergunta(pergunta) {
  const resposta = personagemIA[pergunta] ? "✅ Sim" : "❌ Não";
  document.getElementById("resposta").innerText = `Resposta da IA: ${resposta}`;
}

function verificarChute() {
  const palpite = document.getElementById("campo-chute").value.trim().toLowerCase();
  if (palpite === personagemIA.nome.toLowerCase()) {
    alert("🎉 Acertou! Era mesmo " + personagemIA.nome + "!");
  } else {
    alert("❌ Errou! Tente de novo!");
  }
}
