//INCLUDE THE FOLLOWING VARIABLES RIGHT AT THE START OF THE CODE

let mario;
let canjump = true;

let dk;
let dId;



const DIR_LEFT = -1;
const DIR_NONE = 0;
const DIR_RIGHT = 1;
var direction = DIR_NONE;



//include th c_player class and the standstill class anywhere -----SOME COORDINATES IN THE STANDSTILL CLASS MAY NEED TO BE CHANGES
class Player extends WorldBodyStructure {
	constructor(x, y, width, height, label) { //Sets the object qualities
		super(x, y, width, height)
		let options = {
			isStatic: false,
			restitution: 0,
			friction: 0.3,
			density: 0.09,
			label: label,
			collisionFilter: {
				category: 0x0008,
				mask: 0x0009
			}
		}
		//create the body
		this.body = Matter.Bodies.rectangle(x, y, width, height, options);
		 //add to the matter world
		
		
		this.jumpheight = 23;
		this.jumped = false;
		this._ladderCollision = false;
		this.options = options;
		this.colour = '#ff0000';
		this.gameStarted = false;
	}
	get ladderCollision () {
		return this._ladderCollision;
	}

	set ladderCollision (bool) {
		this._ladderCollision = bool;
	}

	left() {
		Matter.Body.setVelocity(this.body, {x: -2.5, y: this.body.velocity.y}); //Sets instructions for when left key is pressed
		mario.body.angle = 0;
	}
    //mario's
	right(){
		Matter.Body.setVelocity(this.body, {x: 2.5, y: this.body.velocity.y}); //Sets instructions for when right key is pressed
		mario.body.angle = 0;
 
	}
	//Mario's functionality when climbing up the ladder
	up() {
		Matter.Body.setVelocity(this.body, {x: 0, y: -2}); //Sets instructions for when up key is pressed
		mario.body.angle = 0;

	}
	down () {
		Matter.Body.setVelocity(this.body, {x: 0, y: 2}); //Sets instructions for when up key is pressed
		mario.body.angle = 0;

	}
    //Mario's jump functionality
	space(){
		//Matter.Body.setVelocity(this.body, {x: 0, y: -20}); //Sets instructions for when the space key is pressed
			Matter.Body.applyForce(this.body, this.body.position, {x: 0, y: -1.8});
	}

	stop(){
		
		Matter.Body.setVelocity(this.body, {x: 0, y: this.body.velocity.y}); //Stops the object from moving 

	}

	ladderCollisionStart () {
		this.options.isSensor = true;
		this.sensor = Matter.Bodies.rectangle(this.x, this.y, this.width, this.height, this.options);
		Matter.World.add(world, this.sensor)
		Matter.World.remove(world, this.body)

	}
    //checks if mario fell of the map!
	offMap () {
		if (this.body.position.y > vp_height) {
		gameMenu.gameEnd(false);
	}

	}
    //displays the protagonist (mario's) body when true. done at a set time
	show() {
		if(this.gameStarted === true) {
		//this.rotate();
		let pos = this.body.position; //create an shortcut alias 
		let angle = this.body.angle;


		push(); //p5 translation 
			stroke("#000000");
			fill(this.colour);
			rectMode(CENTER); //switch centre to be centre rather than left, top
			translate(pos.x, pos.y);
			rotate(angle);
			rect(0, 0, this.width, this.height);
		pop();
		}
	}
}

let princessPeach = null;

class PrincessPeach {
	constructor(x, y, diameter, label) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.000,
			density: 0.7,
			frictionAir: 0.001,
			label: label,
			collisionFilter: {
				category: interactable,
			}
			
		}
		this.body = Matter.Bodies.circle(x, y, diameter/2, options); //matterbody.circle(x, y, Matter.Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
		Matter.World.add(world, this.body);
		
		
		this.x = x;
		this.y = y;
		this.diameter = diameter;

	}

	body() {
		return this.body;
	}

	show() {
		fill(255, 255, 0);
        stroke(0);
		strokeWeight(2);
		ellipse(this.x, this.y, this.diameter, this.diameter);
      
        // Smile
		var startAng = .1*PI
		var endAng = .9*PI
        var smileDiam = .6*this.diameter;
        arc(this.x, this.y, smileDiam, smileDiam, startAng, endAng);
      
      // Eyes
        var offset = .2*this.diameter;
        var eyeDiam = .1*this.diameter;
        fill(0);
        ellipse(this.x-offset, this.y-offset, eyeDiam, eyeDiam);
        ellipse(this.x+offset, this.y-offset, eyeDiam, eyeDiam);
	}	
		

}

//Concecpt for score functin 
// function score(points) {
// 	let effectspeed = 60;
// 	let animatespeed = 500;

// 	$("#scoreboard").finish();
// 	document.getElementById('points').innerHTML = "+" + points;
// 	$('#scoreboard').removeAttr('style'); //remove any applied styles
// 	$("#scoreboard").fadeIn(effectspeed, function() {
// 		$("#scoreboard").animate({
// 			top: '+=50px',
// 			opacity: 0
// 		}, animatespeed);
// 	});





 //THE PLAYER AND STANDSTILL CLASSES CAN BE PUT ANYHWERE WITHIN THE CODE



class Standstill extends WorldBodyStructure {
	constructor(x, y, width, height) { //Sets the object qualities
		super(x, y, width, height)
		let options = {
			restitution: 1,
			friction: 0.3,
			density: 0.09,
			isStatic: true,
			label: "villain",
			
		}
		//create the body
		this.body = Matter.Bodies.rectangle(x, y, width, height, options);
		Matter.World.add(world, this.body); //add to the matter world
	
	}

	show() {
		//this.rotate();

		let pos = this.body.position; //create an shortcut alias 
		let angle = this.body.angle;


		push(); //p5 translation 
			stroke("#000000");
			fill('#ffbdf7');
			rectMode(CENTER); //switch centre to be centre rather than left, top
			translate(pos.x, pos.y);
			rotate(angle);
			rect(0, 0, this.width, this.height);
		pop();
	}
}

function displayPlayers () {
	mario.show()
	princessPeach.show()
	dk.show()
}
