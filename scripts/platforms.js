let platform1 = null;
let platform2 = null;
let platform3 = null;
let platform4 = null;
let platform5 = null;
let platformWin = null;
let ground = null;
let platformList = null;

class Platform extends WorldBodyStructure{
	constructor(x, y, width, height, angle, label, colour = "#37AE0F") {
		super(x, y, width, height)
		let options = {
			isStatic: true,
			restitution: 0.99,
			friction: 0.0,
			density: 0.99,
			frictionAir: 0.032,
            angle: angle,
			label: label,
		}
		//create the body
		if (label.slice(0, 18) == "platformladderbeam") {
			this.body = Matter.Bodies.rectangle(x, y - 4, width, height / 2, options);
		} else {
			this.body = Matter.Bodies.rectangle(x, y, width, height, options);
		}	
		Matter.World.add(world, this.body); //add to the matter world
		this.removeBody = false;
		this.colour = colour;
		
		options = {
			isStatic: true,
			isSensor: true,
			label: label,
			angle: angle,
			collisionFilter: { mask: interactable}
		}

		this.sensor = Matter.Bodies.rectangle(x,y,width,height,options);
		Matter.World.add(world, this.sensor)
	}
	//dont forget bodies are added to the matter world meaning even if not visible the physics engine still manages it
	remove() {
		if(this.removeBody) {
			Matter.World.remove(world, this.body);
			Matter.Body.applyForce(mario.body, mario.body.position, {x: 0, y:3})

			setTimeout(()=> {
				this.addBody()
			}, 350)
		}	
	}
	addBody () {
		Matter.World.add(world, this.body)
	}


	show() {
		Matter.Body.setPosition(this.sensor, this.body.position)
		let pos = this.body.position; //create an shortcut alias 
		let angle = this.body.angle;


		push(); //p5 translation 
		noStroke();
			fill(this.colour);
			rectMode(CENTER); //switch centre to be centre rather than left, top
		if (this.body.label.slice(0, 18) == "platformladderbeam") {
			noStroke();
			fill(this.colour);
			rectMode(CENTER); 
			translate(pos.x, pos.y + 3.6);
			rotate(angle);			
			rect(0, 0, this.width, this.height);
		} else {
			noStroke()
			translate(pos.x, pos.y);
			rotate(angle);
			rect(0, 0, this.width, this.height);				
		}	
		pop();
	}
}

//determines which platform can have its body removed upon contact with Mario 
function ladderConfirmation (label, bool = true) {
	switch(label) {
		case "1":
			platformList[0][1].removeBody = bool;
			break;
		case "2":
			platformList[1][1].removeBody = bool;
			break;
		case "3":
			platformList[2][1].removeBody = bool;
			break;
		case "4":
			platformList[3][1].removeBody = bool;
			break;
		case "5":
			platformList[4][1].removeBody = bool;
			break;
		default:
			platformList[5].removeBody = bool;	
	}
}

//determines which platforms body gets removed upon contact
function removePlatform(labelId) {
	switch(labelId) {
		case "1":
			platformList[0][1].remove();
			ladderList[0].increaseScore()
			break;
		case "2":
			ladderList[1].increaseScore()
			platformList[1][1].remove();
			break;
		case "3":
			ladderList[2].increaseScore()
			platformList[2][1].remove();
			break;
		case "4":
			ladderList[3].increaseScore()
			platformList[3][1].remove();
			break;
		case "5":
			ladderList[4].increaseScore()
			platformList[4][1].remove();
			break;
		default:
			ladderList[5].increaseScore()
			platformList[5].remove();
	}

}

//displays the p5 body for all platforms 
function displayPlatform (arr) {
	arr.forEach(element => {
		if(Array.isArray(element)) {
			element.forEach(arr2=> {
				arr2.show()
			})
		} else {
			element.show()
		}
	});
}
