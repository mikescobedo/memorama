const NUM_MAX_CARDS = 16; //definimos el numero maximo de cartas
const NUM_TUPLE = 2; //Cuantos clicks puede dara para encontar la pareja de cartas 

//Definimos nuestro arreglo de imagenes para encontar
const Cards = [
  [
    1,
    {
      id: 1,
      source: './img/poca.jpg'
        
    }
  ],
  [
    2,

    {
      id: 2,
      source: './img/cheap.jpg'
    }
  ],
  [
    3,

    {
      id: 3,
      source: './img/bella.jpg'
    }
  ],
  [
    4,

    {
      id: 4,
      source: './img/sapo.jpg'
    }
  ],
  [
    5,

    {
      id: 5,
      source: './img/cenicienta.jpg'
    }
  ],
  [
    6,

    {
      id: 6,
      source: './img/moana.jpg'
    }
  ],
  [
    7,

    {
      id: 7,
      source: './img/abu.jpg'
    }
  ],
  [
    8,

    {
      id: 8,
      source: './img/ana.jpg'
    }
  ],
  [
    9,

    {
      id: 9,
      source: './img/bestia.jpg'
    }
  ],
  [
    10,

    {
      id: 10,
      source: './img/durmiente.jpg'
    }
  ],
  [
   11,

    {
      id: 11,
      source: './img/elsa.jpg'
    }
  ],
  [
    12,

    {
      id: 12,
      source: './img/gaston.jpg'
    }
  ],
  [
   13,

    {
      id: 13,
      source: './img/gus.jpg'
    }
  ],
  [
    14,

    {
      id: 14,
      source: './img/jack.jpg'
    }
  ],
  [
    15,

    {
      id: 15,
      source: './img/jazmin.jpg'
    }
  ],
  [
    16,

    {
      id: 16,
      source: './img/lucifer.jpg'
    }
  ],
  [
    17,

    {
      id: 17,
      source: './img/lumierer.jpg'
    }
  ],
  [
    18,

    {
      id: 19,
      source: './img/megara.jpg'
    }
  ],
  [
    20,

    {
      id: 20,
      source: './img/olaf.jpg'
    }
  ],
  [
    21,

    {
      id: 21,
      source: './img/pascal.jpg'
    }
  ],
  [
    22,

    {
      id: 22,
      source: './img/pooka.jpg'
    }
  ],
  [
    23,

    {
      id: 23,
      source: './img/potts.jpg'
    }
  ],
  [
    24,

    {
      id: 24,
      source: './img/princesas.jpg'
    }
  ],
  [
    25,

    {
      id: 25,
      source: './img/rapunzel.jpg'
    }
  ],
  [
    26,

    {
      id: 26,
      source: './img/sirenita.jpg'
    }
  ],
  [
    27,

    {
      id: 27,
      source: './img/vanellope.jpg'
    }
  ],
  [
    28,

    {
      id: 29,
      source: './img/flunder.jpg'
    }
  ],
  [
    30,

    {
      id: 30,
      source: './img/pegaso.jpg'
    }
  ],
  [
    31,

    {
      id: 31,
      source: './img/max.jpg'
    }
  ],
  [
    32,

    {
      id: 32,
      source: './img/rasha.jpg'
    }
  ],
  
];

//Definimos la clase de nuestra carta 

class Card {
  constructor(id, sourceFront) {
    this.liCard = this.renderCard(id);
    this.back = this.liCard.querySelector(".card-back");
    this.front = this.liCard.querySelector(".card-front");
    this.sourceFront = sourceFront;
    this.isBack = true;
    this.enabled = true;
  }

 
//Definimos como hacer el giro de nuestra carta
  flip() {
    if (this.enabled == true) {
      this.front.src = this.sourceFront;
      this.back.classList.toggle("card-back-flip");
      this.front.classList.toggle("card-front-flip");
      this.enabled = false;
      this.isBack = false;
      return true;
    }
    return false;
  }
  
  //Cubrir nuestra carta
  cover() {
    this.enabled = true;
    this.isBack = true;
    this.back.classList.toggle("card-back-flip");
    this.front.classList.toggle("card-front-flip");
    this.front.src = this.back.src;
  }
  
  //Mensaje de si es correcta o no
  say(say) {
    this.front.classList.toggle("card-front-" + say);
  }

  //Renderizamos  nuestra carta. Tanto la imagen trasera asi como la  frontal
  renderCard(id) {
    const src =
      "./img/back.jpg"
    let cardBack = document.createElement("img");
    cardBack.className = "card-back";
    cardBack.src = src;

    let cardFront = document.createElement("img");
    cardFront.className = "card-front";
    cardFront.src = src;

    let divCard = document.createElement("div");
    divCard.className = "card";
    divCard.appendChild(cardBack);
    divCard.insertBefore(cardFront, cardBack);

    let li = document.createElement("li");
    li.id = "card" + id;
    li.className = "flex-item";
    li.appendChild(divCard);

    return li;
  }

}

