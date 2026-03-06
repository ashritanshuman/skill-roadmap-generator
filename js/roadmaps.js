// Roadmaps Listing Page JavaScript

// Define which roadmaps belong to which category
const skillBasedIds = ['react', 'nodejs', 'python', 'kubernetes', 'docker', 'aws', 'postgresql', 'typescript'];
const roleBasedIds = ['frontend-developer', 'web-developer', 'devops-engineer', 'aiml-engineer', 'data-scientist', 'data-analyst'];

// Category labels
const categoryLabels = {
    'skill': 'Skill Based Roadmaps',
    'role': 'Role Based Roadmaps',
    'all': 'All Roadmaps'
};

// Category subtitles
const categorySubtitles = {
    'skill': 'Master specific technologies and frameworks with focused learning paths',
    'role': 'Comprehensive career paths designed for specific technical roles',
    'all': 'Explore all available learning paths for your technical career'
};

// Load roadmaps data
async function loadRoadmaps() {
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const content = document.getElementById('roadmaps-content');

    try {
        const response = await fetch('public/data/roadmaps-data.json');
        if (!response.ok) {
            throw new Error('Failed to load roadmaps data');
        }

        const data = await response.json();
        
        // Hide loading, show content
        loadingState.style.display = 'none';
        content.style.display = 'block';

        // Get category from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category') || 'all';

        // Initialize page with category
        initializePage(data.roadmaps, category);

    } catch (error) {
        console.error('Error loading roadmaps:', error);
        loadingState.style.display = 'none';
        errorState.style.display = 'flex';
    }
}

// Initialize page with roadmaps
function initializePage(roadmaps, category) {
    // Update page title and subtitle
    updatePageHeader(category);

    // Update breadcrumb
    updateBreadcrumb(category);

    // Set active tab
    setActiveTab(category);

    // Filter and display roadmaps
    displayRoadmaps(roadmaps, category);

    // Setup tab click handlers
    setupTabHandlers(roadmaps);
}

// Update page header
function updatePageHeader(category) {
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');
    
    if (title) title.textContent = categoryLabels[category] || 'All Roadmaps';
    if (subtitle) subtitle.textContent = categorySubtitles[category] || 'Explore comprehensive learning paths';
}

// Update breadcrumb
function updateBreadcrumb(category) {
    const breadcrumb = document.getElementById('breadcrumb-category');
    if (breadcrumb) {
        breadcrumb.textContent = categoryLabels[category] || 'All Roadmaps';
    }
}

// Set active tab
function setActiveTab(category) {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Filter roadmaps by category
function filterRoadmapsByCategory(roadmaps, category) {
    if (category === 'all') {
        return roadmaps;
    } else if (category === 'skill') {
        return roadmaps.filter(r => skillBasedIds.includes(r.id));
    } else if (category === 'role') {
        return roadmaps.filter(r => roleBasedIds.includes(r.id));
    }
    return roadmaps;
}

// Display roadmaps in grid
function displayRoadmaps(roadmaps, category) {
    const grid = document.getElementById('roadmaps-grid');
    if (!grid) return;

    const filteredRoadmaps = filterRoadmapsByCategory(roadmaps, category);

    if (filteredRoadmaps.length === 0) {
        grid.innerHTML = `
            <div class="no-roadmaps" style="grid-column: 1 / -1;">
                <span class="material-symbols-outlined">search_off</span>
                <h3>No roadmaps found</h3>
                <p>No roadmaps available for this category.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredRoadmaps.map(roadmap => createRoadmapCard(roadmap)).join('');
}

// Create roadmap card HTML
function createRoadmapCard(roadmap) {
    const isSkillBased = skillBasedIds.includes(roadmap.id);
    const categoryClass = isSkillBased ? 'skill' : 'role';
    const categoryLabel = isSkillBased ? 'Skill' : 'Role';

    return `
        <a href="roadmap-detail.html?id=${roadmap.id}" class="roadmap-card">
            <div class="roadmap-card-header">
                <div class="roadmap-card-icon">
                    <span class="material-symbols-outlined glow-icon">${roadmap.icon}</span>
                </div>
                <div>
                    <span class="category-badge ${categoryClass}">${categoryLabel} Based</span>
                    <h3 class="roadmap-card-title">${roadmap.title}</h3>
                    <p class="roadmap-card-subtitle">${roadmap.subtitle}</p>
                </div>
            </div>
            <div class="roadmap-card-stats">
                <div class="roadmap-stat">
                    <span class="roadmap-stat-value">${roadmap.stats.phases}</span>
                    <span class="roadmap-stat-label">Phases</span>
                </div>
                <div class="roadmap-stat">
                    <span class="roadmap-stat-value">${roadmap.stats.duration}</span>
                    <span class="roadmap-stat-label">Duration</span>
                </div>
                <div class="roadmap-stat">
                    <span class="roadmap-stat-value">${roadmap.stats.technologies}</span>
                    <span class="roadmap-stat-label">Technologies</span>
                </div>
                <div class="roadmap-stat">
                    <span class="roadmap-stat-value">${roadmap.stats.salary}</span>
                    <span class="roadmap-stat-label">Salary</span>
                </div>
            </div>
        </a>
    `;
}

// Setup tab click handlers
function setupTabHandlers(roadmaps) {
    const tabs = document.querySelectorAll('.category-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update URL without reloading
            const url = new URL(window.location);
            if (category === 'all') {
                url.searchParams.delete('category');
            } else {
                url.searchParams.set('category', category);
            }
            window.history.pushState({}, '', url);

            // Update page
            updatePageHeader(category);
            updateBreadcrumb(category);
            setActiveTab(category);
            displayRoadmaps(roadmaps, category);
        });
    });
}

// Load roadmaps when DOM is ready
document.addEventListener('DOMContentLoaded', loadRoadmaps);
