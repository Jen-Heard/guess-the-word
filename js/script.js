const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuessesP = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessMessage = document.querySelector( ".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// Code to grab the API and produce a random word
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
        const words = await response.text();
        const wordArray = words.split("\n");
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        word = wordArray[randomIndex].trim();
        placeholder(word);
    };

    getWord();

// Display symbols as placeholders for letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("🍋‍🟩");
    }
    inProgress.innerText = placeholderLetters.join("");
};

// Code for the click event
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessMessage.innerText = "";

    const guess = guessInput.value;
    // console.log(inputLetter);
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    guessInput.value = "";
});


const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
       guessMessage.innerText = `Please enter a letter to play`;
    } else if (input.length > 1) {
        guessMessage.innerText = `Please enter only 1 letter at a time!`;
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = `Please enter a letter from A to Z`;
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = `Whoops! You already guessed that letter; please try again!`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateGuessesRemaining(guess);
        wordUpdate(guessedLetters);
    }
};

// code to show guessed letters 
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Code to update the word in progress
const wordUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    inProgress.innerText = revealWord.join("");
    checkIfWin();
};

// Code for remaining guesses
const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        guessMessage.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        guessMessage.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// Code to check if player won
const checkIfWin = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed the correct word; congrats!!</p>`;    

        startOver();
    }
};

// Code to start game again
const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesP.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};


playAgainButton.addEventListener("click", function () {
    guessMessage.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    guessMessage.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesP.classList.remove("hide");
    guessedLettersElement.classList.remove("hide"); 
});


