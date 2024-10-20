// Filtrer les amis par nom
function filterFriends(name) {
    const friends = document.querySelectorAll(".friend");
    friends.forEach(friend => {
        if (friend.textContent.toLowerCase().includes(name.toLowerCase())) {
            friend.style.display = ''; // Afficher l'ami
        } else {
            friend.style.display = 'none'; // Masquer l'ami
        }
    });
}

// Démarrer un chat avec un ami
function startChat(friendName) {
    alert(`Démarrer un chat avec ${friendName}`); // Message d'alerte pour démarrer un chat
}
