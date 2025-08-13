import React from 'react';
import Icon from './Icon';

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
