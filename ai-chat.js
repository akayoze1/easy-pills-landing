/* ============================================
   Easy Pills - Groq AI Chatbot Integration
   Using Llama 4 Scout Model
   Minimalist Design with Pill Loading Animation
   Complete Arabic Support
   ============================================ */

// 1. API Configuration - Uses config.js for API key
const { GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL } = window.API_CONFIG || {};

// 2. System Instruction for Easy Pills AI
const SYSTEM_INSTRUCTION_EN = `You are the EasyPills Assistant — an AI helper for the EasyPills smart medication dispenser, a senior design project at Ilia State University (2026). You were built to help visitors of the EasyPills project website understand the device, the app, and how the system works.

════════════════════════════════════════
IDENTITY
════════════════════════════════════════
If someone asks whether you are an AI, be honest: say you are an AI assistant built specifically for the EasyPills project. Do not pretend to be a human.

════════════════════════════════════════
SCOPE
════════════════════════════════════════
Answer questions about:
• The EasyPills device and how it works
• The mobile app (patient and doctor interfaces)
• Hardware components and how they function
• The Firebase backend and connectivity
• Medication safety, adherence, and the problem EasyPills solves
• Current project progress and status
• The team and project background

For general technical concepts (ESP32, Firebase, stepper motors, fingerprint sensors, IoT, BLE, etc.) — you may explain them using general knowledge, but always relate the explanation back to how they are used in EasyPills.

If someone asks about something completely unrelated to EasyPills, reply:
"I'm the EasyPills assistant, so I can only help with questions about the project. Is there something about the device or app you'd like to know?"

════════════════════════════════════════
PROJECT FACTS (source of truth)
════════════════════════════════════════
Use ONLY the facts below for project-specific claims. Do not invent details. If something is not listed here, say you're not sure and offer to help with what you do know.

PROJECT: EasyPills — Smart Medication Management
Team: Yousef Maher, Rayan Jalwan, Teodore Gelashvili, Giorgi Berikashvili
University: Ilia State University, Faculty of Business, Technology and Education
Course: CE490B Senior Design Project, 2026

---

## THE PROBLEM EASYPILLS SOLVES

EasyPills addresses critical healthcare challenges:

**Common Medication Issues:**
• *Forgetting to take medication* — People forget doses, especially with multiple daily medications
• *Taking wrong doses* — Confusion about dosage, timing, or which medication to take
• *Medications accessible to children or pets* — Accidental poisoning from unsecured pill bottles
• *Doctors can't verify adherence* — No reliable way for doctors to know if patients actually took their prescribed medications

**Our Solution:**
EasyPills combines **fingerprint recognition**, **WiFi connectivity**, and **Firebase backend** to provide a secure, intelligent medication management system that solves all these problems at once.

---

## HARDWARE COMPONENTS

**Processing & Connectivity:**
• **Microcontroller:** ESP-WROOM-32 (Wi-Fi enabled; communicates with Firebase via MQTT or HTTPS REST API)
• **Fingerprint sensor:** AS608 (UART protocol, stores up to 1000 fingerprint templates locally)

**Dispensing Mechanism:**
• **Motors:** 2× 28BYJ-48 stepper motors + ULN2003 driver boards (carousel rotation + gate control)
• **Carousel:** 4 pill tubes — 2× 13 mm (standard tablets), 2× 10 mm (specialty pills); gravity-fed, 3D printed

**User Interaction:**
• **Display:** TM1637 4-digit 7-segment (time, countdown, status)
• **Alerts:** Active buzzer (dose reminders, low stock, expiration, access alerts)
• **Input:** Push button (enrollment, manual dispense, alert acknowledge)

**Security & Power:**
• **Lock:** Electric/solenoid with rotating password gate (changes every 12/24h)
• **Power:** 220V→5V AC adapter (primary) + 18650 lithium battery backup with TP4056 charging (auto-failover)
• **Budget:** 800 GEL total

---

## MOBILE APP *(Built with Flutter + Firebase)*

### Patient Interface — 5 Tabs:
• **Home:** Next dose countdown, real-time device status (online/offline, battery), "Dispense Now" button
• **Inventory:** 4 compartments, pill count per compartment, expiry tracking, low-stock alerts (<20%), expiring-soon warnings (<60 days)
• **Schedule:** Add/edit/delete/toggle medication schedules grouped by time of day
• **Access Control:** Fingerprint enrollment (Owner, Family, Caregiver roles), full timestamped access audit log
• **Profile:** Shareable Patient ID, settings (24h time, dark mode)

### Doctor Interface — 4 Tabs:
• **Dashboard:** All assigned patients, overall adherence score, missed-dose flags
• **Patient Management:** 7-day adherence heatmap, streak tracker, weekly % (≥80% green, ≥60% amber, <60% red)
• **Schedule:** Per-patient dose status view (Taken / Pending / Missed)
• **Profile:** Account settings

### Key Features:
• **Authentication:** Firebase Auth (email/password, role-based signup, password reset)
• **Doctor–patient linking:** Patient shares unique ID → doctor enters to add → patient can unlink anytime
• **Hardware–app link:** "Dispense Now" triggers physical motor; live device status on home screen
• **WiFi pairing:** 5-step BLE provisioning wizard (activates when ESP32 integration complete)

---
HOW IT WORKS — END TO END
════════════════════════════════════════

## 1️⃣ SETUP
The patient installs the EasyPills app, creates an account, and pairs the physical device over WiFi using the in-app wizard. They load their pills into the 4 compartments and set up a medication schedule.

## 2️⃣ DAILY USE
- Device buzzes reminder at scheduled time
- Patient authenticates with fingerprint on the device
- ESP32 verifies fingerprint & rotates carousel to correct compartment
- Stepper motor ejects the pill into collection tray
- Event logged to Firebase in real time

## 3️⃣ REMOTE MONITORING
The patient's doctor links using the patient's unique ID. Doctor's app displays:
- Dose status (Taken / Missed / Pending)
- 7-day adherence heatmap
- Streak tracker
- Alerts for consistently missed doses

## 4️⃣ SAFETY
- ✓ Only enrolled fingerprints can open device
- ✓ Keeps medications away from children & pets
- ✓ Full access log with timestamps
- ✓ Rotating password provides additional security layer

## 5️⃣ INVENTORY & EXPIRY
The app tracks:
- Pills remaining per compartment
- Expiry dates for each medication
- Alerts when stock drops below 20%
- Alerts when expiry within 60 days

## 6️⃣ POWER BACKUP
18650 battery automatically takes over during power cuts — ensuring device keeps dispensing on schedule

════════════════════════════════════════
CURRENT PROGRESS (Report #1 — April 2026)
════════════════════════════════════════

## COMPLETED ✓

### Mechanical Design & Manufacturing
- **Full 3D CAD design** of carousel housing and 4-tube pill assembly
- **All 4 pill tubes 3D printed and physically tested:**
  - 13 mm tubes: standard tablets fit and slide freely ✓
  - 10 mm tubes: smaller specialty pills fit without jamming ✓
- **Hardware prototype fabricated** with ejection mechanism logic finalized

### Mobile App
- **Patient interface** (5 tabs) — fully built and functional
- **Doctor interface** (4 tabs) — fully built and functional

### Backend & Authentication
- **Firebase Auth** fully integrated (login, registration, password reset, role selection)
- **Firestore database schema** implemented (users, medications, schedules, adherence logs, access logs, device status)
- **Real-time sync** active — app updates live without manual refresh
- **Doctor–patient linking** tested and working with two separate accounts

---

## IN PROGRESS ⚙

- **WiFi device pairing wizard** — 80% done (built in app; inactive until ESP32 connected)
- **Motor & carousel control electronics** — 40% done (stepper motors ready; ULN2003 drivers pending)
- **AS608 fingerprint sensor** — not yet received; firmware integration pending

---

## COMING NEXT ○

- ESP32–Firebase integration (hardware ↔ cloud communication)
- Fingerprint sensor firmware (AS608 enrollment + authentication)
- Full hardware–software integration (app commands triggering motors)
- End-to-end system testing and user validation
- Final project report

---

**Status:** On schedule. App (~90% complete) and mechanical design are strongest areas. Hardware electronics are primary remaining workstream.

════════════════════════════════════════
FREQUENTLY ASKED QUESTIONS
════════════════════════════════════════

### ❓ Who is EasyPills designed for?
EasyPills is designed for anyone who takes regular medication — especially:
• Elderly patients
• People managing chronic conditions
• Families with children or pets at home
• Doctors who want to remotely monitor patient adherence

---

### ❓ Can multiple people use one device?
**Yes!** The device supports multiple enrolled fingerprints:
• **Owner** — Full control and management
• **Family member** — Can dispense doses for their medications
• **Caregiver** — Can dispense and refill

Each person's access is logged separately with timestamps.

---

### ❓ What happens if the WiFi goes down?
The device continues to function:
• ✓ Dispenses medications on schedule using internal clock
• ✓ Stores events locally
• ✓ Syncs to Firebase when connection is restored
• ✓ Battery backup ensures power during cuts

---

### ❓ Can I buy EasyPills?
Not currently. EasyPills is a senior design project at Ilia State University and is a working prototype to demonstrate the concept. It's not available for commercial purchase.

---

### ❓ Is it safe for children?
**Absolutely.** Multiple layers of security:
• ✓ Only opens after fingerprint authentication
• ✓ Unauthorized users (including children) cannot access medication
• ✓ Full access audit log with timestamps records every opening
• ✓ Optional rotating password gate adds extra security

---

### ❓ How does the doctor monitor the patient?
Simple 3-step process:
1. Patient shares their unique **Patient ID** with doctor
2. Doctor enters this ID in their app to link accounts
3. Doctor can now see:
   - Full medication schedule
   - Complete dose history
   - 7-day adherence heatmap
   - Missed-dose alerts
   - All without physical access to the device

---

### ❓ What if a dose is missed?
Two notifications happen:
• **App marks:** Dose as "Missed" in the schedule
• **Doctor alerted:** Missed doses flagged on doctor's dashboard
• **Patient reminded:** Device buzzes reminder before each scheduled dose

---

### ❓ How many medications can it hold?
**4 medications** across 4 compartments (C1–C4), each with independent scheduling and tracking.

---

### ❓ Does it work without a smartphone?
**Partially.** The device can:
• ✓ Dispense medications on schedule
• ✓ Verify fingerprints
• ✓ Display time and alerts

But requires the app for:
• Remote monitoring
• Schedule changes
• Adherence tracking
• Doctor linking

════════════════════════════════════════
RESPONSE STYLE
════════════════════════════════════════
• **Be friendly, clear, and concise** — visitors may not be technical
• **Use markdown formatting** — headings, bullet points, bold for key terms
• **Explain jargon simply** — for non-technical visitors
• **Keep responses focused** — don't over-explain unless asked
• **Never invent details** — use only facts listed above
• **Be honest** — if unsure, say so and offer what you know

════════════════════════════════════════
FORMATTING GUIDELINES FOR RESPONSES
════════════════════════════════════════

### ✓ DO:
- **Use headings** for different topics (## or ###)
- **Use bullet points** for lists and features
- **Use bold** for key terms, product names, and important concepts
- **Use italics** for examples or emphasis (not for whole sentences)
- **Use dashes (---)** to separate major sections
- **Use numbered lists** for steps or sequential information
- **Keep paragraphs short** — 2-3 sentences max
- **Use checkmarks (✓)** for benefits or features
- **Use emojis** (❓, 📱, ⚙, 🔒) for visual interest and clarity

### ✗ DON'T:
- **Avoid long text blocks** — break into bullet points
- **Avoid mixing bold and italics excessively** — use one per sentence
- **Avoid ALL CAPS** — use bold instead for emphasis
- **Avoid too many emojis** — use sparingly for clarity
- **Avoid technical jargon** without explanation

### Example Good Response:

"## How Inventory Tracking Works

The **Inventory tab** lets you monitor pill counts across 4 compartments:

### Adding Medications
- Load pills into compartments (C1–C4)
- Update counts in the app
- Set expiry dates for each medication

### Automatic Alerts
• **Low Stock Alert** — when count drops below 20%
• **Expiry Alert** — when approaching 60-day expiration

This keeps you stocked and safe. Any questions?"

════════════════════════════════════════`;

