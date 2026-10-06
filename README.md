# Leaflet H3 App

An interactive geospatial visualization application built with **React**, **Leaflet**, and **H3**. Explore geographic data through interactive maps and hexagonal spatial indexing.

## Features

* Interactive maps powered by Leaflet.
* H3 hexagonal spatial indexing and visualization.
* Dynamic map zoom and navigation.
* Customizable map visualization.
* Responsive interface.
* Type-safe development with TypeScript.

## Tech Stack

| Technology     | Purpose                                    |
| -------------- | ------------------------------------------ |
| React 19       | UI development                             |
| TypeScript 6   | Type safety                                |
| Leaflet        | Interactive mapping                        |
| React Leaflet  | React integration for Leaflet              |
| H3             | Hexagonal hierarchical geospatial indexing |
| Vite 8         | Development server and build tooling       |
| react-colorful | Color picker components                    |

## Getting Started

### Prerequisites

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/leaflet-h3-app.git
```

Navigate to the project directory:

```bash
cd leaflet-h3-app
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

Run ESLint to check the codebase:

```bash
npm run lint
```

## Project Structure

```text
leaflet-h3-app/
├── public/              # Static assets
├── src/                 # Application source code
├── index.html           # Application entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md
```

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the development server        |
| `npm run build`   | Type-check and build for production |
| `npm run lint`    | Run ESLint                          |
| `npm run preview` | Preview the production build        |

## License

This project is open source. See the [LICENSE](LICENSE) file for details.
