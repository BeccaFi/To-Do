const logoutBtn = document.querySelector('#logout-btn');
const loginBtn = document.querySelector('#login-btn');
const createBtn = document.querySelector('#create-btn');
const addFriendBtn = document.querySelector('#add-friend-btn');
const logo = document.querySelector('#logo');
const h2 = document.querySelector('h2');
const allTodos = document.querySelector('#all-todos');
const chosenList = document.querySelector('#chosen-list');
const clickedListTitle = document.querySelector('#chosen-title');
const friendContainer = document.querySelector('#friend-container');
// const clickedSingleTodos = document.querySelectorAll('.clickedSingleTodos');
const todoUl = document.querySelector('#todo-ul');
const createList = document.querySelector('form');
const addTodoBtn = document.querySelector('#addTodoBtn');
const addedTodos = document.querySelector('#addedTodos');
const newTodo = document.querySelector('#newTodo');
const replaceTodoBtn = document.querySelector('#replaceTodoBtn');
const submitNewList = document.querySelector('#submitCreatedListBtn');
const newListTitle = document.querySelector('#newListTitle');
const allNewTodos = document.querySelectorAll('.allNewTodos');
const todosArray = [];
const addedH3 = document.querySelector('#addedH3');
const deletePopup = document.querySelector('#deleteListPopup');
const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

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


    createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        createList.style.display = 'inline';
        chosenList.style.display = 'none';
        addTodoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const addedDiv = document.createElement('div');
            const todoAdded = document.createElement('li');
            const buttonDiv = document.createElement('div');
            const editBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');
            addedDiv.className = 'addedDiv';
            buttonDiv.className = 'buttonDiv';
            todoAdded.className = 'allNewTodos';
            editBtn.className = 'editButtons';
            deleteBtn.className = 'deleteButtons';
            const editButtons = document.querySelectorAll('.editButtons');
            const deleteButtons = document.querySelectorAll('.deleteButtons');
            todoAdded.innerText = newTodo.value;
            editBtn.innerText = 'Edit';
            deleteBtn.innerText = 'Delete'; 
            buttonDiv.append(editBtn, deleteBtn)
            addedDiv.append(todoAdded, buttonDiv);
            addedTodos.appendChild(addedDiv);
            newTodo.value = '';
            newTodo.focus();
            todosArray.push(todoAdded.innerText);
            console.log(todosArray);
    
            // deleteButtons.forEach(buttonClicked => {
                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const chosenToDelete = e.target.parentNode.parentNode;
                    // const index = todosArray.indexOf(chosenToDelete.childNodes[0].innerText);
                    chosenToDelete.remove();
                    // todosArray.splice(index, 1);
                    // console.log(todosArray);
                })
            // })
            
    
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addTodoBtn.style.display = 'none';
                replaceTodoBtn.style.display = 'inline';
                const chosenToEdit = e.target.parentNode.parentNode.childNodes[0]
                newTodo.value = chosenToEdit.innerText;
                newTodo.focus();
    
                replaceTodoBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(chosenToEdit);
                    chosenToEdit.innerText = newTodo.value;
                    // let index = todosArray.indexOf(chosenToEdit.innerText);
                    // console.log(todosArray[index]);
                    // todosArray[index] = chosenToEdit.innerText;
                    replaceTodoBtn.style.display = 'none';
                    addTodoBtn.style.display = 'inline';
                    newTodo.value = '';
                    newTodo.focus();
                    // console.log(todosArray);
                })
    
            })
        })
    
        submitNewList.addEventListener('click', async (e) => {
            e.preventDefault();
    
            if(!newListTitle.value) {
                newListTitle.style.border = '1px solid red';
            }
    
            const listName = newListTitle.value;
    
            const createNewList = await fetch('http://localhost:5050/profile/createNewList', {
                method: 'POST',
                body: JSON.stringify({listName}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
    
            const newlistResponse = await createNewList.json();
            console.log(newlistResponse); 
    
            if(createNewList.status !== 201) {
                console.log(newlistResponse.status + ' Something went wrong');
            } else {

                todosArray.forEach(async (currentTodo) => {
    
                    const todo = currentTodo;
        
                    const createTodos = await fetch('http://localhost:5050/profile/createTodos', {
                    method: 'POST',
                    body: JSON.stringify({todo}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include"
                });
        
                
                    const createTodoResponse = await createTodos.text();
                    console.log(createTodoResponse); 

                    addedH3.style.display = 'inline';

                })
            }
        })
    })








    //Hämta todolistor:

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
        const listDiv = document.createElement('div');
        const todoListName = document.createElement('button');
        const listButtonsDiv = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        listDiv.className = 'listDiv';
        listDiv.name = element.List_ID;
        todoListName.className = 'todoList';
        todoListName.innerText = element.ListName;
        listButtonsDiv.className = 'listButtonsDiv';
        editButton.className = 'editListButtons';
        editButton.innerText = 'Edit';
        deleteButton.className = 'deleteListButtons';
        deleteButton.innerText = 'Delete';
        listButtonsDiv.append(editButton, deleteButton);
        listDiv.append(todoListName, listButtonsDiv);
        allTodos.appendChild(listDiv);


        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();

            const listToDelete = e.target.parentNode.parentNode.name;
            console.log(listToDelete);

            deletePopup.style.display = 'inline';

            noBtn.addEventListener('click', (e) => {
                deletePopup.style.display = 'none';
            })

            yesBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                deletePopup.style.display = 'none';
                const deleteListResponse = await fetch('http://localhost:5050/profile/deleteList', {
                    method: 'DELETE',
                    body: JSON.stringify({listToDelete}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
    
                const deleteListData = await deleteListResponse.json();
                console.log(deleteListData);
            })

          
        })

    


    });

    const todoLists = document.querySelectorAll('.todoList');
    // const listArray = Array.from(todoLists);

    // console.log(listArray);

    todoLists.forEach(list => {
        list.addEventListener('click', async (e) => {
            e.preventDefault();
            todoUl.innerHTML = "";
            clickedListTitle.innerText = list.innerText;
            chosenList.style.display = 'inline';
            createList.style.display = 'none';


            const todoResponse = await fetch('http://localhost:5050/profile/todos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })


            const listIndex = listsData.findIndex(lista => lista.ListName === list.innerText);
            const clickedList = listsData[listIndex];
            const clickedListID = listsData[listIndex].List_ID;

            const todoData = await todoResponse.json();

            todoData.forEach(todo => {
                if (todo.List_ID === clickedListID){
                    // const eachTodo = document.createElement('div');
                    const singleTodo = document.createElement('li');
                    // const checkbox = document.createElement('input');
                    // eachTodo.className = 'eachTodo';
                    // checkbox.type = 'checkbox';
                    // checkbox.className = 'checkbox';
                    // eachTodo.append(singleTodo, checkbox);
                    singleTodo.classList.add('chosenSingleTodos');
                    singleTodo.innerText = todo.Todo;
                    todoUl.appendChild(singleTodo);

                    // console.log(todoUl);

                 
                
                }  

            })

           

           


            const chosenSingleTodos = document.querySelectorAll('.chosenSingleTodos');
            const newArray = Array.from(chosenSingleTodos);
            console.log(newArray[0]);

            newArray.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.target.classList.toggle('checked');
                })
            })
            //     singleTodo.addEventListener('click', (e) => {
            //     console.log(e.target.classList);
            //     e.target.classList.add('checked');
            //     e.target.classList.toggle('checked');
            // })
        })

    })



    // Hämta vänner

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
        if(element.U_Username === element.Friend) {
            friend.innerText = element.F_Username;
        } else {
            friend.innerText = element.Friend;
        }
        friendContainer.appendChild(friend);
    });

}