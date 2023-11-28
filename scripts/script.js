"use strict";
 //incorporating this 'expression' tells the browser to enable 'strict mode' - this mode helps ensure you write better code, for example, it prevents the use of undeclared variables.


//task 1 --------------
//task 1.1 - download and setup the starter code (this project) from GitHub to a suitable (and remembered) location
//task 1.2 - open the project (from its location) using a suitable editor (e.g., vscode or replit, etc)
//task 1.3 - generally review the html and css code/files (for quick reference; should be fairly clear based on work done to date) 
//task 1.4 - review the js code to help ensure you understand what each line is and does (recapped from the earlier group review to help reenforce your own learning and understanding)
//task 1.5 - reflect on the terms 'abstraction' and 'decomposition' and create a general flow diagram (covered in week 1) to illustrate the codebase use of sequence, conditional (branching), looping (iteration) and function; ideally on paper – awareness of this will be highly useful as you progress through the week

//task 2 -------------- use the ideas of 'abstraction' and 'decomposition' when reflecting on the challenges of the following tasks 
//task 2.1 - open and check the project (in this case the 'index.html' file) using the preferred browser, i.e., Chrome
//task 2.2 - implement the paint functions and debug any issue/s found; as suggested (in the brief) you will need to enable the developer tools – n.b., there are likely several layers of different problems; useful note: you can ignore any 'AudioContext' warning for the time being as we will discuss this later - however, in interested now please ask :)
//task 2.3 - expand the paint_assets function so that it draws a rectangle utilising the get_random function to position it dynamically at random positions within the defined canvas; start your research by searching “js random numbers”.  Once you developed and tested your ‘get_random’ function you will likely need to research (or recall) how to draw a rectangle with the p5 library; start your research by searching “p5 draw rectangle” - to complete this task you will likely need to combine your research and test your ideas
//task 2.4 - update the paint_background function so that the colour format uses 'integer' rgb values rather than 'hex'; start your research by searching "p5 set background color" *note ‘us’ spelling although it shouldn't make too much of a difference research-wise!

//task 3 (extended challenge) --------------
//task 3.1 - expand your 2.3 task so that your rectangle changes colour during each frame update; reflect on what you have done so far and consider and test ways this could be achieved and implemented as simply as possible 
//task 3.2 - continue to expand your 2.3 (and now 3.1) task so that your rectangle cycles through all shades of the same colour (e.g., from the darkest to the lightest shade); reflect on what you have already completed and consider and test ways this could be achieved and implemented as simply as possible; for your recall and ease of reference, colour values start from 00 (darkest, i.e., no white added) to FF (lightest, i.e., full white added) in hex or 00 - 255 in decimal



const vp_width = 1000, vp_height = 900; //defined global const variables to hold the (vp) details (e.g., size, etc.)
var engine, world, body; //defined global variables to hold the game's viewport and the 'matter' engine components
var viewport;
let bowser = null;
let mColour = "#ff0000";
const winFeatures = new Titles();
const interactable = 0x0001;
let isMenuActive = true;
let insideLadder = false;
//object for the background

const environment = {
	constructor() {
		this._gameStarted = false;
	},
	set gameStarted(bool) {
		this._gameStarted = bool;
	},

	get gameStarted () {
		return this._gameStarted;
	},

	displayScore() {

		textStyle(BOLD)
		fill('#D3D3D3')
		textSize(23);
		text("Score: " + winFeatures.score, 700, 40)//INCLUDE WITHIN THE PAINT ASSESTS FUNCTION 
	
	},
	displayTime() {
		textStyle(BOLD)
		fill('#D3D3D3')
		textSize(23);
		text("Time: " + winFeatures.time, 700, 70)

	},	
	paint_background() {
		background(0,0,35,90);
		const galaxy = { 
			locationX : random(width),
			locationY : random(height),
			size : random(1,6)
		}
		fill("white")
		ellipse(galaxy.locationX ,galaxy.locationY, galaxy.size, galaxy.size);

		this.displayScore();
		this.displayTime()
		displayPlatform(platformList)
		displayLadderList(ladderList)
		displayWalls()
	}
}


/*
EnvObj is now WorldBodyStructure!
class Platform extends EnvObj {
	constructor(x, y, width, height, angle = 0) {
		super(x, y, width, height);
		//.boundary = Matter.Bodies.rectangle(x, y, width, height, {isStatic: true});
		let options = {
			isStatic: true,
			restitution: 0.39,
			friction: 0,
			angle: angle
		}
		this.body = Matter.Bodies.rectangle(x, y, width, height, options);
		Matter.World.add(world, this.body);
	}
	show() {
		push();
		angleMode(RADIANS)
		translate(this.width / 2, this.height / 2)
		rotate(this.body.angle)
		fill('#00ff00'); //set tXhe fill colour
		noStroke();
		rectMode(CENTER)
		rect(this.x, this.y, this.width, this.height); //draw the rectangle
		pop();
	}	
}
*/


