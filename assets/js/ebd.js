
var width = window.innerWidth;
var height = window.innerHeight;



$('gameArea').width(width);
$('gameArea').height(height);
var canvas = document.getElementById('gameArea');
canvas.width = width;
canvas.height = height;

var context = canvas.getContext('2d');

context.fillRect(0,0,width,height);

context.strokeStyle="#FF0000";


var startingPos = (width - 550)/2;
var doors = [[startingPos,100,150,300], [startingPos+200,100,150,300], [startingPos+400,100,150,300]]

for (var i = 0; i<doors.length; i++){
    context.strokeRect(doors[i][0], doors[i][1], doors[i][2], doors[i][3]);
}
