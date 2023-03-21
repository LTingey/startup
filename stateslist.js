function loadList() {
    let statesList = [];
    statesText = localStorage.getItem('statesArray');
    
    if (statesText) {
        statesList = JSON.parse(statesText);
    }

    const statesListEl = document.getElementById('states-list');

    statesList.forEach(state => {
        const newState = document.createElement('p');
        newState.textContent = state;
        statesListEl.appendChild(newState);
    })
}

loadList();