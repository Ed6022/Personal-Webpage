// assets/js/chat.js
async function askAI(message) {
  const API_KEY = "sk-7afab057d7ee41f1b40be89822496ec0"; // <-- ¡PEGA TU API KEY AQUÍ!
  
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error("Error:", error);
    return "Lo siento, ocurrió un error :(";
  }
}
