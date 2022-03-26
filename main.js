let keycaps = document.querySelectorAll('[key-value]');

window.addEventListener('keydown', (key) => {
    keycaps.forEach((keycap) => {
        if ( keycap.innerHTML.toUpperCase() === key.key.toUpperCase()) {
            keycap.parentElement.classList.add('pressed');
            setTimeout(() => {
                animation(keycap.parentElement);
            }, 200);
        }
    })
});

function animation(target) {
    target.classList.remove('pressed')
}

