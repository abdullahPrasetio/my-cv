import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portofolioVersions } from '../version-registry';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

function Loading() {
  return (
    <div className="h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function NotFound({ message }) {
  return (
    <div className="h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-black text-slate-600 mb-4">404</h1>
      <p className="text-slate-400 mb-2">Portfolio tidak ditemukan.</p>
      {message && <code className="text-xs bg-black/50 p-2 rounded text-slate-500">{message}</code>}
    </div>
  );
}

export default function PortfolioByUsername() {
  const { username, version } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPortfolioData(null);
    setError(null);

    fetch(`${API_URL}/portfolio/${username}`)
      .then(r => {
        if (!r.ok) throw new Error(`Portfolio "${username}" tidak ditemukan`);
        return r.json();
      })
      .then(res => {
        window.cvData = res.data.cv;
        document.title = `${res.data.user.name} | Portofolio`;
        setPortfolioData(res.data);
      })
      .catch(err => {
        setError(err.message);
        document.title = 'Portofolio';
      });
  }, [username]);

  if (error) return <NotFound message={error} />;
  if (!portfolioData) return <Loading />;

  const versionKey = version || portfolioData.default_version || 'v2';
  const Component = portofolioVersions[versionKey] || portofolioVersions['v2'];
  return <Component />;
}
