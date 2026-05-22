// ============================================
// PORTFOLIO ADMIN PANEL LOGIC
// ============================================

// ── CHANGE THIS PASSWORD ──────────────────
const ADMIN_PASSWORD = 'admin123';
// ─────────────────────────────────────────

const TAB_META = {
  personal: { title: 'Personal Info', subtitle: 'Your name, role, and links' },
  about: { title: 'About Section', subtitle: 'Bio paragraphs displayed on your portfolio' },
  skills: { title: 'Skills', subtitle: 'Technical skills and proficiency levels' },
  projects: { title: 'Projects', subtitle: 'Showcase your work' },
  blog: { title: 'Blog Posts', subtitle: 'Articles and writing' },
  contact: { title: 'Contact', subtitle: 'Contact section text' },
};

// ── LOGIN ─────────────────────────────────
document.getElementById('loginBtn').addEventListener('click', handleLogin);
document.getElementById('loginPassword').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleLogin();
});

function handleLogin() {
  const pw = document.getElementById('loginPassword').value;
  if (pw === ADMIN_PASSWORD) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'grid';
    initAdmin();
  } else {
    const input = document.getElementById('loginPassword');
    input.style.borderColor = '#fc8181';
    input.value = '';
    input.placeholder = 'Incorrect password';
    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = 'Enter password';
    }, 1500);
  }
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginPassword').value = '';
});

// ── INIT ──────────────────────────────────
function initAdmin() {
  initTabs();
  populateAll();
  document.getElementById('globalSave').addEventListener('click', saveAll);
}

// ── TABS ──────────────────────────────────
function initTabs() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');
      document.getElementById('tabTitle').textContent = TAB_META[tab].title;
      document.getElementById('tabSubtitle').textContent = TAB_META[tab].subtitle;
    });
  });
}

// ── POPULATE ALL ──────────────────────────
function populateAll() {
  populatePersonal();
  populateAbout();
  populateSkills();
  populateProjects();
  populateBlog();
  populateContact();
}

// PERSONAL
function populatePersonal() {
  const p = PortfolioData.personal;
  setVal('p-name', p.name);
  setVal('p-tagline', p.tagline);
  setVal('p-location', p.location);
  setVal('p-focus', p.focus);
  setVal('p-status', p.status);
  setVal('p-email', p.email);
  setVal('p-github', p.github);
  setVal('p-linkedin', p.linkedin);
  setVal('p-twitter', p.twitter);
  setVal('p-resume', p.resume);
}

// ABOUT
function populateAbout() {
  const container = document.getElementById('aboutParagraphs');
  container.innerHTML = '';
  (PortfolioData.about.paragraphs || []).forEach((text, i) => {
    container.appendChild(createParagraphItem(text, i));
  });
  document.getElementById('addParagraph').onclick = () => {
    const i = container.children.length;
    container.appendChild(createParagraphItem('', i));
  };
}

function createParagraphItem(text, index) {
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `
    <div class="item-header">
      <span class="item-number">// paragraph ${index + 1}</span>
      <button class="btn-remove">Remove</button>
    </div>
    <div class="form-group">
      <textarea rows="3" class="para-text" placeholder="Write a paragraph about yourself...">${text}</textarea>
    </div>
  `;
  div.querySelector('.btn-remove').onclick = () => div.remove();
  return div;
}

// SKILLS
function populateSkills() {
  const container = document.getElementById('skillsList');
  container.innerHTML = '';
  (PortfolioData.skills || []).forEach((skill, i) => {
    container.appendChild(createSkillItem(skill, i));
  });
  document.getElementById('addSkill').onclick = () => {
    const i = container.children.length;
    container.appendChild(createSkillItem({ name: '', category: '', level: 50 }, i));
  };
}

function createSkillItem(skill, index) {
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `
    <div class="item-header">
      <span class="item-number">// skill ${index + 1}</span>
      <button class="btn-remove">Remove</button>
    </div>
    <div class="item-grid">
      <div class="form-group">
        <label>Skill Name</label>
        <input type="text" class="s-name" placeholder="e.g. Python" value="${skill.name || ''}" />
      </div>
      <div class="form-group">
        <label>Category</label>
        <input type="text" class="s-category" placeholder="e.g. Language" value="${skill.category || ''}" />
      </div>
      <div class="level-row full">
        <label>Proficiency</label>
        <input type="range" class="s-level" min="0" max="100" value="${skill.level || 50}" />
        <span class="level-value">${skill.level || 50}%</span>
      </div>
    </div>
  `;
  div.querySelector('.btn-remove').onclick = () => div.remove();
  const range = div.querySelector('.s-level');
  const display = div.querySelector('.level-value');
  range.addEventListener('input', () => display.textContent = range.value + '%');
  return div;
}

// PROJECTS
function populateProjects() {
  const container = document.getElementById('projectsList');
  container.innerHTML = '';
  (PortfolioData.projects || []).forEach((project, i) => {
    container.appendChild(createProjectItem(project, i));
  });
  document.getElementById('addProject').onclick = () => {
    const i = container.children.length;
    container.appendChild(createProjectItem({}, i));
  };
}

