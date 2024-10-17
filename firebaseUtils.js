import { db } from './firebaseConfig';  // Ya importaste 'db' desde firebaseConfig
import { doc, setDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();

export async function saveMessageToFirestore(message, sender) {
  const user = auth.currentUser;

  if (user) {
    const conversationId = `conversation_${user.uid}`;
    const conversationRef = doc(db, 'conversations', conversationId);

    try {
      // Intenta actualizar el documento si ya existe
      await updateDoc(conversationRef, {
        messages: arrayUnion({
          sender: sender,  // "user" o "bot"
          message: message,
          timestamp: new Date().toISOString()  // Usar ISO para la marca de tiempo
        }),
        updatedAt: serverTimestamp()  // Actualiza la fecha de modificación
      });
    } catch (error) {
      // Si el documento no existe, lo creamos con el primer mensaje
      await setDoc(conversationRef, {
        userId: user.uid,
        messages: [
          {
            sender: sender,
            message: message,
            timestamp: new Date().toISOString()
          }
        ],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  }
}
