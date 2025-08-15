import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js"; // Ta config Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Récupérer les rôles de Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (!userDoc.exists()) {
            alert("Utilisateur non trouvé dans Firestore !");
            return;
        }

        const userData = userDoc.data();
        const roles = userData.roles || [];

        if (roles.length === 0) {
            alert("Utilisateur sans rôle attribué !");
            return;
        }

        // Redirection selon les rôles
        // Exemple : si l’utilisateur a AFD ou USMS, le rediriger vers armes_a_feu.html
        if (roles.includes("AFD")) {
            window.location.href = "afd/armes_a_feu.html";
        } else if (roles.includes("USMS")) {
            window.location.href = "afd/arme_blanche.html"; // exemple
        } else {
            window.location.href = "dashboard.html"; // page par défaut
        }

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert(error.message);
    }
});
