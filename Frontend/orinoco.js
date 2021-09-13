
/* TEST récupération des informations de l'api et affichage de resultat en html*/
fetch("http://localhost:3000/api/cameras")
  .then(Resultatcamera => Resultatcamera.json()
    .then(cameras => {
      let AffichageCamera = `<ul style="display:flex; flex-wrap:wrap; margin:auto; align-items : center;justify-content:center;">`;
      for (let camera of cameras) {
        AffichageCamera += `<li   class="card cardtransfo" >
                <img class="card-img-top" src="${camera.imageUrl}" alt="Appareil photo" style="width:18rem">
                <a href="produit.html?article=${camera._id}" style="text-decoration:none" class=" stretched-link card-body">
                  <p style="font-weight: bold" class="card-text">${"Modèle :" + " " + camera.name}</p>
                </a>
              </li>`;
      }
      AffichageCamera += '</ul>';
      document.getElementById("mouv").innerHTML = AffichageCamera;
      
    })
    .catch (function(){console.log('ne peut fetch la page index car vous êtes sur la mauvaise page')}
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
      let affichage2 = `<div class="card" style="margin-right:auto; margin-left :auto;width: 18rem;">
      <img class="card-img-top" src="${data2.imageUrl}" alt="Appareil photo">
      <div style="display:flex;justify-content-center;flex-direction:column" class="card-body">
        <p style="text-align:center;font-weight: bold;" class="card-text"><span>Modèle :</span>${" " + " " + data2.name}</p>
        <p style="text-align:center;font-weight: bold" class="card-text"><span>Prix :</span>${" " + (data2.price / 100) + " " + "€"}</p>
        <label style="text-align:center;margin-bottom:20px;font-weight: bold" for="lense-select">Lentilles</label>
        <select  class="form-group" id="lense-select"></select>
  
        
        <button id=${data2.id}  type="button" onClick="isclicked(id)"   class="btn btn-primary btn-sm touch ">Selectionner</button>
        <button style="margin-top:10px" id=${data2._id}  type="submit" onclick="DeleletItem()" class="btn btn-primary btn-sm touch ">Supprimer du panier</button>
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
//recuperer le localstorage en tableau sur la page panier//
function allStorage() {
  ///TOTAL///
  var nombres = [];

///total FIN///
  let values = [];
  let AffichageCamera ="";
  for (let i = 0; i < localStorage.length; i++) {
    values.push(localStorage.getItem(localStorage.key(i)));

    fetch(`http://localhost:3000/api/cameras/${values[i]}`)
      .then(Resultatcamera => Resultatcamera.json()
        .then(cameras => {
          AffichageCamera += `<div   class="card cardmouv">
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
  
