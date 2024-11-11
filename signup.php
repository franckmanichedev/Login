<?php
    include "connect.php";

    $emailError = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        $username = $con -> real_escape_string($_POST["username"]);
        $useremail = $con -> real_escape_string($_POST["useremail"]);
        $userpassword = $con -> real_escape_string($_POST["userpassword"]);

        $checkResultSQL = "SELECT * FROM user WHERE User_email = '$useremail'";
        $checkResultSQL = $con->query($checkResultSQL);

        if($checkResultSQL->num_rows > 0){
            $emailError = "Cet adresse email est deja utiliser par un autre utilisateur...";
        } else {
            //Hasher (crypter) le mot de passe de l'utilisateur
            $hashpwd = password_hash($userpassword, PASSWORD_DEFAULT);
            
            $sql = "INSERT INTO user (User_name, User_email, User_password) VALUES ('$username', '$useremail', '$hashpwd')";
            
            if($con -> query($sql) === TRUE){
                //echo ("Utilisateur ajouter avec succes !");
                header("Location: login.php");
                exit();
            } else {
                echo "Erreur" . $sql . "<br>" . $con -> error;
            }
        }
    }
    $con -> close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SignUp</title>
    <link rel="stylesheet" href="formcss.css">
    <script>
        window.addEventListener("load", function() {
            document.body.style.backgroundImage = "none";
        });
    </script>
</head>
<body>
    <section>
        <!-- <div class="color"></div>
        <div class="color"></div>
        <div class="color"></div> -->
        <div class="box">
            <div class="square" style="--i:1;"></div>
            <div class="square" style="--i:2;"></div>
            <div class="square" style="--i:3;"></div>
            <div class="square" style="--i:4;"></div>
            <div class="square" style="--i:5;"></div>
            <div class="form-box">
                <div class="form-value">
                    <form action="" method="POST">
                        <img src="SkillsForM2.png" class="Skillsform-logo" alt="SkillsForMlogo" height="50px" width= "50px" style="padding-top: 25px;">
                        <h2>SFM register<br>employed</h2>
                        <div class="inputbox">
                            <img class="icon" src="user-solid.png" height="15px" width="15px">
                            <input id="username" name="username" type="text" required>
                            <label for="">User name :</label>
                        </div>
                        <div class="inputbox">
                            <img class="icon" src="envelope-solid.png" height="15px" width="15px">
                            <input id="useremail" name="useremail" type="email" required>
                            <label for="">Your e-mail :</label>
                        </div>
                        <p class="otherUseIt" style="color: red; margin: -1em 0 0.5em; width: 80%; text-align: center;"><?php echo !empty($emailError) ? $emailError : ''; ?></p> 
                        <div class="inputbox">
                            <input id="userpassword" name="userpassword" type="password" required>
                            <label for="">Password :</label>
                        </div>
                        
                        <div class="other-connect">
                            <p>Essayer d'une autre maniere</p>
                            <div class="option">
                                <a href="#"><img src="linkedin.png"></a>
                                <a href="#"><img src="github.png"></a>
                                <a href="#"><img src="discord.png"></a>
                            </div>
                        </div>
                        <button id="signup" name="signup" type="submit">Create</button>
                        <div class="register">
                            <p>I have an account <a href="login.php">Connect</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</body>
</html>