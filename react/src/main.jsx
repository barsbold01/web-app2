import { createRoot } from 'react-dom/client';
import App              from './App';
import UniSection       from './UniSearchFilter';
import ScholarSection   from './ScholarSearchFilter';
import DashboardApp     from './DashboardApp';
import ExamInfoApp      from './ExamInfoApp';
import ApplicationPage  from './ApplicationPage';

const root = document.getElementById('root');
if (root) createRoot(root).render(<App />);

const uniRoot = document.getElementById('uni-search-root');
if (uniRoot) createRoot(uniRoot).render(<UniSection />);

const scholarRoot = document.getElementById('scholar-search-root');
if (scholarRoot) createRoot(scholarRoot).render(<ScholarSection />);

const dashRoot = document.getElementById('dashboard-root');
if (dashRoot) createRoot(dashRoot).render(<DashboardApp />);

const examRoot = document.getElementById('exam-info-root');
if (examRoot) createRoot(examRoot).render(<ExamInfoApp />);

const appRoot = document.getElementById('application-root');
if (appRoot) createRoot(appRoot).render(<ApplicationPage />);
