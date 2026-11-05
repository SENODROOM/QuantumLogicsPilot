import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} <a href="https://github.com/SENODROOM/QuantumLogicsPilot" target="_blank" rel="noopener noreferrer">QuantumLogicsPilot</a>. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
