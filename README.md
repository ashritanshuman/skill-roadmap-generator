# PathGen | Skill Roadmap Generator Website

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![JSON](https://img.shields.io/badge/JSON-000000?logo=json&logoColor=white)

> A comprehensive web-based platform that generates personalized learning roadmaps for technical skills, helping students and professionals navigate their educational journey efficiently.

---

## 🎯 Overview

The **Skill Roadmap Generator Website** is a Project-Based Learning (PBL) initiative developed as part of the Web Technology course (CSP0203[P]) for B.Tech Computer Science & IT students at ITM University, Gwalior.

### Problem Statement

Students and self-learners face significant challenges in navigating the vast landscape of technical skills and learning resources:
- **Information Overload**: Too many resources without clear direction
- **Lack of Structure**: No systematic approach to learning complex skills
- **Unclear Prerequisites**: Difficulty understanding what to learn first
- **Time Management**: Inability to estimate realistic learning timelines
- **Resource Quality**: Challenge in identifying high-quality materials

### Our Solution

This web application provides:
- 📊 **Visual Learning Paths**: Interactive timelines showing progression from Beginner → Intermediate → Advanced
- 🎯 **Curated Resources**: High-quality learning materials from trusted platforms
- ⏱️ **Time Estimates**: Realistic duration for each topic and phase
- 🔍 **Smart Search**: Quick discovery of relevant skill roadmaps
- 📱 **Responsive Design**: Seamless experience across all devices

---

## ✨ Features

### Core Features

- **🗺️ Multiple Skill Roadmaps**: Comprehensive learning paths for 5 role-based technical career paths including Frontend Developer, Full Stack Developer, AI/ML Engineer, Data Scientist, and DevOps Engineer
- **🎨 Interactive UI**: Clean, modern interface with smooth animations
- **📂 Dynamic Content**: JSON-based data structure for easy updates
- **🔎 Search & Filter**: Find skills quickly by name, category, or difficulty
- **📖 Expandable Topics**: Detailed information with one click
- **🔗 External Resources**: Direct links to documentation, courses, and tutorials
- **📱 Fully Responsive**: Mobile-first design approach
- **⚡ Fast & Lightweight**: No heavy frameworks, pure vanilla JavaScript

### User Benefits

- Clear visualization of learning journey
- Understanding of prerequisite relationships
- Access to curated, quality resources
- Realistic time planning for skill development
- Self-paced learning guidance

---

## 🎬 Demo


### Live Demo

🔗 [View Live Demo](https://pathgen-srg.vercel.app/)

---

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox/Grid layouts
- **JavaScript (ES6+)**: Dynamic interactions and DOM manipulation
- **JSON**: Structured data storage

### Development Tools
- **VSCode**: Primary code editor
- **Live Server**: Local development server
- **Git**: Version control
- **Chrome DevTools**: Debugging and testing

### Design Tools
- **Figma**: UI/UX mockups
- **Draw.io**: Workflow diagrams
- **Canva**: Graphics and icons

---

## 🚀 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VSCode recommended)
- Live Server extension (for local development)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/skill-roadmap-generator.git
   cd skill-roadmap-generator
   ```

2. **Open in Code Editor**
   ```bash
   code .
   ```

3. **Start Local Server**
   - Using VSCode Live Server: Right-click on `index.html` → "Open with Live Server"
   - Or use Python's built-in server:
     ```bash
     python -m http.server 8000
     ```
   - Navigate to `http://localhost:8000`

4. **No Build Process Required!**
   - This is a pure HTML/CSS/JavaScript project
   - No npm packages or build tools needed

---

## 📁 Project Structure

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

---

## 💡 Usage

### For Users

1. **Browse Skills**: Visit the landing page to see all available skill categories
2. **Search**: Use the search bar to find specific skills
3. **Select a Roadmap**: Click on any skill card to view its learning path
4. **Explore Phases**: See the progression from Beginner → Intermediate → Advanced
5. **Expand Topics**: Click on any topic to see detailed information
6. **Access Resources**: Click on resource links to start learning

### For Developers

1. **Adding New Roadmaps**: Edit `public/data/roadmaps-data.json` and add your roadmap following the existing structure
2. **Customizing Styles**: Modify CSS files in the `css/` directory
3. **Adding Features**: Extend JavaScript files in the `js/` directory

### Available Roadmaps

#### Role-Based Roadmaps

| Roadmap | Phases | Duration | Technologies | Starting Salary |
|---------|--------|----------|--------------|-----------------|
| **Frontend Developer** | 3 | 6-9 Months | 25+ | $70K+ |
| **Full Stack Developer** | 6 | 12-18 Months | 40+ | $80K+ |
| **AI/ML Engineer** | 7 | 18-24 Months | 50+ | $110K+ |
| **Data Scientist** | 7 | 14-20 Months | 45+ | $95K+ |
| **DevOps Engineer** | 7 | 14-20 Months | 50+ | $100K+ |

#### DevOps Engineer Roadmap (New)

The DevOps Engineer roadmap includes 7 comprehensive phases:

1. **Foundation** - Linux, Networking & Scripting Basics (6-8 weeks)
2. **Version Control & Collaboration** - Git, GitHub & Team Workflows (2-3 weeks)
3. **Containerization** - Docker & Container Fundamentals (6-8 weeks)
4. **CI/CD Pipelines** - Continuous Integration & Delivery (6-8 weeks)
5. **Infrastructure as Code** - Terraform, Ansible & Configuration Management (8-10 weeks)
6. **Cloud Platforms & Kubernetes** - AWS/GCP/Azure & Container Orchestration (10-12 weeks)
7. **Observability, Security & SRE** - Monitoring, Reliability & DevSecOps (Ongoing)

Each phase includes detailed sections with topics, hands-on projects, and career outcome milestones.

---

## 👨‍💻 Development

### JSON Data Structure

Each roadmap follows this structure:

```json
{
  "id": "web-development",
  "title": "Web Development",
  "description": "Complete path to becoming a full-stack web developer",
  "category": "Development",
  "difficulty": "Beginner to Advanced",
  "totalDuration": "6-9 months",
  "icon": "assets/images/icons/web-dev.svg",
  "phases": [
    {
      "phaseId": 1,
      "level": "Beginner",
      "title": "Frontend Fundamentals",
      "duration": "2-3 months",
      "topics": [
        {
          "topicId": 1,
          "name": "HTML5 Fundamentals",
          "duration": "2 weeks",
          "difficulty": "Easy",
          "prerequisites": [],
          "skills": ["Semantic HTML", "Forms", "Accessibility"],
          "resources": [
            {
              "title": "MDN HTML Guide",
              "url": "https://developer.mozilla.org/",
              "type": "documentation"
            }
          ],
          "practiceProjects": ["Portfolio page", "Blog layout"]
        }
      ]
    }
  ]
}
```

### Adding a New Roadmap

1. Open `public/data/roadmaps-data.json`
2. Add your roadmap object to the `roadmaps` array
3. Follow the structure documented below
4. Add a Material Icon name to represent your roadmap
5. Update `index.html` to include a new roadmap card in the appropriate section
6. Test on the landing page

### JSON Data Schema

```json
{
  "roadmaps": [
    {
      "id": "devops-engineer",
      "title": "DevOps Engineer",
      "subtitle": "CI/CD & Infrastructure",
      "icon": "rocket_launch",
      "stats": {
        "phases": 7,
        "duration": "14-20 Months to Job",
        "technologies": "50+ Technologies",
        "salary": "$100K+ Starting Salary"
      },
      "phases": [
        {
          "id": 1,
          "title": "Foundation",
          "subtitle": "Linux, Networking & Scripting Basics",
          "duration": "6-8 weeks | 2-3 hrs/day",
          "description": "Phase description...",
          "sections": [
            {
              "title": "Linux Fundamentals",
              "subtitle": "The Operating System of the Cloud",
              "topics": [
                "Linux distributions: Ubuntu, CentOS, RHEL...",
                "Filesystem hierarchy: /, /etc, /var, /home..."
              ]
            }
          ],
          "projects": [
            "Write a bash script that automates server setup..."
          ],
          "outcomes": [
            "Navigate and manage any Linux server without a GUI",
            "Write bash scripts to automate repetitive tasks..."
          ]
        }
      ],
      "timeline": [
        {
          "period": "Month 1-2",
          "focus": "Linux, Networking & Bash Scripting",
          "milestone": "Manage a Linux server entirely from CLI..."
        }
      ]
    }
  ]
}
```

**Key Schema Elements:**
- `id`: Unique identifier for the roadmap (kebab-case)
- `title`: Display title of the career path
- `subtitle`: Brief description of the role focus
- `icon`: Material Icons name (e.g., "rocket_launch", "computer", "psychology")
- `stats`: Key metrics including phases count, duration, technologies, and salary
- `phases`: Array of learning phases, each containing:
  - `id`: Phase number
  - `title` & `subtitle`: Phase identification
  - `duration`: Time commitment estimate
  - `description`: Detailed explanation of phase importance
  - `sections`: Array of learning modules with topics
  - `projects`: Hands-on project ideas
  - `outcomes`: Skills and achievements gained
- `timeline`: Month-by-month learning progression with milestones

### Code Style Guidelines

- Use semantic HTML5 elements
- Follow BEM naming convention for CSS classes
- Use ES6+ JavaScript features
- Comment complex logic
- Keep functions small and focused
- Maintain consistent indentation (2 spaces)
---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Roadmaps

1. Fork the repository
2. Create a new branch: `git checkout -b feature/new-roadmap`
3. Add your roadmap to `public/data/roadmaps-data.json`
4. Update `index.html` to add a card linking to your new roadmap
5. Test thoroughly by clicking the roadmap card and verifying all phases load correctly
6. Submit a pull request with a description of the career path added

### Improving Existing Roadmaps

1. Identify outdated or missing information in existing roadmaps
2. Update `public/data/roadmaps-data.json` with corrections or additions
3. Add better resources, projects, or outcomes as needed
4. Submit a pull request with description of changes made

### Bug Reports

Found a bug? Please open an issue with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and OS information

### Feature Requests

Have an idea? Open an issue with:
- Feature description
- Use case/benefit
- Proposed implementation (optional)

---

## 👥 Team

This project is developed by:

**Team Fervikar**

**Institution**: ITM University, Gwalior  
**Department**: Computer Science & Applications  
**Course**: Web Technology (CSP0203[P])  
**Academic Session**: 2025-26

---

## 🙏 Acknowledgments

### Resources & Inspiration

- [Roadmap.sh](https://roadmap.sh/) - For roadmap visualization inspiration
- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web development documentation
- [freeCodeCamp](https://www.freecodecamp.org/) - Learning resources
- [CSS-Tricks](https://css-tricks.com/) - CSS techniques and tutorials
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial

### Libraries & Tools

- [Feather Icons](https://feathericons.com/) - Beautiful open-source icons
- [Google Fonts](https://fonts.google.com/) - Typography
- [Unsplash](https://unsplash.com/) - Free images

### Special Thanks

- Our faculty guide for continuous support and guidance
- ITM University for providing the opportunity
- Peers for valuable feedback during development
- The open-source community for excellent resources

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

---

## 📞 Contact & Support

### Issues & Questions

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/skill-roadmap-generator/issues)
- **Email**: [your-email@example.com]
- **Project Website**: [Link to deployed site]

### Social Media

- **LinkedIn**: [Your LinkedIn]
- **Twitter**: [@yourhandle]
- **Portfolio**: [yourportfolio.com]

---

## 🗓️ Project Timeline

| Week | Phase | Status |
|------|-------|--------|
| Week 1 | Synopsis Submission | ✅ Complete |
| Week 2 | Design & Planning | ✅ Complete |
| Week 3-4 | Implementation | ✅ Complete |
| Week 5 | Testing & Evaluation | ✅ Complete |
| Week 6 | DevOps Roadmap Addition | ✅ Complete |
| Week 7 | Presentation & Viva | 🚧 In Progress |

---

## 🚀 Future Enhancements

### Planned Features

- [ ] **User Authentication**: Save progress and bookmarks
- [ ] **Progress Tracker**: Visual representation of completed topics
- [x] **Dark Mode**: Toggle between light and dark themes ✅ Implemented
- [ ] **AI Recommendations**: Personalized roadmap suggestions
- [ ] **Community Features**: Discussion forums and mentor connections
- [ ] **Export to PDF**: Download roadmaps for offline viewing
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Gamification**: Badges and achievements for learning milestones
- [ ] **API Integration**: Connect with course platforms for enrollment
- [ ] **Multi-language Support**: Translations for global users

### Version History

- **v1.2.0** (Current) - Added Dark/Light Theme Toggle & UI Improvements
  - Theme toggle button in navigation bar
  - Dark theme (default): Modern dark tech aesthetic
  - Light theme: Warm cream (#f4f3ee) background with brown/orange accents
  - Theme preference saved to localStorage
  - Bold typography for all roadmap content
  - Improved mobile responsive hero text
- **v1.1.0** - Added comprehensive DevOps Engineer roadmap with 7 phases
  - Foundation (Linux, Networking & Scripting)
  - Version Control & Collaboration
  - Containerization (Docker)
  - CI/CD Pipelines (GitHub Actions, GitLab CI, Jenkins)
  - Infrastructure as Code (Terraform, Ansible)
  - Cloud Platforms & Kubernetes (AWS, EKS)
  - Observability, Security & SRE
- **v1.0.0** - Initial release with 4 role-based roadmaps
- **v0.1.0** - Beta version for testing

---

## 🎓 Learning Outcomes

Through this project, our team has gained:

- ✅ Proficiency in HTML5, CSS3, and JavaScript
- ✅ Understanding of DOM manipulation and event handling
- ✅ Experience with JSON data structures
- ✅ Knowledge of responsive web design principles
- ✅ Practical application of UI/UX design concepts
- ✅ Collaborative development using Git
- ✅ Problem-solving and debugging skills
- ✅ Project management and documentation

---

## 📚 Additional Resources

### Documentation
- [Project Synopsis](docs/synopsis.pdf)
- [Design Document](docs/design-document.pdf)
- [Test Report](docs/test-report.pdf)
- [Presentation Slides](docs/presentation.pptx)

### External Links
- [Course Syllabus](link-to-syllabus)
- [Web Technology Resources](link-to-resources)
- [Department Website](https://itm.edu)

---

<div align="center">

### ⭐ Star this repository if you find it helpful!


[Back to Top](#skill-roadmap-generator-website)

</div>

---

*Last Updated: March 7, 2026*
