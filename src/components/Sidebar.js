import React from 'react';
import M3Checkbox from './M3Checkbox';

// --- Local SVG Icons ---
const ToggleExpandIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="6" height="14" fill="#F4F2EB"/>
    <path d="M2.02734 19.3066L2.02734 4.65331L21.974 4.65331V19.3066H2.02734Z" stroke="#424242" strokeWidth="1.33333" strokeLinejoin="bevel"/>
    <line x1="2" y1="7.5" x2="5" y2="7.5" stroke="#424242"/>
    <line x1="2" y1="9.5" x2="5" y2="9.5" stroke="#424242"/>
    <line x1="2" y1="11.5" x2="5" y2="11.5" stroke="#424242"/>
    <line x1="8.5" y1="5" x2="8.5" y2="19" stroke="#424242"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 15L12 9L6 15" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NotStartedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="#3C3C3C" strokeWidth="1.26"/>
  </svg>
);

const RightChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.9467 12.0005L8.87358 7.92737C8.73511 7.78892 8.66428 7.61489 8.66108 7.40527C8.65786 7.19567 8.72869 7.01844 8.87358 6.87357C9.01844 6.72869 9.19408 6.65625 9.40048 6.65625C9.60688 6.65625 9.78251 6.72869 9.92738 6.87357L14.4216 11.3678C14.5152 11.4614 14.5812 11.5601 14.6197 11.6639C14.6581 11.7678 14.6774 11.88 14.6774 12.0005C14.6774 12.121 14.6581 12.2332 14.6197 12.337C14.5812 12.4408 14.5152 12.5396 14.4216 12.6331L9.92738 17.1274C9.78893 17.2658 9.61489 17.3367 9.40527 17.3399C9.19567 17.3431 9.01844 17.2723 8.87358 17.1274C8.72869 16.9825 8.65625 16.8069 8.65625 16.6005C8.65625 16.3941 8.72869 16.2184 8.87358 16.0736L12.9467 12.0005Z" fill="black"/>
  </svg>
);

// --- Row (collapsed) ---
const CollapsedRecordItem = ({ item, active, onClick }) => {
  const { ref, code, suffix } = item;
  return (
    <div
      onClick={onClick}
      className={`relative w-full bg-white rounded-lg border flex items-center cursor-pointer transition-all duration-200 ${
        active ? 'shadow-[0px_2px_16px_rgba(0,0,0,0.05)] border-[#807F7B]' : 'border-[#D9D9D6]'
      }`}
      role="button"
      tabIndex={0}
    >
      {active && <div className="absolute left-[-16px] top-[6px] w-1 h-11 bg-[#3C3C3C] rounded-r-lg" />}
      <div className="w-10 pl-4 py-[14px] flex flex-col justify-center items-start">
        <div className="h-6 p-1 bg-[#ECECEC] rounded flex justify-center items-center"><NotStartedIcon /></div>
      </div>
      <div className="flex-1 self-stretch px-4 py-2 flex flex-col justify-center items-start">
        <div className="flex justify-start items-center text-[#3C3C3C] text-sm leading-5 tracking-[0.25px]">
          <span>{ref || code}</span>
          {code && <div className="px-1 py-0.5 mx-1 border-b border-[#807F7B]"><span>{code}</span></div>}
          {suffix && <span>{suffix}</span>}
        </div>
      </div>
      {active && (
        <div className="flex flex-col justify-center items-center pr-2">
          <button className="p-2 rounded-full hover:bg-gray-100"><RightChevronIcon /></button>
        </div>
      )}
    </div>
  );
};

// --- Header (expanded) ---
const ExpandedHeader = ({ showEdgeShadow }) => (
  <div className="sticky top-0 z-20 flex w-full text-xs text-[#5C5A59] font-medium tracking-[0.5px] bg-transparent py-2">
    {/* 1: Checkbox (transparent bg) */}
    <div className="sticky left-0 flex-shrink-0 w-14 p-2 bg-transparent z-20"></div>
    {/* 2: Status (transparent bg) */}
    <div className="sticky left-14 flex-shrink-0 w-20 flex items-center justify-center bg-transparent z-20">Status</div>
    {/* 3: Reference (conditional shadow, transparent bg) */}
    <div className="sticky flex-shrink-0 w-48 px-2 bg-transparent z-30 relative" style={{ left: '8.5rem' }}>
      Reference
      {showEdgeShadow && (
        <>
          {/* Left-side mask stretching to the sidebar's left edge */}
          <div className="absolute top-0 bottom-0 left-[-100vw] right-full bg-[#F5F5F5] pointer-events-none z-30" />
          <div className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none z-30" style={{ boxShadow: 'inset -10px 0 8px -8px rgba(0,0,0,0.12)' }} />
        </>
      )}
    </div>
    {/* Non-sticky columns */}
    <div className="flex-shrink-0 w-40 px-2">Major Class</div>
    <div className="flex-shrink-0 w-40 px-2">Minor Class</div>
    <div className="flex-shrink-0 w-32 px-2">Class</div>
    <div className="flex-shrink-0 w-32 px-2">Entity</div>
    <div className="flex-shrink-0 w-32 px-2">Limit</div>
    <div className="flex-shrink-0 w-32 px-2">Excess</div>
    <div className="flex-shrink-0 w-32 px-2">Underwriter</div>
  </div>
);

