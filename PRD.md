# Product Requirements Document (PRD)

## PBL-3: Skill Roadmap Generator Website

**Course:** Web Technology (CSP0203[P]) - B.Tech CS/IT | II Semester  
**Project Type:** Project Based Learning (PBL)  
**Total Marks:** 20  
**Team Size:** Maximum 4 students  

---

## 1. PROJECT OVERVIEW

### 1.1 Description
A career-oriented website that creates structured learning roadmaps for selected technical skills. The platform helps students and learners discover personalized learning paths tailored to their goals and current skill level.

### 1.2 Core Technologies
- **HTML5** - Semantic structure and layout
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (Minimal)** - Basic interactivity and DOM manipulation
- **JSON** - Roadmap data storage and retrieval

### 1.3 Tools
- VSCode (Development)
- Web Browser (Chrome/Firefox for testing)
- Git/GitHub (Version control - optional)

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 Home Page (Landing Page)

#### Features:
1. **Hero Section**
   - Large heading: "Your Personalized Path to Tech Mastery"
   - Subheading explaining the value proposition
   - Search bar with placeholder: "What do you want to learn? (e.g., React, Python, UI Design...)"
   - "Generate" button (primary CTA)

2. **Popular Skills Section**
   - Display 6 pre-defined popular roadmaps as cards
   - Each card contains:
     - Icon/emoji representing the skill
     - Skill title (e.g., "Web Development", "Data Science")
     - Duration estimate (e.g., "12 Weeks")
     - Brief description (2-3 lines)
     - "Start Learning" button

3. **Suggested Popular Paths**
   - Chips/badges showing: "Fullstack Dev", "ML Engineer", "Cloud Architect"
   - Clicking these auto-fills the search

4. **Navigation Bar**
   - Logo/Brand name
   - Menu items: Explore, How it Works, About
   - "Get Started" button

5. **Footer**
   - Links to Documentation, Privacy, etc.
   - Copyright information

### 2.2 Skill Roadmap Page

#### Features:
1. **Breadcrumb Navigation**
   - Home > Roadmaps > [Skill Name]

2. **Roadmap Header**
   - Skill title (e.g., "Web Development Roadmap")
   - Description paragraph
   - Metadata badges:
     - Duration (e.g., "6 MONTHS")
     - Difficulty level (e.g., "INTERMEDIATE")
     - Total modules (e.g., "24 MODULES")

3. **Action Buttons**
   - "Save to Profile" button
   - "Start Learning" button (primary CTA)

4. **Progress Tracker (Optional)**
   - Circular progress indicator
   - "YOUR PROGRESS: 8/24 Lessons Completed"
   - "Resume Learning" button

5. **Roadmap Phases**
   Each phase contains:
   
   **Phase Structure:**
   - Phase number and title (e.g., "Phase 1: Beginner Fundamentals")
   - Phase description
   - Expandable/collapsible sections
   
   **Module Cards within Each Phase:**
   - Module icon
   - Module title (e.g., "HTML & CSS Basics")
   - Module description
   - Expandable dropdown showing:
     - Sub-topics with difficulty badges (EASY/MEDIUM/HARD)
     - Resource links (e.g., "MDN Structure Guide")
     - Estimated completion time

6. **Locked Content Indicator**
   - Later phases show lock icon
   - Indicates prerequisite completion needed

### 2.3 How It Works Page (Optional Enhancement)
- Step-by-step explanation of using the platform
- Visual guide with screenshots/illustrations

---

## 3. DATA STRUCTURE (JSON)

### 3.1 Roadmap Data Schema

