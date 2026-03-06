// PathGen - Roadmap Detail Page JavaScript

// Global state
let currentRoadmap = null;
let roadmapsData = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Scroll to top immediately when page loads
  window.scrollTo(0, 0);
  initRoadmapDetail();
});

// Also scroll to top when the roadmap content is rendered
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

// ============================================
// ROADMAP DETAIL INITIALIZATION
// ============================================
function initRoadmapDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const roadmapId = urlParams.get('id');

  if (!roadmapId) {
    showError('No roadmap ID specified');
    return;
  }

  loadRoadmapData(roadmapId);
}

// ============================================
// LOAD ROADMAP DATA
// ============================================
async function loadRoadmapData(roadmapId) {
  try {
    showLoading();

    const response = await fetch('public/data/roadmaps-data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    roadmapsData = data;

    const roadmap = data.roadmaps.find(r => r.id === roadmapId);

    if (!roadmap) {
      throw new Error(`Roadmap with ID "${roadmapId}" not found`);
    }

    currentRoadmap = roadmap;
    renderRoadmap(roadmap);
    hideLoading();

  } catch (error) {
    console.error('Error loading roadmap:', error);
    showError(error.message);
  }
}

// ============================================
// RENDER ROADMAP
// ============================================
function renderRoadmap(roadmap) {
  // Update page title
  document.title = `PathGen | ${roadmap.title} Roadmap`;

  // Update breadcrumb
  document.getElementById('breadcrumb-title').textContent = roadmap.title;

  // Update header
  document.getElementById('roadmap-icon').textContent = roadmap.icon || 'monitor';
  document.getElementById('roadmap-title').textContent = roadmap.title;
  document.getElementById('roadmap-subtitle').textContent = roadmap.subtitle || '';

  // Update stats
  if (roadmap.stats) {
    document.getElementById('stat-phases').textContent = roadmap.stats.phases || roadmap.phases?.length || '-';
    document.getElementById('stat-duration').textContent = roadmap.stats.duration || '-';
    document.getElementById('stat-technologies').textContent = roadmap.stats.technologies || '-';
    document.getElementById('stat-salary').textContent = roadmap.stats.salary || '-';
  }

  // Render phases
  renderPhases(roadmap.phases);

  // Render timeline
  renderTimeline(roadmap.timeline);

  // Show content
  document.getElementById('roadmap-content').style.display = 'block';
  
  // Scroll to top of the page
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
}

// ============================================
// RENDER PHASES
// ============================================
function renderPhases(phases) {
  const container = document.getElementById('phases-container');
  container.innerHTML = '';

  if (!phases || phases.length === 0) {
    container.innerHTML = '<p class="no-data">No phases available for this roadmap.</p>';
    return;
  }

  phases.forEach((phase, index) => {
    const phaseElement = createPhaseElement(phase, index + 1);
    container.appendChild(phaseElement);
  });
}

function createPhaseElement(phase, phaseNumber) {
  const phaseDiv = document.createElement('div');
  phaseDiv.className = 'phase-card';
  phaseDiv.dataset.phaseId = phase.id;

  const isExpanded = phaseNumber === 1; // First phase expanded by default

  phaseDiv.innerHTML = `
    <div class="phase-header" onclick="togglePhase(${phase.id})">
      <div class="phase-number">${phaseNumber}</div>
      <div class="phase-info">
        <h3 class="phase-title">${phase.title}</h3>
        <p class="phase-subtitle">${phase.subtitle || ''}</p>
      </div>
      <div class="phase-meta">
        <span class="duration-badge">${phase.duration || ''}</span>
        <span class="material-symbols-outlined phase-toggle-icon ${isExpanded ? 'expanded' : ''}">expand_more</span>
      </div>
    </div>
    <div class="phase-content ${isExpanded ? 'expanded' : ''}">
      <div class="phase-description">
        <p>${phase.description || ''}</p>
      </div>
      
      ${renderSections(phase.sections)}
      
      ${renderProjects(phase.projects)}
      
      ${renderOutcomes(phase.outcomes)}
    </div>
  `;

  return phaseDiv;
}

function renderSections(sections) {
  if (!sections || sections.length === 0) return '';

  const sectionsHtml = sections.map(section => `
    <div class="section-card">
      <h4 class="section-title">${section.title}</h4>
      <p class="section-subtitle">${section.subtitle || ''}</p>
      <ul class="topics-list">
        ${section.topics.map(topic => `<li>${topic}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  return `
    <div class="sections-grid">
      ${sectionsHtml}
    </div>
  `;
}

function renderProjects(projects) {
  if (!projects || projects.length === 0) return '';

  return `
    <div class="projects-block">
      <div class="projects-header">
        <span class="material-symbols-outlined">rocket_launch</span>
        <h4>Projects to Build</h4>
      </div>
      <ul class="projects-list">
        ${projects.map(project => `<li>${project}</li>`).join('')}
      </ul>
    </div>
  `;
}

function renderOutcomes(outcomes) {
  if (!outcomes || outcomes.length === 0) return '';

  // Check if outcomes contain salary ranges (indicated by $ sign)
  const hasSalary = outcomes.some(o => o.includes('$'));
  const icon = hasSalary ? 'payments' : 'check_circle';
  const title = hasSalary ? 'Career Outcomes & Salary' : 'Skills You Will Master';

  return `
    <div class="outcomes-block ${hasSalary ? 'salary-block' : ''}">
      <div class="outcomes-header">
        <span class="material-symbols-outlined">${icon}</span>
        <h4>${title}</h4>
      </div>
      <ul class="outcomes-list">
        ${outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
      </ul>
    </div>
  `;
}

// ============================================
// PHASE TOGGLE (Multiple phases can be expanded)
// ============================================
function togglePhase(phaseId) {
  const phaseCard = document.querySelector(`[data-phase-id="${phaseId}"]`);
  if (!phaseCard) return;

  const content = phaseCard.querySelector('.phase-content');
  const icon = phaseCard.querySelector('.phase-toggle-icon');
  const isExpanded = content.classList.contains('expanded');

  // Toggle current phase only (allow multiple phases to stay open)
  if (isExpanded) {
    content.classList.remove('expanded');
    content.style.maxHeight = null;
    icon.classList.remove('expanded');
  } else {
    // First, scroll to the phase header immediately (before expansion)
    const header = phaseCard.querySelector('.phase-header');
    if (header) {
      const rect = header.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const targetY = scrollTop + rect.top - navHeight - 20;
      
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
    
    // Then expand the content
    content.classList.add('expanded');
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.classList.add('expanded');
  }
}

// ============================================
// RENDER TIMELINE
// ============================================
function renderTimeline(timeline) {
  const container = document.getElementById('timeline-container');
  container.innerHTML = '';

  if (!timeline || timeline.length === 0) {
    container.innerHTML = '<p class="no-data">No timeline available.</p>';
    return;
  }

  const timelineHtml = timeline.map((item, index) => `
    <div class="timeline-step ${index === timeline.length - 1 ? 'last' : ''}">
      <div class="timeline-marker">
        <div class="timeline-dot"></div>
        ${index !== timeline.length - 1 ? '<div class="timeline-line"></div>' : ''}
      </div>
      <div class="timeline-content">
        <span class="timeline-period">${item.period}</span>
        <h4 class="timeline-focus">${item.focus}</h4>
        <p class="timeline-milestone">${item.milestone}</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = timelineHtml;
}

// ============================================
// LOADING & ERROR STATES
// ============================================
function showLoading() {
  document.getElementById('loading-state').style.display = 'flex';
  document.getElementById('error-state').style.display = 'none';
  document.getElementById('roadmap-content').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading-state').style.display = 'none';
}

function showError(message) {
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('error-state').style.display = 'flex';
  document.getElementById('roadmap-content').style.display = 'none';
}

// ============================================
// COMING SOON MODAL (for index.html)
// ============================================
function showComingSoonModal() {
  const modal = document.getElementById('coming-soon-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeComingSoonModal() {
  const modal = document.getElementById('coming-soon-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
window.onclick = function(event) {
  const modal = document.getElementById('coming-soon-modal');
  if (event.target === modal) {
    closeComingSoonModal();
  }
}

// ============================================
// CARD CLICK HANDLER (for index.html)
// ============================================
function handleCardClick(roadmapId) {
  if (roadmapId === 'coming-soon') {
    showComingSoonModal();
  } else {
    window.location.href = `roadmap-detail.html?id=${roadmapId}`;
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    handleCardClick,
    showComingSoonModal,
    closeComingSoonModal
  };
}
