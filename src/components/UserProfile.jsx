import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import '../styles/userProfile.css';

function UserProfile({ userId }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', userId); // Referencia al documento del usuario
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('No se encontró el usuario.');
        }
      } catch (err) {
        setError('Error al obtener los datos del usuario.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserData(); // Ejecuta solo si existe el UID
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="user-profile">
      <h2>Perfil del Usuario</h2>
      {userData && (
        <div className="profile-info">
          <img
            src={userData.fotoPerfil || 'https://via.placeholder.com/150'}
            alt="Foto de perfil"
            className="profile-avatar"
          />
          <p><strong>Nombre:</strong> {userData.nombre}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Estado Emocional:</strong> {userData.emotionalStatus || 'No especificado'}</p>
          <p><strong>Es Premium:</strong> {userData.isPremium ? 'Sí' : 'No'}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