```json
{
  "roadmaps": [
    {
      "id": "web-dev-001",
      "title": "Web Development",
      "slug": "web-development",
      "description": "Master the modern frontend and backend ecosystem from HTML/CSS to advanced React and Node.js patterns.",
      "duration": "12 Weeks",
      "durationMonths": 6,
      "difficulty": "INTERMEDIATE",
      "totalModules": 24,
      "icon": "💻",
      "phases": [
        {
          "phaseNumber": 1,
          "title": "Beginner Fundamentals",
          "description": "Establish the core foundations of the web.",
          "modules": [
            {
              "id": "module-001",
              "title": "HTML & CSS Basics",
              "icon": "html-icon.png",
              "description": "Semantic structures, CSS Box Model, and layout techniques.",
              "topics": [
                {
                  "name": "MDN Structure Guide",
                  "difficulty": "EASY",
                  "link": "#"
                },
                {
                  "name": "Flexbox Crash Course",
                  "difficulty": "EASY",
                  "link": "#"
                }
              ]
            },
            {
              "id": "module-002",
              "title": "Responsive Design",
              "icon": "responsive-icon.png",
              "description": "Media queries, mobile-first approach, and modern CSS Grid.",
              "topics": [
                {
                  "name": "Mobile First Design",
                  "difficulty": "MEDIUM",
                  "link": "#"
                },
                {
                  "name": "CSS Grid Mastery",
                  "difficulty": "MEDIUM",
                  "link": "#"
                }
              ]
            }
          ]
        },
        {
          "phaseNumber": 2,
          "title": "Modern JavaScript",
          "description": "Master logic, data fetching, and interactivity.",
          "locked": false,
          "modules": [
            {
              "id": "module-003",
              "title": "JS Engine & ES6+",
              "icon": "js-icon.png",
              "description": "Understanding scopes, closures, and modern syntax features.",
              "topics": [
                {
                  "name": "Async/Await Deep Dive",
                  "difficulty": "MEDIUM",
                  "link": "#"
                },
                {
                  "name": "ES6 Module Patterns",
                  "difficulty": "MEDIUM",
                  "link": "#"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "data-science-001",
      "title": "Data Science",
      "slug": "data-science",
      "description": "Learn to analyze complex datasets, build predictive models, and visualize insights using Python and SQL.",
      "duration": "24 Weeks",
      "durationMonths": 6,
      "difficulty": "INTERMEDIATE",
      "totalModules": 18,
      "icon": "📊",
      "phases": []
    }
  ]
}
```

---

## 4. DESIGN REQUIREMENTS

