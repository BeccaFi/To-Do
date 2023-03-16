const loginBtn = document.querySelector('#login-btn');
const registerBtn = document.querySelector('#register-btn');
const logo = document.querySelector('#logo');
const form = document.querySelector('form');

logo.addEventListener('click', (e) => {
    window.location.href = './index.html';
})

loginBtn.addEventListener('click', (e) => {
    window.location.href = './login.html';
})

registerBtn.addEventListener('click', (e) => {
    window.location.href = './register.html';
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = './profile.html';
})