const charactersList = document.querySelector("#characters-list");
const houses = document.querySelectorAll(".houses img");

let characters = [];
let selectedHouse = "";

fetch("https://hp-api.onrender.com/api/characters")
    .then(response => response.json())
    .then(data => {
        characters = data;  //limiter à 20 perso

        displayCharacters(characters);
    })
    .catch(error => {
        charactersList.innerHTML = "<p>Erreur de chargement</p>";
        console.log(error);
    });


function displayCharacters(personnages) {
    charactersList.innerHTML = "";

    personnages.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
    );

    personnages.forEach(personnage => {
        charactersList.innerHTML += `
            <article class="character-card ${personnage.house || 'unknown'}">
                <a href="details.html?id=${personnage.id}">
                    ${
                        personnage.image
                            ? `<img src="${personnage.image}"
                                    alt="${personnage.name || 'Personnage'}">`
                            : `<p>Pas de photo disponible</p>`
                    }

                    <p>${personnage.name || "Nom inconnu"}</p>
                </a>
            </article>
        `;
    });
}


// filtre persos par maison
houses.forEach(house => {
    house.addEventListener("click", () => {
        selectedHouse = house.alt;

        const filteredCharacters = characters.filter(personnage =>
            personnage.house === selectedHouse
        );

        displayCharacters(filteredCharacters);
    });
});

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

menuButton.addEventListener("click", () => {
    menu.classList.toggle("menu-open");
});