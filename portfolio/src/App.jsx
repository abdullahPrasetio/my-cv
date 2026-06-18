import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PortfolioByUsername from './pages/PortfolioByUsername';

function NotFound() {
  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-5xl font-black text-slate-700 mb-4">404</h1>
      <p className="text-slate-400">Halaman tidak ditemukan.</p>
      <p className="text-slate-500 text-sm mt-2">Coba akses <code className="text-blue-400">/p/username</code></p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/p/:username" element={<PortfolioByUsername />} />
        <Route path="/p/:username/:version" element={<PortfolioByUsername />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
