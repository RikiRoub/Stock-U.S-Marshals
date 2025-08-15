import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Créer le document Firestore pour cet utilisateur
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            roles: [], // pas de rôle par défaut, tu peux mettre ["AFD"] par exemple
            date: serverTimestamp(),
            details: "",
            valeur: 0
        });

        alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        window.location.href = "login.html"; // redirection vers la page login

    } catch (error) {
        console.error("Erreur lors de la création du compte :", error);
        alert(error.message);
    }
});
