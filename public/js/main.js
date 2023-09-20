const socket = io();
const userName = prompt("Enter Yor Name Please.")
console.log(userName);
if(userName!=null)
{
socket.emit('new-user-joined', userName);

socket.on('user-joined', uname => {
  $('#chat-container').append(
    `<div class="joined text-center my-2">
      <span class="user-joined">${uname} joined this chat</span>
    </div>`
  )
})
socket.on('recived', data => {
  $('#chat-container').append(
    `<div class="message">
      <div class="username">
      ${data.uname}
      </div>
      <div class="main-msg">
          ${data.message}
      </div>
    </div>`
  )
})

socket.on('leave', uname => {
  $('#chat-container').append(
    `<div class="joined text-center my-2">
      <span class="user-joined">${uname} left the chat</span>
    </div>`
  )
})

$("#msgBox").keydown(function(event) {
  if (event.key === "Enter") {
    event.preventDefault() 
    $('#sendBtn').click()
  }
});

$('#sendBtn').on('click', () => {
  let msg = $('#msgBox').val()
  if(msg!='')
  {
  socket.emit('send',msg)
  $('#chat-container').append(
    `<div class="d-flex justify-content-end">
      <div class="message user">
          <div class="username">
          ${userName} (You)
          </div>
          <div class="main-msg">
            ${msg}
          </div>
      </div>
  </div>`
  )
  $('#msgBox').val('')
  }
})
}
else
{
  alert('Name Is must required')
    location.reload();
}
