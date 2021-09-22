//HOSTING DE L'APP//

if (location.hostname === "127.0.0.1") {
 var Urlapi="http://localhost:3000"
console.log(Urlapi)
} else {
  var Urlapi ="https://secret-cliffs-34868.herokuapp.com"
}


//RÉCUPÉRATION DES INFORMATIONS DE L'API ET AFFICHAGE DE RESULTAT EN HTML//
if (document.getElementById("mouv")) {
  fetch(`${Urlapi}/api/cameras`)
    .then(Resultatcamera => Resultatcamera.json()
      .then(cameras => {
        let AffichageCamera = `<ul style="display:flex; flex-wrap:wrap; margin:auto; align-items : center;justify-content:center;">`;
        for (let camera of cameras) {
          AffichageCamera += `<li   class="card cardtransfo"  >
                <img class="card-img-top" src="${camera.imageUrl}" alt="Appareil photo">
                <a href="produit.html?article=${camera._id}"  class="stretched-link card-body">
                  <p class="card-text text-dark">${"Modèle :" + " " + camera.name}</p>
                </a>
              </li>`;
        }
        AffichageCamera += '</ul>';
        document.getElementById("mouv").innerHTML = AffichageCamera;

      })
      .catch(function () { console.log('ne peut fetch la page index car vous êtes sur la mauvaise page') }
      ));

}




//recuperer l'id du produit via l'url//
function getArticleId() {
  return new URL(location.href).searchParams.get("article");
}
const id = getArticleId()

//afficher l'article correspond a son id sur la page produit//
if (document.getElementById("mouv2")) {
  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(resultat => resultat.json()
      .then(data2 => {
        let Displaylenses
        let affichage2 = `<div class="card cart-card" >
      <img class="card-img-top" src="${data2.imageUrl}" alt="Appareil photo">
      <div style="display:flex;justify-content-center;flex-direction:column" class="card-body">
        <p  class="card-text"><span>Modèle :</span>${" " + " " + data2.name}</p>
        <p  class="card-text"><span>Prix :</span>${" " + (data2.price / 100) + " " + "€"}</p>
        <label class="forlenses card-text"  for="lense-select">Lentilles</label>
        <select  class="form-group" id="lense-select"></select>
        <button id=${data2.id}  type="button" onClick="isclicked(id)"   class="btn btn-primary btn-sm touch ">Selectionner</button>
        <button id=${data2._id}  type="submit" onclick="deleletItem(id)" class="btn btn-primary btn-sm touch ">Supprimer du panier</button>
      </div>
    </div>`;

        let quantity = `<div class="value text-center text-warning fs-4">Quantité: ${localStorage.getItem(id)}</div>`
        let Notincart = `<div class="value text-center text-warning fs-4" >Ce produit n'est pas dans votre panier</div>`

        //boucle pour les lentilles//

        for (let lense of (data2.lenses)) {
          Displaylenses += `<option value="${lense}">${lense}</option>`
        };
        document.getElementById("mouv2").innerHTML = affichage2;
        document.getElementById("lense-select").innerHTML = Displaylenses;

        if (localStorage.getItem(id) == null) {
          document.getElementById("quantity").innerHTML = Notincart;
        } else {
          document.getElementById("quantity").innerHTML = quantity;
        }
      }))
};


//CHOISIR PRODUIT PAGE PRODUIT//
function isclicked() {
  if (localStorage.getItem(id)) {
    let Base = parseInt((localStorage.getItem(id)))
    localStorage.setItem(id, ++Base);
    alert('vous en choisissez un de plus');
    reloadPage();
  } else {
    localStorage.setItem(id, 1)
    alert('vous avez sélectionné ce produit')
    reloadPage();
  }


}
//DELETE ONE ITEM PAGE PRODUIT//
function deleletItem() {
  localStorage.removeItem(id, id);
  alert('vous avez enlevé ce produit du panier')
  reloadPage();
};
//DELETE LAST ITEM PAGE PANIER//
function deleteLastitem() {
  localStorage.removeItem(localStorage.key(localStorage.length - 1))
  if (localStorage.length === 0) {
    sessionStorage.removeItem("prix")
  }
}
//DELETE ALL ITEM PAGE PANIER//
function deleteAllitem() {
  localStorage.clear();
  sessionStorage.removeItem("Idorder")
  sessionStorage.removeItem("prix")
};
//reloadPage//
function reloadPage() {
  window.location.reload();
}
//RECUPERER LE LOCALSTORAGE EN TABLEAU SUR LA PAGE PANIER//
function allStorage() {
  var values = [];
  var AffichageCamera = "";
  var somme = 0;
  for (let i = 0; i < localStorage.length; i++) {
    values.push(Object.keys(localStorage)[i]);

    fetch(`http://localhost:3000/api/cameras/${values[i]}`)
      .then(Resultatcamera => Resultatcamera.json()
        .then(cameras => {
          if (document.getElementById("mouv3")) {
            AffichageCamera += `<div   class="card cardmouv cardpic">
          <img class="card-img-top" src="${cameras.imageUrl}" alt="Appareil photo">
          <a href="produit.html?article=${cameras._id}" style="text-decoration:none" class=" stretched-link card-body">
            <p class="card-text my-1 text-dark">${"Modèle :" + " " + cameras.name}</p>
            <p  class="card-text text-dark "><span>Prix :</span>${" " + (cameras.price / 100) + " " + "€"}</p>
            <p class="quantity" >(${(localStorage.getItem(cameras._id))})</p>
          </a>
        </div>`;
            document.getElementById("mouv3").innerHTML = AffichageCamera;
            //COUT TOTAL//
            somme += (localStorage.getItem(cameras._id)) * cameras.price / 100;
            Price.push(somme)
            console.log(Price)
            document.getElementById("total").innerHTML = "Coût total :" + " " + somme + "€";
            //STOCKAGE DU COÛT TOTAL DANS LE SESSION STORAGE//
            sessionStorage.setItem("prix", somme);

          }
        }));
  }
}
//STOCKAGE DU PRIX//
var Price = []

