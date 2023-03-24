let statesSet;
if (localStorage.getItem('statesArray')) {
    let statesArray = JSON.parse(localStorage.getItem('statesArray'));
    statesSet = new Set(statesArray);
}  
else {
    statesSet = new Set();
}

function loadMap() {
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
    
function saveStates() {
    let statesArray = Array.from(statesSet);
    localStorage.setItem("statesArray", JSON.stringify(statesArray));
}

loadMap();