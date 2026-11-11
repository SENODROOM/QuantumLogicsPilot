import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import heroImage from './assets/image.png';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* Main application routes/components go here */}
        <img src={heroImage} alt="Hero" className="hero-image" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
