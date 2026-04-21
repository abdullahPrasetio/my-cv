import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { portfolioVersions } from './version-registry';

function App() {
  const [config, setConfig] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchJSON = async (url, fallback = null) => {
          const res = await fetch(url);
          const contentType = res.headers.get("content-type");
          if (res.ok && contentType && contentType.includes("application/json")) {
            return await res.json();
          }
          if (fallback) return fallback;
          throw new Error(`Failed to load ${url}`);
        };

        const runtimeConfig = await fetchJSON('/config.json', { defaultVersion: 'v2' });
        const cvData = await fetchJSON('/cv.json');
        
        window.cvData = cvData;
        setData(cvData);
        setConfig(runtimeConfig);

        // Update HTML Title secara dinamis
        if (cvData.name) {
          document.title = `${cvData.name} | Portfolio`;
        } else {
          document.title = "My Portfolio";
        }
      } catch (err) {
        console.error("Critical Load Error:", err);
        setError(err.message);
        document.title = "My Portfolio";
      }
    };

    loadData();
  }, []);

  if (error) return (
    <div className="h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Load Error</h1>
      <p className="text-slate-400 mb-2">Gagal memuat data konfigurasi.</p>
      <code className="text-xs bg-black/50 p-2 rounded mb-6 text-slate-500">{error}</code>
      <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 rounded-lg font-bold">Retry</button>
    </div>
  );

  if (!config || !data) return (
    <div className="h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const defaultVersion = config.defaultVersion || 'v2';
  const DefaultComponent = portfolioVersions[defaultVersion] || portfolioVersions['v2'];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultComponent />} />
        {Object.entries(portfolioVersions).map(([key, Component]) => (
          <Route key={key} path={`/${key}`} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
