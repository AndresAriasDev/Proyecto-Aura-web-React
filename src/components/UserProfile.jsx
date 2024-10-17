import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../firebaseConfig';
import '../styles/userProfile.css';


function UserProfile() {
  const [userData, setUserData] = useState(null);  // Estado para los datos del usuario
  const [userName, setUserName] = useState('');    // Estado para el primer nombre
  const [image, setImage] = useState(null);        // Imagen seleccionada por el usuario
  const [uploading, setUploading] = useState(false);
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

  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Función para subir la imagen a Firebase Storage
  const handleImageUpload = async () => {
    if (!image) return;
    const auth = getAuth();
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${user.uid}`);

    setUploading(true);

    // Subir la imagen
    try {
      await uploadBytes(storageRef, image);
      const imageURL = await getDownloadURL(storageRef);

      // Guardar la URL de la imagen en Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        fotoPerfil: imageURL,
      });

      // Actualizar los datos del usuario en el estado
      setUserData((prev) => ({ ...prev, fotoPerfil: imageURL }));
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      setUploading(false);
    }
  };

  if (!userData) return <p>Cargando...</p>;

  return (
    <div className="user-profile">
      <h2>Perfil del Usuario</h2>
      <div className="profile-info">
        <div className="profile-avatar-container">
          <img
            src={userData.fotoPerfil || 'https://via.placeholder.com/150'}
            alt="Foto de perfil"
            className="profile-avatar"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {uploading ? (
            <p>Subiendo imageen...</p>
          ) : (
            <button onClick={handleImageUpload}>Subir imagen</button>
          )}
        </div>
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Es Premium:</strong> {userData.isPremium ? 'Sí' : 'No'}</p>
      </div>
    </div>
  );
}

export default UserProfile;

