// script.js – with FAQ search for Kothamangalam, Kerala
const faqData = {
  water: [
    {
      q: "Why is there no water in my area today?",
      a: `Water supply interruptions in Kothamangalam can happen due to:
      1. Scheduled Maintenance: pipeline or treatment plant work.
      2. Emergency Repairs: burst pipes, pump failures, etc.
      3. Water Shortage: reservoir levels low or high seasonal demand.
      Contact KWA Kothamangalam PH Office: 0485-2822040 for updates.`
    },
    {
      q: "What time is the water supply in my locality?",
      a: `Schedules vary. Check by:
      1. Calling KWA Kothamangalam Office: 0485-2822040
      2. Visiting https://www.kwa.kerala.gov.in`
    },
    {
      q: "How can I check if water supply is scheduled for maintenance?",
      a: `See notices at:
      1. https://www.kwa.kerala.gov.in
      2. Local Kothamangalam KWA office boards
      3. Helpline: 0485-2822040`
    },
    {
      q: "Who should I contact if there is a water leak in the main pipeline?",
      a: `Report leaks:
      1. Call Emergency Helpline: 1916 (24/7)
      2. Call KWA Kothamangalam: 0485-2822040`
    },
    {
      q: "How can I pay my water bill online?",
      a: `Steps:
      1. Go to https://www.kwa.kerala.gov.in/quickpay
      2. Enter Consumer ID/RR Number.
      3. Choose payment method (UPI, NetBanking, etc.)
      4. Confirm and save receipt.`
    },
    {
      q: "How can I apply for a new water connection?",
      a: `Steps:
      1. Visit https://www.kwa.kerala.gov.in
      2. Download & fill application.
      3. Attach ID & property proof.
      4. Submit online or at Kothamangalam KWA Office (0485-2822040).`
    },
    {
      q: "How can I report low water pressure in my house?",
      a: `Steps:
      1. Go to https://www.kwa.kerala.gov.in/complaints
      2. Fill details and location.
      3. Or call 1916 / 0485-2822040`
    }
  ],
  electricity: [
    {
      q: "How to report a power outage?",
      a: `Call KSEB Customer Care 1912 or use https://www.kseb.in/online-services`
    },
    {
      q: "Who to contact for faulty wiring?",
      a: `Call local KSEB Kothamangalam office or 1912 for emergencies.`
    },
    {
      q: "How can I pay my electricity bill online?",
      a: `Steps:
      1. Visit https://www.kseb.in/online-services
      2. Enter Consumer Number
      3. Fetch bill & pay online`
    },
    {
      q: "What to do if there is a spark or exposed wire?",
      a: `Stay away and call 1912 immediately.`
    },
    {
      q: "How to request a new electricity connection?",
      a: `Apply online at https://www.kseb.in/online-services or at local KSEB office.`
    },
    {
      q: "How to check scheduled power cuts?",
      a: `Visit https://www.kseb.in/outage-schedule or call local office.`
    },
    {
      q: "How can I check my electricity consumption?",
      a: `Login to https://www.kseb.in/online-services with Consumer Number.`
    }
  ],
  health: [
    {
      q: "Where is the nearest hospital?",
      a: `Govt. Taluk Hospital Kothamangalam: 0485-2821010`
    },
    {
      q: "How to book a hospital appointment online?",
      a: `Use Kerala eHealth: https://www.ehealth.kerala.gov.in`
    },
    {
      q: "What to do for a medical emergency?",
      a: `Dial 108 and give location.`
    },
    {
      q: "How can I find a local pharmacy?",
      a: `Search Google Maps or ask local PHC.`
    },
    {
      q: "Where can I get COVID-19 vaccination?",
      a: `Book via https://www.ehealth.kerala.gov.in`
    },
    {
      q: "Who do I contact for ambulance services?",
      a: `Dial 108 or local private ambulance.`
    },
    {
      q: "How to report health hazards in the community?",
      a: `Contact PHC Kothamangalam: 0485-2821010 or https://dhs.kerala.gov.in`
    }
  ]
};

