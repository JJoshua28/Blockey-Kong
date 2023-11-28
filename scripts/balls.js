let balls = [];
let removeBallIndex = null;
//the class used to create new balls
class Ball {
	constructor(x, y, diameter, label) {
		let options = {
			restitution: 0,
			friction: 0.000,
			density: 0.7,
			frictionAir: 0.001,
			label: label,
			collisionFilter: {
				category: interactable
			}		
		}
		this.body = Matter.Bodies.circle(x, y, diameter/2, options); //matterbody.circle(x, y, Matter.Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
		Matter.World.add(world, this.body);
		
		
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.start = true;
		this.endReached = true;
	}

	body() {
		return this.body;
	}
	show() {
		if(this.endReached) {
			let pos = this.body.position;
		    let angle = this.body.angle;
			if (this.start) {
				Matter.Body.applyForce(this.body, this.body.position, {x: 7, y:0})
			    this.start = false;
		    }	
		    push(); //p5 translation 
			  translate(pos.x, pos.y);
			  rotate(angle);
			  fill('#F73718');
			  ellipseMode(CENTER); //switch centre to be centre rather than left, top
			  circle(0, 0, this.diameter);
		      pop();  
	    }
	}	
	collisionRightWall () {
		Matter.Body.setVelocity(this.body, {x: -4, y:0})
	}
	collisionLeftWall () {
		Matter.Body.setVelocity(this.body, {x: 4, y:0})
	}
	remove() {
		Matter.World.remove(world, this.body);
		this.endReached = false;
	}
}

/*generates a new ball every 3 seconds once the menu is not active(set to false)
if a ball in the ball array is set to null, it will recycle this ball instead of adding to the array 
*/
setInterval(() => {
	if(!isMenuActive) {
		if (removeBallIndex != null) {
			balls[removeBallIndex] = new Ball(50, 10, 33, "ball" + (removeBallIndex + 1))
			removeBallIndex = null;
		} else {
			balls.push(new Ball(90, 10, 33, "ball" + (balls.length + 1)))}
}}, 3000);


//dislays the p5 shapes for the balls. If a balls falls off the screen, it's set to null in the balls index
function displayBalls () {
    if (balls.length > 0) {
        for(let x = 0; x < balls.length; x++) {
            try {
                balls[x].show();
            	if (balls[x].body.position.y > vp_height) {
                    removeBall = x;
                }
            } catch (e) {
                start()
            }   
        }    
    }
}

//takes the index in the label of the ball detected in the collision and converts it to a number.  
function ballCollisionWall (index, wall) {
    index = parseInt(index);
    index--;
    switch (wall) {
        case "rightwall":
            balls[index].collisionRightWall();
            break;
        default:
            balls[index].collisionLeftWall()	
    }
}

//clears all balls in the ball 
function removeAllBalls(arr){
	arr.forEach(element => {
		element.remove();
	})
	balls = [];
}