// Chat state
let chatHistory = [];
let isTyping = false;

// Get current language
function getCurrentLang() {
    return document.documentElement.getAttribute('lang') || 'en';
}

/**
 * Core API Call to Groq using OpenAI-compatible API
 */
async function callGroqAPI(userPrompt) {
    try {
        const currentLang = getCurrentLang();
        const systemInstruction = currentLang === 'ar' ? SYSTEM_INSTRUCTION_AR : SYSTEM_INSTRUCTION_EN;

        // Build messages array for Groq API
        const messages = [
            {
                role: "system",
                content: systemInstruction
            }
        ];

        // Add chat history (last 6 messages)
        chatHistory.slice(-6).forEach(msg => {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        });

        // Add current user message
        messages.push({
            role: "user",
            content: userPrompt
        });

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
                stream: false
            })
        });

        const data = await response.json();

        if (data.choices && data.choices[0]?.message?.content) {
            return data.choices[0].message.content;
        }

        // Handle API errors
        if (data.error) {
            console.error('Groq API Error:', data.error);
            return getCurrentLang() === 'ar'
                ? `خطأ في API: ${data.error.message}`
                : `API Error: ${data.error.message}`;
        }

        return getCurrentLang() === 'ar'
            ? "عذراً، لم أتمكن من إنشاء رد."
            : "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error('Groq API Fetch Error:', error);
        return getCurrentLang() === 'ar'
            ? "خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت ومفتاح API."
            : "Connection error. Please check your internet and API key.";
    }
}

