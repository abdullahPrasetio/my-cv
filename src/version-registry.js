import PortfolioV1 from './pages/v1/PortfolioV1';
import PortfolioV2 from './pages/v2/PortfolioV2';
// Import versi baru di sini nanti:
// import PortfolioV3 from './pages/v3/PortfolioV3';

export const portfolioVersions = {
  v1: PortfolioV1,
  v2: PortfolioV2,
  // v3: PortfolioV3,
};

export const defaultVersionKey = process.env.VITE_DEFAULT_VERSION || 'v2';
