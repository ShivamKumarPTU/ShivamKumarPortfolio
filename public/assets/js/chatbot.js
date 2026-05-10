/**
 * Shivam Kumar Portfolio - AI Chatbot Assistant
 * Highly secure, performant assistant client with built-in anti-spam rate limits & history capping.
 */
(function () {
  const toggleBtn = document.getElementById('chat-toggle');
  const closeBtn = document.getElementById('chat-close');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chips = document.querySelectorAll('.chat-chip');

  if (!toggleBtn || !chatWindow) return;

  let isChatOpened = false;
  let hasWelcomed = false;
  let chatHistory = [];
  let lastRequestTime = 0;
  const RATE_LIMIT_MS = 2500; // Anti-spam delay (Phase 5)

  // Base64 helper for dynamic contact obfuscation (Phase 1)
  function secureDecode(str) {
    try {
      return atob(str);
    } catch (e) {
      return "";
    }
  }

  // Base64 Obfuscated contact attributes in memory (Phase 1)
  const SECURE_DATA = {
    email: "c2hpdmFtcmFuYXBvYXJpQGdtYWlsLmNvbQ==", // shivamranapoari@gmail.com
    hiring_email: "aGlyZS5zaGl2YW1rdW1hckBnbWFpbC5jb20=", // hire.shivamkumar@gmail.com
    phone: "KzkxIDYyMDQwIDgxMzE1", // +91 62040 81315
    whatsapp: "OTE2MjA0MDgxMzE1", // 916204081315
  };

  const MY_DATA = {
    basic: {
      name: "Shivam Kumar",
      title: "Native Android Developer (Kotlin)",
      tagline: "Full-Stack Android Developer · AI Integration Expert · Production-Ready Solutions",
      motto: "Code is for humans to read, and only incidentally for machines to execute. Clean code is not just a goal; it's a professional standard.",
      email: secureDecode(SECURE_DATA.email),
      hiring_email: secureDecode(SECURE_DATA.hiring_email),
      phone: secureDecode(SECURE_DATA.phone),
      whatsapp: secureDecode(SECURE_DATA.whatsapp),
      location: "Puducherry (Pondicherry), India",
      github: "https://github.com/ShivamKumarPTU",
      linkedin: "https://www.linkedin.com/in/shivam-kumar-1b1611210/",
      twitter: "https://x.com/WinksCool",
      freelancer: "https://www.freelancer.com/u/AndroidShivam",
      fiverr: "https://www.fiverr.com/sellers/shivamrana3_/edit",
      website: "https://shivamkumarptu.github.io/ShivamKumarPortfolio/",
      resume: "https://shivamkumarptu.github.io/ShivamKumarPortfolio/assets/Resume/Oracle_ShivamKumar_Resume.pdf",
      calendly: "https://shivamkumarptu.github.io/ShivamKumarPortfolio/#Get-In-Touch",
      avatar: "SK",
      status: "B.Tech student (2023–2027) + Actively available for freelance & full-time roles",
      responseTime: "Usually within 4–6 hours"
    },
    education: [
      {
        degree: "B.Tech Mechatronics, Robotics & Automation Engineering",
        university: "Puducherry Technological University (PTU), Pondicherry, India",
        duration: "September 2023 – May 2027 (Ongoing)",
        cgpa: "9.21 / 10 (Excellent academic standing)",
        awards: ["Harihara Subramanian Scholar — Top Merit Award 2023–27 at PTU", "Academic Excellence Scholar Grant (2024)"]
      },
      {
        degree: "Class 12 (High School)",
        school: "Bihar Board — +2 High School Telmar, Nalanda",
        grade: "84.6%",
        details: "JEE Prep completed at FIITJEE (July 2020 – May 2022) in Physics, Chemistry, and Math",
        awards: ["Fortunate 40 National Scholar (2020–22)"]
      },
      {
        degree: "Class 10 (Secondary School)",
        school: "CBSE — Jawahar Navodaya Vidyalaya (JNV), Rajgir, Nalanda",
        grade: "89.6%"
      }
    ],
    experience: [
      {
        role: "Incoming Intern",
        company: "SVNIT Surat / OneBill AI CoE (Offers Selected)",
        duration: "Joining Summer 2026",
        details: "Shivam has received two highly selective internship offers for 2026: (Option A) Summer Internship at Dept. of CSE, SVNIT Surat (NIT Surat, May-July 2026), or (Option B) OneBill AI Centre of Excellence, PTU (June 2026). He will join one to focus on AI/Android development.",
        tech: ["Android Systems", "AI", "Mobile Engineering"]
      },
      {
        role: "Internshala Student Partner",
        company: "Internshala",
        duration: "2023",
        highlights: [
          "Strengthened campus outreach, increasing program visibility by 35% through targeted digital campaigns",
          "Coordinated events for 200+ students",
          "Developed leadership, communication, and execution skills"
        ]
      }
    ],
    achievements_and_awards: [
      {
        title: "🥇 Winner — Puduvai Innovation Competition 2026",
        details: "Organized by Ministry of Education & Government of Puducherry. Ranked Top 70 out of 250+ national teams. Awarded a ₹10,000 Prototype Grant for the project theme: 'Technology Designed For Real World Adoption' at PTU Auditorium."
      },
      {
        title: "Harihara Subramanian Scholar Merit Award",
        details: "PTU's top merit award winner (2023–27)."
      },
      {
        title: "Fortunate 40 National Scholar",
        details: "Merit award scholar (2020–22)."
      },
      {
        title: "Certificate of Participation — NITS HACKS 7.0",
        details: "Participated in the UI/UX Track at the NIT Surat national hackathon."
      },
      {
        title: "Freshman Orientation Lead",
        details: "Coordinated the orientation team for 200+ freshmen, achieving 95% positive feedback."
      }
    ],
    skills: {
      android: {
        languages: ["Kotlin (Primary)", "Java"],
        architecture: ["MVVM", "Clean Architecture", "Repository Pattern"],
        jetpack: ["Jetpack Compose", "Navigation Component", "LiveData", "ViewModel", "WorkManager", "Room Database (SQLite)", "DataStore", "Hilt"],
        ui_ux: ["Material Design 3", "XML Layouts", "Jetpack Fragments"],
        background: ["WorkManager", "Foreground Services", "Coroutines & Flow"],
        networking: ["Retrofit", "OkHttp", "Protocol Buffers", "REST APIs"],
        maps_media_testing: ["Google Maps SDK", "Geofencing API", "MediaRecorder API", "FileProvider", "Thumbnail generation", "MPAndroidChart", "JUnit 4", "Mockito", "Espresso"]
      },
      backend_cloud: {
        firebase: ["Authentication", "Firestore", "Realtime Database", "Storage", "Cloud Messaging (FCM)", "Analytics"],
        frameworks: ["FastAPI (Python)", "Uvicorn", "Docker", "Google Cloud Run (Serverless, Auto-scaling)"],
        ai_models: ["OpenAI Whisper (speech-to-text)", "HuggingFace Transformers", "j-hartmann/emotion-english-distilroberta-base", "PyTorch (CPU)"]
      },
      languages_and_embedded: ["Python", "C++", "C", "Embedded C", "Arduino", "Ultrasonic Sensors", "IoT Protocols", "Serial Communication", "MATLAB"]
    },
    projects: [
      {
        name: "VoxAnalyzer — AI Powered Voice Emotion Analyzer",
        github: "https://github.com/ShivamKumarPTU/VoxAnalyzer",
        highlights: [
          "Built a full-stack AI-powered Android application for voice-based emotion analysis with secure cloud deployment on Google Cloud Run.",
          "Integrated OpenAI Whisper for speech-to-text and a Transformer-based model for segment-level emotion detection.",
          "Designed interactive emotion visualizations including confidence-over-time line charts and overall distribution pie charts.",
          "Implemented structured JSON API handling with offline persistence using Room Database and clean MVVM architecture."
        ],
        tech: ["Kotlin", "FastAPI (Python)", "OpenAI Whisper", "HuggingFace Transformers", "Docker", "Google Cloud Run", "Room SQLite", "MPAndroidChart"]
      },
      {
        name: "NightLibrary — Secure Media Vault & Manager",
        github: "https://github.com/ShivamKumarPTU/NightLibrary",
        highlights: [
          "Developed a privacy-focused Android application to securely store, manage, and organize sensitive media (photos, videos, documents) with seamless user experience.",
          "Implemented advanced media handling pipelines including import, download, and camera capture with real-time thumbnail generation and categorized rendering.",
          "Designed an offline-first architecture using Room Database with MVVM and background workers (WorkManager) for reliable media processing and persistence.",
          "Built a scalable modular system handling encryption-ready storage, file sharing via FileProvider, and optimized caching strategies to ensure performance under storage constraints."
        ],
        tech: ["Kotlin", "Room Database", "WorkManager", "Kotlin Coroutines", "Scoped Storage API", "Hilt"]
      },
      {
        name: "GeoFence Tracker — Child Safety & Location Monitoring App",
        github: "https://github.com/ShivamKumarPTU/GeoFence-Tracker",
        highlights: [
          "Developed an Android application enabling users to create geofences, detect entry/exit events, and calculate time spent within locations.",
          "Implemented reliable background location tracking (Android 10+) using Google Maps SDK, Geofencing API, and Room Database.",
          "Designed persistent geofence storage and visit history tracking that survives app restarts and background execution constraints."
        ],
        tech: ["Kotlin", "Google Maps SDK", "Geofencing API", "Foreground Services", "Room Database"]
      },
      {
        name: "GymSaathi — AI Workout Logger & Analyzer",
        github: "https://github.com/ShivamKumarPTU/GymSaathi",
        website: "https://shivamkumarptu.github.io/GymSaathi-Landing-Page/",
        figma: "https://www.figma.com/make/wufemtm3e5dfcQphv8V2mg/AI-Workout-Logger",
        highlights: [
          "AI-powered fitness app that intelligently logs workouts, analyzes progress, detects plateaus, and delivers adaptive training insights.",
          "Integrates progressive overload recommendations and real-time visualization with MPAndroidChart."
        ],
        tech: ["Kotlin", "Room Database", "MPAndroidChart", "Firebase Auth", "Google Play Billing"]
      },
      {
        name: "Full Screen Timer App",
        github: "https://github.com/ShivamKumarPTU/Full_Screen_Timer",
        apk: "https://github.com/ShivamKumarPTU/Full_Screen_Timer/releases/download/v1.1/app-release.apk",
        highlights: [
          "Built a distraction-free timer app with persistent sessions using Firebase Auth and DataStore.",
          "Reduced background battery usage by 25% through lifecycle-aware wake-lock and resource handling.",
          "Implemented clean MVVM architecture with Material 3 UI and robust state management."
        ],
        tech: ["Kotlin", "WorkManager", "Firebase Auth", "DataStore", "Material 3"]
      },
      {
        name: "Smart Radar System (Class Project)",
        highlights: [
          "Arduino-based radar system using ultrasonic sensors for real-time object detection with 180-degree scanning and distance visualization."
        ],
        tech: ["Arduino", "Embedded C/C++", "Ultrasonic Sensors", "Processing"]
      }
    ],
    services: {
      custom_android: "End-to-end modern, high-quality Android apps tailored to business needs",
      maintenance_optimization: "Bug fixes, performance improvements, memory leak tuning, and feature additions",
      firebase_integration: "Authentication, database schema setups, cloud messaging, and file storage systems",
      ui_ux_conversion: "Figma or style files to native Kotlin responsive views using Material Design 3 or Compose"
    }
  };

  const systemPrompt = `You are an AI Assistant representing Shivam Kumar, a professional Native Android Developer (Kotlin) & Full-Stack Engineer.
Answer ONLY from the provided context. If a question is genuinely outside this scope, strictly follow the fallback instructions.

=== PERSONAL DATA ===
${JSON.stringify(MY_DATA, null, 2)}

=== TONE & RULES ===
- Be professional, enthusiastic, and concise (3 sentences max per reply).
- Always speak in the third person about Shivam or as his first-person representative.
- Use clean bullet points for short lists to keep responses premium.

=== FALLBACK INSTRUCTIONS ===
- If a question is genuinely outside the scope of MY_DATA, reply: "I don't have that specific detail handy. You can reach Shivam directly at ${MY_DATA.basic.email} or on WhatsApp at +91 62040 81315 — he typically responds within 4–6 hours."
- If asked about pricing or project quotes: "Pricing depends on your specific requirements. Please reach out to Shivam directly at ${MY_DATA.basic.email} to get a custom quote — he'll get back to you within 4–6 hours."
- If asked personal/private questions not inside MY_DATA: "That's outside what I can answer here. Feel free to connect directly with Shivam on LinkedIn or via email."`;

  function appendMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'typing-indicator';
    indicator.className = 'chat-bubble bot typing-bubble';
    indicator.innerHTML = `
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  function showWelcomeMessage() {
    if (hasWelcomed) return;
    appendMessage('bot', "Hi! I'm Shivam's AI Assistant. How can I help you bring your app idea to life today? 🚀");
    hasWelcomed = true;
  }

  // Open / Close action listeners
  toggleBtn.addEventListener('click', () => {
    isChatOpened = !isChatOpened;
    chatWindow.classList.toggle('active', isChatOpened);
    if (isChatOpened) {
      showWelcomeMessage();
      setTimeout(() => chatInput.focus(), 300);
    }
  });

  closeBtn.addEventListener('click', () => {
    isChatOpened = false;
    chatWindow.classList.remove('active');
  });

  async function handleUserSubmit(query) {
    if (!query.trim()) return;

    // 1. Rate-limiting check (Phase 5)
    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT_MS) {
      appendMessage('bot', "Please wait a moment before sending another message. I'm thinking! 🤖");
      return;
    }
    lastRequestTime = now;

    appendMessage('user', query);
    chatHistory.push({ role: 'user', content: query });

    // 2. Bound history queue to prevent context blowouts (Phase 5)
    if (chatHistory.length > 12) {
      chatHistory = chatHistory.slice(-12);
    }

    showTypingIndicator();

    try {
      // Direct relative endpoint configuration (Phase 1)
      let endpoint = '/api/chat';
      if (window.location.hostname !== 'shivam-app-studio.vercel.app') {
        endpoint = 'https://shivam-app-studio.vercel.app/api/chat';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...chatHistory
          ]
        })
      });

      removeTypingIndicator();

      if (!response.ok) {
        throw new Error(`Groq Gateway Error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0].message.content.trim();

      appendMessage('bot', reply);
      chatHistory.push({ role: 'assistant', content: reply });

    } catch (error) {
      console.error('Chatbot error:', error);
      removeTypingIndicator();
      appendMessage('bot', "I'm having a slight trouble connecting right now. Please try again, or use the contact form below to drop Shivam a direct message! ✉=");
    }
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value;
    chatInput.value = '';
    handleUserSubmit(text);
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleUserSubmit(query);
    });
  });
})();
