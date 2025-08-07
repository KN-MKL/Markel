import React from 'react';

// OMRA Logo component
const OmraLogo = () => (
    <div className="relative w-6 h-6 overflow-hidden">
        <div className="absolute w-[20.13px] h-[11.07px] left-[2px] top-[11.07px] border-[1.33px] border-zinc-800" />
        <div className="absolute w-[7.47px] h-[7.47px] left-[8.27px] top-[2px] border-[1.33px] border-orange-600" />
    </div>
);

// Chevron Down Icon component
const ChevronDownIcon = ({ isExpanded }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
         className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
        <path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Accordion = ({ title, children, className = "", defaultExpanded = true }) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

    return (
        <div className={`w-full bg-white rounded-lg border-t border-l border-r border-gray-200 flex flex-col ${className}`}>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-start justify-between self-stretch w-full p-4 text-left"
            >
                <div className="inline-flex items-center gap-2">
                    <div className="p-2 bg-gray-200 rounded">
                        <OmraLogo />
                    </div>
                    <div className="text-base font-medium text-center text-zinc-800">{title}</div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100">
                    <ChevronDownIcon isExpanded={isExpanded} />
                </div>
            </button>
            {isExpanded && children}
        </div>
    );
};

export default Accordion;
