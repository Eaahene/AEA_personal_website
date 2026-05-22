// ============================================
// PORTFOLIO DATA STORE
// Edit this file or use the Admin Panel to update content
// ============================================

const PortfolioData = {

  // ── PERSONAL INFO ──────────────────────────
  personal: {
    name: "Ahene Emmanuel Adjei",
    tagline: "Software & Hardware Systems Engineer",
    location: "Accra, Ghana",
    focus: "Systems Engineering",
    status: "Available for opportunities",
    email: "aheneemmanueladjei@email.com",
    github: "",
    linkedin: "",
    twitter: "",
    resume: "",
  },

  // ── ABOUT ──────────────────────────────────
  about: {
    paragraphs: [
      "I'm a passionate engineer with a deep interest in how systems work — from the logic gates up to the application layer. I love exploring the full stack of technology: writing elegant code, understanding embedded systems, and designing solutions that bridge the physical and digital worlds.",
      "Currently sharpening my skills and looking for opportunities to build things that matter."
    ]
  },

  // ── SKILLS ─────────────────────────────────
  skills: [
    { name: "Python", category: "Language", level: 75 },
    { name: "C / C++", category: "Language", level: 60 },
    { name: "JavaScript", category: "Language", level: 55 },
    { name: "HTML & CSS", category: "Web", level: 70 },
    { name: "Linux", category: "Systems", level: 65 },
    { name: "Git & GitHub", category: "Tools", level: 70 },
    { name: "Electronics", category: "Hardware", level: 60 },
    { name: "Arduino", category: "Hardware", level: 65 },
  ],

  // ── PROJECTS ───────────────────────────────
  projects: [
    // Add your projects here. Example:
    // {
    //   title: "Smart Home Controller",
    //   description: "An Arduino-based system that automates home appliances via a mobile interface.",
    //   tags: ["Arduino", "C++", "IoT"],
    //   github: "https://github.com/...",
    //   demo: "",
    //   image: ""
    // }
  ],

  // ── BLOG ───────────────────────────────────
  blog: [
    // Add blog posts here. Example:
    // {
    //   title: "Understanding Memory Management in C",
    //   date: "2024-11-10",
    //   excerpt: "A deep dive into how C handles memory allocation, deallocation, and the common pitfalls.",
    //   url: "#"
    // }
  ],

  // ── CONTACT ────────────────────────────────
  contact: {
    intro: "I'm open to internships, collaborations, and interesting projects. Reach out — I'd love to connect."
  }
};

// Persist changes from admin panel
function saveData() {
  localStorage.setItem('portfolioData', JSON.stringify(PortfolioData));
}

function loadData() {
  const saved = localStorage.getItem('portfolioData');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(PortfolioData.personal, parsed.personal || {});
    Object.assign(PortfolioData.about, parsed.about || {});
    Object.assign(PortfolioData.contact, parsed.contact || {});
    if (parsed.skills?.length) PortfolioData.skills = parsed.skills;
    if (parsed.projects?.length) PortfolioData.projects = parsed.projects;
    if (parsed.blog?.length) PortfolioData.blog = parsed.blog;
  }
}

loadData();
