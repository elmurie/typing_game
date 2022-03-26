const RANDOM_QUOTE_URL = 'https://api.quotable.io/RANDOM';
const timerDisplay = document.querySelector('[timer]');
const quoteDisplayContent = document.querySelector('[quote-display-content]');
const quoteDisplayAuthor = document.querySelector('[quote-display-author]');
const userInput = document.querySelector('[quote-input]');
const keycaps = document.querySelectorAll('[key-value]');
const roundNumberDisplay = document.querySelector('[round-number]');
const pointsDisplay = document.querySelector('[points]');

// API CALL TO GET THE QUOTE
function getQuote() {
    return fetch(RANDOM_QUOTE_URL)
        .then((response) => response.json())
}

// RENDER OF QUOTE
async function getNewQuote() {
    const quote = await getQuote();
    quoteDisplayContent.innerHTML = '';
    quoteDisplayAuthor.innerText = quote.author;
    quote.content.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplayContent.appendChild(characterSpan);
    });
    userInput.value = '';
    startTimer();
}

// LISTENER KEYBOARD ANIMATION
window.addEventListener('keydown', (key) => {
    keycaps.forEach((keycap) => {
        if (keycap.innerHTML.toUpperCase() === key.key.toUpperCase()) {
            keycap.parentElement.classList.add('pressed');
            setTimeout(() => {
                keycap.parentElement.classList.remove('pressed');
            }, 100);
        }
    })
});

// LISTENER TEXTAREA
userInput.addEventListener('input', () => {
    // PASTE DISABLED ON TEXTAREA
    userInput.onpaste = e => {
        e.preventDefault();
        return false;
    };
    let correct = true;
    const arrayQuote = quoteDisplayContent.querySelectorAll('span');
    const arrayValue = userInput.value.split('');
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('wrong');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('wrong');
        } else {
            characterSpan.classList.add('wrong');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })
    if (correct) {
        getNewQuote();
        getRoundNumber();
        getPoints(arrayQuote.length, timerDisplay.innerHTML);
    }
})

// TIMER FUNCTIONS
let startTime;
function startTimer() {
    timerDisplay.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerDisplay.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

// UPDATES ROUND NUMBER AFTER QUOTE IS COMPLETED AND CORRECT 

function getRoundNumber() {
    let number = roundNumberDisplay.innerHTML;
    number++;
    roundNumberDisplay.innerHTML = number;

}

// UPDATES SCORE

function getPoints(quoteLength, time) {
    let currentPoints = parseInt(pointsDisplay.innerHTML);
    currentPoints += quoteLength - Math.round( time / 2 );
    pointsDisplay.innerHTML = currentPoints;
}

getNewQuote();