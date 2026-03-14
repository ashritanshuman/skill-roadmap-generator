# Product Requirements Document (PRD)

## PBL-3: Skill Roadmap Generator Website - PathGen

**Course:** Web Technology (CSP0203[P]) - B.Tech CS/IT | II Semester
**Project Type:** Project Based Learning (PBL)
**Total Marks:** 20
**Team Size:** Maximum 4 students
**Project Name:** PathGen - AI-Driven Learning Roadmaps

---

## 1. PROJECT OVERVIEW

### 1.1 Description
PathGen is a career-oriented website that creates structured, AI-driven personalized learning roadmaps for technical skills. The platform features a modern dark tech aesthetic with glassmorphism design, helping students and learners discover comprehensive learning paths tailored to their goals. The website includes detailed phase-based roadmaps with projects, outcomes, and timeline views.

### 1.2 Core Technologies
- **HTML5** - Semantic structure and layout
- **CSS3** - Glassmorphism styling, animations, and responsive design
- **JavaScript (ES6+)** - Dynamic content loading, search, theme toggle, mobile menu
- **JSON** - Comprehensive roadmap data storage with phases, modules, and topics

### 1.3 Tools
- VSCode (Development)
- Web Browser (Chrome/Firefox for testing)
- Git/GitHub (Version control)
- Material Symbols (Google Icons)

### 1.4 Key Features Implemented
- Dark/Light theme toggle with warm cream light mode
- Glassmorphism design with backdrop filters
- Dynamic roadmap loading from JSON
- Search functionality with dropdown results
- Mobile-responsive hamburger menu
- Expandable phase cards on roadmap detail page
- Timeline view for learning progression

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 Home Page (index.html)

#### Features:
1. **Hero Section**
   - Large animated heading: "Engineering your future mastery"
   - Gradient text effect on second line
   - Subheading: "Eliminate the noise. AI-driven personalized learning roadmaps tailored to your technical ambitions."
   - Google-style search bar with real-time search results dropdown
   - "Search" button (primary CTA)
   - Trending tags: LLM Operations, Rust Systems, Distributed Networks

2. **Skill Based Roadmaps Section**
   - Display 8 skill roadmaps in 4-column grid:
     - React (Frontend Library)
     - Node.js (Runtime Environment)
     - Python (Programming Language)
     - Kubernetes (Container Orchestration)
     - Docker (Containerization)
     - AWS (Cloud Platform)
     - PostgreSQL (Database)
     - TypeScript (Typed JavaScript)
   - Each card has icon, title, and category meta
   - "Explore All" link to explore page

3. **Role Based Roadmaps Section**
   - Display 6 role roadmaps in 4-column grid:
     - Frontend Developer (UI/UX Implementation)
     - Web Developer (UI/UX Implementation)
     - DevOps Engineer (CI/CD & Infrastructure)
     - AI/ML Engineer (Machine Learning)
     - Data Scientist (Analytics & Predictive Modeling)
     - Data Analyst (Data Analytics & Business Intelligence)
   - Alternate background styling

4. **Precision Engineering Features Section**
   - 4 feature cards: Adaptive Flow, Modular Architecture, Validation Gates, Intelligence Layer
   - Icons with glow effects

5. **CTA Section**
   - "Begin Your Technical Evolution"
   - "Get Started" and "Explore Roadmaps" buttons

6. **Navigation Bar (Fixed, Glassmorphism)**
   - Logo: "PG PathGen" with brand icon
   - Menu items: Explore, How it Works, Contact
   - Theme toggle button (light/dark mode)
   - "Get Started" button
   - Mobile hamburger menu (on smaller screens)

7. **Footer**
   - Brand column with social links
   - Link columns: Core, Docs, Entity
   - Copyright and legal links

### 2.2 Explore Page (explore.html)

#### Features:
1. **Breadcrumb Navigation**
   - Home > [Category]

2. **Page Header**
   - Dynamic title based on category (All Roadmaps / Skill Based / Role Based)
   - Category-specific subtitle

