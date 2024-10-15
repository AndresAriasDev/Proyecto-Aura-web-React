// Importa e inicializa Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC019BTB772vWc4wsz7LzvcJP_j1RSPB-Q",
  authDomain: "devproyectaura.firebaseapp.com",
  projectId: "devproyectaura",
  storageBucket: "devproyectaura.appspot.com",
  messagingSenderId: "3423274848",
  appId: "1:3423274848:web:bb8fe00921d1acf51cc005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
