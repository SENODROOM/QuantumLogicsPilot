# Contributing to QuantumLogicsPilot

Thank you for considering contributing to **QuantumLogicsPilot**! This document outlines the process we follow to ensure a smooth and collaborative development experience.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style & Formatting](#code-style--formatting)
- [Testing](#testing)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [License](#license)

## Getting Started

1. **Fork the repository**
   Click the **Fork** button at the top right of the repository page to create your own copy.

2. **Clone your fork**
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/QuantumLogicsPilot.git
   cd QuantumLogicsPilot
   ```

3. **Create a new branch**
   ```bash
   git checkout -b <feature-or-fix-name>
   ```
   Use a descriptive name that reflects the purpose of the change (e.g., `add-auth-middleware`).

4. **Install dependencies**
   ```bash
   # Install root dependencies (scripts, tooling, etc.)
   npm install

   # Install backend dependencies
   npm install --prefix backend

   # Install frontend dependencies
   npm install --prefix frontend
   ```

5. **Set up environment variables**
   Copy the example file and adjust values as needed:
   ```bash
   cp .env.example .env
   ```

## Development Workflow

- **Running the application**
  ```bash
  # Starts both backend and frontend concurrently
  npm run dev
  ```
  The backend will be available at `http://localhost:5000` and the React frontend at `http://localhost:3000`.

- **Building the frontend** (for production testing)
  ```bash
  npm run build --prefix frontend
  ```

- **Running the backend alone**
  ```bash
  npm run start --prefix backend
  ```

## Code Style & Formatting

The project uses **ESLint** and **Prettier** to enforce a consistent code style across both backend and frontend.

- **Linting**
  ```bash
  npm run lint
  ```
  Fix any linting errors before committing.

- **Formatting**
  ```bash
  npm run format
  ```
  This will automatically format all files according to the Prettier configuration.

Please ensure that your changes pass both linting and formatting checks.

## Testing

While the repository currently does not contain automated tests, any new feature or bug‑fix should include appropriate tests (e.g., using Jest for the backend and React Testing Library for the frontend). Add tests under the respective `__tests__` directories and run:

```bash
npm test
```

## Submitting a Pull Request

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: brief description of the change"
   ```
   Follow the conventional commit format when possible.

2. **Push to your fork**
   ```bash
   git push origin <feature-or-fix-name>
   ```

3. **Open a Pull Request**
   - Navigate to the original repository and click **New Pull Request**.
   - Choose your branch as the source and `main` as the target.
   - Provide a clear title and description. Reference any related issues (e.g., `Closes #12`).

4. **Review Process**
   - Your PR will be reviewed by maintainers. Be responsive to feedback and make any requested changes.
   - Once approved, the PR will be merged.

## License

By contributing, you agree that your contributions will be licensed under the same MIT License as the project. See the [LICENSE](./LICENSE) file for details.