3. **Category Tabs**
   - All Roadmaps (default)
   - Skill Based
   - Role Based
   - Active tab highlighting

4. **Roadmaps Grid**
   - 4-column responsive grid
   - Category badges (Skill/Role Based)
   - Stats display (phases, duration, technologies, salary)
   - Links to roadmap detail page

### 2.3 Roadmap Detail Page (roadmap.html)

#### Features:
1. **Breadcrumb Navigation**
   - Home > [Roadmap Name]

2. **Roadmap Header**
   - Large icon with glassmorphism background
   - Title and subtitle from JSON
   - 4 stat badges in grid:
     - Number of phases
     - Duration estimate
     - Technologies count
     - Starting salary

3. **Phases Section**
   - Section title: "Learning Phases"
   - Expandable phase cards:
     - Phase number badge (colored)
     - Phase title and subtitle
     - Duration badge
     - Expand/collapse toggle icon
   
   **Expanded Phase Content:**
   - Phase description paragraph
   - Sections grid with:
     - Section title and subtitle
     - Topics list with em-dash bullets
   - Projects block (with rocket emoji)
   - Outcomes block (with checkmark icons)
   - Salary/Job outcomes block (green accent)

4. **Timeline Section**
   - Visual timeline with dots and connecting lines
   - Period badges (e.g., "WEEK 1-2")
   - Focus areas for each time period
   - Milestone descriptions

5. **Loading & Error States**
   - Animated spinner during data load
   - Error message with retry option

### 2.4 How It Works Page (how-it-works.html)
- Three-step process explanation
- Visual cards for each step
- CTA section at bottom

### 2.5 Contact Page (contact.html)
- Contact form with fields: Name, Email, Subject, Message
- Form validation
- Social media links

---

## 3. DATA STRUCTURE (JSON)

### 3.1 Roadmap Data Schema (public/data/roadmaps-data.json)

**14 Complete Roadmaps Implemented:**

**Role Based (6):**
1. Frontend Developer - 3 phases, 6-9 months
2. Web Developer - 6 phases, UI/UX focused
3. AI/ML Engineer - Machine Learning career path
4. Data Scientist - Analytics & Predictive Modeling
5. DevOps Engineer - CI/CD & Infrastructure
6. Data Analyst - Data Analytics & Business Intelligence

**Skill Based (8):**
1. React - Frontend library with hooks, state management
2. Node.js - Runtime environment, Express, APIs
3. Python - Programming language fundamentals
4. Kubernetes - Container orchestration
5. Docker - Containerization platform
6. AWS - Cloud platform services
7. PostgreSQL - Database management
8. TypeScript - Typed JavaScript

### 3.2 JSON Structure

```json
{
  "roadmaps": [
    {
      "id": "frontend-developer",
      "title": "Frontend Developer",
      "subtitle": "UI/UX Implementation",
      "icon": "computer",
      "stats": {
        "phases": 3,
        "duration": "6-9 Months to Job",
        "technologies": "25+ Technologies",
        "salary": "$70K+ Starting Salary"
      },
      "phases": [
        {
          "id": 1,
          "title": "Foundation",
          "subtitle": "HTML & CSS — The Web's Skeleton",
          "duration": "4-6 weeks | 2 hrs/day",
          "description": "Everything on the web is HTML and CSS...",
          "sections": [
            {
              "title": "HTML Fundamentals",
              "subtitle": "Structure & Semantics",
              "topics": [
                "DOCTYPE, head, body, meta tags",
                "Semantic elements: header, nav, main...",
                "..."
              ]
            }
          ],
          "projects": [
            "Build a complete portfolio landing page",
            "Clone any popular website homepage"
          ],
          "outcomes": [
            "Build any layout from a Figma design",
            "Make any layout work on mobile"
          ]
        }
      ],
      "timeline": [
        {
          "period": "Week 1-2",
          "focus": "HTML & CSS Basics",
          "milestone": "Build first static webpage"
        }
      ]
    }
  ]
}
```

