<?php
    include "connect.php"; // Fichier connect.php contenant les informations de connexion à la base de données

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $con->real_escape_string($_POST["username"]);
        $password = $_POST["password"];

        // Vérification de l'existence de l'utilisateur dans la base de données
        $sql = "SELECT * FROM users WHERE username = '$username'";
        $result = $con->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Vérification du mot de passe (avec hash)
            if (password_verify($password, $row["password"])) {
                // Authentification réussie
                session_start(); // Démarre une session
                $_SESSION["user_id"] = $row["id"]; // Stocke l'ID de l'utilisateur dans la session
                $_SESSION["username"] = $username; // Stocke le nom d'utilisateur dans la session

                // Redirection vers la page d'accueil
                header("Location: home.php"); 
                exit();
            } else {
                // Mot de passe incorrect
                echo "Mot de passe incorrect.";
            }
        } else {
            // Utilisateur non trouvé
            echo "Utilisateur non trouvé.";
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>Connexion</title>
</head>
<body>
    <h2>Connexion</h2>
    <form method="POST" action="connexion.php">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">Se connecter</button>
    </form>
</body>
</html>