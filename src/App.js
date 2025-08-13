import React, { useEffect, useMemo, useState } from 'react';
import Header, { FS2StepHeader, FS2IntroHeader } from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SubProcesses from './components/SubProcesses';
import Footer from './components/Footer';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeRecordId, setActiveRecordId] = useState(2);
  const [expandSidebarToken, setExpandSidebarToken] = useState(0);
  // Key used to force-remount Front Sheet forms (for Clear all)
  const [fsFormKey, setFsFormKey] = useState(0);

  // Normalize path to avoid trailing slash issues
  const normalizedPath = location.pathname.replace(/\/+$/, '');
  const isFSV1 = normalizedPath === '/fs-v1' || normalizedPath.startsWith('/fs-v1/');
  const isFSV2Main = normalizedPath === '/fs-v2';

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
  // Default FS navigation points to v1
  const goToFrontSheet = () => navigate('/fs-v1');

  // Footer actions for Front Sheet routes
  const handleClearAll = () => setFsFormKey((k) => k + 1);
  const handleSaveAndExit = () => navigate('/sub-processes');
  const handleReviewToSubmit = () => console.log('Review to Submit clicked');

  // Default route redirect
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      navigate('/sub-processes', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
     <div className="flex h-screen w-full flex-col items-start justify-start bg-[#F5F5F5] font-sans">
       {/* Header shown on FS v1 and FS v2 main page */}
       {(isFSV1 || isFSV2Main) ? (
         <Header
           onDuplicate={() => {
             if (isFSV2Main) {
               navigate('/fs-v2/review-records');
             } else {
               setExpandSidebarToken(prev => prev + 1);
             }
           }}
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
          {/* Backward compatibility: redirect old slug to FS v1 */}
          <Route path="/front-sheet" element={<Navigate to="/fs-v1" replace />} />
          {/* FS v1 (client-requested flow) */}
          <Route
            path="/fs-v1"
            element={
              <div className="flex w-full flex-1 self-stretch overflow-hidden">
                <Sidebar
                  activeRecord={activeRecordId}
                  setActiveRecord={setActiveRecordId}
                  recordData={recordData}
                  expandTrigger={expandSidebarToken}
                  showSelectionActionBar={false}
                  enableCollapsedStatusGlyphs={false}
                />
                <MainContent key={`fs-v1-${fsFormKey}`} record={activeRecord} />
              </div>
            }
          />
          {/* FS v2 (mirrors v1; only Duplicate button behavior changes) */}
          <Route
            path="/fs-v2"
            element={
              <div className="flex w-full flex-1 self-stretch overflow-hidden">
                <Sidebar
                  activeRecord={activeRecordId}
                  setActiveRecord={setActiveRecordId}
                  recordData={recordData}
                  expandTrigger={expandSidebarToken}
                  enableCollapsedStatusGlyphs
                />
                <MainContent key={`fs-v2-${fsFormKey}`} record={activeRecord} />
              </div>
            }
          />
          {/* FS v2 Step 2 slug (review records) */}
          <Route
            path="/fs-v2/review-records"
            element={
              <div className="flex w-full flex-1 self-stretch overflow-hidden">
                <div className="flex-1 flex flex-col min-h-0">
                  <FS2StepHeader 
                    recordId={activeRecord?.ref || 'CF9571A20MAA'}
                    step={2}
                    onGoStep1={() => navigate('/fs-v2')}
                    onGoStep2={() => navigate('/fs-v2/review-records')}
                  />
                  <FS2IntroHeader onBack={() => navigate('/fs-v2')} />
                  <div className="flex w-full flex-1 self-stretch overflow-hidden">
                    <Sidebar
                      activeRecord={activeRecordId}
                      setActiveRecord={setActiveRecordId}
                      recordData={recordData}
                      expandTrigger={expandSidebarToken}
                      disableDuplicationSelection
                      forceExpanded
                      hideExpandButton
                      flattenGroups
                      enableCollapsedStatusGlyphs
                      showReviewFooter
                      onFinalizeDuplication={(ids) => console.log('Finalize duplication for IDs:', ids)}
                      showCheckboxColumnAlways
                    />
                    {/* Placeholder for records selection UI */}
                    <div className="flex-1 flex items-center justify-center text-[#5C5A59]">Step 2: Records selection UI goes here.</div>
                  </div>
                </div>
              </div>
            }
          />
          {/* FS v2 Select Records (duplicate of review-records) */}
          <Route
            path="/fs-v2/select-records"
            element={
              <div className="flex w-full flex-1 self-stretch overflow-hidden">
                <div className="flex-1 flex flex-col min-h-0">
                  <FS2StepHeader 
                    recordId={activeRecord?.ref || 'CF9571A20MAA'}
                    step={2}
                    onGoStep1={() => navigate('/fs-v2')}
                    onGoStep2={() => navigate('/fs-v2/select-records')}
                  />
                  <FS2IntroHeader onBack={() => navigate('/fs-v2')} />
                  <div className="flex w-full flex-1 self-stretch overflow-hidden">
                    <Sidebar
                      activeRecord={activeRecordId}
                      setActiveRecord={setActiveRecordId}
                      recordData={recordData}
                      expandTrigger={expandSidebarToken}
                      disableDuplicationSelection
                      forceExpanded
                      hideExpandButton
                      flattenGroups
                      enableCollapsedStatusGlyphs
                      showReviewFooter
                      onFinalizeDuplication={(ids) => console.log('Finalize duplication for IDs (select-records):', ids)}
                      showCheckboxColumnAlways
                    />
                    {/* Placeholder */}
                    <div className="flex-1 flex items-center justify-center text-[#5C5A59]">Select Records UI (duplicate)</div>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>

      {/* Footer visible on FS v1 and FS v2 main page */}
      {(isFSV1 || isFSV2Main) ? (
        <Footer onClearAll={handleClearAll} onSaveAndExit={handleSaveAndExit} onReviewToSubmit={handleReviewToSubmit} />
      ) : null}
    </div>
  );
}