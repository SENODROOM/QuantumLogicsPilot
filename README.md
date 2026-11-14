![QuantumLogicsPilot Logo](frontend/public/logo.svg)

# QuantumLogicsPilot

A MERN starter project.

## Environment Variables

- `BACKEND_PORT` – Port on which the Express backend will listen (default **5000**). If the port is already in use the server will automatically try the next port, up to 5 attempts.
- `FRONTEND_PORT` – Port for the Create‑React‑App development server (default **4999**). The frontend reads this via `frontend/.env`.

Both variables are defined in `.env.example`. Copy the file to `.env` and adjust the values as needed.

## Proxy Configuration

The frontend now uses a dynamic proxy defined in `frontend/src/setupProxy.js`. It forwards all `/api` requests to the backend using the **actual** port the backend ends up listening on (the value is written to a temporary `.backend_port` file by the server at startup). This ensures the proxy works even when the backend falls back to an alternative port.

The static `proxy` field has been removed from `frontend/package.json`.

**Note:** The `.backend_port` file is written to the **repository root** (i.e., `./.backend_port`). The frontend proxy reads this file from the same location, ensuring both sides reference the same port information.

## Security Hardening

- **Restricted CORS** – The backend now sets CORS to allow only the frontend origin (`http://localhost:${process.env.FRONTEND_PORT || 3000}`) instead of the insecure wildcard (`"*"`). This prevents any website from making unauthorized requests to the API.
- **Removed Sensitive Header** – The custom response header `X-HackingTheRepo-Integration` has been removed to avoid leaking internal integration details that could aid an attacker.
- **Dynamic Proxy Alignment** – The proxy reads the backend's actual listening port (from `.backend_port` or the fallback environment variable) so requests are correctly routed even when the backend switches ports due to port‑collision fallback logic.

These changes address the high‑severity CORS issue, the low‑severity information‑leak header, and the medium‑severity proxy mismatch.

## Running the Project

```bash
# Install dependencies
cd backend && npm install && cd ../frontend && npm install

# Start backend (will use BACKEND_PORT or fallback)
cd ../backend && npm start

# Start frontend (default port 4999)
cd ../frontend && npm start

# Or start frontend on alternative port 6999
cd ../frontend && npm run start:6999
```

## Development

For convenience a root‑level script is provided to run both backend and frontend concurrently:

```bash
npm run dev
```

The `dev` script uses `npx concurrently` to start the backend and frontend in one terminal, handling dynamic port fallback automatically.
