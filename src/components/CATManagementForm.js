import React, { useState } from 'react';
import M3TextField from './M3TextField';

// WritebackCheckbox component from commit 40ab18c
const WritebackCheckbox = ({ label, id }) => { 
    const [checked, setChecked] = useState(false); 
    return (
        <div 
            className="flex-1 min-w-[120px] p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setChecked(!checked)}
        >
            <label htmlFor={id} className="text-sm text-gray-700 truncate flex-1 min-w-0 cursor-pointer">{label}</label>
            <div className="flex-shrink-0 ml-2">
                {checked ? (
                    <div data-state="Enabled" data-type="Selected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{width: 18, height: 18, borderRadius: 2, background: '#3C3C3C', position: 'relative'}}>
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 3, top: 4.5}}>
                                    <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div data-state="Enabled" data-type="Unselected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                        <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                            <div style={{width: 18, height: 18, borderRadius: 2, border: '2px #807F7B solid'}} />
                        </div>
                    </div>
                )}
            </div>
        </div>
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
