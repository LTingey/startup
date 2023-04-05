function login() {
  const name = document.querySelector("#name")?.value;
  const email = document.querySelector("#email")?.value;
  const password = document.querySelector("#password")?.value;
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  window.location.href = "map.html";
}  

async function newUser() {
  const name = document.querySelector("#name")?.value;
  const email = document.querySelector("#email")?.value;
  const password = document.querySelector("#password")?.value;
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);

  try {
    const result = await fetch('/api/auth/create', {
      method: 'POST',
      headers: {'content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({name: name, email: email, password: password}),
    });
    const body = await result.json();
  
    if (result.ok) {
      const newList = {user: email, states: []};
      const response = await fetch('/api/newList', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newList),
      });
      if (response.ok) {
        window.location.href = "map.html";
      }
    }
    else if (result.status === 409) {
      throw new Error("Existing user");
    }
    else {
      throw new Error("Error occured");
    }
  }
  catch(error) {
    const errorMessageEl = document.getElementById('errorMessage');
    errorMessageEl.textContent = error.message;
    errorMessageEl.style.display = 'block';
  }
}