/* TEST récupération des informations de l'api et affichage de resultat en html*/
 fetch("http://localhost:3000/api/cameras")
  .then(response => response.json()
    .then(data => {
      console.log(data);
      let affichage = `<ul style="display:flex; flex-wrap:wrap; margin:auto; align-items : center;justify-content:center;">`;
      for (let dat of data) {
        affichage += `<div   class="card" style="width: 21rem;">
                <img class="card-img-top" src="${dat.imageUrl}" alt="Appareil photo">
                <a href="produit.html?article=${dat._id}" class="card-body">
                  <p style="font-weight: bold" class="card-text">${"Modèle :" + " " + dat.name}</p>
                  <button   type="submit" class="btn btn-primary btn-sm touch ">Commander</button>
                </a>
              </div>`;
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
      let affichage2 = `<div   class="card" style="width: 21rem;">
      <img class="card-img-top" src="${data2.imageUrl}" alt="Appareil photo">
      <a href="produit.html?article=${data2._id}" class="card-body">
        <p style="font-weight: bold" class="card-text">${"Modèle :" + " " + data2.name}</p>
        <button id=${data2._id}  type="submit" class="btn btn-primary btn-sm touch ">Commander</button>
      </a>
    </div>`;
      
      document.getElementById("mouv2").innerHTML = affichage2;
    }));



