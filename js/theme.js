/**
 * PathGen Theme System
 * Centralized theme management for dark/light mode
 * Supports system preference detection, localStorage persistence, and smooth transitions
 */

// Theme Configuration
const THEME_CONFIG = {
  storageKey: 'pathgen_theme',
  themeAttribute: 'data-theme',
  defaultTheme: 'dark',
  supportedThemes: ['dark', 'light'],
  transitionDuration: 250
};

// Theme State
let currentTheme = THEME_CONFIG.defaultTheme;
let systemPreference = null;
let isInitialized = false;

// ============================================
// IMMEDIATE THEME APPLICATION (Prevents Flash)
// ============================================

(function applyThemeImmediately() {
  const savedTheme = localStorage.getItem(THEME_CONFIG.storageKey);
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme && THEME_CONFIG.supportedThemes.includes(savedTheme)) {
    document.documentElement.setAttribute(THEME_CONFIG.themeAttribute, savedTheme);
    currentTheme = savedTheme;
  } else {
    const defaultTheme = systemPrefersDark ? 'dark' : 'dark';
    document.documentElement.setAttribute(THEME_CONFIG.themeAttribute, defaultTheme);
    currentTheme = defaultTheme;
  }
})();

// ============================================
// INITIALIZATION
// ============================================

function initTheme() {
  if (isInitialized) return;
  isInitialized = true;
  
  // Detect system preference
  systemPreference = detectSystemTheme();
  
  // Listen for system theme changes
  listenToSystemThemeChanges();
  
  // Initialize theme toggle buttons (DOM is ready now)
  initThemeToggles();
  
  // Update meta theme-color
  updateMetaThemeColor(currentTheme);
  
  // Dispatch initialization event
  dispatchThemeEvent('themeinit', currentTheme);
  
  console.log('Theme initialized:', currentTheme);
}

function detectSystemTheme() {
  if (window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) return 'dark';
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
    if (prefersLight.matches) return 'light';
  }
  return null;
}

function listenToSystemThemeChanges() {
  if (!window.matchMedia) return;
  
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e) => {
    const savedTheme = localStorage.getItem(THEME_CONFIG.storageKey);
    if (!savedTheme) {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme, true);
    }
  };
  
  if (colorSchemeQuery.addEventListener) {
    colorSchemeQuery.addEventListener('change', handleChange);
  } else if (colorSchemeQuery.addListener) {
    colorSchemeQuery.addListener(handleChange);
  }
}

// ============================================
// THEME TOGGLE
// ============================================

function initThemeToggles() {
  const toggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
  
  console.log('Theme: Found', toggles.length, 'theme toggle buttons');
  
  toggles.forEach((toggle, index) => {
    console.log('Theme: Setting up toggle button', index);
    
    // Add click listener (for buttons without inline onclick)
    // The inline onclick is a fallback, this ensures proper event handling
    toggle.addEventListener('click', function(e) {
      console.log('Theme: Click event fired on toggle');
      handleToggleClick(e);
    });
    
    // Set up ARIA attributes
    toggle.setAttribute('role', 'switch');
    toggle.setAttribute('aria-label', 'Toggle dark/light mode');
    toggle.setAttribute('aria-checked', currentTheme === 'dark' ? 'true' : 'false');
    toggle.setAttribute('tabindex', '0');
    
    // Add keyboard support
    toggle.addEventListener('keydown', handleToggleKeydown);
    
    // Ensure button is visible
    toggle.style.display = 'flex';
    toggle.style.visibility = 'visible';
    toggle.style.opacity = '1';
  });
}

function handleToggleClick(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log('Theme toggle clicked');
  toggleTheme();
}

function handleToggleKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTheme();
  }
}

function toggleTheme() {
  console.log('Toggling theme from', currentTheme);
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Direct style manipulation for debugging
  document.body.style.backgroundColor = newTheme === 'dark' ? '#0a0a0a' : '#f8f7f4';
  document.body.style.color = newTheme === 'dark' ? '#ffffff' : '#1a1a1a';
  
  setTheme(newTheme, true);
}

