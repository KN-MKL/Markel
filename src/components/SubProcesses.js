import React from 'react';
import M3Checkbox from './M3Checkbox';
import Icon from './Icon';
import DiaryChip from './DiaryChip';

// --- Sub Tasks helper UI ---
// Renders status tokens/icons matching the provided SVG set
const StatusToken = ({ stage }) => {
  switch (stage) {
    case 'not-started':
      return (
        <div className="h-6 w-6 rounded bg-[#ECECEC] flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-[#3C3C3C]" />
        </div>
      );
    case 'not-applicable':
      return (
        <div className="h-6 w-6 rounded bg-[#ECECEC] flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-[#3C3C3C]" />
            <div className="absolute w-[7.5px] h-[1.5px] bg-[#3C3C3C]" />
          </div>
        </div>
      );
    case 'in-progress':
    case 'model-priced':
    case 'manually-priced':
      return (
        <div className="h-6 w-6 rounded bg-[#FFEDE6] flex items-center justify-center">
          <div className="flex items-center gap-[1px]">
            <div className="w-[3px] h-[3px] rounded-full bg-[#6B2100]" />
            <div className="w-[3px] h-[3px] rounded-full bg-[#6B2100]" />
            <div className="w-[3px] h-[3px] rounded-full bg-[#6B2100]" />
          </div>
        </div>
      );
    case 'queried':
      return (
        <div className="h-6 w-6 rounded bg-[#FFEDE6] flex items-center justify-center">
          <svg width="8" height="12" viewBox="0 0 2 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.99975 9.03858C0.787083 9.03858 0.609 8.96666 0.4655 8.82283C0.321833 8.67916 0.25 8.50108 0.25 8.28858V1.28857C0.25 1.07607 0.321917 0.897907 0.46575 0.754074C0.609583 0.610407 0.78775 0.538574 1.00025 0.538574C1.21292 0.538574 1.391 0.610407 1.5345 0.754074C1.67817 0.897907 1.75 1.07607 1.75 1.28857V8.28858C1.75 8.50108 1.67808 8.67916 1.53425 8.82283C1.39042 8.96666 1.21225 9.03858 0.99975 9.03858ZM0.99975 13.4616C0.787083 13.4616 0.609 13.3897 0.4655 13.2458C0.321833 13.102 0.25 12.9238 0.25 12.7113C0.25 12.4987 0.321917 12.3206 0.46575 12.1771C0.609583 12.0334 0.78775 11.9616 1.00025 11.9616C1.21292 11.9616 1.391 12.0335 1.5345 12.1773C1.67817 12.3212 1.75 12.4993 1.75 12.7118C1.75 12.9245 1.67808 13.1026 1.53425 13.2461C1.39042 13.3897 1.21225 13.4616 0.99975 13.4616Z" fill="#6B2100" />
          </svg>
        </div>
      );
    case 'accepted':
    case 'passed':
      return (
        <div className="h-6 w-6 rounded bg-[#E9F0F2] flex items-center justify-center">
          <svg width="14" height="11" viewBox="0 0 14 11" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.54999 8.51545L12.4814 0.584052C12.6301 0.435219 12.8041 0.359219 13.0034 0.356052C13.2027 0.352885 13.38 0.428885 13.5351 0.584052C13.6903 0.739219 13.7679 0.917385 13.7679 1.11855C13.7679 1.31989 13.6903 1.49813 13.5351 1.6533L5.18274 10.0212C5.00191 10.2019 4.79099 10.2922 4.54999 10.2922C4.30899 10.2922 4.09808 10.2019 3.91724 10.0212L0.449349 6.5533C0.300682 6.40447 0.227349 6.2278 0.229349 6.0233C0.231182 5.81897 0.309682 5.63922 0.464849 5.48405C0.620016 5.32888 0.798182 5.2513 0.999349 5.2513C1.20068 5.2513 1.37893 5.32888 1.5341 5.48405L4.54999 8.51545Z" fill="#3C3C3C"/>
          </svg>
        </div>
      );
    case 'declined':
    case 'rejected':
    case 'failed':
      return (
        <div className="h-6 w-6 rounded bg-[#FBE9E6] flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.99998 6.05386L1.3412 9.71289C1.2027 9.85123 1.02861 9.92206 0.818946 9.92539C0.609446 9.92856 0.432196 9.85773 0.287196 9.71289C0.142363 9.56789 0.0699463 9.39223 0.0699463 9.18589C0.0699463 8.97956 0.142363 8.80389 0.287196 8.65889L3.94623 5.00011L0.287196 1.34132C0.148863 1.20282 0.0780298 1.02874 0.0746965 0.819069C0.0715298 0.609569 0.142363 0.432318 0.287196 0.287318C0.432196 0.142485 0.607863 0.0700684 0.814196 0.0700684C1.02053 0.0700684 1.1962 0.142485 1.3412 0.287318L4.99998 3.94636L8.65877 0.287318C8.79727 0.148985 8.97135 0.0781518 9.18102 0.0748185C9.39052 0.0716518 9.56777 0.142485 9.71277 0.287318C9.8576 0.432318 9.93002 0.607985 9.93002 0.814319C9.93002 1.02065 9.8576 1.19632 9.71277 1.34132L6.05373 5.00011L9.71277 8.65889C9.8511 8.79739 9.92194 8.97148 9.92527 9.18114C9.92844 9.39064 9.8576 9.56789 9.71277 9.71289C9.56777 9.85773 9.3921 9.93014 9.18577 9.93014C8.97944 9.93014 8.80377 9.85773 8.65877 9.71289L4.99998 6.05386Z" fill="#C02000"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className="h-6 w-6 rounded bg-[#ECECEC] flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-[#3C3C3C]" />
        </div>
      );
  }
};

