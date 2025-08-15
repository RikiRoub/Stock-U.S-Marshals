import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorElem = document.getElementById("error");

    try {
        // Connexion Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Récupérer le rôle depuis Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const role = docSnap.data().role;

            if (role === "admin") {
                window.location.href = "admin.html"; // Page admin
            } else if (role === "AFD") {
                window.location.href = "armes_a_feu.html";
            } else {
                window.location.href = "index.html"; // Page par défaut
            }
        } else {
            errorElem.textContent = "Utilisateur sans rôle attribué.";
        }
    } catch (error) {
        errorElem.textContent = "Erreur de connexion : " + error.message;
    }
});
