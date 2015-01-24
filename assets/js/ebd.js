var level = 0;
var correctDoor = Math.floor(Math.random() * 2);
var doorOpenAnimation;

var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById('gameArea');
canvas.width = width;
canvas.height = height;


var context = canvas.getContext('2d');
var doorWidth = 250;
var doorHeight = 450;
var doorSpacing = 70;

var startingPos = (width - ((doorWidth * 3) + (doorSpacing * 2)))/2;
var doors = [[startingPos,100,doorWidth,doorHeight],
  [startingPos + (doorWidth + doorSpacing),100,doorWidth,doorHeight],
  [startingPos+ (doorWidth * 2 + doorSpacing * 2),100,doorWidth,doorHeight]];

redrawDoors();

$('#gameArea').mousemove(doorHoverHandler);
$('#gameArea').click(doorClickHandler);

function redrawDoors(doorIndex){
  context.fillRect(0,0,width,height);
  context.save();
  context.strokeStyle="#FF0000";

  if (doorIndex != null){
    context.strokeRect(doors[doorIndex][0], doors[doorIndex][1], doors[doorIndex][2], doors[doorIndex][3]);
  }
  else{
    for (var i = 0; i<doors.length; i++){
        context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
        var pattern = i == correctDoor ? puzzles[level][1] : puzzles[level][0];
        drawPuzzle(doors[i][0]+(doorWidth/2), doors[i][1]+(doorHeight/2), doorWidth/2, doorHeight/2, pattern);
    }
  }
  context.restore();
}

function doorHoverHandler(e){
  var x = e.pageX;
  var y = e.pageY;

  for (var i=0; i<doors.length; i++){
    var xLeft = doors[i][0];
    var xRight = doors[i][0] + doors[i][2];

    var yTop = doors[i][1];
    var yBottom = doors[i][1] + doors[i][3];

    if (x >= xLeft && x <= xRight && y >= yTop && y <= yBottom){
      clearInterval(doorOpenAnimation);
      redrawDoors();
      context.save();
      context.shadowBlur = 10;
      context.shadowColor = "#FF0000";

      context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
      context.restore();
    }
  }
}

function doorClickHandler(e){
  var x = e.pageX;
  var y = e.pageY;
  clearInterval(doorOpenAnimation);

  for (var i=0; i<doors.length; i++){
    var xLeft = doors[i][0];
    var xRight = doors[i][0] + doors[i][2];

    var yTop = doors[i][1];
    var yBottom = doors[i][1] + doors[i][3];
    context.save();
    if (x >= xLeft && x <= xRight && y >= yTop && y <= yBottom){
      context.shadowBlur = 10;
      context.shadowColor = correctDoor == i ? "#0000FF" : "#FF0000";
      context.strokeStyle = correctDoor == i ? "#0000FF" : "#FF0000";
      if (correctDoor == 1) level++;
      var j = 1;
      //redrawDoors(i);
      doorOpenAnimation = setInterval(function(){
        j = j*1.1;
        context.strokeRect(doors[i][0]-j, doors[i][1]-j, doors[i][2]+j*2, doors[i][3]+j*2);
        if (j >= 1000) {
          clearInterval(this);
          context.restore();
          redrawDoors();
        }
      },.5);

      correctDoor = Math.floor(Math.random() * 2);
      return;
    }
  }
}

function drawPuzzle(cx, cy, width, height, fillSequence){
  //context.clearRect(x,y,width,height);
  context.save();
  var nbr_circles = fillSequence.length;

  var lg_rad = (width/2) * .85;
  var lg_circ = 2*Math.PI*lg_rad;
  var sm_rad = (lg_circ / nbr_circles) / 2;

  for (var i = 1; i <= nbr_circles; ++i) {
    context.strokeStyle = '#000';
    context.shadowBlur = 0;
    context.shadowColor = "#000";

    context.fillStyle = fillSequence[i-1];
    context.beginPath();
    var angle = i*2*Math.PI/nbr_circles;
    var x = cx + Math.cos(angle) * lg_rad;
    var y = cy + Math.sin(angle) * lg_rad;
    context.arc(x, y, sm_rad, 0, 2*Math.PI, false);
    context.fill();
  }
  context.restore();
}
