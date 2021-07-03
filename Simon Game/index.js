var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickPattern=[];

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
var started=false;
var level=0;
    $(document).keydown(function(){
        if(!started){
            nextSequence();
            $("h1").html("Level " + level);
            started=true;
        }
    
});


function nextSequence(){

    userClickPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    //console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    //console.log(gamePattern);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("h1").html("Level " + level);
}
$(".btn").click(function(){
    var userChosenColor=this.id;
    userClickPattern.push(userChosenColor);
    //console.log(userClickPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var x=userClickPattern.length-1;
    checkAnswer(x);
})

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100); 
}

function checkAnswer(currentLevel) {
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        //console.log("success");
    
    if(userClickPattern.length === gamePattern.length){
        setTimeout (function(){
            nextSequence();
        },1000);
    }
}
    else{
        //console.log("wrong");
        var audio=new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart.");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}