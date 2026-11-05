# QuantumLogicsPilot

A **MERN** (MongoDB, Express, React, Node.js) starter project that demonstrates a clean, modern full‑stack architecture with a responsive UI and a simple CRUD API.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
`QuantumLogicsPilot` is a minimal yet production‑ready MERN boilerplate. It includes:
- **Backend** – Express server with Mongoose for MongoDB, a single `Item` model, and full CRUD routes under `/api/items`.
- **Frontend** – A React application (no CRA scaffolding) that fetches the items, displays them in a responsive card layout, and follows a design system based on the provided colour palette, typography, and spacing.
- **Root scripts** – A single `npm start` command that runs both the backend and frontend concurrently using the `concurrently` package.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| **Database** | MongoDB (via Mongoose) |
| **Server**   | Node.js, Express |
| **Client**   | React, Axios |
| **Tooling**  | npm, concurrently, nodemon |
| **Styling**  | CSS (custom properties, mobile‑first) |

---

## Folder Structure
```
.
├── README.md               # You are reading it!
├── .gitignore              # Git ignore rules
├── package.json            # Root package.json (concurrently scripts)
├── backend/                # Express API
│   ├── package.json        # Backend dependencies & scripts
│   └── server.js           # Entry point, routes, DB connection
└── frontend/               # React UI
    ├── package.json        # Frontend dependencies & scripts
    ├── public/
    │   └── index.html     # HTML skeleton
    └── src/
        ├── index.js       # React entry point
        ├── App.js          # Main component (Header, Hero, Footer, etc.)
        └── App.css         # Styling following the design system
```

---

## Prerequisites
- **Node.js** (>= 18) and **npm** (>= 9) installed globally.
- **MongoDB** instance – you can use a local installation or a cloud service like MongoDB Atlas. Create a connection string and add it to a `.env` file in the `backend/` folder:
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/quantumlogics?retryWrites=true&w=majority
  PORT=5000
  ```

---

## Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/SENODROOM/QuantumLogicsPilot.git
   cd QuantumLogicsPilot
   ```
2. **Install all dependencies** (both backend and frontend) using the root script:
   ```bash
   npm run install
   ```
   This runs `npm install` inside `backend/` and `frontend/`.

---

## Running the Application
### Development (concurrently)
```bash
npm start
```
- Starts the **backend** on `http://localhost:5000` (or the `PORT` defined in `.env`).
- Starts the **frontend** on `http://localhost:3000` and proxies API requests to the backend.

### Backend only
```bash
npm run dev --prefix backend
```
Runs the Express server with **nodemon** for hot‑reloading.

### Frontend only
```bash
npm start --prefix frontend
```
Starts the React development server.

---

## API Endpoints
All endpoints are prefixed with `/api/items`.
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`    | `/api/items` | Retrieve all items.
| `POST`   | `/api/items` | Create a new item. Body: `{ "name": "string", "description": "string" }`
| `GET`    | `/api/items/:id` | Retrieve a single item by ID.
| `PUT`    | `/api/items/:id` | Update an item. Body same as POST.
| `DELETE` | `/api/items/:id` | Delete an item.

---

## Frontend Features
- **Sticky header** with navigation placeholder.
- **Hero section** with a background image and call‑to‑action button.
- **Responsive card layout** that displays the list of items fetched from the backend.
- **Design system** implemented via CSS custom properties (colors, spacing, typography, etc.).
- **Mobile‑first** layout with graceful breakpoints at 640px, 900px, and 1200px.
- **Accessibility** – semantic HTML, focus styles, and `aria` attributes for the mobile menu (future extension).

---

## Backend Features
- **Environment configuration** via `dotenv`.
- **Mongoose schema** for an `Item` with `name` (required) and `description` fields.
- **CORS** enabled for the frontend origin.
- **Error handling** – basic try/catch with appropriate HTTP status codes.
- **Nodemon** for development hot‑reloading.

---

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes and push to your fork.
4. Open a pull request against the `main` branch.

---

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.
