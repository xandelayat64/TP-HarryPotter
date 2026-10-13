const characterInfo = document.querySelector("#character-info");

// récup l'id dans URL
const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

// récup données du perso
if (characterId) {
    fetch(`https://hp-api.onrender.com/api/character/${characterId}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                characterInfo.innerHTML = "<p>Personnage introuvable</p>";
                return;
            }

            const personnage = data[0];

            // récup le logo de la maison
            let logoMaison = "";

            if (personnage.house === "Gryffindor") {
                logoMaison = "./images/Gryffindor.png";
            } else if (personnage.house === "Slytherin") {
                logoMaison = "./images/Slytherin.png";
            } else if (personnage.house === "Ravenclaw") {
                logoMaison = "./images/Ravenclaw.png";
            } else if (personnage.house === "Hufflepuff") {
                logoMaison = "./images/Hufflepuff.png";
            }

            characterInfo.innerHTML = `
                <section>
                    <h3>${personnage.name || "Nom inconnu"}</h3>

                    <div class="perso">
                        <figure class="perso__left">
                            ${
                                personnage.image
                                ? `<img src="${personnage.image}"
                                alt="${personnage.name || 'Personnage'}"
                                class="${personnage.alive ? '' : 'dead'}">`
                                : "<p>Pas de photo disponible</p>"
}
                            <figcaption>
                                ${personnage.actor || "Acteur inconnu"}
                            </figcaption>
                        </figure>

                        <div class="perso__right">
                            <div>
                                <p class="attr">Gender</p>
                                <p>${personnage.gender || "Inconnu"}</p>
                            </div>

                            <div>
                                <p class="attr">Eye</p>
                                <p>${personnage.eyeColour || "Inconnue"}</p>
                            </div>

                            <div>
                                <p class="attr">Hair</p>
                                <p>${personnage.hairColour || "Inconnue"}</p>
                            </div>

                            <div>
                                <p class="attr">Date of birth</p>
                                <p>${personnage.dateOfBirth || "Inconnue"}</p>
                            </div>

                            <div>
                                <p class="attr">Patronus</p>
                                <p>${personnage.patronus || "Inconnu"}</p>
                            </div>

                            <div>
                                <p class="attr">Alternate names</p>
                                <p>${personnage.alternateNames || "Aucun nom alternatif"}</p>
                            </div>

                        </div>
                    </div>
                </section>

                <section class="house__perso">
                    ${
                        logoMaison
                            ? `<img src="${logoMaison}"
                                    alt="Blason de ${personnage.house}">`
                            : "<p>Aucun blason disponible</p>"
                    }
                </section>
            `;
        })
        .catch(error => {
            console.log(error);
            characterInfo.innerHTML =
                "<p>Impossible de charger les données du personnage</p>";
        });
} else {
    characterInfo.innerHTML = "<p>Aucun personnage sélectionné</p>";
}