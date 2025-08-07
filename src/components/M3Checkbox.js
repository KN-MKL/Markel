import React from 'react';

const M3Checkbox = ({ 
    label, 
    checked, 
    onChange, 
    disabled = false,
    className = "",
    description = "",
    indeterminate = false
}) => {
    return (
        <label className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="relative flex items-center justify-center mt-1">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    checked || indeterminate
                        ? 'border-gray-600 bg-gray-600' 
                        : 'border-gray-400 bg-white'
                } ${disabled ? 'border-gray-300 bg-gray-100' : ''}`}>
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
            <div className="flex-1">
                <span className={`text-sm ${disabled ? 'text-gray-500' : 'text-gray-700'}`}>
                    {label}
                </span>
                {description && (
                    <p className={`text-xs mt-1 ${disabled ? 'text-gray-400' : 'text-gray-500'}`}>
                        {description}
                    </p>
                )}
            </div>
        </label>
    );
};

export default M3Checkbox;
