# VU Recipe Finder 🍲

## Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/vincenzoursano/vu-recipe-finder.git
    ```
2. Navigate to the project directory:
    ```sh
    cd vu-recipe-finder
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Development Server

Start the server:
```sh
npm run dev
```
Visit `http://localhost:5173`.

### Production Build

Build the project:
```sh
npm run build
```
Files will be in `dist`.

### Preview Build

Serve the build:
```sh
npm run serve
```

## Technical decisions

- Vite is used for the build process.
- Vanilla JavaScript is used for the frontend.
- Web components are used for the UI components.
- CSS and CSS variables are used for styling.
- Promisify data to be ready for async/await.
- Module Pattern is used for code organization.