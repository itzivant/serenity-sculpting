// ─── SERENITY SCULPTING CHATBOT ───
// Scripted assistant for Serenity Sculpting by Crystal
// Handles: services, pricing, booking, payments, hours, FAQ

(function () {
  'use strict';

  // ─── KNOWLEDGE BASE ───
  const KB = {
    services: [
      { name: 'Ultrasonic Cavitation', price: '$120', desc: 'Breaks down fat cells using ultrasound waves. Best for belly, thighs, and arms.' },
      { name: 'Radio Frequency Tightening', price: '$100', desc: 'Firms and tightens loose skin with controlled heat. Great for post-pregnancy or weight loss.' },
      { name: 'Wood Therapy', price: '$90', desc: 'Lymphatic drainage massage using wooden tools. Sculpts and contours with immediate results.' },
      { name: 'Vacuum Therapy / BBL', price: '$110', desc: 'Lifts and contours the buttocks naturally. No injections or surgery.' },
      { name: 'Infrared Body Wrap', price: '$85', desc: 'Detoxifies and reduces cellulite with deep infrared heat. Super relaxing.' },
      { name: 'Full Body Sculpting Package', price: '$299', desc: 'Combines cavitation, RF tightening, and wood therapy in one session. Best value.' },
    ],
    hours: 'Mon–Fri: 9am–7pm · Sat: 9am–5pm · Sun: By appointment only',
    deposit: '$25 deposit required to book. It\'s applied to your service total on the day.',
    payment: 'We accept PayPal, Cash App, and cash in person. No card on file needed.',
    cancellation: 'Please cancel or reschedule at least 24 hours in advance. Late cancellations may lose their deposit.',
    location: 'Private studio — full address is shared after booking confirmation.',
    phone: '(559) 481-9143',
    bookingUrl: 'https://serenitysculpting.glossgenius.com/',
  };

  // ─── CONVERSATION FLOWS ───
  const FLOWS = {
    welcome: {
      messages: ['Hi! Welcome to Serenity Sculpting 💆‍♀️ I\'m Crystal\'s assistant. How can I help you today?'],
      quickReplies: ['Services & Pricing', 'Book an Appointment', 'Hours & Location', 'Payments & Deposits'],
    },
    services: {
      messages: ['Here\'s what we offer:'],
      listServices: true,
      quickReplies: ['Book an Appointment', 'What\'s the best service for me?', 'Back to Menu'],
    },
    booking: {
      messages: [
        'To book your session:',
        '1. Click the Book a Session button or visit the booking page.\n2. Pick your service and a time that works for you.\n3. Pay the $25 deposit through GlossGenius to confirm your spot.\n\nOr text Crystal directly at (559) 481-9143 and she\'ll get you scheduled!',
      ],
      quickReplies: ['Pay Deposit via PayPal', 'Pay Deposit via Cash App', 'Back to Menu'],
    },
    hours: {
      messages: [
        'Our hours:\n\nMon–Fri: 9am–7pm\nSat: 9am–5pm\nSun: By appointment only\n\nWe\'re located in a private studio — the full address is shared after your booking is confirmed.',
      ],
      quickReplies: ['Book an Appointment', 'Contact Crystal', 'Back to Menu'],
    },
    payments: {
      messages: [
        'A $25 deposit is required to hold your appointment — it goes toward your session total.\n\nWe accept:\n• PayPal\n• Cash App\n• Cash in person\n\nNo card storage needed.',
      ],
      quickReplies: ['Pay via PayPal', 'Pay via Cash App', 'Book an Appointment', 'Back to Menu'],
    },
    bestService: {
      messages: ['That depends on your goal! What are you looking to target?'],
      quickReplies: ['Fat reduction', 'Skin tightening', 'Butt lifting', 'Full body', 'Back to Menu'],
    },
    fatReduction: {
      messages: ['For fat reduction, **Ultrasonic Cavitation** ($120) is the most effective option. It targets stubborn fat in the belly, thighs, and arms without surgery or downtime. Most clients see a visible difference after 1–3 sessions.'],
      quickReplies: ['Book Ultrasonic Cavitation', 'See All Services', 'Back to Menu'],
    },
    skinTightening: {
      messages: ['For loose or sagging skin, **Radio Frequency Tightening** ($100) is the go-to. It uses heat to stimulate collagen and tighten the skin. Perfect after weight loss or pregnancy.'],
      quickReplies: ['Book RF Tightening', 'See All Services', 'Back to Menu'],
    },
    buttLifting: {
      messages: ['For lifting and contouring the butt naturally, **Vacuum Therapy / BBL** ($110) is perfect. No injections, no surgery — just results.'],
      quickReplies: ['Book Vacuum Therapy', 'See All Services', 'Back to Menu'],
    },
    fullBody: {
      messages: ['If you want to do it all in one session, the **Full Body Sculpting Package** ($299) is your best value. It combines cavitation, RF tightening, and wood therapy. Most clients love this for a full transformation.'],
      quickReplies: ['Book Full Body Package', 'See All Services', 'Back to Menu'],
    },
    contact: {
      messages: ['You can reach Crystal directly:\n\n📱 Text or call: (559) 481-9143\n📸 Instagram: @serenitysculpting_\n\nShe typically responds within a few hours!'],
      quickReplies: ['Book an Appointment', 'Back to Menu'],
    },
    cancellation: {
      messages: ['Please cancel or reschedule at least **24 hours** before your appointment. Late cancellations may forfeit the deposit.\n\nTo reschedule, use the Calendly link in your confirmation email or text Crystal at (559) 481-9143.'],
      quickReplies: ['Contact Crystal', 'Back to Menu'],
    },
    fallback: {
      messages: ['I\'m not sure about that one — but Crystal can answer any question! Text her at (559) 481-9143 or use the booking calendar above.'],
      quickReplies: ['Book an Appointment', 'Contact Crystal', 'Back to Menu'],
    },
  };

  // ─── KEYWORD ROUTING ───
  function routeInput(text) {
    const t = text.toLowerCase();
    if (/\b(service|treat|offer|what do|cavitat|rf|wood|vacuum|infrared|bbl|sculpt|package)\b/.test(t)) return 'services';
    if (/\b(book|schedul|appoint|calendar|session|availab|slot|time)\b/.test(t)) return 'booking';
    if (/\b(hour|open|close|when|location|address|where|studio)\b/.test(t)) return 'hours';
    if (/\b(pay|payment|deposit|price|cost|how much|fee|charge|paypal|cash app|venmo)\b/.test(t)) return 'payments';
    if (/\b(cancel|reschedul|refund)\b/.test(t)) return 'cancellation';
    if (/\b(contact|phone|number|call|text|instagram|reach)\b/.test(t)) return 'contact';
    if (/\b(best|recommend|suggest|goal|which|what should|right for)\b/.test(t)) return 'bestService';
    if (/\b(fat|slim|lose|reduction|belly|thigh|arm)\b/.test(t)) return 'fatReduction';
    if (/\b(tight|skin|sag|loose|firm|collagen|post.preg)\b/.test(t)) return 'skinTightening';
    if (/\b(butt|bbl|lift|booty|glute|behind)\b/.test(t)) return 'buttLifting';
    if (/\b(full|body|everything|all|package|total)\b/.test(t)) return 'fullBody';
    if (/\b(hi|hello|hey|hiya|good|start)\b/.test(t)) return 'welcome';
    return 'fallback';
  }

  // ─── QUICK REPLY ROUTING ───
  function routeQuickReply(text) {
    const map = {
      'services & pricing': 'services',
      'see all services': 'services',
      'book an appointment': 'booking',
      'hours & location': 'hours',
      'payments & deposits': 'payments',
      "what's the best service for me?": 'bestService',
      'fat reduction': 'fatReduction',
      'skin tightening': 'skinTightening',
      'butt lifting': 'buttLifting',
      'full body': 'fullBody',
      'contact crystal': 'contact',
      'back to menu': 'welcome',
    };
    const key = text.toLowerCase();
    if (map[key]) return map[key];

    // Booking-specific quick replies
    if (key.includes('book')) return 'booking';
    if (key.includes('pay via paypal')) {
      window.open('https://paypal.me/CRYSTAL_SERENITY/25', '_blank');
      return '__paypal__';
    }
    if (key.includes('pay via cash app') || key.includes('pay deposit via cash app')) {
      window.open('https://cash.app/$CRYSTALSERENITY', '_blank');
      return '__cashapp__';
    }
    if (key.includes('pay deposit via paypal')) {
      window.open('https://paypal.me/CRYSTAL_SERENITY/25', '_blank');
      return '__paypal__';
    }
    return routeInput(text);
  }

  // ─── STATE ───
  let isOpen = false;
  let hasGreeted = false;

  // ─── ELEMENTS ───
  const toggle = document.getElementById('chatToggle');
  const window_ = document.getElementById('chatWindow');
  const messages = document.getElementById('chatMessages');
  const quickReplies = document.getElementById('quickReplies');
  const input = document.getElementById('chatInput');
  const send = document.getElementById('chatSend');
  const iconOpen = toggle.querySelector('.chat-icon-open');
  const iconClose = toggle.querySelector('.chat-icon-close');

  // ─── OPEN / CLOSE ───
  function openChat() {
    isOpen = true;
    window_.style.display = 'flex';
    window_.style.flexDirection = 'column';
    iconOpen.style.display = 'none';
    iconClose.style.display = 'inline';
    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(() => renderFlow('welcome'), 400);
    }
  }

  function closeChat() {
    isOpen = false;
    window_.style.display = 'none';
    iconOpen.style.display = 'inline';
    iconClose.style.display = 'none';
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  document.getElementById('chatClose').addEventListener('click', closeChat);

  // ─── RENDER A BOT MESSAGE ───
  function addBotMessage(text, delay = 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'msg bot';
        // Convert **bold** markdown
        el.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        messages.appendChild(el);
        messages.scrollTop = messages.scrollHeight;
        resolve();
      }, delay);
    });
  }

  // ─── RENDER A USER MESSAGE ───
  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'msg user';
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  // ─── RENDER QUICK REPLIES ───
  function renderQuickReplies(replies) {
    quickReplies.innerHTML = '';
    if (!replies || replies.length === 0) return;
    replies.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'qr-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => handleQuickReply(label));
      quickReplies.appendChild(btn);
    });
  }

  // ─── RENDER A FLOW ───
  async function renderFlow(flowKey) {
    const flow = FLOWS[flowKey];
    if (!flow) { renderFlow('fallback'); return; }

    quickReplies.innerHTML = '';
    let delay = 0;

    for (const msg of flow.messages) {
      await addBotMessage(msg, delay);
      delay += 600;
    }

    if (flow.listServices) {
      for (const s of KB.services) {
        await addBotMessage(`**${s.name}** — ${s.price}\n${s.desc}`, delay);
        delay += 300;
      }
    }

    setTimeout(() => renderQuickReplies(flow.quickReplies), delay);
  }

  // ─── HANDLE QUICK REPLY ───
  function handleQuickReply(label) {
    addUserMessage(label);
    quickReplies.innerHTML = '';
    const dest = routeQuickReply(label);
    if (dest === '__paypal__') {
      setTimeout(() => addBotMessage('Opening PayPal in a new tab. After paying, come back and book your time in the calendar above!', 300), 0);
      setTimeout(() => renderQuickReplies(['Book an Appointment', 'Back to Menu']), 900);
      return;
    }
    if (dest === '__cashapp__') {
      setTimeout(() => addBotMessage('Opening Cash App in a new tab. After paying, come back and book your time in the calendar above!', 300), 0);
      setTimeout(() => renderQuickReplies(['Book an Appointment', 'Back to Menu']), 900);
      return;
    }
    setTimeout(() => renderFlow(dest), 300);
  }

  // ─── HANDLE FREE TEXT ───
  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    addUserMessage(text);
    input.value = '';
    quickReplies.innerHTML = '';
    const dest = routeInput(text);
    setTimeout(() => renderFlow(dest), 400);
  }

  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSend();
  });

  // ─── AUTO OPEN WITH DELAY (optional — shows chat bubble prompt) ───
  setTimeout(() => {
    if (!isOpen) {
      const nudge = document.createElement('div');
      nudge.id = 'chat-nudge';
      nudge.textContent = 'Questions? I\'m here to help!';
      nudge.style.cssText = `
        position:fixed; bottom:96px; right:24px; z-index:999;
        background:white; border-radius:12px; padding:10px 16px;
        font-size:0.85rem; box-shadow:0 4px 20px rgba(61,43,31,0.15);
        color:#3D2B1F; font-family:Georgia,serif; cursor:pointer;
        border:1.5px solid #E8B4B8; animation: fadeInUp 0.3s ease;
        white-space:nowrap;
      `;
      nudge.addEventListener('click', () => {
        nudge.remove();
        openChat();
      });
      document.body.appendChild(nudge);
      setTimeout(() => {
        if (nudge.parentNode) nudge.remove();
      }, 6000);
    }
  }, 4000);

})();
