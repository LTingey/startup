class Map {
    statesSet;

    constructor() { 
        this.statesSet = new Set();

        const userNameEl = document.getElementsByClassName('user-name');
        const userEmailEl = document.getElementsByClassName('user-email');
        if (userNameEl.length > 0) {
            userNameEl[0].textContent = this.getUserName();
        }
        if (userEmailEl.length > 0) {
            userEmailEl[0].textContent = this.getUserEmail();
        }
    }

    getUserName() {
        return localStorage.getItem('userName') ?? 'Not provided';
    }

    getUserEmail() {
        return localStorage.getItem('userEmail') ?? 'Not provided';
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