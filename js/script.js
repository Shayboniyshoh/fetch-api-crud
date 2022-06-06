const getText = document.getElementById('getText');
const getJson = document.getElementById('getJson');
const getPost = document.getElementById('getPost');
const form = document.getElementById('form');

const text = document.getElementById('text');
const container = document.getElementById('container');

getText.addEventListener('click', getTextFile);
getJson.addEventListener('click', getJsonUsers);
getPost.addEventListener('click', getPosts);
form.addEventListener('submit', addPosts);
form.addEventListener('submit', editPosts);

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
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts/')
        .then(res => res.json())
        .then(data => {
            data.forEach(todo => {
                container.innerHTML += `
                    <div class="card col-6 p-4 bg-dark shadow-lg">
                    <p class="text-light">${todo.id}</p>
                    <h3 class="text-light">${todo.title}</h3>
                    <p class="text-light">${todo.body}</p>
                    </div>
                `
            })
        })
        .catch(err => console.log(err));
};
function addPosts(e) {
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
                <p class="text-light">${data.id}</p>
                <h3 class="text-light">${data.title}</h3>
                <p class="text-light">${data.body}</p>
                </div>
                `
        }).catch(err => console.log(err));
}
function editPosts(e) {
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
        body: JSON.stringify({ id: 1, title: title, body: body }),
    })
        .then(res => res.json())
        .then(data => {
            container.innerHTML += `
                <div class="card col-6 p-4 bg-dark shadow-lg">
                <p class="text-light">${data.id}</p>
                <h3 class="text-light">${data.title}</h3>
                <p class="text-light">${data.body}</p>
                </div>
                `,
                console.log(data);
        }).catch(err => console.log(err));
}


