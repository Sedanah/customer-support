'use client';
import Image from "next/image";
import { useState } from "react";
import Box from '@mui/material/Box';


export default function Home() {
  const [messages, setMessages] = useState({
    role : 'assistance',
    content: 'I am an HeadstarterAI customer support agent. How can I help you today?',
   
  })
  
  const [message, setMessage] = useState('')

  return <Box width = "100vw" height = "100vh" display = "flex" flexDirection="column"></Box>
}
