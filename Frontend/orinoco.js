
/* TEST récupération des informations de l'api et affichage de resultat en html*/
fetch("http://localhost:3000/api/cameras")
  .then(Resultatcamera => Resultatcamera.json()
    .then(cameras => {
      let AffichageCamera = `<ul style="display:flex; flex-wrap:wrap; margin:auto; align-items : center;justify-content:center;">`;
      for (let camera of cameras) {
        AffichageCamera += `<li   class="card cardtransfo" >
                <img class="card-img-top" src="${camera.imageUrl}" alt="Appareil photo">
                <a href="produit.html?article=${camera._id}"  class="stretched-link card-body">
                  <p class="card-text">${"Modèle :" + " " + camera.name}</p>
                </a>
              </li>`;
      }
      AffichageCamera += '</ul>';
      document.getElementById("mouv").innerHTML = AffichageCamera;

    })
    .catch(function () { console.log('ne peut fetch la page index car vous êtes sur la mauvaise page') }
    ));






//recuperer l'id du produit via l'url//
function getArticleId() {
  return new URL(location.href).searchParams.get("article");
}
const id = getArticleId()

//afficher l'article correspond a son id sur la page produit//

fetch(`http://localhost:3000/api/cameras/${id}`)
  .then(resultat => resultat.json()
    .then(data2 => {
      let Displaylenses
      let affichage2 = `<div class="card cart-card">
      <img class="card-img-top" src="${data2.imageUrl}" alt="Appareil photo">
      <div style="display:flex;justify-content-center;flex-direction:column" class="card-body">
        <p  class="card-text"><span>Modèle :</span>${" " + " " + data2.name}</p>
        <p  class="card-text"><span>Prix :</span>${" " + (data2.price / 100) + " " + "€"}</p>
        <label class="forlenses"  for="lense-select">Lentilles</label>
        <select  class="form-group" id="lense-select"></select>
  
        
        <button id=${data2.id}  type="button" onClick="isclicked(id)"   class="btn btn-primary btn-sm touch ">Selectionner</button>
        <button id=${data2._id}  type="submit" onclick="deleletItem(id)" class="btn btn-primary btn-sm touch ">Supprimer du panier</button>
      </div>
    </div>`;
      //boucle pour les lentilles//
      for (let lense of (data2.lenses)) {
        Displaylenses += `<option value="${lense}">${lense}</option>`
      };
      document.getElementById("mouv2").innerHTML = affichage2;
      document.getElementById("lense-select").innerHTML = Displaylenses;
    }));


//choisir produit//
function isclicked() {
  localStorage.setItem(id, id);
  alert('vous avez choisi ce produit')
}
//DELETE ONE ITEM//
function deleletItem() {
  localStorage.removeItem(id, id);
  alert('vous avez enlevé ce produit du panier')
};
//DELETE ALL ITEM FIN//
function deleteAllitem() {
  localStorage.clear();
};
//recuperer le localstorage en tableau sur la page panier//
function allStorage() {
  ///TOTAL VAR///
  var nombresTot = [];

  ///TOTAL VAR///
  let values = [];
  var AffichageCamera = "";
  var somme = 0;
  for (let i = 0; i < localStorage.length; i++) {
    values.push(localStorage.getItem(localStorage.key(i)));

    fetch(`http://localhost:3000/api/cameras/${values[i]}`)
      .then(Resultatcamera => Resultatcamera.json()
        .then(cameras => {
          AffichageCamera += `<div   class="card cardmouv cardpic">
          <img class="card-img-top" src="${cameras.imageUrl}" alt="Appareil photo">
          <a href="produit.html?article=${cameras._id}" style="text-decoration:none" class=" stretched-link card-body">
            <p class="card-text">${"Modèle :" + " " + cameras.name}</p>
          </a>
        </div>`;
          document.getElementById("mouv3").innerHTML = AffichageCamera;

          //COUT TOTAL//
          somme += cameras.price / 100;
          document.getElementById("total").innerHTML = somme + "€";
          //COUT TOTAL FIN//


          /*nombresTot.push(cameras.price / 100)
          console.log(nombresTot)
          for (var i = 0, somme = 0; i < nombresTot.length; somme += nombresTot[i++]);
          document.getElementById("total").innerHTML = somme + "€";*/


        }));

  }

}



//regex de validation//
function isValidated(x, id) {
  if (/^([A-Za-z])+$/.test(x)) {
    let valide = '<p class="text-success fs-6">Valide !</p>'
    document.getElementById(id).innerHTML = valide
  } else {
    let Nonvalide = '<p class="text-danger fs-6">Non valide ! veuillez remplir</p>'
    document.getElementById(id).innerHTML = Nonvalide
  }
}

//ecoute du formulaire//
//PRENOM//
const Prenom = document.getElementById("firstName");
Prenom.addEventListener('change', getName);
function getName() {

  isValidated(Prenom.value, "validate");
  return (Prenom.value)
}
const getNaming = getName();
//NOM//
const Nom = document.getElementById("lastName");
Nom.addEventListener('change', getlastName);
function getlastName() {

  isValidated(Nom.value, "validate1");
  return (Nom.value)
}
const getlastNaming = getlastName()

//ADRESS//
const Adress = document.getElementById("adress");
Adress.addEventListener('change', getadress);
function getadress() {

  isValidated(Adress.value, "validate2");
  return (Adress.value)
}
const getadressing = getadress()

//VILLE//
const City = document.getElementById("city");
City.addEventListener('change', getcity);
function getcity() {

  isValidated(City.value, "validate3")
  return (City.value)

}
const getCitying = getcity()

//EMAIL//
const Email = document.getElementById("email");
Email.addEventListener('change', getemail);
function getemail() {
  console.log(Email.value)
  return (Email.value)

}
const getEmailing = getemail()



//formulaire//

//création de l'objet contact//


var contact = {
  firstName: `sdsds`,
  lastName: `sdsd`,
  address: `dssds`,
  city: `dsdsds`,
  email: `${getEmailing}`,
}
//recupération des object dans le localstorage pour l'appel POST//
var products = Object.keys(localStorage)


//appel à l'api//
function sendForm() {
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify({ contact, products }),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(Resultat => Resultat.json()
      .then(data => {
        console.log(data)
      }))
}