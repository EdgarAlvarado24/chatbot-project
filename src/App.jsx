import { useState } from 'react'
import  ChatInput  from './components/ChatInput'
import  ChatMessages  from './components/ChatMessages'
import './App.css'
import { useEffect } from 'react';
import {Chatbot} from 'supersimpledev'

function App () {
  const [chatMessages, setChatMessages] =  useState(JSON.parse(localStorage.getItem('messages')) == null ? []: JSON.parse(localStorage.getItem('messages')));

  useEffect(()=>{
    Chatbot.addResponses({
      "hola":"hola como estas?"
    })
  },[])

  useEffect(()=>{
    localStorage.setItem('messages', JSON.stringify(chatMessages))
    // console.log('save localStorage')
  },[chatMessages])

  return(
    <div 
      className="app-container">
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput 
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
    </div>
  );
}

export default App
