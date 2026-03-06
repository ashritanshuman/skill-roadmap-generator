// PathGen - Main JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize search functionality
  initSearch();
});

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
