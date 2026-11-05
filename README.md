# QuantumLogicsPilot

[![Build Status](https://img.shields.io/github/actions/workflow/status/SENODROOM/QuantumLogicsPilot/ci.yml?branch=main)](https://github.com/SENODROOM/QuantumLogicsPilot/actions)
[![npm version](https://img.shields.io/npm/v/quantumlogics-pilot.svg)](https://www.npmjs.com/package/quantumlogics-pilot)
[![License](https://img.shields.io/github/license/SENODROOM/QuantumLogicsPilot)](https://github.com/SENODROOM/QuantumLogicsPilot/blob/main/LICENSE)

## Overview
A MERN starter project with a responsive UI and CRUD API.

## Getting Started

```bash
# Clone the repo
git clone https://github.com/SENODROOM/QuantumLogicsPilot.git
cd QuantumLogicsPilot

# Install root dependencies
npm install

# Install backend and frontend dependencies
npm install --prefix backend
npm install --prefix frontend

# Create an .env file based on the example
cp .env.example .env
```

### Development

```bash
# Run both backend and frontend concurrently
npm run dev
```

## Scripts
- `npm run start` – Starts the backend server.
- `npm run client` – Starts the React development server.
- `npm run dev` – Runs both servers concurrently.
- `npm run lint` – Lints the entire codebase.
- `npm run format` – Formats code with Prettier.

## Linting & Formatting
ESLint and Prettier are configured at the repository root. Run `npm run lint` to check for linting errors and `npm run format` to automatically format the code.

## Contributing
Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License
MIT © 2024 QuantumLogicsPilot