const AbPill = () => (
  <div className="w-6 h-6 rounded-full bg-[#BBD1D6] flex items-center justify-center">
    <span className="text-[11px] leading-4 font-medium tracking-[0.5px] text-[#0F2D34]">AB</span>
  </div>
);

const TaskRow = ({ title, diary, stage, isFirst, isLast }) => {
  const borderClasses = isFirst
    ? 'rounded-t-lg border border-[#D9D9D6] border-b-0'
    : isLast
    ? 'rounded-b-lg border border-[#D9D9D6]'
    : 'border-x border-t border-[#D9D9D6]';
  return (
    <div className={`h-[52px] bg-white overflow-hidden ${borderClasses} grid grid-cols-[48px_1fr_auto] items-center w-full`}>
      <div className="pl-4">
        <StatusToken stage={stage} />
      </div>
      <div className="flex items-center pr-2 min-w-0 gap-4">
        <span className="text-[#3C3C3C] text-[14px] leading-5">{title}</span>
      </div>
      <div className="pr-4 flex items-center justify-end gap-2">
        <DiaryChip label={diary} />
        <AbPill />
      </div>
    </div>
  );
};

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded bg-[#F1F0EE] text-[#5C5A59] text-[10px] font-medium px-2 py-0.5">{children}</span>
);

const Badge = ({ children }) => (
  <div className="relative inline-flex">
    <span className="inline-flex items-center justify-center rounded bg-[#FFEDE6] text-[#6B2100] text-[11px] font-medium leading-4 tracking-[0.5px] px-2 py-1">{children}</span>
    <span className="absolute -left-1 -top-1 w-2 h-2 bg-[#E84700] rounded-full" />
  </div>
);

const Step = ({ index, title, active, onClick }) => (
  <div
    className={`relative flex bg-white rounded-lg items-center justify-between cursor-pointer transition-all duration-200 h-[52px] px-4 w-[240px] self-start ${
      active ? 'border border-[#807F7B] shadow-[0px_2px_16px_rgba(0,0,0,0.05)]' : 'border border-[#D9D9D6]'
    }`}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    {active && (
      <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-11 bg-[#3C3C3C] rounded-r-lg" />
    )}
    <div className="flex items-center gap-3">
      <Badge>{index}</Badge>
      <span className="text-[#3C3C3C] text-sm leading-5 tracking-[0.25px]">{title}</span>
    </div>
    {active && (
      <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F1F2F4]">
        <Icon iconName="arrowRightFilled" />
      </div>
    )}
  </div>
);

const TableStatusIcon = ({ status }) => {
  return (
    <div className="flex items-center justify-center w-6 h-6">
      <StatusToken stage={status} />
    </div>
  );
};

const RecordRow = ({ refId }) => (
  <div className="grid grid-cols-[160px_repeat(6,minmax(72px,1fr))] min-w-[592px] items-center rounded-lg border border-[#D9D9D6] bg-[#FEFEFD] h-[52px] px-2">
    <div className="text-[14px] leading-5 tracking-[0.25px] text-[#3C3C3C]">{refId}</div>
    {['accepted', 'accepted', 'accepted', 'rejected', 'accepted', 'accepted'].map((s, i) => (
      <div key={i} className="flex items-center justify-center"><TableStatusIcon status={s} /></div>
    ))}
  </div>
);

