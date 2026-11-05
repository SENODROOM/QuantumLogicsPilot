import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* Main application routes/components go here */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
