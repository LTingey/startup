function login() {
  const nameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  localStorage.setItem("userName", nameEl.value);
  localStorage.setItem("userEmail", emailEl.value);

  window.location.href = "map.html";
}  

async function newUser() {
  const nameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  localStorage.setItem("userName", nameEl.value);
  localStorage.setItem("userEmail", emailEl.value);

  try {
    const newList = {user: emailEl.value, states: []};
    await fetch('/api/newList', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newList),
    });
  }
  catch {
    localStorage.setItem("statesList", []);
  }

  window.location.href = "map.html";
}