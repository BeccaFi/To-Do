const logoutBtn = document.querySelector('#logout-btn');
const loginBtn = document.querySelector('#login-btn');
const profileBtn = document.querySelector('#profile-btn');
const createBtn = document.querySelector('#create-btn');
const addFriendBtn = document.querySelector('#add-friend-btn');
const logo = document.querySelector('#logo');
const h2 = document.querySelector('h2');
const allTodos = document.querySelector('#all-todos');
const chosenList = document.querySelector('#chosen-list');
const clickedListTitle = document.querySelector('#chosen-title');
const friendContainer = document.querySelector('#friend-container');
const unfriend = document.querySelector('#unfriend');
const unfriendDiv = document.querySelector('#unfriend-div');
const unfriendh3 = document.querySelector('#unfriend-h3');
const unfriendYes = document.querySelector('#unfriend-yes-btn');
const unfriendNo = document.querySelector('#unfriend-no-btn');
const todoUl = document.querySelector('#todo-ul');
const createList = document.querySelector('#create-form');
const addTodoBtn = document.querySelector('#addTodoBtn');
const addedTodos = document.querySelector('#addedTodos');
const newTodo = document.querySelector('#newTodo');
const replaceTodoBtn = document.querySelector('#replaceTodoBtn');
const submitNewList = document.querySelector('#submitCreatedListBtn');
const newListTitle = document.querySelector('#newListTitle');
const addedH3 = document.querySelector('#addedH3');
const deletePopup = document.querySelector('#deleteListPopup');
const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');
const profileContainers = document.querySelector('#profile-containers');
const hoverFriends = document.querySelector('.hover-friends');
const friendProfile = document.querySelector('#friend-profile');
const friendAllTodos = document.querySelector('#friend-all-todos');
const friendClickedListContainer = document.querySelector('#friend-clicked-list');
const friendClickedTitle = document.querySelector('#friend-clicked-title');
const friendTodoUl = document.querySelector('#friend-todo-ul');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const errorFriendPopup = document.querySelector('#error-friend-popup');
const errorFriendOkBtn = document.querySelector('#ef-popup-ok');
const addFriendPopup = document.querySelector('#add-friend-popup');
const addFriendH3 = document.querySelector('#add-friend-h3');
const confirmAddFriendBtn = document.querySelector('#add-friend-confirm');
const cancelAddFriendBtn = document.querySelector('#cancel-add-friend');
const errorFriendH3 = document.querySelector('#error-friend-h3');
const arrayOfUsers = [];
const myFriendsArray = [];
const alertMessage = '\nOops! There seems to be an issue with the server. Please try again later and contact us if the issue remains.'


logo.addEventListener('click', (e) => {
    window.location.href = './index.html';
})

