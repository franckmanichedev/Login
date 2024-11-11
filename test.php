<?php
    include "connect.php";

    $passwordError = "";

    if($_SERVER["REQUEST_METHOD"] == "POST"){

            $username = $con->real_escape_string($_POST["email"]);
            $userpassword = $_POST["password"];

            $sql = "SELECT User_email, User_password FROM user WHERE User_name = '$username'";
            $result = $con->query($sql);

            if($result->num_rows > 0){
                $row = $result->fetch_assoc();
                $hashed_password = $row["User_password"];

                if(password_verify($userpassword, $hashed_password)) {
                    //Authentification reussit
                    session_start();//Demarre une nouvelle session pour cet user
                    $_SESSION["user_name"] = $row["User_name"]; //Stocke l'id de l'user dans la session
                    $_SESSION["user_email"] = $usermail; //Stocke l'email de l'user dans la session

                    //Redirection vers le home page
                    header("Location: DELICE_FOOD/delicefood.html");
                    exit();
                } else {
                    $passwordError = "Mot de passe incorrect";
                }
            } else {
                echo "Utilisateur non trouve";
            }
    }
?>