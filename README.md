# 🌿 Swasth Kadam - Oil Consumption Tracker

**Swasth Kadam** (Healthy Steps) is a progressive web application designed to help users track their daily oil consumption, monitor calorie intake, and make healthier dietary choices. The app provides personalized insights and health scores based on food consumption patterns.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Application Architecture](#application-architecture)
- [Key Components](#key-components)
- [Data Persistence](#data-persistence)
- [Theming System](#theming-system)
- [Contributing](#contributing)

---

## 🎯 Overview

Swasth Kadam empowers users to take control of their health by:
- **Tracking oil consumption** in daily meals
- **Monitoring calorie intake** across breakfast, lunch, dinner, and snacks
- **Providing health scores** for food items based on oil content
- **Offering personalized insights** into eating habits
- **Supporting light/dark themes** for comfortable viewing

The app features a beautiful, mobile-first design with smooth animations and an intuitive user interface.

---

## ✨ Features

### 🍽️ Food Tracking
- **Search & Add Foods**: Extensive food database with 100+ Indian food items
- **Real-time Tracking**: Track meals throughout the day with timestamps
- **Meal Categories**: Organize foods by breakfast, lunch, dinner, and snacks
- **Oil Level Indicators**: Visual color-coded indicators (Low/Moderate/High)
- **Health Scores**: Each food rated 0-10 based on nutritional value

### 📊 Analytics & Insights
- **Daily Summaries**: View total calories and oil consumption per day
- **Progress Tracking**: Monitor your daily intake with visual progress bars
- **Historical Data**: Browse past days' consumption in timeline view
- **Health Status**: Real-time status indicators (Excellent/Moderate/High oil intake)

### 👤 User Profile
- **Personal Dashboard**: View user stats and profile information
- **Theme Toggle**: Switch between light and dark modes
- **Settings Management**: Customize app preferences
- **Data Management**: Backup, restore, or clear tracked data

### 🎨 UI/UX Features
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Smooth Animations**: Framer Motion-powered page transitions
- **Interactive Preloader**: Engaging loading animation on app launch
- **Bottom Navigation**: Easy tab-based navigation
- **Photo Capture**: Camera interface for food photo analysis (coming soon)

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing

### UI & Animations
- **Framer Motion** - Smooth animations and transitions
- **Bootstrap 5** - Responsive grid and utilities
- **Bootstrap Icons** - Comprehensive icon library
- **Custom CSS** - Theme variables and component styling

### State Management
- **React useState & useEffect** - Local state management
- **localStorage API** - Persistent data storage

### Development Tools
- **ESLint** - Code linting
- **Hot Module Replacement (HMR)** - Fast refresh during development

---

## 📁 Project Structure

```
oil-front/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, logos (logo.png, bg.png, c3.png)
│   ├── components/     # React components
│   │   ├── Onboarding.jsx          # Welcome/landing screen with preloader
│   │   ├── Preloader.jsx           # Animated loading component
│   │   ├── RegistrationForm.jsx   # User registration
│   │   ├── LandingPage.jsx         # Main dashboard (home)
│   │   ├── TrackSection.jsx        # Food tracking timeline
│   │   ├── AddFoodModal.jsx        # Food search & add modal
│   │   ├── DailyDetails.jsx        # Detailed daily view
│   │   ├── UserProfile.jsx         # User profile & settings
│   │   ├── Carousel.jsx            # Hero carousel with stats
│   │   └── *.css                   # Component-specific styles
│   ├── data/
│   │   └── foodDatabase.js         # Food items database
│   ├── App.jsx         # Root component with routing
│   ├── main.jsx        # App entry point
│   └── index.css       # Global styles & theme variables
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
└── README.md           # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anupamece/oil-tracker.git
   cd oil-tracker/oil-front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🏗️ Application Architecture

### Routing Structure

```
/ (Onboarding)
  ├── /register (Registration Form)
  └── /home (Landing Page - Main Dashboard)
      ├── Home Tab - Dashboard & Insights
      ├── Track Tab - Food Timeline
      ├── Add Tab - Food Search Modal
      └── Profile - User Profile
          ├── /profile/reminders
          ├── /profile/goals
          ├── /profile/tasks
          ├── /profile/gallery
          ├── /profile/metrics
          ├── /profile/health
          ├── /profile/help
          ├── /profile/data
          └── /profile/settings
```

### Component Hierarchy

```
App
├── Onboarding (with Preloader)
├── RegistrationForm
├── LandingPage
│   ├── Carousel
│   ├── TrackSection
│   └── AddFoodModal
├── DailyDetails
└── UserProfile
```

---

## 🔑 Key Components

### 1. **Onboarding Component**
- **Purpose**: Welcome screen with app introduction
- **Features**:
  - Animated preloader with golden liquid fill effect
  - Background image with blur and overlay
  - "Get Started" button with glow effect
  - Framer Motion page transitions

### 2. **LandingPage Component**
- **Purpose**: Main dashboard and navigation hub
- **Features**:
  - Tab-based navigation (Home, Track, Add, Profile)
  - Today's tracking summary with statistics
  - Carousel with health insights
  - Real-time calorie and oil consumption display
  - Bottom navigation bar

### 3. **TrackSection Component**
- **Purpose**: Timeline view of tracked foods
- **Features**:
  - Grouped by date (newest first)
  - Individual food cards with details
  - Delete functionality
  - Progress bars for daily goals
  - Empty state with call-to-action

### 4. **AddFoodModal Component**
- **Purpose**: Search and add food items
- **Features**:
  - Search functionality across food database
  - Categorized recommendations (Low/Moderate/High oil)
  - Tab switching between search and camera
  - Visual health indicators

### 5. **UserProfile Component**
- **Purpose**: User settings and profile management
- **Features**:
  - Profile stats summary
  - Theme toggle (Light/Dark mode)
  - Navigation to various settings sections
  - Logout functionality

### 6. **Preloader Component**
- **Purpose**: Engaging loading animation
- **Features**:
  - Spherical ball with logo
  - Golden liquid fill animation
  - Smooth entrance and exit transitions
  - Travels from center to logo position

---

## 💾 Data Persistence

### localStorage Implementation

The app uses the browser's `localStorage` API to persist user data across sessions:

#### Stored Data
- **`trackedFoods`**: Array of all tracked food entries with timestamps
- **`userData`**: User name and profile information
- **`userLoggedIn`**: Authentication status
- **`theme`**: User's theme preference (light/dark)

#### Data Structure Example
```javascript
// trackedFoods structure
[
  {
    id: 1234567890,
    name: "Aloo Paratha",
    calories: 300,
    oilLevel: 60,
    healthScore: 6,
    category: "breakfast",
    timestamp: "2025-10-25T08:30:00.000Z"
  },
  // ... more food entries
]
```

#### How It Works
1. **On App Load**: State is initialized from `localStorage`
2. **On Data Change**: Automatically saved to `localStorage` via `useEffect`
3. **On Navigation**: Data persists across all page transitions
4. **Error Handling**: Graceful fallback if storage is unavailable

---

## 🎨 Theming System

### CSS Custom Properties

The app uses CSS variables for dynamic theming:

#### Dark Theme (Default)
```css
.theme-dark {
  --bg: #0b1020;
  --card: #0f1724;
  --text-primary: #f5f1dc;
  --text-secondary: #9aa6b2;
  --accent: #10b981;
  /* ... more variables */
}
```

#### Light Theme
```css
.theme-light {
  --bg: #f8fafc;
  --card: #ffffff;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --accent: #10b981;
  /* ... more variables */
}
```

### Theme Toggle
- Theme is applied to `document.documentElement`
- Saved to `localStorage` for persistence
- Toggle available in User Profile page
- Affects all components instantly

---

## 📱 Mobile Optimization

### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
```

### Touch Optimizations
- `-webkit-tap-highlight-color` disabled
- `touch-action: manipulation` prevents double-tap zoom
- `overflow-x: hidden` prevents horizontal scroll
- Responsive font sizes with `clamp()`

---

## 🎯 Food Database

The app includes a comprehensive food database in `src/data/foodDatabase.js`:

### Food Categories
- **Low Oil** (0-20%): Salads, fruits, boiled items
- **Moderate Oil** (21-50%): Chapati, dal, idli
- **High Oil** (51-100%): Fried items, parathas, pakoras

### Food Properties
```javascript
{
  id: number,
  name: string,
  category: string,
  calories: number,
  oilLevel: number (0-100),
  healthScore: number (0-10),
  protein: number,
  carbs: number,
  fats: number
}
```

---

## 🔄 Git Commands Reference

### Basic Workflow
```bash
# Stage all changes
git add -A

# Commit with message
git commit -m "Your message"

# Push to remote
git push origin main
```

### Quick Commits
```bash
# Stage and commit tracked files
git commit -am "Update message"

# Amend last commit
git commit --amend -m "New message"
```

### Handle Line Ending Warnings
```bash
# Configure Git for Windows
git config core.autocrlf true
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is part of the SIH (Smart India Hackathon) initiative.

---

## 👥 Authors

- **Anupam** - [@anupamece](https://github.com/anupamece)

---

## 🙏 Acknowledgments

- Food database inspired by Indian dietary patterns
- UI/UX inspired by modern health tracking apps
- Icons from Bootstrap Icons
- Animations powered by Framer Motion

---

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

---

**Made with ❤️ for healthier living**
