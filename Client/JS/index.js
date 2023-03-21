const loginBtn = document.querySelector('#login-btn');
const registerBtn = document.querySelector('#register-btn');
const profileBtn = document.querySelector('#profile-btn');
const logo = document.querySelector('#logo');

logo.addEventListener('click', (e) => {
    window.location.href = './index.html';
})

loginBtn.addEventListener('click', (e) => {
    window.location.href = './login.html';
})

registerBtn.addEventListener('click', (e) => {
    window.location.href = './register.html';
})

profileBtn.addEventListener('click', (e) => {
    window.location.href = './profile.html';
})