import { createRoot } from 'react-dom/client';
import UniSearchFilter from './UniSearchFilter';
import ScholarSearchFilter from './ScholarSearchFilter';

const uniRoot = document.getElementById('uni-search-root');
if (uniRoot) createRoot(uniRoot).render(<UniSearchFilter />);

const scholarRoot = document.getElementById('scholar-search-root');
if (scholarRoot) createRoot(scholarRoot).render(<ScholarSearchFilter />);
