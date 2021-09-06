/* TEST récupération des informations de l'api et affichage de resultat en html*/
fetch("http://localhost:3000/api/cameras")
  .then(Resultatcamera => Resultatcamera.json()
    .then(cameras => {
      console.log(cameras);
      let AffichageCamera = `<ul style="display:flex; flex-wrap:wrap; margin:auto; align-items : center;justify-content:center;">`;
      for (let camera of cameras) {
        AffichageCamera += `<li   class="card cardtransfo" style="width: 21rem;">
                <img class="card-img-top" src="${camera.imageUrl}" alt="Appareil photo">
                <a href="produit.html?article=${camera._id}" style="text-decoration:none" class=" stretched-link card-body">
                  <p style="font-weight: bold" class="card-text">${"Modèle :" + " " + camera.name}</p>
                </a>
              </li>`;
      }
      AffichageCamera += '</ul>';
      document.getElementById("mouv").innerHTML = AffichageCamera;
    }));






//recuperer l'id du produit via l'url//
function getArticleId() {
  return new URL(location.href).searchParams.get("article");
}
const id = getArticleId()

//afficher l'article correspond a son id sur la page produit//

fetch(`http://localhost:3000/api/cameras/${id}`)
  .then(resultat => resultat.json()
    .then(data2 => {
      console.log(data2);
      let affichage2 = `<div class="card" style="margin-right:auto; margin-left :auto;width: 18rem;">
      <img class="card-img-top" src="${data2.imageUrl}" alt="Appareil photo">
      <div style="display:flex;justify-content-center;flex-direction:column" class="card-body">
        <p style="text-align:center;font-weight: bold;" class="card-text"><span>Modèle :</span>${" " + " " + data2.name}</p>
        <p style="text-align:center;font-weight: bold" class="card-text"><span>Prix :</span>${" " + (data2.price / 100) + " " + "€"}</p>
        <label style="text-align:center;margin-bottom:20px;font-weight: bold" for="lense-select">Lentilles</label>
        <select " class="form-group id="lense-select">
  <option>${data2.lenses[0]}</option>
  <option>${data2.lenses[1]}</option>
  <option>${data2.lenses[2]}</option>
</select>
        <button id=${data2.id}  type="button" onClick="isclicked(id),allstorage()"   class="btn btn-primary btn-sm touch ">Selectionner</button>
        <button style="margin-top:10px" id=${data2._id}  type="submit" onclick="DeleletItem()" class="btn btn-primary btn-sm touch ">Supprimer du panier</button>
      </div>
    </div>`;

      document.getElementById("mouv2").innerHTML = affichage2;
    }));
//panier//
const panier = []
//supprimer produit du localstorage//
function DeleletItem() {
  localStorage.removeItem(id);
  console.log(panier)
}

//choisir produit//
function isclicked() {
  localStorage.setItem(id, id);
  alert('vous avez choisi ce produit')
}
//recuperer le localstorage et le mettre dans un tableau//
function allstorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    panier.push(key)
    console.log(panier);
  }
}



