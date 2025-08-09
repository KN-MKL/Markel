import React from 'react';

// Global state to track which dropdown is currently open
let openDropdownId = null;
const dropdownListeners = new Set();

// Global state to track which field is currently focused
let focusedFieldId = null;
const focusListeners = new Set();

const notifyDropdowns = (newOpenId) => {
    openDropdownId = newOpenId;
    dropdownListeners.forEach(listener => listener(newOpenId));
};

const notifyFocus = (newFocusedId) => {
    focusedFieldId = newFocusedId;
    focusListeners.forEach(listener => listener(newFocusedId));
};

// Chevron Down Icon component
const ChevronDownIcon = ({ isExpanded }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
         className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
        <path d="M6 9L12 15L18 9" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
    const labelLeftClass = multiline ? 'left-4' : 'left-3';
    
    // Markel color system - improved M3-style label animation
    const commonLabelClass = `absolute ${labelLeftClass} transition-all duration-200 ease-out pointer-events-none ${
        isFloating 
            ? `-top-2 text-xs ${disabled ? 'bg-gray-100' : bgClass} px-1 text-[#3C3C3C] transform scale-100` 
            : `${initialLabelPositionClass} text-base text-[#5C5A59] transform scale-100`
    }`; 
    
    const wrapperPaddingClass = multiline ? 'p-4' : '';
    const commonWrapperClass = `relative w-full h-full rounded-md transition-colors duration-200 ${wrapperPaddingClass} ${disabled ? 'bg-gray-100' : ''} ${isFocused || isOpen ? 'outline outline-2 outline-[#3C3C3C] border-[#3C3C3C]' : 'border border-[#D9D9D6]'}`; 
    
    // Global dropdown state management
    React.useEffect(() => {
        if (dropdown) {
            const handleGlobalDropdownChange = (openId) => {
                if (openId !== id) {
                    setIsOpen(false);
                }
            };
            
            dropdownListeners.add(handleGlobalDropdownChange);
            
            return () => {
                dropdownListeners.delete(handleGlobalDropdownChange);
            };
        }
    }, [dropdown, id]);
    
    // Global focus state management
    React.useEffect(() => {
        const handleGlobalFocusChange = (focusedId) => {
            if (focusedId !== id) {
                setIsFocused(false);
            }
        };
        
        focusListeners.add(handleGlobalFocusChange);
        
        return () => {
            focusListeners.delete(handleGlobalFocusChange);
        };
    }, [id]);
    
    const handleFocus = (e) => {
        setIsFocused(true);
        notifyFocus(id);
        
        // Close any open dropdown when focusing on a non-dropdown field
        if (!dropdown && openDropdownId) {
            notifyDropdowns(null);
        }
        
        if (externalOnFocus) externalOnFocus(e);
    };
    
    const handleBlur = (e) => {
        setIsFocused(false);
        notifyFocus(null);
        if (externalOnBlur) externalOnBlur(e);
    };
    
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
    };
    
    const handleDropdownClick = () => {
        if (disabled) return;
        
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        
        if (newIsOpen) {
            notifyDropdowns(id);
        } else {
            notifyDropdowns(null);
        }
    };
    
    const handleOptionSelect = (selectedValue) => {
        setValue(selectedValue);
        setIsOpen(false);
        notifyDropdowns(null);
    };
    
    if (dropdown) { 
        // For dropdowns, use the same label behavior as regular text fields
        const dropdownIsFloating = isFocused || isOpen || value !== '';
        // Reserve space for the chevron: icon (24px) + right inset (16px) + desired gap (~4px) = 44px => 2.75rem
        // Constrain label width so it never runs under the chevron and neatly truncates before it
        const dropdownLabelClass = `absolute left-3 right-[2.75rem] truncate transition-all duration-200 ease-out pointer-events-none ${
            dropdownIsFloating 
                ? `-top-2 text-xs ${disabled ? 'bg-gray-100' : bgClass} px-1 text-[#3C3C3C] transform scale-100` 
                : `top-1/2 -translate-y-1/2 text-base text-[#5C5A59] transform scale-100`
        }`;
        
        return (
            <div className={`relative self-stretch ${heightClass} ${containerClassName}`}>
                <button 
                    onClick={handleDropdownClick}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full h-full text-left ${commonWrapperClass} hover:border-[#ADACA7] transition-colors`}
                    disabled={disabled}
                >
                    <label htmlFor={id} className={dropdownLabelClass}>{label}</label>
                    <span className={`w-full h-full pl-4 pr-[2.75rem] min-w-0 text-base text-[#3C3C3C] flex items-center truncate transition-opacity duration-200 ${
                        value || (isFocused || isOpen) ? 'opacity-100' : 'opacity-0'
                    }`}>
                        {value || (isFocused || isOpen ? 'Select an option' : '')}
                    </span>
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
                        <ChevronDownIcon isExpanded={isOpen} />
                    </div>
                </button>
                {isOpen && options.length > 0 && (
                    <ul className="absolute z-50 w-full mt-1 bg-white border border-[#D9D9D6] rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {options.map(opt => 
                            <li 
                                key={opt} 
                                onMouseDown={() => handleOptionSelect(opt)} 
                                className="px-4 py-3 text-base hover:bg-[#F5F5F5] cursor-pointer flex items-center justify-between border-b border-[#F0F0F0] last:border-b-0"
                            >
                                <span className={value === opt ? 'text-[#3C3C3C] font-medium' : 'text-[#3C3C3C]'}>
                                    {opt}
                                </span>
                                {value === opt && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 17L4 12" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
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
                    className={`${multiline ? 'p-0' : 'px-4'} w-full h-full text-base bg-transparent resize-none focus:outline-none text-[#3C3C3C] ${disabled ? 'text-[#5C5A59]' : ''}`}
                />
            </div>
        </div>
    );
};

export default M3TextField;