// ============================================
// THEME SETTING
// ============================================

function setTheme(theme, save = true) {
  console.log('Setting theme to:', theme);
  
  if (!THEME_CONFIG.supportedThemes.includes(theme)) {
    console.warn('Unsupported theme:', theme);
    return;
  }
  
  // Apply transition class
  document.documentElement.classList.add('theme-transitioning');
  
  // Set theme attribute on html element
  document.documentElement.setAttribute(THEME_CONFIG.themeAttribute, theme);
  
  // Update current theme state
  currentTheme = theme;
  
  // Save to localStorage
  if (save) {
    localStorage.setItem(THEME_CONFIG.storageKey, theme);
    console.log('Theme saved to localStorage');
  }
  
  // Update all toggle buttons
  updateAllToggleButtons();
  
  // Update meta theme-color
  updateMetaThemeColor(theme);
  
  // Remove transition class
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, THEME_CONFIG.transitionDuration);
  
  // Dispatch event
  dispatchThemeEvent('themechange', theme);
}

function updateAllToggleButtons() {
  const toggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
  toggles.forEach(toggle => {
    toggle.setAttribute('aria-checked', currentTheme === 'dark' ? 'true' : 'false');
  });
}

function updateMetaThemeColor(theme) {
  let metaThemeColor = document.querySelector('meta[name="theme-color"]');
  
  if (!metaThemeColor) {
    metaThemeColor = document.createElement('meta');
    metaThemeColor.setAttribute('name', 'theme-color');
    document.head.appendChild(metaThemeColor);
  }
  
  const color = theme === 'dark' ? '#0a0a0a' : '#f8f7f4';
  metaThemeColor.setAttribute('content', color);
}

function dispatchThemeEvent(eventName, theme) {
  window.dispatchEvent(new CustomEvent(eventName, {
    detail: { theme, previousTheme: theme === 'dark' ? 'light' : 'dark' }
  }));
}

// ============================================
// GETTERS & UTILITIES
// ============================================

function getCurrentTheme() {
  return currentTheme;
}

function isDarkMode() {
  return currentTheme === 'dark';
}

function isLightMode() {
  return currentTheme === 'light';
}

function getSystemTheme() {
  return systemPreference;
}

function resetToSystemTheme() {
  localStorage.removeItem(THEME_CONFIG.storageKey);
  const systemTheme = detectSystemTheme() || THEME_CONFIG.defaultTheme;
  setTheme(systemTheme, false);
}

function applyThemeToSVGs() {
  const svgs = document.querySelectorAll('svg');
  svgs.forEach(svg => {
    svg.style.color = 'currentColor';
  });
}

function getChartColors() {
  const isDark = currentTheme === 'dark';
  
  return {
    background: isDark ? '#0a0a0a' : '#f8f7f4',
    text: isDark ? '#ffffff' : '#1a1a1a',
    textSecondary: isDark ? '#d4d4d8' : '#4a4a4a',
    grid: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    primary: '#3B82F6',
    primaryLight: isDark ? '#60A5FA' : '#2563EB',
    success: isDark ? '#22c55e' : '#16a34a',
    warning: isDark ? '#f97316' : '#ea580c',
    error: isDark ? '#ef4444' : '#dc2626'
  };
}

// ============================================
// EXPORT THEME API
// ============================================

window.Theme = {
  init: initTheme,
  toggle: toggleTheme,
  set: setTheme,
  get: getCurrentTheme,
  isDark: isDarkMode,
  isLight: isLightMode,
  getSystem: getSystemTheme,
  reset: resetToSystemTheme,
  getChartColors: getChartColors,
  applyToSVGs: applyThemeToSVGs,
  config: THEME_CONFIG
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  // DOM already loaded
  initTheme();
}

// Also expose for manual use
window.initTheme = initTheme;
