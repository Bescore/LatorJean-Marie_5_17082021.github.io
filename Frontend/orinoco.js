/* TEST récupération des informations de l'api et affichage de resultat en html*/
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json()
        .then(data => {
            console.log(data);
            let affichage = `<ul style="display:flex; flex-wrap:wrap; justify-content:center; align-items : center;">`;
            for (let dat of data) {
                affichage += `<div class="card" style="width: 22rem;">
                <img class="card-img-top" src="${dat.imageUrl}" alt="Appareil photo">
                <div class="card-body">
                  <p style="font-weight: bold" class="card-text">${"Modèle :"+ " "+dat.name}</p>
                  <p style="font-weight: bold" class="card-text">${"Prix :"+ " "+dat.price + " " + "€"}</p>
                </div>
              </div>`
            }
            affichage += '</ul>';
            document.getElementById("mouv").innerHTML= affichage  
        }))









