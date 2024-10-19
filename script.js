let posts = []; // Variable pour stocker les posts
let conversations = []; // Variable pour stocker les conversations

// Charger les données des posts depuis le fichier JSON
function loadData() {
    fetch('posts.json')
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            posts = data; // Stocker les posts
            displayPosts(); // Afficher les posts
        });
}

// Afficher les posts sur la page
function displayPosts() {
    const feedContainer = document.getElementById("feed-container");
    feedContainer.innerHTML = ""; // Vider le conteneur avant d'ajouter les posts
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post"; // Ajouter la classe post
        postElement.innerHTML = `
            <h4>${post.author}</h4> <!-- Afficher le nom de l'auteur -->
            <p>${post.content}</p>
            ${post.image ? `<img src="images/fleur-simple.avif" alt="Image post" />` : ''} <!-- Afficher l'image si elle existe -->
            <div>
                <button onclick="reactToPost(${post.id}, 'like')">Like (${post.likes})</button>
                <button onclick="reactToPost(${post.id}, 'dislike')">Dislike (${post.dislikes})</button>
                <button onclick="reactToPost(${post.id}, 'love')">Love (${post.loves})</button>
            </div>
        `;
        feedContainer.appendChild(postElement); // Ajouter le post au conteneur
    });
}


// Fonction pour réagir à un post
function reactToPost(postId, reactionType) {
    const post = posts.find(p => p.id === postId); // Trouver le post par ID
    if (post) {
        if (reactionType === 'like') post.likes++;
        if (reactionType === 'dislike') post.dislikes++;
        if (reactionType === 'love') post.loves++;
        displayPosts(); // Rafraîchir l'affichage des posts
    }
}

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
