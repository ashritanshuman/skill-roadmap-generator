# PathGen Design System Documentation

## Overview

PathGen uses a modern **Glassmorphism Design System** with comprehensive **Dark/Light Theme Support**. The design emphasizes clarity, accessibility, and smooth visual transitions.

---

## 🎨 Design Philosophy

### Core Principles
1. **Glassmorphism**: Translucent backgrounds with backdrop blur effects
2. **Minimalism**: Clean, uncluttered interfaces with generous whitespace
3. **Accessibility**: WCAG-compliant contrast ratios and keyboard navigation
4. **Consistency**: Unified design tokens across all components
5. **Responsiveness**: Mobile-first approach with fluid layouts

---

## 🌓 Theme System

### Theme Architecture

The theme system uses **CSS Custom Properties** (variables) with a data-attribute selector approach:

```css
/* Default (Dark) Theme */
:root {
  /* Colors defined here */
}

/* Light Theme Override */
[data-theme="light"] {
  /* Light theme colors */
}
```

### Theme Toggle

**Location**: Navbar on all pages (except auth pages where it's fixed top-right)

**Component Structure**:
```html
<button class="theme-toggle" id="theme-toggle" 
        onclick="window.Theme && window.Theme.toggle()">
  <span class="material-symbols-outlined icon-sun">light_mode</span>
  <span class="material-symbols-outlined icon-moon">dark_mode</span>
</button>
```

**Icon Behavior**:
- **Dark Mode**: Sun icon visible (click to switch to light)
- **Light Mode**: Moon icon visible (click to switch to dark)
- Smooth rotation and opacity transitions

### Theme Persistence
- System preference detection via `prefers-color-scheme`
- User preference stored in `localStorage` (key: `pathgen_theme`)
- Instant theme application on page load (prevents flash)

---

## 🎨 Color System

### Dark Theme (Default)

**Background Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0a0a0a` | Main page background |
| `--color-bg-secondary` | `#111111` | Alternate sections |
| `--color-bg-tertiary` | `#1a1a1a` | Elevated surfaces |
| `--color-bg-elevated` | `#1c1c1c` | Cards, modals |
| `--color-bg-card` | `rgba(255,255,255,0.03)` | Card backgrounds |
| `--color-bg-input` | `rgba(255,255,255,0.05)` | Input fields |

**Text Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-primary` | `#ffffff` | Headings, primary text |
| `--color-text-secondary` | `#d4d4d8` | Body text |
| `--color-text-muted` | `#a1a1aa` | Placeholders, hints |
| `--color-text-placeholder` | `#71717a` | Input placeholders |

**Accent Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#3B82F6` | Primary blue |
| `--color-primary-dark` | `#2563EB` | Hover states |
| `--color-primary-light` | `#60A5FA` | Focus states |
| `--color-accent-green` | `#22c55e` | Success states |
| `--color-accent-orange` | `#f97316` | Warnings |
| `--color-accent-red` | `#ef4444` | Errors |

**Glassmorphism**:
| Token | Value | Usage |
|-------|-------|-------|
| `--glass-bg` | `rgba(255,255,255,0.03)` | Glass backgrounds |
| `--glass-bg-hover` | `rgba(255,255,255,0.05)` | Hover states |
| `--glass-border` | `rgba(255,255,255,0.08)` | Borders |
| `--glass-border-hover` | `rgba(59,130,246,0.3)` | Hover borders |

### Light Theme

**Background Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#f8f7f4` | Warm cream background |
| `--color-bg-secondary` | `#f0efe9` | Alternate sections |
| `--color-bg-elevated` | `#ffffff` | Cards, modals |

**Text Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-primary` | `#1a1a1a` | Headings |
| `--color-text-secondary` | `#4a4a4a` | Body text |
| `--color-text-muted` | `#6b6b6b` | Secondary text |

**Glassmorphism (Light)**:
| Token | Value | Usage |
|-------|-------|-------|
| `--glass-bg` | `rgba(255,255,255,0.7)` | Glass backgrounds |
| `--glass-border` | `rgba(0,0,0,0.08)` | Borders |

### Shadows

**Dark Theme**:
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(59, 130, 246, 0.3);
```

**Light Theme**:
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-glow: 0 0 20px rgba(37, 99, 235, 0.2);
```

---

## 📝 Typography

### Font Families

**Primary Font**: Plus Jakarta Sans
```css
--font-family-primary: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Usage**:
- Headings: `font-weight: 300-700`
- Body text: `font-weight: 400-500`
- UI elements: `font-weight: 600-700`

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--font-size-xs` | 10px | Labels, badges |
| `--font-size-sm` | 12px | Secondary text |
| `--font-size-base` | 14px | Body text |
| `--font-size-md` | 16px | Input text |
| `--font-size-lg` | 18px | Card titles |
| `--font-size-xl` | 22px | Section subtitles |
| `--font-size-2xl` | 28px | H3 headings |
| `--font-size-3xl` | 36px | H2 headings |
| `--font-size-4xl` | 48px | Hero secondary |
| `--font-size-5xl` | 64px | Hero primary (desktop) |

### Hero Typography
```css
.hero-title {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 300;
  letter-spacing: -0.03em;
}
```

---

## 🧩 Components

### 1. Navigation Bar

**Structure**:
- Fixed position at top
- Pill-shaped container with glassmorphism
- Blur effect: `backdrop-filter: blur(20px)`

**Layout**:
```
[Brand Logo] ---- [Nav Links] ---- [Theme Toggle | Auth Button | Mobile Menu]
```

**CSS**:
```css
.navbar .container {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 9999px; /* Pill shape */
  padding: 16px 32px;
}
```

### 2. Theme Toggle Button

**Size**: 40px × 40px
**Border Radius**: 50% (circle)
**Icons**: Material Symbols (light_mode/dark_mode)

**States**:
- Default: `--glass-bg` background
- Hover: Scale 1.05, border color change
- Active: Icon rotation animation

**CSS**:
```css
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 300ms ease;
}

/* Icon visibility based on theme */
[data-theme="dark"] .icon-sun { opacity: 1; }
[data-theme="dark"] .icon-moon { opacity: 0; }
[data-theme="light"] .icon-sun { opacity: 0; }
[data-theme="light"] .icon-moon { opacity: 1; }
```

### 3. Buttons

**Primary Button**:
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  border-radius: 9999px;
  padding: 10px 24px;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
}
```

**Secondary Button**:
```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--color-text-primary);
  border-radius: 9999px;
}
```

### 4. Cards (Glassmorphism)

**Roadmap Card**:
```css
.roadmap-item {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 24px;
  transition: all 300ms ease;
}