// --- Row (expanded) ---
const ExpandedRecordRow = ({ item, active, onClick, showEdgeShadow }) => {
  const { ref, code, suffix } = item;
  const [checked, setChecked] = React.useState(false);
  return (
    <div className={`relative`}>
      {active && <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-11 bg-[#3C3C3C] rounded-r-lg" />}
      <div
        onClick={onClick}
        className={`w-full bg-transparent rounded-lg border flex items-stretch cursor-pointer transition-all duration-200 text-sm text-[#3C3C3C] ${
          active ? 'shadow-[0px_2px_16px_rgba(0,0,0,0.05)] border-[#807F7B]' : 'border-[#D9D9D6]'
        }`}
        role="button"
        tabIndex={0}
      >
        {/* 1: Checkbox (transparent bg) */}
        <div className="sticky left-0 z-10 flex-shrink-0 w-14 flex items-center justify-center p-4 bg-transparent rounded-l-lg">
          <M3Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} className="!m-0" compact />
        </div>
        {/* 2: Status (transparent bg) */}
        <div className="sticky left-14 z-10 flex-shrink-0 w-20 flex items-center justify-center bg-transparent">
          <div className="h-6 p-1 bg-[#ECECEC] rounded flex justify-center items-center"><NotStartedIcon /></div>
        </div>
        {/* 3: Reference (conditional shadow, transparent bg) */}
        <div className="sticky z-30 flex-shrink-0 w-48 py-3 px-2 flex items-center bg-transparent truncate relative" style={{ left: '8.5rem' }}>
          <span>{ref || `${code} ${suffix || ''}`}</span>
          {showEdgeShadow && (
            <>
              {/* Left-side mask stretching to the sidebar's left edge */}
              <div className="absolute top-0 bottom-0 left-[-100vw] right-full bg-[#F5F5F5] pointer-events-none z-30" />
              <div className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none z-30" style={{ boxShadow: 'inset -10px 0 8px -8px rgba(0,0,0,0.12)' }} />
            </>
          )}
        </div>
        {/* Non-sticky columns */}
        <div className="flex-shrink-0 w-40 py-3 px-2 flex items-center truncate"><span>-</span></div>
        <div className="flex-shrink-0 w-40 py-3 px-2 flex items-center truncate"><span>-</span></div>
        <div className="flex-shrink-0 w-32 py-3 px-2 flex items-center truncate"><span>-</span></div>
        <div className="flex-shrink-0 w-32 py-3 px-2 flex items-center truncate"><span>-</span></div>
        <div className="flex-shrink-0 w-32 py-3 px-2 flex items-center truncate"><span>-</span></div>
        <div className="flex-shrink-0 w-32 py-3 px-2 flex items-center truncate"><span>-</span></div>
        <div className="flex-shrink-0 w-32 py-3 px-2 flex items-center truncate"><span>-</span></div>
      </div>
    </div>
  );
};

const RecordGroup = ({ title, color, isPending, items, activeRecordId, onRecordClick, isExpanded, showEdgeShadow }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
    <div>
      <div className="sticky top-[36px] z-10 bg-transparent py-2">
        <div className="flex items-center w-full overflow-hidden">
          <div className="sticky left-0 flex items-center gap-2 pl-4 bg-transparent z-10 flex-shrink-0">
            <div className={`w-2 h-2 rounded-full ${isPending ? 'border border-[#FF7133]' : ''}`} style={{ backgroundColor: color }} />
            <span className="text-[#5C5A59] text-sm font-medium leading-5 tracking-[0.1px]">{title}</span>
          </div>
          <div className="flex-1 min-w-0 border-b border-dashed border-[#ADACA7] mx-2" />
          <button onClick={() => setIsOpen(!isOpen)} className="sticky right-0 p-1 bg-transparent z-10 pr-4">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
      </div>
            {isOpen && (
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const active = String(item.id) === String(activeRecordId);
            const onClick = () => onRecordClick(item.id);
            return isExpanded ? (
              <ExpandedRecordRow key={item.id} item={item} active={active} onClick={onClick} showEdgeShadow={showEdgeShadow} />
            ) : (
              <CollapsedRecordItem key={item.id} item={item} active={active} onClick={onClick} />
            );
          })}
                </div>
            )}
        </div>
    );
};

