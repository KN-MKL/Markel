import React from 'react';
import Icon from './Icon';

export const FS2StepHeader = ({ recordId = 'CF9571A20MAA', step = 1 }) => {
    const idParts = { prefix: recordId.slice(0,6), mid: 'A', suffix: recordId.slice(6) };
    return (
        <div className="w-full bg-[#FEFEFD] border border-[#D9D9D6] rounded-t-lg px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* Step 1 */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-[#C4C4C4] bg-[#3C3C3C] text-white flex items-center justify-center text-[14px] font-medium">1</div>
                    <div className="text-[14px] font-medium tracking-[0.1px] text-[#3C3C3C]">Review and Modify Data for Duplication</div>
                </div>
                {/* Step 2 */}
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-[#ADACA7] flex items-center justify-center text-[14px] font-medium text-[#3C3C3C] bg-transparent">2</div>
                    <div className="text-[14px] font-medium tracking-[0.1px] text-black/85">Select Records to Duplicate Data</div>
                </div>
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
