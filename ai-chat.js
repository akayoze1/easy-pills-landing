/* ============================================
   Easy Pills - Groq AI Chatbot Integration
   Using Llama 4 Scout Model
   Minimalist Design with Pill Loading Animation
   Complete Arabic Support
   ============================================ */

// 1. API Configuration - Uses config.js for API key
const { GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL } = window.API_CONFIG || {};

// 2. System Instruction for Easy Pills AI
const SYSTEM_INSTRUCTION_EN = `You are the EasyPills Assistant — an AI helper for the EasyPills smart medication dispenser, a senior design project at Ilia State University (2026).

You were built to help visitors of the EasyPills project website understand the device, the app, and how the system works.

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

GOALS:
• Ensure patients take the right medication at the right time
• Prevent unauthorized access — child and pet safety
• Monitor pill inventory and expiration dates
• Connect doctors and patients via shared adherence data

HARDWARE:
• Microcontroller: ESP-WROOM-32 (Wi-Fi, communicates via MQTT or HTTPS REST to Firebase)
• Fingerprint sensor: AS608 (UART, stores up to 1000 templates)
• Dispensing: 2× 28BYJ-48 stepper motors + ULN2003 driver boards
• Display: TM1637 4-digit 7-segment (shows time, countdown, status)
• Alerts: Active buzzer (dose reminders, low stock, expiration warnings)
• Manual input: Push button (enroll fingerprint, dispense, acknowledge alert)
• Lock: Electric/solenoid lock with optional rotating password (changes every 12/24 h)
• Power: 220V→5V AC adapter + 18650 lithium battery backup with TP4056 charging
• Carousel: 4 pill tubes (2× 13 mm for standard tablets, 2× 10 mm for smaller pills) — 3D printed and physically tested
• Budget: ~800 GEL total

MOBILE APP (Flutter/Firebase):
• Patient interface (5 tabs):
  - Home: next dose countdown, live device status (online/offline, battery)
  - Inventory: 6 compartments (C1–C6), pill count, expiry tracking, low-stock alerts
  - Schedule: add/edit/delete/toggle medication schedules by time of day
  - Access Control: fingerprint enrollment (Owner, Family, Caregiver roles), full access audit log
  - Profile: shareable Patient ID, settings (24h time, dark mode)
• Doctor interface (4 tabs):
  - Dashboard: all assigned patients, aggregate adherence score, missed-dose flags
  - Patient Management: 7-day adherence heatmap, streak tracker, weekly % (≥80% green, ≥60% amber)
  - Schedule: per-patient dose status (Taken / Pending / Missed)
  - Profile: account settings
• Authentication: Firebase Auth (email/password, role selection, password reset)
• Doctor–patient linking: patient shares unique Patient ID; doctor enters it to add patient
• Hardware integration: "Dispense Now" button in app triggers physical motor; live device status shown in app
• WiFi pairing: 5-step BLE provisioning wizard on first launch

CURRENT STATUS (as of April 2026):
• 3D CAD design and printing — complete
• Physical pill fit testing (both tube sizes) — complete
• Mobile app (patient + doctor interfaces) — ~90% complete
• Firebase Auth + Firestore integration — complete
• Hardware prototype fabrication — complete
• Motor & carousel control electronics — in progress
• Hardware–software integration — in progress
• User testing — planned

════════════════════════════════════════
RESPONSE STYLE
════════════════════════════════════════
• Be friendly, clear, and concise — visitors may not be technical
• Use bullet points for lists, bold for key terms
• For non-technical visitors, avoid jargon or explain it simply
• Keep responses focused — don't over-explain unless asked
• Never make up project-specific details not listed above`;

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
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'plaintext';
        return `<div class="ai-code-container">
            <div class="ai-code-toolbar"><span class="ai-code-language">${language}</span></div>
            <pre class="ai-code-pre"><code class="ai-code">${escapeHtml(code.trim())}</code></pre>
        </div>`;
    });
    
    html = html.replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^[•\-\*]\s+(.+)$/gm, '<li class="ai-list-item">$1</li>');
    html = html.replace(/(<li class="ai-list-item">.*<\/li>\n?)+/g, '<ul class="ai-list">$&</ul>');
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', initChat);

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
