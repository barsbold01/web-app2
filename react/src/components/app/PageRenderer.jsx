import ApplicationPage from '../../ApplicationPage';
import DashboardApp from '../../DashboardApp';
import ExamInfoApp from '../../ExamInfoApp';
import ScholarSection from '../../ScholarSearchFilter';
import UniSection from '../../UniSearchFilter';
import PageHeader from './PageHeader';

function PageFrame({ id, activePage, children }) {
  return (
    <div className={`page${activePage === id ? ' active' : ''}`}>
      {activePage === id && children}
    </div>
  );
}

export default function PageRenderer({ activePage }) {
  return (
    <>
      <PageFrame id="dashboard" activePage={activePage}>
        <DashboardApp />
      </PageFrame>

      <PageFrame id="universities" activePage={activePage}>
        <PageHeader page="universities" />
        <UniSection />
      </PageFrame>

      <PageFrame id="scholarships" activePage={activePage}>
        <PageHeader page="scholarships" />
        <ScholarSection />
      </PageFrame>

      <PageFrame id="exams" activePage={activePage}>
        <ExamInfoApp />
      </PageFrame>

      <PageFrame id="application" activePage={activePage}>
        <PageHeader page="application" />
        <ApplicationPage />
      </PageFrame>
    </>
  );
}
