// deck of all cards in game
const deck = document.getElementById('card-deck');
// cards array holds all cards
let card = document.getElementsByClassName('card');
let cards = [...card];
//array for openedCards
var openedCards = [];
// declaring move variable
let moves = 0;
let counter = document.querySelector('.moves');
// declare variables for star icons
const stars = document.querySelectorAll('.fa-star');
//declare variable for matched cards
let matchedCards = document.getElementsByClassName('match');
//declare modal
 let modal = document.getElementById('popup1');
//closeicon in modal
let closeicon = document.querySelector('.close');

/**
* This chunk of code should already look somewhat familiar :P
*
* @param array
* @returns {*}
*/
function shuffle(array) {
  let currentIndex = array.length,
  temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// @description function to start a new play
function startGame() {
  // shuffle deck
  cards = shuffle(cards);
  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove('show','open','match','disabled');
  }
  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = '#FFD700';
    stars[i].style.visibility = 'visible';
  }
  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.getElementById('timer');
  timer.innerHTML = '0 mins 0 secs';
  clearInterval(interval);
  startTimer();
}


//@desciption count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //setting rates based on moves
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = 'collapse';
      }
    }
  } else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = 'collapse';
      }
    }
  }
}


//@desciption game timer
var interval;
var timer = document.getElementById('timer');
var second = 0,
minute = 0,
hour = 0;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + 'mins' + '  '+ second + 'secs'
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);

}


//@desciption  when card match
function matched() {
  openedCards[0].classList.add('match');
  openedCards[1].classList.add('match');
  openedCards[0].classList.remove('show', 'open');
  openedCards[1].classList.remove('show', 'open');
  openedCards = [];
}


//@desciption when card unmathed
function unmatched() {
  openedCards[0].classList.add('unmatched');
  openedCards[1].classList.add('unmatched');
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove('show', 'open', 'unmatched');
    openedCards[1].classList.remove('show', 'open', 'unmatched');
    enable();
    openedCards = [];
  }, 1100);
}

function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}


// @description enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCards.length; i++) {
      matchedCards[i].classList.add('disabled');
    }
  });
}


//@description to add openedcards to opened cards list and check if matched or not
function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  moveCounter();
  if (len === 2) {
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};


//@description to open congratulation when all cards match,show modal and moves
function congratulations() {
  if(matchedCards.length == 16) {
    clearInterval(interval);

    finalTime = timer.innerHTML;
    // show congratulations modal
    modal.classList.add('show');


    // declare star rating variable
    var starRating = document.querySelector('.stars').innerHTML;

    //showing move, rating, time on modal
    document.getElementById('finalMove').innerHTML =moves;
    document.getElementById('starRating').innerHTML =starRating;
    document.getElementById('totalTime').innerHTML =finalTime;
    //closeicon on modal
    closemodal();
  };
}


//@description to closeicon in modal
function closemodal() {
  closeicon.addEventListener('click', function(e){
    modal.classList.remove("show");
    startGame();
  });
}


//@description to play again
function playAgain() {
  modal.classList.remove('show');
  startGame();
}


//@description loop to add event listener to each card
for (i = 0; i < cards.length; i++) {
  card = cards[i]
  card.addEventListener('click', displayCard);
  card.addEventListener('click', cardOpen);
  card.addEventListener('click', congratulations);
};


//@description  toggle open and show to display cards
function displayCard() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
};
