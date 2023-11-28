For our game we decided to base the concept of the retro arcade game Donkey Kong. The game involves a player travelling up different platforms, jumping over falling barrels as they go. The aim of the game is to reach the top platform and save Princess peach. In order to create the game we used Javascript, P5 and Matter.
 
In terms of research, the main topic we had to research was using Matter in JS. Although we were both familiar with using p5. matter was something we had never come across. One useful tool we had was an online version of the game. This was something we often looked back on for reference and to see what aspects of the original game we would like to modify. This also helped us clear up misconceptions and gave us a clear indication of how different parts of the game work and how we needed to go about replicating this. Another useful resource was matter.js. It was used continuously throughout the whole project. Although we tried to do the main bulk of our research before we started our code, this was not always possible. Matter.js helped with understanding different aspects that we would have to incorporate within our code such as gravity, velocity, collisions and applied force before actually implementing them within our code.
 
In terms of dividing up responsibility, we attempted to do this evenly. Joshua, who has more experience using Javascript, took on the role of the primary programmer. He was responsible for implementing the Platforms that were static in the air and the falling barrels. Olivia was responsible for the characters and their movement as well as the scoring of the player.
 
One problem we often faced was compatibility. For elements of the game such as the barrels, platforms and player we used clases. And integrating small chunks of code into the main pre-existing functions was not always easy and sometimes required some slight editing in order to maintain consistency. These were often small errors that were easily resolved. The largest problem faced was getting a comprehensive understanding of matter. It was when using matter that we came across the most logical errors. When different objects in the game were not behaving the way we intended them to, it could be difficult to figure out why. For example, a function was created that tells the player to jump when the space key was pressed, however the player could not jump in a given direction simultaneously despite a pre-existing left-right function. This took some external sources and different approaches in order to resolve.
 
 
Testing was something we attempted to do continuously. As unlike previous assignments, there is little to no actual user input within this game, only key pressing, this meant we didn't always have to worry about things like strings and input types. What we did need to consider however was different possibilities within the game. We tried to consider all the ways in which the game can be played and the different outcomes of the game and test for these accordingly. One thing we tried to keep within our code was consistency within things like classes, functions and variable names. This was important because it was a precaution to prevent syntax errors and sneaky bugs. Going into the project I think both of us had a fairly solid understanding of principles such as classes, objects and libraries. This was a real time saver and useful skill when actually implementing the code as it encouraged a good understanding not only of how to solve problems but of what the other person was writing.
 
Overall we are both very happy with the outcome of this project, our game is fully functioning and is a simplified version of the arcade game Donkey Kong. There are some aspects of the original game we could not include however the main objective is the same.
 
 
Tips when playing: 
 
Avoid the barrels
 
When using a ladder you must hold the up key in order to ascend above the platform
 
If you touch the above platform while inside the ladder you must exist the ladder body if you wish to then ascend the platform- I am not going to make it that easy for you!
 
Ladders can also be useful when avoiding the barrels/ balls
 
There is an 11 second delay before the player is generated on screen.

