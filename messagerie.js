let conversations = []; // Variable pour stocker les conversations depuis le JSON
let currentConversationId = null; // ID de la conversation sélectionnée

// Charger les données des conversations depuis le fichier JSON
function loadConversations() {
    fetch('conversations.json')
        .then(response => response.json())
        .then(data => {
            conversations = data; // Stocker les conversations
            displayConversations(); // Afficher la liste des conversations
        })
        .catch(error => console.error("Erreur lors du chargement des conversations:", error));
}

// Afficher la liste des conversations
function displayConversations() {
    const conversationsList = document.getElementById("conversations-list");
    conversationsList.innerHTML = ''; // Vider la liste avant de l'afficher
    conversations.forEach(conversation => {
        const conversationElement = document.createElement("div");
        conversationElement.className = "conversation";
        conversationElement.innerHTML = `
            <strong>${conversation.name}</strong> - Dernier message: ${conversation.messages[conversation.messages.length - 1].content}
        `;
        conversationElement.addEventListener("click", () => openConversation(conversation.id));
        conversationsList.appendChild(conversationElement); // Ajouter chaque conversation à la liste
    });
}

// Ouvrir une conversation et afficher les messages
function openConversation(conversationId) {
    currentConversationId = conversationId; // Sauvegarder l'ID de la conversation active
    const conversation = conversations.find(conv => conv.id === conversationId); // Trouver la conversation par ID
    if (conversation) {
        const conversationTitle = document.getElementById("conversation-title");
        const messagesList = document.getElementById("messages-list");
        conversationTitle.textContent = conversation.name; // Mettre à jour le titre de la conversation
        messagesList.innerHTML = ''; // Vider la liste de messages avant de l'afficher

        // Afficher tous les messages de la conversation
        conversation.messages.forEach(message => {
            const messageElement = document.createElement("div");
            messageElement.className = "message";
            messageElement.innerHTML = `
                <img src="${message.profilePic}" alt="Photo de profil" class="profile-pic">
                <strong>${message.sender}</strong> <span class="timestamp">${message.timestamp}</span>
                <p>${message.content}</p>
            `;
            messagesList.appendChild(messageElement);
        });

        // Afficher la section de conversation
        document.getElementById("conversation-detail").classList.remove("hidden");
    }
}

// Envoyer un nouveau message
function sendMessage() {
    const messageInput = document.getElementById("new-message-input");
    const messageContent = messageInput.value.trim(); // Récupérer le contenu du message

    if (!messageContent) {
        alert("Le message ne peut pas être vide!"); // Validation du message
        return;
    }

    const conversation = conversations.find(conv => conv.id === currentConversationId); // Trouver la conversation active
    if (conversation) {
        const newMessage = {
            sender: "Vous",
            content: messageContent,
            timestamp: new Date().toLocaleString(),
            profilePic: "images/vous.jpg" // Ajouter une photo de profil pour l'expéditeur
        };

        // Ajouter le nouveau message à la conversation
        conversation.messages.push(newMessage);

        // Mettre à jour l'affichage des messages
        openConversation(currentConversationId);

        // Réinitialiser le champ d'entrée
        messageInput.value = '';
    } else {
        alert("Erreur: impossible de trouver la conversation.");
    }
}

// Ajouter un gestionnaire d'événements au bouton d'envoi
document.getElementById("send-message-button").addEventListener("click", sendMessage);

// Charger les conversations au démarrage
loadConversations();



/*let conversations = []; // Variable pour stocker les conversations

// Charger les données depuis le fichier JSON
function loadData() {
    fetch('conversations.json')
        .then(response => response.json())
        .then(data => {
            conversations = data; // Stocker les conversations
            displayConversations(); // Afficher les conversations
        });
}

// Afficher la liste des conversations
function displayConversations() {
    const conversationsList = document.getElementById("conversations-list");
    conversationsList.innerHTML = ""; // Vider la liste avant d'ajouter des éléments
    conversations.forEach(conversation => {
        const conversationElement = document.createElement("div");
        conversationElement.className = "conversation"; // Ajouter une classe pour le style
        conversationElement.innerHTML = `
            <strong>${conversation.participantName}</strong>
            <p>${conversation.messages[conversation.messages.length - 1].content}</p>
        `;
        conversationElement.onclick = () => displayConversationDetail(conversation.id); // Afficher les détails de la conversation lorsqu'elle est cliquée
        conversationsList.appendChild(conversationElement); // Ajouter l'élément à la liste
    });
}

// Afficher les détails d'une conversation spécifique
function displayConversationDetail(conversationId) {
    const conversation = conversations.find(c => c.id === conversationId); // Trouver la conversation par ID
    const conversationDetail = document.getElementById("conversation-detail");
    const messagesList = document.getElementById("messages-list");
    const conversationTitle = document.getElementById("conversation-title");
    conversationTitle.innerText = conversation.participantName; // Afficher le nom du participant
    messagesList.innerHTML = ""; // Vider la liste des messages

    conversation.messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.className = "message"; // Ajouter une classe pour le style
        messageElement.innerHTML = `
            <strong>${message.senderName} <span>${message.timestamp}</span></strong>
            <p>${message.content}</p>
        `;
        messagesList.appendChild(messageElement); // Ajouter le message à la liste
    });

    conversationDetail.classList.remove("hidden"); // Afficher les détails de la conversation
}

// Gestion de l'envoi de nouveaux messages
document.getElementById("send-message-button").onclick = () => {
    const newMessageInput = document.getElementById("new-message-input");
    const newMessageContent = newMessageInput.value.trim(); // Obtenir le contenu du nouveau message
    if (newMessageContent) {
        const currentConversationId = parseInt(document.getElementById("conversation-title").dataset.conversationId); // Obtenir l'ID de la conversation actuelle
        const newMessage = {
            senderName: "Vous",
            content: newMessageContent,
            timestamp: new Date().toLocaleTimeString() // Horodatage du message
        };

        const conversation = conversations.find(c => c.id === currentConversationId); // Trouver la conversation actuelle
        conversation.messages.push(newMessage); // Ajouter le nouveau message à la conversation
        newMessageInput.value = ""; // Réinitialiser le champ de saisie
        displayConversationDetail(currentConversationId); // Réafficher les détails de la conversation
    }
};

// Charger les données lorsque le script est chargé
loadData();*/
