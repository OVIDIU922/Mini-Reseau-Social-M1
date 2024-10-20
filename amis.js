// Fonction pour filtrer les amis en fonction de l'entrée dans le champ de recherche
function filterFriends() {
    const input = document.getElementById('searchInput'); // Récupère la valeur du champ de recherche
    const filter = input.value.toLowerCase(); // Convertit le texte en minuscules pour faciliter la recherche
    const friendsList = document.getElementById('friendsList'); // Récupère la liste d'amis
    const friends = friendsList.getElementsByTagName('li'); // Récupère chaque ami (li)

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

// Variables pour le drag and drop (glisser-déposer)
const friendsList = document.getElementById('friendsList');
let dragged; // Élement qui est en train d'être déplacé

// Lorsque le glisser commence
friendsList.addEventListener('dragstart', (e) => {
    dragged = e.target; // Stocke l'élément glissé
    e.target.style.opacity = 0.5; // Change l'opacité pour indiquer qu'il est en mouvement
});

// Lorsque le glisser s'arrête
friendsList.addEventListener('dragend', (e) => {
    e.target.style.opacity = ''; // Rétablit l'opacité originale
});

// Permet à un autre élément de recevoir l'élément glissé
friendsList.addEventListener('dragover', (e) => {
    e.preventDefault(); // Empêche le comportement par défaut
});

// Lorsqu'un élément est déposé
friendsList.addEventListener('drop', (e) => {
    e.preventDefault(); // Empêche l'action par défaut
    if (e.target.tagName === 'LI' && e.target !== dragged) { // Si l'élément cible est une ligne d'ami différente
        const draggedIndex = Array.from(friendsList.children).indexOf(dragged); // Index de l'élément déplacé
        const targetIndex = Array.from(friendsList.children).indexOf(e.target); // Index de l'élément cible

        // Réorganise la liste en fonction de la position de l'élément déplacé
        if (draggedIndex > targetIndex) {
            friendsList.insertBefore(dragged, e.target); // Insère l'élément déplacé avant la cible
        } else {
            friendsList.insertBefore(dragged, e.target.nextSibling); // Insère après si déplacé vers le bas
        }
    }
});





// Fonction pour filtrer les amis par nom et prénom
/*function filterFriends() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const friendsList = document.getElementById('friendsList');
    const friends = friendsList.getElementsByTagName('li');

    Array.from(friends).forEach(friend => {
        const friendName = friend.getElementsByTagName('span')[0].textContent.toLowerCase();
        if (friendName.includes(filter)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });
}

// Fonction pour le drag and drop
const friendsList = document.getElementById('friendsList');
let dragged;

friendsList.addEventListener('dragstart', (e) => {
    dragged = e.target;
    e.target.style.opacity = 0.5;
});

friendsList.addEventListener('dragend', (e) => {
    e.target.style.opacity = '';
});

friendsList.addEventListener('dragover', (e) => {
    e.preventDefault();
});

friendsList.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'LI' && e.target !== dragged) {
        const draggedIndex = Array.from(friendsList.children).indexOf(dragged);
        const targetIndex = Array.from(friendsList.children).indexOf(e.target);
        
        if (draggedIndex > targetIndex) {
            friendsList.insertBefore(dragged, e.target);
        } else {
            friendsList.insertBefore(dragged, e.target.nextSibling);
        }
    }
});*/
