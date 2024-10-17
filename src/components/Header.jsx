import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import logo from '../assets/images/Aura-logo-web-500px.png';

function Header() {
  const navigate = useNavigate();

  const handleAccountClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    // Si el usuario está logueado, redirigir a UserProfile
    if (user) {
      navigate('/userprofile'); // Redirige a UserProfile.jsx
    } else {
      // Si no está logueado, redirigir al login
      navigate('/login'); // Redirige a Login.jsx
    }
  };

  return (
    <header className="header">
      <div className="container-wrap">
        <div className="header-left">
        <img src={logo} alt="Logo Aura" className='logo-aura' />
        </div>
        <div className="header-center">
          <div className="search-container">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar..." 
              />
              <button className="search-button">Buscar</button>
            </div>
        </div>
        <div className="header-right">
        <button onClick={handleAccountClick} className="btn-account">Cuenta</button>
        </div>
        <div className="container-nav-menu">
          <nav className="navbar">
          <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/breath" className="nav-link">Respiración</Link>
            <Link to="/yoga" className="nav-link">Yoga</Link>
            <Link to="/chatbot" className="nav-link">Chatbot</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
