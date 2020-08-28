//DOM Queries
const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const room = document.querySelector('.chat-rooms');

//Add a new chat  
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err=>console.log(err));
});

//Update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  //Update name via chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //Reset the form
  newNameForm.reset();
  //Show then hide the update message
  updateMssg.innerText = `Your name is updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

//Update the chatroom
room.addEventListener('click', e => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

//Check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon';


//Class Instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom("general", username);

//Get chats and render
chatroom.getChats(data => chatUI.render(data));

