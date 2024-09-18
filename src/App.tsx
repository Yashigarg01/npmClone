import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PackageDetailPage from './pages/PackageDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/package/:packageName" element={<PackageDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
