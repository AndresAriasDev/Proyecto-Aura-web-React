import { Link } from 'react-router-dom';
import '../styles/Header.css';  // Ajusta la ruta a la nueva ubicación
import logo from '../assets/images/Aura-logo-web-500px.png';

function Header() {
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
            <Link to="/account" className="nav-link btn-account">Cuenta
            </Link>
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
