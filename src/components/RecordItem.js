import React from 'react';
import Icon from './Icon';

const RecordItem = ({ record, isActive, onClick }) => {
    const containerClasses = `relative flex w-full cursor-pointer items-center text-left transition-all duration-200 rounded-lg`;
    const activeClasses = "bg-white border border-solid border-[#807f7b] shadow-[0_1px_2px_rgba(0,0,0,0.15),0_2px_16px_rgba(0,0,0,0.05)]";
    const inactiveClasses = "bg-white border border-solid border-[#d9d9d6] hover:bg-gray-50";

    return (
        <button onClick={onClick} className={`${containerClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {isActive && <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-1 h-11 rounded-r-lg bg-[#3c3c3c]"></div>}
            
            <div className={`flex h-[52px] items-center justify-center pl-4 pr-3 ${!isActive ? 'border-r border-solid border-[#d9d9d6]' : ''}`}>
                <div className="rounded bg-[#ECECEC] p-1">
                    <Icon iconName="notStarted" className="h-4 w-4"/>
                </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-2">
                <div className="flex items-center">
                    <span className="text-sm font-normal tracking-wider text-[#3c3c3c]">{record.ref}</span>
                    <div className="border-b border-solid border-[#807f7b] px-1 mx-[-2px]">
                        <span className="text-sm font-normal tracking-wider text-[#3c3c3c]">{record.code}</span>
                    </div>
                    <span className="text-sm font-normal tracking-wider text-[#3c3c3c] ml-[-2px]">{record.suffix}</span>
                </div>
            </div>

            <div className={`px-4 text-[#3C3C3C] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                 <Icon iconName="chevronRight" className="h-5 w-5" />
            </div>
        </button>
    );
};

export default RecordItem; 