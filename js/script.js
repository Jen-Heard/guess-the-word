const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remainingParagraph = document.querySelector(".remaining");
const remainingNum = document.querySelector(".remaining span");
const guessMessage = document.querySelector( ".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";

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
    const inputLetter = guessInput.value;
    console.log(inputLetter);
    guessInput.value = "";
});

