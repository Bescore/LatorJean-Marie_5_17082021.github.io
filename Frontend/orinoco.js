
/* TEST récupération des informations de l'api et affichage de resultat en html*/
fetch("http://localhost:3000/api/cameras")
  .then(Resultatcamera => Resultatcamera.json()
    .then(cameras => {
      let AffichageCamera = `<ul style="display:flex; flex-wrap:wrap; margin:auto; align-items : center;justify-content:center;">`;
      for (let camera of cameras) {
        AffichageCamera += `<li   class="card cardtransfo" >
                <img class="card-img-top" src="${camera.imageUrl}" alt="Appareil photo">
                <a href="produit.html?article=${camera._id}"  class="stretched-link card-body">
                  <p style="font-weight: bold" class="card-text">${"Modèle :" + " " + camera.name}</p>
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
        <button style="margin-top:10px" id=${data2._id}  type="submit" onclick="deleletItem(id)" class="btn btn-primary btn-sm touch ">Supprimer du panier</button>
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
  var nombres = [];

  ///TOTAL VAR///
  let values = [];
  let AffichageCamera = "";
  for (let i = 0; i < localStorage.length; i++) {
    values.push(localStorage.getItem(localStorage.key(i)));

    fetch(`http://localhost:3000/api/cameras/${values[i]}`)
      .then(Resultatcamera => Resultatcamera.json()
        .then(cameras => {
          AffichageCamera += `<div   class="card cardmouv cardpic">
          <img class="card-img-top" src="${cameras.imageUrl}" alt="Appareil photo">
          <a href="produit.html?article=${cameras._id}" style="text-decoration:none" class=" stretched-link card-body">
            <p style="font-weight: bold" class="card-text">${"Modèle :" + " " + cameras.name}</p>
          </a>
        </div>`;
          document.getElementById("mouv3").innerHTML = AffichageCamera;

          //COUT TOTAL//
          nombres.push(cameras.price / 100)
          console.log(nombres)
          for (var i = 0, somme = 0; i < nombres.length; somme += nombres[i++]);
          document.getElementById("total").innerHTML = somme + "€";
          //COUT TOTAL FIN//

        }));
  }
}



//regex de validation//
function isValidated() {
  if (/^([A-Za-z])+$/.test(x)) {
    let valide = '<p class="text-success fs-5">Valide !</p>'
    document.getElementById("validate").innerHTML = valide
  } else {
    let Nonvalide = '<p class="text-danger fs-5">Non valide ! veuillez remplir</p>'
    document.getElementById("validate").innerHTML = Nonvalide
  }
}
//regex de validation 1//
function isValidated1() {
  if (/^([A-Za-z])+$/.test(x)) {
    let valide = '<p class="text-success fs-5">Valide !</p>'
    document.getElementById("validate1").innerHTML = valide
  } else {
    let Nonvalide = '<p class="text-danger fs-5">Non valide ! veuillez remplir</p>'
    document.getElementById("validate1").innerHTML = Nonvalide
  }
}
//regex de validation 2//
function isValidated2() {
  if (/^([A-Za-z])+$/.test(x)) {
    let valide = '<p class="text-success fs-5">Valide !</p>'
    document.getElementById("validate2").innerHTML = valide
  } else {
    let Nonvalide = '<p class="text-danger fs-5">Non valide ! veuillez remplir</p>'
    document.getElementById("validate2").innerHTML = Nonvalide
  }
}

//regex de validation 3//
function isValidated3() {
  if (/^([A-Za-z])+$/.test(x)) {
    let valide = '<p class="text-success fs-5">Valide !</p>'
    document.getElementById("validate3").innerHTML = valide
  } else {
    let Nonvalide = '<p class="text-danger fs-5">Non valide ! veuillez remplir</p>'
    document.getElementById("validate3").innerHTML = Nonvalide
  }
}
//ecoute du formulaire//
//PRENOM//
const Prenom = document.getElementById("firstName");
Prenom.addEventListener('change', getName);
function getName() {
  x = Prenom.value
  isValidated()
}
const getNaming = getName()
//NOM//
const Nom = document.getElementById("lastName");
Nom.addEventListener('change', getlastName);
function getlastName() {
  x = Nom.value
  isValidated1()
}
const getlastNaming = getlastName()

//ADRESS//
const Adress = document.getElementById("adress");
Adress.addEventListener('change', getadress);
function getadress() {
  x = Adress.value
  isValidated2()

}
const getadressing = getadress()

//VILLE//
const City = document.getElementById("city");
City.addEventListener('change', getcity);
function getcity() {
  x = City.value
  isValidated3()

}
const getCitying = getcity()

//EMAIL//
const Email = document.getElementById("email");
Email.addEventListener('change', getemail);
function getemail() {
  return (Email.value)
}
const getEmailing = getemail()


//formulaire//

//création de l'objet contact//
const contact = {
  firstName: `${getNaming}`,
  lastName: `${getlastNaming}`,
  adress: `${getadressing}`,
  city: `${getCitying}`,
  email: `${getEmailing}`,
}


//appel à l'api//
const promise01 = fetch("http://localhost:3000/api/cameras/order", {
  method: "POST",
  body: JSON.stringify(contact, products),
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json',

  }
})