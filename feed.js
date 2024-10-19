let posts = []; // Variable pour stocker les posts

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
            <p><strong>${post.name}</strong></p> <!-- Afficher le nom de l'utilisateur -->
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Image post" onclick="openModal('${post.image}')" />` : ''}
            <div>
                <button onclick="reactToPost(${post.id}, 'like')"><i class="fas fa-thumbs-up"></i>${post.likes}</button>
                <button onclick="reactToPost(${post.id}, 'dislike')"><i class="fas fa-thumbs-down"></i>${post.dislikes}</button>
                <button onclick="reactToPost(${post.id}, 'love')"><i class="fas fa-heart"></i>${post.loves}</button>
            </div>
            <div class="comment-section">
                <input type="text" placeholder="Ajouter un commentaire..." id="comment-input-${post.id}">
                <button onclick="addComment(${post.id})">Commenter</button>
                <div id="comments-${post.id}"></div> <!-- Conteneur pour les commentaires -->
            </div>
        `;
        feedContainer.appendChild(postElement); // Ajouter le post au conteneur
    });
}


// Réagir aux posts
function reactToPost(postId, type) {
    const post = posts.find(p => p.id === postId); // Trouver le post par ID
    if (post) {
        if (type === 'like') post.likes++;
        if (type === 'dislike') post.dislikes++;
        if (type === 'love') post.loves++;
        displayPosts(); // Réafficher les posts avec les nouvelles réactions
    }
}

// Ajouter un commentaire à un post
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value.trim(); // Obtenir le texte du commentaire
    if (commentText) {
        const commentsContainer = document.getElementById(`comments-${postId}`);
        const commentElement = document.createElement("div");
        commentElement.className = "comment"; // Ajouter la classe commentaire
        commentElement.textContent = commentText; // Ajouter le texte du commentaire
        commentsContainer.appendChild(commentElement); // Ajouter le commentaire au conteneur
        commentInput.value = ""; // Réinitialiser le champ de saisie
    }
}

// Ouvrir la modale pour afficher l'image en plein écran
function openModal(imageSrc) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    modal.style.display = "block"; // Afficher la modale
    modalImage.src = imageSrc; // Changer la source de l'image
}

// Fermer la modale
function closeModal() {
    document.getElementById("image-modal").style.display = "none"; // Masquer la modale
}
