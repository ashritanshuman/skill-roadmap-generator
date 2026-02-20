// Global variables
let roadmapsData = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadRoadmaps();
  initializeSearch();
  initializePopularTags();
});

// Load roadmaps from JSON
async function loadRoadmaps() {
  try {
    const response = await fetch('data/roadmaps.json');
    roadmapsData = await response.json();
    displayRoadmapCards(roadmapsData.roadmaps);
  } catch (error) {
    console.error('Error loading roadmaps:', error);
    const container = document.getElementById('roadmap-grid');
    if (container) {
        container.innerHTML = '<p class="text-center">Failed to load roadmaps. Please try again later.</p>';
    }
  }
}

// Display roadmap cards on home page
function displayRoadmapCards(roadmaps) {
  const container = document.getElementById('roadmap-grid');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (roadmaps.length === 0) {
      container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-secondary);">No roadmaps found matching your search.</p>';
      return;
  }
  
  roadmaps.forEach(roadmap => {
    const card = createRoadmapCard(roadmap);
    container.appendChild(card);
  });
}

// Create a single roadmap card
function createRoadmapCard(roadmap) {
  const card = document.createElement('div');
  card.className = 'card skill-card'; // Add base card class from components.css
  
  card.innerHTML = `
    <div class="card-header">
      <span class="card-icon" style="color: ${roadmap.color || 'var(--color-primary)'}; background: ${roadmap.color ? roadmap.color + '20' : ''}">${roadmap.icon}</span>
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

// Search functionality
function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  if (!searchInput || !searchButton) return;
  
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
  
  // Optional: Real-time search
  searchInput.addEventListener('input', () => {
      // Small debounce could be added here, but simple immediate search is fine for small list
      performSearch();
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
  
  // Smooth scroll to results
  const exploreSection = document.getElementById('explore');
  if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Popular tags functionality
function initializePopularTags() {
  const tags = document.querySelectorAll('.popular-tag');
  const searchInput = document.getElementById('search-input');
  
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent.trim();
        performSearch();
      }
    });
  });
}
