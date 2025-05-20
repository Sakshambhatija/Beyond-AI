// chat.js

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Append user message to chat window
    appendMessage(userInput, 'user');
    
    // Clear input field
    document.getElementById('user-input').value = '';

    try {
        // Fetch AI response from your backend (assumes you have an API to handle this)
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput }),
        });
        
        const result = await response.json();
        if (result.error) {
            appendMessage('Error: ' + result.error.message, 'ai');
        } else {
            appendMessage(result.response, 'ai');
        }
    } catch (error) {
        appendMessage('Something went wrong. Please try again later.', 'ai');
    }
}

function appendMessage(message, sender) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}
