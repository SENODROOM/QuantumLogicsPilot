import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Simple loading spinner component
function LoadingSpinner() {
  return <div className="spinner" aria-label="Loading" />;
}

// Header component – sticky navigation bar with mobile toggle
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu on navigation (useful for mobile)
  const handleNavClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">QuantumLogics Pilot</h1>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
        <nav className={`menu${menuOpen ? ' show' : ''}`} aria-label="Main navigation" onClick={handleNavClick}>
          <a href="#hero" className="nav-link">
            Home
          </a>
          <a href="#items" className="nav-link">
            Items
          </a>
          <a href="#footer" className="nav-link">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

// Hero section – full‑width banner
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-content">
        <h1>Welcome to the MERN Starter</h1>
        <p className="hero-subtitle">
          A clean, responsive foundation for your next full‑stack project.
        </p>
        <a href="#items" className="btn">
          Browse Items
        </a>
      </div>
    </section>
  );
}

// Footer component – simple contact area
function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} QuantumLogics Pilot. All rights reserved.</p>
      </div>
    </footer>
  );
}

// Main App component
export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // guard against state updates after unmount
    axios
      .get('/api/items')
      .then((response) => {
        if (isMounted) {
          setItems(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load items');
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <section id="items" className="section items-section">
          <div className="container">
            <h2>Items</h2>
            {loading && <LoadingSpinner />}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            {!loading && !error && (
              <ul className="item-list">
                {items.map((item) => (
                  <li key={item._id} className="card item-card">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
                {items.length === 0 && <p>No items found.</p>}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
