import React from 'react';
import Icon from './Icon';

export const FS2StepHeader = ({ recordId = 'CF9571A20MAA', step = 1, onGoStep1, onGoStep2 }) => {
    const idParts = { prefix: recordId.slice(0,6), mid: 'A', suffix: recordId.slice(6) };
    const isStep1 = step === 1;
    return (
        <div className="w-full bg-[#FEFEFD] border border-[#D9D9D6] rounded-t-lg px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Step 1 */}
                <button type="button" onClick={onGoStep1} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border ${isStep1 ? 'border-[#C4C4C4] bg-[#3C3C3C] text-white' : 'border-[#ADACA7] bg-transparent text-[#3C3C3C]' } flex items-center justify-center text-[14px] font-medium`}>1</div>
                    <div className="text-[14px] font-medium tracking-[0.1px] text-[#3C3C3C]">Review and Modify Data for Duplication</div>
                </button>
                {/* Step 2 */}
                <button type="button" onClick={onGoStep2} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full border ${!isStep1 ? 'border-[#C4C4C4] bg-[#3C3C3C] text-white' : 'border-[#ADACA7] bg-transparent text-[#3C3C3C]'} flex items-center justify-center text-[14px] font-medium`}>2</div>
                    <div className="text-[14px] font-medium tracking-[0.1px] text-black/85">Select Records to Duplicate Data</div>
                </button>
            </div>
            {/* ID pill */}
            <div className="flex items-center gap-2 bg-[#E9F0F2] rounded px-2 py-1">
                <div className="text-[14px] font-medium tracking-[0.1px] text-[#216270]">ID</div>
                <div className="bg-[#FDFDFC] rounded px-2 py-1 flex items-center gap-1">
                    <span className="text-[12px] font-medium tracking-[0.5px] text-[#5C5A59]">{idParts.prefix}</span>
                    <span className="border-b border-[#807F7B] text-[12px] font-medium tracking-[0.5px] text-[#5C5A59]">{idParts.mid}</span>
                    <span className="text-[12px] font-medium tracking-[0.5px] text-[#5C5A59]">{idParts.suffix}</span>
                </div>
            </div>
        </div>
    );
};

export const FS2IntroHeader = ({ onBack }) => (
    <div className="w-full bg-white border-x border-t border-[#D9D9D6] px-4 py-4">
        <div className="flex items-start gap-4">
            <button type="button" onClick={onBack} aria-label="Back" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_back)">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#666666"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_back"><rect width="24" height="24" fill="white"/></clipPath>
                    </defs>
                </svg>
            </button>
            <div className="flex-1 flex flex-col gap-2 py-2">
                <div className="text-[22px] leading-7 font-medium text-[#3C3C3C]">Review and Modify Data for Duplication</div>
                <div className="text-[16px] leading-6 tracking-[0.5px] text-[#5C5A59]">
                    Remove any fields you don’t want duplicated before proceeding. To remove a data field, hover over it and click the 'X'.
                </div>
            </div>
        </div>
    </div>
);

const Header = ({ className = "", onDuplicate, onClose }) => (
    <header className={`flex w-full items-center justify-between gap-6 self-stretch border-b border-solid border-[#D9D9D6] bg-white p-6 ${className}`}>
        <div className="flex flex-1 items-start gap-4">
            <button onClick={onClose} aria-label="Close" className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-50">
                <Icon iconName="close" />
            </button>
            <div className="flex flex-col items-start justify-center gap-2 py-2">
                <h1 className="text-2xl font-medium text-[#3C3C3C]">Binding Data Form</h1>
                <p className="text-base tracking-wide text-[#5C5A59]">Complete all required fields for the selected Record before proceeding.</p>
            </div>
        </div>
        <button onClick={onDuplicate} className="h-10 overflow-hidden rounded-lg border border-solid border-[#D9D9D6] px-6 py-2 text-sm font-medium text-[#3C3C3C] hover:bg-gray-50 active:bg-gray-100 transition-colors">
            Duplicate Binding Data
        </button>
    </header>
);

export default Header;
