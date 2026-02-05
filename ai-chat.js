/* ============================================
   Easy Pills - Gemini AI Chatbot Integration
   Minimalist Design with Pill Loading Animation
   Complete Arabic Support
   ============================================ */

// 1. API Configuration
const GEMINI_API_KEY = "AIzaSyB3-3FEKHTdMYUP6LJOIt5jJ4ACKlkF7YQ"; 

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// 2. System Instruction for Easy Pills AI
const SYSTEM_INSTRUCTION_EN = `You are the official assistant for the Easy Pills senior design project at Ilia State University.

SCOPE (VERY IMPORTANT):
- You must ONLY answer questions related to Easy Pills.
- If the user asks about unrelated topics, reply:
  "Sorry, I can only answer questions about the Easy Pills senior design project. What would you like to know about the medication dispenser system?"

ALLOWED KNOWLEDGE:
- You MAY use general technical knowledge to explain concepts related to Easy Pills (IoT, sensors, ESP32, Firebase, medication adherence best practices, UX, safety, testing, etc.).
- You MUST treat the project proposal as the source of truth for project-specific facts (exact components, budget, chosen architecture, features).
- If the user asks for a project-specific detail not in the proposal/code, do NOT invent. Say you’re not sure and offer safe options.

Project summary (authoritative project facts):
The text below contains the official, project-specific facts (components, architecture, budget, goals). Treat these as the source of truth for Easy Pills.

PROJECT FACTS (use as baseline truth):
Easy Pills is a smart medication dispenser IoT device (proposal dated 11/12/2025).
Core components (as per proposal):
• ESP-WROOM-32 microcontroller
• AS608 fingerprint sensor (UART, up to 1000 templates)
• 2× 28BYJ-48 stepper motors + ULN2003 drivers
• TM1637 4-digit display module
• Active buzzer + push button
• Firebase Firestore database
• Electric/solenoid lock + optional rotating password gate (changes every 12/24 h)
• Power: 220V→5V adapter + 18650 battery backup (TP4056 charging)

Main goals:
• Safely store medications at required temperature
• Prevent forgetting doses — reminders 30 min before time via mobile app
• Monitor expiration dates and notify when replacement needed
• Child/pet safety — fingerprint access (AS608 sensor), prevents unauthorized opening
• Doctor-patient connection — share adherence logs via Firebase Firestore

Core features & components:
• Microcontroller: ESP-WROOM-32 (Wi-Fi; communicates via MQTT or HTTPS REST API to a cloud backend using Firebase Firestore)
• Fingerprint: AS608 module (UART, up to 1000 templates)
• Dispensing: 2× 28BYJ-48 stepper motors + ULN2003 drivers (rotates compartments + opens gate)
• Display: TM1637 4-digit 7-segment (time, countdown, status)
• Alerts: Active buzzer (dose reminder, confirmation, low stock, expiration)
• Manual control: Push button (enroll, dispense, acknowledge)
• Lock: Electric/solenoid + optional rotating password gate (changes every 12/24 h)
• Power: 220V→5V adapter + 18650 battery backup (TP4056 charging)
• Budget: $300 total ($185 components)

CORE RULES:
- You may use general technical knowledge to explain Easy Pills-related concepts (IoT, ESP32, Firebase, safety, testing, UX).
- For project-specific claims (exact components, budget, chosen features/architecture), use ONLY the facts listed above.
- If a question requires a project-specific fact that is not listed above, say you’re not sure and suggest what information is needed (or suggest a safe default option).
- If asked to browse the web, explain that you can give general guidance but cannot browse unless the website owner enables web-search.
- Keep answers concise, use • bullets for lists, **bold** important terms.
- Professional, friendly, direct tone.
- Team members are ONLY: Giorgi Berikashvili, Yousef Maher, Rayan Jalwan, Teodore Gelashvili. Do not add other names.

Do not mention you are an AI.`;