//Definimos  la clase game donde tomamos en cuenta los resultados que arroja el juego para poder enviar un mensaje al jugador

class Game {
  constructor(onEndGame, elCanvas) {
    this.cards = new Map();
    this.cardsSelected = new Array();
    this.onEndGame = onEndGame.bind(this);
    this.numTuplesOK = 0;
    this.numClicks = 0;
    this.resultArray = ["Excelente!", "Puedes mejorar", "Vuelve a intentarlo"];
    this.elCanvas = elCanvas;
    this.shuffleNum = [];
  }

  //Inicializamos el juego
  init() {
    let cardsMap = new Map(Cards);
    this.shuffle();
    this.cleanCanvas();

    for (let i = 0; i < this.shuffleNum.length; i++) {
      let num = (this.shuffleNum[i] % (NUM_MAX_CARDS / NUM_TUPLE)) + 1;
      let card = cardsMap.get(num);
      let cardg = new Card(i, card.source);
      this.addCard(i, cardg);
    }
  }

  //Agregamos las cartas
  addCard(id, card) {
    card.liCard.addEventListener("click", this.onClick.bind(this, card));
    this.cards.set(id, card);
    this.elCanvas.appendChild(card.liCard);
  }
  //Definimos que pasara con cada click, tomando en cuenta el mensaje que  nos indica  si es correcta el par que se elijio 
  onClick(card) {
    let flip = false;
    if (this.cardsSelected.length < NUM_TUPLE) {
      if (card.flip()) {
        this.cardsSelected.push(card);
        this.numClicks++;
      }
      if (this.cardsSelected.length == NUM_TUPLE) {
        this.enabledCards(false);
        if (!this.checkTupla()) {
          setTimeout(() => this.coverCards(), 2000);
          this.cardsSay("no", 1200);
          setTimeout(() => this.enabledCards(true), 2000);
          setTimeout(() => {
            this.cardsSelected = new Array();
          }, 2000);
        } else {
          setTimeout(() => this.enabledCards(true), 800);
          this.cardsSay("yes", 600);
          setTimeout(() => {
            this.cardsSelected = new Array();
          }, 700);

          this.numTuplesOK++;
          if (this.numTuplesOK === NUM_MAX_CARDS / NUM_TUPLE)
            setTimeout(() => {
              this.endGame();
            }, 1000);
        }
      }
    }
  }

  checkTupla() {
    if (this.cardsSelected.length > 0) {
      let srcFilter = this.cardsSelected[0].sourceFront;
      let ce = this.cardsSelected.filter(
        (card) => card.sourceFront === srcFilter
      );
      return ce.length === this.cardsSelected.length;
    }
    return false;
  }

  cardsSay(say, delay) {
    this.cardsSelected.forEach(function (card) {
      setTimeout(() => card.say(say), delay - 350);
      setTimeout(() => card.say(say), delay);
    });
  }

  coverCards() {
    this.cardsSelected.forEach(function (card) {
      card.cover();
    });
  }

  
  enabledCards(value) {
    this.cards.forEach(function (card) {
      if (card.isBack) card.enabled = value;
    });
  }
    //Finalizamos  nuestro juego
  endGame() {
    let numClicksMin = NUM_MAX_CARDS;
    let resultIndex = this.resultArray.length - 1;

    if (this.numClicks === numClicksMin) resultIndex = 0;

    if (this.numClicks > numClicksMin && this.numClicks <= numClicksMin * 2)
      resultIndex = 1;

    if (this.numClicks >= numClicksMin * 2) resultIndex = 2;

    this.onEndGame(this.resultArray[resultIndex], this.numClicks);
  }
  //Limpiamos para inicializar un juego nuevo
  cleanCanvas() {
    while (this.elCanvas.firstChild) {
      this.elCanvas.removeChild(this.elCanvas.firstChild);
    }
  }
  //Creamos un numero ramdom para elejir las cartas
  randomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  //Creamos el arreglo para que las cartas sean diferentes en cada juego
  shuffle() {
    this.shuffleNum = [];
    for (var i = 0; i < NUM_MAX_CARDS; i++) {
      var num = this.randomNum(1, NUM_MAX_CARDS);
      console.log(num);
      if (this.shuffleNum.indexOf(num) >= 0) {
        i = i - 1;
      } else {
        this.shuffleNum[i] = num;
      }
    }
  }
}
//Definimos el inicio de nuestro juego,al dar click en el boton
function startGame() {
  let cards = document.getElementById("cards"); 
  let game = new Game(endGame, cards);
  game.init();
}



//Escondemos el boton de jugar ahora
function playNow() {
  land.classList.toggle("land-hide");
  startGame();
}

//Jugar de nuevo, se voltean imagenes
function playAgain() {
  result.classList.toggle("land-hide");
  startGame();
}

function endGame(resultGame, score) {
  document.getElementById("result-msg").innerHTML =
    resultGame+' tus '+'intentos '+score;
  result.classList.toggle("land-hide");
}
