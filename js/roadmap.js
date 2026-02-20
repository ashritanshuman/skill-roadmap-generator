// Get roadmap from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const skillSlug = urlParams.get('skill');

// Load specific roadmap
document.addEventListener('DOMContentLoaded', async () => {
    if (!skillSlug) {
        window.location.href = 'index.html';
        return;
    }

    await loadRoadmapDetail(skillSlug);
});

async function loadRoadmapDetail(slug) {
    try {
        const response = await fetch('data/roadmaps.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        const roadmap = data.roadmaps.find(r => r.slug === slug);

        if (!roadmap) {
            document.getElementById('roadmap-title').textContent = "Roadmap Not Found";
            document.getElementById('roadmap-description').textContent = "We couldn't find the roadmap you're looking for. Please go back to explore other options.";
            document.getElementById('phases-container').innerHTML = '<a href="index.html" class="btn btn-primary" style="align-self: flex-start;">Return Home</a>';
            return;
        }

        document.title = `${roadmap.title} Roadmap - PathGen`;
        displayRoadmapHeader(roadmap);
        displayRoadmapPhases(roadmap);
        updateBreadcrumb(roadmap.title);
        initializeModuleToggles();
    } catch (error) {
        console.error('Error loading roadmap:', error);
        document.getElementById('roadmap-title').textContent = "Error Loading Roadmap";
        document.getElementById('roadmap-description').textContent = "There was an error loading the data. Please ensure you are running this on a web server.";
    }
}

function displayRoadmapHeader(roadmap) {
    document.getElementById('roadmap-title').textContent = `${roadmap.title} Roadmap`;
    document.getElementById('roadmap-description').textContent = roadmap.description;

    // Update metadata badges
    document.getElementById('duration-badge').textContent = roadmap.durationMonths + ' MONTHS';
    document.getElementById('difficulty-badge').textContent = roadmap.difficulty;
    document.getElementById('modules-badge').textContent = roadmap.totalModules + ' MODULES';

    // Add specific coloring based on difficulty
    const badgeColors = {
        'BEGINNER': 'var(--color-easy)',
        'INTERMEDIATE': 'var(--color-medium)',
        'ADVANCED': 'var(--color-hard)'
    };
    const bgColors = {
        'BEGINNER': 'rgba(76, 175, 80, 0.1)',
        'INTERMEDIATE': 'rgba(255, 152, 0, 0.1)',
        'ADVANCED': 'rgba(244, 67, 54, 0.1)'
    };

    const diffBadge = document.getElementById('difficulty-badge');
    diffBadge.style.color = badgeColors[roadmap.difficulty] || 'inherit';
    diffBadge.style.backgroundColor = bgColors[roadmap.difficulty] || 'var(--color-bg-primary)';
}

function displayRoadmapPhases(roadmap) {
    const container = document.getElementById('phases-container');
    container.innerHTML = '';

    if (!roadmap.phases || roadmap.phases.length === 0) {
        container.innerHTML = '<p class="text-center">Content for this roadmap is coming soon!</p>';
        return;
    }

    let totalTopics = 0;

    roadmap.phases.forEach(phase => {
        const phaseElement = createPhaseElement(phase);
        container.appendChild(phaseElement);

        // Calculate total topics for progress simple mock
        phase.modules.forEach(m => totalTopics += (m.topics ? m.topics.length : 0));
    });

    // Set simple mock progress text
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `0/${totalTopics} Lessons Completed`;
    }
}

function createPhaseElement(phase) {
    const phaseDiv = document.createElement('div');
    phaseDiv.className = `phase-container ${phase.locked ? 'locked' : ''}`;

    let modulesHTML = '';
    if (phase.modules && phase.modules.length > 0) {
        phase.modules.forEach(module => {
            modulesHTML += createModuleHTML(module);
        });
    } else {
        modulesHTML = '<p>No modules available for this phase yet.</p>';
    }

    phaseDiv.innerHTML = `
    <div class="phase-header">
      <span class="phase-number">PHASE ${phase.phaseNumber}</span>
      ${phase.locked ? '<span class="lock-icon">🔒</span>' : ''}
    </div>
    <h3 class="phase-title">${phase.title}</h3>
    <p class="phase-description">${phase.description}</p>
    <div class="modules-container">
      ${modulesHTML}
    </div>
  `;

    return phaseDiv;
}

function createModuleHTML(module) {
    let topicsHTML = '';
    if (module.topics && module.topics.length > 0) {
        topicsHTML = module.topics.map(topic => `
        <li class="topic-item">
          <span class="topic-name">${topic.name}</span>
          <span class="badge badge-${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
          ${topic.link !== '#' ? `<a href="${topic.link}" target="_blank" class="topic-link">Resource Link</a>` : ''}
        </li>
      `).join('');
    } else {
        topicsHTML = '<li class="topic-item">No topics available</li>';
    }

    return `
    <div class="module-card" data-module-id="${module.id}">
      <div class="module-header">
        <div class="module-info">
          <span class="module-icon">${module.icon}</span>
          <h4 class="module-title">${module.title}</h4>
        </div>
        <button class="toggle-btn" aria-label="Toggle Module">▼</button>
      </div>
      <div class="module-content">
        <p class="module-description">${module.description}</p>
        <div class="module-meta">
          <span>⏱️ ${module.estimatedHours} hours</span>
        </div>
        <ul class="topics-list">
          ${topicsHTML}
        </ul>
      </div>
    </div>
  `;
}

function initializeModuleToggles() {
    const moduleCards = document.querySelectorAll('.module-card');

    moduleCards.forEach(card => {
        // Skip if it's inside a locked phase
        const parentPhase = card.closest('.phase-container');
        if (parentPhase && parentPhase.classList.contains('locked')) return;

        const header = card.querySelector('.module-header');
        const toggleBtn = card.querySelector('.toggle-btn');
        const content = card.querySelector('.module-content');

        // Start with content hidden via CSS classes

        const toggleFunc = () => {
            const isExpanded = card.classList.contains('expanded');

            if (isExpanded) {
                card.classList.remove('expanded');
                content.style.maxHeight = '0';
                toggleBtn.textContent = '▼';
                content.style.padding = '0 var(--spacing-md)';
            } else {
                card.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 40 + 'px'; // + padding
                toggleBtn.textContent = '▲';
                content.style.padding = 'var(--spacing-md)';
            }
        };

        // The PRD mentions attaching event to header or toggle button. Let's do header for better UX.
        header.addEventListener('click', toggleFunc);
    });
}

function updateBreadcrumb(title) {
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = title;
    }
}
