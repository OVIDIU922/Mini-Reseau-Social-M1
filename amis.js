// Fonction pour filtrer les amis en fonction de l'entrée dans le champ de recherche
function filterFriends() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const friendsList = document.getElementById('friends-list');
    const friends = friendsList.getElementsByClassName('friend-item');

    Array.from(friends).forEach(friend => {
        const friendName = friend.getElementsByTagName('span')[0].textContent.toLowerCase();
        if (friendName.includes(filter)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });
}

document.getElementById('searchInput').addEventListener('input', filterFriends);

document.addEventListener("DOMContentLoaded", () => {
    const friendsList = document.getElementById("friends-list");
    let draggedItem = null;

    // Ajout des événements de drag-and-drop pour chaque ami (bureau)
    friendsList.querySelectorAll(".friend-item").forEach(item => {
        // Drag-and-drop pour bureau
        item.addEventListener("dragstart", function () {
            draggedItem = this;
            setTimeout(() => this.classList.add("dragging"), 0);
        });

        item.addEventListener("dragend", function () {
            setTimeout(() => this.classList.remove("dragging"), 0);
            draggedItem = null;
        });

        item.addEventListener("dragover", function (e) {
            e.preventDefault();
            this.classList.add("over");
        });

        item.addEventListener("dragleave", function () {
            this.classList.remove("over");
        });

        item.addEventListener("drop", function (e) {
            e.preventDefault();
            this.classList.remove("over");

            if (draggedItem !== this) {
                const allItems = [...friendsList.querySelectorAll(".friend-item")];
                const draggedIndex = allItems.indexOf(draggedItem);
                const dropIndex = allItems.indexOf(this);

                if (draggedIndex < dropIndex) {
                    this.after(draggedItem);
                } else {
                    this.before(draggedItem);
                }
            }
        });

        // Gestion du drag-and-drop pour mobile/tablette (tactile)
        item.addEventListener("touchstart", function (e) {
            draggedItem = this;
            draggedItem.classList.add("dragging");
        });

        item.addEventListener("touchend", function (e) {
            draggedItem.classList.remove("dragging");
            draggedItem = null;
        });

        item.addEventListener("touchmove", function (e) {
            e.preventDefault();
            const touchLocation = e.targetTouches[0]; // Obtenir la position du toucher

            const elementAtTouch = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);
            
            if (elementAtTouch && elementAtTouch.classList.contains('friend-item') && elementAtTouch !== draggedItem) {
                const allItems = [...friendsList.querySelectorAll(".friend-item")];
                const draggedIndex = allItems.indexOf(draggedItem);
                const dropIndex = allItems.indexOf(elementAtTouch);

                if (draggedIndex < dropIndex) {
                    elementAtTouch.after(draggedItem);
                } else {
                    elementAtTouch.before(draggedItem);
                }
            }
        });
    });
});





// Fonction pour filtrer les amis en fonction de l'entrée dans le champ de recherche
/*function filterFriends() {
    const input = document.getElementById('searchInput'); // Récupère la valeur du champ de recherche
    const filter = input.value.toLowerCase(); // Convertit le texte en minuscules pour faciliter la recherche
    const friendsList = document.getElementById('friends-list'); // Récupère la liste d'amis
    const friends = friendsList.getElementsByClassName('friend-item'); // Récupère chaque ami (élément li)

    // Parcourt chaque ami et affiche ou cache en fonction du filtre
    Array.from(friends).forEach(friend => {
        const friendName = friend.getElementsByTagName('span')[0].textContent.toLowerCase(); // Récupère le nom de l'ami
        if (friendName.includes(filter)) { // Si le nom contient le texte du filtre
            friend.style.display = ''; // Affiche l'ami
        } else {
            friend.style.display = 'none'; // Cache l'ami
        }
    });
}

// Appel de la fonction filterFriends quand l'utilisateur tape dans le champ de recherche
document.getElementById('searchInput').addEventListener('input', filterFriends);

// Ajout des événements de drag-and-drop
document.addEventListener("DOMContentLoaded", () => {
    const friendsList = document.getElementById("friends-list");
    let draggedItem = null;

    // Ajout des événements de drag-and-drop pour chaque élément de la liste d'amis
    friendsList.querySelectorAll(".friend-item").forEach(item => {
        
        // Quand le drag commence
        item.addEventListener("dragstart", function () {
            draggedItem = this; // Stocke l'élément qui est en cours de glissement
            setTimeout(() => this.classList.add("dragging"), 0); // Ajoute une classe 'dragging' pour changer l'apparence
        });

        // Quand le drag se termine
        item.addEventListener("dragend", function () {
            setTimeout(() => this.classList.remove("dragging"), 0); // Retire la classe 'dragging'
            draggedItem = null; // Réinitialise l'élément en cours de glissement
        });

        // Permet de glisser l'élément sur d'autres éléments
        item.addEventListener("dragover", function (e) {
            e.preventDefault(); // Empêche le comportement par défaut
            this.classList.add("over"); // Met en surbrillance la zone de dépôt
        });

        // Quand on quitte la zone de dépôt sans déposer
        item.addEventListener("dragleave", function () {
            this.classList.remove("over"); // Retire la surbrillance
        });

        // Quand l'élément est déposé
        item.addEventListener("drop", function (e) {
            e.preventDefault(); // Empêche le comportement par défaut
            this.classList.remove("over"); // Retire la surbrillance après le dépôt

            if (draggedItem !== this) { // Si l'élément glissé et l'élément de dépôt sont différents
                // Réorganise les éléments de la liste
                const allItems = [...friendsList.querySelectorAll(".friend-item")];
                const draggedIndex = allItems.indexOf(draggedItem);
                const dropIndex = allItems.indexOf(this);

                if (draggedIndex < dropIndex) {
                    this.after(draggedItem); // Déplace après l'élément déposé
                } else {
                    this.before(draggedItem); // Déplace avant l'élément déposé
                }
            }
        });
    });
});*/
