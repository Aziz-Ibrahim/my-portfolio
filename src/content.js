
// Personal info
export const personalInfo = {
  name: "Aziz Ibrahim",
  title: "Full Stack Developer",
  tagline: "Full Stack Developer | Django & Python Expert | React & Node.js Enthusiast",
  email: "aziz.ibrahim8@icloud.com",
  github: "https://github.com/aziz-ibrahim",
  linkedin: "https://linkedin.com/in/aziz-ibrahim8",
  cvFileName: "downloads/my-cv.pdf"
};

// Sections Data
export const heroContent = {
  icon: "Code",
  cta: {
    text: "View My Work",
    icon: "ChevronDown",
    link: 'projects'
  },
  socialLinks: [
    { href: personalInfo.github, icon: "Github" },
    { href: personalInfo.linkedin, icon: "Linkedin" },
    { href: `mailto:${personalInfo.email}`, icon: "Mail" }
  ]
};

// About Section
export const aboutContent = {
  aboutText: [
    "I'm a motivated full-stack developer with a strong foundation in Python, Django, JavaScript, and React. I enjoy building projects that tackle real-world problems — from e-commerce platforms like InfoCrumbs and Boutique Ado, to experimenting with AI tools such as a story generator built using OpenAI's API and LangChain, and TL;DR AI, a Laravel-based project that leverages HuggingFace models to summarize long documents.",
    "Along the way, I’ve gained experience with modern development practices such as testing, clean code standards, and cloud deployment. I’m always eager to expand my skillset, and I take pride in learning new technologies quickly while applying them in practical, project-based settings."
  ],
  skills: {
    languages: {
      title: "Programming Languages",
      icon: "Code",
      list: ["Python", "JavaScript", "TypeScript", "PHP", "HTML5", "CSS3"]
    },
    frameworks: {
      title: "Frameworks & Libraries",
      icon: "Settings",
      list: ["Django", "Django REST", "FastAPI", "Laravel", "React", "Next.js", "Vite", "jQuery", "Mantine", "TailwindCSS", "Bootstrap"]
    },
    databases: {
      title: "Databases & Caching",
      icon: "Database",
      list: ["PostgreSQL", "MongoDB", "Supabase", "Redis"]
    },
    devops: {
      title: "Cloud & DevOps Tools",
      icon: "Cloud",
      list: ["Git", "AWS", "Docker", "Kubernetes", "Vercel", "Heroku", "CI/CD", "Unit Testing", "JSLint", "PEP8"]
    },
    ai_ml: {
      title: "AI & Data (APIs/Libs)",
      icon: "Brain",
      list: ["AI/ML APIs", "LangChain", "HuggingFace Transformers", "Pandas"]
    },
    tools: {
      title: "Other Tools & Services",
      icon: "Server",
      list: ["Stripe", "Brevo (Sendinblue)", "Jest"]
    },
    learning: {
      title: "Currently Exploring",
      icon: "Rocket",
      list: ["GraphQL", "WordPress", "Rust"]
    }
  }
};



// Projects Section
export const projects = [
  {
    id: 1,
    title: "RotaIQ",
    description: "A smart web application designed to help multi-site businesses manage shift gaps and improve workforce efficiency.",
    technologies: ["Django REST", "PostgreSQL", "React.js", "Vite", "Tailwind CSS"],
    liveUrl: "https://rotaiq.uk",
    githubUrl: "https://github.com/aziz-ibrahim/rotaiq",
    featured: true
  },
  {
    id: 2,
    title: "InfoCrumbs",
    description: "A sophisticated Django-based web application engineered to revolutionize how users consume digital content.",
    technologies: ["Django", "PostgreSQL", "JavaScript", "Stripe", "Bootstrap"],
    liveUrl: "https://infocrumbs-9d4b700e944a.herokuapp.com/",
    githubUrl: "https://github.com/aziz-ibrahim/infocrumbs",
    featured: true
  },
  {
    id: 3,
    title: "Cinemate",
    description: "A dynamic web application designed to empower movie enthusiasts to discover, review, and curate their favorite films.",
    technologies: ["Django", "AJAX", "PostgreSQL", "Bootstrap", "jQuery"],
    liveUrl: "https://cinemate-776f20737057.herokuapp.com/",
    githubUrl: "https://github.com/aziz-ibrahim/cinemate",
    featured: true
  },
  {
    id: 4,
    title: "Boutique Ado",
    description: "E-commerce platform for a boutique store, featuring product listings, shopping cart, and secure checkout.",
    technologies: ["Django", "AJAX", "PostgreSQL", "Stripe", "AWS"],
    liveUrl: "https://aziz-boutique-ado-99793c83af51.herokuapp.com/",
    githubUrl: "https://github.com/aziz-ibrahim/boutique_ado_v1",
    featured: false
  },
  {
    id: 5,
    title: "Math4Kids",
    description: "A fun, interactive educational platform designed to help children strengthen their mathematical skills.",
    technologies: ["HTML", "JavaScript", "CSS"],
    liveUrl: "https://aziz-ibrahim.github.io/math4kids/game.html",
    githubUrl: "https://github.com/Aziz-Ibrahim/math4kids",
    featured: false
  },
  {
    id: 6, 
    title: "TL;DR AI", 
    description: "A Laravel + Vite web app that helps users quickly digest long documents by generating AI-powered summaries. Upload TXT, DOCX, or PDF files and TL;DR AI will use HuggingFace transformers to create concise summaries. Designed to save time, improve productivity, and it’s completely free to use.", 
    technologies: ["PHP", "Laravel", "Vite", "HuggingFace AI", "JavaScript", "PDF/Docx Processing"], 
    liveUrl: "https://tl-dr-ai-26e826225710.herokuapp.com/",
    githubUrl: "https://github.com/aziz-ibrahim/tldr-ai", 
    featured: true
  },
];

// Contact Section
export const contactInfo = {
    intro: "I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!",
    links: [
        { text: "Email Me", href: `mailto:${personalInfo.email}`, icon: "Mail" },
        { text: "LinkedIn", href: personalInfo.linkedin, icon: "Linkedin" },
    ]
};