### 3.3 Data Categories
- **Skill Based:** Technology-specific learning paths
- **Role Based:** Career-oriented comprehensive paths

---

## 4. DESIGN REQUIREMENTS

### 4.1 Color Scheme - Dark Tech Theme with Glassmorphism

**Dark Mode (Default):**
- **Primary Color:** Blue (#3B82F6)
- **Primary Dark:** #2563EB
- **Primary Light:** #60A5FA
- **Background Primary:** #0a0a0a (near black)
- **Background Secondary:** #111111
- **Background Elevated:** #1c1c1c
- **Text Primary:** #ffffff
- **Text Secondary:** #a1a1aa
- **Text Muted:** #71717a
- **Glass Background:** rgba(255, 255, 255, 0.03)
- **Glass Border:** rgba(255, 255, 255, 0.08)
- **Accent Green:** #22c55e (for success/outcomes)

**Light Mode (Warm Cream):**
- **Primary Color:** Brown/Orange (#B8622F)
- **Background Primary:** #f4f3ee (warm cream)
- **Background Secondary:** #e8e6e1
- **Text Primary:** #2C1810 (dark brown)
- **Text Secondary:** #5c4a42
- **Glass Background:** rgba(244, 243, 238, 0.85)

### 4.2 Typography
- **Font Family:** 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif
- **Font Weights:** 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes:**
  - Hero: clamp(3rem, 8vw, 7rem)
  - H2: 36px (var(--font-size-3xl))
  - H3: 28px (var(--font-size-2xl))
  - Subtitles: 18-22px (bold)
  - Body: 14-16px
  - Small/Labels: 10-12px (uppercase, letter-spacing: 0.15em)

### 4.3 Layout
- **Responsive Design:** Mobile-first with breakpoints at 480px, 768px, 900px, 1024px
- **Max Content Width:** 1200px (var(--container-max-width))
- **Navbar Max Width:** 1000px with pill shape
- **Spacing System:** 4px base unit (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px)
- **Grid System:** CSS Grid with 4-column layout on desktop, 2 on tablet, 1 on mobile

### 4.4 Glassmorphism Components

#### Navbar (Pill Shape with Blur)
```css
.navbar .container {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 9999px; /* Full rounded */
  padding: 16px 32px;
}
```

#### Roadmap Cards
```css
.roadmap-item {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 24px;
  transition: all 0.3s ease;
}

.roadmap-item:hover {
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
```

#### Phase Cards (Expandable)
```css
.phase-card {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  overflow: hidden;
}

.phase-number {
  background: var(--color-primary);
  color: white;
  border-radius: 14px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
```

#### Button Styles
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 10px 24px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-primary);
}
```

#### Category Badges
```css
.category-badge {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 10px;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.category-badge.role {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}
```

---

## 5. TECHNICAL IMPLEMENTATION

### 5.1 File Structure
```
skill-roadmap-generator/
│
├── index.html                # Home page (landing page)
├── roadmaps.html             # Explore all roadmaps page
├── roadmap-detail.html       # Individual roadmap detail page
├── PRD.md                    # Product Requirements Document
├── README.md                 # Project documentation
│
├── css/                      # Stylesheets
│   ├── reset.css             # CSS reset/normalize
│   ├── variables.css         # CSS custom properties (colors, spacing, etc.)
│   ├── global.css            # Global styles and utilities
│   ├── components.css        # Reusable UI components (buttons, cards, nav)
│   ├── home.css              # Home page specific styles
│   ├── roadmaps.css          # Roadmaps listing page styles
│   ├── roadmap-detail.css    # Roadmap detail page styles
│   └── responsive.css        # Media queries and responsive adjustments
│
├── js/                       # JavaScript files
│   ├── main.js               # Core functionality (theme toggle, navigation, etc.)
│   ├── roadmaps.js           # Roadmaps listing page logic
│   └── roadmap-detail.js     # Roadmap detail page logic
│
├── data/                     # Data documentation
│   └── roadmaps-data.md      # Roadmap data structure documentation
│
├── public/                   # Public assets and data
│   └── data/
│       └── roadmaps-data.json # All roadmap data (JSON)
│
├── assets/                   # Static assets
│   ├── icons/                # Icon files
│   └── images/               # Image files
│
├── ui/                       # UI/UX design files
│   ├── v1.0/                 # Version 1.0 designs
│   │   ├── home-page.png
│   │   └── skill-page.png
│   └── v2.0/                 # Version 2.0 designs
│       └── screen.png
│
├── .github/                  # GitHub templates and workflows
├── .vscode/                  # VSCode settings
└── .qoder/                   # Qoder configuration
```

### 5.2 JavaScript Functionality (Minimal Usage)

#### Required JavaScript Features:

1. **Search/Filter Functionality**
```javascript
// Filter roadmaps based on user input
function filterRoadmaps(searchTerm) {
  const roadmaps = document.querySelectorAll('.skill-card');
  roadmaps.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchTerm.toLowerCase())) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
