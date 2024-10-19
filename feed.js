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
    posts.forEach((post, postIndex) => {
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
                <div id="comments-${post.id}">${displayComments(post.comments, postIndex)}</div> <!-- Conteneur pour les commentaires -->
            </div>
        `;
        feedContainer.appendChild(postElement); // Ajouter le post au conteneur
    });
}

// Afficher les commentaires d'un post
function displayComments(comments, postIndex) {
    return comments.map((comment, commentIndex) => `
        <div class="comment">
            <strong>${comment.name}:</strong> ${comment.content}
            <div class="reply-section">
                <input type="text" placeholder="Répondre...">
                <button onclick="addReply(${postIndex}, ${commentIndex}, this.previousElementSibling.value)">Répondre</button>
            </div>
            <div class="replies">${displayReplies(comment.replies)}</div>
        </div>
    `).join('');
}

// Afficher les réponses d'un commentaire
function displayReplies(replies) {
    return replies.map(reply => `
        <div class="comment">
            <strong>${reply.name}:</strong> ${reply.content}
        </div>
    `).join('');
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
        const newComment = { name: "Ovi", content: commentText, replies: [] }; // Créer un nouvel objet de commentaire
        const post = posts.find(p => p.id === postId); // Trouver le post correspondant
        if (post) {
            post.comments.push(newComment); // Ajouter le commentaire au post
            commentInput.value = ""; // Réinitialiser le champ de saisie
            displayPosts(); // Réafficher les posts
        }
    }
}

// Ajouter une réponse à un commentaire
function addReply(postIndex, commentIndex, replyContent) {
    if (replyContent) {
        const newReply = { name: "Daniela", content: replyContent }; // Création de la réponse
        const post = posts[postIndex]; // Trouver le post par index
        if (post) {
            const comment = post.comments[commentIndex]; // Obtenir le commentaire par son index
            comment.replies.push(newReply); // Ajouter la réponse au commentaire
            displayPosts(); // Réafficher les posts
        }
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

// Charger les données lorsque le script est chargé
loadData();





/*let posts = []; // Variable pour stocker les posts

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
                <div id="comments-${post.id}">${displayComments(post.comments)}</div> <!-- Conteneur pour les commentaires -->
            </div>
        `;
        feedContainer.appendChild(postElement); // Ajouter le post au conteneur
    });
}


// Afficher les commentaires d'un post
/*function displayComments(comments) {
    return comments.map(comment => `
        <div class="comment">
            <strong>${comment.name}:</strong> ${comment.content} <!-- Afficher l'auteur et le contenu du commentaire -->
            <div class="reply-section">
                <input type="text" placeholder="Répondre...">
                <button onclick="addReply('${comment.name}', this.previousElementSibling.value)">Répondre</button> <!-- Bouton pour soumettre la réponse -->
            </div>
            <div class="replies">${displayComments(comment.replies)}</div> <!-- Afficher les réponses au commentaire -->
        </div>
    `).join(''); // Joindre les commentaires sous forme de chaîne
}*/
/*function displayComments(comments) {
    return comments.map((comment, index) => `
        <div class="comment">
            <strong>${comment.name}:</strong> ${comment.content}
            <div class="reply-section">
                <input type="text" placeholder="Répondre...">
                <button onclick="addReply(${index}, this.previousElementSibling.value)">Répondre</button>
            </div>
            <div class="replies">${displayComments(comment.replies)}</div>
        </div>
    `).join('');
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
        const newComment = { name: "Ovi", content: commentText, replies: [] }; // Créer un nouvel objet de commentaire
        const post = posts.find(p => p.id === postId); // Trouver le post correspondant
        if (post) {
            post.comments.push(newComment); // Ajouter le commentaire au post
            commentInput.value = ""; // Réinitialiser le champ de saisie
            displayPosts(); // Réafficher les posts
        }
    }
}

// Ajouter une réponse à un commentaire
/*function addReply(commentAuthor, replyContent) {
    if (replyContent) {
        const newReply = { name: "Daniela", content: replyContent }; // Créer un nouvel objet de réponse
        const post = posts.find(p => p.comments.some(c => c.author === commentAuthor)); // Trouver le post correspondant
        if (post) {
            const comment = post.comments.find(c => c.author === commentAuthor); // Trouver le commentaire correspondant
            if (comment) {
                comment.replies.push(newReply); // Ajouter la réponse au commentaire
                displayPosts(); // Réafficher les posts
            }
        }
    }
}*/
/*function addReply(commentIndex, replyContent) {
    if (replyContent) {
        const newReply = { name: "Daniela", content: replyContent }; // Création de la réponse
        const post = posts.find(p => p.comments[commentIndex]); // Trouver le post contenant le commentaire
        if (post) {
            const comment = post.comments[commentIndex]; // Obtenir le commentaire par son index
            comment.replies.push(newReply); // Ajouter la réponse au commentaire
            displayPosts(); // Réafficher les posts
        }
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

// Charger les données lorsque le script est chargé
loadData();*/



