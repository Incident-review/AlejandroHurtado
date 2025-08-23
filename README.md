# Artist Portfolio Template: React + TypeScript Edition

This is a modern, responsive, and scalable artist portfolio website template built with React, TypeScript, and Chakra UI. It's designed to be easily customizable and provides a professional, polished foundation for any artist to showcase their work, events, and career highlights.

## Features

- **Modern Tech Stack**: Built with Vite, React, TypeScript, and Chakra UI for a fast, type-safe, and enjoyable development experience.
- **Responsive Design**: Fully responsive components that look great on all devices, from mobile phones to desktop monitors.
- **Component-Based Architecture**: A clean and organized folder structure that makes it easy to find, modify, and extend components.
- **Dynamic Event System**: Easily manage upcoming and past events through a simple `events.json` file. The UI automatically sorts and displays them.
- **Engaging Animations**: Subtle, professional animations, including a count-up for statistics and a hero quote carousel, powered by Framer Motion.
- **Theming with Chakra UI**: A custom, extendable theme is provided, allowing for easy changes to colors, fonts, and component styles.
- **Robust Testing Setup**: Comes pre-configured with Vitest and React Testing Library for unit and component testing, ensuring reliability and stability.
- **Accessibility**: Built with accessibility best practices in mind, using semantic HTML and ARIA attributes where appropriate.

## Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/artist-website.git
   ```
2. Navigate to the project directory:
   ```sh
   cd artist-website
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Available Scripts

In the project directory, you can run the following commands:

- `npm run dev`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

- `npm run build`: Builds the app for production to the `dist` folder.

- `npm run lint`: Lints the codebase using ESLint to find and fix problems.

- `npm run test`: Runs the test suite in the terminal using Vitest.

- `npm run test:ui`: Runs the test suite and opens the interactive Vitest UI in your browser.

- `npm run preview`: Serves the production build locally to preview it before deployment.

## Customization

This template is designed to be easily customized.

### Theming

All theme-related values (colors, fonts, etc.) are defined in `src/theme.ts`. You can modify this file to change the overall look and feel of the website. The theme is provided to all components via the `ChakraProvider` in `src/main.tsx`.

### Event Data

Event information is managed in `src/data/events.json`. To add, remove, or edit events, simply modify this file. The application will automatically update the "Next Events" section and the "All Events" page.

Each event object should follow this structure:

```json
{
  "id": "unique-id",
  "title": "Event Title",
  "date": "YYYY-MM-DDTHH:mm:ssZ",
  "image": "URL_to_image",
  "location": "Event Location",
  "description": "A brief description of the event."
}
```

## Tech Stack

- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Library**: [Chakra UI](https://chakra-ui.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
