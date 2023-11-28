let rightWall = null;
let leftWall = null;
let walls = [];

class Barrier extends WorldBodyStructure {
	constructor(x, y, width, height, label) {
        super(x, y, width, height)
		let options = {
			isStatic: true,
			restitution: 1,
			friction: 0,
			density: 0.5,
			label,
			collisionFilter: { //used with mouse constraints to allow/not allow iteration
				category: interactable,
			}
		}
		//create the body
		this.body = Matter.Bodies.rectangle(x, y, width, height, options);
		Matter.World.add(world, this.body); //add to the matter world
	}

	show() {
		let pos = this.body.position; //create an shortcut alias 
		noStroke()
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#37AE0F'); //set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle
	}
}
function displayWalls () {
    walls.forEach(arr => {
        arr.show();
    })
}
