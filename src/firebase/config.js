import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNS6dObL4PXZCNaSxcCkoSJEE5vMSCyrA",
  authDomain: "proyecto-ecommerce-9221f.firebaseapp.com",
  projectId: "proyecto-ecommerce-9221f",
  storageBucket: "proyecto-ecommerce-9221f.firebasestorage.app",
  messagingSenderId: "776097288719",
  appId: "1:776097288719:web:e845634d6fa7af5725497a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const COLECCION_PRODUCTOS = "productos";