//REGEX DE VALIDATION//
function isValidated(x, id) {
  if (/^[a-zA-z\s]+$/.test(x)) {
    let valide = '<p class=" alert alert-success fs-6">Valide !</p>'
    document.getElementById(id).innerHTML = valide
  } else {
    let Nonvalide = '<p id="nonvalide" class="alert alert-danger fs-6">Non valide ! veuillez remplir</p>'
    document.getElementById(id).innerHTML = Nonvalide
  }
}

//REGEX DE VALIDATION ADRESS//
function validAdress(x, id) {
  if (/[0-9\\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}/.test(x)) {
    let valide = '<p class="alert alert-success fs-6">Valide !</p>'
    document.getElementById(id).innerHTML = valide
  } else {
    let Nonvalide = '<p id="nonvalide" class="alert alert-danger fs-6">Non valide ! veuillez remplir</p>'
    document.getElementById(id).innerHTML = Nonvalide
    document.getElementById("adress").value = ""
  }
}

//REGEX DE VALIDATION EMAIL//
function validMail(x, id) {
  if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(x)) {
    let valide = '<p class=" alert alert-success fs-6">Valide !</i></p>'
    document.getElementById(id).innerHTML = valide
  } else {
    let Nonvalide = '<p id="nonvalide" class="alert alert-danger fs-6">Non valide ! veuillez remplir</p>'
    document.getElementById(id).innerHTML = Nonvalide
    document.getElementById("email").value = ""

  }
}

//ECOUTE DU FORMULAIRE//

//PRENOM//

const Prenom = document.getElementById("firstName");
if (document.getElementById("mouv3")) {
  Prenom.addEventListener('change', getName);
  function getName() {

    isValidated(Prenom.value, "validate")
    contact["firstName"] = `${Prenom.value}`

  }
}
//NOM//
const Nom = document.getElementById("lastName");
if (document.getElementById("mouv3")) {
  Nom.addEventListener('change', getlastName);
  function getlastName() {

    isValidated(Nom.value, "validate1");
    contact["lastName"] = `${Nom.value}`
  }
}

//ADRESS//
const Adress = document.getElementById("adress");
if (document.getElementById("mouv3")) {
  Adress.addEventListener('change', getadress);
  function getadress() {

    validAdress(Adress.value, "validate2");
    contact["address"] = `${Adress.value}`
  }
}


//VILLE//
const City = document.getElementById("city");
if (document.getElementById("mouv3")) {
  City.addEventListener('change', getcity);
  function getcity() {

    isValidated(City.value, "validate3")
    contact["city"] = `${City.value}`

  }
}


//EMAIL//
const Email = document.getElementById("email");
if (document.getElementById("mouv3")) {
  Email.addEventListener('change', getemail);
  function getemail() {
    validMail(Email.value, "validate4");
    console.log(Email.value)
    contact["email"] = `${Email.value}`
  }
}
//formulaire//

//CREATION DE L'OBJET CONTACT//

var contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: ""
}
//CONSTANT QUI VERIFIE SI L'OBJECT CONTACT EST VIDE OU PAS //
const isEmpty = Object.values(contact).every(x => x === null || x === '');

//RECUPÉRATION DES OBJECT DANS LE LOCALSTORAGE POUR L'APPEL POST//
var products = Object.keys(localStorage)


//APPEL POST À L'API//
function Forms() {
  event.preventDefault();
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify({ contact, products }),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(Resultat => Resultat.json()
      .then(POST => {
        console.log(POST)
        sessionStorage.setItem(`Idorder`, `${POST.orderId}`)
        if (document.getElementById("nonvalide")) {
          alert('Le formulaire est invalide')
        } else if (POST.orderId && (sessionStorage.getItem("prix")) && isEmpty !== false) {
          window.location.href = "commande.html"

        } else {
          alert('Veuillez selectionner un produit et/ou remplir le formulaire')
        }
      }

      ));



}



//AFFICHER L'ID DE COMMANDE SUR LA PAGE COMMANDE//
var Iddecommande = sessionStorage.getItem("Idorder")
function Displayorder() {
  if (Iddecommande && document.getElementById("mouv4")) {
    document.getElementById("mouv4").innerHTML = "Commande:" + " " + Iddecommande;
  }
}
Displayorder();

//AFFICHER LE PRIX TOTAL SUR LA PAGE COMMANDE//

var Prixdecommande = sessionStorage.getItem("prix")
function Displayprice() {
  if (Prixdecommande && document.getElementById("mouv4")) {
    document.getElementById("totalC").innerText = "Merci de nous avoir choisi ! le coût total de votre commande est de :" + " " + Prixdecommande + " " + "€"
  }
}
Displayprice();


