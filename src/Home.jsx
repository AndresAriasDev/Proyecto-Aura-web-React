import { Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Header from './components/Header';  // Importamos Header
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import BreathExercises from './pages/BreathExercises';
import Yoga from './pages/Yoga';
import Chatbot from './components/ChatBot';
import ChatBotIcon from './components/ChatbotIcon';
import Homepage from './pages/Homepage';
import Login from './components/Login';

function Home() {
  return (
    <div>
      <Header />  {/* Usamos Header aquí */}
      <Routes>
      <Route path="/" element={<Homepage/>} />  {/* Página de inicio */}
        <Route path="/breath" element={<BreathExercises />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/chatboticon" element={<ChatBotIcon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Home;
