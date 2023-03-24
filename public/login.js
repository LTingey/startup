function login() {
  const nameEl = document.querySelector("#name");
  const emailEl = document.querySelector("#email");
  localStorage.setItem("userName", nameEl.value);
  localStorage.setItem("userEmail", emailEl.value);
  window.location.href = "map.html";
}  

function newUser() {
  
}