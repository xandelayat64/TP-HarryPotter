const charactersList = document.querySelector("#characters-list");
const houses = document.querySelectorAll(".houses img");

const searchInput = document.querySelector("#search");
const sortSelect = document.querySelector("#sort");
const aliveSelect = document.querySelector("#alive");

const studentsList = document.querySelector("#students-list");
const staffList = document.querySelector("#staff-list");

let characters = [];
let selectedHouse = "";

fetch("https://hp-api.onrender.com/api/characters")
    .then(response => response.json())
    .then(data => {
        characters = data.slice(0, 20);

        displayCharacters();
    })
    .catch(error => {
        charactersList.innerHTML = "<p>Erreur de chargement</p>";
        console.log(error);
    });

function displayCharacters() {
    let personnages = [...characters];

    if (searchInput) {
        const recherche = searchInput.value.toLowerCase();

        personnages = personnages.filter(personnage =>
            (personnage.name || "").toLowerCase().includes(recherche)
        );
    }

    if (selectedHouse !== "") {
        personnages = personnages.filter(personnage =>
            personnage.house === selectedHouse
        );
    }

    if (aliveSelect && aliveSelect.value === "alive") {
        personnages = personnages.filter(personnage =>
            personnage.alive === true
        );
    } else if (aliveSelect && aliveSelect.value === "dead") {
        personnages = personnages.filter(personnage =>
            personnage.alive === false
        );
    }

    if (sortSelect && sortSelect.value === "name") {
        personnages.sort((a, b) =>
            (a.name || "").localeCompare(b.name || "")
        );
    } else if (sortSelect && sortSelect.value === "age") {
        personnages.sort((a, b) => {
            const anneeA = a.yearOfBirth;
            const anneeB = b.yearOfBirth;

            if (!anneeA) return 1;
            if (!anneeB) return -1;

            return anneeA - anneeB;
        });
    }

    const students = personnages.filter(personnage =>
        personnage.hogwartsStudent === true
    );

    const staff = personnages.filter(personnage =>
        personnage.hogwartsStaff === true
    );

    if (studentsList && staffList) {
        showCharacters(students, studentsList);
        showCharacters(staff, staffList);
    } else {
        showCharacters(personnages, charactersList);
    }
}

function showCharacters(personnages, container) {
    container.innerHTML = "";

    if (personnages.length === 0) {
        container.innerHTML = "<p>Aucun personnage trouvé.</p>";
        return;
    }

    personnages.forEach(personnage => {
        container.innerHTML += `
            <article class="character-card ${personnage.house || 'unknown'}">
                <a href="details.html?id=${personnage.id}">
                    ${
                        personnage.image
                            ? `<img src="${personnage.image}"
                                    class="${personnage.alive === false ? 'dead' : ''}"
                                    alt="${personnage.name || 'Personnage'}">`
                            : `<p>Pas de photo disponible</p>`
                    }

                    <p>${personnage.name || "Nom inconnu"}</p>
                </a>
            </article>
        `;
    });
}

houses.forEach(house => {
    house.addEventListener("click", () => {
        selectedHouse = selectedHouse === house.alt ? "" : house.alt;

        displayCharacters();
    });
});

if (searchInput) {
    searchInput.addEventListener("input", displayCharacters);
}

if (sortSelect) {
    sortSelect.addEventListener("change", displayCharacters);
}

if (aliveSelect) {
    aliveSelect.addEventListener("change", displayCharacters);
}


const resetButton = document.querySelector("#reset-filters");

if (resetButton) {
    resetButton.addEventListener("click", () => {
        searchInput.value = "";
        sortSelect.value = "name";
        aliveSelect.value = "all";
        selectedHouse = "";

        displayCharacters();
    });
}

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
        menu.classList.toggle("menu-open");
    });
}