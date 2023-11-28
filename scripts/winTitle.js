class Titles {
    #_score = 0;
    #_time = 0;
    scoreOrTimeEditor (obj) {
        if (obj.feature === "score") {

            this.#score = obj.valueToAdd;

        } else { 
            this.#time = obj.valueToAdd;

        }

    }
    set #score (val) {
        if (val > 0) {
            this.#_score += val;
        } else {
            this.#_score = val;
        }
    }

    get score () {
        return this.#_score
    }

    set #time (val) {
        if (val > 0) {
            this.#_time += val;
        } else {
            this.#_time = val;
        }
    }
    get time () {
        return this.#_time;
    }
}

class ValueForFeature {
    constructor (valueToAdd = 0, feature = "score") {
        this.feature = feature;
        this.valueToAdd = valueToAdd;
    }
}


