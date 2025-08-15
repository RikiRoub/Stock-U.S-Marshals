// Import Firebase si ce n'est pas déjà fait
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { app } from "./js/firebase-config.js"; // Assure-toi que le chemin est correct

const db = getFirestore(app);
const usersCollection = collection(db, "users"); // Collection des utilisateurs

async function creerAdmin() {
    const admin = {
        nom: "Nom Admin",       // Remplace par le nom réel
        email: "admin@example.com", // Remplace par l'email réel
        role: "admin"           // Rôle admin
    };

    try {
        const docRef = await addDoc(usersCollection, admin);
        console.log("Admin créé avec ID :", docRef.id);
        alert("Admin créé avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création de l'admin :", error);
        alert("Erreur lors de la création de l'admin, regarde la console.");
    }
}

// Appel de la fonction pour créer l'admin
creerAdmin();
