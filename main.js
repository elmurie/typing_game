const RANDOM_QUOTE_URL = 'https://api.quotable.io/RANDOM';
const keycaps = document.querySelectorAll('[key-value]');

const quoteDisplayContent = document.querySelector('[quote-display-content]');
const quoteDisplayAuthor = document.querySelector('[quote-display-author]');
const userInput = document.querySelector('[quote-input]');


function getQuote() {
    return fetch(RANDOM_QUOTE_URL)
    .then((response) => response.json())
}

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
}

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

userInput.addEventListener('input', () => {
    let correct = true;
    const arrayQuote = quoteDisplayContent.querySelectorAll('span');
    const arrayValue = userInput.value.split('');
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if ( character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('wrong');
            correct = false;
        } else if ( character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('wrong');
        } else {
            characterSpan.classList.add('wrong');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    })
    console.log(correct);
    if (correct) getNewQuote();
})

getNewQuote();