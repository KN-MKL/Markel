import React, { useState } from 'react';
import M3TextField from './M3TextField';
import M3Checkbox from './M3Checkbox';

// Standardized writeback checkbox using the new M3Checkbox style
const WritebackCheckbox = ({ label, id }) => { 
    const [checked, setChecked] = useState(false); 
    return (
        <button 
            type="button"
            className="flex-1 min-w-[120px] p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
            onClick={() => setChecked(!checked)}
        >
            <span className="text-sm text-gray-700 truncate min-w-0">{label}</span>
            <M3Checkbox checked={checked} onChange={() => setChecked(!checked)} compact />
        </button>
    ); 
};

const CATManagementForm = ({ className = "" }) => {
    const aggRiskDataOptions = ['Yes', 'No', 'Not Applicable', 'Pending'];
    
    return (
        <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4 ${className}`}>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                {/* Use a 4-column grid so each field has the same width as a single field in 4-up layouts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <M3TextField dropdown label="Aggregated Risk Data" id="agg-risk-data" options={aggRiskDataOptions} containerClassName="md:col-span-1" />
                    <M3TextField label="NAIC" id="naic" containerClassName="md:col-span-1" />
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-4">Writebacks</h3>
                <div className="p-4 bg-gray-100 rounded-lg flex flex-wrap gap-4">
                    <WritebackCheckbox label="PV" id="pv" />
                    <WritebackCheckbox label="S&T" id="st" />
                    <WritebackCheckbox label="NBCR" id="nbcr" />
                    <WritebackCheckbox label="SRCC" id="srcc" />
                    <WritebackCheckbox label="War" id="war" />
                </div>
            </div>
        </div>
    );
};

export default CATManagementForm;
