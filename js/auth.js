// PathGen - Authentication System
// Handles user registration, login, logout, and session management

// ============================================
// AUTH STATE & CONFIGURATION
// ============================================
const AUTH_CONFIG = {
  minPasswordLength: 8,
  maxPasswordLength: 64,
  sessionDuration: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  storageKey: 'pathgen_users',
  sessionKey: 'pathgen_session',
  currentUserKey: 'pathgen_current_user',
  themeKey: 'pathgen_theme'
};

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initTheme();
});

function initAuth() {
  // Check if user is already logged in
  checkSession();
  
  // Initialize auth forms if they exist
  initSignupForm();
  initLoginForm();
  initLogoutButton();
  updateAuthUI();
}

// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
  const savedTheme = localStorage.getItem(AUTH_CONFIG.themeKey);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    const defaultTheme = systemPrefersDark ? 'dark' : 'dark'; // Default to dark for this app
    document.documentElement.setAttribute('data-theme', defaultTheme);
    localStorage.setItem(AUTH_CONFIG.themeKey, defaultTheme);
  }
  
  // Initialize theme toggle buttons
  initThemeToggles();
}

function initThemeToggles() {
  const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(AUTH_CONFIG.themeKey, newTheme);
  
  // Dispatch custom event for other components
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

// ============================================
// USER DATA MANAGEMENT (JSON Storage)
// ============================================

function getUsers() {
  const users = localStorage.getItem(AUTH_CONFIG.storageKey);
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem(AUTH_CONFIG.storageKey, JSON.stringify(users));
  
  // Also update the metadata in the JSON structure
  updateUsersMetadata(users);
}

function updateUsersMetadata(users) {
  const usersData = {
    users: users,
    sessions: getActiveSessions(),
    metadata: {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      totalUsers: users.length
    }
  };
  
  // Store the full structure for export/sync purposes
  localStorage.setItem('pathgen_users_data', JSON.stringify(usersData));
}

function getActiveSessions() {
  const session = localStorage.getItem(AUTH_CONFIG.sessionKey);
  return session ? [JSON.parse(session)] : [];
}

function getCurrentUser() {
  const user = localStorage.getItem(AUTH_CONFIG.currentUserKey);
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(AUTH_CONFIG.currentUserKey, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_CONFIG.currentUserKey);
  }
}

// Export user data as JSON (for download/backup)
function exportUserData() {
  const users = getUsers();
  const sessions = getActiveSessions();
  
  return {
    users: users,
    sessions: sessions,
    metadata: {
      version: "1.0",
      lastUpdated: new Date().toISOString(),
      totalUsers: users.length,
      exportedBy: getCurrentUser()?.email || 'anonymous'
    }
  };
}

// ============================================
// PASSWORD SECURITY
// ============================================

function hashPassword(password) {
  // Simple hash function for demo purposes
  // In production, use bcrypt or similar
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

function verifyPassword(password, hashedPassword) {
  return hashPassword(password) === hashedPassword;
}

// ============================================
// PASSWORD STRENGTH CALCULATOR
// ============================================

function calculatePasswordStrength(password) {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
    minLength: password.length >= 12
  };
  
  // Calculate score
  if (checks.length) strength += 20;
  if (checks.lowercase) strength += 15;
  if (checks.uppercase) strength += 15;
  if (checks.numbers) strength += 20;
  if (checks.special) strength += 20;
  if (checks.minLength) strength += 10;
  
  // Determine level
  let level = 'weak';
  if (strength >= 80) level = 'strong';
  else if (strength >= 50) level = 'medium';
  else if (strength >= 30) level = 'fair';
  
  return {
    score: Math.min(strength, 100),
    level: level,
    checks: checks
  };
}

function updatePasswordStrengthIndicator(password, indicatorElement, textElement) {
  const strength = calculatePasswordStrength(password);
  
  // Update visual indicator
  indicatorElement.style.width = strength.score + '%';
  indicatorElement.className = 'strength-bar ' + strength.level;
  
  // Update text
  const levelText = {
    weak: 'Weak - Add more characters',
    fair: 'Fair - Add uppercase & numbers',
    medium: 'Medium - Add special characters',
    strong: 'Strong password!'
  };
  
  textElement.textContent = levelText[strength.level];
  textElement.className = 'strength-text ' + strength.level;
  
  return strength;
}

// ============================================
// FORM VALIDATION
// ============================================

const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 64,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must be 8+ characters with uppercase, lowercase, number, and special character'
  },
  confirmPassword: {
    required: true,
    match: 'password',
    message: 'Passwords do not match'
  }
};

