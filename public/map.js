let statesSet;
let socket;
const email = localStorage.getItem('userEmail');

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

loadMap();
configureWebSocket();

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
    const name = localStorage.getItem('userName');
    broadcastEvent(name);

    try {
        const result = await fetch(`/api/updateList/${email}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(statesArray),
        })
    }
    catch {
        localStorage.setItem("statesArray", JSON.stringify(statesArray));
    }
}

// Functionality for peer communication using WebSocket
function configureWebSocket() {  
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      displayMsg(msg.name);
    };
}

function displayMsg(name) {
    const messagesEl = document.getElementById('userMessages');
    if (messagesEl) {
        messagesEl.innerHTML = `<p class="message">${name} updated their map</p>` + messagesEl.innerHTML;
    }
}

function broadcastEvent(name) {
    const event = {name: name};
    socket.send(JSON.stringify(event));
}