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
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  const trendingTags = document.querySelectorAll('.trending-tag');
  
  if (searchInput && searchBtn) {
    // Handle search button click
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        console.log('Search query:', query);
        // Add your search logic here
        alert(`Generating roadmap for: ${query}`);
      }
    });
    
    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
  
  // Handle trending tag clicks
  trendingTags.forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent;
        searchInput.focus();
      }
    });
  });
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
        window.location.href = `roadmap-detail.html?id=${roadmapId}`;
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
