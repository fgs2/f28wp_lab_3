const boardElement = document.getElementById("gameboard");
const boardCards = [];
const numberOfCards = 16;
const cardPairs = [];

function generateBoardCards() {
  for (let i = 0; i < numberOfCards; i++) {
    boardElement.innerHTML += `<div class="col-3 board-card flipped">
    <div class="face-container">
    <div class="facedown"></div>
    <div class="faceup"></div>
    </div>
   </div>`;
  }
  createAllCards();
}

// generateBoardCards();

function Card(element, color) {
  this.element = element;
  this.color = color;
  this.isFacedUp = false;
  this.isMatched = false;

  this.setColor = function (color) {
    //get the faceup div of this card
    if (this.element === undefined) {
      window.alert("Undefined card!");
      return;
    }

    const faceUpElement = this.element.getElementsByClassName("faceup")[0];
    faceUpElement.classList.add(color);
  };

  this.flip = function () {
    this.isFacedUp = !this.isFacedUp;
    if (this.isFacedUp) {
      this.element.classList.add("flipped");
    }
  };
}

function CardPair(card1, card2, colorClass) {
  this.card1 = card1;
  this.card2 = card2;
  this.colorClass = colorClass;
}

function createAllCards() {
  const cardElements = document.getElementById("gameboard").children;
  for (let i = 0; i < numberOfCards; i++) {
    let card = new Card(cardElements[i], i);
    boardCards.push(card);
  }
}

function getCardByNum(num) {
  for (let i = 0; i < boardCards.length; i++) {
    if (boardCards[i].index === num) return boardCards[i];
  }
  return null;
}

function isPaired(card) {
  for (let i = 0; i < cardPairs.length; i++) {
    let pair = cardPairs[i];
    if (pair.card1.index === card.index || pair.card2.index === card.index)
      return true;
    continue;
  }
  return false;
}

function isUsed(candidateColorIndex) {
  for (let i = 0; i < cardPairs.length; i++) {
    let colorIndex = Number(cardPairs[i].colorClass.split("-")[1]);
    if (colorIndex === candidateColorIndex) return true;
    continue;
  }
  return false;
}

function createRandomCardPairs() {
  for (let i = 0; i < numberOfCards / 2; i++) {
    var card1;
    var card2;
    var colorIndex;
    do {
      var card1Index = Math.floor(Math.random() * 16);
      card1 = getCardByNum(card1Index);
    } while (isPaired(card1));
    do {
      var card2Index = Math.floor(Math.random() * 16);
      if (card1Index === card2Index) continue;
      card2 = getCardByNum(card2Index);
    } while (isPaired(card2));
    do {
      colorIndex = Math.floor(Math.random() * 8); //random index of color
    } while (isUsed(colorIndex));
    console.log(`(${card1Index} , ${card2Index} , ${colorIndex})`);
    let colorClassName = "color-" + colorIndex;
    let pair = new CardPair(card1, card2, colorClassName);
    card1.setColor(colorClassName);
    card2.setColor(colorClassName);
    cardPairs.push(pair);
  }
}

function initGame() {
  generateBoardCards();
  createRandomCardPairs();
}

function flipAll() {
  initGame();
  for (card of boardCards) {
    card.flip();
  }
}

flipAll();
