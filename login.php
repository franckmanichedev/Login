<?php
    include "connect.php";

    $passwordError = "";

    if($_SERVER["REQUEST_METHOD"] == "POST"){

        //Verification de la precense des champs 'email' et 'password' dans POST
        //if(isset($_POST["email"]) && isset($_POST["password"])){
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
        //} else {
            //echo "Veuiller remplir tous les champs du formulaire.";
        //}
    }
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogIn</title>
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
                    <form method="POST" action="">
                        <h2>SFM employed<br>connect</h2>
                        <div class="inputbox">
                            <img class="icon" src="envelope-solid.png" height="15px" width="20px">
                            <input  id="emailLog" type="text" name="email" required>
                            <label for="">Your name</label>
                        </div>
                        <div class="inputbox">
                            <input id="passwordLog" type="password" name="password" required>
                            <label for="">Password</label>
                        </div>
                        <p class="otherUseIt" style="color: red; margin: -1em 0 3em; width: 80%; text-align: center;"><?php echo !empty($passwordError) ? $passwordError : ''; ?></p> 
                        <div class="forget">
                            <label for="">
                                <input type="checkbox">Remember me<a href="#">Forget Password</a>
                            </label>
                        </div>
                        <button id="login" type="submit">Login</button>
                        <div class="register">
                            <p>Don't have an account? <a href="signup.php">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</body>
</html>