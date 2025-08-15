// Import des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "TA_API_KEY",
    authDomain: "TON_PROJECT_ID.firebaseapp.com",
    projectId: "TON_PROJECT_ID",
    storageBucket: "TON_PROJECT_ID.appspot.com",
    messagingSenderId: "TON_MESSAGING_SENDER_ID",
    appId: "TON_APP_ID"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
