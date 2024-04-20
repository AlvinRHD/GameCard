var symbols = ['❤️', '☀️', '☁️', '☘️', '❄️'];
var cards = [];
var flippedCards = [];
var matches = 0;
var score = 0; // Variable para almacenar la puntuación
var wrongAttemptPenalty = 5; // Penalización por cada intento fallido

// Lista de mensajes personalizados
var customMessages = [
    "¡Feliiz!",
    "¡Disfruta!",
    "¡Waooos!",
    "¡Congrats my lady!",
    "¡Uhs que rapida!",
    "¡Beso si ganas!",
    "¡Que felicidad haz ganado!",
    "¡Que jueguito mas fresa!",
    "¡Uffaaaaaaaaa!",
    "¡Genial!",
    "¡Fuaa!",
    "¡Congrats!",
    "¡Ya nose que mensajes poner!",
    "¡jsdajjsja ganaste!",
    "¡Juega denuevo!",
    "¡I loviu!",
    // Agrega más mensajes personalizados según desees
];

function createBoard() {
    var board = document.getElementById('board');
    board.innerHTML = '';
    cards = [];
    var duplicatedSymbols = symbols.concat(symbols);
    duplicatedSymbols = shuffle(duplicatedSymbols);

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
    }, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        var emoji = this.querySelector('.emoji');
        emoji.style.display = 'block';
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
        updateScore(10); // Incrementa la puntuación en 10 al hacer un match

        if (matches === symbols.length) {
            var victoryMessage = document.getElementById('victory-message');
            victoryMessage.style.display = 'block';
            showCustomMessage(); // Mostrar mensaje personalizado
            hideAllCards(); // Ocultar todas las cartas
            return;
        }
    } else {
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            var emoji = card.querySelector('.emoji');
            emoji.style.display = 'none';
        });

        // Restar puntos por intento fallido
        updateScore(-wrongAttemptPenalty);
    }

    flippedCards = [];
}

function updateScore(points) {
    score += points; // Incrementa o decrementa la puntuación
    var scoreValue = document.getElementById('score-value');
    scoreValue.textContent = score; // Actualiza el valor de la puntuación en el HTML
}

function hideAllCards() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'none';
    });
}

function resetGame() {
    var board = document.getElementById('board');
    board.innerHTML = '';
    board.style.display = 'flex'; // Mostrar el tablero nuevamente

    var victoryMessage = document.getElementById('victory-message');
    victoryMessage.style.display = 'none'; // Ocultar el mensaje de victoria

    cards = [];
    flippedCards = [];
    matches = 0;
    score = 0; // Reiniciar la puntuación a 0

    var scoreValue = document.getElementById('score-value');
    scoreValue.textContent = score; // Actualizar la puntuación en el HTML

    // Mostrar el botón de reinicio
    var resetButton = document.querySelector('#victory-message button');
    resetButton.style.display = 'block';

    createBoard();
}

// Función para mostrar un mensaje personalizado al ganar
function showCustomMessage() {
    var victoryText = document.getElementById('victory-text');
    var randomIndex = Math.floor(Math.random() * customMessages.length);
    victoryText.textContent = customMessages[randomIndex];
}

function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

document.addEventListener('DOMContentLoaded', createBoard);