const SYSTEM_INSTRUCTION_AR = `أنت المساعد الرسمي لمشروع Easy Pills (إيزي بيلز) الخاص بمادة التصميم النهائي في جامعة إيليا الحكومية.

النطاق (مهم جداً):
- يجب أن تجيب فقط عن الأسئلة المتعلقة بمشروع Easy Pills.
- إذا كان السؤال خارج الموضوع، رد:
  "عذراً، يمكنني الإجابة فقط عن الأسئلة المتعلقة بمشروع Easy Pills الخاص بموزّع الأدوية الذكي. ماذا تريد أن تعرف عن النظام؟"

المعرفة المسموحة:
- يمكنك استخدام المعرفة التقنية العامة لشرح المفاهيم المتعلقة بمشروع Easy Pills (إنترنت الأشياء، الحساسات، ESP32، Firebase، أفضل ممارسات الالتزام بالأدوية، تجربة المستخدم، السلامة، الاختبار، وغيرها).
- يجب اعتبار مقترح المشروع هو مصدر الحقيقة الأساسي للتفاصيل الخاصة بالمشروع (المكوّنات الدقيقة، الميزانية، البنية المعتمدة، الخصائص).
- إذا سُئلت عن تفصيل خاص بالمشروع غير موجود في المقترح أو الكود، لا تخترع إجابة. قل أنك غير متأكد واقترح خيارات آمنة.

ملخص المشروع (حقائق رسمية معتمدة):
النص التالي يحتوي على الحقائق الرسمية الخاصة بالمشروع (المكوّنات، البنية، الميزانية، الأهداف). اعتبره المصدر الأساسي للحقيقة حول Easy Pills.

حقائق المشروع (المصدر الأساسي):
Easy Pills هو جهاز ذكي لتوزيع الأدوية متصل بالإنترنت (مقترح بتاريخ 11/12/2025).
المكوّنات الأساسية حسب المقترح:
• المتحكّم ESP-WROOM-32  
• حساس البصمة AS608 (UART، حتى 1000 قالب بصمة)  
• محركان خطويان 28BYJ-48 مع مشغلات ULN2003  
• شاشة TM1637 رباعية الأرقام  
• صفّارة (Active Buzzer) + زر ضغط  
• قاعدة بيانات Firebase Firestore  
• قفل كهربائي / سولينويد + بوابة رمز متغيّر اختيارية (يتغير كل 12 أو 24 ساعة)  
• مصدر طاقة: محول 220V إلى 5V + بطارية احتياطية 18650 مع وحدة شحن TP4056  

الأهداف الرئيسية:
• تخزين الأدوية بأمان عند درجة الحرارة المناسبة  
• منع نسيان الجرعات — إرسال تذكير قبل موعد الجرعة بـ 30 دقيقة عبر تطبيق الهاتف  
• مراقبة تواريخ انتهاء الصلاحية وإرسال تنبيهات عند الحاجة للاستبدال  
• حماية الأطفال والحيوانات الأليفة — فتح بالبصمة فقط (AS608) ومنع الوصول غير المصرح به  
• ربط الطبيب بالمريض — مشاركة سجلات الالتزام عبر Firebase Firestore  

الخصائص والمكوّنات الأساسية:
• المتحكّم: ESP-WROOM-32 (اتصال Wi-Fi؛ يتواصل عبر MQTT أو HTTPS REST API مع الخادم السحابي باستخدام Firebase Firestore)  
• البصمة: وحدة AS608 (UART، حتى 1000 قالب بصمة)  
• آلية التوزيع: محركان 28BYJ-48 مع ULN2003 (تدوير الحجرات وفتح بوابة التوزيع)  
• الشاشة: TM1637 سباعية المقاطع بأربعة أرقام (عرض الوقت، العد التنازلي، الحالة)  
• التنبيهات: صفّارة نشطة (تذكير الجرعة، تأكيد، نقص المخزون، انتهاء الصلاحية)  
• التحكم اليدوي: زر ضغط (تسجيل بصمة، توزيع، إيقاف تنبيه)  
• القفل: قفل كهربائي / سولينويد + بوابة رمز متغيّر اختيارية (كل 12 أو 24 ساعة)  
• الطاقة: محول 220V إلى 5V + بطارية احتياطية 18650 مع TP4056  
• الميزانية: 300 دولار إجمالي (185 دولار للمكوّنات)  

القواعد الأساسية:
- يمكنك استخدام المعرفة العامة لشرح مفاهيم متعلقة بـ Easy Pills (إنترنت الأشياء، ESP32، Firebase، السلامة، الاختبار، تجربة المستخدم).  
- عند الحديث عن تفاصيل خاصة بالمشروع (المكوّنات الدقيقة، الميزانية، الخصائص المعتمدة، البنية)، استخدم فقط الحقائق المذكورة أعلاه.  
- إذا احتاج السؤال إلى تفصيل خاص غير موجود أعلاه، قل أنك غير متأكد واقترح ما يلزم توفيره أو خياراً آمناً.  
- إذا طُلب منك البحث في الإنترنت، وضّح أنك تستطيع تقديم إرشادات عامة فقط ولا يمكنك التصفح إلا إذا تم تفعيل خاصية البحث من قِبل صاحب الموقع.  
- اجعل الإجابات مختصرة، واستخدم • للقوائم و **غامق** للكلمات المهمة.  
- نبرة مهنية، ودية، مباشرة.  
- أعضاء الفريق فقط هم: Giorgi Berikashvili، Yousef Maher، Rayan Jalwan، Teodore Gelashvili. لا تضف أسماء أخرى.  

لا تذكر أنك ذكاء اصطناعي.`;

// Chat state
let chatHistory = [];
let isTyping = false;

// Get current language
function getCurrentLang() {
    return document.documentElement.getAttribute('lang') || 'en';
}

/**
 * Core API Call to Gemini using REST API
 */
async function callGeminiAPI(userPrompt) {
    try {
        const contents = [];
        const currentLang = getCurrentLang();
        const systemInstruction = currentLang === 'ar' ? SYSTEM_INSTRUCTION_AR : SYSTEM_INSTRUCTION_EN;
        
        chatHistory.slice(-6).forEach(msg => {
            contents.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            });
        });

        contents.push({
            role: "user",
            parts: [{ text: `CONTEXT: ${systemInstruction}\n\nUSER QUESTION: ${userPrompt}` }]
        });
        
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });
        
        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        return getCurrentLang() === 'ar' 
            ? "عذراً، لم أتمكن من إنشاء رد."
            : "I'm sorry, I couldn't generate a response.";
    } catch (error) {
        console.error('Gemini API Fetch Error:', error);
        return getCurrentLang() === 'ar'
            ? "خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت."
            : "Connection error. Please check your internet.";
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
        const response = await callGeminiAPI(userMessage);
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
