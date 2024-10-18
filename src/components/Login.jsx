import '../styles/login.css'; 
import { useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Importa Firebase y Firestore
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

function Login() {
  const [selectedForm, setSelectedForm] = useState('login'); // Estado para alternar entre login y registro
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSwitch = (form) => {
    setSelectedForm(form);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedForm === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar información adicional del usuario en Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: name,
          email: user.email,
        });

        console.log('Usuario registrado:', user);
        setError('¡Usuario registrado con éxito!');
      } else {
        // Inicio de sesión con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario autenticado:', userCredential.user);
        setError('¡Inicio de sesión exitoso!');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Switch entre Login y Registro */}
      <div className={`form-switch ${selectedForm}`}>
        <button
          className={`form-option ${selectedForm === 'login' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('login')}
        >
          Iniciar
        </button>
        <button
          className={`form-option ${selectedForm === 'register' ? 'active' : ''}`}
          onClick={() => handleFormSwitch('register')}
        >
          Registrarse
        </button>
      </div>

      {/* Formulario dinámico */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Bienvenido</h2>

        {selectedForm === 'register' && (
          <input 
            type="text" 
            placeholder="Nombres" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        )}

        <input 
          type="email" 
          placeholder="Correo" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit">
          {selectedForm === 'login' ? 'Iniciar' : 'Registrar'}
        </button>

        <p style={{ color: 'red' }}>{error}</p>
        <a href="#">¿Olvidaste tu contraseña?</a>
      </form>
    </div>
  );
}

export default Login;