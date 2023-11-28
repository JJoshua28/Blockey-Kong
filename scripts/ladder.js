let ladderWin = null;
let ladder1 = null;
let ladder2 = null;
let ladder3 = null;
let ladder4 = null;
let ladder5 = null;

let ladderList = [];


class Ladders extends WorldBodyStructure{
	constructor(x, y, width, height, label) {
        super(x, y, width, height)
		let options = {
			isStatic: true,
			isSensor: true,
			restitution: 0,
			friction: 0,
			density: 1,
			label,
			collisionFilter: {
				category: 0x0008
			}
		}
		//create the body
		this.sensor = Matter.Bodies.rectangle(x, y, width, height, options);
		Matter.World.add(world, this.sensor); //add to the matter world
		this.addedToScore = false;
		this.pos = this.sensor.position;
	}
	increaseScore () {
		if(!this.addedToScore) {
			winFeatures.scoreOrTimeEditor (new ValueForFeature(200));
			this.addedToScore = true;
		}
	}

	ladderSteps () {
		if (this.sensor.label.slice(6) === "win") {
			for (let i = 40; i > -50; i = i -30) {
				rectMode(CENTER); 
				fill('#D3D3D3'); 
				rect(this.pos.x, this.pos.y + i, 32, this.height / 8); //draw the rectangle
			}
		} else {
			for (let i = 40; i >= -50; i = i -30) {
				rectMode(CENTER); 
				fill('#D3D3D3'); 
				rect(this.pos.x, this.pos.y + i, 32, this.height / 8); //draw the rectangle
			}
		} 
	}

	ladderRails () {
		
		for (let i = 0; i < 2; i++) {
			rectMode(CENTER); 
			fill('#D3D3D3'); 
			switch (i) {
				case 0: 
					rect(this.pos.x - 23, this.pos.y, 15, this.height);
					break;
				case 1: 
					rect(this.pos.x + 23, this.pos.y, 15, this.height);
					break;

			}	
		} 
	}
	

	show() {
		this.ladderRails()
		this.ladderSteps()
	}

		
}

function displayLadderList (arr) {
    arr.forEach(element => {
        element.show();
    });
}

