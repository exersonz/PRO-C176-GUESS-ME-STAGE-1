let guessingWord = [
    {
        "inputs": 6,
        "hint": "MLB",
        "word": "baseball"
    },
    {
        "inputs": 5,
        "hint": "Korean short ribs",
        "word": "galbi"
    },
    {
        "inputs": 9,
        "hint": "Hershey's _________",
        "word": "chocolate"
    },
    {
        "inputs": 5,
        "hint": "Jungle Animal",
        "word": "tiger"
    },
    {
        "inputs": 10,
        "hint": "Fruit (berry)",
        "word": "strawberry"
    }
]

$(document).ready(function(){
    fillBlanks();
})

var gameOver = false;

function fillBlanks(){
    const randomWord = guessingWord[Math.floor(Math.random() * guessingWord.length)];

    // emptying the blanks/inputs when page reloads
    $("#blanks").empty();

    // setting the blanks
    for(var i = 0; i < randomWord.inputs; i++){
        let blanks_html = `<span class="fill_blanks">_ </span>`
        $("#blanks").append(blanks_html);
    }

    $("#hint").html(randomWord.hint)
    
    // filling in the blanks ONLY if the alphabetical character is found
    $(".clickable").click(function(){
        var correctGuess = false;

        // getting the id of the button clicked
        let id = $(this).attr("id");

        // getting the current life of the player
        var life = parseInt($("#life").text())

        // looping through all the letters (a-z)
        for(var i = 0; i < randomWord.word.length; i++){
            // checking if the character matches the id of the button
            if(randomWord.word.charAt(i).toLowerCase() == id){
                // checking if the life is still greater than 0 and the blanks are empty or filled  
                if(life > 0 && ($(".fill_blanks").eq(i).html() == "_ " || $(".fill_blanks").eq(i).html() == id)){
                    // filling the blanks
                    $(".fill_blanks").eq(i).html(id);
                    correctGuess = true;

                    // checking if the guessed word is complete
                    if($("#blanks").text() === randomWord.word.toLowerCase()){
                        // displaying the results text if the guessed word is complete
                        $("#results").text("You win!")
                        correctGuess = true;
                        gameOver = true;
                    }
                }
            }
        }
        // reducing the life when it's greater than 0 and when correctGuess and gameOver are false
        if(life > 0 && correctGuess == false && gameOver == false){
            console.log("pls just subtract 1")
            life -= 1;
            $("#life").html(life);
        }
    })
}