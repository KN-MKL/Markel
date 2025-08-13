import React from 'react';

const M3Checkbox = ({ 
    label, 
    checked, 
    onChange, 
    disabled = false,
    className = "",
    description = "",
    indeterminate = false,
    compact = false,
    // Design-tuning props (non-breaking defaults)
    size = 16,
    square = false,
    borderWidth = 2,
    uncheckedBorderColor = '#9CA3AF', // tailwind gray-400
    checkedBgColor = '#4B5563', // tailwind gray-600
}) => {
    const containerAlignClass = compact ? 'items-center' : 'items-start';
    const tickMarginClass = compact ? 'mt-0' : 'mt-1';
    const boxStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${borderWidth}px`,
        borderColor: checked || indeterminate ? checkedBgColor : uncheckedBorderColor,
        backgroundColor: checked || indeterminate ? checkedBgColor : '#FFFFFF',
        borderRadius: square ? '2px' : '0.25rem',
        transition: 'all 200ms',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <label className={`flex ${containerAlignClass} gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className={`relative flex items-center justify-center ${tickMarginClass}`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                />
                <div style={boxStyle}>
                    {checked && !indeterminate && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                    {indeterminate && (
                        <div className="w-2 h-0.5 bg-white rounded"></div>
                    )}
                </div>
            </div>
            {(label || description) && (
                <div className="flex-1">
                    {label && (
                        <span className={`text-sm ${disabled ? 'text-gray-500' : 'text-gray-700'}`}>
                            {label}
                        </span>
                    )}
                    {description && (
                        <p className={`text-xs mt-1 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
                            {description}
                        </p>
                    )}
                </div>
            )}
        </label>
    );
};

export default M3Checkbox;
