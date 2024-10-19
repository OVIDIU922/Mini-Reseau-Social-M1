
// Charger les conversations depuis le fichier JSON
function loadConversations() {
    fetch('conversations.json')
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            conversations = data; // Stocker les conversations
            displayConversations(); // Afficher les conversations
        });
}

// Afficher les conversations sur la page
function displayConversations() {
    const conversationsContainer = document.getElementById("conversations-container");
    conversationsContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les conversations
    conversations.forEach(conversation => {
        const convElement = document.createElement("div");
        convElement.className = "conversation"; // Ajouter la classe conversation
        convElement.innerHTML = `
            <p>${conversation.name} - Dernier message: <em>(Message exemple)</em></p>
            <button onclick="startChat('${conversation.name}')">Ouvrir</button>
        `;
        conversationsContainer.appendChild(convElement); // Ajouter la conversation au conteneur
    });
}

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
