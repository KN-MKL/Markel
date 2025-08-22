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

// --- Record Item ---
// Simple status glyphs for collapsed rows (deterministic by id)
const EllipsisIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="12" r="1.5" fill="#3C3C3C"/>
    <circle cx="12" cy="12" r="1.5" fill="#3C3C3C"/>
    <circle cx="17.5" cy="12" r="1.5" fill="#3C3C3C"/>
  </svg>
);
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="7" width="2" height="10" rx="1" fill="#3C3C3C"/>
    <path d="M10 7L18 12L10 17V7Z" fill="#3C3C3C"/>
  </svg>
);
const MinusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8.5" stroke="#3C3C3C"/>
    <rect x="8" y="11" width="8" height="2" rx="1" fill="#3C3C3C"/>
  </svg>
);

const getCollapsedStatusIcon = (id) => {
  const n = Number(id) || 0;
  const idx = n % 3;
  if (idx === 0) return <EllipsisIcon />;
  if (idx === 1) return <PlayIcon />;
  return <MinusIcon />;
};

const RecordItem = ({ item, active, onRecordClick, isExpanded, showStickyShadow, isDuplicating, isSelected, onToggleSelect, showCollapsedStatus, forceCheckboxColumn = false }) => {
  const { id, ref: reference, code, type, suffix, majorClass, minorClass, class: klass, entity, limit, excess, underwriter } = item;

  if (isExpanded) {
    // When in selection mode (duplication flow reused), show checkbox column for all rows
    const showCheckboxColumn = isDuplicating || forceCheckboxColumn;
    return (
      <div className="relative">
        <div
          onClick={() => onRecordClick(id)}
          className={`w-full h-[52px] bg-[#FEFEFD] rounded-lg overflow-hidden flex items-stretch cursor-pointer transition-all duration-200 text-sm text-[#3C3C3C] ${
            active ? 'border border-[#807F7B] shadow-[0px_2px_16px_rgba(0,0,0,0.05)]' : 'border border-[#D9D9D6]'
          }`}
          role="button"
          tabIndex={0}
        >
          {/* Sticky Checkbox Column (only when duplicating and not the active row) */}
          {showCheckboxColumn && (
            <div className={`sticky left-0 flex-shrink-0 w-14 flex items-center justify-center bg-white rounded-l-lg z-10 relative`}>
              <div onClick={(e) => e.stopPropagation()} className="pl-1">
                <M3Checkbox compact checked={!!isSelected} onChange={() => onToggleSelect(item.id)} size={18} square borderWidth={2} uncheckedBorderColor="#807F7B" />
              </div>
            </div>
          )}
          {/* Active indicator rail aligned to sidebar edge */}
          {active && (
            <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-11 bg-[#3C3C3C] rounded-r-lg z-30 pointer-events-none" />
          )}
          {/* Sticky Status Column */}
          <div className={`sticky ${showCheckboxColumn ? 'left-14' : 'left-0'} flex-shrink-0 w-20 h-full flex items-center justify-center bg-[#FEFEFD] z-20`}>
            <div className="h-6 w-6 bg-[#ECECEC] rounded flex justify-center items-center">{getCollapsedStatusIcon(id)}</div>
          </div>
          {/* Sticky Reference Column */}
          <div className={`sticky ${showCheckboxColumn ? 'left-[8.5rem]' : 'left-[5rem]'} flex-shrink-0 w-40 h-full px-2 flex items-center truncate bg-[#FEFEFD] z-10 relative`}>
            <span>{reference || `${code || ''}${type || ''} ${suffix || ''}`}</span>
            {showStickyShadow && (
              <>
                {/* Illusion: fixed left padding pane to keep visual spacing when content scrolls */}
                <div className="absolute left-[-100vw] right-full bg-[#FEFEFD] pointer-events-none" style={{ top: '-12px', bottom: '-12px' }} />
                {/* Right-edge gradient only */}
                <div className="absolute right-0 pointer-events-none" style={{ top: '-12px', bottom: '-12px', width: '12px', background: 'linear-gradient(to right, rgba(0,0,0,0.14), rgba(0,0,0,0))' }} />
              </>
            )}
          </div>
          {/* Scrollable Columns (Categories should scroll) */}
          <div className="flex-shrink-0 w-40 h-full px-2 flex items-center truncate"><span>{majorClass || '-'}</span></div>
          <div className="flex-shrink-0 w-40 h-full px-2 flex items-center truncate"><span>{minorClass || '-'}</span></div>
          <div className="flex-shrink-0 w-32 h-full px-2 flex items-center truncate"><span>{klass || '-'}</span></div>
          <div className="flex-shrink-0 w-32 h-full px-2 flex items-center truncate"><span>{entity || '-'}</span></div>
          <div className="flex-shrink-0 w-32 h-full px-2 flex items-center truncate"><span>{limit || '-'}</span></div>
          <div className="flex-shrink-0 w-32 h-full px-2 flex items-center truncate"><span>{excess || '-'}</span></div>
          <div className="flex-shrink-0 w-32 h-full px-2 flex items-center truncate"><span>{underwriter || '-'}</span></div>
        </div>
      </div>
    );
  }

  // Collapsed
  return (
    <div
      onClick={() => { if (!isDuplicating) onRecordClick(id); }}
      className={`relative w-full bg-white rounded-lg flex items-center cursor-pointer transition-all duration-200 h-12 ${
        active ? 'border border-[#807F7B] shadow-[0px_2px_16px_rgba(0,0,0,0.05)]' : 'border border-[#D9D9D6]'
      }`}
      role="button"
      tabIndex={0}
    >
      {active && <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-10 bg-[#3C3C3C] rounded-r-lg" />}
      {isDuplicating && (
        <div className="w-10 pl-4 h-full flex flex-col justify-center items-start" onClick={(e) => e.stopPropagation()}>
          <M3Checkbox compact checked={!!isSelected} onChange={() => onToggleSelect(id)} size={18} square borderWidth={2} uncheckedBorderColor="#807F7B" />
        </div>
      )}
      {showCollapsedStatus && (
        <div className={`w-10 ${isDuplicating ? 'pl-2' : 'pl-4'} h-full flex items-center justify-start`} onClick={(e) => e.stopPropagation()}>
          <div className="h-6 w-6 bg-[#ECECEC] rounded flex items-center justify-center">
            {getCollapsedStatusIcon(id)}
          </div>
        </div>
      )}
      <div className={`flex-1 self-stretch ${isDuplicating ? 'px-2' : 'pl-4 pr-4'} flex flex-col justify-center items-start`}>
        <div className="flex justify-start items-center text-[#3C3C3C] text-sm font-normal leading-5 tracking-[0.25px]">
          <span>{reference || code}</span>
          {type && <div className="px-1 py-0.5 mx-1 border-b border-[#807F7B]"><span>{type}</span></div>}
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
const ExpandedHeader = ({ showStickyShadow, showCheckboxColumn = false, selectAllEnabled = false, selectAllChecked = false, onToggleSelectAll }) => (
  <div className="sticky top-0 z-20 flex w-full text-[14px] text-[#5C5A59] font-medium leading-5 tracking-[0.1px] bg-[#F0F0F0] py-2 rounded-t-lg">
    {/* Sticky checkbox header (imaginary space or actual select-all) */}
    {showCheckboxColumn && (
      <div className="sticky left-0 flex-shrink-0 w-14 bg-[#F0F0F0] z-10 flex items-center justify-center">
        {selectAllEnabled ? (
          <div className="pl-1">
            <M3Checkbox compact checked={!!selectAllChecked} indeterminate={!selectAllChecked && typeof selectAllChecked !== 'undefined'} onChange={onToggleSelectAll} size={18} square borderWidth={2} uncheckedBorderColor="#807F7B" />
          </div>
        ) : null}
      </div>
    )}
    {/* Sticky Status Header */}
    <div className={`sticky ${showCheckboxColumn ? 'left-14' : 'left-0'} flex-shrink-0 w-20 flex items-center justify-center bg-[#F0F0F0] z-20`}>Status</div>
    {/* Sticky Reference Header */}
    <div className={`sticky ${showCheckboxColumn ? 'left-[8.5rem]' : 'left-[5rem]'} flex-shrink-0 w-40 px-2 bg-[#F0F0F0] z-10 relative`}>
      Reference
      {showStickyShadow && (
        <>
          <div className="absolute left-[-100vw] right-full bg-[#F0F0F0] pointer-events-none" style={{ top: '-8px', bottom: '-8px' }} />
          <div className="absolute right-0 pointer-events-none" style={{ top: '-8px', bottom: '-8px', width: '12px', background: 'linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0))' }} />
        </>
      )}
    </div>
    {/* Scrollable Headers */}
    <div className="flex-shrink-0 w-40 px-2 bg-[#F0F0F0]">Major Class</div>
    <div className="flex-shrink-0 w-40 px-2 bg-[#F0F0F0]">Minor Class</div>
    <div className="flex-shrink-0 w-32 px-2 bg-[#F0F0F0]">Class</div>
    <div className="flex-shrink-0 w-32 px-2 bg-[#F0F0F0]">Entity</div>
    <div className="flex-shrink-0 w-32 px-2 bg-[#F0F0F0]">Limit</div>
    <div className="flex-shrink-0 w-32 px-2 bg-[#F0F0F0]">Excess</div>
    <div className="flex-shrink-0 w-32 px-2 bg-[#F0F0F0]">Underwriter</div>
  </div>
);

// (Legacy ExpandedRecordRow removed; unified in RecordItem)

const RecordGroup = ({ title, color, isPending, items, activeRecordId, onRecordClick, isExpanded, showStickyShadow, isDuplicating, selectedIds, toggleSelect, showCollapsedStatus }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div>
      <div className="py-2">
        <div className="flex items-center w-full overflow-hidden">
          <div className="sticky left-0 flex items-center gap-2 pl-4 bg-transparent z-10 flex-shrink-0">
            <div className={`w-2 h-2 rounded-full ${isPending ? 'border border-[#FF7133]' : ''}`} style={{ backgroundColor: color }} />
            <span className="text-[#5C5A59] text-sm font-medium leading-5 tracking-[0.1px]">{title}</span>
                </div>
          <div className="flex-1 min-w-0 border-b border-dashed border-[#ADACA7] mx-2"></div>
          <button onClick={() => setIsOpen(!isOpen)} className="sticky right-0 p-1 bg-transparent z-10 pr-4">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
        </div>
            </div>
            {isOpen && (
        <div className="flex flex-col gap-2 mt-3 pt-1">
          {items.map((item) => (
            <RecordItem
              key={item.id}
              item={item}
              active={String(item.id) === String(activeRecordId)}
              onRecordClick={onRecordClick}
              isExpanded={isExpanded}
              showStickyShadow={showStickyShadow}
              isDuplicating={isDuplicating}
              isSelected={selectedIds?.has(item.id)}
              onToggleSelect={toggleSelect}
              showCollapsedStatus={!isExpanded && showCollapsedStatus}
            />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Sidebar ---
const Sidebar = ({ activeRecord, setActiveRecord, recordData, className = '', expandTrigger, disableDuplicationSelection = false, forceExpanded = false, hideExpandButton = false, flattenGroups = false, showSelectionActionBar = true, showStatusRail = false, enableCollapsedStatusGlyphs = false, showReviewFooter = false, onFinalizeDuplication, showCheckboxColumnAlways = false, panelOverride = null, hideHeaders = false, customBackground = null, customPadding = null, hideSelectionCount = false }) => {
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
  const expanded = forceExpanded || isExpanded;
  const [isDuplicating, setIsDuplicating] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState(new Set());
  const [toast, setToast] = React.useState({ visible: false, count: 0, animateOut: false });
  const [showDupHint, setShowDupHint] = React.useState(false);
  const [selectedStatusKey, setSelectedStatusKey] = React.useState('all');

  // Handle external trigger (Duplicate Binding Data button)
  // First click -> enter duplication mode. Next click -> complete duplication and show toast.
  React.useEffect(() => {
    if (!expandTrigger) return;
    if (disableDuplicationSelection) return; // FS v2: do not reveal selection checkboxes
    if (isDuplicating) {
      const count = selectedIds.size;
      setIsDuplicating(false);
      if (count > 0) {
        setToast({ visible: true, count, animateOut: false });
      }
      setSelectedIds(new Set());
    } else {
      setIsDuplicating(true);
      setSelectedIds(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandTrigger]);
  // When expanded, occupy full available width so the right content is hidden
  const expandedWidth = '100%';
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
  }, [expanded]);

  // Track horizontal scrolling for sticky reference shadow
  const horizontalScrollRef = React.useRef(null);
  const headerHorizontalScrollRef = React.useRef(null);
  const [showStickyShadow, setShowStickyShadow] = React.useState(false);

  React.useEffect(() => {
    const h = horizontalScrollRef.current;
    if (!h) return;
    const onScroll = () => setShowStickyShadow(h.scrollLeft > 2);
    h.addEventListener('scroll', onScroll);
    onScroll();
    return () => h.removeEventListener('scroll', onScroll);
  }, [expanded]);

  // Keep sticky header's horizontal position in sync with body scroll
  React.useEffect(() => {
    const body = horizontalScrollRef.current;
    const head = headerHorizontalScrollRef.current;
    if (!body || !head) return;
    const sync = () => {
      head.scrollLeft = body.scrollLeft;
    };
    body.addEventListener('scroll', sync);
    sync();
    return () => body.removeEventListener('scroll', sync);
  }, [expanded]);

  // Auto-dismiss toast with slide-left animation
  React.useEffect(() => {
    if (!toast.visible) return;
    const t1 = setTimeout(() => setToast(prev => ({ ...prev, animateOut: true })), 2500);
    const t2 = setTimeout(() => setToast({ visible: false, count: 0, animateOut: false }), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [toast.visible]);

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const flattenedItems = React.useMemo(() => list.flatMap(g => g.items), [list]);
  const displayItems = React.useMemo(() => (
    flattenGroups
      ? (selectedStatusKey === 'all'
          ? flattenedItems
          : (list.find(g => g.key === selectedStatusKey)?.items || []))
      : null
  ), [flattenGroups, flattenedItems, list, selectedStatusKey]);

  const StatusRail = () => (
    <div className="flex-shrink-0 w-40 p-4 pr-2">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setSelectedStatusKey('all')}
          className={`text-sm text-left rounded px-3 py-2 ${selectedStatusKey === 'all' ? 'bg-[#E9F0F2] text-[#216270]' : 'hover:bg-gray-100 text-[#3C3C3C]'}`}
        >
          All ({flattenedItems.length})
        </button>
        {list.map(g => (
          <button
            key={g.key}
            onClick={() => setSelectedStatusKey(g.key)}
            className={`text-sm text-left rounded px-3 py-2 flex items-center gap-2 ${selectedStatusKey === g.key ? 'bg-[#E9F0F2] text-[#216270]' : 'hover:bg-gray-100 text-[#3C3C3C]'}`}
          >
            <span className={`inline-block w-2 h-2 rounded-full ${g.isPending ? 'border border-[#FF7133]' : ''}`} style={{ backgroundColor: g.color }} />
            <span className="flex-1 truncate">{g.title}</span>
            <span className="text-xs text-[#5C5A59]">{g.items.length}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Whether to show collapsed status glyphs for the current mode (only when explicitly enabled)
  const showCollapsedStatusGlyphs = enableCollapsedStatusGlyphs && !expanded;

    return (
    <aside
      className={`flex flex-col self-stretch ${customPadding || 'p-4'} flex-none transition-all duration-300 ease-in-out ${className}`}
      style={{ width: expanded ? expandedWidth : '312px' }}
    >
      <div className={`flex h-full w-full flex-col justify-between overflow-hidden rounded-lg outline outline-[0.5px] outline-[#ADACA7] ${customBackground || 'bg-transparent'}`}>
        {/* Header */}
        {!hideHeaders && (
          <div className="self-stretch p-4 flex flex-col justify-start items-start gap-4 border-b border-gray-200 bg-transparent">
          <div className="self-stretch flex justify-start items-center gap-4">
            <div className="px-2 py-1 bg-[#E9F0F2] rounded flex justify-center items-center">
              <span className="text-[#5C5A59] text-[11px] font-medium leading-4 tracking-[0.5px]">{totalRecords}</span>
            </div>
            <span className="flex-1 text-[#5C5A59] text-base font-medium leading-6 tracking-[0.15px]">Records</span>
            {!hideExpandButton && (
            <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 rounded-full hover:bg-gray-100"><ToggleExpandIcon /></button>
            )}
                        </div>
            {/* Tooltip removed per request */}
                    </div>
        )}

        {/* Scrollable area */}
        <div className="relative flex-1">
          <div ref={verticalScrollRef} className="absolute inset-0 overflow-y-auto custom-scrollbar">
            {expanded ? (
              <div className="flex w-full">
                {showStatusRail && !panelOverride && <StatusRail />}
                <div className="flex-1 min-w-0">
                  {/* Sticky header synced with horizontal scroll */}
                  {!panelOverride && (
                  <div className="sticky top-0 z-30 bg-[#F0F0F0]">
                    <div ref={headerHorizontalScrollRef} className="overflow-x-hidden">
                      <div className="p-4 inline-block min-w-full">
                        <ExpandedHeader
                          showStickyShadow={showStickyShadow}
                          showCheckboxColumn={isDuplicating || showCheckboxColumnAlways}
                          selectAllEnabled={showCheckboxColumnAlways}
                          selectAllChecked={selectedIds.size === (flattenGroups ? displayItems.length : totalRecords) && selectedIds.size > 0}
                          onToggleSelectAll={() => {
                            const items = flattenGroups ? displayItems : list.flatMap(g => g.items);
                            const allIds = new Set(items.map(i => i.id));
                            const allSelected = selectedIds.size === allIds.size;
                            setSelectedIds(allSelected ? new Set() : allIds);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  )}
              <div ref={horizontalScrollRef} className="overflow-x-auto custom-scrollbar-x">
                <div className="p-4 inline-block min-w-full">
                      {panelOverride ? (
                        <div className="mt-2">{panelOverride}</div>
                      ) : (
                  <div className="flex flex-col gap-4 mt-2">
                        {flattenGroups
                          ? displayItems.map(item => (
                              <RecordItem
                                key={item.id}
                                item={item}
                                active={String(item.id) === String(activeRecord)}
                                onRecordClick={setActiveRecord}
                                isExpanded={true}
                                showStickyShadow={showStickyShadow}
                                isDuplicating={isDuplicating}
                                isSelected={selectedIds?.has(item.id)}
                                onToggleSelect={toggleSelect}
                                showCollapsedStatus={false}
                                forceCheckboxColumn={showCheckboxColumnAlways}
                              />
                            ))
                      : list.map(group => (
                      <RecordGroup
                        key={group.key}
                        title={group.title}
                        color={group.color}
                        isPending={group.isPending}
                        items={group.items}
                        activeRecordId={activeRecord}
                        onRecordClick={setActiveRecord}
                                isExpanded={expanded}
                        showStickyShadow={showStickyShadow}
                        isDuplicating={isDuplicating}
                        selectedIds={selectedIds}
                        toggleSelect={toggleSelect}
                            showCollapsedStatus={showCollapsedStatusGlyphs}
                      />
                    ))}
                      </div>
                      )}
                    </div>
                    </div>
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-4">
                {flattenGroups
                  ? list.flatMap(g => g.items).map(item => (
                      <RecordItem
                        key={item.id}
                        item={item}
                        active={String(item.id) === String(activeRecord)}
                        onRecordClick={setActiveRecord}
                        isExpanded={false}
                        showStickyShadow={false}
                        isDuplicating={isDuplicating}
                        isSelected={selectedIds?.has(item.id)}
                        onToggleSelect={toggleSelect}
                        showCollapsedStatus
                        forceCheckboxColumn={showCheckboxColumnAlways}
                      />
                    ))
                  : list.map(group => (
                  <RecordGroup
                    key={group.key}
                    title={group.title}
                    color={group.color}
                    isPending={group.isPending}
                    items={group.items}
                    activeRecordId={activeRecord}
                    onRecordClick={setActiveRecord}
                    isExpanded={false}
                    showStickyShadow={false}
                    isDuplicating={isDuplicating}
                    selectedIds={selectedIds}
                    toggleSelect={toggleSelect}
                        showCollapsedStatus={showCollapsedStatusGlyphs}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Top/Bottom shadows for vertical scroll */}
          <div className={`absolute top-0 left-0 right-0 h-4 transition-opacity duration-300 pointer-events-none ${showTopShadow ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: 'inset 0 18px 12px -12px rgba(0,0,0,0.14)' }} />
          <div className={`absolute bottom-0 left-0 right-0 h-4 transition-opacity duration-300 pointer-events-none ${showBottomShadow ? 'opacity-100' : 'opacity-0'}`} style={{ boxShadow: 'inset 0 -18px 12px -12px rgba(0,0,0,0.14)' }} />
        </div>

        {/* Footer */}
        {showReviewFooter ? (
          <div className="self-stretch p-4 bg-white border-t border-gray-200 flex items-center justify-end">
            {!hideSelectionCount && <span className="text-[#3C3C3C] text-xs font-medium leading-4 tracking-[0.5px]">{selectedIds.size} of {totalRecords} records selected</span>}
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-[#3C3C3C] px-4 py-2 text-sm font-medium text-white hover:bg-[#2e2e2e] active:bg-black"
              onClick={() => (onFinalizeDuplication ? onFinalizeDuplication(Array.from(selectedIds)) : console.log('Proceed to Select Records', Array.from(selectedIds)))}
            >
              <span>Proceed to Select Records</span>
            </button>
          </div>
        ) : (
        <div className="self-stretch p-4 bg-white border-t border-gray-200 flex items-center justify-start">
          <span className="text-[#3C3C3C] text-xs font-medium leading-4 tracking-[0.5px]">{2} of {totalRecords} sub-tasks incomplete</span>
        </div>
        )}
        {/* Selection action bar (inside panel) */}
        {isExpanded && isDuplicating && showSelectionActionBar && (
          <div className="self-stretch px-4 pb-4">
            <div className="flex items-center justify-between rounded-b-lg border-x border-b border-[#D9D9D6] bg-white px-4 py-3">
              <div className="text-[#3C3C3C] text-[12px] font-medium leading-4 tracking-[0.5px]">
                {selectedIds.size} of {totalRecords} Records selected to move to FON
              </div>
              <button
                className="inline-flex items-center gap-2 rounded-lg bg-[#3C3C3C] px-4 py-2 text-sm font-medium text-white hover:bg-[#2e2e2e] active:bg-black"
                onClick={() => console.log('Move to FON clicked', Array.from(selectedIds))}
              >
                <span>Move to FON</span>
              </button>
            </div>
          </div>
        )}
        {toast.visible && (
          <div className={`fixed left-4 bottom-4 z-50 transition-transform duration-500 ease-out ${toast.animateOut ? '-translate-x-[120%]' : 'translate-x-0'}`}>
            <div className="inline-flex items-center justify-start bg-[#322F35] text-[#FBFBFB] rounded shadow-[0_1px_3px_rgba(0,0,0,0.30)]" style={{ paddingLeft: 16 }}>
              <div className="py-3 pr-2 text-sm tracking-[0.25px]">Data successfully duplicated to {toast.count} records.</div>
              <button
                className="w-12 h-12 inline-flex items-center justify-center"
                onClick={() => {
                  setToast(prev => ({ ...prev, animateOut: true }));
                  setTimeout(() => setToast({ visible: false, count: 0, animateOut: false }), 300);
                }}
                aria-label="Close notification"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#FFAE8A"/>
                </svg>
              </button>
            </div>
          </div>
        )}
            </div>
        </aside>
    );
};

export default Sidebar;