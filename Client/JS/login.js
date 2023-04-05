const loginBtn = document.querySelector('#login-btn');
const registerBtn = document.querySelector('#register-btn');
const profileBtn = document.querySelector('#profile-btn');
const logo = document.querySelector('#logo');
const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
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

    const username = usernameInput.value;
    const password = passwordInput.value;

    const response = await fetch('http://localhost:5050/authentication/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    const data = await response.text();
    console.log(data);

    if(response.status !== 200){
        h2.innerText = response.status + '' + data;
        return;
    }

    if (response.status === 200) {
        window.location.href = './profile.html';
        h2.innerText = response.status + ' ' + data;
        profileBtn.addEventListener('click', (e) => {
            window.location.href = './profile.html';
        })
        
    }


})