.roadmap-item:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

### 5. Search Bar

**Structure**:
- Google-style search with glassmorphism
- Rounded pill shape (24px radius)
- Glow effect on focus

**CSS**:
```css
.search-container {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 8px 16px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  transition: all 200ms ease;
}

.search-container:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.3);
}
```

### 6. Form Inputs

**Style**:
```css
.form-input {
  background: var(--color-bg-input);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  padding: 12px 16px;
  color: var(--color-text-primary);
  transition: all 150ms ease;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
}
```

### 7. Modal

**Overlay**:
```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
}

.modal-content {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

---

## 📐 Layout System

### Spacing Scale

| Token | Value |
|-------|-------|
| `--spacing-1` | 4px |
| `--spacing-2` | 8px |
| `--spacing-3` | 12px |
| `--spacing-4` | 16px |
| `--spacing-5` | 20px |
| `--spacing-6` | 24px |
| `--spacing-8` | 32px |
| `--spacing-10` | 40px |
| `--spacing-12` | 48px |
| `--spacing-16` | 64px |
| `--spacing-20` | 80px |
| `--spacing-24` | 96px |
| `--spacing-32` | 128px |

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### Grid Systems

**Roadmaps Grid**:
```css
.roadmaps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1024px) {
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 768px) {
  grid-template-columns: 1fr;
}
```

---

## 🌈 Gradients

### Hero Gradient
```css
body {
  background-image: 
    radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.03) 0%, transparent 40%);
}
```

### Text Gradient
```css
.text-gradient {
  background: linear-gradient(to right, #ffffff, var(--color-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## ♿ Accessibility

### Contrast Ratios
- Primary text: 4.5:1 minimum (WCAG AA)
- Large text: 3:1 minimum
- UI components: 3:1 minimum against adjacent colors

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation-duration: 0.01ms !important;
  }
}
```

### High Contrast
```css
@media (prefers-contrast: high) {
  --glass-border: rgba(255, 255, 255, 0.3);
  --color-text-secondary: #ffffff;
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Desktop | > 1024px | Full layout, 4-column grids |
| Tablet | 768px - 1024px | 2-column grids, reduced spacing |
| Mobile | < 768px | Single column, hamburger menu |
| Small Mobile | < 480px | Compact typography, full-width buttons |

---

## 🎭 Animations & Transitions

### Theme Transition
```css
* {
  transition: background-color 0.25s ease, 
              color 0.25s ease, 
              border-color 0.25s ease, 
              box-shadow 0.25s ease;
}
```

### Hover Effects
- Cards: `transform: translateY(-4px)` with shadow increase
- Buttons: `transform: scale(1.05)` with glow intensification
- Links: Color change with underline animation

### Loading Spinner
```css
.loading-spinner {
  border: 2px solid var(--color-primary-subtle);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

---

## 🧪 Usage Examples

### Creating a Themed Card
```html
<div class="glass-card">
  <h3 class="card-title">Card Title</h3>
  <p class="card-content">Card content text</p>
</div>
```

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 24px;
  transition: all 300ms ease;
}

.glass-card:hover {
  border-color: var(--glass-border-hover);
  background: var(--glass-bg-hover);
}
```

### Theme-Aware Text
```html
<h1 class="text-gradient">Gradient Heading</h1>
<p class="text-secondary">Secondary text content</p>
```

### Using Design Tokens in Custom CSS
```css
.my-custom-component {
  background: var(--color-bg-card);
  color: var(--color-text-primary);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  transition: var(--transition-base);
}
```

---

## 📁 File Structure

```
css/
├── reset.css          # CSS reset/normalize
├── variables.css      # All design tokens
├── global.css         # Global styles, typography
├── components.css     # Reusable components
├── home.css          # Home page styles
├── explore.css       # Explore page styles
├── roadmap.css       # Roadmap detail styles
└── responsive.css    # Media queries

js/
└── theme.js          # Theme management system
```

---

## 🔧 Theme API

### JavaScript Access
```javascript
// Toggle theme
window.Theme.toggle();

// Set specific theme
window.Theme.set('light');

// Get current theme
const current = window.Theme.get(); // 'dark' or 'light'

// Check theme
if (window.Theme.isDark()) { /* ... */ }
if (window.Theme.isLight()) { /* ... */ }

// Get system preference
const system = window.Theme.getSystem();

// Reset to system preference
window.Theme.reset();
```

### Event Listening
```javascript
window.addEventListener('themechange', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
```

---

## 🎯 Best Practices

1. **Always use design tokens** - Never hardcode colors or sizes
2. **Test both themes** - Ensure visibility in dark and light modes
3. **Maintain contrast** - Check WCAG ratios for accessibility
4. **Use semantic HTML** - Proper heading hierarchy and ARIA labels
5. **Respect user preferences** - Honor `prefers-reduced-motion` and `prefers-color-scheme`
6. **Smooth transitions** - All theme changes should animate smoothly
7. **Mobile-first** - Design for mobile, enhance for desktop

---

## 📚 Resources

- **Google Fonts**: Plus Jakarta Sans
- **Icons**: Material Symbols Outlined
- **Color Inspiration**: Modern dark tech aesthetic with warm light alternative
- **Design Pattern**: Glassmorphism with accessibility considerations

---

*Last Updated: April 10, 2026*
*Version: 1.4.0*
