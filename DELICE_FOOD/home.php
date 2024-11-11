<?php
    session_start(); // Démarre la session

    // Vérification si l'utilisateur est authentifié
    if (isset($_SESSION["user_id"])) {
        // Affichage du message de bienvenue
        echo "Bienvenue " . $_SESSION["username"] . ", vous êtes maintenant connecté.";
    } else {
        // Redirection vers la page de connexion
        header("Location: connexion.php"); 
        exit();
    }
?>