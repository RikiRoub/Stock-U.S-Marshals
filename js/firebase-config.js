// Import des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDArc4SUw3MO06QJwD6xzEKsuKFsfVcjsQ",
  authDomain: "gestion-stock-d63d0.firebaseapp.com",
  projectId: "gestion-stock-d63d0",
  storageBucket: "gestion-stock-d63d0.firebasestorage.app",
  messagingSenderId: "865227689174",
  appId: "1:865227689174:web:213e7f6e44f183c6928d77",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
