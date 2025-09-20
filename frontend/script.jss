// Function to navigate between sections
function goToChoice() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('choice-page').style.display = 'block';
}

function showQueryPage() {
    document.getElementById('choice-page').style.display = 'none';
    document.getElementById('query-page').style.display = 'block';
}

function showComplaintPage() {
    document.getElementById('choice-page').style.display = 'none';
    document.getElementById('complaint-page').style.display = 'block';
}

function backToChoice() {
    document.getElementById('query-page').style.display = 'none';
    document.getElementById('complaint-page').style.display = 'none';
    document.getElementById('choice-page').style.display = 'block';
}

// Chat functionality
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

if(sendBtn) {
    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message === "") return;

        const userMsg = document.createElement('div');
        userMsg.textContent = "You: " + message;
        chatBox.appendChild(userMsg);

        userInput.value = "";

        const aiMsg = document.createElement('div');
        aiMsg.textContent = "Bot: Response will appear here";
        chatBox.appendChild(aiMsg);
    });
}

// Complaint functionality
const submitComplaint = document.getElementById('submit-complaint');
if(submitComplaint) {
    submitComplaint.addEventListener('click', () => {
        const category = document.getElementById('category').value;
        const desc = document.getElementById('complaint-desc').value.trim();
        if(desc === "") return alert("Please enter complaint description");

        alert(`Complaint submitted for ${category}`);
        document.getElementById('complaint-desc').value = "";
    });
}
