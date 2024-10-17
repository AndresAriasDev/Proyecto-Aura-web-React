import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import '../styles/userProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState(null);  // Estado para los datos del usuario
  const [userName, setUserName] = useState('');    // Estado para el primer nombre

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Obtener los datos del usuario desde Firestore
      const getUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData(userData);  // Guardar los datos completos en el estado
          setUserName(userData.name.split(' ')[0] || ''); // Tomar el primer nombre
        }
      };
      getUserData();
    }
  }, []);

  if (!userData) return <p>Cargando...</p>;

  return (
    <div className="user-profile">
      <h2>Perfil del Usuario</h2>
      <div className="profile-info">
        <img
          src={userData.fotoPerfil || 'https://via.placeholder.com/150'}
          alt="Foto de perfil"
          className="profile-avatar"
        />
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Primer nombre:</strong> {userName}</p>  {/* Mostrar el primer nombre */}
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Estado Emocional:</strong> {userData.emotionalStatus || 'No especificado'}</p>
        <p><strong>Es Premium:</strong> {userData.isPremium ? 'Sí' : 'No'}</p>
      </div>
    </div>
  );
}

export default UserProfile;
