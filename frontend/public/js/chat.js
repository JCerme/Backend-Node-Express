const socket = io();

// Initialize user
let user = localStorage.getItem('user') || '';
if(!user) {
    Swal.fire({
        title: 'Auth',
        input: 'text',
        inputLabel: 'Enter your name',
        inputPlaceholder: 'Enter your name',
        inputValidator: (value) => {
            return !value && 'You need to write something!'
        },
        allowOutsideClick: false,
    }).then((result) => {
        user = result.value;
        localStorage.setItem('user', user);
        socket.emit('new', user);
    });
}

// Recieve messages
const messageBox = document.querySelector('#messages');
const formMsg = document.querySelector('#inputMsg');
const inputMsg = document.querySelector('#msg');

socket.on('loadMessages', (messages) => {
    for (let message of messages) {
        addBubble(message);
    }
});

socket.on('message', data => {
    addBubble(data);
    window.scrollTo(0,document.body.scrollHeight);
});

function addBubble(data){
    const bubbleClass = data.user === user ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-100 mr-auto';
    const date = data.createdAt ? new Date(data.createdAt) : new Date();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();

    messageBox.innerHTML += `
    <div class="w-[60%] relative rounded-lg py-4 px-6 ${bubbleClass} leading-5 my-4 md:my-8">
        <span class="text-xl font-bold">${data.user}</span>
        <p>${data.message}</p>
        <span class="absolute bg-white -bottom-1 -right-1 text-sm text-gray-400 border-[1px] border-border-solid border-gray-200 p-1 px-4 rounded-full">
            ${hour}:${minutes}
        </span>
    </div>`;
}

// Send messages
formMsg.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let message = inputMsg.value;
    if(!message) return;

    socket.emit('message', {
        user,
        message
    })
    
    inputMsg.value = '';
});