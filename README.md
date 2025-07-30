# Joguinho---Cara-a-Cara

site avatares: https://getavataaars.com/

adicionar >



🖼️ 2. Adicione um container no index.html para exibir os personagens
No arquivo index.html, adicione dentro do <body>:

*html
<div id="tabuleiro-personagens"></div>
🎨 3. No style.css, adicione estilos para o tabuleiro
*css
#tabuleiro-personagens {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
  justify-content: center;
}

.personagem-card {
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 120px;
  text-align: center;
  padding: 10px;
  background: #f8f8f8;
}

.personagem-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}
🧠 4. No script.js, crie uma função para mostrar os personagens
Depois de carregar os dados do JSON, chame isso:

*js
function exibirTabuleiro(personagens) {
  const tabuleiro = document.getElementById("tabuleiro-personagens");
  tabuleiro.innerHTML = ""; // limpa antes de preencher

  personagens.forEach(personagem => {
    const card = document.createElement("div");
    card.className = "personagem-card";
    card.innerHTML = `
      <img src="../${personagem.imagem}" alt="${personagem.nome}">
      <p>${personagem.nome}</p>
    `;
    tabuleiro.appendChild(card);
  });
}
E chame essa função logo depois que os personagens forem carregados:

*js
fetch("../dados/personagens.json")
  .then(response => response.json())
  .then(data => {
    personagens = data;
    atualizarPerguntas();
    exibirTabuleiro(personagens); // <- aqui
  });
✅ Resultado
Você verá todos os personagens com nome e imagem num tabuleiro visual, tipo o “Cara a Cara”.



*js
const perguntas = [
  { texto: "A pessoa usa óculos?", atributo: "usaOculos" },
  { texto: "A pessoa tem chapéu?", atributo: "temChapeu" },
  { texto: "A pessoa tem cabelo comprido?", atributo: "cabeloComprido" },
  { texto: "A pessoa tem barba?", atributo: "barba" },
  { texto: "A pessoa é uma mulher?", atributo: "mulher" },
  { texto: "A pessoa está usando roupa colorida?", atributo: "roupaColorida" },

  // Novas com valores específicos:
  { texto: "A pessoa tem cabelo cacheado?", atributo: "tipoCabelo", valor: "cacheado" },
  { texto: "A pessoa tem cabelo liso?", atributo: "tipoCabelo", valor: "liso" },
  { texto: "A pessoa é careca?", atributo: "tipoCabelo", valor: "careca" },
  
  { texto: "A pessoa tem cabelo loiro?", atributo: "corCabelo", valor: "loiro" },
  { texto: "A pessoa tem cabelo castanho?", atributo: "corCabelo", valor: "castanho" },
  { texto: "A pessoa tem cabelo ruivo?", atributo: "corCabelo", valor: "ruivo" },
  { texto: "A pessoa tem cabelo azul?", atributo: "corCabelo", valor: "azul" }
];


✅ Como isso funciona no jogo
Quando a pergunta tem apenas um atributo booleano (usaOculos, temChapeu etc.), você só compara true ou false.

Quando tem valor, tipo corCabelo === "loiro", você compara assim:

*js
if (pergunta.valor) {
  return personagem[pergunta.atributo] === pergunta.valor;
}
