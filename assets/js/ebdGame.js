var ebdGameClass = function() 
{
	
    var that = this;

	that.Start= function () {
		that.Sounds=["suspense.mp3","Jumpscare1.wav","Jumpscare2.wav","unlock.wav","BoneBreaking.wav","squish.wav","squeeze.wav","LazerCatSound.wav"];
		that.Ambient = ["Foostep_Tile_Fadeout.wav"];
		that.WinSounds = ["cheer1.mp3", "cheer2.mp3", "cheer3.mp3"]
		that.LevelTimeRemaining = 10;
		//that.GameTimer = setInterval(that.DecTime, 1500);
		that.PlayMusic();

     }
		that.SoundPlayer = function (soundIdx) {
	
			var sound = new Audio();
			sound.src = '' +that.Sounds[soundIdx];
			sound.play();	
		}

		that.PlayRandom = function () {
		console.log("in play random");
			var sound = new Audio();
			sound.src = this.Sounds[Math.floor(Math.random() * that.Sounds.length)];
			sound.play();
		}

		that.PlayRandomWin = function () {
		
			var sound = new Audio();
			var idx = [Math.floor(Math.random() * that.WinSounds.length)];
console.log("in play random win " + idx);
			sound.src = this.WinSounds[idx];

			sound.play();
		}

		that.DecTime =  function() {

			that.LevelTimeRemaining--;

			/*if (that.LevelTimeRemaining==5) {
				that.PlayAmbient();
			}
			
			if  (that.LevelTimeRemaining==0) {
				console.log("GAME OVER!");
				
				clearInterval(that.GameTimer);
				that.SoundPlayer(2);
				
				that.AmbientPlayer.loop ="";
			}
			*/
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
			//that.AmbientPlayer.loop = "loop";
			
			that.AmbientPlayer.play();
		}

		return that;

	
} 

var ebdGame = ebdGameClass();
ebdGame.Start();
