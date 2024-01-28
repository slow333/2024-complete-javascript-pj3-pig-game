'use strict';

const player1El = document.querySelector('.player--0')
const player2El = document.querySelector('.player--1')
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const current1 = document.getElementById('current--0');
const current2 = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

function init() {
  scores = [0, 0]
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score1El.textContent = '0';
  score2El.textContent = '0';
  current1.textContent = '0';
  current2.textContent = '0';
  diceImg.classList.add('hidden');
  player1El.classList.remove('player--winner','name');
  player2El.classList.remove('player--winner','name');
  player1El.classList.add('player--active');
}
init();

rollDiceBtn.addEventListener('click', function () {
  if(playing) {
    const randNum = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden')
    diceImg.src = `dice-${randNum}.png`;

    if (randNum !== 1) {
      currentScore += randNum;
      document.getElementById(`current--${activePlayer}`)
        .textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
})

holdBtn.addEventListener('click', function () {
  if(playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`)
      .textContent = scores[activePlayer];
    if(scores[activePlayer] >= 10) {
      playing = false;
      document.querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner','name');
      document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer()
    }
  }
})

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`)
    .textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player1El.classList.toggle('player--active')
  player2El.classList.toggle('player--active')
}
newGameBtn.addEventListener('click', init);