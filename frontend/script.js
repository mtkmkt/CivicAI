// Frontend logic for Community AI Helpline
// Update this to your deployed backend when ready:
const API_BASE = 'http://localhost:3000'; // <-- update when backend is deployed

// --- helper: show/hide pages ---
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
  // update api base note
  const baseText = document.getElementById('apiBaseText');
  if (baseText) baseText.textContent = API_BASE;
}

/* --- small UI helpers --- */
function el(q){return document.querySelector(q)}
function qAll(q){return Array.from(document.querySelectorAll(q))}
function setLoading(btn, on=true, text='Sending...'){
  if(!btn) return;
  btn.disabled = on;
  btn.dataset.orig = btn.textContent;
  btn.textContent = on ? text : btn.dataset.orig;
}

/* --- mock replies if backend unreachable --- */
function mockQueryReply(category, message){
  const mapping = {
    water: "If the supply is interrupted, first check with your local water board. If outage exceeds 4 hours, escalate to the complaint form.",
    electricity: "Check if neighbours are affected. For immediate danger (sparks, exposed wires) call emergency services. For outages, file a complaint with meter details.",
    health: "For non-emergency health queries, consult your nearest primary health centre. This is not medical advice — see a professional for urgent issues."
  };
  return mapping[category] || "Thanks — we've received your query and will reply shortly.";
}

/* --- message area helpers --- */
function appendMessage(container, who, text){
  const area = document.getElementById(container);
  if(!area) return;
  const div = document.createElement('div');
  div.className = 'chat-bubble ' + (who === 'user' ? 'user' : 'bot');
  div.textContent = text;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

/* --- event wiring --- */
document.addEventListener('DOMContentLoaded', () => {
  // navigation
  el('#startBtn').addEventListener('click', ()=> showPage('page-choice'));
  el('#demoBtn').addEventListener('click', ()=>{
    // go straight to query in demo mode
    showPage('page-query');
    appendMessage('queryResponseArea','bot','(Demo mode) Try asking about water, electricity or health.');
  });

  el('#chooseQuery').addEventListener('click', ()=> showPage('page-query'));
  el('#chooseComplaint').addEventListener('click', ()=> showPage('page-complaint'));

  el('#backFromQuery').addEventListener('click', ()=> showPage('page-choice'));
  el('#backFromComplaint').addEventListener('click', ()=> showPage('page-choice'));

  // Query form
  const qForm = el('#queryForm');
  qForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const category = el('#queryCategory').value;
    const message = el('#queryMessage').value.trim();
    const contact = el('#queryContact').value.trim();
    if(!message) return alert('Please type your question.');

    appendMessage('queryResponseArea','user', message);
    setLoading(el('#sendQueryBtn'), true);

    // try contacting backend
    try {
      const res = await fetch(API_BASE + '/api/query', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({category, message, contact})
      });
      if(!res.ok) throw new Error('bad response from backend');
      const data = await res.json();
      const reply = data.answer || data.reply || 'Received — we will reply soon.';
      appendMessage('queryResponseArea','bot', reply);
    } catch (err) {
      // fallback mock reply so demo always works
      console.warn('Query backend failed:', err);
      const reply = mockQueryReply(category, message);
      appendMessage('queryResponseArea','bot', `(Demo) ${reply}`);
    } finally {
      setLoading(el('#sendQueryBtn'), false);
      qForm.reset();
    }
  });

  el('#clearQueryBtn').addEventListener('click', () => {
    qForm.reset();
    el('#queryResponseArea').innerHTML = '';
  });

  // Complaint form
  const cForm = el('#complaintForm');
  const fileInput = el('#complaintFile');
  const filePreview = el('#filePreview');

  fileInput.addEventListener('change', () => {
    filePreview.innerHTML = '';
    const f = fileInput.files[0];
    if(f){
      const img = document.createElement('img');
      img.src = URL.createObjectURL(f);
      img.onload = ()=> URL.revokeObjectURL(img.src);
      filePreview.appendChild(img);
    }
  });

  cForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const category = el('#complaintCategory').value;
    const title = el('#complaintTitle').value.trim();
    const location = el('#complaintLocation').value.trim();
    const desc = el('#complaintDesc').value.trim();
    if(!title || !location || !desc) return alert('Please fill title, location and description.');

    setLoading(el('#sendComplaintBtn'), true);
    appendMessage('complaintResponseArea','user', `${title} — ${location}`);

    // build FormData (supports image)
    const fd = new FormData();
    fd.append('category', category);
    fd.append('title', title);
    fd.append('location', location);
    fd.append('description', desc);
    if(fileInput.files[0]) fd.append('image', fileInput.files[0]);

    try {
      const res = await fetch(API_BASE + '/api/complaint', {
        method:'POST',
        body: fd
      });
      if(!res.ok) throw new Error('backend error');
      const data = await res.json();
      const statusMsg = data.message || 'Complaint submitted. ID: ' + (data.id || 'n/a');
      appendMessage('complaintResponseArea','bot', statusMsg);
      cForm.reset();
      filePreview.innerHTML = '';
    } catch (err) {
      console.warn('Complaint backend failed:', err);
      appendMessage('complaintResponseArea','bot', '(Demo) Complaint recorded locally. Please deploy backend to store it permanently.');
      cForm.reset();
      filePreview.innerHTML = '';
    } finally {
      setLoading(el('#sendComplaintBtn'), false);
    }
  });

  el('#clearComplaintBtn').addEventListener('click', () => {
    cForm.reset();
    filePreview.innerHTML = '';
    el('#complaintResponseArea').innerHTML = '';
  });

  // Start on welcome page
  showPage('page-welcome');
});
