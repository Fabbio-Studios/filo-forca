// variables
let words = ["rousseau", "jonhlocke", "virtu", "hobbes", "maquiavel"];
let perguntas = ["Pioneiro do romantismo que influenciou a democracia", "Pioneiro do liberalismo", "Capacidade de lidar com acontecimentos", "Guerra de todos contra todos", "Autor de 'O príncipe'"];
let chosenWord;
let correctWord = "";
let letters = [];
let tries = 10;
let gameOver = false;

function pickRandomWord() {
    let index = Math.floor(Math.random() * words.length);
    chosenWord = words[index].toUpperCase();
    drawLines();
    document.getElementById("pergunta").innerHTML = perguntas[index].toUpperCase();
    return chosenWord;
}


function checkLetter(letter) {
    if (!gameOver) {
        if (!letters.includes(letter)) {
            letters.push(letter);
            if (chosenWord.includes(letter)) {
                for (let i = 0; i < chosenWord.length; i++) {
                    if (chosenWord[i] === letter) {
                        drawCorrectLetter(i);
                        addCorrectLetter(i);
                    }
                }
                checkGameOver();
                disableKey(letter, "correct");
            } else {
                tries--;
                drawHangman();
                checkGameOver();
                disableKey(letter, "incorrect");
            }
        }
    }
}

function checkGameOver() {
    if (tries == 0) {
        // gameover
        showEndGameText("lose", "Fim de Jogo! Você perdeu!");
        gameOver = true;
    }
    if (correctWord.length === chosenWord.length) {
        // gamewin
        showEndGameText("win", "Parabéns! Você venceu!");
        gameOver = true;
    }
}

function addCorrectLetter(i) {
    correctWord += chosenWord[i].toUpperCase();
}

function disableKey(key, status) {
    //Add respective class to visually disable key
    const keysButtons = document.querySelectorAll('.letter');
    for (let i = 0; i < keysButtons.length; i++) {
        if (keysButtons[i].textContent === key) {
            keysButtons[i].classList.add(status);
            break;
        }
    }
}

function addListeners() {
    //Adds event listeners to keyboard
    window.addEventListener('keydown', (e) => {
        let letter = e.key.toUpperCase();
        // validation if it's a letter
        if (keys.toString().includes(letter)) {
            checkLetter(letter);
        }
    });

    //Adds events listeners to virtual keyboard
    const keysButtons = document.querySelectorAll('.letter');
    keysButtons.forEach(key => key.addEventListener('click', () => {
        let letter = key.textContent;
        checkLetter(letter);
    }));
}