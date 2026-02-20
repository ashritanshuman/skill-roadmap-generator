# Skill Roadmap Generator Website

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![JSON](https://img.shields.io/badge/JSON-000000?logo=json&logoColor=white)

> A comprehensive web-based platform that generates personalized learning roadmaps for technical skills, helping students and professionals navigate their educational journey efficiently.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmaps Available](#roadmaps-available)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [Team](#team)
- [Acknowledgments](#acknowledgments)
- [License](#license)

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

- **🗺️ Multiple Skill Roadmaps**: Comprehensive learning paths for 6-8 technical domains
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

### Screenshots

#### Landing Page
![Landing Page](assets/screenshots/landing-page.png)
*Browse through various skill categories*

#### Roadmap View
![Roadmap View](assets/screenshots/roadmap-view.png)
*Visual timeline showing learning progression*

#### Topic Details
![Topic Details](assets/screenshots/topic-details.png)
*Expandable cards with resources and practice projects*

### Live Demo

🔗 [View Live Demo](#) *(Link will be added after deployment)*

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

## 📁 Project Structure

```
skill-roadmap-generator/
│
├── index.html                 # Landing page with skill categories
├── roadmap.html              # Roadmap display page
├── about.html                # About/Help page
│
├── css/
│   ├── styles.css            # Global styles and variables
│   ├── landing.css           # Landing page specific styles
│   ├── roadmap.css           # Roadmap page specific styles
│   └── responsive.css        # Media queries for responsiveness
│
├── js/
│   ├── main.js               # Core application logic
│   ├── roadmapLoader.js      # JSON loading and parsing
│   ├── interactions.js       # UI interactions and animations
│   └── search.js             # Search and filter functionality
│
├── data/
│   └── roadmaps.json         # All roadmap data
│
├── assets/
│   ├── images/               # Icons, illustrations, logos
│   │   ├── icons/            # Skill category icons
│   │   └── screenshots/      # Demo screenshots
│   └── fonts/                # Custom fonts (if any)
│
├── docs/
│   ├── synopsis.pdf          # Project synopsis
│   ├── design-document.pdf   # Design and wireframes
│   └── test-report.pdf       # Testing documentation
│
├── README.md                 # Project documentation (this file)
├── LICENSE                   # License information
└── .gitignore               # Git ignore rules
```

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

## 💡 Usage

### For Users

1. **Browse Skills**: Visit the landing page to see all available skill categories
2. **Search**: Use the search bar to find specific skills
3. **Select a Roadmap**: Click on any skill card to view its learning path
4. **Explore Phases**: See the progression from Beginner → Intermediate → Advanced
5. **Expand Topics**: Click on any topic to see detailed information
6. **Access Resources**: Click on resource links to start learning

### For Developers

1. **Adding New Roadmaps**: Edit `data/roadmaps.json` and add your roadmap following the existing structure
2. **Customizing Styles**: Modify CSS files in the `css/` directory
3. **Adding Features**: Extend JavaScript files in the `js/` directory

---

## 🗺️ Roadmaps Available

Currently includes learning paths for:

1. **Web Development** 🌐
   - Frontend (HTML, CSS, JavaScript, React)
   - Backend (Node.js, Express, Databases)
   - Full-Stack deployment

2. **Data Science** 📊
   - Python programming
   - Statistics & Mathematics
   - Machine Learning fundamentals

3. **AI/Machine Learning** 🤖
   - Python and libraries (NumPy, Pandas)
   - ML algorithms
   - Deep Learning basics

4. **Cloud Computing** ☁️
   - Cloud platforms (AWS/Azure/GCP)
   - Infrastructure basics
   - Deployment strategies

5. **Cybersecurity** 🔒
   - Network security
   - Ethical hacking
   - Security best practices

6. **Mobile Development** 📱
   - Android/iOS development
   - React Native
   - App deployment

7. **DevOps** 🔧
   - CI/CD pipelines
   - Docker & Kubernetes
   - Infrastructure as Code

8. **Blockchain** ⛓️
   - Blockchain fundamentals
   - Smart contracts
   - DApp development

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

1. Open `data/roadmaps.json`
2. Add your roadmap object to the `roadmaps` array
3. Follow the structure above
4. Add an icon to `assets/images/icons/`
5. Test on the landing page

### Code Style Guidelines

- Use semantic HTML5 elements
- Follow BEM naming convention for CSS classes
- Use ES6+ JavaScript features
- Comment complex logic
- Keep functions small and focused
- Maintain consistent indentation (2 spaces)

---

## 🧪 Testing

### Manual Testing Checklist

#### Functionality Tests
- [ ] All skill cards display correctly
- [ ] Clicking "Explore Roadmap" navigates properly
- [ ] JSON data loads without errors
- [ ] All phases render dynamically
- [ ] Topic cards expand/collapse correctly
- [ ] External links open in new tabs
- [ ] Search filters skills in real-time
- [ ] Back navigation works

#### Responsive Design Tests
- [ ] Mobile (320px - 480px): Single column layout
- [ ] Tablet (481px - 768px): 2-column grid
- [ ] Desktop (769px+): 3-column grid
- [ ] All text is readable at different sizes
- [ ] Touch targets are at least 44x44px

#### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Performance Tests
- [ ] Page loads in under 3 seconds
- [ ] No console errors
- [ ] Images are optimized

### Running Tests

```bash
# No automated tests yet
# Manual testing checklist provided above
# Future: Add Jest for unit testing
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Roadmaps

1. Fork the repository
2. Create a new branch: `git checkout -b feature/new-roadmap`
3. Add your roadmap to `data/roadmaps.json`
4. Test thoroughly
5. Submit a pull request

### Improving Existing Roadmaps

1. Identify outdated or missing information
2. Update the JSON file
3. Add better resources
4. Submit a pull request with description of changes

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
| Week 2 | Design & Planning | 🚧 In Progress |
| Week 3-4 | Implementation | ⏳ Upcoming |
| Week 5 | Testing & Evaluation | ⏳ Upcoming |
| Week 7 | Presentation & Viva | ⏳ Upcoming |

---

## 🚀 Future Enhancements

### Planned Features

- [ ] **User Authentication**: Save progress and bookmarks
- [ ] **Progress Tracker**: Visual representation of completed topics
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **AI Recommendations**: Personalized roadmap suggestions
- [ ] **Community Features**: Discussion forums and mentor connections
- [ ] **Export to PDF**: Download roadmaps for offline viewing
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Gamification**: Badges and achievements for learning milestones
- [ ] **API Integration**: Connect with course platforms for enrollment
- [ ] **Multi-language Support**: Translations for global users

### Version History

- **v1.0.0** (Current) - Initial release with core features
- **v0.1.0** - Beta version for testing

---

## 📊 Project Statistics

- **Total Roadmaps**: 8
- **Total Topics**: 60+
- **Learning Resources**: 200+
- **Estimated Development Hours**: 100+
- **Lines of Code**: 2000+
- **Supported Browsers**: 4 (Chrome, Firefox, Safari, Edge)
- **Supported Devices**: Desktop, Tablet, Mobile

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

**Made with ❤️ by ITM University CSA Students**

[Back to Top](#skill-roadmap-generator-website)

</div>

---

*Last Updated: February 2026*
