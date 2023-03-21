
const loginBtn = document.querySelector('#login-btn');
const registerBtn = document.querySelector('#register-btn');
const logo = document.querySelector('#logo');
const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confPasswordInput = document.querySelector('#confirm_password');
const h2 = document.querySelector('h2');

logo.addEventListener('click', (e) => {
    window.location.href = './index.html';
})

loginBtn.addEventListener('click', (e) => {
    window.location.href = './login.html';
})

registerBtn.addEventListener('click', (e) => {
    window.location.href = './register.html';
})

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confirmPassword = confPasswordInput.value;


    const response = await fetch('http://localhost:5050/authentication/register', {
        method: 'POST',
        body: JSON.stringify({email, username, password, confirmPassword}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.text();
    if (response.status === 201){
        window.location.href = './login.html';
    } else {
    h2.textContent = response.status + ' ' + data;
    }
})