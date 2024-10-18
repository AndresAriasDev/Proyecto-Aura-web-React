import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import chatBotImg from '../assets/images/icon-chat-bot.png';
import ChatBot from '../components/ChatBot';  // Asegúrate de importar el componente del chatbot

function ChatBotIcon() {
  const [isChatOpen, setIsChatOpen] = useState(false);  // Estado para manejar la visibilidad del chatbot
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleChatClick = () => {
    if (!user) {
      alert('Debes estar logueado para usar el chatbot');
      navigate('/login');  // Redirige al login si no está logueado
    } else {
      // Alternar la visibilidad del chatbot
      setIsChatOpen(!isChatOpen);
    }
  };

  return (
    <>
      <div className="chat-icon" onClick={handleChatClick}>
      <img src={chatBotImg} alt="Icono del chatbot" className='chat-bot-icon' />
      </div>
      
      {/* Si el chat está abierto, mostramos el componente ChatBot */}
      {isChatOpen && <ChatBot />}
    </>
  );
}

export default ChatBotIcon;