```

2. **Load JSON Data**
```javascript
// Fetch and display roadmap data
async function loadRoadmaps() {
  const response = await fetch('data/roadmaps.json');
  const data = await response.json();
  displayRoadmaps(data.roadmaps);
}
```

3. **Expandable/Collapsible Sections**
```javascript
// Toggle module details
function toggleModule(moduleId) {
  const module = document.getElementById(moduleId);
  module.classList.toggle('expanded');
}
```

4. **URL Parameter Handling**
```javascript
// Get skill from URL (e.g., roadmap.html?skill=web-development)
const urlParams = new URLSearchParams(window.location.search);
const skillSlug = urlParams.get('skill');
loadRoadmapBySlug(skillSlug);
```

5. **Dynamic Content Generation**
```javascript
// Generate roadmap cards from JSON
function displayRoadmaps(roadmaps) {
  const container = document.getElementById('roadmap-container');
  roadmaps.forEach(roadmap => {
    const card = createRoadmapCard(roadmap);
    container.appendChild(card);
  });
}
```

### 5.3 CSS-Only Features (No JavaScript Required)

- **Hover effects** on cards and buttons
- **Smooth scrolling** with `scroll-behavior: smooth`
- **Accordion using details/summary** HTML elements
- **Progress indicators** using CSS gradients
- **Responsive navigation** with CSS only
- **Animations** using CSS transitions and keyframes

---

## 6. RESPONSIVE DESIGN

### 6.1 Breakpoints (Implemented)
```css
/* Mobile First Approach */

/* Small Mobile: 320px - 480px */
@media (max-width: 480px) {
  .hero-title { font-size: var(--font-size-3xl); }
  .roadmaps-grid { grid-template-columns: 1fr; }
}

/* Mobile: 481px - 768px */
@media (max-width: 768px) {
  .nav-menu { display: none; } /* Hidden by default */
  .nav-menu.active { display: flex; } /* Show when toggled */
  .mobile-menu-toggle { display: flex; }
  .roadmaps-grid { grid-template-columns: 1fr; }
  .hero { min-height: 100vh; }
}

/* Tablet: 769px - 900px */
@media (max-width: 900px) {
  .nav-menu { /* Mobile menu styles */ }
  .mobile-menu-toggle { display: flex; }
}

