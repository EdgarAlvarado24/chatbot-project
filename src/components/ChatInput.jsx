import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css'
import dayjs from 'supersimpledev/dayjs';
import spinner from '../assets/loading-spinner.gif'

function ChatInput({ chatMessages, setChatMessages }){
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const time = dayjs().valueOf();
  const timeFormat = dayjs(time).format('h:mma');
  
  function saveInputText(event){  
    setInputText(event.target.value)
  }

  function handleKeyDown(event){
    if(event.key == 'Enter'){
      sendMessage();
    }else if(event.key == 'Escape'){
      setInputText('')
    }
  }

  function clearMessages(){
    setChatMessages([])
    localStorage.setItem('messages',JSON.stringify([]))
  }

  async function sendMessage(){

    if (isLoading || inputText == ''){
      return;
    }

    setIsLoading(true);

      const newChatMessages = [
        ...chatMessages,
        {
          message:inputText,
          sender:'user',
          id:crypto.randomUUID(),
          time:timeFormat
        }
      ]

      setChatMessages([
        ...newChatMessages,
        {
          message:<img 
                  src={spinner}
                  className="spinner"
                  />,
          sender:'robot',
          id:crypto.randomUUID(),
          time:timeFormat
        }
      ]);

      const response = await Chatbot.getResponseAsync(inputText);
      
      setChatMessages([
        ...newChatMessages,
        {
          message:response,
          sender:'robot',
          id:crypto.randomUUID(),
          time:timeFormat
        }
      ]);

      setInputText('');

      setIsLoading(false);
  }

  return (
    <div 
      className="chat-input-container">
      <input 
        placeholder="Send a message to chatbot" 
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button 
        onClick={clearMessages}
        className="clear-button"
      >Clear</button>
    </div>
  )
}

export default ChatInput;