// script.js – with FAQ search for Kothamangalam, Kerala
const faqData = {
  water: [
    {
      q: "What should I do if my tap water supply is suddenly cut off?",
      a: `Steps:
1. Check if neighbors are affected: Determine whether it’s a household issue or a community outage.
2. Look for announcements: Check local municipality or water department notifications via app, website, or WhatsApp groups.
3. Use stored water wisely: Ration drinking, cooking, and hygiene water.
4. Seek alternative sources: Nearby community taps, tankers, or bottled water.
5. Report the issue: Use municipal complaint portal or local helpline with address and timing.`
    },
    {
      q: "How can I report water leakage or burst pipes in my area?",
      a: `Steps:
1. Document the leak: Take a photo or short video for clarity.
2. Identify location: Note landmarks, house number, or GPS coordinates.
3. Report to authorities: Use municipal app, helpline, or local ward office.
4. Warn neighbors: Block area or mark it to prevent accidents.
5. Follow up: Track complaint ID until repair is confirmed.`
    },
    {
      q: "How to know if your tap water is contaminated?",
      a: `Steps:
1. Check appearance and smell: Cloudy water, foul odor, or unusual color is a warning.
2. Observe health symptoms: Upset stomach, diarrhea, or rashes after consumption.
3. Test water at home: Use a simple water testing kit for bacteria, pH, chlorine.
4. Report contamination: Contact local water authority or public health department.
5. Use safe water alternatives: Boil water or use filters until issue is resolved.`
    },
    {
      q: "How to manage water storage at home to avoid contamination?",
      a: `Steps:
1. Use clean containers: Wash water tanks and storage jars regularly.
2. Cover water containers: Prevent dust, insects, and debris from entering.
3. Avoid cross-contamination: Don’t dip hands or dirty vessels in storage water.
4. Use taps or spigots: Avoid direct pouring from jugs for drinking water.
5. Clean tanks periodically: Remove sediments and disinfect once every 3–6 months.`
    },
    {
      q: "How to get emergency water supply during a drought or shortage?",
      a: `Steps:
1. Contact municipal water department: Ask about tanker or community water distribution schedule.
2. Check NGOs or community groups: Some provide emergency water support in droughts.
3. Use rainwater harvesting if available: Collect and filter rainwater safely.
4. Store safely: Use clean, covered containers.
5. Ration water usage: Prioritize drinking, cooking, and hygiene.`
    },
    {
      q: "How can I reduce water wastage at home?",
      a: `Steps:
1. Fix leaks immediately: Faucets, tanks, and pipelines.
2. Use water-efficient devices: Low-flow taps, showerheads, and toilets.
3. Reuse water: Use leftover water for cleaning or gardening.
4. Educate family members: Encourage responsible water usage.
5. Monitor usage: Check water meter monthly to detect unusual spikes.`
    },
    {
      q: "How do I know my water is safe during flooding or post-flood situation?",
      a: `Steps:
1. Avoid direct tap water: Floods can contaminate pipelines.
2. Boil water: Bring water to a rolling boil for 1–3 minutes.
3. Use purification tablets or filters if boiling isn’t possible.
4. Store safely: Keep in clean, covered containers.
5. Report contamination to authorities: Helps them take corrective action and alert the community.`
    },
    {
      q: "How to check water pressure issues and what to do?",
      a: `Steps:
1. Check all taps: Determine if low pressure is in specific taps or the entire house.
2. Inspect for leaks: Hidden pipe leaks can cause low pressure.
3. Check municipal supply timings: Sometimes low pressure occurs during peak usage hours.
4. Install pressure booster if needed: Only if supply is consistent but low pressure persists.
5. Report persistent issues: Contact water department with details.`
    },
    {
      q: "How can I manage water billing and connections?",
      a: `Steps:
1. Check current bill via municipal app/website.
2. Pay bills online/offline and save receipt.
3. Report incorrect bills with evidence.
4. Apply for new connections (collect documents, pay fees, schedule inspection).
5. Track connection application status online.
6. Request additional/high-capacity connections if usage exceeds limit.
7. Keep self-readings for meter verification.`
    }
  ],
  electricity: [
    {
      q: "What to do if there’s a power outage?",
      a: `Steps:
1. Check if neighbors are affected.
2. Look for official announcements via utility app/website.
3. Use emergency lighting safely.
4. Avoid opening fridge/freezer for long periods.
5. Report outage to local electricity board if prolonged.`
    },
    {
      q: "How to report electrical hazards?",
      a: `Steps:
1. Identify the hazard (exposed wires, sparking, fallen poles).
2. Avoid touching affected areas.
3. Contact electricity board/helpline immediately.
4. Warn neighbors and cordon off area.
5. Follow up to ensure repair.`
    },
    {
      q: "How can I manage electricity billing?",
      a: `Steps:
1. Check meter reading and bill online.
2. Pay online/offline and save receipt.
3. Report discrepancies with photos and readings.
4. Schedule meter inspection if readings seem off.
5. Monitor consumption to avoid spikes.`
    },
    {
      q: "How to apply for a new electricity connection?",
      a: `Steps:
1. Check eligibility and required documents (ID, property proof).
2. Submit application online/offline.
3. Pay connection fee.
4. Schedule inspection and meter installation.
5. Track connection status online.`
    },
    {
      q: "How to report a power outage?",
      a: `Call KSEB Customer Care 1912 or use https://www.kseb.in/online-services`
    },
    {
      q: "Who to contact for faulty wiring?",
      a: `Call local KSEB Kothamangalam office or 1912 for emergencies.`
    },
    {
      q: "How can I check scheduled power cuts?",
      a: `Visit https://www.kseb.in/outage-schedule or call local office.`
    },
    {
      q: "How can I check my electricity consumption?",
      a: `Login to https://www.kseb.in/online-services with Consumer Number.`
    }
  ],
  health: [
    {
      q: "I’m in a medical emergency. Who should I contact?",
      a: `Steps:
1. Call emergency services: India – 108 (ambulance), 102 (medical transport)
2. Provide location (street, landmark, floor, GPS coordinates) and patient condition.
3. Follow operator instructions for first aid if needed.
4. Prepare documents: ID, insurance, previous medical history.
5. Stay on the line until help arrives.`
    },
    {
      q: "How can I find vaccinations?",
      a: `Steps:
1. Check official immunization schedules (children, adults, pregnant women).
2. Locate vaccination centers via government apps, hospitals, or clinics.
3. Book appointments if required.
4. Carry ID and vaccination records.
5. Follow all doses as per schedule.`
    },
    {
      q: "How can I find an ambulance nearby?",
      a: `Steps:
1. Call emergency numbers (India – 108/102; global local services).
2. Use dedicated ambulance apps if available.
3. Provide location and patient condition.
4. Prepare path and patient for pickup.`
    },
    {
      q: "What should I do in case of a snake or animal attack?",
      a: `Steps:
1. Move to safe location; do not chase/capture animal.
2. Call emergency services or local animal control.
3. First aid: Snake bite – immobilize limb; Other bites – wash & antiseptic.
4. Seek hospital treatment (anti-venom, rabies vaccine).
5. Report incident to authorities.`
    },
    {
      q: "I need urgent blood or plasma. What should I do?",
      a: `Steps:
1. Identify blood group.
2. Contact local blood banks/hospitals.
3. Use verified donor networks/apps.
4. Share patient details (blood group, urgency, location).
5. Arrange transport to hospital.`
    },
    {
      q: "How can I report a public health hazard?",
      a: `Steps:
1. Identify hazard (contaminated water, mosquito breeding, chemical spill).
2. Contact local authorities (municipality/health department).
3. Provide location, type, severity.
4. Follow safety instructions.
5. Follow up to confirm resolution.`
    },
    {
      q: "What to do in case of fire or mass casualty event?",
      a: `Steps:
1. Call fire/emergency services.
2. Evacuate immediately, avoid elevators.
3. Assist others safely.
4. Provide first aid.
5. Follow official instructions.`
    },
    {
      q: "I have symptoms of contagious disease (flu, COVID-19). What should I do?",
      a: `Steps:
1. Isolate yourself.
2. Seek medical guidance.
3. Get tested if required.
4. Follow treatment instructions.
5. Inform close contacts.`
    },
    {
      q: "Where is the nearest hospital?",
      a: `Govt. Taluk Hospital Kothamangalam: 0485-2821010`
    },
    {
      q: "How to book a hospital appointment online?",
      a: `Use Kerala eHealth: https://www.ehealth.kerala.gov.in`
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
function searchFaq(question) {
  const msg = question.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  Object.keys(faqData).forEach(cat => {
    faqData[cat].forEach(item => {
      const qLower = item.q.toLowerCase();

      const stopWords = ['how','to','the','a','in','is','of','my','for','what','where'];
      const msgWords = msg.split(/\W+/).filter(w => w && !stopWords.includes(w));
      const qWords   = qLower.split(/\W+/).filter(w => w && !stopWords.includes(w));

      const overlap = msgWords.filter(w => qWords.includes(w));
      const score = overlap.length;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });
  });

  if (bestScore >= 2) return bestMatch;
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  el('#startBtn').addEventListener('click', () => {
    const district = el('#districtSelect').value;
    const municipality = el('#municipalityInput').value.trim();
    if (!district || !municipality) return alert('Choose district and enter municipality.');
    userLocation = { district, municipality };
    showPage('page-choice');
  });

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

    const faqMatch = searchFaq(message);
    if (faqMatch) {
      appendChat('bot', faqMatch.a);
      return;
    }

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