function preload() {
	//a 'p5' defined function runs automatically and used to handle asynchronous loading of external files in a blocking way; once complete
	//the 'setup' function is called (automatically)
}

function setup() {
	//a 'p5' defined function runs automatically once the preload function is complete
	viewport = createCanvas(vp_width, vp_height); //set the viewport (canvas) size
	viewport.parent("viewport_container"); //attach the created canvas to the target div
	//enable the matter engine
	engine = Matter.Engine.create(); //the 'engine' is a controller that manages updating the 'simulation' of the world
	world = engine.world; //the instance of the world (contains all bodies, constraints, etc) to be simulated by the engine
	body = Matter.Body; //the module that contains all 'matter' methods for creating and manipulating 'body' models a 'matter' body 
	//is a 'rigid' body that can be simulated by the Matter.Engine; generally defined as rectangles, circles and other polygons)
	// Matter.Engine.run(engine);

	frameRate(60); //specifies the number of (refresh) frames displayed every second
	background("#964B00")
	marioMovement = new Keys();
	platformWin = new Platform(417, 75, 115, 18, 0, "platformladderbeamwin")
	platform1 = [new Platform(408, 180, 645, 15, 0.015, "platform1"), new Platform(762, 185.7, 62, 15, 0.015, "platformladderbeam1"), new Platform(808, 186.5, 30, 15, 0.015, "platformend1")];	
	platform2 = [new Platform(185, 335, 40, 15, -0.012, "platformstart2"), new Platform(234, 334, 60, 15, -0.012, "platformladderbeam2"), new Platform(587, 330, 645, 15, -0.012, "platform2")]
	platform3 = [new Platform(408, 460, 645, 15, 0.012, "platform3"), new Platform(762, 464.7, 62, 15, 0.012, "platformladderbeam3"), new Platform(808, 465, 30, 15, 0.012, "platformend3")];	
	platform4 = [new Platform(185, 595, 40, 15, -0.012, "platformstart2"), new Platform(234, 594, 60, 15, -0.012, "platformladderbeam4"), new Platform(587, 590, 645, 15, -0.012, "platform4")]
	platform5 = [new Platform(408, 730, 645, 15, 0.012, "platform5"), new Platform(762, 734.7, 62, 15, 0.012, "platformladderbeam5"), new Platform(808, 735, 30, 15, 0.012, "platformend5")];
	ground = new Platform(538, 885, 745, 45, -0.02, "platformground");
	platformList = [platform1, platform2, platform3, platform4, platform5, platformWin, ground]
	rightWall = new Barrier(vp_width / 100 * 97, vp_height / 2, vp_width / 100 * 12, vp_height, "rightwall");
	leftWall = new Barrier(0, vp_height / 2, vp_width / 100 * 17, vp_height, "leftwall")
	walls = [rightWall, leftWall]
	//bowser = new Bowser(vp_width / 100 * 47, 171, vp_width / 100 * 2.3, "bowser")
	princessPeach = new PrincessPeach(380, 40, 40, "princesspeach")
	ladderWin = new Ladders(440, 123, 55, 100, "ladderwin")
	ladder1 = new Ladders(762, 253, 16, 135, "ladder1")
	ladder2 = new Ladders(235, 393, 16, 115, "ladder2")
	ladder3 = new Ladders(762, 523, 16, 115, "ladder3")
	ladder4 = new Ladders(235, 657, 16, 125, "ladder4")
	ladder5 = new Ladders(762, 797, 16, 123, "ladder5")
	//mario = new c_player(vp_width / 100 * 20, vp_height/100 * 90, 40, 40, "mario");
	mario = new Player(340, 835, 30, 30, "mario");
	dk = new Standstill( 130, 138, 40, 40);
		
	ladderList = [ladder1, ladder2, ladder3, ladder4, ladder5, ladderWin];
	


	Matter.Events.on(engine, 'collisionEnd', collisions)
	Matter.Events.on(engine, 'collisionStart', initialCollisions)
	

	
	
	/*
	Previous design for the platforms :(

	const row1 = [(new Platform(vp_width / 100 * 3, 170, vp_width / 100 * 50, vp_height / 100 * 2, 0))], (new Platform(vp_width / 100 * 53, 153.75, vp_width / 100 * 35, vp_height / 100 * 2, 0.025))];  
	const row2 = [(new Platform(vp_width -(vp_width / 100 * 88.5), 318, vp_width / 100 * 29, vp_height / 100 * 2, -0.010)), (new Platform(vp_width -(vp_width / 100 * 60.5), 315.5, vp_width / 100 * 29, vp_height / 100 * 2, -0.005)), (new Platform(vp_width - (vp_width / 100 * 32), 325, vp_width / 100 * 29, vp_height / 100 * 2, -0.015))];
	const row3 = [(new Platform(vp_width / 100 * 3, 465, vp_width / 100 * 29, vp_height / 100 * 2, 0.04)), (new Platform(vp_width -(vp_width / 100 * 68.25), 465, vp_width / 100 * 29, vp_height / 100 * 2, 0.04)), (new Platform(vp_width -(vp_width / 100 * 39.25), 465, vp_width / 100 * 29, vp_height / 100 * 2, 0.04))]
	const row4 = [(new Platform(vp_width -(vp_width / 100 * 89.5), 647.5, vp_width / 100 * 29, vp_height / 100 * 2, -0.010)), (new Platform(vp_width -(vp_width / 100 * 60.5), 645, vp_width / 100 * 29, vp_height / 100 * 2, -0.005)), (new Platform(vp_width - (vp_width / 100 * 32), 655, vp_width / 100 * 29, vp_height / 100 * 2, -0.015))];
	const row5 = [(new Platform(vp_width / 100 * 3, 800, vp_width / 100 * 29, vp_height / 100 * 2, 0.01)), (new Platform(vp_width -(vp_width / 100 * 68.25), 800, vp_width / 100 * 29, vp_height / 100 * 2, 0.01)), (new Platform(vp_width -(vp_width / 100 * 39.25), 800, vp_width / 100 * 29, vp_height / 100 * 2, 0.01))]
	*/

}

