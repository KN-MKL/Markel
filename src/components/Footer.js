import React from 'react';

const Footer = ({ className = "", onClearAll, onSaveAndExit, onReviewToSubmit }) => (
    <footer className={`flex h-[84px] w-full items-center justify-between self-stretch border-t border-solid border-[#C4C4C4] bg-white px-6 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] ${className}`}>
        <button 
            onClick={onClearAll || (() => console.log("Clear all clicked"))} 
            className="text-sm font-medium text-[#3C3C3C] hover:underline"
        >
            Clear all
        </button>
        <div className="flex items-center gap-4">
            <button 
                onClick={onSaveAndExit || (() => console.log("Save and Exit clicked"))} 
                className="rounded-lg bg-[#F0F0F0] px-6 py-2.5 text-sm font-medium text-[#1C1C1C] hover:bg-gray-200 active:bg-gray-300 transition-colors"
            >
                Save and Exit
            </button>
            <button 
                onClick={onReviewToSubmit || (() => console.log("Review to Submit clicked"))} 
                className="rounded-lg bg-[#3C3C3C] px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 active:bg-gray-800 transition-colors"
            >
                Review to Submit
            </button>
        </div>
    </footer>
);

export default Footer;
