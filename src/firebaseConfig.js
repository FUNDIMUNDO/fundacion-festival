// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth }       from 'firebase/auth';
import { getFirestore }  from 'firebase/firestore';
import { getStorage }    from 'firebase/storage';

// Configuración de Firebase (SDK JS v7.20.0+)
const firebaseConfig = {
  apiKey: 'AIzaSyAleN4JRv5oUHfs_l7AWeoBzFCdSSjqfMA',
  authDomain: 'fundimundo-4fbce.firebaseapp.com',
  projectId: 'fundimundo-4fbce',
  storageBucket: 'fundimundo-4fbce.appspot.com',
  messagingSenderId: '722547545080',
  appId: '1:722547545080:web:c67538df57e22b0769bc0d',
  measurementId: 'G-88LGL9FHXP'
};

// Inicializar SDK
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);

// Exportar la instancia de la app para usos futuros
export default app;
