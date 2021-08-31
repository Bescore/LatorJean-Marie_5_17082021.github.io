/* TEST récupération des informations de l'api et affichage de resultat en html*/
fetch("http://localhost:3000/api/cameras")
  .then(response => response.json()
    .then(data => {
      console.log(data);
      let affichage = `<ul style="display:flex; flex-wrap:wrap; margin:auto; align-items : center;justify-content:center;">`;
      for (let dat of data) {
        affichage += `<li   class="card cardtransfo" style="width: 21rem;">
                <img class="card-img-top" src="${dat.imageUrl}" alt="Appareil photo">
                <a href="produit.html?article=${dat._id}" style="text-decoration:none" class=" stretched-link card-body">
                  <p style="font-weight: bold" class="card-text">${"Modèle :" + " " + dat.name}</p>
                </a>
              </li>`;
      }
      affichage += '</ul>';
      document.getElementById("mouv").innerHTML = affichage;
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
        <p style="text-align:center;font-weight: bold" class="card-text"><span>Prix :</span>${" " + data2.price + " " + "€"}</p>
        <label style="text-align:center;margin-bottom:20px;font-weight: bold" for="lense-select">Lentilles</label>
        <select " class="form-group id="lense-select">
  <option>${data2.lenses[0]}</option>
  <option>${data2.lenses[1]}</option>
  <option>${data2.lenses[2]}</option>
</select>
        <button id=${data2._id}  type="submit" onclick="isclicked()" class="btn btn-primary btn-sm touch ">Selectionner</button>
        <button style="margin-top:10px" id=${data2._id}  type="submit" onclick="supstorage()" class="btn btn-primary btn-sm touch ">Supprimer du panier</button>
      </div>
    </div>`;

      document.getElementById("mouv2").innerHTML = affichage2;
    }));

//verifier que l'id soit présent dans le localstorage//
const idVerify = localStorage.getItem(id);
    //ajouter des items au localstorage//
function isclicked() {
  localStorage.setItem( id,id);
  if (idVerify==(id,id))  {
    alert('vous avez déjà choisi ce produit');
  } else{
    alert('vous venez de selectionner ce produit')
  }
}

//supprimer tous les items du panier//
 function  supstorage() {
  localStorage.removeItem(id,id);
  alert("produit suprrimé du panier")
}

//afficher les éléments selectionné dans la la page panier//
