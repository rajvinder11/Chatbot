const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

let isChatbotTyping = false;
let typingIntervalId = null;
let typingIndicatorMessage = 'Typing';

function displayUserMessage(message) {
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerText = message;
    chatBody.appendChild(userMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function displayChatbotMessage(message) {
    if (isChatbotTyping) {
        clearInterval(typingIntervalId);
        const typingIndicator = chatBody.querySelector('.typing-indicator');
        if (typingIndicator) {
            chatBody.removeChild(typingIndicator);
        }
        isChatbotTyping = false;
    }

    const chatbotMessage = document.createElement('div');
    chatbotMessage.className = 'chatbot-message';
    chatbotMessage.innerText = message;
    chatBody.appendChild(chatbotMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function displayTypingIndicator() {
    if (!isChatbotTyping) {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message typing-indicator';
        typingIndicator.innerText = typingIndicatorMessage;
        chatBody.appendChild(typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;
        isChatbotTyping = true;

        typingIntervalId = setInterval(() => {
            if (typingIndicatorMessage === 'Typing...') {
                typingIndicatorMessage = 'Typing';
            } else {
                typingIndicatorMessage += '.';
            }
            typingIndicator.innerText = typingIndicatorMessage;
        }, 400);
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    displayUserMessage(message);
    userInput.value = '';
    sendButton.disabled = true;  // Disable send button to prevent multiple requests

    try {
        displayTypingIndicator();

        const response = await fetch('http://127.0.0.1:3000/api/ask', {  // ✅ Fixed API route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        displayChatbotMessage(data.message);
    } catch (error) {
        console.error('Error:', error);
        displayChatbotMessage("Sorry, something went wrong. Please try again.");
    } finally {
        sendButton.disabled = false;  // Re-enable the send button after response
    }
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

// Initial welcome message
displayChatbotMessage(`Hi, I'm a Chat Bot. What can I help you with today?`);