function createProjectItem(project, index) {
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `
    <div class="item-header">
      <span class="item-number">// project ${index + 1}</span>
      <button class="btn-remove">Remove</button>
    </div>
    <div class="item-grid">
      <div class="form-group full">
        <label>Project Title</label>
        <input type="text" class="proj-title" placeholder="e.g. Smart Home Controller" value="${escHtml(project.title || '')}" />
      </div>
      <div class="form-group full">
        <label>Description</label>
        <textarea class="proj-desc" rows="2" placeholder="What does it do?">${escHtml(project.description || '')}</textarea>
      </div>
      <div class="form-group full">
        <label>Tags (comma-separated)</label>
        <input type="text" class="proj-tags" placeholder="e.g. Python, Arduino, IoT" value="${(project.tags || []).join(', ')}" />
      </div>
      <div class="form-group">
        <label>GitHub URL</label>
        <input type="url" class="proj-github" placeholder="https://github.com/..." value="${escHtml(project.github || '')}" />
      </div>
      <div class="form-group">
        <label>Live Demo URL</label>
        <input type="url" class="proj-demo" placeholder="https://..." value="${escHtml(project.demo || '')}" />
      </div>
      <div class="form-group full">
        <label>Image URL (optional)</label>
        <input type="url" class="proj-image" placeholder="https://... (a screenshot or preview image)" value="${escHtml(project.image || '')}" />
      </div>
    </div>
  `;
  div.querySelector('.btn-remove').onclick = () => div.remove();
  return div;
}

// BLOG
function populateBlog() {
  const container = document.getElementById('blogList');
  container.innerHTML = '';
  (PortfolioData.blog || []).forEach((post, i) => {
    container.appendChild(createBlogItem(post, i));
  });
  document.getElementById('addPost').onclick = () => {
    const i = container.children.length;
    container.appendChild(createBlogItem({}, i));
  };
}

function createBlogItem(post, index) {
  const div = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `
    <div class="item-header">
      <span class="item-number">// post ${index + 1}</span>
      <button class="btn-remove">Remove</button>
    </div>
    <div class="item-grid">
      <div class="form-group full">
        <label>Title</label>
        <input type="text" class="b-title" placeholder="Post title" value="${escHtml(post.title || '')}" />
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" class="b-date" value="${post.date || ''}" />
      </div>
      <div class="form-group">
        <label>URL / Link</label>
        <input type="url" class="b-url" placeholder="https://..." value="${escHtml(post.url || '')}" />
      </div>
      <div class="form-group full">
        <label>Excerpt / Summary</label>
        <textarea class="b-excerpt" rows="2" placeholder="A short summary...">${escHtml(post.excerpt || '')}</textarea>
      </div>
    </div>
  `;
  div.querySelector('.btn-remove').onclick = () => div.remove();
  return div;
}

// CONTACT
function populateContact() {
  setVal('c-intro', PortfolioData.contact?.intro || '');
}

// ── SAVE ALL ─────────────────────────────
function saveAll() {
  // Personal
  PortfolioData.personal.name = getVal('p-name');
  PortfolioData.personal.tagline = getVal('p-tagline');
  PortfolioData.personal.location = getVal('p-location');
  PortfolioData.personal.focus = getVal('p-focus');
  PortfolioData.personal.status = getVal('p-status');
  PortfolioData.personal.email = getVal('p-email');
  PortfolioData.personal.github = getVal('p-github');
  PortfolioData.personal.linkedin = getVal('p-linkedin');
  PortfolioData.personal.twitter = getVal('p-twitter');
  PortfolioData.personal.resume = getVal('p-resume');

  // About
  PortfolioData.about.paragraphs = [...document.querySelectorAll('.para-text')].map(t => t.value).filter(Boolean);

  // Skills
  PortfolioData.skills = [...document.querySelectorAll('#skillsList .dynamic-item')].map(item => ({
    name: item.querySelector('.s-name').value,
    category: item.querySelector('.s-category').value,
    level: parseInt(item.querySelector('.s-level').value) || 50,
  })).filter(s => s.name);

  // Projects
  PortfolioData.projects = [...document.querySelectorAll('#projectsList .dynamic-item')].map(item => ({
    title: item.querySelector('.proj-title').value,
    description: item.querySelector('.proj-desc').value,
    tags: item.querySelector('.proj-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    github: item.querySelector('.proj-github').value,
    demo: item.querySelector('.proj-demo').value,
    image: item.querySelector('.proj-image').value,
  })).filter(p => p.title);

  // Blog
  PortfolioData.blog = [...document.querySelectorAll('#blogList .dynamic-item')].map(item => ({
    title: item.querySelector('.b-title').value,
    date: item.querySelector('.b-date').value,
    url: item.querySelector('.b-url').value,
    excerpt: item.querySelector('.b-excerpt').value,
  })).filter(b => b.title);

  // Contact
  PortfolioData.contact.intro = getVal('c-intro');

  // Persist
  saveData();
  showToast();
}

// ── UTILS ─────────────────────────────────
function setVal(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || '';
}
function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
