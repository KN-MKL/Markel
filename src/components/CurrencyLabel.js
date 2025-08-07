import React from 'react';

const CurrencyLabel = ({ 
    currency = "CCY", 
    className = "",
    size = "default",
    variant = "default"
}) => {
    const sizeClasses = {
        small: "h-10 w-16 text-sm",
        default: "h-14 w-24 text-base",
        large: "h-16 w-28 text-lg"
    };

    const variantClasses = {
        default: "bg-gray-100 border-gray-400 text-gray-500",
        primary: "bg-blue-100 border-blue-400 text-blue-600",
        secondary: "bg-gray-200 border-gray-500 text-gray-700",
        muted: "bg-gray-50 border-gray-300 text-gray-400"
    };

    return (
        <div className={`
            relative 
            ${sizeClasses[size]} 
            ${variantClasses[variant]}
            rounded-md 
            flex 
            items-center 
            border-b 
            border-gray-400 
            shadow-sm
            ${className}
        `}>
            <span className="px-4 font-medium">{currency}</span>
        </div>
    );
};

export default CurrencyLabel;
