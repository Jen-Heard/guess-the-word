const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingGuessesP = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessMessage = document.querySelector( ".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

// Display symbols as placeholders for letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    };
    inProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

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
    };
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = `Whoops! You already guessed that letter; please try again!`;
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

