/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let cardFilped = [];


const deck = document.querySelector(".deck");
const movesCount = document.querySelector('.moves');
const star = document.querySelectorAll('.stars');
const movesTxt = document.querySelector('.moves-text');
let movesIncrement = 0;


deck.addEventListener('click', FlipCard);

//this function to flip the card 
function FlipCard(event) {

    var target = event.target;
    const parent = target.parentElement;
    if (parent.classList.contains('card')) {
        target = parent;
    }

    if (!cardFilped.includes(target)) {
        target.classList.add('open', 'show');
        cardFilped.push(target);
        checkMatch();
    }
}

let matches = 0;
function checkMatch() {
    const length = cardFilped.length;
    if (length === 2) {

        const last = cardFilped[1];
        const preLast = cardFilped[0];

        if (last.children[0].classList.toString() ===
            preLast.children[0].classList.toString()) {
            matches++;
            matchCard(last);
            matchCard(preLast);
        } else {
            closeCard(last);
            closeCard(preLast);
        }
        incrementMove();
        cardFilped = [];
        checkGameWin();
    }
}
//change the class for matched cards
function matchCard(card) {
    setTimeout(() => {
        card.classList.add('match', 'bounceIn');
    }, 500)
}
 
function closeCard(card) {
    setTimeout(() => {
        card.classList.remove('open', 'show');
    }, 500)
}

function incrementMove() {
    movesIncrement++;
    movesCount.textContent = movesIncrement;
    if (movesIncrement === 1) {
        //movesTxt.textContent = ' Move';
    } else {
        //movesTxt.textContent = ' Moves';
    }
    //determineRating();
}

function checkGameWin() {
    if (matches === 8) {
        alert("Win!")
    }
}
    

 let countTimer = 30;
 
 let countdown = setInterval(function(){
   document.getElementById("timer").innerHTML = countTimer;
   countTimer -= 1;
   if(countTimer < 0){
     clearInterval(countdown);
     alert("Time is finished!");
   }
 }, 3000);

//document.addEventListener('click', restartGame);

let card = document.getElementsByClassName("card");
let cards = [...card];

function restartGame(){
    countTimer = 30;
    movesCount.textContent=0;
    movesIncrement=0;
    matches=0;

    cards = shuffle(cards);
    
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
     }

     MovesRate();
   // determineRating();
}


function MovesRate(){
    
    movesCount.innerHTML=movesIncrement;

    if(movesIncrement > 8 && movesIncrement < 12){

        for(i=0; i<3; i++){
            if(i>1){
                star[i].classList.add('collapse');
            }
        }
    }else if(movesIncrement > 13 ){
        for(i=0; i<3 ; i++){
            if(i >0){
                stars[i].classList.add("empty-star");
            }
        }
    }

}



let rating = 3;
/* function determineRating() {
    if (movesIncrement === 2) {
        rating--;
        star[2].classList.add('empty-star');
    } else if (movesIncrement === 3) {
        rating--;
        star[1].classList.add('empty-star');
    } else if (movesIncrement === 4) {
        rating--;
        star[0].classList.add('empty-star');
    }
} */

/*
function incrementMatches() {
    matches++;
}*/


function resetDeck() {

    // Clear openedCards array
    openCards = [];

    // Shuffle symbols
    cardSymbols = shuffle(cardSymbols);

    // Iterate over all cards
    cards.forEach((card, index) => {
        // Remove classes
        card.classList.remove('open', 'show', 'match', 'bounceIn');
        // Remove symbols
        removeClassByPrefix(card.children[0], 'fa-');

        // Attach new symbols to cards
        const symbol = `fa-${cardSymbols[index]}`;
        card.children[0].classList.add(symbol);
    });
}


