import { initializeApp } from 'firebase/app';
import { getFirestore, collection, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

export const app = initializeApp({
  apiKey: "AIzaSyAlIfN4DdXloeEymcKeJwG_mNhDBCNm0UU",
  authDomain: "tapu-41247.firebaseapp.com",
  databaseURL: "https://tapu-41247-default-rtdb.firebaseio.com",
  projectId: "tapu-41247",
  storageBucket: "tapu-41247.appspot.com",
  messagingSenderId: "680985669525",
  appId: "1:680985669525:web:79d120a5a437f9a1c4109c"
});

export const functions = getFunctions(app);
export const database = getFirestore(app);
export const authentication = getAuth(app);

if (import.meta.env.DEV) {
  connectFirestoreEmulator(database, '127.0.0.1', 8080);
  connectAuthEmulator(authentication, 'http://127.0.0.1:9099', {
    disableWarnings: true
  });
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export const usersRef = collection(database, 'users');

