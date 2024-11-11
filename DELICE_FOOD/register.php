<?php
    include "connect.php"; // Fichier connect.php contenant les informations de connexion à la base de données

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $con->real_escape_string($_POST["username"]);
        $password = $con->real_escape_string($_POST["password"]);

        // Hashage du mot de passe avant de l'enregistrer dans la base de données
        //$hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insertion du nouvel utilisateur dans la base de données
        $sql = "INSERT INTO users (username, `password`) VALUES ('$username', '$password')";

        if ($con->query($sql) === TRUE) {
            echo "Nouvel utilisateur créé avec succès.";
        } else {
            echo "Erreur lors de la création de l'utilisateur : " . $con->error;
        }
    }
?>

<!DOCTYPE html>
<html>
<head>
    <title>Inscription</title>
</head>
<body>
    <h2>Inscription</h2>
    <form method="POST" action="register.php">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit">S'inscrire</button>
    </form>
</body>
</html>