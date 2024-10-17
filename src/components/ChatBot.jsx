import { useState } from 'react';
import '../styles/Chatbot.css';
import { saveMessageToFirestore } from '../../firebaseUtils';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const assistantID = 'asst_svKKYrc6mHpfZx0pkVNqqMmB'; 
  // Función para enviar el mensaje a la API de ChatGPT
  const sendMessageToAPI = async (userMessage) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: `Asistente ID: ${assistantID} | Responde solo preguntas relacionadas con salud mental y bienestar emocional. Si recibes una pregunta fuera de estos temas, responde que no estás capacitado para responder preguntas sobre otros temas.` },
                { role: 'user', content: userMessage },
            ],
            max_tokens: 180,
          }),          
        });
  
        if (response.status === 429) {
            return 'Has realizado demasiadas solicitudes. Por favor, espera unos minutos e inténtalo de nuevo.';
          }
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
    
          const data = await response.json();
          let botResponse = data.choices[0].message.content.trim();
    
          // Truncar la respuesta si es muy larga
          if (botResponse.length > 400) {
            botResponse = botResponse.substring(0, 400) + '...';
          }
    
          return botResponse;
        } catch (error) {
          console.error('Error al obtener respuesta de la API:', error);
          return 'Lo siento, hubo un problema al obtener la respuesta.';
        }
      };
    
      // Función para manejar el envío del mensaje
      const handleSendMessage = async (userMessage) => {
        // Mostrar el mensaje del usuario
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', message: userMessage }]);
    
        // Guarda el mensaje en Firebase
        await saveMessageToFirestore(userMessage, 'user');
    
        // Enviar mensaje a la API de ChatGPT
        const botResponse = await sendMessageToAPI(userMessage);
    
        // Mostrar la respuesta del bot
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', message: botResponse }]);
    
        // Guarda la respuesta del bot en Firebase
        await saveMessageToFirestore(botResponse, 'bot');
      };
    
      return (
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.message}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder="Escribe un mensaje..." 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  handleSendMessage(e.target.value);
                  e.target.value = ''; // Limpiar el campo después de enviar el mensaje
                }
              }} 
            />
          </div>
        </div>
      );
    }
    
    export default ChatBot;