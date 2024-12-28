function toggleChat() {
  const window = document.getElementById("chatbot-window");
  window.classList.toggle("show");
  
  if (window.classList.contains("show")) {
      // Envoyer le message de bienvenue
      fetchBotResponse("/session_start");
  } else {
      // Réinitialiser la fenêtre de chat en fermant
      resetChat();
  }
}

function closeChat() {
  const window = document.getElementById("chatbot-window");
  window.classList.remove("show");

  // Réinitialiser les messages et la session
  resetChat();
}

function resetChat() {
  // Effacer tous les messages affichés
  const chatbotBody = document.getElementById("chatbot-body");
  chatbotBody.innerHTML = '';

  // Optionnel : appeler une action de Rasa pour réinitialiser la session
  fetch('http://localhost:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: '/reset_session' })  // Action à définir dans Rasa si besoin
  })
  .then(response => response.json())
  .then(data => console.log('Session réinitialisée :', data))
  .catch(error => console.error('Erreur lors de la réinitialisation de la session :', error));
}

function sendMessage(event) {
  if (event.key === 'Enter') {
      const userInput = document.getElementById("user-input").value;
      if (userInput.trim() !== "") {
          displayMessage(userInput, "user");
          document.getElementById("user-input").value = "";
          fetchBotResponse(userInput);
      }
  }
}

function displayMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = message;
  document.getElementById("chatbot-body").appendChild(messageDiv);
  document.getElementById("chatbot-body").scrollTop = document.getElementById("chatbot-body").scrollHeight;
}

function fetchBotResponse(message) {
  fetch('http://localhost:5005/webhooks/rest/webhook', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
  })
  .then(response => response.json())
  .then(data => {
      if (data && data.length > 0) {
          const botMessage = data[0].text;
          displayMessage(botMessage, "bot");
      }
  })
  .catch(error => console.error('Erreur lors de la communication avec Rasa :', error));
}
