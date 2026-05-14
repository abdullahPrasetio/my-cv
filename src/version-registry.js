import PortofolioV1 from './pages/v1/PortofolioV1';
import PortofolioV2 from './pages/v2/PortofolioV2';
import PortofolioV3 from './pages/v3/PortofolioV3';
import PortofolioV4 from './pages/v4/PortofolioV4';
import PortofolioV5 from './pages/v5/PortofolioV5';
import PortofolioV6 from './pages/v6/PortofolioV6';
import PortofolioV7 from './pages/v7/PortofolioV7';
import PortofolioV8 from './pages/v8/PortofolioV8';
import PortofolioV9 from './pages/v9/PortofolioV9';
import PortofolioV10 from './pages/v10/PortofolioV10';

export const portofolioVersions = {
  v1: PortofolioV1,
  v2: PortofolioV2,
  v3: PortofolioV3,
  v4: PortofolioV4,
  v5: PortofolioV5,
  v6: PortofolioV6,
  v7: PortofolioV7,
  v8: PortofolioV8,
  v9: PortofolioV9,
  v10: PortofolioV10,
};

export const defaultVersionKey = process.env.VITE_DEFAULT_VERSION || 'v2';
