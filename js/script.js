const getText = document.getElementById('getText');
const getUsers = document.getElementById('getUsers');
const getPosts = document.getElementById('getPosts');
const getPost = document.getElementById('getPost');
const form = document.getElementById('form');

const text = document.getElementById('text');
const container = document.getElementById('container');

getText.addEventListener('click', getTextFile);
getUsers.addEventListener('click', getJsonUsers);
getPosts.addEventListener('click', getAllPosts);
getPost.addEventListener('click', getSinglePost);
form.addEventListener('submit', addNewPost);
form.addEventListener('submit', editPost);

function getTextFile() {
    fetch('../file/sample.txt')
        .then(res => res.text())
        .then(data => text.innerHTML = data)
        .catch(err => { console.log(err) });
};
function getJsonUsers() {
    fetch('../file/users.json')
        .then(res => res.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                text.innerHTML += `
                <ul class="list-group list-group-flush shadow-lg">
                    <li class="list-group-item bg-dark text-light p-3 m-2">${data[i]['Id']}</li>
                    <li class="list-group-item bg-dark text-light p-3 m-2">${data[i]['Name']}</li>
                    <li class="list-group-item bg-dark text-light p-3 m-2">${data[i]['Contact']}</li>
                </ul>
                `;
            }
        })
        .catch(err => console.log(err));
};
function getAllPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(res => res.json())
        .then(data => {
            data.forEach(todo => {
                container.innerHTML += `
                    <div class="card col-6 p-4 bg-dark shadow-lg">
                    <p class="text-light">Id: ${todo.id}</p>
                    <h3 class="text-light">Title: <br>${todo.title}</h3>
                    <p class="text-light">Description:<br>${todo.body}</p>
                    <p class="text-light">User Id: ${todo.userId}</p>
                    </div>
                    `
            })
        })
        .catch(err => console.log(err));
};
function addNewPost(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    fetch('https://jsonplaceholder.typicode.com/posts/', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title: title, body: body }),
    })
        .then(res => res.json())
        .then(data => {
            container.innerHTML += `
                <div class="card col-6 p-4 bg-dark shadow-lg">
                <p class="text-light">Id: ${data.id}</p>
                <h3 class="text-light">Title: <br>${data.title}</h3>
                <p class="text-light">Description:<br>${data.body}</p>
                <p class="text-light">User Id: ${data.userId}</p>
                </div>
                `
        }).catch(err => console.log(err));
}
function editPost(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ id: 1, title: title, body: body, userId: 1 }),
    })
        .then(res => res.json())
        .then(data => {
            container.innerHTML += `
            <div class="card col-6 p-4 bg-dark shadow-lg">
            <p class="text-light">Id: ${data.id}</p>
            <h3 class="text-light">Title: <br>${data.title}</h3>
            <p class="text-light">Description:<br>${data.body}</p>
            <p class="text-light">User Id: ${data.userId}</p>
            </div>
            `
        }).catch(err => console.log(err));
}
function getSinglePost() {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-type': 'application/json' },
    })
        .then(res => res.json())
        .then(data => {
            container.innerHTML += `
                <div class="card col-6 p-4 bg-dark shadow-lg">
                <p class="text-light">Id: ${data.id}</p>
                <h3 class="text-light">Title: <br>${data.title}</h3>
                <p class="text-light">Description:<br>${data.body}</p>
                <p class="text-light">User Id: ${data.userId}</p>
                </div>
                `
        })
        .catch(err => console.log(err));
}


