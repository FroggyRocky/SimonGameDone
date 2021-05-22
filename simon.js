
const arrColours = ["red","yellow","green","blue"];
const buttonStart = $(".btn__start");
const buttonRestart = $(".btn__restart");
var pattern = [];
var userPattern = [];
var levels = 0;
var started = false;
const playSound = (name) => {
    var audio = new Audio("sounds/" + name + ".mp4");
    audio.play();

};
const pressedBtn = (target) => {
    $(target).addClass("pressed");
    setTimeout(() => {
        $(target).removeClass("pressed");
    }, 100);
};
$(buttonRestart).click(function() {
     $(buttonRestart).removeClass("hide");
    if (!started) {
        $("#level-title").text("level " + levels)
        sequence();
        started = true; }
        if (started === true) {
            $(buttonRestart).removeClass("show")
             }
})
$(buttonStart).click(function() {
    if (!started) {
        pressedBtn();
        $("#level-title").text("level " + levels)
        sequence ();
        started = true; }
        if (levels === 1) {
        $(buttonStart).addClass("hide")
         }
});
$(document).keypress(function() {
    if (!started) {
    $("#level-title").text("level " + levels)
    sequence ();
    started = true;
     }
});

function sequence() { 
userPattern = [];
levels++;
$("h1").text("level " + levels)
var randomNum = Math.floor(Math.random()*4);
var randomColour = arrColours[randomNum];
pattern.push(randomColour);
$("#" + randomColour).fadeOut(100).fadeIn(100);
playSound(randomColour);
};

function startOver() {
pattern = [];
userPattern = [];
levels = 0;
started = false;
};

function checkArray(currentLevel) {
if (userPattern [currentLevel] === pattern [currentLevel]) { 
if (userPattern.length === pattern.length) {
    setTimeout(() => {
        sequence()
    }, 1000);
}}
else {
    console.log("wrong");
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 200);
    playSound("wrong");
    $("h1").text("Game is over, press any key or the button to restart");
    $(buttonRestart).addClass("show");
    startOver();
}
};
$(".btn").click((e)=>{
    var chosenColour = e.target.id;
userPattern.push(chosenColour);
playSound(chosenColour);
pressedBtn(e.target);
checkArray(userPattern.length - 1);
});
