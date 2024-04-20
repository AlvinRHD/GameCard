var symbols = ['❤️', '☀️', '☁️', '☘️', '❄️'];
var cards = [];
var flippedCards = [];
var matches = 0;

function createBoard() {
    var board = document.getElementById('board');
    board.innerHTML = ''; // Limpiar el tablero antes de agregar nuevas cartas
    cards = [];
    var duplicatedSymbols = symbols.concat(symbols); // Duplicar los símbolos antes de barajarlos
    duplicatedSymbols = shuffle(duplicatedSymbols); // Barajar los símbolos

    for (var i = 0; i < duplicatedSymbols.length; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        var emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.textContent = duplicatedSymbols[i];
        card.appendChild(emoji);
        card.dataset.symbol = duplicatedSymbols[i];
        card.addEventListener('click', flipCard);
        board.appendChild(card);
        cards.push(card);
    }

    // Mostrar cartas por un tiempo antes de ocultarlas
    showCardsForInitialView();
}

function showCardsForInitialView() {
    cards.forEach(card => {
        var emoji = card.querySelector('.emoji');
        emoji.style.display = 'block';
    });

    setTimeout(function() {
        cards.forEach(card => {
            var emoji = card.querySelector('.emoji');
            emoji.style.display = 'none';
        });
    }, 3000); // Ocultar las cartas después de 3 segundos
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        var emoji = this.querySelector('.emoji');
        emoji.style.display = 'block'; // Mostrar el emoji cuando la carta está volteada
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    var symbol1 = flippedCards[0].dataset.symbol;
    var symbol2 = flippedCards[1].dataset.symbol;

    if (symbol1 === symbol2) {
        flippedCards.forEach(card => {
            card.removeEventListener('click', flipCard);
            card.classList.add('matched');
        });
        matches++;

        if (matches === symbols.length / 2) {
            alert('Congrts my queen');
        }
    } else {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            var emoji = card.querySelector('.emoji');
            emoji.style.display = 'none';
        });
    }

    flippedCards = [];
}


function resetGame() {
    // Limpiar el tablero
    var board = document.getElementById('board');
    board.innerHTML = '';
    cards = [];
    flippedCards = [];
    matches = 0;

    // Crear un nuevo tablero con emojis sin barajar aún
    createBoard();
}

function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

document.addEventListener('DOMContentLoaded', createBoard);
