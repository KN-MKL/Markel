import React from 'react';

// Icon definitions
const iconPaths = {
    grid: <path d="M10 3H3V10H10V3Z M21 3H14V10H21V3Z M21 14H14V21H21V14Z M10 14H3V21H10V14Z" fill="#3C3C3C"/>,
    filter: <g clipPath="url(#clip0_30_538)"><path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="#424242"/></g>,
    chevronDown: <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>,
    chevronUp: <path d="M7 14L12 9L17 14H7Z" fill="currentColor"/>,
    chevronRight: <path d="M10 17L15 12L10 7V17Z" fill="currentColor"/>,
    notStarted: <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="#3C3C3C"/>,
    building: <path d="M19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21ZM7 19H11V13H7V19ZM17 19H13V11H17V19ZM17 9H7V5H17V9Z" fill="#3C3C3C"/>,
    checkboxUnchecked: <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="#807F7B"/>,
    checkboxChecked: <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#216270"/>,
};

const Icon = ({ iconName, className = "w-6 h-6" }) => {
    const path = iconPaths[iconName];
    if (!path) {
        console.warn(`Icon "${iconName}" not found`);
        return null;
    }
    
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {path}
        </svg>
    );
};

export default Icon; 