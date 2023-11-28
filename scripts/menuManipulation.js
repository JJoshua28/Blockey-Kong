class MenuManuipulation {
	#_userName;
	#nameFieldElement;
	#_gameToResumeText;
	#_gameToResume;
	#_arrOfFunctionsToRun;
    constructor() {
        this._restart = document.getElementById("start");
        this._menu = document.getElementById("menu");
        this.pauseButton = document.getElementById('pauseButton');
		this.#nameFieldElement = document.getElementById("nameField")
    }
	get #arrOfFunctionsToRun () {
		return this.#_arrOfFunctionsToRun;
	}
	get #userName() {
		return this.#_userName;
	}
	set #userName (val) {
		this.#_userName = val; 
	}
	#checkingUserName () {
		const nameField = this.#nameFieldElement.value;
		if(nameField.length > 0) {
			this.#userName = nameField;
		}
	}
	#nameFieldActive(bool) {
		const value = bool?
			"block":
			"none";
		this.#nameFieldElement.style.display = value;	
	}
	get menu () {
		return this._menu;
	}
	set menu (state) {
		this._menu.style.display = state
	}
	get restart () {
		return this._restart;
	}

	pauseIconOnPause (bool) {
		const pauseIcon = document.getElementById("pauseButton")
		const pauseIcons = document.getElementsByClassName("pause")		
		bool? 
			pauseIcon.style.display = "none" :
			pauseIcon.style.display = "flex";
		// bool?
		// 	pauseIcons.forEach(item => item.style.display = "none") :
		// 	pauseIcons.forEach(item => item.style.display = "block");
	}

	resumeButtonOnPause(state) {
		if (state) {
			console.log("boom boom ")
			const resume = document.createElement("button");
			resume.innerText = "Resume";
			resume.id = "resumeButton";
			resume.className = "btn";
			resume.style.display = "inline-block";
			resume.style.width = "45%";
			resume.style.marginRight = "5px"
			resume.style.marginBottom = "5px";
			const buttonMenu = document.getElementById('buttonMenu');
			buttonMenu.insertBefore(resume, this.restart);
		} else {
			const resume = document.getElementById("resumeButton")
			resume.remove();
		}
	}

	gamePausedTitle (state) {
		if (state) {
			console.log(this)
			const pause = document.createElement("h2");
			pause.innerHTML = 'Game Paused';
			pause.id = "pauseTitle";
			const marioColourDiv = document.getElementById("marioColour");
			this.menu.insertBefore(pause, marioColourDiv);
		} else {
			const pause = document.getElementById("pauseTitle");
			pause.remove();
		}
	}
	startButtonOnPause (state) {
		if (state) {
			this.restart.innerHTML = "Restart";
			this.restart.style.width = "45%";
			this.restart.style.display = "inline-block";
		} else {
			this.restart.style.width = "100%";
			this.restart.style.display = "block";
		}
	}
	get  #gameToResume () {
		return this.#_gameToResume;
	}
	set #gameToResume (bool) {
		this.#_gameToResume = bool
	}
	get #gameToResumeText () {
		return this.#_gameToResumeText;
	}
	set #gameToResumeText (val) {
		this.#_gameToResumeText = val;
	}
	displayGameResumingText () {
		if (isMenuActive && this.#gameToResumeText) {
			textStyle(BOLD)
			fill('#D3D3D3')
			textSize(150);
			text(this.#gameToResumeText, 470, 380)
		}
	}	
	#beforeGameResumes () {
		this.#gameToResumeText = 3
		this.#gameToResume = true	
		setTimeout( () => this.#gameToResumeText = 2, 1200);
		setTimeout( () => this.#gameToResumeText = 1, 2200);
		setTimeout( () => {
			this.#_gameToResumeText = "";
			this.#gameToResume = false; 
			isMenuActive = false;
			this.pauseIconOnPause(false)
		}, 3200)
	}
	#pauseGameHelper (bool) {
		this.gamePausedTitle(bool)
		this.resumeButtonOnPause(bool)
		this.menuElementAmendment(bool, "score")
		this.startButtonOnPause(bool)
		bool? this.pauseIconOnPause(bool) : this.#beforeGameResumes();
	}
	pauseGame (bool = true) {
		switch (bool) {
			case true:
				{
					console.log(!bool)
					this.menu = "block";
					isMenuActive = bool;
					this.#pauseGameHelper(bool)
					const resume = document.getElementById("resumeButton")
					resume.onclick = () => {
						mario.colour = mColour;
						this.#pauseGameHelper(!bool)
						this.menu = "none";						
					}	
				}
				break;
			case false:
				{
					mario.colour = mColour;
					this.#pauseGameHelper(bool);
					this.menu = "none";
				}
				break;
		}
	}
    menuElementAmendment(bool, value) {
        if (bool) {
            if (!document.getElementById(value)) {
                const element = document.createElement("h2");
                element.id = value;
                if (value === "score" || value === "time") {
					value === "time"? element.innerHTML = `${value[0].toUpperCase()}${value.slice(1)}: ${winFeatures.time}` : 
                    element.innerHTML = `${value[0].toUpperCase()}${value.slice(1)}: ${winFeatures.score}`;
                } else {
					this.#userName?
						element.innerHTML = `You ${value[0].toUpperCase()}${value.slice(1)} ${this.#userName}!` :
						element.innerHTML = `You ${value[0].toUpperCase()}${value.slice(1)}!`;
                }
                const marioColourDiv = document.getElementById("marioColour");
                this.menu.insertBefore(element, marioColourDiv);
            }
        } else {
            if (document.getElementById(value)) {
                const element = document.getElementById(value);
                element.remove();
            }
        }
    }
	gameEnd (gameWon) {
		this.pauseIconOnPause(true);
        isMenuActive = true;
        this.menu = "block";
        this.restart.innerHTML = "Restart";
		environment.gameStarted = false;
		this.#nameFieldActive(true)
		const headingList = [
			gameWon? "won" : "lose",
			"score", 
			"time"
		]
		for (let item of headingList) this.menuElementAmendment(true, item);
    }
    oldMenuCleanse () {
		const text = ['won', 'lose', 'score', 'time', 'gameHeading', 'pauseTitle', 'resumeButton']
        for (let  i = 0; i < text.length; i++) this.menuElementAmendment(false, text[i]);
		this.#checkingUserName();		
		this.#nameFieldActive(false)
    }     		
}

const gameMenu = new MenuManuipulation();

//another event listener added in the start function
gameMenu.pauseButton.addEventListener("click", function() {gameMenu.pauseGame()})
