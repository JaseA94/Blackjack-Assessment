var dealerSum = 0;
var yourSum = 0; //Tracks the sum of players cards
var dealerAceNo = 0;
var yourAceNo = 0; //Tracks the number of aces and their value
var hidden;
var deck;
var canHit = true; //Allow player to play provided sum of cards <= 21

window.onload = function() {
    createDeck(); //Every time page is loaded, a new deck is generated
    shuffleDeck();
    startGame();
}

function createDeck() {
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let suits = ["C","D","H","S"];
    deck = []; //An empty array

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + suits[i]); //Searches through all images of suits and connects them to a value
        }
    }
    //console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); //Select a number between 1-52(deck length) and prevents athe posibility of a decimal
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    //console.log(deck);
}

function startGame() {
    hidden = deck.pop(); //Removes card from end of shuffled deck(array)
    dealerSum += getValue(hidden); //Takes removed card and places it on top of deck
    dealerAceNo += checkAce(hidden);
    //console.log(hidden);
    //console.log(dealerSum);
    while (dealerSum < 18) { //Dealer must draw card past value of 18
        let cardImg = document.createElement("img");
        let card =deck.pop(); //Create an image tag then create a source to pull cards from
        cardImg.src = "./Cards/" + card + ".png"; //Location of card images
        dealerSum += getValue(card);
        dealerAceNo += checkAce(card);
        document.getElementById("dealercards").append(cardImg); //Card images will now appear on HTML 
    }
    console.log(dealerSum);

    for (let i = 0; i < 1; i++) { //Generate first card for the player
        let cardImg = document.createElement("img");
        let card =deck.pop();
        cardImg.src = "./Cards/" + card + ".png"; 
        yourSum += getValue(card);
        yourAceNo += checkAce(card);
        document.getElementById("yourcards").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit); //Give a property to hit button
    document.getElementById("stand").addEventListener("click", stand); //Give a property to stand button
}

function hit() { //Prevents the player from pulling additional cards if they exceed 21
    if (!canHit) {
        return;
    }
    //When pressing hit, a new card is given to the player
    let cardImg = document.createElement("img");
    let card =deck.pop();
    cardImg.src = "./Cards/" + card + ".png"; 
    yourSum += getValue(card);
    yourAceNo += checkAce(card);
    document.getElementById("yourcards").append(cardImg);

    if (adjustAce(yourSum, yourAceNo) > 21) { 
        canHit = false;
    }
}

function stand() {
    dealerSum = adjustAce(dealerSum, dealerAceNo);
    yourSum = adjustAce(yourSum, yourAceNo);

    canHit = false;
    document.getElementById("hidden").src = "./Cards/" + hidden + ".png";
    
    let message = ""; //Set the win conditions based on scenarios in the game 
    if (yourSum > 21) {
        message = "BUST!";
    }
    else if (dealerSum > 21) {
        message = "VICTORY!";
    }
    else if (yourSum == dealerSum) {
        message = "DRAW!";
    }
    else if (yourSum > dealerSum) {
        message = "VICTORY!";
    }
    else if (yourSum < dealerSum) {
        message = "DEFEAT!";
    }

    document.getElementById("dealersum").innerText = dealerSum;
    document.getElementById("yoursum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}


function getValue(card) {
    let data = card.split("-"); //Recognises - in cards folder and assigns value with a suit
    let value = data[0];

    if (isNaN(value)) { //In case an Ace is drawn we must determine its value
        if (value == "A") {
            return 11; //Allows for Ace value to = 11
        }
        return 10; //Allows for Jack, Queen and Kings value to be set as 10
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function adjustAce(playerSum, playerAceNo) { //Adjusts value of ace based on players hand
    while (playerSum > 21 && playerAceNo > 0) {
        playerSum -= 10; 
        playerAceNo -= 1;
    }
    return playerSum;
}

/*
function createDeck() {
    var suits = ['A','C','D','H']; //Declaring the variables including suits, values and the deck
    var value = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    var deck = [];

    for(var suitCount = 0; suitCount < 4; suitCount++) {
    for(var valueCount = 0; valueCount <13; valueCount++) {
        //console.log(value[valueCount] + suits[suitCount]);
        deck.push(value[valueCount] + suits[suitCount]);
        } 
    }
    return deck;
}

function shuffleDeck(deck) {
    for(var i = 0; i < 52; i++) {
        var tempCard = deck[i];
        var randomIndex = Math.floor(Math.random() * 52);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = tempCard;
    }
}

var testDeck = createDeck();
shuffleDeck(testDeck);
console.log(testDeck);
*/