const SubProcesses = ({ onOpenFrontSheet, records = [], activeRecord }) => {
  const [activeStep, setActiveStep] = React.useState('Pre-Bind Checks');
  const toDoCount = 7; // placeholder counts
  const totalCount = 10;
  return (
    <div className="w-full h-full flex-1 min-h-0 overflow-hidden flex flex-col">
      {/* Custom header as per design */}
      <div className="w-full border border-[#D9D9D6] border-b-0 bg-white px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-[22px] leading-7 font-medium text-[#3C3C3C]">Section Sub-processes</h1>
            <div className="rounded outline outline-[0.5px] outline-[#D9D9D6] flex items-center gap-2 px-0.5 py-0.5">
              <div className="flex items-center gap-2 bg-[#E9F0F2] rounded px-2 py-1">
                <span className="text-[#216270] text-sm font-medium tracking-[0.1px]">ID</span>
                <div className="bg-[#FDFDFC] rounded px-2 py-1 flex items-center gap-1">
                  <span className="text-[#5C5A59] text-[12px] font-medium tracking-[0.5px]">{activeRecord?.ref?.slice(0,6) || 'CF9571'}</span>
                  <span className="border-b border-[#807F7B] text-[#5C5A59] text-[12px] font-medium tracking-[0.5px]">A</span>
                  <span className="text-[#5C5A59] text-[12px] font-medium tracking-[0.5px]">20MABp</span>
                </div>
              </div>
            </div>
            <div className="bg-[#FFEDE6] rounded px-2.5 py-1">
              <span className="text-[#5C5A59] text-sm font-medium tracking-[0.1px]">{toDoCount} of {totalCount} to do</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 ml-4">
            <button className="bg-[#3C3C3C] text-white rounded-md border border-[#C4C4C4] px-2 py-1 text-[12px] leading-4">All</button>
            <button className="bg-white text-[#3C3C3C] rounded-md border border-[#C4C4C4] px-2 py-1 text-[12px] leading-4">To do</button>
            <button className="bg-white text-[#3C3C3C] rounded-md border border-[#C4C4C4] px-2 py-1 text-[12px] leading-4">Done</button>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center" aria-label="Close">
          <Icon iconName="close" />
        </button>
      </div>

        <div className="grid grid-cols-[auto_1fr] gap-6 flex-1 min-h-0 p-4 overflow-hidden h-full">
        {/* Left: Sub Tasks */}
        <aside className="flex flex-col h-full min-h-0">
          <div className="flex items-center justify-between px-4 pt-2 pb-3">
            <h2 className="text-[#5C5A59] text-[20px] font-medium leading-6 tracking-[0.15px]">Sub Tasks</h2>
            <button className="rounded-md p-2" aria-label="Tasks menu">
              <Icon iconName="sidebarToggle" />
            </button>
          </div>
            <div className="flex-1 overflow-y-auto pl-0 pr-2">
            <div className="flex flex-col rounded-xl border border-[#D9D9D6] bg-white overflow-hidden">
              {[
                { title: 'Bind Risk', diary: 'Finance', stage: 'accepted' },
                { title: 'Minimum Data Checks', diary: 'Energy', stage: 'in-progress' },
                { title: 'PBQA Check', diary: 'Marine', stage: 'rejected' },
                { title: 'Risk Appetite', diary: 'Underwriting', stage: 'queried' },
                { title: 'Risk Reference Generation', diary: 'Compliance', stage: 'not-started' },
                { title: 'Sanctions Checks', diary: 'Compliance', stage: 'not-applicable' },
                { title: 'TOBA Checks', diary: 'Claims', stage: 'passed' },
                { title: 'Clearance Checks', diary: 'Cyber', stage: 'declined' },
                { title: 'Pricing', diary: 'Pricing', stage: 'manually-priced' }
              ].map((t, i, arr) => (
                <TaskRow key={i} {...t} isFirst={i === 0} isLast={i === arr.length - 1} />
              ))}
            </div>
          </div>
        </aside>

        {/* Right: Main columns */}
        <div className="grid grid-cols-[auto_1fr] gap-4 h-full">
          {/* Middle column */}
          <section className="flex flex-col h-full min-h-0 rounded-lg border border-[#E4E3DF] bg-white p-4 w-full justify-self-start">
            <h3 className="text-[#3C3C3C] text-[16px] font-medium leading-6 tracking-[0.15px] mb-2">Bind Risk</h3>
            <div className="h-10 px-6 bg-[#F0F0F0] rounded flex items-center justify-center text-[#1C1C1C] text-sm font-medium w-full">Find Record</div>
            <div className="flex-1 min-h-0 overflow-y-auto mt-4">
              <div className="text-[#5C5A59] text-sm font-medium mb-1">Process Steps</div>
              <div className="text-[#686868] text-[12px] font-medium tracking-[0.5px] mb-2">Underwriter Workflow</div>
              <div className="flex flex-col gap-4 w-full">
                <Step index={7} title="Pre-Bind Checks" active={activeStep === 'Pre-Bind Checks'} onClick={() => setActiveStep('Pre-Bind Checks')} />
                <Step index={7} title="Ready for FON" active={activeStep === 'Ready for FON'} onClick={() => setActiveStep('Ready for FON')} />
                <Step index={7} title="Submit Front Sheet" active={activeStep === 'Submit Front Sheet'} onClick={() => setActiveStep('Submit Front Sheet')} />
              </div>
              <div className="text-[#686868] text-[12px] font-medium tracking-[0.5px] mt-6 mb-2">UST Binding Review</div>
              <div className="flex flex-col gap-4 w-full">
                <Step index={7} title="Under UST Review" active={activeStep === 'Under UST Review'} onClick={() => setActiveStep('Under UST Review')} />
                <Step index={7} title="Written" active={activeStep === 'Written'} onClick={() => setActiveStep('Written')} />
              </div>
            </div>
            <div className="pt-4 mt-auto">
              <button onClick={onOpenFrontSheet} className="rounded border border-[#D9D9D6] px-4 py-2 text-sm text-[#3C3C3C] hover:bg-gray-50 w-full">
                Open Front Sheet
              </button>
            </div>
          </section>

          {/* Right-most column - always show Pre-Bind Checks content; other steps no-op */}
          {
          <section className="flex flex-col gap-3 h-full min-h-0 rounded-lg border border-[#E4E3DF] bg-white p-4 overflow-hidden">
            {/* Pre-bind header block */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-[#3C3C3C] text-[16px] font-medium leading-6 tracking-[0.15px]">Pre-Bind Sub-Process Checks</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#9ABBC2]" />
                  <p className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">Complete required checks to proceed to FON.</p>
                </div>
              </div>
              <button className="p-1 rounded-lg hover:bg-[#F0F0F0]" aria-label="Expand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_expand)">
                    <path d="M6.30289 18.375C6.11082 18.375 5.94983 18.31 5.81991 18.1801C5.68997 18.0501 5.625 17.8891 5.625 17.6971V13.3125C5.625 13.1531 5.67893 13.0195 5.78679 12.9117C5.89466 12.8039 6.02831 12.75 6.18774 12.75C6.34719 12.75 6.48076 12.8039 6.58845 12.9117C6.69614 13.0195 6.74998 13.1531 6.74998 13.3125V16.4668L16.4668 6.74998H13.3125C13.1531 6.74998 13.0195 6.69605 12.9117 6.58819C12.8039 6.48034 12.75 6.34669 12.75 6.18724C12.75 6.0278 12.8039 5.89424 12.9117 5.78655C13.0195 5.67885 13.1531 5.625 13.3125 5.625H17.6971C17.8891 5.625 18.0501 5.68997 18.1801 5.81991C18.31 5.94983 18.375 6.11083 18.375 6.30289V10.6875C18.375 10.8469 18.321 10.9805 18.2132 11.0883C18.1053 11.1961 17.9717 11.25 17.8122 11.25C17.6528 11.25 17.5192 11.1961 17.4115 11.0883C17.3038 10.9805 17.25 10.8469 17.25 10.6875V7.53313L7.53313 17.25H10.6875C10.8469 17.25 10.9805 17.3039 11.0883 17.4118C11.1961 17.5196 11.25 17.6533 11.25 17.8127C11.25 17.9722 11.1961 18.1057 11.0883 18.2134C10.9805 18.3211 10.8469 18.375 10.6875 18.375H6.30289Z" fill="#3C3C3C"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_expand"><rect width="24" height="24" rx="12" fill="white"/></clipPath>
                  </defs>
                </svg>
              </button>
            </div>

            {/* Subjectivity Requirements card */}
            <div className="mt-4 bg-white rounded-lg p-4 outline outline-1 outline-[#D9D9D6]">
              <div className="flex items-end justify-between">
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Subjectivity Requirements</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.4898 8.99977C16.4898 13.1398 13.1398 16.4898 8.99977 16.4898C4.85977 16.4898 1.50977 13.1398 1.50977 8.99977C1.50977 4.85977 4.85977 1.50977 8.99977 1.50977C13.1398 1.50977 16.4898 4.85977 16.4898 8.99977Z" fill="#424242" stroke="#A39990" strokeLinejoin="bevel"/>
                      <path d="M8.46094 5.99992C8.46094 5.55992 8.48094 5.41992 9.00094 5.41992C9.52094 5.41992 9.53094 5.55992 9.53094 5.99992C9.53094 6.43992 9.51094 6.57992 9.00094 6.57992C8.49094 6.57992 8.46094 6.43992 8.46094 5.99992ZM8.49094 12.5799V7.43992H9.48094V12.5799H8.49094Z" fill="white"/>
                    </svg>
                  </div>
                  <p className="text-[#5C5A59] text-[14px] leading-5 tracking-[0.25px]">Check the box if all pre-bind subjectivities are met or not required.</p>
                </div>
                <div className="rounded-lg outline outline-1 outline-[#D9D9D6]">
                  <div className="px-3 pr-6 py-2 flex items-center gap-3">
                    <M3Checkbox compact checked={false} onChange={() => {}} />
                    <span className="text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px]">Yes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Record Checks container (fills remaining height) */}
            <div className="mt-4 flex-1 min-h-[500px]">
              <div className="h-full flex flex-col rounded-lg overflow-hidden outline outline-1 outline-[#D9D9D6]">
                {/* Header */}
                <div className="w-full bg-[#FEFEFD] px-4 py-3 rounded-t-lg flex items-center justify-between">
                  <div className="flex-1 overflow-hidden leading-5">
                    <div className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Policy Record Checks</div>
                    <div className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">Resolve all checks by clicking the status icons below to proceed to FON.</div>
                  </div>
                  <div className="p-1 bg-[#F0F0F0] rounded-lg">
                    <button className="h-10 bg-[#F0F0F0] rounded-lg overflow-hidden flex items-center justify-center px-3 py-2" aria-label="Options">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.99974 15.5625C8.84029 15.5625 8.70672 15.5086 8.59903 15.4007C8.49134 15.2929 8.4375 15.1594 8.4375 15V12C8.4375 11.8406 8.49143 11.707 8.59928 11.5992C8.70714 11.4914 8.84079 11.4375 9.00023 11.4375C9.15968 11.4375 9.29324 11.4914 9.40093 11.5992C9.50862 11.707 9.56246 11.8406 9.56246 12V12.9375H15C15.1594 12.9375 15.293 12.9914 15.4008 13.0993C15.5086 13.2071 15.5625 13.3408 15.5625 13.5002C15.5625 13.6597 15.5086 13.7932 15.4008 13.9009C15.293 14.0086 15.1594 14.0625 15 14.0625H9.56246V15C9.56246 15.1594 9.50854 15.2929 9.40069 15.4007C9.29283 15.5086 9.15918 15.5625 8.99974 15.5625ZM2.99998 14.0625C2.84061 14.0625 2.70702 14.0085 2.59922 13.9007C2.49141 13.7928 2.4375 13.6592 2.4375 13.4997C2.4375 13.3403 2.49141 13.2067 2.59922 13.099C2.70702 12.9913 2.84061 12.9375 2.99998 12.9375H5.99998C6.15936 12.9375 6.29294 12.9914 6.40074 13.0993C6.50856 13.2071 6.56246 13.3408 6.56246 13.5002C6.56246 13.6597 6.50856 13.7932 6.40074 13.9009C6.29294 14.0086 6.15936 14.0625 5.99998 14.0625H2.99998ZM5.99974 11.0625C5.84029 11.0625 5.70672 11.0086 5.59903 10.9007C5.49134 10.7929 5.4375 10.6594 5.4375 10.5V9.56246H2.99998C2.84061 9.56246 2.70702 9.50854 2.59922 9.40069C2.49141 9.29283 2.4375 9.15918 2.4375 8.99974C2.4375 8.84029 2.49141 8.70672 2.59922 8.59903C2.70702 8.49134 2.84061 8.4375 2.99998 8.4375H5.4375V7.49998C5.4375 7.34061 5.49143 7.20701 5.59928 7.0992C5.70714 6.9914 5.84079 6.9375 6.00023 6.9375C6.15968 6.9375 6.29324 6.9914 6.40093 7.0992C6.50862 7.20701 6.56246 7.34061 6.56246 7.49998V10.5C6.56246 10.6594 6.50854 10.7929 6.40069 10.9007C6.29283 11.0086 6.15917 11.0625 5.99974 11.0625ZM8.99998 9.56246C8.84061 9.56246 8.70702 9.50854 8.59922 9.40069C8.49141 9.29283 8.4375 9.15918 8.4375 8.99974C8.4375 8.84029 8.49141 8.70672 8.59922 8.59903C8.70702 8.49134 8.84061 8.4375 8.99998 8.4375H15C15.1594 8.4375 15.293 8.49143 15.4008 8.59928C15.5086 8.70714 15.5625 8.84079 15.5625 9.00023C15.5625 9.15968 15.5086 9.29324 15.4008 9.40093C15.293 9.50862 15.1594 9.56246 15 9.56246H8.99998ZM11.9997 6.56246C11.8403 6.56246 11.7067 6.50856 11.599 6.40076C11.4913 6.29295 11.4375 6.15936 11.4375 5.99998V2.99998C11.4375 2.84061 11.4914 2.70701 11.5993 2.5992C11.7071 2.4914 11.8408 2.4375 12.0002 2.4375C12.1597 2.4375 12.2932 2.4914 12.4009 2.5992C12.5086 2.70701 12.5625 2.84061 12.5625 2.99998V3.9375H15C15.1594 3.9375 15.293 3.99143 15.4008 4.09928C15.5086 4.20714 15.5625 4.34079 15.5625 4.50023C15.5625 4.65968 15.5086 4.79324 15.4008 4.90093C15.293 5.00862 15.1594 5.06246 15 5.06246H12.5625V5.99998C12.5625 6.15936 12.5085 6.29295 12.4007 6.40076C12.2928 6.50856 12.1592 6.56246 11.9997 6.56246Z" fill="#3C3C3C"/>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Table area */}
                <div className="bg-[#F0F0F0] px-2 pb-2 pt-0 flex-1 min-h-0 overflow-auto">
                  <div className="sticky top-0 z-10 grid grid-cols-[160px_repeat(6,minmax(72px,1fr))] min-w-[592px] items-center px-4 py-2 text-[#3C3C3C] text-[14px] font-medium tracking-[0.1px] bg-[#F0F0F0]">
                    <div>Reference</div>
                    <div className="text-center">Sanctions</div>
                    <div className="text-center">TOBA</div>
                    <div className="text-center">MISE</div>
                    <div className="text-center">Pricing</div>
                    <div className="text-center">PBQA</div>
                    <div className="text-center">UW Auth.</div>
                  </div>
              <div className="mt-2 flex flex-col gap-2">
                {(records.length ? records : ['CF9571A20MAA', 'CF9571A20MAA', 'CF9571A20MAA', 'CF9571A20MAA']).map((r, i) => (
                  <RecordRow key={i} refId={typeof r === 'string' ? r : r.ref} />
                ))}
              </div>
                </div>
                {/* Footer inside container */}
                <div className="bg-white px-4 py-2 border-t border-[#D9D9D6] w-full flex-shrink-0 sticky bottom-0">
                  <div className="text-[#3C3C3C] text-[12px] font-medium leading-4 tracking-[0.5px]">{`{Xn} of {Yn} incomplete statuses`}</div>
                </div>
              </div>
            </div>

            {/* Footer meta row */}
            <div className="mt-3 w-full bg-[#FEFEFD] rounded-lg outline outline-1 outline-[#D9D9D6] p-4 flex items-center gap-8">
              <div className="flex items-start gap-2">
                <div className="text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px]">Last updated</div>
                <div className="flex items-center gap-1">
                  <span className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{`{DD/MM/YYYY}`}</span>
                  <span className="text-[#3C3C3C] text-[12px] leading-4">{`{HH:MM}`}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px]">Last updated by</div>
                <div className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">{`{First name Surname}`}</div>
              </div>
            </div>
          </section>
          }
        </div>
      </div>
    </div>
  );
};

export default SubProcesses;


