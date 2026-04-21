import PortofolioV1 from './pages/v1/PortofolioV1';
import PortofolioV2 from './pages/v2/PortofolioV2';
// Import versi baru di sini nanti:
// import PortofolioV3 from './pages/v3/PortofolioV3';

export const portofolioVersions = {
  v1: PortofolioV1,
  v2: PortofolioV2,
  // v3: PortofolioV3,
};

export const defaultVersionKey = process.env.VITE_DEFAULT_VERSION || 'v2';