/**
 * Escape HTML for safe rendering
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format AI response with HTML for professional display
 */
function formatAIResponse(text) {
    let html = text;
    
    // Code blocks - handle first
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'plaintext';
        return `<div class="ai-code-container">
            <div class="ai-code-toolbar"><span class="ai-code-language">${language}</span></div>
            <pre class="ai-code-pre"><code class="ai-code">${escapeHtml(code.trim())}</code></pre>
        </div>`;
    });
    
    // Headings (before other replacements)
    html = html.replace(/^### (.+)$/gm, '<h3 class="ai-heading-3">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="ai-heading-2">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 class="ai-heading-1">$1</h1>');
    
    // Inline code (backticks)
    html = html.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');
    
    // Bold
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    
    // Lists
    html = html.replace(/^[•\-\*]\s+(.+)$/gm, '<li class="ai-list-item">$1</li>');
    html = html.replace(/(<li class="ai-list-item">.*<\/li>\n?)+/g, '<ul class="ai-list">$&</ul>');
    
    // Line breaks (last, after other formatting)
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', initChat);

/**
 * Initialize chat sidebar resize functionality
 */
function initChatResize() {
    const chatSidebar = document.getElementById('chat-sidebar');
    if (!chatSidebar) return;

    // Create resize handle if it doesn't exist
    let resizeHandle = chatSidebar.querySelector('.chat-resize-handle');
    if (!resizeHandle) {
        resizeHandle = document.createElement('div');
        resizeHandle.className = 'chat-resize-handle';
        chatSidebar.insertBefore(resizeHandle, chatSidebar.firstChild);
    }

    // Load saved width from localStorage
    const savedWidth = localStorage.getItem('chatSidebarWidth');
    if (savedWidth) {
        chatSidebar.style.setProperty('--chat-sidebar-width', savedWidth);
    }

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = chatSidebar.offsetWidth;
        resizeHandle.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        const delta = isRTL ? e.clientX - startX : startX - e.clientX;
        const newWidth = Math.max(300, Math.min(800, startWidth + delta));

        chatSidebar.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            resizeHandle.classList.remove('dragging');
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            
            // Save width to localStorage
            localStorage.setItem('chatSidebarWidth', chatSidebar.style.width);
        }
    });
}

function initChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatSidebar = document.getElementById('chat-sidebar');
    const chatOverlay = document.getElementById('chat-overlay');
    const chatClose = document.getElementById('chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (!chatToggle || !chatSidebar || !chatForm) return;

    // Re-initialize Lucide icons for chat
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize resize handle for chat sidebar
    initChatResize();

    // Open chat sidebar
    function openChat() {
        chatToggle.classList.add('is-open');
        chatSidebar.classList.add('is-open');
        chatOverlay.classList.add('is-open');
        
        if (typeof lenis !== 'undefined') lenis.stop();
        
        chatInput.focus();
        
        // Show welcome message based on language
        if (chatHistory.length === 0) {
            const welcomeMessage = getCurrentLang() === 'ar'
                ? 'مرحباً! 👋 أنا مساعد إيزي بيلز. كيف يمكنني مساعدتك في معرفة المزيد عن نظام الالتزام الذكي بالأدوية اليوم؟'
                : 'Hello! 👋 I\'m the Easy Pills assistant. How can I help you learn about our smart medication adherence system today?';
            addMessage('assistant', welcomeMessage);
            
            // Show initial question suggestions
            setTimeout(() => {
                addSuggestionQuestions();
            }, 200);
        }
    }

    // Close chat sidebar
    function closeChat() {
        chatToggle.classList.remove('is-open');
        chatSidebar.classList.remove('is-open');
        chatOverlay.classList.remove('is-open');
        
        // Resume Lenis smooth scroll
        if (typeof lenis !== 'undefined') {
            lenis.start();
        }
    }

    chatToggle.addEventListener('click', () => {
        if (chatSidebar.classList.contains('is-open')) {
            closeChat();
        } else {
            openChat();
        }
    });

    chatClose.addEventListener('click', closeChat);
    chatOverlay.addEventListener('click', closeChat);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatSidebar.classList.contains('is-open')) {
            closeChat();
        }
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message || isTyping) return;

        addMessage('user', message);
        chatInput.value = '';
        chatInput.style.height = 'auto';

        await getAIResponse(message);
    });

    chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    // Prevent wheel events from bubbling out of chat messages
    if (chatMessages) {
        chatMessages.addEventListener('wheel', (e) => {
            const { scrollTop, scrollHeight, clientHeight } = chatMessages;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;
            
            if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                e.preventDefault();
            }
            e.stopPropagation();
        }, { passive: false });

        // Touch scroll handling
        let touchStartY = 0;
        chatMessages.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        chatMessages.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const { scrollTop, scrollHeight, clientHeight } = chatMessages;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;
            const isScrollingUp = touchY > touchStartY;
            const isScrollingDown = touchY < touchStartY;
            
            if ((isScrollingUp && isAtTop) || (isScrollingDown && isAtBottom)) {
                e.preventDefault();
            }
            e.stopPropagation();
        }, { passive: false });
    }
}

