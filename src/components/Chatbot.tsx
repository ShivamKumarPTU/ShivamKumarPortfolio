import React, { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';

const MY_DATA = {
  basic: {
    name: "Shivam Kumar",
    title: "Native Android Developer (Kotlin)",
    tagline: "Full-Stack Android Developer · AI Integration Expert · Production-Ready Solutions",
    motto: "Code is for humans to read, and only incidentally for machines to execute. Clean code is not just a goal; it's a professional standard.",
    email: "shivamranapoari@gmail.com",
    hiring_email: "hire.shivamkumar@gmail.com",
    phone: "+91 62040 81315",
    whatsapp: "916204081315",
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

const contextMarkdown = `
NAME: Shivam Kumar (Native Android Developer & Full-Stack Engineer)
TAGLINE: Full-Stack Android Developer · AI Integration Expert · Production-Ready Solutions
MOTTO: "Code is for humans to read, and only incidentally for machines to execute."
CONTACT: Email: shivamranapoari@gmail.com | Hiring Email: hire.shivamkumar@gmail.com | Phone/WhatsApp: +91 62040 81315
SOCIAL: GitHub: https://github.com/ShivamKumarPTU | LinkedIn: https://www.linkedin.com/in/shivam-kumar-1b1611210/
LOCATION: Puducherry, India
STATUS: B.Tech Mechatronics Engineering student (2023–2027) at Puducherry Technological University (PTU). Actively available for freelance & full-time roles. Usually replies within 4-6 hours.

EDUCATION:
- B.Tech Mechatronics (PTU, 2023-27): Ongoing, CGPA: 9.21/10. Harihara Subramanian Scholar (Top merit award 2023-27). Academic Excellence Scholar Grant (2024).
- Class 12: Bihar Board (84.6%), FIITJEE JEE Prep, Fortunate 40 Scholar.
- Class 10: CBSE JNV Rajgir (89.6%).

EXPERIENCE & OFFERS:
- Incoming Intern (Joining Summer 2026): Selected for two selective internship offers: SVNIT Surat Summer Internship (Dept. of CSE, May-July 2026), or OneBill AI Centre of Excellence PTU (June 2026).
- Internshala Student Partner (2023): Increased campus visibility by 35%, coordinated events for 200+ students.

ACHIEVEMENTS:
- Winner — Puduvai Innovation Competition 2026 (Ministry of Education & Govt of Puducherry). Top 70 of 250+ teams. ₹10,000 Prototype Grant winner.
- NITS HACKS 7.0 UI/UX Track participant.
- Freshman Orientation Lead for 200+ students.

SKILLS:
- Android: Kotlin (Primary), Java, MVVM, Clean Architecture, Jetpack Compose, WorkManager, Room, Hilt, Retrofit, Maps SDK, Geofencing, MediaRecorder, MPAndroidChart, JUnit, Mockito, Espresso.
- Backend/Cloud/AI: Firebase (Auth, Firestore, FCM), FastAPI (Python), Google Cloud Run (Serverless), Docker, OpenAI Whisper, HuggingFace Transformers, PyTorch.
- Embedded: C++, Python, Embedded C, Arduino, IoT, MATLAB.

PROJECTS:
- VoxAnalyzer: AI-powered voice emotion analyzer Kotlin app. Google Cloud Run FastAPI backend, Whisper audio STT, HuggingFace Transformers emotion ML, MPAndroidChart, Room DB.
- NightLibrary: Offline-first secure media vault & manager. Room DB, WorkManager, Scoped Storage API, Hilt.
- GeoFence Tracker: Location child safety app using Google Maps SDK, Geofencing API, Foreground Services, Room.
- GymSaathi: AI workout logger & plateau analyzer. Kotlin, Compose, MPAndroidChart, Firebase, Play Billing.
- Full Screen Timer: Distraction-free timer. WorkManager, Firebase, DataStore, Material 3 UI. Reduced battery drain by 25%.
- Smart Radar: Arduino scanning ultrasonic radar. Embedded C/C++, Processing distance graph.

SERVICES:
- Custom Android Apps: Tailored high-quality Kotlin/Compose native business applications.
- Maintenance & Optimization: Bug fixes, performance improvements, memory leak tuning, and new feature additions.
- Firebase integration: Auth, real-time sync, cloud messages.
- Figma to Kotlin Compose/XML high-fidelity layout translation.
`;

const systemPrompt = `You are an AI Assistant representing Shivam Kumar, a professional Native Android Developer (Kotlin) & Full-Stack Engineer.
Answer ONLY from the provided context. If a question is genuinely outside this scope, strictly follow the fallback instructions.

=== PERSONAL DATA ===
${contextMarkdown}

=== TONE & RULES ===
- Be professional, enthusiastic, and concise (3 sentences max per reply).
- Always speak in the third person about Shivam or as his first-person representative.
- Use clean bullet points for short lists to keep responses premium.

=== FALLBACK INSTRUCTIONS ===
- If a question is genuinely outside the scope of MY_DATA, reply: "I don't have that specific detail handy. You can reach Shivam directly at shivamranapoari@gmail.com or on WhatsApp at +91 62040 81315 — he typically responds within 4–6 hours."
- If asked about pricing or project quotes: "Pricing depends on your specific requirements. Please reach out to Shivam directly at shivamranapoari@gmail.com to get a custom quote — he'll get back to you within 4–6 hours."
- If asked personal/private questions not inside MY_DATA: "That's outside what I can answer here. Feel free to connect directly with Shivam on LinkedIn or via email."`;

const formatChatbotResponse = (text: string) => {
  // 1. Escape HTML for security, keeping our generated HTML intact
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Regex to match external http/https URLs in markdown [label](url)
  const markdownLinks: string[] = [];
  escaped = escaped.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (match, label, url) => {
    let cleanUrl = url;
    let suffix = "";
    const puncMatch = url.match(/[.,;:!)]+$/);
    if (puncMatch) {
      cleanUrl = url.substring(0, url.length - puncMatch[0].length);
      suffix = puncMatch[0];
    }
    const id = `___MDLINK_${markdownLinks.length}___`;
    markdownLinks.push(`<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="chat-inline-link" style="color: var(--blue); text-decoration: underline; font-weight: 600; text-shadow: 0 0 10px rgba(0, 224, 255, 0.3); transition: color 0.3s;">${label}</a>${suffix}`);
    return id;
  });

  // 3. Regex to match external http/https URLs (raw URLs)
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  escaped = escaped.replace(urlRegex, (url) => {
    if (url.startsWith('___MDLINK_')) return url;
    let cleanUrl = url;
    let suffix = "";
    const puncMatch = url.match(/[.,;:!)]+$/);
    if (puncMatch) {
      cleanUrl = url.substring(0, url.length - puncMatch[0].length);
      suffix = puncMatch[0];
    }
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="chat-inline-link" style="color: var(--blue); text-decoration: underline; font-weight: 600; text-shadow: 0 0 10px rgba(0, 224, 255, 0.3); transition: color 0.3s;">${cleanUrl}</a>` + suffix;
  });

  // 4. Restore the markdown links from placeholders
  markdownLinks.forEach((linkHtml, index) => {
    escaped = escaped.replace(`___MDLINK_${index}___`, linkHtml);
  });

  // 5. Regex to match email addresses and open direct Gmail webmail composer in a new tab
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
  escaped = escaped.replace(emailRegex, (email) => {
    let cleanEmail = email;
    let suffix = "";
    const puncMatch = email.match(/[.,;:!)]+$/);
    if (puncMatch) {
      cleanEmail = email.substring(0, email.length - puncMatch[0].length);
      suffix = puncMatch[0];
    }
    return `<a href="https://mail.google.com/mail/?view=cm&fs=1&to=${cleanEmail}" target="_blank" rel="noopener noreferrer" class="chat-inline-link" style="color: var(--blue); text-decoration: underline; font-weight: 600; text-shadow: 0 0 10px rgba(0, 224, 255, 0.3); transition: color 0.3s;">${cleanEmail}</a>` + suffix;
  });

  // 6. Regex to match phone numbers (including standard +91 formatting and spaces)
  const phoneRegex = /(\+91[\s-]?\d{5}[\s-]?\d{5}|\+91[\s-]?\d{10})/g;
  escaped = escaped.replace(phoneRegex, (num) => {
    const cleanNum = num.replace(/[\s-]/g, '');
    return `<a href="tel:${cleanNum}" class="chat-inline-link" style="color: var(--blue); text-decoration: underline; font-weight: 600; text-shadow: 0 0 10px rgba(0, 224, 255, 0.3); transition: color 0.3s;">${num}</a>`;
  });

  // 7. Mapping of internal HTML page files with user-friendly clickable anchor tags
  const htmlFiles = [
    { file: 'awards.html', label: 'Awards & Honors' },
    { file: 'about-shivam-kumar-android-developer.html', label: 'About Shivam' },
    { file: 'android-developer-roadmap-by-shivam.html', label: 'Android Roadmap' },
    { file: 'cost-of-android-app-development-india.html', label: 'App Cost Guide' },
    { file: 'firebase-integration-android-guide.html', label: 'Firebase Guide' },
    { file: 'kotlin-for-android-developers.html', label: 'Kotlin Guide' },
    { file: 'android-project-ideas-guide.html', label: 'Project Ideas' },
    { file: 'hire-android-developer-guide.html', label: 'Hire Android Developer' },
    { file: 'android-app-case-studies.html', label: 'Case Studies' }
  ];

  htmlFiles.forEach(({ file, label }) => {
    // Escape special regex characters in the filename
    const escapedFile = file.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedFile}\\b`, 'g');
    escaped = escaped.replace(regex, `<a href="/${file}" class="chat-inline-link" style="color: var(--blue); text-decoration: underline; font-weight: 600; text-shadow: 0 0 10px rgba(0, 224, 255, 0.3); transition: color 0.3s;">${label}</a>`);
  });

  // 8. Format inline markdown (bold, italic, code)
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  escaped = escaped.replace(/`([^`]+)`/g, '<code class="chat-code" style="background: rgba(255, 255, 255, 0.15); padding: 2px 6px; border-radius: 4px; font-family: \'Fira Code\', monospace; font-size: 0.9em; border: 1px solid rgba(255, 255, 255, 0.1); color: var(--blue);">$1</code>');

  // 9. Structure line-by-line (perfect spacing and list layout)
  const lines = escaped.split('\n');
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();

    // Bullet lists
    const bulletMatch = line.match(/^(\s*)([-*+•])\s+(.*)$/);
    if (bulletMatch) {
      const content = bulletMatch[3];
      return `<div class="chat-list-item" style="margin: 6px 0 6px 12px; display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;"><span style="color: var(--blue); flex-shrink: 0; font-size: 1.1em; line-height: 1.3;">•</span><span>${content}</span></div>`;
    }

    // Numbered lists
    const numberMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (numberMatch) {
      const num = numberMatch[2];
      const content = numberMatch[3];
      return `<div class="chat-list-item" style="margin: 6px 0 6px 12px; display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;"><span style="color: var(--blue); font-weight: 600; flex-shrink: 0; font-size: 0.95em; line-height: 1.4;">${num}.</span><span>${content}</span></div>`;
    }

    // Headers
    const headerMatch = line.match(/^(\s*)(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[2].length;
      const content = headerMatch[3];
      const fontSize = level === 1 ? '1.25rem' : level === 2 ? '1.15rem' : '1.05rem';
      return `<div style="font-weight: 700; margin: 14px 0 6px 0; color: #fff; font-size: ${fontSize}; line-height: 1.3;">${content}</div>`;
    }

    if (trimmed === '') {
      return '<div style="height: 10px;"></div>';
    }

    return `<div style="margin-bottom: 8px; line-height: 1.5;">${line}</div>`;
  });

  return processedLines.join('');
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, lenis]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'bot', content: "Hi! I'm Shivam's AI Assistant. How can I help you bring your app idea to life today? 🚀" }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = async (e?: React.FormEvent, predefinedQuery?: string) => {
    e?.preventDefault();
    const query = predefinedQuery || input;
    if (!query.trim()) return;

    setInput('');
    const newMessages = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const endpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'https://shivam-app-studio.vercel.app/api/chat' 
        : '/api/chat';

      const history = newMessages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content })).slice(-12);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          messages: [{ role: 'system', content: systemPrompt }, ...history]
        })
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      const reply = data.choices[0].message.content.trim();
      
      setMessages(prev => [...prev, { role: 'bot', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "I'm having a slight trouble connecting right now. Please use the contact form!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="portfolio-chatbot" className={`portfolio-chatbot-wrapper ${isOpen ? 'active' : ''}`}>
      <div id="chat-toggle" className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-robot"></i>
        <span className="chat-toggle-badge">AI</span>
      </div>

      <div id="chat-window" className={`chat-window ${isOpen ? 'active' : ''}`} data-lenis-prevent="true" style={{ overscrollBehavior: 'contain' }}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">S</div>
            <div>
              <h4 className="chat-title">Shivam's AI Guide</h4>
              <span className="chat-status"><span className="status-dot"></span> Online</span>
            </div>
          </div>
          <button id="chat-close" className="chat-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
        </div>

        <div id="chat-messages" className="chat-messages" data-lenis-prevent="true" style={{ overscrollBehavior: 'contain' }}>
          {messages.map((msg, i) => {
            const displayContent = msg.role === 'bot' ? formatChatbotResponse(msg.content) : msg.content;
            return (
              <div key={i} className={`chat-bubble ${msg.role}`} dangerouslySetInnerHTML={{ __html: displayContent }} />
            );
          })}
          {isTyping && (
            <div className="chat-bubble bot typing-bubble">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-chips-container">
          <div className="chat-chips">
            <button className="chat-chip" onClick={() => handleSubmit(undefined, "What services do you offer?")}>🛠️ Services</button>
            <button className="chat-chip" onClick={() => handleSubmit(undefined, "How can I hire Shivam?")}>🤝 Hire Shivam</button>
            <button className="chat-chip" onClick={() => handleSubmit(undefined, "Can I see your portfolio?")}>📁 Portfolio</button>
            <button className="chat-chip" onClick={() => handleSubmit(undefined, "How can I download your resume?")}>📄 Resume</button>
          </div>
        </div>

        <form id="chat-form" className="chat-input-area" onSubmit={handleSubmit}>
          <input type="text" id="chat-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about Shivam's services..." required autoComplete="off" />
          <button type="submit" className="chat-send-btn"><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
