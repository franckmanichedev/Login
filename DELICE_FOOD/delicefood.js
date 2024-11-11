//Chargement du site au demarrage
window.onload = function(){
  setTimeout(function() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  }, 100);
}

//Appliquer le sticky lorsque l'utilisateur commence a scroller

const header = document.querySelector('.site-header');
const sticky = header.offsetTop; // Position de départ du header

window.onscroll = function() {
    if (window.scrolly > sticky) {
        header.classList.add('sticky'); // Ajoute la classe "sticky"
    } else {
        header.classList.remove('sticky'); // Retire la classe "sticky"
    }
};

//Activation de l'animation de l'image et du cadre au scroll

window.addEventListener('scroll', function() {
  const element = document.querySelector('.img-cadre');
  const position = element.getBoundingClientRect();

  if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add('show');
  }
});

//Afficher et masquer le menu

const openBtn = document.querySelector('.hamburger-btn');
const nameResto = document.querySelector('.nameResto');
const lien = document.querySelector('.navbar');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () => {
  closeBtn.style.display = 'block';
  openBtn.style.display = 'none';
  nameResto.style.display = 'none';
  lien.classList.add("active");
});

closeBtn.addEventListener('click', () => {
  closeBtn.style.display = 'none';
  openBtn.style.display = 'block';
  nameResto.style.display = 'block';
  lien.classList.remove("active");
});

//Activation de l'animation de l'image a l'approche tu scrolling

const imgContact = document.querySelector('.contact-img');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      imgContact.classList.add('animate');
      observer.unobserve(imgContact);
    }
  });
}, {threshold: 0.5});

observer.observe(imgContact);

//Fonction pour afficher la location de l'entreprise
function initialize() {
  // Créer un objet `Map` pour votre carte
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.8584, lng: 2.2945 }, // Coordonnées du centre de la carte (ici, Paris)
    zoom: 13, // Niveau de zoom
    mapTypeId: 'roadmap', // Type de carte (route, satellite, etc.)
  });

  // Ajouter un marqueur à l'emplacement de l'entreprise
  new google.maps.Marker({
    position: { lat: 48.8584, lng: 2.2945 }, // Coordonnées du marqueur (ici, Paris)
    map: map, // Associer le marqueur à la carte
  });
}


//Fonction asynchrone pour afficher les menus

const nomsMenu = document.querySelector(".noms-menu");

async function lireRepas() {
  const myHeaders = new Headers();
  myHeaders.append("X-RapidAPI-Host", "the-mexican-food-db.p.rapidapi.com");
  myHeaders.append("X-RapidAPI-Key", "2dd5fc854bmsh7a4972c0a4997aap19fcafjsn980fdc023e08");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://the-mexican-food-db.p.rapidapi.com/", requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Utiliser response.json() au lieu de response.text()
    console.log(result); // Affiche les données retournées
    
    afficherRecettes(result); // Appelle la fonction pour afficher les recettes

  } catch (error) {
    console.error("Error:", error);
  }
}

//Fonction pour afficher les repas chacun dans un card

function afficherRecettes(recettes, limite = 20) {
  const container = document.querySelector(".speciality");
  container.classList.add('d-flex', 'gap-5', 'justify-content-between', 'align-items-center');

  //Limiter le nombre de resultat a afficher avec slice()
  const recettesAffichees = recettes.slice(0, limite);

  //Boucle à travers chaque recette et créer un élément pour l'afficher
  recettesAffichees.forEach((recipe) => {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('d-flex', 'flex-column', 'justify-content-center', 'menu-items'); 
    
    recipeElement.innerHTML = `
      <img class="img-plat" src="${recipe.image}" alt="${recipe.title}"">
      <div class="d-flex flex-column plat-special">
        <h4 class="noms-menu">${recipe.title}</h4>
        <p>Difficulty: ${recipe.difficulty}</p>
        <p class="price"></p>
      </div>
      <button class="buy">Acheter</button>
    `;// style="width: 200px; height: auto;

    container.appendChild(recipeElement); // Ajouter l'élément de recette au DOM

    //Attribution des prix aleatoirement
    const prixPossibles = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000]; // Tableau de prix possibles
    const elementPrix = document.querySelectorAll('.price'); // Obtenez l'élément HTML avec l'ID 'price'

    let prixAleatoire = localStorage.getItem('prixAleatoire');
    if(!prixAleatoire){
      const indexAleatoire = Math.floor(Math.random() * prixPossibles.length); // Index aléatoire
      prixAleatoire = prixPossibles[indexAleatoire]; // Le prix aléatoire
      localStorage.setItem('prixAleatoire', prixAleatoire);
    };
      // Affichage du prix
      
    // Génération du prix aléatoire
    elementPrix.forEach(element => {
      element.textContent = prixAleatoire; // Affiche le prix dans l'élément HTML
    });
    
    //Recuperer les donnees du repas selectionne par l'utilisateur et les affiche dans le formulaire
    recipeElement.querySelector(".buy").addEventListener('click', () => {
      const recipeId = recipe.id;
      console.log(recipeId);
      const url = `formulaire.html?id=${recipeId}`;
      window.location.href = url;
    });
    
    //Recuperer le prix genere aleatoirement du repas selectionne par l'utilisateur et les affiche dans le formulaire
    //window.location.href = `formulaire.html?valeur=${indexAleatoire}`;
  });
}

console.log(lireRepas());

// /*Rechercher un repas*/

const valueFoodSearch = document.querySelector('.search-bar');
const btnSearch = document.querySelector('.search');

btnSearch.addEventListener('click', rechercherProduit);

async function rechercherProduit(){
  const searchFood = valueFoodSearch.value.trim();

  if(searchFood !== ''){
    try{
      const requestOptions = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '2dd5fc854bmsh7a4972c0a4997aap19fcafjsn980fdc023e08', // Remplacez par votre clé API
          'X-RapidAPI-Host': 'the-mexican-food-db.p.rapidapi.com' 
        }
      };
      const response = await fetch(`https://the-mexican-food-db.p.rapidapi.com/search.php?s=${searchFood}`, requestOptions);
      console.log(data);

      if(!response.ok) {
        throw new Error ('Erreur de la requete: ' + response.status);
      }

      const data = await response.json();
      console.log(data);

      displayResults(data);
    }
    catch(error){
      console.error(error);
      alert('Erreur lors de la recherche. Veuillez reessayer.');
    } finally {
      valueFoodSearch.value = '';
    }
  }
  else{
    alert('Veuillez entrer un nom du plat');
  }
}

function displayResults(data){
  const container = document.querySelector(".speciality");
  container.classList.add('d-flex', 'gap-5', 'justify-content-between', 'align-items-center');

  //Boucle à travers chaque recette et créer un élément pour l'afficher
  recettesAffichees.forEach((recipe) => {
    const platItem = document.createElement('div');
    platItem.classList.add('d-flex', 'flex-column', 'justify-content-center', 'menu-items'); 
    
    platItem.innerHTML = `
      <img class="img-plat" src="${recipe.image}" alt="${recipe.title}"">
      <div class="d-flex flex-column plat-special">
        <h4 class="noms-menu">${recipe.title}</h4>
        <p>Difficulty: ${recipe.difficulty}</p>
        <p class="price"></p>
      </div>
      <button class="buy">Acheter</button>
    `;
    container.appendChild(platItem);
  });

}