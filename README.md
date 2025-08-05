# Markel V2 - Binding Data Form

A React application for managing binding data forms with a modern, responsive interface.

## Features

- **Interactive Sidebar**: Navigate between different record categories (FON, Pending, UST, Rejected)
- **Dynamic Form Fields**: Auto-completing dropdown fields and text inputs with floating labels
- **Collapsible Sections**: Organized form sections that can be expanded/collapsed
- **Checkbox Management**: Interactive checkboxes for CAT Management writebacks
- **Modern UI**: Clean, professional design using Tailwind CSS
- **Responsive Design**: Works on different screen sizes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── Icon.js          # Reusable icon component
│   └── RecordItem.js    # Individual record item component
├── App.js               # Main application component
├── index.js             # Application entry point
└── index.css            # Global styles with Tailwind CSS
```

## Components Overview

- **Header**: Application header with title and duplicate button
- **Sidebar**: Record navigation with categorized lists
- **MainContent**: Form sections with various input types
- **FormSection**: Collapsible form sections
- **FormField**: Input fields with dropdown support
- **CheckboxItem**: Interactive checkbox components
- **Footer**: Action buttons for form submission

## Technologies Used

- React 18
- Tailwind CSS
- Create React App
- Modern JavaScript (ES6+)

## Customization

The application uses a consistent color scheme defined in Tailwind classes:
- Primary: `#3C3C3C`
- Secondary: `#5C5A59`
- Borders: `#D9D9D6`
- Background: `#F5F5F5`

You can modify the styling by updating the Tailwind classes or extending the configuration in `tailwind.config.js`. 