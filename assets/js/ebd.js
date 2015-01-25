var level = 0;
var correctDoor = Math.floor(Math.random() * 2);
var doorOpenAnimation;
var remainingPlayers =8;
var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById('gameArea');
canvas.width = width;
canvas.height = height;

var clickedDoor = -1;

var drawPuzzles;

var context = canvas.getContext('2d');
var doorWidth = 300;
var doorHeight = 450;
var doorSpacing = 100;

var startingPos = (width - ((doorWidth * 3) + (doorSpacing * 2)))/2;
var doors = [
  [startingPos,100,doorWidth,doorHeight],
  [startingPos + (doorWidth + doorSpacing),100,doorWidth,doorHeight],
  [startingPos+ (doorWidth * 2 + doorSpacing * 2),100,doorWidth,doorHeight]];

//$('#gameArea').mousemove(doorHoverHandler);
$('#gameArea').click(doorClickHandler);

function redrawDoors(){
  context.save();
  context.shadowBlur = 0;
  context.shadowColor = null;
  context.strokeStyle = null;

  var rot = 0;
  drawPuzzles = setInterval(function(){
    for (var i=0; i<3; i++){
        context.save();
        context.shadowBlur = 0;
        context.shadowColor = null;
        context.strokeStyle = null;
        context.drawImage(doorImage, doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
        context.restore();
        var pattern = i == correctDoor ? puzzles[level][0] : puzzles[level][1];
        drawPuzzle(doors[i][0]+(doorWidth/2), doors[i][1]+(doorHeight/2), doorWidth/2, doorHeight/2, pattern, rot);
        rot += .05;
    }
  }, 100);

  context.restore();
}

function drawBackground(){
  context.save();
  context.shadowBlur = 0;
  context.shadowColor = null;
  context.strokeStyle = null;

  for (var w = 0; w < canvas.width; w += img.width /2){
    for (var h=0; h< canvas.height; h += img.height /2)
      context.drawImage(img,w,h);
  }
  redrawDoors();
  context.restore();
};

var img = new Image();
img.src = 'images/dungeon-wall-texture-seamless.png';
img.onload = function(){drawBackground();redrawHud("Welcome to Everybody dies","8",level);};

var doorImage = new Image();
doorImage.src = 'images/trans_door.png';
//doorImage.onload = redrawDoors;

// function doorHoverHandler(e){
//   var x = e.pageX;
//   var y = e.pageY;
//
//   for (var i=0; i<doors.length; i++){
//     var xLeft = doors[i][0];
//     var xRight = doors[i][0] + doors[i][2];
//
//     var yTop = doors[i][1];
//     var yBottom = doors[i][1] + doors[i][3];
//
//     if (x >= xLeft && x <= xRight && y >= yTop && y <= yBottom){
//       clearInterval(doorOpenAnimation);
//
//       //redrawDoors();
//       context.save();
//       //context.shadowBlur = 10;
//       //context.shadowColor = "#FF0000";
//
//       //context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
//       context.restore();
//     }
//   }
// }

function doorClickHandler(e){
  var x = e.pageX;
  var y = e.pageY;

  for (var i=0; i<doors.length; i++){
    var xLeft = doors[i][0];
    var xRight = doors[i][0] + doors[i][2];

    var yTop = doors[i][1];
    var yBottom = doors[i][1] + doors[i][3];

    if (x >= xLeft && x <= xRight && y >= yTop && y <= yBottom){
      clickedDoor = i;
      context.save();


      var doorAnimationInterval = 1;
      doorOpenAnimation = setInterval(function(){
        var choiceImage = new Image();

        choiceImage.src = deathImages[0];

        if (correctDoor == clickedDoor) {
            choiceImage.src = victoryImage;
        }

        doorAnimationInterval = doorAnimationInterval*1.1;

        context.shadowBlur = 10;
        context.shadowColor = correctDoor == clickedDoor ? "#0000FF" : "#FF0000";
        context.strokeStyle = correctDoor == clickedDoor ? "#0000FF" : "#FF0000";
        context.drawImage(choiceImage, doors[clickedDoor][0]-doorAnimationInterval, doors[clickedDoor][1]-doorAnimationInterval, doors[clickedDoor][2]+doorAnimationInterval*2, doors[clickedDoor][3]+doorAnimationInterval*2);

        context.strokeRect(doors[clickedDoor][0]-doorAnimationInterval, doors[clickedDoor][1]-doorAnimationInterval, doors[clickedDoor][2]+doorAnimationInterval*2, doors[clickedDoor][3]+doorAnimationInterval*2);

        if (doorAnimationInterval >= 2000) {
          var message;
          clearInterval(doorOpenAnimation);
          clearInterval(drawPuzzles);
          if (correctDoor == clickedDoor) {
            level++;

            message = liveMessages[Math.floor(Math.random() * 5)];
          }
          else
          {
            message = deathMessages[Math.floor(Math.random() * 6)];
            remainingPlayers --;
          }
          doorAnimationInterval = 1;
          //context.restore();
          


          correctDoor = Math.floor(Math.random() * 2);
          drawBackground();


          redrawHud(message,level);
        }
      },5);
    }

  }
}

function drawPuzzle(cx, cy, width, height, pattern, rot){
  var nbr_circles = pattern.length;
  var lg_rad = (width/2) * .85;
  var lg_circ = 2*Math.PI*lg_rad;
  var sm_rad = (lg_circ / nbr_circles) / 2;

  for (var i = 1; i <= nbr_circles; ++i) {
    context.strokeStyle = '#000';
    context.shadowBlur = 5;
    context.shadowColor = "#000";

    context.fillStyle = pattern[i-1];
    context.beginPath();
    var angle = (i*2*Math.PI/nbr_circles) + rot;
    var x = cx + Math.cos(angle) * lg_rad;
    var y = cy + Math.sin(angle) * lg_rad;
    context.arc(x, y, sm_rad, 0, 2*Math.PI, false);
    context.fill();
    context.closePath();
  }
}

function redrawHud(message, level){
 context.save();

 context.font = '25pt Calibri';
 context.fillStyle = 'yellow';
 context.fillText(message, 100, 40);

 context.fillText("Level : " + level.toString(), 40, 700);

 context.fillText("Remaining Players : "+ remainingPlayers, 1000, 40);
 context.restore();
}
