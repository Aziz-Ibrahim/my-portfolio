
// Personal info
export const personalInfo = {
  name: "Aziz Ibrahim",
  title: "Full Stack Developer",
  tagline: "Full Stack Developer | Django & Python Expert | React & Node.js Enthusiast",
  email: "aziz.ibrahim8@icloud.com",
  github: "https://github.com/aziz-ibrahim",
  linkedin: "https://linkedin.com/in/aziz-ibrahim8",
  cvFileName: "my-cv.pdf"
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

export const aboutContent = {
  aboutText: [
    "I'm a passionate full-stack developer with a strong foundation in Python, Django, JavaScript, and React. I enjoy building projects that solve real problems—whether it's e-commerce platforms like InfoCrumbs and Boutique Ado, or experimenting with AI tools such as a story generator built using OpenAI's API and LangChain.",
    "I love creating solutions that solve real-world problems and have a keen eye for both functionality and user experience. My background in Django has given me a solid foundation in web development principles that I'm now applying to learn React and Node.js."
  ],
  skills: {
    backend: {
      title: "Backend Expertise",
      icon: "Server",
      list: ["Python", "Django", "Django REST", "PostgreSQL", "Redis", "Celery"]
    },
    frontend: {
      title: "Frontend Skills",
      icon: "Globe",
      list: ["React", "JavaScript", "HTML5", "CSS3", "Bootstrap", "jQuery"]
    },
    learning: {
      title: "Currently Learning",
      icon: "Code",
      list: ["Node.js", "Express.js", "MongoDB", "TypeScript"]
    }
  }
};

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
];

export const contactInfo = {
    intro: "I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!",
    links: [
        { text: "Email Me", href: `mailto:${personalInfo.email}`, icon: "Mail" },
        { text: "LinkedIn", href: personalInfo.linkedin, icon: "Linkedin" },
        { text: "Download My CV", href: "/my-cv.pdf", icon: "Download" },
    ]
};