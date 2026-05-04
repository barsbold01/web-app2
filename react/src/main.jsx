import { createRoot } from 'react-dom/client';
import UniSection from './UniSearchFilter';
import ScholarSection from './ScholarSearchFilter';

const uniRoot = document.getElementById('uni-search-root');
if (uniRoot) createRoot(uniRoot).render(<UniSection />);

const scholarRoot = document.getElementById('scholar-search-root');
if (scholarRoot) createRoot(scholarRoot).render(<ScholarSection />);
