// PathGen - Clean Simple JavaScript

// Global variables
let roadmapsData = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize theme first (before any rendering)
  initTheme();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Load roadmaps data
  await loadRoadmaps();
  
  // Initialize search functionality
  initializeSearch();
  
  // Initialize popular tags
  initializePopularTags();
  
  // Initialize smooth scroll for anchor links
  initSmoothScroll();
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
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll('.reveal, .stagger-children');
  revealElements.forEach(el => observer.observe(el));
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
        const headerOffset = 80;
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
// LOAD ROADMAPS
// ============================================
async function loadRoadmaps() {
  const container = document.getElementById('roadmap-grid');
  if (!container) return;
  
  // Show loading skeleton
  showSkeletonLoading(container, 6);
  
  try {
    const response = await fetch('data/roadmaps.json');
    roadmapsData = await response.json();
    
    // Small delay for smooth transition
    setTimeout(() => {
      displayRoadmapCards(roadmapsData.roadmaps);
    }, 300);
  } catch (error) {
    console.error('Error loading roadmaps:', error);
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">⚠️</div>
        <h3 class="empty-state-title">Failed to Load Roadmaps</h3>
        <p class="empty-state-description">Please try again later or check your connection.</p>
        <button onclick="location.reload()" class="btn btn-primary">Retry</button>
      </div>
    `;
  }
}

// Show skeleton loading
function showSkeletonLoading(container, count) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'card skill-card skeleton';
    skeleton.style.height = '260px';
    container.appendChild(skeleton);
  }
}

// ============================================
// DISPLAY ROADMAP CARDS
// ============================================
function displayRoadmapCards(roadmaps) {
  const container = document.getElementById('roadmap-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (roadmaps.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No Roadmaps Found</h3>
        <p class="empty-state-description">Try adjusting your search terms.</p>
      </div>
    `;
    return;
  }
  
  roadmaps.forEach((roadmap, index) => {
    const card = createRoadmapCard(roadmap, index);
    container.appendChild(card);
  });
}

// Create a single roadmap card
function createRoadmapCard(roadmap, index) {
  const card = document.createElement('div');
  card.className = 'card skill-card';
  card.style.animationDelay = `${index * 0.05}s`;
  
  // Generate icon background color
  const iconBg = roadmap.color ? `${roadmap.color}15` : 'var(--color-primary-subtle)';
  const iconColor = roadmap.color || 'var(--color-primary)';
  
  card.innerHTML = `
    <div class="card-header">
      <span class="card-icon" style="color: ${iconColor}; background: ${iconBg};">
        ${roadmap.icon}
      </span>
      <span class="duration-badge">${roadmap.duration}</span>
    </div>
    <h3 class="card-title">${roadmap.title}</h3>
    <p class="card-description">${roadmap.shortDescription || roadmap.description}</p>
    <a href="roadmap.html?skill=${roadmap.slug}" class="card-link">
      Start Learning →
    </a>
  `;
  
  return card;
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  if (!searchInput || !searchButton) return;
  
  searchButton.addEventListener('click', performSearch);
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
  
  // Real-time search with debounce
  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 200);
  });
}

function performSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (!roadmapsData) return;
  
  if (!searchTerm) {
    displayRoadmapCards(roadmapsData.roadmaps);
    return;
  }
  
  const filtered = roadmapsData.roadmaps.filter(roadmap => 
    roadmap.title.toLowerCase().includes(searchTerm) ||
    roadmap.description.toLowerCase().includes(searchTerm) ||
    (roadmap.shortDescription && roadmap.shortDescription.toLowerCase().includes(searchTerm))
  );
  
  displayRoadmapCards(filtered);
  
  // Scroll to results if searching
  if (searchTerm && filtered.length > 0) {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// ============================================
// POPULAR TAGS
// ============================================
function initializePopularTags() {
  const tags = document.querySelectorAll('.popular-tag');
  const searchInput = document.getElementById('search-input');
  
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      
      if (searchInput) {
        searchInput.value = tag.textContent;
        searchInput.focus();
        performSearch();
        
        const exploreSection = document.getElementById('explore');
        if (exploreSection) {
          setTimeout(() => {
            exploreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
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
