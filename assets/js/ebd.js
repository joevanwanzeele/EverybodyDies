
var width = window.innerWidth;
var height = window.innerHeight;

var canvas = document.getElementById('gameArea');
canvas.width = width;
canvas.height = height;

var context = canvas.getContext('2d');

var startingPos = (width - 550)/2;
var doors = [[startingPos,100,150,300], [startingPos+200,100,150,300], [startingPos+400,100,150,300]]

redrawDoors();



$('#gameArea').mousemove(doorHoverHandler);

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
      context.shadowBlur = 20;
      context.shadowColor = "#FF0000";

      context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
    }
  }
}
