const API_BASE = 'http://localhost:3000'; // update when backend deployed

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(id)?.classList.remove('hidden');
}

function el(q) { return document.querySelector(q); }
function appendMsg(who, text) {
  const chat = el('#chatWindow');
  const div = document.createElement('div');
  div.className = 'chat-bubble ' + (who === 'user' ? 'user' : 'bot');
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// --- demo fallback ---
function mockReply(message) {
  if (/police/i.test(message))
    return "Nearest police station: City Central Police Station, contact 100 or +91-xxxx-xxxx.";
  if (/water/i.test(message))
    return "Water board helpline: 1916 (24×7).";
  if (/electric/i.test(message))
    return "Electricity emergency: call 1912.";
  if (/health|hospital/i.test(message))
    return "Government Health Helpline: 104.";
  return "I'm a demo bot: please deploy the backend for real answers.";
}

document.addEventListener('DOMContentLoaded', () => {
  // navigation
  el('#startBtn').addEventListener('click', ()=> showPage('page-choice'));
  el('#demoBtn').addEventListener('click', ()=> showPage('page-query'));
  el('#chooseQuery').addEventListener('click', ()=> showPage('page-query'));
  el('#chooseComplaint').addEventListener('click', ()=> showPage('page-complaint'));
  el('#backFromQuery').addEventListener('click', ()=> showPage('page-choice'));
  el('#backFromComplaint').addEventListener('click', ()=> showPage('page-choice'));

  // complaint form logic unchanged -----------------------------
  const cForm = el('#complaintForm');
  const fileInput = el('#complaintFile');
  const filePreview = el('#filePreview');

  fileInput.addEventListener('change', () => {
    filePreview.innerHTML = '';
    const f = fileInput.files[0];
    if (f) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(f);
      img.onload = () => URL.revokeObjectURL(img.src);
      filePreview.appendChild(img);
    }
  });

  cForm.addEventListener('submit', async ev => {
    ev.preventDefault();
    const fd = new FormData(cForm);
    appendMsg('user', `[Complaint] ${fd.get('title')} – ${fd.get('location')}`);
    try {
      const res = await fetch(API_BASE + '/api/complaint', { method:'POST', body:fd });
      const data = await res.json();
      appendMsg('bot', data.message || 'Complaint submitted.');
    } catch {
      appendMsg('bot', '(Demo) Complaint recorded locally.');
    }
    cForm.reset();
    filePreview.innerHTML = '';
  });
  // ------------------------------------------------------------

  // Chat form
  const chatForm = el('#chatForm');
  const chatInput = el('#chatInput');

  chatForm.addEventListener('submit', async ev => {
    ev.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;
    appendMsg('user', msg);
    chatInput.value = '';
    chatInput.focus();

    try {
      const res = await fetch(API_BASE + '/api/query', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ message: msg })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      appendMsg('bot', data.answer || 'Got it! (backend reply)');
    } catch {
      appendMsg('bot', mockReply(msg));
    }
  });

  showPage('page-welcome');
});
