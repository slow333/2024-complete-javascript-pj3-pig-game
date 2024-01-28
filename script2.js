'use strict';
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const current1El = document.querySelector('#current--0');
const current2El = document.querySelector('#current--1');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice')

newGameBtn.addEventListener('click', function () {
  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
})

let currentPoint1 = 0;
let player1Total = 0;
let currentPoint2 = 0;
let player2Total = 0;

function winner(winner) {
  const div = document.createElement('div');
  div.className = 'player--winner';
  div.classList.add('name');
  div.textContent = winner;
  document.body.append(div)
}

rollDiceBtn.addEventListener('click', function () {

  if (player1El.classList.contains('player--active')) {
    let randomNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomNumber}.png`;
    if(randomNumber !== 1) {
      currentPoint1 += randomNumber;
      current1El.textContent = currentPoint1;
    }
    if (randomNumber === 1) {
      currentPoint1 = 0;
      current1El.textContent = 0;
      togglePlayer(player1El, player2El)
    } else {


    }
  } else {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    if (randomNumber === 1) {
      currentPoint2 = 0;
      current2El.textContent = 0;
      togglePlayer(player2El, player1El)
    } else {
      currentPoint2 += randomNumber;
      console.log('current1', currentPoint2)
      current2El.textContent = currentPoint2;
    }
    // showDice(randomNumber);
  }
})

hold.addEventListener('click', function () {
  if (player1Total >= 13) {
    document.querySelector('main').remove()
    return winner("player1")
  } else if (player2Total >= 13) {
    document.querySelector('main').remove()
    return winner("player2")
  } else {
    if (player1El.classList.contains('player--active')) {
      togglePlayer(player1El, player2El)
      player1Total += currentPoint1;
      currentPoint1 = 0;
      current1El.textContent = currentPoint1;
      score1El.textContent = player1Total;
    } else {
      togglePlayer(player2El, player1El)
      player2Total += currentPoint2;
      currentPoint2 = 0;
      current2El.textContent = currentPoint2;
      score2El.textContent = player2Total;
    }
  }
})

function showDice(number) {
  switch (number) {
    case 1 :
      dice.src = 'dice-1.png';
      break;
    case 2 :
      dice.src = 'dice-2.png';
      break;
    case 3 :
      dice.src = 'dice-3.png';
      break;
    case 4 :
      dice.src = 'dice-4.png';
      break;
    case 5 :
      dice.src = 'dice-5.png';
      break;
    case 6 :
      dice.src = 'dice-6.png';
      break;
  }
}

function togglePlayer(p1, p2) {
  p1.classList.remove('player--active');
  p2.classList.add('player--active');
}