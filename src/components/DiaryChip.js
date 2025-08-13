import React from 'react';

const DiaryChip = ({ label, className = '' }) => (
  <div
    className={`inline-flex items-center justify-start gap-1 px-2 py-[2px] rounded-full border border-[#E0E0E0] bg-[#EBE9F2] whitespace-nowrap w-[92px] ${className}`}
    data-property-1="Diary"
  >
    <span className="text-black text-[12px] leading-4">{label}</span>
  </div>
);

export default DiaryChip;


