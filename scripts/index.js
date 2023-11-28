class MenuFunctionality {
    #_optionsArray;
    #_gameWindow;
    #_gameHeadingConatiner;
    #_gameHeading;
    #_elementsArr;
    #_optionHoveredOver;
    #_colours;
    #_index;
    constructor() {
        this.#_optionsArray = Array.from(document.getElementsByClassName("menuOption"));
        this.#_gameWindow = document.getElementById("gameWindow");
        this.#_gameHeadingConatiner = document.getElementById("gameHeadingConatiner");
        this.#_gameHeading = document.getElementById("gameHeading");
        this.#_elementsArr = [this.#_optionsArray, 
            this.#_gameWindow, 
            this.#_gameHeadingConatiner, 
            this.#_gameHeading
        ];
        this.#_optionHoveredOver = false;
        this.#_colours = ["#37AE0F", "#DF740C", "#FFE64D", "#6FC3DF"];
        this.#_index = 1;

    }
    get #optionsArray () {
        return this.#_optionsArray;
    }
    #elementsArrGenerator () {
        const arrToReturn = []
        for (let i = 0; i < this.#_elementsArr.length; i++) {
            switch (i) {
                case 0:
                    this.#_elementsArr[i].forEach(element => {
                        arrToReturn.unshift(element)
                    });
                    break;
                default:
                    arrToReturn.push(this.#_elementsArr[i])    
            }
        }
        this.#_elementsArr = arrToReturn;
    }
    get #elementsArr () {
        return this.#_elementsArr;
    }
    get #colours () {
        return this.#_colours;
    }
    get #index () {
        return this.#_index;
    }
    set #index (num) {
        if((this.#_index + num) === (this.#colours.length)) {
            console.log("it works...")
            this.#_index = 0;
        } else {
            this.#_index += num
        }
    }
    test () {
        this.#elementsArrGenerator();
        return this.#elementsArr; 
    }

    #updateColour (element, bool = true, colour = "#E6FFFF") {
        switch (bool) {
            case true:
                element.style.borderColor = colour;
                element.style.color = colour;
                break;
            default:
                colour = this.#colours[this.#index -1]
                element.style.borderColor = colour;
                element.style.color = colour;
        }

    }
    #groupColourUpdate (pick) {
        this.#elementsArr.forEach(element => {
            this.#updateColour(element, true, this.#colours[pick]) 
        });

    }

    #randomColourUpdate () {
        setInterval(() => {
            console.log(this.#index)
            this.#groupColourUpdate(this.#index),
            this.#index = 1;
        }, 15000)
    }
    menuOptionsEvent () {
        this.#elementsArrGenerator()
        this.#optionsArray.forEach(element => {
            element.addEventListener("mouseover", event => {
                this.#updateColour(event.target)
            })
            element.addEventListener("mouseout", event => {
                this.#updateColour(event.target, false)
                
        
            })
            element.addEventListener("click", event =>{
                this.#updateColour(event.target)
            })
        });
        this.#randomColourUpdate()
    }
}

const menuFunctionality = new MenuFunctionality();
menuFunctionality.menuOptionsEvent();