/* Tablet: 901px - 1024px */
@media (max-width: 1024px) {
  .roadmaps-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 1025px+ */
/* Default styles apply */
```

### 6.2 Mobile-Specific Features
- **Hamburger menu** with animated icon (transforms to X)
- **Slide-down animation** for mobile menu
- **Touch-friendly targets** (min 44px)
- **Full-width cards** on mobile
- **Reduced padding** on smaller screens
- **Stacked layout** for stats and features

---

## 7. CONTENT REQUIREMENTS (IMPLEMENTED)

### 7.1 Roadmaps Included (14 Total)

**Role Based (6):**
1. **Frontend Developer** - 3 phases, HTML/CSS → JavaScript → React
2. **Web Developer** - 6 phases, comprehensive full-stack path
3. **DevOps Engineer** - Linux, CI/CD, Docker, Kubernetes, Cloud
4. **AI/ML Engineer** - Python, ML algorithms, Deep Learning, MLOps
5. **Data Scientist** - Statistics, Python, ML, Visualization, Big Data
6. **Data Analyst** - Excel, SQL, Python, Visualization, Reporting

**Skill Based (8):**
1. **React** - Components, Hooks, State, Routing, Testing
2. **Node.js** - Fundamentals, Express, APIs, DB, Auth, Microservices
3. **Python** - Basics, OOP, Advanced, Libraries, Web, Data
4. **Kubernetes** - Containers, K8s basics, Objects, Advanced, Security
5. **Docker** - Basics, Images, Compose, Networking, Security
6. **AWS** - Core services, Compute, Storage, Security, Architecture
7. **PostgreSQL** - SQL, Advanced queries, Performance, Administration
8. **TypeScript** - Types, Interfaces, Generics, Advanced patterns

### 7.2 Each Roadmap Includes
- ✅ 3-6 phases per roadmap
- ✅ 4-6 sections per phase
- ✅ 5-8 topics per section
- ✅ 3-4 hands-on projects per phase
- ✅ 3-4 measurable outcomes per phase
- ✅ Timeline with weekly milestones
- ✅ Realistic duration estimates (weeks/months)
- ✅ Salary/outcome information
- ✅ Difficulty progression

---

## 8. EVALUATION CRITERIA ALIGNMENT

### 8.1 Synopsis Submission (2 marks) ✅
**Deliverable:** Project overview document containing:
- ✅ Project description and objectives (AI-driven learning roadmaps)
- ✅ Technology stack justification (HTML, CSS, JS, JSON)
- ✅ Feature list with priorities (search, themes, responsive, glassmorphism)
- ✅ Team member responsibilities
- ✅ Timeline with milestones

### 8.2 Design and Workflow (4 marks) ✅
**Deliverable:** Design document including:
- ✅ Wireframes for home and roadmap pages (in ui/ folder)
- ✅ User flow diagrams (Home → Explore → Roadmap Detail)
- ✅ JSON data structure (comprehensive schema with phases, sections, topics)
- ✅ Color scheme and typography choices (dark/light themes, Plus Jakarta Sans)
- ✅ Component breakdown (glassmorphism cards, navbar, phases)

### 8.3 Implementation (6 marks) ✅
**Assessment Based On:**
- ✅ Clean, semantic HTML5 structure (5 pages)
- ✅ Well-organized CSS with reusable components (7 CSS files)
- ✅ Efficient JavaScript (3 JS files, ES6+ features)
- ✅ Proper JSON data structure (14 complete roadmaps)
- ✅ Responsive design implementation (4 breakpoints)
- ✅ Code comments and organization

### 8.4 Testing and Evaluation (3 marks) ✅
**Test Report Should Include:**
- ✅ Browser compatibility testing (Chrome, Firefox, Safari, Edge)
- ✅ Responsive design testing (mobile, tablet, desktop)
- ✅ Functionality testing (search, navigation, data loading, theme toggle)
- ✅ Performance testing (optimized CSS, minimal JS, fast load times)
- ✅ Usability testing with sample users

### 8.5 Presentation and Viva (5 marks) ✅
**Preparation:**
- ✅ Live demo of all features (5 pages, 14 roadmaps)
- ✅ Explanation of technical choices (glassmorphism, CSS variables, JSON)
- ✅ Discussion of challenges and solutions (responsive menu, theme toggle)
- ✅ Code walkthrough (well-commented, organized structure)
- ✅ Future enhancement ideas (progress tracking, user accounts)

---

## 9. IMPLEMENTATION PHASES (COMPLETED)

### Phase 1: Setup & Structure ✅
- ✅ Project folder structure created
- ✅ HTML skeleton for 5 pages (index, explore, roadmap, how-it-works, contact)
- ✅ CSS framework with variables, reset, global styles
- ✅ JSON data structure designed (phases, sections, topics, projects, outcomes)
- ✅ 14 complete roadmaps in roadmaps-data.json

### Phase 2: Home Page Development ✅
- ✅ Hero section with gradient text and search
- ✅ Skill Based roadmaps section (8 cards)
- ✅ Role Based roadmaps section (6 cards)
- ✅ Precision Engineering features section
- ✅ CTA section with dual buttons
- ✅ Glassmorphism navigation bar with theme toggle
- ✅ Footer with links and social icons
- ✅ Fully responsive

### Phase 3: Explore & Roadmap Pages ✅
- ✅ Explore page with category tabs (All/Skill/Role)
- ✅ Dynamic roadmap grid generation from JSON
- ✅ Roadmap detail page with stats badges
- ✅ Expandable phase cards with sections
- ✅ Projects and outcomes blocks
- ✅ Timeline section with milestones
- ✅ Loading and error states

### Phase 4: JavaScript Integration ✅
- ✅ Real-time search with dropdown results
- ✅ Dynamic data loading from JSON
- ✅ Category filtering on explore page
- ✅ URL parameter handling (?id=, ?category=)
- ✅ Phase expand/collapse functionality
- ✅ Theme toggle (dark/light mode)
- ✅ Mobile menu toggle
- ✅ Smooth scroll navigation

### Phase 5: Testing & Polish ✅
- ✅ Cross-browser testing (Chrome, Firefox, Safari)
- ✅ Responsive design refinement (4 breakpoints)
- ✅ Performance optimization (minimal JS, CSS variables)
- ✅ Glassmorphism effects with backdrop-filter
- ✅ Bug fixes and edge cases
- ✅ Documentation (PRD, README)

---

## 10. BONUS FEATURES (IMPLEMENTED)

### Features Completed:
1. ✅ **Theme Toggle**
   - Dark/Light mode switch with persistence (localStorage)
   - CSS custom properties for complete theming
   - Warm cream light mode, dark tech dark mode

2. ✅ **Search with Real-time Results**
   - Search bar with dropdown suggestions
   - Matches titles and subtitles
   - Keyboard navigation support

3. ✅ **Mobile Menu**
   - Animated hamburger icon (transforms to X)
   - Slide-down menu with glassmorphism
   - Closes on link click or outside click

4. ✅ **Glassmorphism Design**
   - Backdrop-filter blur effects
   - Semi-transparent backgrounds
   - Border accents with hover effects

5. ✅ **Dynamic Content Loading**
   - All roadmaps loaded from JSON
   - Category filtering
   - No hardcoded roadmap data in HTML

### Future Enhancements (Optional):
1. **Local Storage for Progress Tracking**
   - Save user's completed modules
   - Track learning progress per roadmap
   - Resume from last position

2. **Print-Friendly View**
   - CSS print styles
   - Downloadable roadmap as PDF

3. **Bookmark/Save Feature**
   - Save favorite roadmaps to profile
   - Using localStorage

4. **Estimated Time Calculator**
   - Input hours per week
   - Calculate personalized completion date

---

## 11. SUCCESS METRICS ✅

### Project Completion Status:
- ✅ **All 5 pages responsive** (mobile, tablet, desktop) - 4 breakpoints implemented
- ✅ **14 complete roadmaps** with detailed phases (exceeds requirement of 6)
- ✅ **Search functionality** works with real-time dropdown results
- ✅ **Data loads dynamically** from JSON (no hardcoded content)
- ✅ **No console errors** - clean JavaScript implementation
- ✅ **Clean, commented code** - well-organized file structure
- ✅ **Professional visual design** - glassmorphism dark tech aesthetic
- ✅ **Fast page load times** - optimized CSS, minimal JS, efficient JSON structure
- ✅ **Theme toggle** - dark/light mode with persistence
- ✅ **Mobile menu** - hamburger navigation for small screens
- ✅ **Expandable phases** - interactive roadmap detail view

---

## 12. DELIVERABLES CHECKLIST ✅

### Week 1: ✅
- [x] PBL Synopsis submitted
- [x] Design wireframes created (ui/v1.0 and v2.0)
- [x] JSON structure finalized (phases, sections, topics, projects, outcomes)
- [x] Basic HTML structure complete (5 pages)

### Week 2: ✅
- [x] Design document submitted (this PRD)
- [x] Home page implemented (hero, search, roadmaps, features, CTA)
- [x] CSS framework created (7 CSS files with variables, components)
- [x] Navigation functional (glassmorphism pill navbar)

### Week 3: ✅
- [x] Source code submitted (complete project structure)
- [x] Roadmap pages complete (explore.html, roadmap.html)
- [x] JavaScript features working (search, theme, menu, JSON loading)
- [x] All 14 roadmaps with data (exceeds 6 requirement)

### Week 5: ✅
- [x] Test report submitted
- [x] Bug fixes completed (responsive, cross-browser)
- [x] PBL Report document ready
- [x] Code documentation complete (comments, PRD, README)

### Week 7: ✅
- [x] PowerPoint presentation ready
- [x] Live demo prepared (5 pages, 14 roadmaps, all features)
- [x] Viva-voce questions anticipated
- [x] Final submission complete

---

## 13. RESOURCES & REFERENCES

### Learning Resources:
- MDN Web Docs (HTML, CSS, JavaScript)
- W3Schools (Quick reference)
- CSS-Tricks (Layout techniques)
- JSON.org (JSON syntax)

### Design Inspiration:
- roadmap.sh (reference provided)
- Dribbble (UI inspiration)
- Behance (web design examples)

### Tools:
- VSCode with extensions (Live Server, Prettier)
- Chrome DevTools (debugging)
- Figma/Canva (wireframing - optional)

---

## 14. RISK MITIGATION

### Potential Challenges & Solutions:

**Challenge:** JSON data structure becoming too complex  
**Solution:** Start simple, expand gradually, keep structure flat where possible

**Challenge:** Responsive design difficulties  
**Solution:** Use CSS Grid/Flexbox, mobile-first approach, test frequently

**Challenge:** JavaScript debugging  
**Solution:** Use console.log extensively, browser DevTools, keep functions small

**Challenge:** Time management  
**Solution:** Follow phased approach strictly, focus on core features first

**Challenge:** Team coordination  
**Solution:** Use GitHub for version control, assign clear responsibilities

---

## CONCLUSION

This PRD provides a comprehensive blueprint for building the Skill Roadmap Generator website while adhering to the project constraints (HTML, CSS, JavaScript, JSON) and maintaining minimal JavaScript usage. The design is inspired by modern learning platforms while remaining achievable within the semester timeline.

**Key Focus Areas:**
1. Clean, semantic HTML
2. Well-structured CSS with reusable components
3. Minimal but effective JavaScript
4. Comprehensive JSON data structure
5. Professional, responsive design
6. Clear documentation and testing

By following this PRD, your team will deliver a high-quality project that meets all evaluation criteria and demonstrates strong web development fundamentals.

---

**Document Version:** 2.0
**Last Updated:** March 2026
**Authors:** Team Fervikar - PathGen
**Project ID:** PBL-3
**Status:** ✅ COMPLETED

---

## APPENDIX: Quick Reference

### Color Variables (Dark Mode)
```css
--color-primary: #3B82F6;
--color-bg-primary: #0a0a0a;
--color-text-primary: #ffffff;
--glass-bg: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.08);
```

### Roadmap IDs for Reference
**Skills:** react, nodejs, python, kubernetes, docker, aws, postgresql, typescript
**Roles:** frontend-developer, web-developer, devops-engineer, aiml-engineer, data-scientist, data-analyst

### File Size Summary
- HTML: 5 files (~2,000 lines total)
- CSS: 7 files (~2,500 lines total)
- JavaScript: 3 files (~1,000 lines total)
- JSON: 1 file (~5,400 lines, 14 roadmaps)
- Total: ~11,000 lines of code
