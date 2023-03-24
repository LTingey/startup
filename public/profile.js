function loadList() {
    let statesList = [];
    if (localStorage.getItem('statesArray')) {
        statesList = JSON.parse(localStorage.getItem('statesArray'));
    }

    const statesListEl = document.getElementById('states-list');

    statesList.forEach(state => {
        const newState = document.createElement('p');
        newState.textContent = state;
        statesListEl.appendChild(newState);
    })
}

function loadProfile() {
    const userNameEl = document.getElementsByClassName('user-name');
    const userEmailEl = document.getElementsByClassName('user-email');
        
    if (userNameEl.length > 0) {
        userNameEl[0].textContent = getUserName();
    }
    if (userEmailEl.length > 0) {
        userEmailEl[0].textContent = getUserEmail();
    }
}

function getUserName() {
    return localStorage.getItem('userName') ?? 'Not provided';
}

function getUserEmail() {
    return localStorage.getItem('userEmail') ?? 'Not provided';
}

loadProfile();
loadList();