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
    // Writebacks style is the new app-wide default
    size = 18,
    square = true,
    borderWidth = 2,
    uncheckedBorderColor = '#807F7B',
    checkedBgColor = '#3C3C3C',
}) => {
    const [isHover, setIsHover] = React.useState(false);
    const containerAlignClass = compact ? 'items-center' : 'items-start';
    const tickMarginClass = compact ? 'mt-0' : 'mt-1';
    const effectiveBorder = checked || indeterminate
        ? (isHover ? '#2E2E2E' : checkedBgColor)
        : (isHover ? '#3C3C3C' : uncheckedBorderColor);
    const effectiveBg = checked || indeterminate
        ? (isHover ? '#2E2E2E' : checkedBgColor)
        : (isHover ? '#F5F5F5' : '#FFFFFF');
    const boxStyle = {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${borderWidth}px`,
        borderColor: effectiveBorder,
        backgroundColor: effectiveBg,
        borderRadius: square ? '2px' : '0.25rem',
        transition: 'all 120ms ease-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <label 
            className={`flex ${containerAlignClass} gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            onMouseEnter={() => !disabled && setIsHover(true)}
            onMouseLeave={() => !disabled && setIsHover(false)}
        >
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
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
