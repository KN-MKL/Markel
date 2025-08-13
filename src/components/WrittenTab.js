import React from 'react';
import M3Checkbox from './M3Checkbox';

/**
 * WrittenTab
 *
 * Displays the Written workflow UI:
 * - Completed records that have been written
 * - Rejected records that need resubmission
 * - Open Front Sheet functionality
 * - Footer metadata
 */
const WrittenTab = ({
  records = [
    { id: 1, ref: 'CF9571', code: 'A', suffix: '20MAA', majorClass: 'MA-C Content', minorClass: 'MI-C Content', class: 'C Content', entity: 'En Content', limit: 'L Content', excess: 'Ex Content', underwriter: 'U Content' },
    { id: 2, ref: 'CF9571', code: 'A', suffix: '20MAA', majorClass: 'MA-C Content', minorClass: 'MI-C Content', class: 'C Content', entity: 'En Content', limit: 'L Content', excess: 'Ex Content', underwriter: 'U Content' },
    { id: 3, ref: 'CF9571', code: 'A', suffix: '20MAA', majorClass: 'MA-C Content', minorClass: 'MI-C Content', class: 'C Content', entity: 'En Content', limit: 'L Content', excess: 'Ex Content', underwriter: 'U Content' },
    { id: 4, ref: 'CF9571', code: 'A', suffix: '20MAA', majorClass: 'MA-C Content', minorClass: 'MI-C Content', class: 'C Content', entity: 'En Content', limit: 'L Content', excess: 'Ex Content', underwriter: 'U Content' },
    { id: 5, ref: 'CF9571', code: 'A', suffix: '20MAA', majorClass: 'MA-C Content', minorClass: 'MI-C Content', class: 'C Content', entity: 'En Content', limit: 'L Content', excess: 'Ex Content', underwriter: 'U Content' },
  ],
}) => {
  const [selectedRecords, setSelectedRecords] = React.useState(new Set());

  const handleRecordToggle = (recordId) => {
    setSelectedRecords(prev => {
      const next = new Set(prev);
      if (next.has(recordId)) {
        next.delete(recordId);
      } else {
        next.add(recordId);
      }
      return next;
    });
  };

  const handleOpenFrontSheet = () => {
    console.log('Opening front sheet for selected records:', Array.from(selectedRecords));
    // TODO: Implement front sheet opening logic
  };

  return (
    <div className="flex flex-col h-full min-h-0 rounded-lg border border-[#E4E3DF] bg-[#FBFBFB] p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex-1">
          <h3 className="text-[#3C3C3C] text-[16px] font-medium leading-6 tracking-[0.15px] mb-2">
            Written
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9ABBC2]" />
            <p className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">
              UST decision has been received, and the record/s has/have been written.
            </p>
          </div>
        </div>
        <button className="p-1 rounded-lg hover:bg-[#F0F0F0]" aria-label="Expand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.30289 18.375C6.11082 18.375 5.94983 18.31 5.81991 18.1801C5.68997 18.0501 5.625 17.8891 5.625 17.6971V13.3125C5.625 13.1531 5.67893 13.0195 5.78679 12.9117C5.89466 12.8039 6.02831 12.75 6.18774 12.75C6.34719 12.75 6.48076 12.8039 6.58845 12.9117C6.69614 13.0195 6.74998 13.1531 6.74998 13.3125V16.4668L16.4668 6.74998H13.3125C13.1531 6.74998 13.0195 6.69605 12.9117 6.58819C12.8039 6.48034 12.75 6.34669 12.75 6.18724C12.75 6.0278 12.8039 5.89424 12.9117 5.78655C13.0195 5.67885 13.1531 5.625 13.3125 5.625H17.6971C17.8891 5.625 18.0501 5.68997 18.1801 5.81991C18.31 5.94983 18.375 6.11083 18.375 6.30289V10.6875C18.375 10.8469 18.321 10.9805 18.2132 11.0883C18.1053 11.1961 17.9717 11.25 17.8122 11.25C17.6528 11.25 17.5192 11.1961 17.4115 11.0883C17.3038 10.9805 17.25 10.8469 17.25 10.6875V7.53313L7.53313 17.25H10.6875C10.8469 17.25 10.9805 17.3039 11.0883 17.4118C11.1961 17.5196 11.25 17.6533 11.25 17.8127C11.25 17.9722 11.1961 18.1057 11.0883 18.2134C10.9805 18.3211 10.8469 18.375 10.6875 18.375H6.30289Z" fill="#3C3C3C"/>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 bg-white rounded-lg border border-[#D9D9D6] p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-[#E9F0F2] flex items-center justify-center">
            <span className="text-[#5C5A59] text-[11px] font-medium leading-4 tracking-[0.5px]">7</span>
          </div>
          <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Completed Records</span>
        </div>

        {/* Records Table */}
        <div className="flex-1 min-h-0 border border-[#D9D9D6] rounded-lg overflow-hidden">
          <div className="bg-[#F0F0F0] px-2 py-2.5">
            <div className="grid grid-cols-[40px_144px_144px_144px_144px_144px_144px_144px] gap-0">
              {/* Header */}
              <div className="px-2 py-2.5"></div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Reference</span>
              </div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Major Class</span>
              </div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Minor Class</span>
              </div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Class</span>
              </div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Entity</span>
              </div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Limit</span>
              </div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Excess</span>
              </div>
              <div className="px-2 py-2.5">
                <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Underwriter</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {records.map((record, index) => (
              <div key={record.id} className="grid grid-cols-[40px_144px_144px_144px_144px_144px_144px_144px] gap-0 border-b border-[#D9D9D6] last:border-b-0">
                {/* Checkbox */}
                <div className="p-2 flex items-center justify-center bg-[#FEFEFD]">
                  <M3Checkbox
                    compact
                    checked={selectedRecords.has(record.id)}
                    onChange={() => handleRecordToggle(record.id)}
                  />
                </div>
                
                {/* Reference */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <div className="flex items-center">
                    <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.ref}</span>
                    <div className="px-1 py-0.5 mx-1 border-b border-[#807F7B]">
                      <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.code}</span>
                    </div>
                    <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.suffix}</span>
                  </div>
                </div>
                
                {/* Major Class */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.majorClass}</span>
                </div>
                
                {/* Minor Class */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.minorClass}</span>
                </div>
                
                {/* Class */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.class}</span>
                </div>
                
                {/* Entity */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.entity}</span>
                </div>
                
                {/* Limit */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.limit}</span>
                </div>
                
                {/* Excess */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.excess}</span>
                </div>
                
                {/* Underwriter */}
                <div className="p-4 flex items-center bg-[#FEFEFD]">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{record.underwriter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rejected Records Section */}
      <div className="mt-4 bg-white rounded-lg border border-[#D9D9D6] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#FFEDE6] flex items-center justify-center">
              <span className="text-[#6B2100] text-[11px] font-medium leading-4 tracking-[0.5px]">7</span>
            </div>
            <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Rejected Records</span>
          </div>
          <button className="px-4 py-2 border border-[#D9D9D6] rounded-lg text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px] hover:bg-gray-50">
            View
          </button>
        </div>
      </div>

      {/* Info Message and Open Front Sheet */}
      <div className="mt-4 flex items-center gap-2 p-2">
        <div className="w-2 h-2 rounded-full bg-[#FFAE8A]" />
        <p className="text-[#3C3C3C] text-[12px] leading-4 flex-1">
          Edit and resubmit policy front sheets for rejected records using the button below.
        </p>
      </div>
      
      <button
        onClick={handleOpenFrontSheet}
        disabled={selectedRecords.size === 0}
        className="mt-2 px-3 py-2 border border-[#D9D9D6] rounded-lg text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.25 1.875H3.375C2.89275 1.875 2.5 2.26775 2.5 2.75V15.25C2.5 15.7322 2.89275 16.125 3.375 16.125H12.375C12.8572 16.125 13.25 15.7322 13.25 15.25V5.625L11.25 1.875Z" stroke="#3C3C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.25 1.875V5.625H13.25" stroke="#3C3C3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Open Front Sheet
      </button>

      {/* Meta Footer */}
      <div className="mt-4 bg-[#FEFEFD] rounded-lg border border-[#D9D9D6] p-4 flex items-center gap-8">
        <div className="flex items-start gap-2">
          <div className="text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px]">
            Last updated
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{`{DD/MM/YYYY}`}</span>
            <span className="text-[#3C3C3C] text-[12px] leading-4">{`{HH:MM}`}</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px]">
            Last updated by
          </div>
          <div className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{`{First name Surname}`}</div>
        </div>
      </div>
    </div>
  );
};

export default WrittenTab;
