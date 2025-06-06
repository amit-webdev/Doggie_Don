// import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} /> {/* Catch all routes */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