function validateField(fieldName, value, formData = {}) {
  const rule = VALIDATION_RULES[fieldName];
  
  if (!rule) return { valid: true };
  
  // Required check
  if (rule.required && (!value || value.trim() === '')) {
    return { valid: false, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` };
  }
  
  // Min length check
  if (rule.minLength && value.length < rule.minLength) {
    return { valid: false, message: `${fieldName} must be at least ${rule.minLength} characters` };
  }
  
  // Max length check
  if (rule.maxLength && value.length > rule.maxLength) {
    return { valid: false, message: `${fieldName} must be less than ${rule.maxLength} characters` };
  }
  
  // Pattern check
  if (rule.pattern && !rule.pattern.test(value)) {
    return { valid: false, message: rule.message };
  }
  
  // Match check
  if (rule.match && formData[rule.match] !== value) {
    return { valid: false, message: rule.message };
  }
  
  return { valid: true };
}

function showFieldError(inputElement, message) {
  const formGroup = inputElement.closest('.form-group');
  if (!formGroup) return;
  
  const errorElement = formGroup.querySelector('.field-error');
  const errorText = formGroup.querySelector('.error-text');
  
  inputElement.classList.add('error');
  inputElement.classList.remove('success');
  
  if (errorElement) {
    errorElement.classList.add('visible');
  }
  if (errorText) {
    errorText.textContent = message;
  }
}

function showFieldSuccess(inputElement) {
  const formGroup = inputElement.closest('.form-group');
  if (!formGroup) return;
  
  const errorElement = formGroup.querySelector('.field-error');
  
  inputElement.classList.remove('error');
  inputElement.classList.add('success');
  
  if (errorElement) {
    errorElement.classList.remove('visible');
  }
}

function clearFieldStatus(inputElement) {
  const formGroup = inputElement.closest('.form-group');
  if (!formGroup) return;
  
  const errorElement = formGroup.querySelector('.field-error');
  
  inputElement.classList.remove('error', 'success');
  
  if (errorElement) {
    errorElement.classList.remove('visible');
  }
}

// ============================================
// REAL-TIME VALIDATION
// ============================================

function initRealtimeValidation(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  const inputs = form.querySelectorAll('input[data-validate]');
  
  inputs.forEach(input => {
    // Validate on blur
    input.addEventListener('blur', () => {
      validateInput(input, form);
    });
    
    // Clear error on focus
    input.addEventListener('focus', () => {
      clearFieldStatus(input);
    });
    
    // Real-time validation for specific fields with debounce
    if (input.name === 'password' || input.name === 'email' || input.name === 'name') {
      let debounceTimer;
      input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          validateInput(input, form);
        }, 500);
      });
    }
    
    // Immediate validation for confirm password
    if (input.name === 'confirmPassword') {
      input.addEventListener('input', () => {
        validateInput(input, form);
      });
    }
  });
}

function validateInput(input, form) {
  const fieldName = input.name;
  const value = input.value;
  
  // Collect form data for match validation
  const formData = {};
  form.querySelectorAll('input').forEach(inp => {
    formData[inp.name] = inp.value;
  });
  
  const validation = validateField(fieldName, value, formData);
  
  if (!validation.valid) {
    showFieldError(input, validation.message);
    return false;
  } else {
    showFieldSuccess(input);
    return true;
  }
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[data-validate]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateInput(input, form)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// ============================================
// SIGNUP FUNCTIONALITY
// ============================================

function initSignupForm() {
  const signupForm = document.getElementById('signup-form');
  if (!signupForm) return;
  
  // Initialize real-time validation
  initRealtimeValidation('signup-form');
  
  // Initialize password strength indicator
  initPasswordStrengthIndicator();
  
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateForm(signupForm)) {
      showAuthMessage('Please fix the errors above', 'error');
      return;
    }
    
    // Collect form data
    const formData = {
      name: signupForm.querySelector('[name="name"]').value.trim(),
      email: signupForm.querySelector('[name="email"]').value.trim().toLowerCase(),
      password: signupForm.querySelector('[name="password"]').value,
      role: signupForm.querySelector('[name="role"]')?.value || 'student'
    };
    
    // Show loading state
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Creating Account...';
    
    // Attempt registration
    const result = await registerUser(formData);
    
    if (result.success) {
      showAuthMessage('Account created successfully! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      showAuthMessage(result.message, 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

function initPasswordStrengthIndicator() {
  const passwordInput = document.getElementById('password');
  const strengthContainer = document.getElementById('password-strength');
  
  if (!passwordInput || !strengthContainer) return;
  
  const strengthBar = strengthContainer.querySelector('.strength-bar');
  const strengthText = strengthContainer.querySelector('.strength-text');
  
  if (!strengthBar || !strengthText) return;
  
  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    if (password.length > 0) {
      strengthContainer.style.display = 'block';
      updatePasswordStrengthIndicator(password, strengthBar, strengthText);
    } else {
      strengthContainer.style.display = 'none';
    }
  });
}

async function registerUser(userData) {
  try {
    const users = getUsers();
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'An account with this email already exists' };
    }
    
    // Validate password strength
    const strength = calculatePasswordStrength(userData.password);
    if (strength.score < 50) {
      return { success: false, message: 'Please use a stronger password' };
    }
    
    // Create new user object
    const newUser = {
      id: generateUserId(),
      name: userData.name,
      email: userData.email,
      password: hashPassword(userData.password),
      role: userData.role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      profile: {
        avatar: null,
        bio: '',
        location: '',
        website: ''
      },
      preferences: {
        theme: getCurrentTheme(),
        notifications: true,
        newsletter: false
      },
      progress: {
        completedRoadmaps: [],
        inProgressRoadmaps: [],
        savedRoadmaps: [],
        totalHoursLearned: 0
      }
    };
    
    // Add to users array
    users.push(newUser);
    saveUsers(users);
    
    // Create session
    createSession(newUser);
    
    return { success: true, message: 'Registration successful', user: newUser };
    
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An error occurred during registration' };
  }
}

function generateUserId() {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ============================================
// LOGIN FUNCTIONALITY
// ============================================

function initLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  
  // Initialize real-time validation
  initRealtimeValidation('login-form');
  
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = loginForm.querySelector('[name="email"]');
    const passwordInput = loginForm.querySelector('[name="password"]');
    const rememberMeCheckbox = loginForm.querySelector('[name="rememberMe"]');
    
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;
    
    // Validate inputs
    if (!email || !password) {
      showAuthMessage('Please enter both email and password', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Signing In...';
    
    // Attempt login
    const result = await loginUser(email, password, rememberMe);
    
    if (result.success) {
      showAuthMessage('Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      showAuthMessage(result.message, 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      passwordInput.value = '';
    }
  });
}

// Handle both object and parameter-based login calls
async function loginUser(emailOrData, password, rememberMe = false) {
  try {
    let email, pass, remember;
    
    // Check if first argument is an object (from HTML forms)
    if (typeof emailOrData === 'object' && emailOrData !== null) {
      email = emailOrData.email;
      pass = emailOrData.password;
      remember = emailOrData.rememberMe || false;
    } else {
      // Traditional parameter-based call
      email = emailOrData;
      pass = password;
      remember = rememberMe;
    }
    
    const users = getUsers();
    
    // Find user by email
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    // Verify password
    if (!verifyPassword(pass, user.password)) {
      return { success: false, message: 'Invalid email or password' };
    }
    
    // Update last login
    user.lastLogin = new Date().toISOString();
    
    // Sync user theme preference
    const currentTheme = getCurrentTheme();
    if (user.preferences) {
      user.preferences.theme = currentTheme;
    }
    
    saveUsers(users);
    
    // Create session
    createSession(user, remember);
    
    return { success: true, message: 'Login successful', user: user };
    
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
}

// ============================================
// SESSION MANAGEMENT
// ============================================

function createSession(user, rememberMe = false) {
  const session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: new Date().toISOString(),
    expiresAt: rememberMe 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      : new Date(Date.now() + AUTH_CONFIG.sessionDuration).toISOString(),
    rememberMe: rememberMe
  };
  
  localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify(session));
  setCurrentUser(user);
}

function checkSession() {
  const session = localStorage.getItem(AUTH_CONFIG.sessionKey);
  
  if (!session) {
    setCurrentUser(null);
    return false;
  }
  
  try {
    const sessionData = JSON.parse(session);
    const now = new Date();
    const expiresAt = new Date(sessionData.expiresAt);
    
    if (now > expiresAt) {
      // Session expired
      logout();
      return false;
    }
    
    // Session valid - restore user data
    const users = getUsers();
    const user = users.find(u => u.id === sessionData.userId);
    
    if (user) {
      setCurrentUser(user);
      return true;
    }
    
    logout();
    return false;
  } catch (error) {
    console.error('Session check error:', error);
    logout();
    return false;
  }
}

function logout() {
  localStorage.removeItem(AUTH_CONFIG.sessionKey);
  localStorage.removeItem(AUTH_CONFIG.currentUserKey);
  updateAuthUI();
  
  // Redirect to home if on protected page
  const protectedPages = ['dashboard.html', 'profile.html', 'settings.html'];
  const currentPage = window.location.pathname.split('/').pop();
  
  if (protectedPages.includes(currentPage)) {
    window.location.href = 'index.html';
  }
}

function initLogoutButton() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
      window.location.href = 'index.html';
    });
  }
}

// ============================================
// UI UPDATES
// ============================================

function updateAuthUI() {
  const currentUser = getCurrentUser();
  
  // Update navbar auth links
  const authNavButtons = document.getElementById('auth-nav-buttons');
  const userGreeting = document.getElementById('user-greeting');
  const footerSignout = document.getElementById('footer-signout');
  
  if (authNavButtons && userGreeting) {
    if (currentUser) {
      authNavButtons.style.display = 'none';
      userGreeting.style.display = 'inline';
      // Show greeting with first name only
      userGreeting.textContent = `Hello, ${currentUser.name.split(' ')[0]}`;
      // Show footer sign out button
      if (footerSignout) footerSignout.style.display = 'inline-flex';
    } else {
      authNavButtons.style.display = 'flex';
      userGreeting.style.display = 'none';
      // Hide footer sign out button
      if (footerSignout) footerSignout.style.display = 'none';
    }
  }
  
  // Update auth links (legacy support)
  const authLinks = document.querySelectorAll('.auth-link');
  authLinks.forEach(link => {
    if (currentUser) {
      link.innerHTML = `<span class="material-symbols-outlined">account_circle</span> ${currentUser.name}`;
      link.href = 'profile.html';
    } else {
      link.innerHTML = `<span class="material-symbols-outlined">login</span> Sign In`;
      link.href = 'login.html';
    }
  });
  
  // Show/hide protected elements
  const protectedElements = document.querySelectorAll('[data-requires-auth]');
  protectedElements.forEach(el => {
    el.style.display = currentUser ? 'block' : 'none';
  });
  
  // Show/hide guest elements
  const guestElements = document.querySelectorAll('[data-guest-only]');
  guestElements.forEach(el => {
    el.style.display = currentUser ? 'none' : 'block';
  });
}

function showAuthMessage(message, type = 'info') {
  const messageContainer = document.getElementById('auth-message');
  if (!messageContainer) return;
  
  messageContainer.textContent = message;
  messageContainer.className = `auth-message visible ${type}`;
  
  // Auto-hide after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      messageContainer.classList.remove('visible');
    }, 5000);
  }
}

// ============================================
// USER PROFILE MANAGEMENT
// ============================================

function updateUserProfile(updates) {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'Not authenticated' };
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Update user data
  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);
  setCurrentUser(users[userIndex]);
  
  return { success: true, message: 'Profile updated successfully' };
}

function changePassword(currentPassword, newPassword) {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'Not authenticated' };
  
  // Verify current password
  if (!verifyPassword(currentPassword, currentUser.password)) {
    return { success: false, message: 'Current password is incorrect' };
  }
  
  // Validate new password
  const validation = validateField('password', newPassword);
  if (!validation.valid) {
    return { success: false, message: validation.message };
  }
  
  // Update password
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  users[userIndex].password = hashPassword(newPassword);
  saveUsers(users);
  setCurrentUser(users[userIndex]);
  
  return { success: true, message: 'Password changed successfully' };
}

// ============================================
// PROGRESS TRACKING
// ============================================

function saveRoadmapProgress(roadmapId, progress) {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'Not authenticated' };
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (!users[userIndex].progress.inProgressRoadmaps.includes(roadmapId)) {
    users[userIndex].progress.inProgressRoadmaps.push(roadmapId);
  }
  
  saveUsers(users);
  setCurrentUser(users[userIndex]);
  
  return { success: true };
}

function completeRoadmap(roadmapId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'Not authenticated' };
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  // Remove from in-progress
  users[userIndex].progress.inProgressRoadmaps = 
    users[userIndex].progress.inProgressRoadmaps.filter(id => id !== roadmapId);
  
  // Add to completed
  if (!users[userIndex].progress.completedRoadmaps.includes(roadmapId)) {
    users[userIndex].progress.completedRoadmaps.push(roadmapId);
  }
  
  saveUsers(users);
  setCurrentUser(users[userIndex]);
  
  return { success: true };
}

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================

window.Auth = {
  // Auth functions
  login: loginUser,
  register: registerUser,
  logout: logout,
  getCurrentUser: getCurrentUser,
  isAuthenticated: () => !!getCurrentUser(),
  
  // User management
  updateProfile: updateUserProfile,
  changePassword: changePassword,
  
  // Progress tracking
  saveProgress: saveRoadmapProgress,
  completeRoadmap: completeRoadmap,
  
  // Validation
  validateInput: validateInput,
  validateForm: validateForm,
  initRealtimeValidation: initRealtimeValidation,
  calculatePasswordStrength: calculatePasswordStrength,
  
  // Theme
  toggleTheme: toggleTheme,
  getCurrentTheme: getCurrentTheme,
  
  // Data export
  exportUserData: exportUserData,
  
  // Utilities
  checkSession: checkSession,
  updateAuthUI: updateAuthUI,
  showAuthMessage: showAuthMessage
};