import React from 'react';

const M3RadioButton = ({ 
    label, 
    name, 
    value, 
    checked, 
    onChange, 
    disabled = false,
    className = "",
    description = ""
}) => {
    return (
        <label className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
            <div className="relative flex items-center justify-center mt-1">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    checked 
                        ? 'border-blue-600 bg-blue-600' 
                        : 'border-gray-400 hover:border-gray-500'
                } ${disabled ? 'border-gray-300 bg-gray-100' : ''}`}>
                    {checked && (
                        <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>
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

export default M3RadioButton;
