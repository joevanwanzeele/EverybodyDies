var ebdGameClass = function() 
{
	
    var that = this;

	that.Start= function () {
		that.Sounds=["suspense.mp3","Jumpscare1.wav","Jumpscare2.wav","unlock.wav"];
		that.Ambient = ["Foostep_Tile_Fadeout.wav"];
		
		that.LevelTimeRemaining = 10;
		that.GameTimer = setInterval(that.DecTime, 1500);
		that.PlayMusic();

     }
		that.SoundPlayer = function (soundIdx) {
	
			var sound = new Audio();
			sound.src = '' +that.Sounds[soundIdx];
			sound.play();	
		}

		that.PlayRandom = function () {
		
			var sound = new Audio();
			sound.src = this.Sounds[Math.floor(Math.random() * that.Sounds.length-1)];
			sound.play();
		}

		that.DecTime =  function() {

			that.LevelTimeRemaining--;

			if (that.LevelTimeRemaining==5) {
				that.PlayAmbient();
			}

			if  (that.LevelTimeRemaining==0) {
				console.log("GAME OVER!");
				
				clearInterval(that.GameTimer);
				that.SoundPlayer(2);
				
				that.AmbientPlayer.loop ="";
			}
			
		}
		
		that.ChooseDoor = function (doorIdx) {
			that.SoundPlayer(4);
		}

		that.PlayMusic = function() {
			that.Music = new Audio();
			that.Music.src = "Everybody_Dies_Loop.wav";
			that.Music.loop = "loop";
			that.Music.play();
		}
		
		that.PlayAmbient = function () {
			that.AmbientPlayer = new Audio();
			var idx = Math.floor(Math.random() * that.Ambient.length) ;
			console.log(idx);
			that.AmbientPlayer.src = that.Ambient[idx];
			that.AmbientPlayer.loop = "loop";
			
			that.AmbientPlayer.play();
		}

		return that;

	
} 

var ebdGame = ebdGameClass();
