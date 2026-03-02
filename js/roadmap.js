// PathGen Roadmap Page - Clean Simple JavaScript

// Get roadmap from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const skillSlug = urlParams.get('skill');

// Load specific roadmap
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize theme first
    initTheme();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    if (!skillSlug) {
        window.location.href = 'index.html';
        return;
    }

    await loadRoadmapDetail(skillSlug);
});

// ============================================
// THEME TOGGLE
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navbar && !document.querySelector('.mobile-menu-toggle')) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.setAttribute('aria-label', 'Toggle menu');
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navbar.insertBefore(mobileToggle, navActions);
        } else {
            navbar.appendChild(mobileToggle);
        }
        
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const navbar = document.querySelector('.navbar');
                const scrollY = window.scrollY;
                
                if (navbar) {
                    if (scrollY > 10) {
                        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
                    } else {
                        navbar.style.boxShadow = 'none';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// LOAD ROADMAP DETAIL
// ============================================
async function loadRoadmapDetail(slug) {
    const phasesContainer = document.getElementById('phases-container');
    
    // Show loading state
    showLoadingState();
    
    try {
        const response = await fetch('data/roadmaps.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        const roadmap = data.roadmaps.find(r => r.slug === slug);

        if (!roadmap) {
            showErrorState('Roadmap Not Found', 'We couldn\'t find the roadmap you\'re looking for. Please go back to explore other options.');
            return;
        }

        // Small delay for smooth transition
        setTimeout(() => {
            document.title = `${roadmap.title} Roadmap - PathGen`;
            displayRoadmapHeader(roadmap);
            displayRoadmapPhases(roadmap);
            updateBreadcrumb(roadmap.title);
            initializeModuleToggles();
            initializeProgressTracker(roadmap);
        }, 300);
        
    } catch (error) {
        console.error('Error loading roadmap:', error);
        showErrorState('Error Loading Roadmap', 'There was an error loading the data. Please ensure you are running this on a web server.');
    }
}

// Show loading state
function showLoadingState() {
    const phasesContainer = document.getElementById('phases-container');
    if (phasesContainer) {
        phasesContainer.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">Loading roadmap...</p>
            </div>
        `;
    }
}

// Show error state
function showErrorState(title, description) {
    document.getElementById('roadmap-title').textContent = title;
    document.getElementById('roadmap-description').textContent = description;
    document.getElementById('phases-container').innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">⚠️</div>
            <h3 class="empty-state-title">${title}</h3>
            <p class="empty-state-description">${description}</p>
            <a href="index.html" class="btn btn-primary">Return Home</a>
        </div>
    `;
}

// ============================================
// DISPLAY ROADMAP HEADER
// ============================================
function displayRoadmapHeader(roadmap) {
    const title = document.getElementById('roadmap-title');
    const description = document.getElementById('roadmap-description');
    const durationBadge = document.getElementById('duration-badge');
    const difficultyBadge = document.getElementById('difficulty-badge');
    const modulesBadge = document.getElementById('modules-badge');
    
    if (title) title.textContent = `${roadmap.title} Roadmap`;
    if (description) description.textContent = roadmap.description;
    if (durationBadge) durationBadge.textContent = `⏱️ ${roadmap.durationMonths} MONTHS`;
    if (difficultyBadge) {
        difficultyBadge.textContent = `📊 ${roadmap.difficulty}`;
        difficultyBadge.setAttribute('data-difficulty', roadmap.difficulty);
    }
    if (modulesBadge) modulesBadge.textContent = `📚 ${roadmap.totalModules} MODULES`;
}

// ============================================
// DISPLAY ROADMAP PHASES
// ============================================
function displayRoadmapPhases(roadmap) {
    const container = document.getElementById('phases-container');
    if (!container) return;
    
    container.innerHTML = '';

    if (!roadmap.phases || roadmap.phases.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h3 class="empty-state-title">Coming Soon</h3>
                <p class="empty-state-description">Content for this roadmap is being crafted by our experts.</p>
            </div>
        `;
        return;
    }

    roadmap.phases.forEach((phase, index) => {
        const phaseElement = createPhaseElement(phase, index);
        container.appendChild(phaseElement);
    });
}

// Create phase element
function createPhaseElement(phase, index) {
    const phaseDiv = document.createElement('div');
    phaseDiv.className = `phase-container ${phase.locked ? 'locked' : ''}`;

    let modulesHTML = '';
    if (phase.modules && phase.modules.length > 0) {
        phase.modules.forEach((module, moduleIndex) => {
            modulesHTML += createModuleHTML(module, moduleIndex);
        });
    } else {
        modulesHTML = '<p style="color: var(--color-text-muted); padding: var(--spacing-4);">No modules available for this phase yet.</p>';
    }

    phaseDiv.innerHTML = `
        <div class="phase-header">
            <span class="phase-number">${phase.phaseNumber}</span>
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

// Create module HTML
function createModuleHTML(module, index) {
    let topicsHTML = '';
    if (module.topics && module.topics.length > 0) {
        topicsHTML = module.topics.map(topic => `
            <li class="topic-item">
                <span class="topic-name">${topic.name}</span>
                <span class="badge badge-${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
                ${topic.link && topic.link !== '#' ? `<a href="${topic.link}" target="_blank" rel="noopener noreferrer" class="topic-link">Open →</a>` : ''}
            </li>
        `).join('');
    } else {
        topicsHTML = '<li class="topic-item" style="color: var(--color-text-muted);">No topics available</li>';
    }

    return `
        <div class="module-card" data-module-id="${module.id}">
            <div class="module-header">
                <div class="module-info">
                    <span class="module-icon">${module.icon}</span>
                    <h4 class="module-title">${module.title}</h4>
                </div>
                <button class="toggle-btn" aria-label="Toggle Module" aria-expanded="false">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="module-content">
                <p class="module-description">${module.description}</p>
                <div class="module-meta">
                    <span>⏱️ ${module.estimatedHours} hours</span>
                    <span>📚 ${module.topics ? module.topics.length : 0} topics</span>
                </div>
                <ul class="topics-list">
                    ${topicsHTML}
                </ul>
            </div>
        </div>
    `;
}

// ============================================
// UPDATE BREADCRUMB
// ============================================
function updateBreadcrumb(title) {
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = title;
    }
}

// ============================================
// INITIALIZE MODULE TOGGLES
// ============================================
function initializeModuleToggles() {
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const moduleCard = header.parentElement;
            const isExpanded = moduleCard.classList.contains('expanded');
            const toggleBtn = header.querySelector('.toggle-btn');
            
            // Toggle current module
            moduleCard.classList.toggle('expanded');
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
        });
    });
}

// ============================================
// PROGRESS TRACKER
// ============================================
function initializeProgressTracker(roadmap) {
    // Calculate total topics
    let totalTopics = 0;
    let completedTopics = 0;
    
    roadmap.phases.forEach(phase => {
        if (phase.modules) {
            phase.modules.forEach(module => {
                if (module.topics) {
                    totalTopics += module.topics.length;
                    module.topics.forEach(topic => {
                        if (topic.completed) completedTopics++;
                    });
                }
            });
        }
    });
    
    // Update progress UI
    const progressText = document.querySelector('.progress-text');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressCircle = document.querySelector('.progress-circle');
    
    if (progressText) {
        progressText.textContent = `${completedTopics}/${totalTopics} Lessons Completed`;
    }
    
    if (totalTopics > 0) {
        const percentage = Math.round((completedTopics / totalTopics) * 100);
        
        if (progressPercentage) {
            progressPercentage.textContent = `${percentage}%`;
        }
        
        if (progressCircle) {
            progressCircle.style.setProperty('--progress', `${percentage}%`);
            progressCircle.style.background = `conic-gradient(
                var(--color-primary) 0%,
                var(--color-primary-light) ${percentage}%,
                var(--color-bg-tertiary) ${percentage}%
            )`;
        }
    }
}
