var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);

}

$("[type=button]").click(function(event){
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
});

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

var level = 0;
$(document).one("keypress",function(){
    nextSequence()
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       if(gamePattern.length===(currentLevel+1)){
            console.log("succ");
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }else{
            console.log("waiting for next input");
        }
    }else{
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("no");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    $(document).one("keypress",function(){
        nextSequence()
    });
}