const API_BASE = 'http://localhost:3000';
let userLocation = { district: '', municipality: '' };

function el(q) { return document.querySelector(q); }

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const elPage = document.getElementById(id);
  if (elPage) elPage.classList.remove('hidden');
}

// -------------- NEW: Simple FAQ keyword search --------------
// ---------- BETTER FAQ SEARCH ----------
function searchFaq(question) {
  const msg = question.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  Object.keys(faqData).forEach(cat => {
    faqData[cat].forEach(item => {
      const qLower = item.q.toLowerCase();

      // Remove very common words
      const stopWords = ['how','to','the','a','in','is','of','my','for','what','where'];
      const msgWords = msg.split(/\W+/).filter(w => w && !stopWords.includes(w));
      const qWords   = qLower.split(/\W+/).filter(w => w && !stopWords.includes(w));

      // Count overlap
      const overlap = msgWords.filter(w => qWords.includes(w));
      const score = overlap.length;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });
  });

  // Only accept if at least 2 meaningful words overlap
  if (bestScore >= 2) return bestMatch;
  return null;
}


document.addEventListener('DOMContentLoaded', () => {
  // Welcome page
  el('#startBtn').addEventListener('click', () => {
    const district = el('#districtSelect').value;
    const municipality = el('#municipalityInput').value.trim();
    if (!district || !municipality) return alert('Choose district and enter municipality.');
    userLocation = { district, municipality };
    showPage('page-choice');
  });

  // Navigation
  el('#chooseQuery').addEventListener('click', () => {
    showPage('page-query');
    el('#showLocationQuery').textContent = `${userLocation.municipality}, ${userLocation.district}`;
  });
  el('#chooseComplaint').addEventListener('click', () => {
    showPage('page-complaint');
    el('#showLocationComplaint').textContent = `${userLocation.municipality}, ${userLocation.district}`;
  });
  el('#chooseFAQ').addEventListener('click', () => showPage('page-faq'));
  el('#backFromQuery').addEventListener('click', () => showPage('page-choice'));
  el('#backFromComplaint').addEventListener('click', () => showPage('page-choice'));
  el('#backFromFAQ').addEventListener('click', () => showPage('page-choice'));

  // Chat page
  const chatContainer = el('#chatContainer');
  const queryForm = el('#queryForm');

  function appendChat(who, text) {
    const div = document.createElement('div');
    div.className = 'chat-bubble ' + who;
    div.textContent = text;
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  queryForm.addEventListener('submit', async ev => {
    ev.preventDefault();
    const message = el('#queryMessage').value.trim();
    if (!message) return;

    appendChat('user', message);
    el('#queryMessage').value = '';

    // Check local FAQ first
    const faqMatch = searchFaq(message);
    if (faqMatch) {
      appendChat('bot', faqMatch.a);
      return;
    }

    // else call backend as before
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';
    botBubble.textContent = '...';
    chatContainer.appendChild(botBubble);

    try {
      const res = await fetch(API_BASE + '/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, location: userLocation })
      });
      const data = await res.json();
      botBubble.textContent = data.answer || 'Answer coming soon.';
    } catch (err) {
      botBubble.textContent = 'Sorry, network error.';
    }
  });

  // FAQ static page
  const faqCategorySelect = el('#faqCategorySelect');
  const faqContainer = el('#faqContainer');
  faqCategorySelect.addEventListener('change', () => {
    const category = faqCategorySelect.value;
    faqContainer.innerHTML = '';
    if (faqData[category]) {
      faqData[category].forEach(item => {
        const qaDiv = document.createElement('div');
        qaDiv.className = 'faq-item';
        qaDiv.innerHTML = `<strong>Q:</strong> ${item.q}<br><strong>A:</strong> ${item.a}`;
        faqContainer.appendChild(qaDiv);
      });
    }
  });
});