profileBtn.addEventListener('click', (e) => {
    window.location.href = './profile.html';
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
        searchForm.style.display = 'inline';
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
   
                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const chosenToDelete = e.target.parentNode.parentNode;
                    chosenToDelete.remove();
                })
            
    
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                addTodoBtn.style.display = 'none';
                replaceTodoBtn.style.display = 'inline';
                const chosenToEdit = e.target.parentNode.parentNode.childNodes[0]
                newTodo.value = chosenToEdit.innerText;
                newTodo.focus();
    
                replaceTodoBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    chosenToEdit.innerText = newTodo.value;
                    replaceTodoBtn.style.display = 'none';
                    addTodoBtn.style.display = 'inline';
                    newTodo.value = '';
                    newTodo.focus();
                }, {once: true})
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
    
            const newlistResponse = await createNewList.text();
    
            if(createNewList.status !== 201) {
                addedH3.style.display = 'inline';
                addedH3.innerText = newlistResponse;
            } else {
                const allNewTodos = document.querySelectorAll('.allNewTodos');

                allNewTodos.forEach(async (currentTodo) => {
                    
                    const todo = currentTodo.innerText;
        
                    const createTodos = await fetch('http://localhost:5050/profile/createTodos', {
                    method: 'POST',
                    body: JSON.stringify({todo}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include"
                });
        
                
                    const createTodoResponse = await createTodos.text();

                    if(createTodos.status !== 201){
                        addedH3.style.display = 'inline';
                        addedH3.innerText = createTodoResponse;
                    } else {
                        newListTitle.style.border = '1px solid black';
                        addedH3.style.display = 'inline';
                        addedH3.innerText = 'List created!';
                    }
                })
            }
        })
    })











    //Get todo lists:

    const listsResponse = await fetch('http://localhost:5050/profile/todoLists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    const listsData = await listsResponse.json();

    listsData.forEach(element => {
        const listDiv = document.createElement('div');
        const todoListName = document.createElement('button');
        const listButtonsDiv = document.createElement('div');
        // const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        listDiv.className = 'listDiv';
        listDiv.name = element.List_ID;
        todoListName.className = 'todoList';
        todoListName.innerText = element.ListName;
        listButtonsDiv.className = 'listButtonsDiv';
        // editButton.className = 'editListButtons';
        // editButton.innerText = 'Edit';
        deleteButton.className = 'deleteListButtons';
        deleteButton.innerText = 'Delete';
        listButtonsDiv.append(deleteButton);
        listDiv.append(todoListName, listButtonsDiv);
        allTodos.appendChild(listDiv);

        //Vet att listButtonsDiv är onödig, hade den bara först för att kunna lägga editButton och deleteButton i en flexbox men nu behövdes inte editButton mer... och jag orkar inte fixa om för då måste jag ändra parentNode och allt :(

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();

            const listToDelete = e.target.parentNode.parentNode.name;
            deletePopup.style.display = 'inline';

            noBtn.addEventListener('click', (e) => {
                deletePopup.style.display = 'none';
            });

            yesBtn.addEventListener('click', async (e) => {
                deletePopup.style.display = 'none';
                const deleteListResponse = await fetch(`http://localhost:5050/profile/deleteList?listId=${listToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
    
              
                if(deleteListResponse.status !== 200){
                    alert(deleteListResponse.statusText + alertMessage);
                    return;
                }
                const deleteListData = await deleteListResponse.json();

                location.reload();
            })
        })
    });

    const todoLists = document.querySelectorAll('.todoList');

    todoLists.forEach(list => {
        list.addEventListener('click', async (e) => {
            e.preventDefault();
            todoUl.innerHTML = "";
            clickedListTitle.innerText = list.innerText;
            chosenList.style.display = 'inline';
            createList.style.display = 'none';

            const listIndex = listsData.findIndex(lista => lista.ListName === list.innerText);
            const clickedListID = listsData[listIndex].List_ID;


            // Get todos from clicked list
            const todoResponse = await fetch(`http://localhost:5050/profile/todos?listId=${clickedListID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const todoData = await todoResponse.json();

            todoData.forEach(todo => {
                    const singleTodo = document.createElement('li');
                    singleTodo.dataset.id = todo.ID;
                    singleTodo.innerText = todo.Todo;
                    const deleteTodoBtn = document.createElement('button');
                    deleteTodoBtn.innerText = 'Remove task';
                    todoUl.append(singleTodo, deleteTodoBtn);

                    const todoId = singleTodo.dataset.id;

                    singleTodo.classList.add('chosenSingleTodos')

                    if(todo.Done === 1){
                        singleTodo.classList.toggle('checked');
                        }
    
                    singleTodo.addEventListener('click', async (e) => {
                        
                        singleTodo.classList.toggle('checked');

                        const toggleTodoResponse = await fetch(`http://localhost:5050/profile/toggleTodos`, {
                            method: 'PATCH',
                            body: JSON.stringify({todoId}),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include'
                        });

                        if(toggleTodoResponse.status !== 200) {
                            alert(toggleTodoResponse.statusText + alertMessage);
                            return;
                        }
                    })

                    deleteTodoBtn.addEventListener('click', async (e) => {
                        
                        const deleteTodoResponse = await fetch(`http://localhost:5050/profile/deleteTodos?todoId=${todoId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include'
                        });


                        if(deleteTodoResponse.status !== 200){
                            alert(deleteTodoResponse.statusText + alertMessage);
                            return;
                        }
                        location.reload();
                    })
            })
        })
    })










    // Friends

    const friendsResponse = await fetch('http://localhost:5050/friends', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const friendsData = await friendsResponse.json();

    friendsData.forEach(element => {
        const friend = document.createElement('button');
        friend.className = 'friends';
        if(element.U_Username === element.Friend) {
            friend.innerText = element.F_Username;
        } else {
            friend.innerText = element.Friend;
        }
        friendContainer.appendChild(friend);
        myFriendsArray.push(friend.innerText);

    

        friend.addEventListener('click', async (e) => { 
            e.preventDefault();
            
            const clickedFriend = e.target.innerText;    

            h2.textContent = `${clickedFriend}'s profile`;
            friendContainer.style.display = 'none';
            profileContainers.style.display = 'none';
            searchForm.style.display = 'none';
            friendProfile.style.display = 'flex';
            unfriend.style.display = 'block';
            profileBtn.style.display = 'inline';
            createBtn.style.display = 'none';

            unfriend.addEventListener('click',  (e) => {
                unfriendDiv.style.display = 'block';
                unfriendh3.innerText = `Remove ${clickedFriend} from friends?`;

                unfriendNo.addEventListener('click', (e) => {
                    unfriendDiv.style.display = 'none';
                })

                unfriendYes.addEventListener('click', async (e) => {
                    e.preventDefault();

                    unfriendDiv.style.display = 'none';
                 
                    const unfriendResponse = await fetch(`http://localhost:5050/friends/remove?Friend=${clickedFriend}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    });

                    if(unfriendResponse.status !== 200){
                        alert(unfriendResponse.statusText + alertMessage);
                        return;
                    }

                    location.reload();
                })
            })


        // Get friends todo lists
    const friendListsResponse = await fetch(`http://localhost:5050/friends/todoLists?Friend=${clickedFriend}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    const friendListsData = await friendListsResponse.json();

    friendListsData.forEach(element => {
        const friendTodoListName = document.createElement('button');
        friendTodoListName.className = 'friendTodoList';
        friendTodoListName.innerText = element.ListName;
        friendAllTodos.appendChild(friendTodoListName);
    });

    const friendTodoLists = document.querySelectorAll('.friendTodoList');


    friendTodoLists.forEach(list => {
        list.addEventListener('click', async (e) => {
            e.preventDefault();
            friendTodoUl.innerHTML = "";
            friendClickedTitle.innerText = list.innerText;
            friendClickedListContainer.style.display = 'inline';


            //Get todos of the clicked list
            const friendTodoResponse = await fetch(`http://localhost:5050/friends/todos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })


            const friendListIndex = friendListsData.findIndex(lista => lista.ListName === list.innerText);
            const friendClickedList = friendListsData[friendListIndex];
            const friendClickedListID = friendListsData[friendListIndex].List_ID;

            const friendTodoData = await friendTodoResponse.json();

            friendTodoData.forEach(todo => {
                if (todo.List_ID === friendClickedListID){
                    const friendSingleTodo = document.createElement('li');
                    friendSingleTodo.innerText = todo.Todo;
                    friendTodoUl.appendChild(friendSingleTodo);
                    if(todo.Done === 1){
                    friendSingleTodo.classList.add('friendTodosChecked');
                    } else {
                        friendSingleTodo.classList.add('friendChosenSingleTodos');
                    }
                }
            })
        })
    })
        })
    });








    // Searching users and adding new friends
    const allUsersResponse = await fetch('http://localhost:5050/profile/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    const allUsersData = await allUsersResponse.json();

    allUsersData.forEach(user => {
        arrayOfUsers.push(user.Username);
    })

    const sortedUsers = arrayOfUsers.sort(); //Might be unnecessary

    searchInput.addEventListener('keyup', (e) => {

            removeElements();

        for(let user of sortedUsers){
            if(searchInput.value != '' && user.toLowerCase().startsWith(searchInput.value.toLowerCase())) {
                let searchListUsers = document.createElement('li');
                searchListUsers.className = 'searchListUsers';
                let word = "<b>" + user.substr(0, searchInput.value.length) + "</b>";
                word += user.substr(searchInput.value.length);

                searchListUsers.innerHTML = word;

                document.querySelector('.search-ul').appendChild(searchListUsers);

                const suggestedUsers = document.querySelectorAll('.searchListUsers');

                suggestedUsers.forEach(suggestedUser => {
                    suggestedUser.addEventListener('click', (e) => {
                        searchInput.value = suggestedUser.innerText;
                        removeElements();
                    })
                })
            }
        }
    });
  

    addFriendBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if(!arrayOfUsers.includes(searchInput.value)){
            errorFriendPopup.style.display = 'inline';
            errorFriendH3.innerText = 'That person is not a user here';
            errorFriendOkBtn.innerText = 'Ok';
            if(searchInput.value === profileData) {
                errorFriendH3.innerText = `That's you!`;
                errorFriendOkBtn.innerText = 'Oops';
                searchInput.value = '';
            }
            errorFriendOkBtn.addEventListener('click', (e) => {
                errorFriendPopup.style.display = 'none';
            })
            return;
        }

        if(myFriendsArray.includes(searchInput.value)){
            errorFriendPopup.style.display = 'inline';
            errorFriendH3.innerText = `${searchInput.value} is already your friend!`;
            errorFriendOkBtn.innerText = 'Oops!';
            searchInput.value = '';

            errorFriendOkBtn.addEventListener('click', (e) => {
                errorFriendPopup.style.display = 'none';
            })
            return;
        }

        const friendToAdd = searchInput.value;

        addFriendPopup.style.display = 'inline';
        addFriendH3.innerText = `Do you want to add ${friendToAdd} to your friends?`


        confirmAddFriendBtn.addEventListener('click', async (e) => {

            addFriendPopup.style.display = 'none';
            searchInput.value = '';

            const addFriendResponse = await fetch('http://localhost:5050/friends/addFriend', {
                method: 'POST',
                body: JSON.stringify({friendToAdd}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if(addFriendResponse.status !== 201){
                alert(addFriendResponse.statusText + alertMessage);
                return;
            }
            const addFriendData = await addFriendResponse.json();
            location.reload();
          
        })

        cancelAddFriendBtn.addEventListener('click', (e) => {
            addFriendPopup.style.display = 'none';
            searchInput.value = '';
        })
       
    })
}





function removeElements(){
    let items = document.querySelectorAll('.searchListUsers');
    items.forEach(item => {
        item.remove();
    })
}