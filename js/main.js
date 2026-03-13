// PathGen - Main JavaScript

// ============================================
// THEME TOGGLE - Dark/Light Mode
// ============================================
// Initialize theme before DOM loads to prevent flash
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to dark if no saved preference
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    // Default is dark (no attribute needed, but set explicitly)
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize search functionality
  initSearch();
  
  // Initialize roadmap card clicks
  initRoadmapCards();
});

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
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
  
  if (!navbar || !navMenu) return;
  
  // Create mobile toggle button if it doesn't exist
  if (!document.querySelector('.mobile-menu-toggle')) {
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
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle?.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      }
    });
  });
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
// Search data - all available roadmaps
const searchData = [
  // Skill Based Roadmaps
  { id: 'react', title: 'React', subtitle: 'Frontend Library', type: 'skill', icon: 'code' },
  { id: 'nodejs', title: 'Node.js', subtitle: 'Runtime Environment', type: 'skill', icon: 'terminal' },
  { id: 'python', title: 'Python', subtitle: 'Programming Language', type: 'skill', icon: 'psychology' },
  { id: 'kubernetes', title: 'Kubernetes', subtitle: 'Container Orchestration', type: 'skill', icon: 'view_in_ar' },
  { id: 'docker', title: 'Docker', subtitle: 'Containerization', type: 'skill', icon: 'inventory_2' },
  { id: 'aws', title: 'AWS', subtitle: 'Cloud Platform', type: 'skill', icon: 'cloud' },
  { id: 'postgresql', title: 'PostgreSQL', subtitle: 'Database', type: 'skill', icon: 'database' },
  { id: 'typescript', title: 'TypeScript', subtitle: 'Typed JavaScript', type: 'skill', icon: 'data_object' },
  // Role Based Roadmaps
  { id: 'frontend-developer', title: 'Frontend Developer', subtitle: 'UI/UX Implementation', type: 'role', icon: 'computer' },
  { id: 'web-developer', title: 'Full Stack Developer', subtitle: 'Frontend + Backend + DevOps', type: 'role', icon: 'monitor' },
  { id: 'devops-engineer', title: 'DevOps Engineer', subtitle: 'CI/CD & Infrastructure', type: 'role', icon: 'rocket_launch' },
  { id: 'aiml-engineer', title: 'AI/ML Engineer', subtitle: 'Machine Learning', type: 'role', icon: 'psychology' },
  { id: 'data-scientist', title: 'Data Scientist', subtitle: 'Analytics & Predictive Modeling', type: 'role', icon: 'analytics' }
];

function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchResults = document.getElementById('search-results');
  const trendingTags = document.querySelectorAll('.trending-tag');
  
  if (!searchInput || !searchResults) return;
  
  let currentFocus = -1;
  
  // Handle input changes for live search
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length === 0) {
      searchResults.style.display = 'none';
      return;
    }
    
    performSearch(query);
  });
  
  // Handle search button click
  searchBtn?.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      performSearch(query);
      searchResults.style.display = 'block';
    }
  });
  
  // Handle Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const visibleItems = searchResults.querySelectorAll('.search-result-item');
      if (visibleItems.length > 0) {
        visibleItems[0].click();
      }
    }
  });
  
  // Handle keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('.search-result-item');
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentFocus++;
      if (currentFocus >= items.length) currentFocus = 0;
      addActive(items, currentFocus);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentFocus--;
      if (currentFocus < 0) currentFocus = items.length - 1;
      addActive(items, currentFocus);
    } else if (e.key === 'Escape') {
      searchResults.style.display = 'none';
      currentFocus = -1;
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      searchResults.style.display = 'none';
      currentFocus = -1;
    }
  });
  
  // Handle trending tag clicks
  trendingTags.forEach(tag => {
    tag.addEventListener('click', () => {
      searchInput.value = tag.textContent;
      searchInput.focus();
      performSearch(tag.textContent.toLowerCase());
      searchResults.style.display = 'block';
    });
  });
  
  function addActive(items, index) {
    if (!items) return;
    removeActive(items);
    if (index >= 0 && index < items.length) {
      items[index].classList.add('active');
      items[index].scrollIntoView({ block: 'nearest' });
    }
  }
  
  function removeActive(items) {
    items.forEach(item => item.classList.remove('active'));
  }
  
  function performSearch(query) {
    const results = searchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.id.toLowerCase().includes(query)
    );
    
    displayResults(results, query);
  }
  
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <span class="material-symbols-outlined">search_off</span>
          <p>No results found for "${escapeHtml(query)}"</p>
          <p style="font-size: var(--font-size-xs); margin-top: var(--spacing-2);">Try searching for: React, Python, Frontend, etc.</p>
        </div>
      `;
    } else {
      searchResults.innerHTML = results.map(item => `
        <div class="search-result-item" data-roadmap-id="${item.id}" data-type="${item.type}">
          <div class="result-icon">
            <span class="material-symbols-outlined">${item.icon}</span>
          </div>
          <div class="result-info">
            <h4>${highlightMatch(item.title, query)}</h4>
            <p>${item.subtitle}</p>
          </div>
          <span class="result-type">${item.type}</span>
        </div>
      `).join('');
      
      // Add click handlers to results
      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const roadmapId = item.dataset.roadmapId;
          if (roadmapId) {
            window.location.href = `roadmap.html?id=${roadmapId}`;
          }
        });
      });
    }
    
    searchResults.style.display = 'block';
    currentFocus = -1;
  }
  
  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--color-primary-subtle); color: var(--color-primary); padding: 0 2px; border-radius: 2px;">$1</mark>');
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

// ============================================
// ROADMAP CARDS CLICK HANDLER
// ============================================
function initRoadmapCards() {
  const roadmapCards = document.querySelectorAll('.roadmap-item[data-roadmap-id]');
  
  roadmapCards.forEach(card => {
    card.addEventListener('click', () => {
      const roadmapId = card.dataset.roadmapId;
      
      if (roadmapId === 'coming-soon') {
        showComingSoonModal();
      } else if (roadmapId) {
        window.location.href = `roadmap.html?id=${roadmapId}`;
      }
    });
  });
}

// ============================================
// COMING SOON MODAL
// ============================================
function showComingSoonModal() {
  // Create modal if it doesn't exist
  let modal = document.getElementById('coming-soon-modal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'coming-soon-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="material-symbols-outlined modal-icon">construction</span>
        <h2>Coming Soon</h2>
        <p>This roadmap is currently under development. Check back soon for a comprehensive learning path.</p>
        <button class="btn btn-primary" onclick="closeComingSoonModal()">Got it</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeComingSoonModal();
      }
    });
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeComingSoonModal() {
  const modal = document.getElementById('coming-soon-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}
