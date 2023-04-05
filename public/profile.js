async function loadList() {
    let statesList = [];
    // if (localStorage.getItem('statesArray')) {
    //     statesList = JSON.parse(localStorage.getItem('statesArray'));
    // }

    try {
        const id = getUserEmail();
        const statesObject = await fetch(`/api/userList/${id}`).then(response => response.json());
        statesList = statesObject.states;

        //localStorage.setItem('listBackup', JSON.stringify(statesList));    // save list in case we go offline
    }
    catch {
        const statesText = localStorage.getItem('statesArray')
        if (statesText) {
            statesList = JSON.parse(statesText);
        }
    }

    const statesListEl = document.getElementById('states-list');

    if (statesList.length) {
        statesList.forEach(state => {
        const newState = document.createElement('p');
        newState.textContent = state;
        statesListEl.appendChild(newState);
        })
    }
    else {
        statesListEl.innerHTML = '<p>When you select states on your map, they will appear here</p>';
    }
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

function logout() {
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = 'index.html'));
}