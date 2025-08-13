import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SubProcesses from './components/SubProcesses';
import Footer from './components/Footer';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeRecordId, setActiveRecordId] = useState(2);
  const [expandSidebarToken, setExpandSidebarToken] = useState(0);

  // Populate records to mirror Figma density (total 20)
  const generate = (startId, count, ref = 'CF9571A20MAA') => (
    Array.from({ length: count }, (_, i) => ({ id: startId + i, ref }))
  );
  const recordData = useMemo(() => ({
    fon: generate(1, 12),
    pending: generate(101, 4),
    ust: generate(201, 2),
    rejected: generate(301, 2),
  }), []);

  const allRecords = useMemo(() => [].concat(...Object.values(recordData)), [recordData]);
  const activeRecord = useMemo(() => allRecords.find(r => r.id === activeRecordId), [allRecords, activeRecordId]);

  // Helper navigation actions
  const goToSubProcesses = () => navigate('/sub-processes');
  const goToFrontSheet = () => navigate('/front-sheet');

  // Default route redirect
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      navigate('/sub-processes', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-screen w-full flex-col items-start justify-start bg-[#F5F5F5] font-sans">
      {/* Header hidden on Sub Processes; visible on Front Sheet only */}
      {location.pathname.endsWith('/front-sheet') ? (
        <Header
          onDuplicate={() => setExpandSidebarToken(prev => prev + 1)}
          onClose={goToSubProcesses}
        />
      ) : null}

      <div className="flex w-full flex-1 self-stretch min-h-0">
        <Routes>
          <Route
            path="/sub-processes"
            element={
              <SubProcesses onOpenFrontSheet={goToFrontSheet} records={recordData.fon} activeRecord={activeRecord} />
            }
          />
          <Route
            path="/front-sheet"
            element={
              <div className="flex w-full flex-1 self-stretch overflow-hidden">
                <Sidebar
                  activeRecord={activeRecordId}
                  setActiveRecord={setActiveRecordId}
                  recordData={recordData}
                  expandTrigger={expandSidebarToken}
                />
                <MainContent record={activeRecord} />
              </div>
            }
          />
        </Routes>
      </div>

      {/* Footer visible only on front sheet to preserve layout parity when needed */}
      {location.pathname.endsWith('/front-sheet') ? <Footer /> : null}
    </div>
  );
}