const Sidebar = ({ activeRecord, setActiveRecord, recordData, className = '' }) => {
  // Normalize incoming data to groups
  const groups = [
    { key: 'fon', title: 'Moved to FON', color: '#216270', isPending: false },
    { key: 'pending', title: 'Pending FON Move', color: '#FFC8B0', isPending: true },
    { key: 'ust', title: 'With UST', color: '#FFC8B0', isPending: true },
    { key: 'rejected', title: 'Rejected', color: '#C02000', isPending: false },
  ];

  const list = groups.map(g => ({ ...g, items: recordData[g.key] || [] }));
  const totalRecords = list.reduce((sum, g) => sum + g.items.length, 0);

  const [isExpanded, setIsExpanded] = React.useState(false);
  const verticalScrollRef = React.useRef(null);
  const [showTopShadow, setShowTopShadow] = React.useState(false);
  const [showBottomShadow, setShowBottomShadow] = React.useState(true);

  const handleVerticalScroll = () => {
    const el = verticalScrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopShadow(scrollTop > 5);
    setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 5);
  };

  React.useEffect(() => {
    const v = verticalScrollRef.current;
    if (!v) return;
    v.addEventListener('scroll', handleVerticalScroll);
    handleVerticalScroll();
    return () => v.removeEventListener('scroll', handleVerticalScroll);
  }, [isExpanded]);

  // Track horizontal scrolling to show sticky reference shadow only when scrolled
  const horizontalScrollRef = React.useRef(null);
  const [showEdgeShadow, setShowEdgeShadow] = React.useState(false);

  React.useEffect(() => {
    const h = horizontalScrollRef.current;
    if (!h) return;
    const onScroll = () => setShowEdgeShadow(h.scrollLeft > 0);
    h.addEventListener('scroll', onScroll);
    onScroll();
    return () => h.removeEventListener('scroll', onScroll);
  }, [isExpanded]);

    return (
    <aside className={`flex flex-col self-stretch p-4 flex-none transition-all duration-300 ease-in-out ${isExpanded ? 'w-[1024px]' : 'w-[269px]'} ${className}`}>
      <div className={`flex h-full w-full flex-col justify-between overflow-hidden rounded-lg outline outline-[0.5px] outline-[#ADACA7] bg-transparent`}>
        {/* Header */}
        <div className="self-stretch p-4 flex flex-col justify-start items-start gap-4 border-b border-gray-200 bg-transparent">
          <div className="self-stretch flex justify-start items-center gap-4">
            <div className="px-2 py-1 bg-[#E9F0F2] rounded flex justify-center items-center">
              <span className="text-[#5C5A59] text-[11px] font-medium leading-4 tracking-[0.5px]">{totalRecords}</span>
            </div>
            <span className="flex-1 text-[#5C5A59] text-base font-medium leading-6 tracking-[0.15px]">Records</span>
            <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-full hover:bg-gray-100"><ToggleExpandIcon /></button>
          </div>
        </div>

        {/* Scrollable area */}
        <div className="relative flex-1 overflow-hidden">
          <div ref={verticalScrollRef} className="absolute inset-0 overflow-y-auto custom-scrollbar">
            {isExpanded ? (
              <div ref={horizontalScrollRef} className="overflow-x-auto custom-scrollbar-x">
                <div className="p-4 inline-block min-w-full">
                  <ExpandedHeader showEdgeShadow={showEdgeShadow} />
                  <div className="flex flex-col gap-4 mt-2">
                    {list.map(group => (
                      <RecordGroup key={group.key} {...group} activeRecordId={activeRecord} onRecordClick={setActiveRecord} isExpanded={isExpanded} showEdgeShadow={showEdgeShadow} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-4">
                {list.map(group => (
                  <div key={group.key}>
                    <div className="flex justify-between items-center py-2">
                      <div className="flex justify-start items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${group.isPending ? 'border border-[#FF7133]' : ''}`} style={{ backgroundColor: group.color }} />
                        <span className="text-[#5C5A59] text-sm font-medium leading-5 tracking-[0.1px]">{group.title}</span>
                        </div>
                      <button className="p-1"><ChevronUpIcon /></button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {group.items.map(item => (
                        <CollapsedRecordItem key={item.id} item={item} active={String(item.id) === String(activeRecord)} onClick={() => setActiveRecord(item.id)} />
                      ))}
                    </div>
                </div>
                ))}
              </div>
            )}
          </div>
          {/* Top/Bottom shadows for vertical scroll */}
          <div className={`absolute top-0 left-0 right-0 h-4 transition-opacity duration-300 pointer-events-none ${showTopShadow ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: 'inset 0 10px 8px -8px rgba(0,0,0,0.05)' }} />
          <div className={`absolute bottom-0 left-0 right-0 h-4 transition-opacity duration-300 pointer-events-none ${showBottomShadow ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: 'inset 0 -10px 8px -8px rgba(0,0,0,0.05)' }} />
        </div>

        {/* Footer */}
        <div className="self-stretch p-4 bg-white border-t border-gray-200">
          <span className="text-[#3C3C3C] text-xs font-medium leading-4 tracking-[0.5px]">{2} of {totalRecords} sub-tasks incomplete</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
