<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "socialmedia_db";

    $con = new MySqli ($servername,$username,$password,$dbname);
    if($con -> connect_error ){
        die("ERREUR: Oops, il y'a eu une erreur de connexion." .$con -> connect_error);
    }
    echo "Felicitation, connexion resussit !";
?>