function initialCollisions(event) {
	//runs as part of the matter engine after the engine update, provides access to a list of all pairs that have ended collision in the current frame (if any)
	event.pairs.forEach((collide) => { //event.pairs[0].bodyA.label

		if(
			(collide.bodyA.label == "mario" && collide.bodyB.label == "princesspeach") ||
			(collide.bodyA.label == "princesspeach" && collide.bodyB.label == "mario")
		) {

			winFeatures.scoreOrTimeEditor(new ValueForFeature(800));
			gameMenu.gameEnd(true);

		}	 
	
		if(
			(collide.bodyA.label === "mario" && collide.bodyB.label.slice(0,6) === "ladder") ||
			(collide.bodyA.label.slice(0,6) === "ladder" && collide.bodyB.label === "mario")
		) {
			if (collide.bodyA.label.slice(0,6) == "ladder") {

				ladderConfirmation(collide.bodyA.label.slice(6))

			} else {

				ladderConfirmation(collide.bodyB.label.slice(6)) 

			}
			mario.ladderCollision = true;
						
		};
		

		if(
			(collide.bodyA.label == "mario" && collide.bodyB.label.slice(0, 18) == "platformladderbeam") ||
			(collide.bodyA.label.slice(0,18) == "platformladderbeam" && collide.bodyB.label == "mario")
		) {
			if (collide.bodyA.label.slice(0,18) == "platformladderbeam") {
				removePlatform(collide.bodyA.label.slice(18))

			} else {
				removePlatform(collide.bodyB.label.slice(18))
			}
		};


		if(
			(collide.bodyA.label == "mario" && collide.bodyB.label.slice(0, 4) == "ball") ||
			(collide.bodyA.label.slice(0, 4) == "ball" && collide.bodyB.label == "mario")
		) {
			gameMenu.gameEnd(false)					
		};
		if(
			(collide.bodyA.label == "mario" && collide.bodyB.label == "villain") ||
			(collide.bodyA.label == "villain" && collide.bodyB.label == "mario")
		) {
			gameMenu.gameEnd(false)					
		};

		if(
			(collide.bodyA.label == "mario" && collide.bodyB.label.slice(0, 8) == "platform") ||
			(collide.bodyA.label.slice(0,8) == "platform" && collide.bodyB.label == "mario")
		) {
			if (collide.bodyA.label.slice(0,8) == "platform") {
				const platform = collide.bodyA;
				const index = platform.label.slice(18)? 
					platform.label.slice(18) : 
					false;
				index? console.log("will Fly") :  console.log("sparks")	  
				platform.label.slice(0,18) === "platformladderbeam"?
					marioMovement.ladderFunctionality(index):
					marioMovement.ladderFunctionality(index);
			} else {
				const platform = collide.bodyB;
				const index = platform.label.slice(18)? 
					platform.label.slice(18) : 
					false; 
				if(index === false) console.log("sparks")
				platform.label.slice(0,18) === "platformladderbeam"?
				marioMovement.ladderFunctionality(index) :
				marioMovement.ladderFunctionality(index)

			}	
		};

	})	

}

