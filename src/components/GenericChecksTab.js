import React from 'react';
import M3Checkbox from './M3Checkbox';

const TableStatusIcon = ({ status }) => (
  <div className="flex items-center justify-center w-6 h-6">
    {/* Simple status token */}
    <div className={`w-4 h-4 rounded ${status === 'rejected' ? 'bg-[#FBE9E6] border border-[#C02000]' : 'bg-[#E9F0F2] border border-[#3C3C3C]'}`} />
  </div>
);

const RecordRow = ({ refId }) => (
  <div className="grid grid-cols-[160px_repeat(6,minmax(72px,1fr))] min-w-[592px] items-center rounded-lg border border-[#D9D9D6] bg-[#FEFEFD] h-[52px] px-2">
    <div className="text-[14px] leading-5 tracking-[0.25px] text-[#3C3C3C]">{refId}</div>
    {['accepted', 'accepted', 'accepted', 'rejected', 'accepted', 'accepted'].map((s, i) => (
      <div key={i} className="flex items-center justify-center"><TableStatusIcon status={s} /></div>
    ))}
  </div>
);

export default function GenericChecksTab({ title = 'Pre-Bind Sub-Process Checks', records = [] }) {
  const [subjectivityChecked, setSubjectivityChecked] = React.useState(false);

  const scrollRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const footerRef = React.useRef(null);
  const [showTopShadow, setShowTopShadow] = React.useState(false);
  const [showBottomShadow, setShowBottomShadow] = React.useState(true);
  const [headerH, setHeaderH] = React.useState(0);
  const [footerH, setFooterH] = React.useState(0);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowTopShadow(scrollTop > 4);
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 4);
    };
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const updateHeights = () => {
      setHeaderH(headerRef.current ? headerRef.current.offsetHeight : 0);
      setFooterH(footerRef.current ? footerRef.current.offsetHeight : 0);
    };
    updateHeights();
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateHeights);
      if (headerRef.current) ro.observe(headerRef.current);
      if (footerRef.current) ro.observe(footerRef.current);
    }
    window.addEventListener('resize', updateHeights);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateHeights);
    };
  }, []);

  return (
    <section className="flex flex-col gap-3 h-full min-h-0 rounded-lg border border-[#E4E3DF] bg-white p-4 overflow-hidden">
      {/* Header block */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-[#3C3C3C] text-[16px] font-medium leading-6 tracking-[0.15px]">{title}</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#9ABBC2]" />
            <p className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">Complete required checks to proceed to FON.</p>
          </div>
        </div>
      </div>

      {/* Subjectivity Requirements card */}
      <div className="mt-0 bg-white rounded-lg p-4 outline outline-1 outline-[#D9D9D6]">
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
            <button type="button" onClick={() => setSubjectivityChecked(v => !v)} aria-pressed={subjectivityChecked} className="px-3 pr-6 py-2 flex items-center gap-3 cursor-pointer select-none w-full text-left">
              <div className="pointer-events-none">
                <M3Checkbox compact checked={subjectivityChecked} />
              </div>
              <span className="text-[#3C3C3C] text-[14px] font-medium leading-5 tracking-[0.1px]">Yes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Policy Record Checks */}
      <div className="mt-4 flex-1 min-h-[500px]">
        <div className="h-full flex flex-col rounded-lg overflow-hidden outline outline-1 outline-[#D9D9D6]">
          <div className="w-full bg-[#FEFEFD] px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex-1 overflow-hidden leading-5">
              <div className="text-[#5C5A59] text-[14px] font-medium leading-5 tracking-[0.1px]">Policy Record Checks</div>
              <div className="text-[#3C3C3C] text-[14px] leading-5 tracking-[0.25px]">Resolve all checks by clicking the status icons below to proceed to FON.</div>
            </div>
          </div>
          <div className="relative flex-1 min-h-0">
            <div ref={scrollRef} className="absolute inset-0 bg-[#F0F0F0] px-2 pb-0 pt-0 overflow-auto">
              <div ref={headerRef} className="sticky top-0 z-10 grid grid-cols-[160px_repeat(6,minmax(72px,1fr))] min-w-[592px] items-center px-4 py-2 text-[#3C3C3C] text-[14px] font-medium tracking-[0.1px] bg-[#F0F0F0]">
                <div>Reference</div>
                <div className="text-center">Sanctions</div>
                <div className="text-center">TOBA</div>
                <div className="text-center">MISE</div>
                <div className="text-center">Pricing</div>
                <div className="text-center">PBQA</div>
                <div className="text-center">UW Auth.</div>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {(records.length ? records : ['CF9571A20MAA','CF9571A20MAA','CF9571A20MAA','CF9571A20MAA']).map((r,i) => (
                  <RecordRow key={i} refId={typeof r === 'string' ? r : r.ref} />
                ))}
              </div>
              <div ref={footerRef} className="bg-white -mx-2 px-6 py-2 border-t border-[#D9D9D6] sticky bottom-0 z-10">
                <div className="text-[#3C3C3C] text-[12px] font-medium leading-4 tracking-[0.5px]">{`{Xn} of {Yn} incomplete statuses`}</div>
              </div>
            </div>
            <div className={`pointer-events-none absolute left-0 right-0 h-4 transition-opacity duration-300 z-0 ${showTopShadow ? 'opacity-100' : 'opacity-0'}`} style={{ top: headerH + 'px', boxShadow: 'inset 0 18px 12px -12px rgba(0,0,0,0.18)' }} />
            <div className={`pointer-events-none absolute left-0 right-0 h-4 transition-opacity duration-300 z-30 ${showBottomShadow ? 'opacity-100' : 'opacity-0'}`} style={{ bottom: footerH + 'px', boxShadow: 'inset 0 -18px 12px -12px rgba(0,0,0,0.18)' }} />
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
  );
}


