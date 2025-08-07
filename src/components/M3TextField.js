import React from 'react';

// Chevron Down Icon component
const ChevronDownIcon = ({ isExpanded }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
         className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
        <path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const M3TextField = ({ 
    label, 
    id, 
    multiline = false, 
    dropdown = false, 
    containerClassName = "", 
    bgClass = "bg-white", 
    disabled = false, 
    options = [],
    value: externalValue,
    onChange: externalOnChange,
    onFocus: externalOnFocus,
    onBlur: externalOnBlur
}) => { 
    const [isFocused, setIsFocused] = React.useState(false); 
    const [internalValue, setInternalValue] = React.useState(''); 
    const [isOpen, setIsOpen] = React.useState(false); 
    
    // Use external value if provided, otherwise use internal state
    const value = externalValue !== undefined ? externalValue : internalValue;
    const setValue = externalOnChange || setInternalValue;
    
    const isFloating = isFocused || value !== ''; 
    const heightClass = multiline ? 'h-24' : 'h-14'; 
    const initialLabelPositionClass = multiline ? 'top-4' : 'top-1/2 -translate-y-1/2'; 
    const commonLabelClass = `absolute left-3 transition-all duration-200 ease-in-out pointer-events-none ${isFloating ? `-top-2 text-xs ${disabled ? 'bg-gray-100' : bgClass} px-1 text-zinc-800` : `${initialLabelPositionClass} text-base text-zinc-500`}`; 
    const commonWrapperClass = `relative w-full h-full rounded-md transition-colors duration-200 ${disabled ? 'bg-gray-100' : ''} ${isFocused ? 'outline outline-2 outline-zinc-800' : 'border border-gray-400'}`; 
    
    const handleFocus = (e) => {
        setIsFocused(true);
        if (externalOnFocus) externalOnFocus(e);
    };
    
    const handleBlur = (e) => {
        setIsFocused(false);
        if (externalOnBlur) externalOnBlur(e);
    };
    
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    };
    
    if (dropdown) { 
        return (
            <div className={`relative self-stretch ${heightClass} ${containerClassName}`}>
                <button 
                    onClick={() => !disabled && setIsOpen(!isOpen)} 
                    onBlur={() => setIsOpen(false)} 
                    className={`w-full h-full text-left ${commonWrapperClass}`}
                    disabled={disabled}
                >
                    <label htmlFor={id} className={commonLabelClass}>{label}</label>
                    <span className="w-full h-full px-4 text-base text-zinc-800 flex items-center">{value}</span>
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
                        <ChevronDownIcon isExpanded={isOpen} />
                    </div>
                </button>
                {isOpen && (
                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {options.map(opt => 
                            <li key={opt} onMouseDown={() => { setValue(opt); setIsOpen(false); }} className="px-4 py-2 text-base hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                                {opt} {value === opt && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </li>
                        )}
                    </ul>
                )}
            </div>
        ); 
    } 
    
    const InputComponent = multiline ? 'textarea' : 'input'; 
    return (
        <div className={`relative self-stretch ${heightClass} ${containerClassName}`}>
            <div className={commonWrapperClass}>
                <label htmlFor={id} className={commonLabelClass}>{label}</label>
                <InputComponent 
                    id={id} 
                    onFocus={handleFocus} 
                    onBlur={handleBlur} 
                    onChange={handleChange} 
                    value={value} 
                    disabled={disabled} 
                    className={`w-full h-full px-4 text-base bg-transparent resize-none focus:outline-none text-zinc-800 ${multiline ? 'pt-4' : ''} ${disabled ? 'text-gray-500' : ''}`}
                />
            </div>
        </div>
    );
};

export default M3TextField;
