<!-- En tu archivo .html o .md -->
<div id="chat-container">
  <div id="chat-history"></div>
  <input type="text" id="user-input" placeholder="Pregúntame algo...">
  <button onclick="sendMessage()">Enviar</button>
</div>

<script src="{{ '/assets/js/chat.js' | relative_url }}"></script>
<script>
// Función para enviar mensajes
async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value;
  
  if (!message) return;
  
  // Mostrar mensaje usuario
  const chatHistory = document.getElementById('chat-history');
  chatHistory.innerHTML += `<div class="user-msg">Tú: ${message}</div>`;
  
  input.value = ""; // Limpiar input
  chatHistory.innerHTML += `<div class="ai-msg">AI: Pensando...</div>`;
  
  // Obtener respuesta
  const response = await askAI(message);
  
  // Reemplazar "Pensando..." con respuesta real
  chatHistory.lastChild.innerHTML = `AI: ${response}`;
}
</script>
