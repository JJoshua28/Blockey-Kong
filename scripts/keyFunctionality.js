let marioMovement = null;

class Keys {
    #_downLadder;
    #_marioOnLadder;
    #_isPressed;
    #_keyManager;
    constructor() {
        this.#_marioOnLadder = false;
        this.#_isPressed = false;
        this.#_downLadder = null;
        this.#_keyManager = {}
    }
    get #keyManager () {
        return this.#_keyManager;
    }
    set keyManager (obj) {
        const {keyID, bool} = obj
        this.#_keyManager[keyID] = bool;
    }
    get #downLadder () {
        return this.#_downLadder;
    }
    set #downLadder (val) {
        if (this.#_downLadder != val) this.#_downLadder = val;

    }
    ladderFunctionality (val) {
        this.#downLadder = val;
        if (this.#marioOnLadder === true && val === false) this.#marioOnLadder = val;        
    }
    set #marioOnLadder (bool) {
        this.#_marioOnLadder = bool;
    }
    get #marioOnLadder () {
        return this.#_marioOnLadder;

    }
    set #isPressed (bool) {
        this.#_isPressed = bool;

    }
    get #isPressed () {
        return this.#_isPressed;

    }
    #leftFunctionality () {
        mario.left();
        direction = DIR_LEFT;
    }
    #upFunctionality () {
        mario.up();
        direction = DIR_NONE;
    }
    #rightFunctionality () {
        mario.right();
        direction = DIR_RIGHT;
    }
    #downFunctionality () {
        mario.down();
        direction = DIR_NONE;
    }
    #functionToRun = (key) => {
        switch (key) {
            case 37:
                this.#leftFunctionality();
                break;
            case 38:
                this.#upFunctionality();
                break;
            case 39:
                this.#rightFunctionality();
                break;
            default:
                this.#downFunctionality();
                break;         
        }
    }
    #staticMario (bool) {
        mario.body.isStatic = bool;
    }
    #stopCharacter () {
        mario.stop()
        this.#isPressed = false;

    }
    #eligibleCharacterMovement (i) {
        switch(this.#marioOnLadder) {
            case true:
                this.#staticMario(false);
                this.#functionToRun(i)
                break;
            case false:
                this.#functionToRun(i)
                if (i === 38) {
                    this.#marioOnLadder = true;
                }
                break; 
        }
    }
    characterMovementDetector (ladderCollision) {
        /*Key codes {
            37: left arrow
            38: up arrow
            39: right arrow
            40: down arrow
        }     
        */
        const keys = this.#keyManager;
        let keyID = false;
        let i = null;
        let k = null;
        //for ladder movement
        if (this.#marioOnLadder) {
            i = 38;
            k = 2;
        //regular character movement    
        } else {
            i = 37;
            //if in contact with a ladder, the up key is enabled
            k = ladderCollision? 1 : 2;        
        }
        const j = i + 3;
        /*
        j = 40 || 41 depending on i's value
        */
        for(i; i < j; i+= k) {   
            if(keys[i]) {
                keyID = i;
                //38 is up keyID when Mario is climbing up the ladder 
            }
        }
        if (this.#marioOnLadder) {
            keyID? 
            this.#eligibleCharacterMovement(keyID) : this.#staticMario(true)
            
        } else {
            keyID? 
            this.#eligibleCharacterMovement(keyID) : this.#stopCharacter();
        }
    }
    userOnLadder (bool) {
        mario.ladderCollision = bool;
        this.#marioOnLadder = bool;
    }
    disableLadderFunctionality () {
        /* KeyCodes {
            UpArrow: 38,
            DownArrow: 40 
        }
        */
        const keys = this.#keyManager;
        if (keys[38] === true || keys[40] === true) this.userOnLadder(false)
        console.log("chopper")
    }
    test () {

    }


    downLadderFunctionality () {
        if (this.#downLadder) {
            ladderConfirmation(this.#downLadder);
            removePlatform(this.#downLadder);
            this.userOnLadder(true);
            this.#downLadder = false;
        }    
    }
}
      //PUT THIS RIGHT AT THE END OF THE CODE- ALLOWS KEYS TO WORK

window.addEventListener("keydown", (event) => { 
    const obj = {
        keyID: event.keyCode,
        bool: true
    };
    marioMovement.keyManager = obj;
    if(event.key === "ArrowDown") marioMovement.downLadderFunctionality();     
});

window.addEventListener("keyup", (event) => { 
    const obj = {
        keyID: event.keyCode,
        bool: false
    };
    marioMovement.keyManager = obj;
});

window.addEventListener("keypress", 
(event) => {
    if (event.key == "p" &&  environment.gameStarted) {
        isMenuActive?
            gameMenu.pauseGame(false) :
            gameMenu.pauseGame()
    }
})

// Keys class is Initialised in setup
