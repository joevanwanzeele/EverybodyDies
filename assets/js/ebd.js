
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

function redrawDoors(){
  context.fillRect(0,0,width,height);

  context.strokeStyle="#FF0000";

  for (var i = 0; i<doors.length; i++){
      context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
  }
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
      redrawDoors();
      context.shadowBlur = 10;
      context.shadowColor = "#FF0000";

      context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
    }
  }
}

function doorClickHandler(e){
  var x = e.pageX;
  var y = e.pageY;

  for (var i=0; i<doors.length; i++){
    var xLeft = doors[i][0];
    var xRight = doors[i][0] + doors[i][2];

    var yTop = doors[i][1];
    var yBottom = doors[i][1] + doors[i][3];

    if (x >= xLeft && x <= xRight && y >= yTop && y <= yBottom){
      //redrawDoors();
      context.shadowBlur = 10;
      context.shadowColor = "#FF0000";
      var j = 0;
      setInterval(function(){
        context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
      },500);
      return;
    }
  }
}
