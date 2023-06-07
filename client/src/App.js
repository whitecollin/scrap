import React, { useState } from 'react';
import io from 'socket.io-client';
import  ImageSelector from "./ImageSelector";
const socket = io('http://localhost:3000');

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('chat message', inputValue);
    setInputValue('');
  };

  socket.on('chat message', (msg) => {
    setMessages([...messages, msg]);
  });

  return (
    <div>
      <h1>Chatroom</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <ImageSelector/>
    </div>
  );
}

export default App;