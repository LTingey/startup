let statesSet;
const email = localStorage.getItem('userEmail');

// if (localStorage.getItem('statesArray')) {
//     let statesArray = JSON.parse(localStorage.getItem('statesArray'));
//     statesSet = new Set(statesArray);
// }  
// else {
//     statesSet = new Set();
// }

async function loadSet() {
    let statesArray;
    try {
        const statesObject = await fetch(`/api/userList/${email}`).then(response => response.json());
        
        if (statesObject) {
            statesArray = statesObject.states;
        }
        else {
            statesArray = new Set();
        }

        //localStorage.setItem('statesArray', JSON.stringify(statesArray));    // save list in case we go offline; do this later
    }
    catch {
        const statesText = localStorage.getItem('statesArray')
        if (statesText) {
            statesSet = new Set(JSON.parse(statesText));
        }
    }
    statesSet = new Set(statesArray);
}

async function loadMap() {
    await loadSet();
    statesSet.forEach(state => {
        const fillStateEl = document.getElementById(state);
        fillStateEl.setAttribute('style', 'fill: #780707 !important');
    })
}

function stateClicked(state) {
    if (statesSet.has(state)) {
        deselectState(state);
    }
    else {
        selectState(state);
    }
}

function selectState(state) {
    statesSet.add(state);
    
    const fillStateEl = document.getElementById(state);
    fillStateEl.setAttribute('style', 'fill: #780707 !important');
}

function deselectState(state) {
    statesSet.delete(state)
    
    const fillStateEl = document.getElementById(state);
    fillStateEl.setAttribute('style', 'fill: dimgrey !important');
}
    
async function saveStates() {
    const statesArray = Array.from(statesSet);
    localStorage.setItem("statesArray", JSON.stringify(statesArray));

    try {
        await fetch(`/api/updateList/${email}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(statesArray),
        })
    }
    catch {
        localStorage.setItem("statesArray", JSON.stringify(statesArray));
    }
}

loadMap();