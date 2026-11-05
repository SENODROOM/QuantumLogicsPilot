import React from 'react';

/**
 * Header component – renders a sticky site header with branding and a placeholder navigation.
 *
 * The component uses semantic HTML elements (<header> and <nav>) and applies CSS class names
 * that are defined in `frontend/src/App.css` (e.g., `.header`, `.header__title`, `.header__nav`).
 * Navigation items are rendered as disabled buttons to avoid unwanted page jumps while
 * preserving the visual style of links.
 */
const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header__container">
        <h1 className="header__title">QuantumLogicsPilot</h1>
        <nav className="header__nav" aria-label="Main navigation">
          {/* Placeholder for future navigation links */}
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <button type="button" className="header__nav-link" aria-disabled="true">
                Home
              </button>
            </li>
            <li className="header__nav-item">
              <button type="button" className="header__nav-link" aria-disabled="true">
                About
              </button>
            </li>
            <li className="header__nav-item">
              <button type="button" className="header__nav-link" aria-disabled="true">
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
