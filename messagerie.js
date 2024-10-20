// messagerie.js
document.addEventListener("DOMContentLoaded", function () {
    const conversationsList = document.getElementById("conversations");
    const conversationDetail = document.getElementById("conversation-detail");
    const conversationTitle = document.getElementById("conversationTitle");
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.getElementById("messageInput");
    const newMessageForm = document.getElementById("new-message-form");

    // Chargement des données JSON
    fetch("conversations.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement des conversations");
            }
            return response.json();
        })
        .then(data => {
            // Afficher la liste des conversations
            data.conversations.forEach(conversation => {
                const li = document.createElement("li");
                li.classList.add("conversation-item"); // Ajoutez cette ligne
                li.innerHTML = `
                    <img src="${conversation.friend.profilePic}" alt="${conversation.friend.name}" class="profile-pic">
                    <span>${conversation.friend.name}</span>
                    <span>${conversation.lastMessage.text}</span>
                `;
                li.addEventListener("click", () => showConversation(conversation));
                conversationsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Erreur :", error);
            conversationsList.innerHTML = "<li>Erreur de chargement des conversations.</li>";
        });

        
    // Affichage des détails de la conversation
    function showConversation(conversation) {
        conversationDetail.classList.remove("hidden");
        conversationTitle.textContent = `Conversation avec ${conversation.friend.name}`;
        messagesContainer.innerHTML = "";

        conversation.messages.forEach(message => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${message.sender.profilePic}" alt="${message.sender.name}" class="profile-pic">
                <strong>${message.sender.name}</strong> <span>${formatTimestamp(message.timestamp)}</span>
                <p>${message.text}</p>
            `;
            messagesContainer.appendChild(li);
        });
    }

    // Fonction pour formater l'horodatage
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000); // Différence en secondes

        if (diff < 60) return "À l'instant";
        if (diff < 3600) return `${Math.floor(diff / 60)} min${diff < 120 ? '' : 's'} ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} h${diff < 7200 ? '' : 's'} ago`;
        return date.toLocaleDateString();
    }

    // Envoi d'un nouveau message
    newMessageForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (messageInput.value.trim() === "") return; // Validation

        const newMessage = {
            id: Date.now(), // Un identifiant unique basé sur le timestamp
            text: messageInput.value,
            timestamp: new Date().toISOString(),
            sender: {
                name: "Ovi",
                profilePic: "images/moi.jpg"
            }
        };

        // Ajouter le message à l'affichage
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${newMessage.sender.profilePic}" alt="${newMessage.sender.name}" class="profile-pic">
            <strong>${newMessage.sender.name}</strong> <span>${formatTimestamp(newMessage.timestamp)}</span>
            <p>${newMessage.text}</p>
        `;
        messagesContainer.appendChild(li);
        messageInput.value = ""; // Réinitialiser le champ de saisie
    });
});







