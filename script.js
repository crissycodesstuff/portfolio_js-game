const quotes = [
  'The United States Cannot Afford To Lose More Than Half Of Its Talent And The Fresh Perspective That Women And Minorities Can Bring.',
  'I Was Able To Stand On The Shoulders Of Those Women Who Came Before Me, And Women Who Came After Me Were Able To Stand On Mine.',
  'My Success And Failures Make Me Who I Am.',
  'The Greatest Challenge I Faced In Becoming A Programmer Was Believing It Was Possible.',
  'We ignore public understanding of science at our peril',
  'Somewhere along the way I decided that if I was going to be in tech support, I might as well become a programmer.',
  'Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.',
];

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

let wordQueue;
let highlightPosition;
let startTime;

function startGame() {
  console.log("Game started!");

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quoteText = quotes[quoteIndex];

  wordQueue = quoteText.split(' ');
  quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');

  highlightPosition = 0;
  quote.childNodes[highlightPosition].className = 'highlight';

  input.focus();
  input.value = '';
  message.innerText = '';

  startTime = new Date().getTime();

  document.body.className = "";
  start.className = "started";
  setTimeout(() => {
    start.className = "button";
  }, 2000);
}

function checkInput() {
  const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "");
  const typedValue = input.value.trim();

  if (currentWord !== typedValue) {
    input.className = currentWord.startsWith(typedValue) ? "" : "error";
    return;
  }

  wordQueue.shift(); //shift removes first item (0th element)
  input.value = ""; // empty textbox
  quote.childNodes[highlightPosition].className = ""; // unhighlight word

  if (wordQueue.length === 0) { // if we have run out of words in the queue then game over.
    gameOver();
    return;
  }

  highlightPosition++; // increment highlight position
  quote.childNodes[highlightPosition].className = 'highlight'; // highlight new word
}

function gameOver() {
  const elapsedTime = new Date().getTime() - startTime;
  document.body.className = "winner";
  message.innerHTML = `<span class="congrats">Congratulations!</span> <br> You finished in ${elapsedTime / 1000} seconds.`;
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);