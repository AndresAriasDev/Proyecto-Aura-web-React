import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../../firebaseConfig'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'; 
import '../styles/signup.css'; 

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Subir foto si está seleccionada
      let photoURL = '';
      if (photo) {
        const photoRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      // Actualizar el perfil del usuario
      await updateProfile(user, { displayName: name, photoURL });

      // Guardar la información del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        nombre: name,
        email: user.email,
        fotoPerfil: photoURL,
        createdAt: serverTimestamp(), // Fecha de creación
        isPremium: false, // Valor predeterminado
        preferences: [], // Preferencias vacías al inicio
        emotionalStatus: '', // Estado emocional vacío
      });

      console.log('Usuario registrado con éxito:', user);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <h2>Crear una Cuenta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
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
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Signup;
