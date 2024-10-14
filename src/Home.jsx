import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';  // Importamos Header
import Footer from './components/Footer';
import BreathExercises from './pages/BreathExercises';
import Yoga from './pages/Yoga';
import Chatbot from './pages/Chatbot';
import Homepage from './pages/Homepage';

function Home() {
  return (
    <div>
      <Header />  {/* Usamos Header aquí */}
      <Routes>
      <Route path="/" element={<Homepage/>} />  {/* Página de inicio */}
        <Route path="/breath" element={<BreathExercises />} />
        <Route path="/yoga" element={<Yoga />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Home;
