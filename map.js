class Map {
    statesSet;

    constructor() { 
        this.statesSet = new Set();
    }
    
    stateSelected(state) {
        if (this.statesSet.has(state)) {
            this.stateDeselected(state);
        }
        else {
            this.statesSet.add(state);

            const fillStateEl = document.getElementById(state);
            fillStateEl.setAttribute('style', 'fill: #780707 !important');
        }
    }
    
    stateDeselected(state) {
        this.statesSet.delete(state)

        const fillStateEl = document.getElementById(state);
        fillStateEl.setAttribute('style', 'fill: dimgrey !important');
    }

    saveStates() {
        localStorage.setItem("statesArray", JSON.stringify([...this.statesSet]));
    }
}

const userMap = new Map();