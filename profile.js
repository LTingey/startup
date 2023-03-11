class Map {
    statesList;

    constructor() { 
        this.statesList = [];

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
        this.statesList.push(state);

        localStorage.setItem("states", state);
        window.location.href = "profile.html";

        const fillStateEl = document.getElementById(state);
        fillStateEl.setAttribute('style', 'fill: #780707 !important');
    }
}

const userMap = new Map();

