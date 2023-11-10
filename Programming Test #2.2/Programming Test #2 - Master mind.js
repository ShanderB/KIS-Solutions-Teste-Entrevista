var readline = require('readline');
var maxAttempt = null;
var currentAttempt = 0;
var generatedNumber = [];
const maxPatternLength = 4; //Max numbers array length. As far i could understand, it could be up to 6.
const maxGuessAttempt = 3; //Max ammount of guesses that user can select

var promptRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Here the user set the level that he wants to play.
promptRead.question('Choose your level!\n', function (userSelectedAmountGuess) {
    handleLevelSelection(userSelectedAmountGuess);
});

function handleLevelSelection(userSelectedAmountGuess) {
    if (userSelectedAmountGuess > maxGuessAttempt) {
        terminateTheCode(
            `Level ${userSelectedAmountGuess} is too hard for you. Try something less or equal ${maxGuessAttempt}.`
        );
    } else if (userSelectedAmountGuess == 0 || userSelectedAmountGuess < 0) {
        terminateTheCode(
            `Try something greater than ${userSelectedAmountGuess} or equal ${maxPatternLength}.`
        );
    } else if (isNaN(userSelectedAmountGuess)) {
        terminateTheCode(`Try something like a number, greater or equal ${maxGuessAttempt}.`);
    }

    maxAttempt = userSelectedAmountGuess;
    callGuessPrompt();
}

function callGuessPrompt() {
    promptRead.setPrompt('Type your guess: \n');
    promptRead.prompt();

    //Keep reading the input until something break stops the prompt.
    promptRead.on('line', function (input) {
        handleGuessPrompt(input);
        promptRead.prompt();
    });
}

function handleGuessPrompt(userInput) {
    if (!generatedNumber.length) {
        generatedNumber = generatesNumber();
    }
    handleInput(userInput);
}

function handleInput(userInput) {
    let userGuess = userInput.split('');
    let correctNumber = 0;
    let correctPosition = 0;

    //If the user sets the wrong amount of numbers, return.
    if (userGuess.length != maxPatternLength) {
        console.log(`Input needs to be ${maxPatternLength} of size.`);
        return;
    }

    //If any value outside 1...6
    if (userGuess.some(typedValue => typedValue > 6 || typedValue < 1 || isNaN(typedValue))) {
        console.log(`Try something like a number between 1 and 6.`);
        return;
    }
    //It has to be here. We just want to count the attempt if it's valid.
    currentAttempt++;

    userGuess.forEach((item, index) => {
        if (generatedNumber.includes(item)) {
            correctNumber++;
        }

        if (generatedNumber.indexOf(item) == index) {
            correctPosition++;
        }
    });

    console.log(
        `${correctNumber} number${correctNumber > 1 ? 's' : ''} correct, ${correctPosition} number${correctPosition > 1 ? 's' : ''} in correct position`
    );



    //If you want to see how it's working, you could uncomment these lines.
    /* 
    console.log("userGuess")
    console.log(userGuess)
    console.log("=======================")
    console.log("generatedNumber")
    console.log(generatedNumber)
    console.log("=======================")
    console.log(correctNumber)
    console.log(correctPosition)
 */
    if (
        correctNumber == maxPatternLength &&
        correctPosition == maxPatternLength
    ) {
        console.log(`You broke the code in ${currentAttempt} guesses!`);
        promptRead.close();
        process.exit(0);
    } else if (currentAttempt == parseInt(maxAttempt)) {
        console.log(`You were unable to break the code in ${currentAttempt} guesses. Code pattern is: ${generatedNumber.join('')}.`);
        promptRead.close();
        process.exit(0);
    }
}

//Generates game array numbers
function generatesNumber() {
    let number = [];
    for (let index = 0; index < maxPatternLength;) {
        let numberGenerated = parseInt(Math.random() * 6) + 1;
        if (!number.includes(numberGenerated.toString())) {
            number.push(numberGenerated.toString());
            index++;
        }
    }
    return number;
}

function terminateTheCode(message) {
    console.log(message);
    process.exit(0);
}
