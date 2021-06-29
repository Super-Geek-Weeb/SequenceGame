var level=0; //current game level, 0 for start
var step=1; //current game step inside current level, loop counting from 1 to level
var sounds=["blue","green","red","yellow"]; //array of button's colors for random choosing
var chain=[]; //array of proper button's sequency, empty in the beggining

$(document).keypress(function(){ //event listener for pressing any key, perform only for starting game
  if (level===0){
    $("h2").addClass("hide");
    level++;
    headerChange();
    soundChain();
  }
});

$(".game-button").click(function(){ //event listener for buttons click, perform only since 1st level
  if (level!=0 && step<=level){
    if (this.id===chain[step-1]){ //check if pushed button color equals to proper color from this sequence's step
      buttonActivating(this.id);
      if (step===level){ //check if user reached the end of sequence and we should give him the next color in sequence
        level++;
        step=1;
        setTimeout(headerChange,1000);
        setTimeout(soundChain,1500);
      } else { step++; }
    } else { wrong_answer(); }
  }
})

function headerChange(){ //change level's name header
  $("h1").text("Level " + level);
}

function buttonActivating(color){ //animate correct button click
  var btn_snd=new Audio("sounds/" + color + ".mp3");
  $("#" + color).addClass("shadow");
  setTimeout(function(){$("#" + color).removeClass("shadow")},200);
  btn_snd.play();
}

function soundChain(){ //add a new element into a sequence of colors
  var i=Math.floor(Math.random()*4);
  chain.push(sounds[i]);
  var btn_snd=new Audio("sounds/" + sounds[i] + ".mp3");
  btn_snd.play();
  $("#" + sounds[i]).fadeOut(100).fadeIn(100);
}

function wrong_answer(){ //animate the end of the game
  $("h1").text("Game Over, Press Any Key to Restart");
  var wrong_snd=new Audio("sounds/wrong.mp3");
  wrong_snd.play();
  $("body").addClass("wrong");
  setTimeout(function(){$("body").removeClass("wrong")},200);
  level=0; //return all global variables to its start form
  chain=[];
  step=1;
}