### 4.1 Color Scheme
- **Primary Color:** Brown/Orange (#B8622F - from reference)
- **Secondary Color:** Beige/Cream (#F5F3EF)
- **Accent Colors:** 
  - Easy: Green (#4CAF50)
  - Medium: Orange (#FF9800)
  - Hard: Red (#F44336)
- **Text:** Dark gray (#2C3E50) on light backgrounds
- **Backgrounds:** White (#FFFFFF), Light gray (#F8F9FA)

### 4.2 Typography
- **Headings:** Bold, modern sans-serif (e.g., 'Inter', 'Poppins')
- **Body Text:** Clean, readable sans-serif
- **Font Sizes:**
  - Hero heading: 48-56px
  - Section headings: 32-36px
  - Module titles: 18-20px
  - Body text: 14-16px

### 4.3 Layout
- **Responsive Design:** Mobile-first approach
- **Max Content Width:** 1200px centered
- **Spacing:** Consistent padding and margins (8px base unit)
- **Grid System:** Use CSS Grid/Flexbox for card layouts

### 4.4 Components

#### Card Component (for skill paths)
```css
.skill-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 24px;
  transition: transform 0.2s;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
```

#### Button Styles
```css
.btn-primary {
  background: #B8622F;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.btn-secondary {
  background: transparent;
  border: 2px solid #B8622F;
  color: #B8622F;
}
```

#### Badge/Chip Component
```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge-easy { background: #E8F5E9; color: #2E7D32; }
.badge-medium { background: #FFF3E0; color: #E65100; }
.badge-hard { background: #FFEBEE; color: #C62828; }
```

---

## 5. TECHNICAL IMPLEMENTATION

### 5.1 File Structure
```
skill-roadmap-generator/
│
├── index.html                 # Home page
├── roadmap.html              # Roadmap detail page
├── how-it-works.html         # How it works page (optional)
│
├── css/
│   ├── style.css             # Main styles
│   ├── components.css        # Reusable components
│   └── responsive.css        # Media queries
│
├── js/
│   ├── main.js               # Core functionality
│   └── roadmap.js            # Roadmap page logic
│
├── data/
│   └── roadmaps.json         # All roadmap data
│
├── assets/
│   ├── images/               # Icons, logos
│   └── icons/                # Skill icons
│
└── README.md                 # Project documentation
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

### 6.1 Breakpoints
```css
/* Mobile First */
/* Base styles: 320px - 767px */

/* Tablet */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Large screen styles */
}
```

### 6.2 Mobile Considerations
- Hamburger menu for navigation
- Single column card layout
- Touch-friendly button sizes (min 44px)
- Simplified search interface
- Reduced text sizes

---

## 7. CONTENT REQUIREMENTS

### 7.1 Minimum Roadmaps to Include
1. Web Development
2. Data Science
3. Artificial Intelligence/Machine Learning
4. Cybersecurity
5. Mobile Development
6. Cloud Architecture

### 7.2 Each Roadmap Must Include
- 3-4 phases minimum
- 2-3 modules per phase
- 2-4 topics per module
- Realistic duration estimates
- Difficulty progression (Beginner → Intermediate → Advanced)

---

## 8. EVALUATION CRITERIA ALIGNMENT

### 8.1 Synopsis Submission (2 marks)
**Deliverable:** Project overview document containing:
- Project description and objectives
- Technology stack justification
- Feature list with priorities
- Team member responsibilities
- Timeline with milestones

### 8.2 Design and Workflow (4 marks)
**Deliverable:** Design document including:
- Wireframes for home and roadmap pages
- User flow diagrams
- JSON data structure
- Color scheme and typography choices
- Component breakdown

### 8.3 Implementation (6 marks)
**Assessment Based On:**
- Clean, semantic HTML structure
- Well-organized CSS with reusable components
- Minimal, efficient JavaScript
- Proper JSON data structure
- Responsive design implementation
- Code comments and organization

### 8.4 Testing and Evaluation (3 marks)
**Test Report Should Include:**
- Browser compatibility testing (Chrome, Firefox, Safari)
- Responsive design testing (mobile, tablet, desktop)
- Functionality testing (search, navigation, data loading)
- Performance testing (page load times)
- Usability testing with sample users

### 8.5 Presentation and Viva (5 marks)
**Preparation:**
- Live demo of all features
- Explanation of technical choices
- Discussion of challenges and solutions
- Code walkthrough
- Future enhancement ideas

---

## 9. IMPLEMENTATION PHASES

### Phase 1: Setup & Structure (Week 1)
- Create project folder structure
- Set up HTML skeleton for all pages
- Create basic CSS framework
- Design JSON data structure
- Create initial roadmaps.json with 2 roadmaps

### Phase 2: Home Page Development (Week 1-2)
- Build hero section with search
- Create popular skills cards
- Implement navigation bar
- Add footer
- Make responsive

### Phase 3: Roadmap Page Development (Week 2-3)
- Build roadmap detail layout
- Create phase and module components
- Implement expandable sections
- Add progress tracker UI
- Connect to JSON data

### Phase 4: JavaScript Integration (Week 3)
- Implement search functionality
- Add data loading from JSON
- Create dynamic roadmap generation
- Add URL parameter handling
- Implement toggle/expand features

### Phase 5: Testing & Polish (Week 4-5)
- Cross-browser testing
- Responsive design refinement
- Performance optimization
- Bug fixes
- Documentation

---

## 10. BONUS FEATURES (Optional)

### If Time Permits:
1. **Local Storage for Progress Tracking**
   - Save user's completed modules
   - Track learning progress
   - Resume from last position

2. **Theme Toggle**
   - Light/Dark mode switch
   - CSS custom properties for theming

3. **Print-Friendly View**
   - CSS print styles
   - Downloadable roadmap as PDF

4. **Bookmark/Save Feature**
   - Save favorite roadmaps to profile
   - Using localStorage

5. **Estimated Time Calculator**
   - Input hours per week
   - Calculate completion date

---

## 11. SUCCESS METRICS

### Project is Successful When:
- ✅ All pages are responsive (mobile, tablet, desktop)
- ✅ At least 6 complete roadmaps with detailed phases
- ✅ Search functionality works correctly
- ✅ Data loads dynamically from JSON
- ✅ No console errors
- ✅ Clean, commented code
- ✅ Professional visual design
- ✅ Fast page load times (<2 seconds)

---

## 12. DELIVERABLES CHECKLIST

### Week 1:
- [ ] PBL Synopsis submitted
- [ ] Design wireframes created
- [ ] JSON structure finalized
- [ ] Basic HTML structure complete

### Week 2:
- [ ] Design document submitted
- [ ] Home page implemented
- [ ] CSS framework created
- [ ] Navigation functional

### Week 3:
- [ ] Source code submitted
- [ ] Roadmap page complete
- [ ] JavaScript features working
- [ ] All 6 roadmaps with data

### Week 5:
- [ ] Test report submitted
- [ ] Bug fixes completed
- [ ] PBL Report document ready
- [ ] Code documentation complete

### Week 7:
- [ ] PowerPoint presentation ready
- [ ] Live demo prepared
- [ ] Viva-voce questions anticipated
- [ ] Final submission complete

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

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Authors:** [Team Fervikar]  
**Project ID:** PBL-3