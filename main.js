// ============================================
// PORTFOLIO MAIN SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // ── Nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── Mobile menu
  const toggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ── Render from data
  renderAbout();
  renderSkills();
  renderProjects();
  renderBlog();
  renderContact();

  // ── Reveal on scroll
  initReveal();
});

// ── ABOUT ──────────────────────────────────
function renderAbout() {
  const d = PortfolioData;
  const content = document.getElementById('aboutContent');
  if (content && d.about.paragraphs?.length) {
    content.innerHTML = d.about.paragraphs.map(p => `<p>${p}</p>`).join('');
  }
}

// ── SKILLS ─────────────────────────────────
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  const skills = PortfolioData.skills;
  if (!skills?.length) { grid.innerHTML = '<p class="mono" style="color:var(--text-muted)">// Skills coming soon.</p>'; return; }

  grid.innerHTML = skills.map(s => `
    <div class="skill-card reveal">
      <div class="skill-category">${s.category}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-level="${s.level}" style="width:0%"></div>
      </div>
    </div>
  `).join('');
}

// ── PROJECTS ───────────────────────────────
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  const empty = document.getElementById('projectsEmpty');
  if (!grid) return;

  const projects = PortfolioData.projects;
  if (!projects?.length) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  if (empty) empty.style.display = 'none';

  grid.innerHTML = projects.map(p => `
    <div class="project-card reveal">
      <div class="project-image">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
          : `<div class="project-image-placeholder"><span>// preview</span></div>`
        }
      </div>
      <div class="project-body">
        <div class="project-tags">
          ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.description}</div>
        <div class="project-links">
          ${p.github ? `<a href="${p.github}" target="_blank" class="project-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            GitHub
          </a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" class="project-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Live Demo
          </a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ── BLOG ───────────────────────────────────
function renderBlog() {
  const grid = document.getElementById('blogGrid');
  const empty = document.getElementById('blogEmpty');
  if (!grid) return;

  const posts = PortfolioData.blog;
  if (!posts?.length) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
    return;
  }

  grid.style.display = 'grid';
  if (empty) empty.style.display = 'none';

  grid.innerHTML = posts.map(post => {
    const date = post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    return `
      <a href="${post.url || '#'}" class="blog-card reveal" target="${post.url && post.url !== '#' ? '_blank' : '_self'}">
        <div class="blog-date">${date}</div>
        <div class="blog-title">${post.title}</div>
        <div class="blog-excerpt">${post.excerpt}</div>
      </a>
    `;
  }).join('');
}

// ── CONTACT ────────────────────────────────
function renderContact() {
  const d = PortfolioData;

  // Intro text
  const intro = document.getElementById('contactIntro');
  if (intro && d.contact?.intro) intro.textContent = d.contact.intro;

  // Links
  const linksEl = document.getElementById('contactLinks');
  if (!linksEl) return;

  const links = [];
  if (d.personal.email) links.push({ label: 'email', href: `mailto:${d.personal.email}`, text: d.personal.email });
  if (d.personal.github) links.push({ label: 'github', href: d.personal.github, text: 'GitHub Profile' });
  if (d.personal.linkedin) links.push({ label: 'linkedin', href: d.personal.linkedin, text: 'LinkedIn Profile' });
  if (d.personal.twitter) links.push({ label: 'twitter', href: d.personal.twitter, text: 'Twitter / X' });

  linksEl.innerHTML = links.map(l => `
    <a href="${l.href}" class="contact-link-item" target="_blank">
      <span class="mono">${l.label}</span>
      <span>${l.text}</span>
    </a>
  `).join('');

  // Contact form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message sent ✓';
      btn.style.background = '#48bb78';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
}

// ── SCROLL REVEAL ──────────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate skill bars
        const bar = entry.target.querySelector('.skill-bar-fill');
        if (bar) {
          setTimeout(() => {
            bar.style.width = bar.dataset.level + '%';
          }, 100);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
