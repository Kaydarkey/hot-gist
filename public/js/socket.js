const socket = io();

// Handle incoming messages
socket.on('message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(data.type);
  messageElement.textContent = data.message;
  document.querySelector('.chat-messages').appendChild(messageElement);
});

// Send a message
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.querySelector('input').value;
  socket.emit('message', { message });
  document.querySelector('input').value = '';
});
