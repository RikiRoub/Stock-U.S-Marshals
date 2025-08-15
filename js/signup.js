import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js"; // Assure-toi que ce fichier contient ta config Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    // Récupérer les rôles sélectionnés (checkboxes ou multiselect)
    const roleCheckboxes = document.querySelectorAll('input[name="roles"]:checked');
    const roles = Array.from(roleCheckboxes).map(cb => cb.value);

    if (roles.length === 0) {
        alert("Veuillez sélectionner au moins un rôle !");
        return;
    }

    try {
        // Création du compte Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Créer le document user dans Firestore avec les rôles
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            roles: roles, // tableau de rôles
            createdAt: new Date()
        });

        alert("Compte créé avec succès !");
        // Rediriger ou réinitialiser le formulaire
        document.getElementById("signup-form").reset();

    } catch (error) {
        console.error("Erreur lors de la création du compte :", error);
        alert(error.message);
    }
});
