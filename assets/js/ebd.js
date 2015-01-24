
var width = $(document).width();
var height = $(document).height();

$('gameArea').width(width);
$('gameArea').height(height);
var canvas = document.getElementById('gameArea');
var context = canvas.getContext('2d');

context.fillRect(0,0,width,height);