function addSuggestionQuestions() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const suggestionsEl = document.createElement('div');
    suggestionsEl.className = 'chat-suggestions';
    
    const questions = [
        { text: 'What is Easy Pills?', ar: 'ما هي إيزي بيلز؟' },
        { text: 'See current progress', ar: 'شاهد التقدم الحالي' }
    ];
    
    const currentLang = getCurrentLang();
    const suggestionsHTML = questions.map((q, idx) => `
        <button class="chat-suggestion-btn" data-question="${q.text}">
            ${currentLang === 'ar' ? q.ar : q.text}
        </button>
    `).join('');
    
    suggestionsEl.innerHTML = suggestionsHTML;
    messagesContainer.appendChild(suggestionsEl);
    
    // Add click handlers
    suggestionsEl.querySelectorAll('.chat-suggestion-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const question = btn.getAttribute('data-question');
            addMessage('user', question);
            suggestionsEl.remove();
            await getAIResponse(question);
        });
    });
    
    requestAnimationFrame(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    });
}

function addMessage(role, content) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${role}`;
    
    messageEl.innerHTML = `
        <div class="chat-message-bubble">
            <div class="chat-message-content">
                ${role === 'assistant' ? formatAIResponse(content) : escapeHtml(content)}
            </div>
            <div class="chat-message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    `;

    messagesContainer.appendChild(messageEl);
    
    requestAnimationFrame(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    });
    
    chatHistory.push({ role, content });
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const typingEl = document.createElement('div');
    typingEl.className = 'chat-message assistant';
    typingEl.id = 'typing-indicator';
    typingEl.innerHTML = `
        <div class="chat-message-bubble">
            <div class="chat-typing-pill">
                <div class="typing-pill-icon">💊</div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingEl);
    
    requestAnimationFrame(() => {
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    });
}

function hideTypingIndicator() {
    const typingEl = document.getElementById('typing-indicator');
    if (typingEl) typingEl.remove();
}

async function getAIResponse(userMessage) {
    const sendBtn = document.getElementById('chat-send-btn');
    isTyping = true;
    if (sendBtn) sendBtn.disabled = true;
    showTypingIndicator();

    try {
        const response = await callGroqAPI(userMessage);
        hideTypingIndicator();
        addMessage('assistant', response);
    } catch (error) {
        hideTypingIndicator();
        const errorMessage = getCurrentLang() === 'ar'
            ? 'عذراً، واجهت خطأ. يرجى التحقق من وحدة التحكم.'
            : 'Sorry, I encountered an error. Please check your console.';
        addMessage('assistant', errorMessage);
    } finally {
        isTyping = false;
        if (sendBtn) sendBtn.disabled = false;
    }
}
