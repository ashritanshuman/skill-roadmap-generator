# PathGen Website - Complete Workflow & Flowchart Documentation

## Table of Contents
1. [System Architecture Overview](#1-system-architecture-overview)
2. [User Journey Flowcharts](#2-user-journey-flowcharts)
3. [Page-Specific Workflows](#3-page-specific-workflows)
4. [JavaScript Module Interactions](#4-javascript-module-interactions)
5. [Data Flow Diagrams](#5-data-flow-diagrams)
6. [Authentication Flow](#6-authentication-flow)
7. [Theme System Flow](#7-theme-system-flow)
8. [Search Functionality Flow](#8-search-functionality-flow)
9. [Component Hierarchy](#9-component-hierarchy)
10. [File Dependency Graph](#10-file-dependency-graph)

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PATHGEN WEB APPLICATION                           │
│                         (Vanilla JS, HTML, CSS)                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐        ┌───────────────┐        ┌───────────────┐
│   PRESENTATION │        │    LOGIC      │        │     DATA      │
│     LAYER      │        │    LAYER      │        │    LAYER      │
└───────────────┘        └───────────────┘        └───────────────┘
        │                           │                           │
   ┌────┴────┐                 ┌────┴────┐                 ┌────┴────┐
   │         │                 │         │                 │         │
   ▼         ▼                 ▼         ▼                 ▼         ▼
┌────┐   ┌────┐           ┌────┐   ┌────┐           ┌────┐   ┌────┐
│HTML│   │CSS │           │JS  │   │JSON│           │local│  │JSON│
│Files│  │Files│          │Modules│ Files│           │Storage│ Files│
└────┘   └────┘           └────┘   └────┘           └────┘   └────┘
```

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Custom Properties, Flexbox, Grid, Glassmorphism
- **Icons**: Material Symbols (Google Fonts)
- **Fonts**: Plus Jakarta Sans, Space Grotesk
- **Storage**: localStorage (client-side)
- **Data Format**: JSON

---

## 2. User Journey Flowcharts

### 2.1 Primary User Journey - Finding a Roadmap

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Visit index.html   │
│  (Landing Page)     │
└──────┬──────────────┘
       │
       ├─────────────────┬─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
┌────────────┐   ┌──────────────┐   ┌──────────────┐
│  Search    │   │  Browse Cards │   │ Click "Explore│
│  in Hero   │   │  on Homepage  │   │  All" Link   │
└─────┬──────┘   └──────┬───────┘   └──────┬───────┘
      │                 │                  │
      │                 │                  ▼
      │                 │         ┌──────────────────┐
      │                 │         │  explore.html    │
      │                 │         │  (All Roadmaps)  │
      │                 │         └────────┬─────────┘
      │                 │                  │
      └────────┬────────┴──────────────────┘
               │
               ▼
      ┌─────────────────┐
      │ Select Roadmap  │
      │ (Click Card)    │
      └────────┬────────┘
               │
               ▼
      ┌─────────────────┐
      │  roadmap.html   │
      │  (Detail View)  │
      └────────┬────────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
┌────────────┐  ┌────────────┐
│View Phases │  │View Timeline│
│(Expandable) │  │(Career Path)│
└─────┬──────┘  └─────┬──────┘
      │               │
      └───────┬───────┘
              │
              ▼
      ┌───────────────┐
      │  Access       │
      │  Resources    │
      └───────┬───────┘
              │
              ▼
      ┌───────────────┐
      │     END       │
      │ (Learn & Grow)│
      └───────────────┘
```

### 2.2 User Authentication Journey

```
┌─────────────┐
│   START     │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Click "Get Started" │
│  or "Sign In"       │
└──────┬──────────────┘
       │
       ├───────────────┐
       │               │
       ▼               ▼
┌──────────────┐ ┌──────────────┐
│ signup.html  │ │ login.html   │
│ (New User)   │ │ (Existing)   │
└──────┬───────┘ └──────┬───────┘
       │               │
       ▼               ▼
┌─────────────────┐ ┌─────────────────┐
│ Fill Form       │ │ Fill Form       │
│ - Name          │ │ - Email         │
│ - Email         │ │ - Password      │
│ - Password      │ │                 │
│ - Confirm       │ │                 │
│ - Role Select   │ │                 │
└──────┬──────────┘ └──────┬──────────┘
       │                   │
       ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Real-time       │ │ Real-time       │
│ Validation      │ │ Validation      │
└──────┬──────────┘ └──────┬──────────┘
       │                   │
       ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Submit Form     │ │ Submit Form     │
└──────┬──────────┘ └──────┬──────────┘
       │                   │
       ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ auth.js         │ │ auth.js         │
│ - Hash Password │ │ - Verify        │
│ - Store User    │ │ - Check Session │
└──────┬──────────┘ └──────┬──────────┘
       │                   │
       ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ localStorage    │ │ localStorage    │
│ - Users Array   │ │ - Session Token │
└──────┬──────────┘ └──────┬──────────┘
       │                   │
       └─────────┬─────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Redirect to     │
        │ index.html      │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ UI Updates      │
        │ - Show Greeting │
        │ - Hide "Get      │
        │   Started"      │
        │ - Show Logout   │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Authenticated   │
        │ User Actions    │
        └─────────────────┘
```

---

## 3. Page-Specific Workflows

### 3.1 index.html (Home Page) Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    index.html LOAD SEQUENCE                  │
└─────────────────────────────────────────────────────────────┘

┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  HTML   │───▶│  CSS    │───▶│ theme.js│───▶│ auth.js │
│ Parsed  │    │ Loaded  │    │ Execute │    │ Execute │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │                                              │
     │         ┌─────────┐    ┌─────────┐          │
     └────────▶│ main.js │───▶│  DOM    │◀─────────┘
               │ Execute │    │ Ready   │
               └─────────┘    └────┬────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
            ┌───────────┐   ┌───────────┐   ┌───────────┐
            │  Navbar   │   │   Hero    │   │  Search   │
            │  Render   │   │  Section  │   │  Init     │
            └───────────┘   └───────────┘   └───────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
            ┌───────────┐   ┌───────────┐   ┌───────────┐
            │ Skill     │   │  Role     │   │ Features  │
            │ Roadmaps  │   │ Roadmaps  │   │ Section   │
            └───────────┘   └───────────┘   └───────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                                    ▼
                            ┌───────────┐
                            │  Footer   │
                            │  Render   │
                            └───────────┘

INTERACTIVE ELEMENTS:
┌──────────────────────────────────────────────────────────────┐
│  Search Box                                                  │
│  ├── Input Event ──▶ Filter searchData Array ──▶ Show Results│
│  ├── Enter Key ──▶ Navigate to First Result                  │
│  ├── Arrow Keys ──▶ Navigate Results                         │
│  └── Click Result ──▶ Navigate to roadmap.html?id={id}       │
├──────────────────────────────────────────────────────────────┤
│  Roadmap Cards                                               │
│  ├── Click ──▶ Read data-roadmap-id                          │
│  ├── If "coming-soon" ──▶ Show Modal                         │
│  └── Else ──▶ window.location.href = "roadmap.html?id={id}"  │
├──────────────────────────────────────────────────────────────┤
│  Theme Toggle                                                │
│  └── Click ──▶ window.Theme.toggle() ──▶ Update CSS Vars     │
├──────────────────────────────────────────────────────────────┤
│  Mobile Menu                                                 │
│  └── Click ──▶ Toggle .active Class ──▶ Show/Hide Menu       │
├──────────────────────────────────────────────────────────────┤
│  Navigation Links                                            │
│  └── Click ──▶ Smooth Scroll / Page Navigation               │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 explore.html (Explore Page) Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                   explore.html LOAD SEQUENCE                 │
└─────────────────────────────────────────────────────────────┘

┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  HTML   │──▶│  CSS    │──▶│ theme.js│──▶│ auth.js │──▶│ main.js │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                                                            │
                                                            ▼
                                                    ┌─────────────┐
                                                    │ explore.js  │
                                                    │   Execute   │
                                                    └──────┬──────┘
                                                           │
                                                           ▼
                                                    ┌─────────────┐
                                                    │  DOM Ready   │
                                                    └──────┬──────┘
                                                           │
                              ┌────────────────────────────┼────────────────────────────┐
                              │                            │                            │
                              ▼                            ▼                            ▼
                      ┌───────────────┐            ┌───────────────┐            ┌───────────────┐
                      │  Check URL    │            │  Show Loading │            │  Fetch JSON   │
                      │  Parameters   │            │    State      │            │    Data       │
                      │  ?category=   │            │               │            │               │
                      └───────┬───────┘            └───────────────┘            └───────┬───────┘
                              │                                                        │
                              │                              ┌─────────────────────────┘
                              │                              │
                              ▼                              ▼
                      ┌───────────────┐            ┌───────────────┐
                      │  Set Active   │            │  Parse JSON   │
                      │     Tab       │            │               │
                      └───────────────┘            └───────┬───────┘
                                                           │
                              ┌────────────────────────────┘
                              │
                              ▼
                      ┌───────────────┐
                      │  Render Grid  │
                      │  of Roadmaps  │
                      └───────┬───────┘
                              │
                              ▼
                      ┌───────────────┐
                      │  Hide Loading │
                      │  Show Content │
                      └───────────────┘

CATEGORY FILTERING:
┌──────────────────────────────────────────────────────────────┐
│  Tab Click Flow                                             │
│  ├── Click Category Tab                                      │
│  ├── Remove .active from all tabs                           │
│  ├── Add .active to clicked tab                              │
│  ├── Filter roadmaps array by category                       │
│  ├── Clear grid container                                    │
│  ├── Generate HTML for filtered items                      │
│  └── Append to grid                                          │
├──────────────────────────────────────────────────────────────┤
│  Error Handling                                              │
│  ├── JSON Fetch Fails                                        │
│  ├── Hide Loading State                                      │
│  ├── Show Error State                                        │
│  └── Display "Back to Home" Button                          │
└──────────────────────────────────────────────────────────────┘
```

### 3.3 roadmap.html (Detail Page) Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                   roadmap.html LOAD SEQUENCE                 │
└─────────────────────────────────────────────────────────────┘

┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  HTML   │──▶│  CSS    │──▶│ theme.js│──▶│ auth.js │──▶│ main.js │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                                                            │
                                                            ▼
                                                    ┌─────────────┐
                                                    │ roadmap.js  │
                                                    │   Execute   │
                                                    └──────┬──────┘
                                                           │
                                                           ▼
                                              ┌────────────────────────┐
                                              │  Parse URL Parameters  │
                                              │  id={roadmap-id}       │
                                              └───────────┬────────────┘
                                                          │
                                                          ▼
                                              ┌────────────────────────┐
                                              │  Fetch roadmaps-data.json│
                                              │  from public/data/       │
                                              └───────────┬────────────┘
                                                          │
                                                          ▼
                                              ┌────────────────────────┐
                                              │  Find Roadmap by ID    │
                                              │  in roadmaps array     │
                                              └───────────┬────────────┘
                                                          │
                              ┌───────────────────────────┴───────────────────────────┐
                              │                                                       │
                              ▼                                                       ▼
                    ┌─────────────────┐                                   ┌─────────────────┐
                    │  Roadmap Found  │                                   │  Roadmap Not    │
                    │                 │                                   │  Found          │
                    └────────┬────────┘                                   └────────┬────────┘
                             │                                                      │
                             ▼                                                      ▼
                    ┌─────────────────┐                                   ┌─────────────────┐
                    │  Render Header  │                                   │  Show Error State │
                    │  - Title          │                                   │                 │
                    │  - Subtitle       │                                   └────────┬────────┘
                    │  - Stats          │                                            │
                    │  - Icon           │                                            ▼
                    └────────┬────────┘                                   ┌─────────────────┐
                             │                                           │  Redirect to      │
                             │                                           │  explore.html   │
                             ▼                                           └─────────────────┘
                    ┌─────────────────┐
                    │  Render Phases  │
                    │  - Collapsible  │
                    │  - Sections     │
                    │  - Projects     │
                    │  - Outcomes     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Render Timeline│
                    │  - Month markers│
                    │  - Milestones   │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Hide Loading   │
                    │  Show Content   │
                    └─────────────────┘

PHASE INTERACTION:
┌──────────────────────────────────────────────────────────────┐
│  Phase Card Click                                           │
│  ├── Click on Phase Card                                     │
│  ├── Toggle .expanded class                                  │
│  ├── If Expanding:                                           │
│  │   ├── Animate height: 0 ──▶ auto                         │
│  │   ├── Rotate chevron icon 180deg                          │
│  │   └── Show phase details                                   │
│  └── If Collapsing:                                          │
│      ├── Animate height: auto ──▶ 0                          │
│      └── Rotate chevron back                                 │
├──────────────────────────────────────────────────────────────┤
│  Section Toggle                                             │
│  ├── Click Section Header                                    │
│  ├── Toggle section content visibility                       │
│  └── Update section icon                                     │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. JavaScript Module Interactions

### 4.1 Module Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        JAVASCRIPT MODULE DEPENDENCIES                       │
└─────────────────────────────────────────────────────────────────────────────┘

                            ┌─────────────┐
                            │  theme.js   │
                            │  (Global)   │
                            └──────┬──────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
       │   auth.js   │     │   main.js   │     │  explore.js │
       │             │     │             │     │             │
       └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
              │                    │                    │
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
       │  roadmap.js │     │   explore.js│     │  roadmap.js │
       │  (Optional) │     │  (Optional) │     │  (Optional) │
       └─────────────┘     └─────────────┘     └─────────────┘


DETAILED INTERACTIONS:

┌─────────────────────────────────────────────────────────────────────────────┐
│  theme.js                                                                   │
│  ├── Exports: window.Theme                                                  │
│  ├── Methods:                                                               │
│  │   ├── init() - Initialize theme                                         │
│  │   ├── toggle() - Toggle dark/light                                       │
│  │   ├── set(theme) - Set specific theme                                    │
│  │   ├── get() - Get current theme                                          │
│  │   ├── isDark() / isLight() - Check theme                                 │
│  │   └── getSystem() - Get system preference                                │
│  ├── Events:                                                                │
│  │   ├── themeinit - Fired when theme initialized                          │
│  │   └── themechange - Fired when theme changes                            │
│  └── Used by:                                                               │
│      ├── All HTML pages (loaded first in <head>)                           │
│      ├── auth.js (delegates theme calls)                                   │
│      └── Inline onclick handlers (window.Theme.toggle())                   │
├─────────────────────────────────────────────────────────────────────────────┤
│  auth.js                                                                    │
│  ├── Exports: window.Auth                                                   │
│  ├── Dependencies:                                                          │
│  │   └── theme.js (delegates theme calls to window.Theme)                  │
│  ├── Methods:                                                               │
│  │   ├── login() - Authenticate user                                       │
│  │   ├── register() - Create new account                                    │
│  │   ├── logout() - End session                                             │
│  │   ├── getCurrentUser() - Get logged in user                            │
│  │   ├── isAuthenticated() - Check auth status                              │
│  │   ├── updateAuthUI() - Update navbar based on auth                      │
│  │   ├── validateForm() - Form validation                                  │
│  │   └── calculatePasswordStrength() - Password strength                    │
│  ├── Storage:                                                               │
│  │   ├── localStorage: pathgen_users (user data)                            │
│  │   ├── localStorage: pathgen_session (session token)                      │
│  │   └── localStorage: pathgen_current_user (current user)                │
│  └── Used by:                                                               │
│      ├── signup.html (registration)                                          │
│      ├── login.html (authentication)                                       │
│      └── All pages (auth state check)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  main.js                                                                    │
│  ├── No exports (self-initializing)                                         │
│  ├── Dependencies:                                                          │
│  │   └── auth.js (for auth state)                                           │
│  ├── Features:                                                              │
│  │   ├── Mobile Menu Toggle                                                │
│  │   ├── Smooth Scroll for anchor links                                    │
│  │   ├── Search Functionality (searchData array)                           │
│  │   └── Roadmap Card Click Handlers                                        │
│  ├── Search Data:                                                           │
│  │   └── Hardcoded array of roadmap objects                                 │
│  │       ├── id, title, subtitle, type, icon                               │
│  │       └── Used for live search in hero section                          │
│  └── Used by:                                                               │
│      ├── index.html (search, mobile menu)                                    │
│      └── All pages (mobile menu, smooth scroll)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  explore.js                                                                 │
│  ├── No exports (self-initializing)                                         │
│  ├── Dependencies:                                                          │
│  │   ├── auth.js (for auth UI updates)                                      │
│  │   └── public/data/roadmaps-data.json (data source)                       │
│  ├── Features:                                                              │
│  │   ├── Fetch and parse roadmaps JSON                                      │
│  │   ├── Category filtering (all/skill/role)                                │
│  │   ├── Render roadmap grid dynamically                                    │
│  │   └── Error handling for fetch failures                                  │
│  └── Used by:                                                               │
│      └── explore.html (all roadmaps listing)                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  roadmap.js                                                                 │
│  ├── No exports (self-initializing)                                         │
│  ├── Dependencies:                                                          │
│  │   ├── auth.js (for auth UI updates)                                      │
│  │   └── public/data/roadmaps-data.json (data source)                       │
│  ├── Features:                                                              │
│  │   ├── Parse URL parameters (id)                                          │
│  │   ├── Find roadmap by ID in JSON data                                    │
│  │   ├── Render header with stats                                           │
│  │   ├── Render collapsible phases                                          │
│  │   ├── Render timeline                                                     │
│  │   └── Phase expand/collapse interactions                                 │
│  └── Used by:                                                               │
│      └── roadmap.html (individual roadmap detail)                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Data Flow Diagrams

### 5.1 Roadmap Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ROADMAP DATA FLOW                                    │
└─────────────────────────────────────────────────────────────────────────────┘

SOURCE DATA (JSON)
┌─────────────────────────────────────────────────────────────────────────────┐
│  public/data/roadmaps-data.json                                             │
│  ├── roadmaps[]                                                            │
│  │   ├── id: "frontend-developer"                                          │
│  │   ├── title: "Frontend Developer"                                        │
│  │   ├── subtitle: "UI/UX Implementation"                                  │
│  │   ├── icon: "computer"                                                   │
│  │   ├── stats{}                                                           │
│  │   │   ├── phases: 3                                                     │
│  │   │   ├── duration: "6-9 Months"                                        │
│  │   │   ├── technologies: "25+"                                           │
│  │   │   └── salary: "$70K+"                                               │
│  │   ├── phases[]                                                          │
│  │   │   ├── id: 1                                                         │
│  │   │   ├── title: "Foundation"                                           │
│  │   │   ├── subtitle: "HTML & CSS"                                        │
│  │   │   ├── duration: "4-6 weeks"                                         │
│  │   │   ├── description: "..."                                             │
│  │   │   ├── sections[]                                                    │
│  │   │   │   ├── title: "HTML Fundamentals"                                │
│  │   │   │   ├── subtitle: "Structure"                                     │
│  │   │   │   └── topics[]                                                   │
│  │   │   ├── projects[]                                                    │
│  │   │   └── outcomes[]                                                    │
│  │   └── timeline[]                                                        │
│  │       ├── period: "Month 1-2"                                           │
│  │       ├── focus: "HTML, CSS..."                                         │
│  │       └── milestone: "Deploy portfolio"                                  │
│  └── totalRoadmaps: 5                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     │ fetch()
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CONSUMPTION PAGES                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐   │
│  │   index.html    │      │  explore.html   │      │  roadmap.html   │   │
│  │                 │      │                 │      │                 │   │
│  │ Hardcoded cards │      │ Dynamic grid    │      │ Full detail     │   │
│  │ (subset)        │      │ (all roadmaps)  │      │ (single)        │   │
│  │                 │      │                 │      │                 │   │
│  │ Uses: main.js   │      │ Uses: explore.js│      │ Uses: roadmap.js│   │
│  │ Data: Inline    │      │ Data: JSON fetch│      │ Data: JSON fetch│   │
│  │                 │      │                 │      │                 │   │
│  │ Cards link to   │      │ Cards link to   │      │ URL param: id   │   │
│  │ roadmap.html     │      │ roadmap.html     │      │ Filter by ID    │   │
│  └─────────────────┘      └─────────────────┘      └─────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 User Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        USER DATA FLOW                                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  REGISTRATION FLOW (signup.html)                                          │
└─────────────────────────────────────────────────────────────────────────────┘

User Input ──▶ Form Validation ──▶ Password Hash ──▶ Create User Object
    │              │                    │                  │
    │              │                    │                  │
    ▼              ▼                    ▼                  ▼
┌────────┐  ┌────────────┐  ┌────────────────┐  ┌─────────────────────┐
│  Name  │  │ Real-time  │  │ Simple Hash    │  │  {                │
│  Email │  │ Validation │  │ (auth.js)      │  │    id: "user_...",│
│Password│  │ (auth.js)  │  │                │  │    name: "...",   │
│  Role  │  └────────────┘  └────────────────┘  │    email: "...",  │
└────────┘                                      │    password: "...",│
                                                │    role: "...",   │
                                                │    createdAt: ...,│
                                                │    preferences: {},│
                                                │    progress: {}    │
                                                │  }                │
                                                └─────────┬─────────┘
                                                          │
                                                          ▼
                                               ┌─────────────────────┐
                                               │  localStorage         │
                                               │  pathgen_users[]      │
                                               └─────────┬─────────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────────┐
                                               │  Create Session       │
                                               │  pathgen_session      │
                                               └─────────┬─────────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────────┐
                                               │  Redirect to        │
                                               │  index.html         │
                                               └─────────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│  LOGIN FLOW (login.html)                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

User Input ──▶ Find User ──▶ Verify Password ──▶ Create Session ──▶ Redirect
    │              │              │                  │               │
    ▼              ▼              ▼                  ▼               ▼
┌────────┐  ┌────────────┐  ┌─────────────┐  ┌──────────────┐  ┌──────────┐
│  Email │  │ Search     │  │ Hash Input  │  │ Generate     │  │index.html│
│Password│  │ pathgen_   │──▶│ Compare with│──▶│ Session      │──▶│          │
│        │  │ users[]    │  │ Stored Hash │  │ Object       │  │          │
└────────┘  └────────────┘  └─────────────┘  └──────────────┘  └──────────┘
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │ localStorage:   │
                                         │ pathgen_session │
                                         │ pathgen_current │
                                         │ _user           │
                                         └─────────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│  AUTHENTICATION STATE CHECK (All Pages)                                     │
└─────────────────────────────────────────────────────────────────────────────┘

Page Load ──▶ auth.js Loaded ──▶ checkSession() ──▶ Update UI
    │              │                  │                  │
    ▼              ▼                  ▼                  ▼
┌────────┐  ┌────────────┐  ┌────────────────┐  ┌─────────────────────┐
│  HTML  │  │ DOMContent │  │ Read           │  │ If Authenticated:   │
│  Parse │  │ Loaded     │  │ pathgen_session│  │ - Hide "Get Started"│
│        │  │ Event      │  │ Verify expiry  │  │ - Show greeting     │
│        │  │            │  │                │  │ - Show logout btn   │
│        │  │            │  │                │  │                     │
│        │  │            │  │                │  │ If Not:             │
│        │  │            │  │                │  │ - Show "Get Started"│
│        │  │            │  │                │  │ - Hide logout btn   │
└────────┘  └────────────┘  └────────────────┘  └─────────────────────┘
```

---

## 6. Authentication Flow

### 6.1 Complete Authentication State Machine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION STATE MACHINE                             │
└─────────────────────────────────────────────────────────────────────────────┘

                         ┌─────────────┐
                         │   GUEST     │
                         │  (Default)  │
                         └──────┬──────┘
                                │
            ┌────────────────────┼────────────────────┐
            │                    │                    │
            ▼                    ▼                    ▼
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │  Click Sign  │    │ Click "Get   │    │  Try Access  │
    │    In Link   │    │   Started"   │    │   Protected  │
    └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
           │                   │                   │
           └─────────┬─────────┴─────────┐        │
                     │                   │        │
                     ▼                   ▼        ▼
            ┌──────────────┐    ┌──────────────┐
            │  login.html  │    │ signup.html  │
            └──────┬───────┘    └──────┬───────┘
                   │                   │
                   ▼                   ▼
          ┌────────────────┐  ┌────────────────┐
          │  Enter Email   │  │  Enter Details │
          │  Enter Password│  │  - Name        │
          │                │  │  - Email       │
          │                │  │  - Password    │
          │                │  │  - Confirm     │
          │                │  │  - Role        │
          └───────┬────────┘  └───────┬────────┘
                  │                   │
                  ▼                   ▼
          ┌────────────────┐  ┌────────────────┐
          │  Validate Form │  │  Validate Form │
          │  (auth.js)     │  │  (auth.js)     │
          └───────┬────────┘  └───────┬────────┘
                  │                   │
                  ▼                   ▼
          ┌────────────────┐  ┌────────────────┐
          │  Submit        │  │  Submit        │
          │  (AJAX-like)   │  │  (AJAX-like)   │
          └───────┬────────┘  └───────┬────────┘
                  │                   │
                  ▼                   ▼
          ┌────────────────┐  ┌────────────────┐
          │  Find User     │  │  Check Email   │
          │  Verify Pass   │  │  Exists?       │
          └───────┬────────┘  └───────┬────────┘
                  │                   │
        ┌─────────┴─────────┐         │
        │                   │         │
        ▼                   ▼         ▼
   ┌─────────┐       ┌─────────┐  ┌─────────┐
   │ Success │       │  Fail   │  │  Exists │
   └────┬────┘       └────┬────┘  └────┬────┘
        │                   │            │
        ▼                   ▼            ▼
   ┌─────────┐       ┌─────────┐  ┌─────────┐
   │Create   │       │ Show    │  │ Show    │
   │Session  │       │ Error   │  │ Error   │
   └────┬────┘       └─────────┘  └─────────┘
        │
        ▼
   ┌─────────┐
   │Redirect │
   │to Home  │
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │AUTHENTICATED│
   │   STATE   │
   └────┬────┘
        │
   ┌────┴────┐
   │         │
   ▼         ▼
┌───────┐ ┌───────┐
│Browse │ │Logout │
│Content│ │ Click │
└───┬───┘ └───┬───┘
    │         │
    │         ▼
    │    ┌─────────┐
    │    │ Clear   │
    │    │ Session │
    │    └────┬────┘
    │         │
    │         ▼
    │    ┌─────────┐
    └────┤  GUEST  │
         │ (Return)│
         └─────────┘
```

---

## 7. Theme System Flow

### 7.1 Theme Initialization & Toggle Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THEME SYSTEM FLOWCHART                                   │
└─────────────────────────────────────────────────────────────────────────────┘

PAGE LOAD SEQUENCE:

┌─────────────┐
│ HTML Parse  │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────────────────────────────────┐
│ theme.js    │────▶│ IMMEDIATE EXECUTION (IIFE)              │
│ Loaded in   │     │ (Before DOM renders - prevents flash)   │
│ <head>      │     └─────────────────────────────────────────┘
└─────────────┘                      │
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │  Check localStorage            │
                    │  - pathgen_theme exists?       │
                    └───────────────┬────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
            ┌───────────────┐             ┌───────────────┐
            │  YES          │             │  NO           │
            │  Use saved    │             │  Check System │
            │  theme        │             │  Preference   │
            └───────┬───────┘             └───────┬───────┘
                    │                           │
                    │                           ▼
                    │               ┌───────────────────────┐
                    │               │  prefers-color-scheme │
                    │               │  - dark?              │
                    │               │  - light?             │
                    │               └───────────┬───────────┘
                    │                           │
                    └───────────────┬───────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  Apply Theme Attribute        │
                    │  document.documentElement     │
                    │  .setAttribute('data-theme')  │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  CSS Variables Applied        │
                    │  (via variables.css)          │
                    │                               │
                    │  :root { }                    │
                    │  [data-theme="light"] { }     │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  DOM Content Loaded           │
                    │  initTheme() called           │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  Setup Event Listeners        │
                    │  - Toggle buttons             │
                    │  - System preference changes    │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  Theme Ready                  │
                    └───────────────────────────────┘


TOGGLE FLOW:

User Click ──▶ handleToggleClick() ──▶ toggleTheme() ──▶ setTheme()
    │               │                       │                  │
    ▼               ▼                       ▼                  ▼
┌────────┐   ┌────────────┐   ┌──────────────────┐  ┌─────────────────┐
│ Button │   │prevent     │   │  currentTheme    │  │  Update         │
│ Click  │   │Default()   │   │  === 'dark'?     │  │  data-theme     │
│        │   │stopProp()  │   │                  │  │  attribute      │
└────────┘   └────────────┘   │  newTheme =      │  │                 │
                              │  'light' : 'dark'│  │  Save to        │
                              └────────┬─────────┘  │  localStorage   │
                                       │            │                 │
                                       │            │  Update UI       │
                                       │            │  elements        │
                                       │            │                 │
                                       │            │  Dispatch        │
                                       │            │  themechange     │
                                       │            │  event           │
                                       │            └─────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │  CSS Transitions │
                              │  250ms ease      │
                              │  All properties  │
                              └──────────────────┘
```

---

## 8. Search Functionality Flow

### 8.1 Search System Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEARCH FUNCTIONALITY FLOW                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  SEARCH DATA SOURCE (main.js)                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  const searchData = [                                                       │
│    { id: 'react', title: 'React', subtitle: 'Frontend Library', ... },     │
│    { id: 'nodejs', title: 'Node.js', subtitle: 'Runtime Environment',... },│
│    ... 10+ items                                                           │
│  ];                                                                         │
└─────────────────────────────────────────────────────────────────────────────┘


USER INTERACTION FLOW:

┌─────────────┐
│  Focus on   │
│  Search Box │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Type Query     │
│  (3+ chars)     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Input Event    │
│  Fired          │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  performSearch()│
│  (main.js)      │
└──────┬──────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Filter Logic                             │
│  ───────────────────────────────────────│
│  searchData.filter(item =>                │
│    item.title.toLowerCase().includes(query) ||
│    item.subtitle.toLowerCase().includes(query) ||
│    item.id.toLowerCase().includes(query)  │
│  )                                        │
└───────────────┬───────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  displayResults()                       │
│  ───────────────────────────────────────│
│  If results.length === 0:               │
│    Show "No results" message            │
│  Else:                                  │
│    Map results to HTML                  │
│    - Icon                               │
│    - Title (with highlight)             │
│    - Subtitle                           │
│    - Type badge                         │
└───────────────┬───────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Render to #search-results              │
│  Position: absolute below input         │
│  Style: glassmorphism card              │
└───────────────┬───────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│  Add Click Listeners                    │
│  ───────────────────────────────────────│
│  item.addEventListener('click', () => { │
│    window.location.href =               │
│      `roadmap.html?id=${item.id}`;      │
│  });                                    │
└─────────────────────────────────────────┘


KEYBOARD NAVIGATION:

┌─────────────────────────────────────────────────────────────────────────────┐
│  Key Pressed    │  Action                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  ArrowDown      │  Move focus to next result                 │
│  ArrowUp        │  Move focus to previous result             │
│  Enter          │  Navigate to focused result                │
│  Escape         │  Close search results                      │
│  Click Outside  │  Close search results                      │
└──────────────────────────────────────────────────────────────────────────────┘


HIGHLIGHT MATCH:

┌─────────────────────────────────────────────────────────────────────────────┐
│  highlightMatch(text, query)                                              │
│  ──────────────────────────────────────────────────────────────────────────│
│  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');               │
│  return text.replace(regex,                                                 │
│    '<mark style="background: var(--color-primary-subtle); ...">$1</mark>'   │
│  );                                                                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Component Hierarchy

### 9.1 UI Component Tree

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        UI COMPONENT HIERARCHY                               │
└─────────────────────────────────────────────────────────────────────────────┘

ALL PAGES
│
├── <html>
│   └── <body>
│       │
│       ├── NAVBAR (Fixed, Glassmorphism)
│       │   └── .container
│       │       ├── .nav-brand (Logo + Text)
│       │       ├── .nav-menu (Links)
│       │       │   ├── Explore
│       │       │   ├── How it Works
│       │       │   └── Contact
│       │       └── .nav-actions
│       │           ├── .theme-toggle (Sun/Moon icons)
│       │           ├── .auth-nav-buttons (Get Started)
│       │           ├── .user-greeting (Hidden by default)
│       │           └── .mobile-menu-toggle (Hamburger)
│       │
│       ├── MAIN CONTENT (Page-specific)
│       │   │
│       │   ├── index.html
│       │   │   ├── HERO SECTION
│       │   │   │   ├── .hero-title (Large typography)
│       │   │   │   ├── .hero-subtitle
│       │   │   │   ├── .search-wrapper
│       │   │   │   │   ├── .search-container
│       │   │   │   │   │   ├── Search icon
│       │   │   │   │   │   ├── Input field
│       │   │   │   │   │   └── Search button
│       │   │   │   │   └── .search-results (Dropdown)
│       │   │   │   └── .trending-container
│       │   │   │       └── .trending-tags
│       │   │   │
│       │   │   ├── SKILL ROADMAPS SECTION
│       │   │   │   ├── .section-header
│       │   │   │   └── .roadmaps-grid (4 columns)
│       │   │   │       └── .roadmap-item (x8 cards)
│       │   │   │           ├── .roadmap-icon
│       │   │   │           └── .roadmap-info
│       │   │   │
│       │   │   ├── ROLE ROADMAPS SECTION
│       │   │   │   └── .roadmaps-grid (4 columns)
│       │   │   │       └── .roadmap-item (x6 cards)
│       │   │   │
│       │   │   ├── FEATURES SECTION
│       │   │   │   └── .features-grid (4 columns)
│       │   │   │       └── .feature-item (x4 items)
│       │   │   │
│       │   │   └── CTA SECTION
│       │   │
│       │   ├── explore.html
│       │   │   ├── BREADCRUMB
│       │   │   ├── HEADER
│       │   │   ├── CATEGORY TABS
│       │   │   │   ├── All Roadmaps
│       │   │   │   ├── Skill Based
│       │   │   │   └── Role Based
│       │   │   └── .roadmaps-full-grid (Dynamic)
│       │   │
│       │   ├── roadmap.html
│       │   │   ├── BREADCRUMB
│       │   │   ├── HEADER (.roadmap-header)
│       │   │   │   ├── .roadmap-title-section
│       │   │   │   └── .roadmap-stats (4 badges)
│       │   │   ├── PHASES SECTION
│       │   │   │   └── .phases-container
│       │   │   │       └── .phase-item (Collapsible)
│       │   │   │           ├── .phase-header
│       │   │   │           └── .phase-content
│       │   │   │               ├── .phase-sections
│       │   │   │               ├── .phase-projects
│       │   │   │               └── .phase-outcomes
│       │   │   └── TIMELINE SECTION
│       │   │       └── .timeline-container
│       │   │
│       │   ├── how-it-works.html
│       │   │   ├── HERO (Simplified)
│       │   │   ├── STEPS (4 steps, vertical)
│       │   │   └── FEATURES GRID
│       │   │
│       │   ├── contact.html
│       │   │   ├── HERO (Simplified)
│       │   │   ├── .contact-grid (2 columns)
│       │   │   │   ├── .contact-info (4 cards)
│       │   │   │   └── .contact-form-container
│       │   │   │       └── <form>
│       │   │   └── CTA SECTION
│       │   │
│       │   ├── signup.html / login.html
│       │   │   ├── .auth-page
│       │   │   │   └── .auth-container
│       │   │   │       └── .auth-card
│       │   │   │           ├── .auth-header (Logo)
│       │   │   │           ├── .auth-message
│       │   │   │           ├── <form>
│       │   │   │           │   ├── .form-group (multiple)
│       │   │   │           │   │   ├── .form-label
│       │   │   │           │   │   ├── .form-input-wrapper
│       │   │   │           │   │   │   ├── .form-input-icon
│       │   │   │           │   │   │   ├── input
│       │   │   │           │   │   │   └── .password-toggle
│       │   │   │           │   │   ├── .field-error
│       │   │   │           │   │   └── .password-strength (signup)
│       │   │   │           │   └── .btn-auth
│       │   │   │           └── .auth-footer
│       │   │   └── .theme-toggle (Fixed position)
│       │   │
│       │
│       └── FOOTER
│           └── .container
│               ├── .footer-grid
│               │   ├── .footer-column (Brand)
│               │   │   ├── Logo
│               │   │   ├── Tagline
│               │   │   └── .social-links
│               │   └── .footer-column (Links)
│               │       └── .footer-link-list
│               └── .footer-bottom
│                   └── #footer-signout (Conditional)
│
└── MODALS (Dynamic)
    └── #coming-soon-modal
        └── .modal-overlay
            └── .modal-content
                ├── Icon
                ├── Title
                ├── Text
                └── Button
```

---

## 10. File Dependency Graph

### 10.1 Complete File Structure & Dependencies

```
skill-roadmap-generator/
│
├── HTML FILES (Entry Points)
│   │
│   ├── index.html
│   │   ├── CSS: reset.css ──▶ variables.css ──▶ global.css ──▶ components.css ──▶ home.css ──▶ responsive.css
│   │   ├── JS: theme.js (head) ──▶ auth.js ──▶ main.js
│   │   └── Data: Hardcoded in HTML
│   │
│   ├── explore.html
│   │   ├── CSS: reset.css ──▶ variables.css ──▶ global.css ──▶ components.css ──▶ explore.css ──▶ responsive.css
│   │   ├── JS: theme.js (head) ──▶ auth.js ──▶ main.js ──▶ explore.js
│   │   └── Data: public/data/roadmaps-data.json
│   │
│   ├── roadmap.html
│   │   ├── CSS: reset.css ──▶ variables.css ──▶ global.css ──▶ components.css ──▶ roadmap.css ──▶ responsive.css
│   │   ├── JS: theme.js (head) ──▶ auth.js ──▶ main.js ──▶ roadmap.js
│   │   └── Data: public/data/roadmaps-data.json
│   │
│   ├── how-it-works.html
│   │   ├── CSS: reset.css ──▶ variables.css ──▶ global.css ──▶ components.css ──▶ home.css ──▶ responsive.css
│   │   └── JS: theme.js (head) ──▶ auth.js ──▶ main.js
│   │
│   ├── contact.html
│   │   ├── CSS: reset.css ──▶ variables.css ──▶ global.css ──▶ components.css ──▶ home.css ──▶ responsive.css
│   │   └── JS: theme.js (head) ──▶ auth.js ──▶ main.js
│   │
│   ├── signup.html
│   │   ├── CSS: reset.css ──▶ variables.css ──▶ global.css ──▶ components.css ──▶ responsive.css + inline styles
│   │   └── JS: theme.js (head) ──▶ auth.js
│   │
│   └── login.html
│       ├── CSS: reset.css ──▶ variables.css ──▶ global.css ──▶ components.css ──▶ responsive.css + inline styles
│       └── JS: theme.js (head) ──▶ auth.js
│
├── CSS FILES (Styles)
│   │
│   ├── reset.css (First - Normalize)
│   │   └── No dependencies
│   │
│   ├── variables.css (Design Tokens)
│   │   └── No dependencies (defines :root custom properties)
│   │       ├── Colors (dark/light)
│   │       ├── Typography
│   │       ├── Spacing
│   │       ├── Shadows
│   │       └── Transitions
│   │
│   ├── global.css (Global Styles)
│   │   ├── Depends on: variables.css
│   │   └── Provides:
│   │       ├── Base HTML/Body styles
│   │       ├── Typography
│   │       ├── Utilities
│   │       └── Scrollbar/Selection
│   │
│   ├── components.css (UI Components)
│   │   ├── Depends on: variables.css, global.css
│   │   └── Provides:
│   │       ├── Theme toggle
│   │       ├── Navbar
│   │       ├── Buttons
│   │       ├── Footer
│   │       ├── Mobile menu
│   │       ├── Cards
│   │       ├── Forms
│   │       └── Modal
│   │
│   ├── home.css (Home Page)
│   │   ├── Depends on: variables.css, global.css, components.css
│   │   └── Provides: Hero, search, roadmap cards, features, CTA
│   │
│   ├── explore.css (Explore Page)
│   │   ├── Depends on: variables.css, global.css, components.css
│   │   └── Provides: Tabs, grid, loading states
│   │
│   ├── roadmap.css (Detail Page)
│   │   ├── Depends on: variables.css, global.css, components.css
│   │   └── Provides: Header, phases, timeline, breadcrumbs
│   │
│   └── responsive.css (Media Queries)
│       ├── Depends on: ALL other CSS files
│       └── Provides: Breakpoint adjustments
│
├── JS FILES (Logic)
│   │
│   ├── theme.js (Theme System)
│   │   ├── No dependencies
│   │   ├── Exports: window.Theme
│   │   └── Used by: ALL pages
│   │
│   ├── auth.js (Authentication)
│   │   ├── Depends on: theme.js (delegates)
│   │   ├── Exports: window.Auth
│   │   └── Used by: ALL pages
│   │
│   ├── main.js (Core Functionality)
│   │   ├── Depends on: auth.js
│   │   ├── No exports (self-initializing)
│   │   └── Used by: index.html, explore.html, roadmap.html, how-it-works.html, contact.html
│   │
│   ├── explore.js (Explore Page)
│   │   ├── Depends on: auth.js
│   │   ├── No exports (self-initializing)
│   │   └── Used by: explore.html
│   │
│   └── roadmap.js (Detail Page)
│       ├── Depends on: auth.js
│       ├── No exports (self-initializing)
│       └── Used by: roadmap.html
│
├── DATA FILES
│   │
│   └── public/data/
│       ├── roadmaps-data.json
│       │   ├── Used by: explore.js, roadmap.js
│       │   └── Structure: { roadmaps: [...] }
│       └── users-data.json (Template)
│           └── Used by: auth.js (as template)
│
└── ASSETS
    │
    ├── assets/
    │   ├── icons/ (SVG icons)
    │   └── images/ (Static images)
    │
    └── ui/ (Design files)
        ├── v1.0/ (Legacy designs)
        └── v2.0/ (Current designs)
```

---

## 11. Event Flow Summary

### 11.1 Event Listeners by Page

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVENT LISTENERS SUMMARY                                  │
└─────────────────────────────────────────────────────────────────────────────┘

GLOBAL (All Pages)
┌────────────────────────────────────────────────────────────────────────────┐
│  Event              │  Handler                    │  Module       │  Target  │
├────────────────────────────────────────────────────────────────────────────┤
│  DOMContentLoaded   │  initTheme()                │  theme.js     │  Document│
│  DOMContentLoaded   │  initAuth()                 │  auth.js      │  Document│
│  click              │  handleToggleClick()        │  theme.js     │  .theme-toggle│
│  keydown            │  handleToggleKeydown()      │  theme.js     │  .theme-toggle│
│  change             │  (prefers-color-scheme)     │  theme.js     │  matchMedia│
└────────────────────────────────────────────────────────────────────────────┘

index.html
┌────────────────────────────────────────────────────────────────────────────┐
│  Event              │  Handler                    │  Module       │  Target  │
├────────────────────────────────────────────────────────────────────────────┤
│  DOMContentLoaded   │  initMobileMenu()           │  main.js      │  Document│
│  DOMContentLoaded   │  initSmoothScroll()         │  main.js      │  Document│
│  DOMContentLoaded   │  initSearch()               │  main.js      │  Document│
│  DOMContentLoaded   │  initRoadmapCards()         │  main.js      │  Document│
│  click              │  (toggle mobile menu)       │  main.js      │  #mobile-menu-toggle│
│  click              │  (close menu on link click) │  main.js      │  .nav-link│
│  click              │  (close menu on outside)    │  main.js      │  Document│
│  click              │  (smooth scroll)            │  main.js      │  a[href^="#"]│
│  input              │  (search filter)            │  main.js      │  #search-input│
│  keypress           │  (search enter)             │  main.js      │  #search-input│
│  keydown            │  (search navigation)          │  main.js      │  #search-input│
│  click              │  (trending tag)             │  main.js      │  .trending-tag│
│  click              │  (roadmap card)               │  main.js      │  .roadmap-item│
│  click              │  (search result)              │  main.js      │  .search-result-item│
└────────────────────────────────────────────────────────────────────────────┘

explore.html
┌────────────────────────────────────────────────────────────────────────────┐
│  Event              │  Handler                    │  Module       │  Target  │
├────────────────────────────────────────────────────────────────────────────┤
│  DOMContentLoaded   │  (fetch roadmaps)           │  explore.js   │  Document│
│  click              │  (category tab)               │  explore.js   │  .category-tab│
│  click              │  (roadmap card)               │  explore.js   │  .roadmap-item│
└────────────────────────────────────────────────────────────────────────────┘

roadmap.html
┌────────────────────────────────────────────────────────────────────────────┐
│  Event              │  Handler                    │  Module       │  Target  │
├────────────────────────────────────────────────────────────────────────────┤
│  DOMContentLoaded   │  (fetch & render)           │  roadmap.js   │  Document│
│  click              │  (phase expand/collapse)    │  roadmap.js   │  .phase-header│
│  click              │  (section toggle)             │  roadmap.js   │  .section-header│
└────────────────────────────────────────────────────────────────────────────┘

signup.html / login.html
┌────────────────────────────────────────────────────────────────────────────┐
│  Event              │  Handler                    │  Module       │  Target  │
├────────────────────────────────────────────────────────────────────────────┤
│  DOMContentLoaded   │  initSignupForm()           │  auth.js      │  Document│
│  DOMContentLoaded   │  initLoginForm()            │  auth.js      │  Document│
│  submit             │  (form submission)            │  auth.js      │  #signup-form│
│  submit             │  (form submission)            │  auth.js      │  #login-form│
│  blur               │  (field validation)           │  auth.js      │  [data-validate]│
│  input              │  (password strength)          │  auth.js      │  #password│
│  click              │  (password toggle)            │  Inline       │  .password-toggle│
└────────────────────────────────────────────────────────────────────────────┘
```

---
