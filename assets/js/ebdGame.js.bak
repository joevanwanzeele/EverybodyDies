var ebdGame = 
{
	
    "self": this,
	"Start": function () {
		self.Sounds=["suspense.mp3","Jumpscare1.wav","Jumpscare2.wav","Foostep_Tile_Fadeout.wav","unlock.wav"];
		self.Doors=[0,1,2]; //Netural, treasure, bad
		self.LevelTimeRemaining = 10;
		

		self.SoundPlayer = function (soundIdx) {
	
			var sound = new Audio();
			sound.src = '' +self.Sounds[soundIdx];
			sound.play();	
		}

		self.PlayRandom = function () {
			var sound = new Audio();
			sound.src = this.Sounds[0];
			sound.play();
		}

		self.DecTime =  function() {
			self.LevelTimeRemaining--;
			console.log(self.LevelTimeRemaining);

			if (self.LevelTimeRemaining==5) {
				self.SoundPlayer(3)
			}
			if  (self.LevelTimeRemaining==0) {
				console.log("GAME OVER!");
				
				clearInterval(self.GameTimer);
				self.SoundPlayer(2);
			}
		}
		
		self.ChooseDoor = function (doorIdx) {
			self.SoundPlayer(4);
		}

		self.GameTimer = setInterval(self.DecTime, 1500);
	}
} 

ebdGame.Start();
