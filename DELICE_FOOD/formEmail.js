// Fonction pour obtenir les paramètres de l'URL
function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        prix: params.get('prix'),
    };
}

// Récupérer les informations du produit
async function afficherProduit() {
    const { id, prix } = getParams();
    
    try{
        const response = await fetch(`https://the-mexican-food-db.p.rapidapi.com/${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'the-mexican-food-db.p.rapidapi.com',
                'X-RapidAPI-Key': '2dd5fc854bmsh7a4972c0a4997aap19fcafjsn980fdc023e08'
            }
        });
        
        if(!response.ok){
            throw new Error('Erreur lors de la recuperation des donnee');
        }
    
    
    const produit = await response.json();

    afficherRecettes(produit, prix);
    
    }catch(error){
        console.error("Erreur :", error);
    }
}

function afficherRecettes(recettes, prixAleatoire) {
    const container = document.querySelector(".speciality");
    container.classList.add('d-flex', 'gap-5', 'justify-content-between', 'align-items-center');

    const recipeElement = document.createElement('div');
    recipeElement.classList.add('d-flex', 'flex-column', 'justify-content-center', 'menu-items');
        
    recipeElement.innerHTML = `
        <img class="img-plat" src="${recettes.image}" alt="${recettes.title}"">
        <div class="d-flex flex-column plat-special">
            <h4 class="noms-menu">${recettes.title}</h4>
            <p>Difficulty: ${recettes.difficulty}</p>  
            <p class="price">${prixAleatoire}</p>
        </div>
    `;// style="width: 200px; height: auto;

    //Afficher le prix total a l'ajout du nombre
    // qte.addEventListener('input', function(){
    //     const qteValue = qte.value;
    //     if(qteValue < 1){
    //         qteValue = 1;
    //     }
    //     const prixTotal = qte.value * prixAleatoire;
    //     elements.textContent = `Prix Total : ${prixTotal} CFA`;
    // });

    container.appendChild(recipeElement); // Ajouter l'élément de recette au DOM
    
}

// Appel de la fonction pour afficher le produit
afficherProduit();

let transporter;

//Configuration EmailJS

(function(){
    emailjs.init({
        publicKey: "2NYBNH3ZNdDzfWIlr",
    });

    function sendEmail(){
        //Recuperation des donnees du formulaire ou d'autres sources
        const name = document.getElementById("nameClt").value;
        const email = document.getElementById("emailClt").value;
        const quantity = document.getElementById("nbreCmd").value;

        const nomPlat = document.querySelector(".noms-menu").textContent; // Récupérez le nom du plat
        const difficultePlat = document.querySelector(".plat-special p").textContent; // Récupérez la difficulté
        const prixPlat = document.querySelector(".price").textContent;

        emailjs.send(
            service_a2pfcjj, 
            template_vvthopg, 
            {
                to_name: name,
                from_name: email,
                message: `Bonjour le client ${name} avec l'email : ${email} commande le plat suivant:
                \nNom du plat: ${nomPlat}\nDifficulte: ${difficultePlat}\nPrix: ${prixPlat}
                \nQuantite: ${quantity}\nVous avez du pain sur la planche depechez vous !`
            }
        )
        .then(function(response){
            console.log('SUCCES&nbsp;!', response.status, response.text);
            alert('Email envoye avec succes !');
        })
        .catch(function(error){
            console.log('FAILED...', error);
            alert('Erreur lors de l\'envoie de l\'Email. Veuillez reessayer');
        });
    }
    //Appel de la fonxtion pour l'envoyer l'Email
    document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    sendEmail();
    });
})();


/*Envoie de la commande*/
// document.getElementById("orderForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Empêche le rechargement de la page

//     // Récupérer les valeurs des champs
//     const name = document.getElementById("nameClt").value;
//     const email = document.getElementById("emailClt").value;
//     const quantity = document.getElementById("nbreCmd").value;

//     //const nodemailer = require('nodemailer');

//     //Recuperer les informations du plats choisit 
//     const platElement = document.querySelector('.plat-special');
//     const nomPlat = platElement.getAttribute("data-nom");
//     const difficultePlat = platElement.getAttribute("data-difficulte");
//     const prixPlat = platElement.getAttribute("data-prix");

//     //Creations du contenue de l'email a la reception
//     const emailContent = `Bonjour le client ${name} avec l'email : ${email} commande le plat suivant:
//     \nNom du plat: ${nomPlat}\nDifficulte: ${difficultePlat}\nPrix: ${prixPlat}
//     \nQuantite: ${quantity}\nVous avez du pain sur la planche depechez vous !`; 

//     alert("Envoie de la commande en cours...")

//     //Charger nodemailer dans mon fichier js
//     let script = document.createElement('script');
//     script.src = 'https://unpkg.com/nodemailer/browser/nodemailer.browser.min.js';
//     document.head.appendChild(script);

//     script.onload = function() {
//         // Créer un transporter SMTP
//         nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: 'franckmaniche6@gmail.com',
//                 pass: 'gatine6Francis'
//             }
//         }).sendMail ({
//             from: email,
//             to: 'franckmaniche6@gmail.com',
//             subject: 'Commande d\'un plat:' + nomPlat,
//             text: emailContent                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
//         }, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 alert('Erreur lors de l\'envoie de la commande. Veuillez ressayer !');
//             } else {
//                 console.log('Email envoyé:' + info.response);
//                 alert('Email envoyé avec succes !');
//             }
//         });
//     };
// });