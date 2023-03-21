const logoutBtn = document.querySelector('#logout-btn');
const loginBtn = document.querySelector('#login-btn');
const createBtn = document.querySelector('#create-btn');
const addFriendBtn = document.querySelector('#add-friend-btn');
const logo = document.querySelector('#logo');
const h2 = document.querySelector('h2');
const allTodos = document.querySelector('#all-todos');
const chosenList = document.querySelector('#chosen-list');
const title = document.querySelector('#chosen-title');
const friendContainer = document.querySelector('#friend-container');


logo.addEventListener('click', (e) => {
    window.location.href = './index.html';
})

logoutBtn.addEventListener('click', (e) => {
    window.location.href = './index.html';
})

loginBtn.addEventListener('click', (e) => {
    window.location.href = './login.html';
})

    loadProfile();

    async function loadProfile() {

    const profileResponse = await fetch('http://localhost:5050/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    const profileData = await profileResponse.text();
    //if 200/401
    if (profileResponse.status === 200){
        h2.textContent = `Welcome, ${profileData}!`;
        friendContainer.style.display = 'inline';
        addFriendBtn.style.display = 'inline';
    } else {
        h2.textContent = `You need to sign in to see your profile`;
        allTodos.style.display = 'none';
        logoutBtn.style.display = 'none';
        createBtn.style.display = 'none';
        loginBtn.style.display = 'inline';
    }



    //Fetcha todolistor:

    const listsResponse = await fetch('http://localhost:5050/profile/todoLists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    const listsData = await listsResponse.json();

    console.log(listsData);


    listsData.forEach(element => {
        const todoListName = document.createElement('button');
        todoListName.className = 'todoList';
        todoListName.innerText = element.ListName;
        allTodos.appendChild(todoListName);
    });

    const todoLists = document.querySelectorAll('.todoList');
    const listArray = Array.from(todoLists);


    listArray.forEach(list => {
        list.addEventListener('click', async (e) => {
            e.preventDefault();
            chosenList.style.display = 'inline';    
            title.innerText = list.innerText;

            // module.exports.clickedList = function clickedList() {
            //     return listsData[listIndex];
            //     }
    
            // const clickedList = listsData[listIndex];

            // const todoResponse = await fetch('http://localhost:5050/profile/todos', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     credentials: 'include'
            // })


            const listIndex = listsData.findIndex(lista => lista.ListName === list.innerText);
            const clickedList = listsData[listIndex];
            const clickedListID = listsData[listIndex].List_ID;

            // const todoData = todoResponse.json();
            // console.log(todoData);
            // req.todoList = listsData[listIndex];

            const singleTodo = document.createElement('p');
            singleTodo.innerText = clickedListID;
            chosenList.appendChild(singleTodo);
        
        })
    })


    // Fetcha vänner

    const friendsResponse = await fetch('http://localhost:5050/friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const friendsData = await friendsResponse.json();
    console.log(friendsData);

    friendsData.forEach(element => {
        const friend = document.createElement('button');
        friend.className = 'friends';
        friend.innerText = element.Friend;
        friendContainer.appendChild(friend);
    });

}