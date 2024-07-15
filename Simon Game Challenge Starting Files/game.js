var buttonColors = ["red","blue","green","yellow"];
var colorPatern = [];
var userClickedPattern = [];
var level=0;
var turn = false;
// arrow function do not catch "this"
// $("div.btn").click(() => {
//    var  userChosenColour = $(this).attr('id');
//    console.log(userChosenColour);
//    userClickedPattern.push(userChosenColour);
//    console.log(userClickedPattern);
// });

$("div.btn").click(function () {
    if(level != 0 && turn){
        var  userChosenColour = $(this).attr('id');
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        
        checkAnswer(userClickedPattern.length-1);
    }
   
 });


    $(document).keydown(nextsequnce);
    

function checkAnswer(lastClick) {  
    if(colorPatern[lastClick] == userClickedPattern[lastClick]){
        console.log('success');

        if(colorPatern.length == userClickedPattern.length){
            turn = false;
            setTimeout(nextsequnce, 1000);

        }
    }else{

        turn = false;
        $('body').addClass('game-over');
        $('<br><span>Press A Key to Restart</span>').appendTo("#level-title");
        var audio = new Audio("sounds/wrong.mp3");
            audio.play();
        setTimeout(function(){
            $('body').removeClass("game-over");
        }, 500);
        $(document).keydown(restartGame);
    }


}

function nextsequnce(){
    
    level++;
    $("h1#level-title").text("Level " + level);
    $(document).off('keydown');
    var choseColor =Math.floor( Math.random()*4);
    var chosenColor =  buttonColors[choseColor];
    colorPatern.push(chosenColor);
    playSound(chosenColor);
    $("." + chosenColor).fadeOut(100).fadeIn(100);
    userClickedPattern = [];
    turn = true;

}



function playSound(name){
    switch (name) {
        case "red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        default:
            break;
    }
}

function animatePress(press) { 
    $("#" + press).addClass("pressed");
    setTimeout(function(){
        $("#" + press).removeClass("pressed");
    }, 100);
 }

 function restartGame(){
    $('span').remove();
    level = 0;
    colorPatern = [];
    userClickedPattern = [];
    setTimeout(nextsequnce,1000);

    
 }