function collisions(event) {
	//runs as part of the matter engine after the engine update, provides access to a list of all pairs that have ended collision in the current frame (if any)
	event.pairs.forEach((collide) => { //event.pairs[0].bodyA.label
	
		if(
			(collide.bodyA.label.slice(0, 4) == "ball" && collide.bodyB.label.includes("wall") ||
			(collide.bodyA.label.includes("wall") && collide.bodyB.label.slice(0, 4) == "ball"))
		) {
			let ballNumber = null;
			let collisionWall = null;
			if (collide.bodyA.label.slice(0, 4) === "ball") {
				ballNumber = collide.bodyA.label.slice(4);
				collisionWall = collide.bodyB.label;
				//see balls.js
				ballCollisionWall(ballNumber, collisionWall)
			} else {			
				ballNumber = collide.bodyB.label.slice(4);
				collisionWall = collide.bodyA.label;
				ballCollisionWall(ballNumber, collisionWall)
			}

		}

		if(
			(collide.bodyA.label == "mario" && collide.bodyB.label.slice(0,6) == "ladder") ||
			(collide.bodyA.label.slice(0,6) == "ladder" && collide.bodyB.label == "mario")
		) {
			if (collide.bodyA.label.slice(0,6) == "ladder") {

				ladderConfirmation(collide.bodyA.label.slice(6), false)

			} else {
				ladderConfirmation(collide.bodyB.label.slice(6), false) 

			}
			marioMovement.disableLadderFunctionality()
		}
	});
}

function marioColourMenuElements (element) {
	const yellowMario = document.getElementById("yellow")
	const whiteMario = document.getElementById("white")
	const redMario = document.getElementById("red")
	const colours = [yellowMario, whiteMario, redMario]
	colours.forEach(item => {
		if (item.id === element) {
			item.style.fontWeight = "bold";
			item.style.fontSize = "1.6rem";

		} else {
			item.style.fontWeight = "normal";
			item.style.fontSize = "1.2rem";
		}
	})
	mColour = element;
}

function marioColour (e) {
	switch(e.target.id) {
		case "yellow":
			marioColourMenuElements("yellow");
			break;
		case "white":
			marioColourMenuElements("white")
			break;
		case "red":
			marioColourMenuElements("red")	
	}
}


function keyPressed() {                            //PUT KEYPRESSES FUCNTION AFTER SETUP FUNCTION, DO NOT PUT WITHIN DRAW FUNCTION
	if (keyCode === 32 && canjump == true) {
		mario.space()
		canjump = false
		setTimeout(
			()=>{
				canjump = true //Creating a timeout so the block can only jump once ever seconf
				mario.body.angle = 0;
			},1000
		)
	}	
}


function start () {
	balls.push(new Ball(50, 10, 30, "ball1"))
	isMenuActive = false;
	winFeatures.scoreOrTimeEditor(new ValueForFeature());
	winFeatures.scoreOrTimeEditor(new ValueForFeature(0, "time"));
	setup();
	mario.colour = mColour;
	if (balls.length > 0) {
		removeAllBalls(balls);
	}
	setTimeout(() => {
		mario.gameStarted = true;
		Matter.World.add(world, mario.body)
		environment.gameStarted = true;
	}, 1000)
	
	//html amendments
	gameMenu.pauseButton.style.display = "flex";
	gameMenu.menu = "none";
	gameMenu.oldMenuCleanse();


}

setInterval(() => {
	if (!isMenuActive) {
		winFeatures.scoreOrTimeEditor(new ValueForFeature(1, "time"))
	}	
}, 1200)


function draw() {
	//a 'p5' defined function that runs automatically and continously (up to your system's hardware/os limit) and based on any specified frame rate
	environment.paint_background();
	//bowser.show()
	//mario.body.angle = 0;
	
	if(marioMovement) marioMovement.characterMovementDetector(mario.ladderCollision);

	//checks if mario fell of the map!
	mario.offMap()
	gameMenu.displayGameResumingText()
	displayPlayers()
	displayBalls();

    //the engine for the game will only run when is active is false
	if(!isMenuActive){
		//see balls.js
		Matter.Engine.update(engine);
	}else{

	}
} 
