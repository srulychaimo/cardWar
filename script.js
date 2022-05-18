//deck arrays
const cardNames = ["Spade", "Club", "Diamond", "Hart"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "A",
  "J",
  "Q",
  "K",
];
const cardShapes = ["♠", "♣", "♦", "♥"];
let mainDeck = [];

//players decks
let deckPlayer1 = [];
let deckPlayer2 = [];

//players points
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;

//html elements

const pointResults = document.querySelector(".point-results");
const mainDeckHtml = document.querySelector(".main-deck");
const deckPlayer1Html = document.querySelector(".deck-player-1");
const deckPlayer2Html = document.querySelector(".deck-player-2");
const cardsPlayer1Html = document.querySelector(".cards-player-1");
const winnerResult = document.querySelector(".winner-result");
const cardsPlayer2Html = document.querySelector(".cards-player-2");

// loop for creating the random deck
while (mainDeck.length < 52) {
  let numArr = Math.floor(Math.random() * 4);
  let numValue = Math.floor(Math.random() * 13);
  let card = { name: cardNames[numArr], value: values[numValue] };

  if (mainDeck.find((ca) => JSON.stringify(ca) === JSON.stringify(card))) {
    continue;
  }
  mainDeck.push(card);
}

mainDeckHtml.addEventListener("click", cardsForPlayers);

function cardsForPlayers() {
  if (mainDeck.length) {
    mainDeckFull();
    return;
  }
  mainDeckEmpty();
}

function mainDeckFull() {
  //condition if player one has a card, if he doesn't have a card than insert and remove from deck then return
  if (!cardsPlayer1Html.innerHTML) {
    cardPlayer1Fn(mainDeck, 0);
    return;
  }

  //condition if player tow has a card
  if (!cardsPlayer2Html.innerHTML) {
    cardPlayer2Fn(mainDeck, 1);

    setTimeout(checkWinner, 1500);
    return;
  }

  if (winnerResult.innerHTML) {
    cardsPlayer1Html.innerHTML = "";
    cardsPlayer2Html.innerHTML = "";
    winnerResult.innerHTML = "";
    return;
  }
}

function checkWinner() {
  let alt1 = values.findIndex(
    (elem) => elem === cardsPlayer1Html.children[0].alt
  );
  let alt2 = values.findIndex(
    (elem) => elem === cardsPlayer2Html.children[0].alt
  );

  //checks if player one is the winner
  if (alt1 > alt2) {
    winnerResult.innerHTML =
      "<h5 class='text-primary fw-bold  mt-3'>Player 1 is the winner</h5>";
    pointsPlayer1++;
    deckPlayer1.push(mainDeck[0], mainDeck[1]);
    mainDeck.splice(0, 2);
    showPoints();
    return;
  }
  //checks if It's a tie
  if (alt1 === alt2) {
    winnerResult.innerHTML = `<h5 class='text-danger fw-bold  mt-3'>It's a tie</h5>`;
    mainDeck.splice(0, 2);
    showPoints();
    return;
  }

  //if player two is the winner
  winnerResult.innerHTML =
    "<h5 class='text-success fw-bold  mt-3'>Player 2 is the winner</h5>";
  pointsPlayer2++;
  deckPlayer2.push(mainDeck[0], mainDeck[1]);
  mainDeck.splice(0, 2);
  showPoints();
}

function showPoints() {
  //basic html for showing the points
  const htmlForPoints = `
    <h4 class="text-secondary text-center">player 1 points: ${pointsPlayer1}</h4>
    <h4 class="text-secondary text-center">player 2 points: ${pointsPlayer2}</h4>
`;

  pointResults.innerHTML = htmlForPoints;
}

function mainDeckEmpty() {
  //remove the main deck and put decks of players, and removes cards

  mainDeckHtml.innerHTML = "";
  deckPlayer1Html.innerHTML = '<img src="./cardimages/BLUE_BACK.svg" alt="" />';
  deckPlayer2Html.innerHTML = '<img src="./cardimages/BLUE_BACK.svg" alt="" />';
  cardsPlayer1Html.innerHTML = "";
  cardsPlayer2Html.innerHTML = "";
  winnerResult.innerHTML = "";

  //add event to decks
  deckPlayer1Html.addEventListener("click", card1Fill);
  deckPlayer2Html.addEventListener("click", card2Fill);
}

function cardPlayer1Fn(deckName, deckNum) {
  let card = deckName[deckNum];
  let img = `<img src="./cardimages/${card.value}${card.name[0]}.svg" alt="${card.value}">`;
  cardsPlayer1Html.innerHTML = img;
}

function cardPlayer2Fn(deckName, deckNum) {
  let card = deckName[deckNum];
  let img = `<img src="./cardimages/${card.value}${card.name[0]}.svg" alt="${card.value}">`;
  cardsPlayer2Html.innerHTML = img;
}

function card1Fill() {
  console.log("hello");
  if (!cardsPlayer1Html.innerHTML) {
    if (deckPlayer1.length) {
      cardPlayer1Fn(deckPlayer1, 0);
      return;
    }
    winnerPlayer(2);
  }
  if (winnerResult.innerHTML) {
    cardsPlayer1Html.innerHTML = "";
    cardsPlayer2Html.innerHTML = "";
    winnerResult.innerHTML = "";
    return;
  }
}

function card2Fill() {
  if (!cardsPlayer2Html.innerHTML) {
    if (deckPlayer2.length) {
      cardPlayer2Fn(deckPlayer2, 0);

      setTimeout(checkWinner, 1500);
      return;
    }
    winnerPlayer(1);
  }

  if (winnerResult.innerHTML) {
    cardsPlayer1Html.innerHTML = "";
    cardsPlayer2Html.innerHTML = "";
    winnerResult.innerHTML = "";
    return;
  }
}

function winnerPlayer(winner) {
  pointResults.innerHTML = "";
  cardsPlayer1Html.parentElement.parentElement.innerHTML = `
  <div class="d-flex justify-content-around align-items-center">
    <h3>Player ${winner} is the winner</h3>
  </div>
  `;
}
