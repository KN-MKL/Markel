import React, { useState, useEffect, useRef } from 'react';
import Icon from './components/Icon';
import RecordItem from './components/RecordItem';

const Header = () => (
    <header className="flex w-full items-center justify-between gap-6 self-stretch border-b border-solid border-[#D9D9D6] bg-white p-6">
        <div className="flex flex-1 items-start gap-4">
            <div className="flex h-12 w-12 flex-col items-center justify-center">
                <div className="flex items-center justify-center overflow-hidden rounded-full">
                    <div className="flex items-center justify-center p-2"><Icon iconName="grid" /></div>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-2 py-2">
                <h1 className="text-2xl font-medium text-[#3C3C3C]">Binding Data Form</h1>
                <p className="text-base tracking-wide text-[#5C5A59]">Complete all required fields for the selected Record before proceeding.</p>
            </div>
        </div>
        <button className="h-10 overflow-hidden rounded-lg border border-solid border-[#D9D9D6] px-6 py-2 text-sm font-medium text-[#3C3C3C] hover:bg-gray-50 active:bg-gray-100 transition-colors">
            Duplicate Binding Data
        </button>
    </header>
);

const RecordCategory = ({ title, color, borderColor, records, activeRecord, setActiveRecord }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex w-full items-center justify-start gap-2">
                <div className="flex flex-1 items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${borderColor ? `border ${borderColor}` : ''}`} style={{ backgroundColor: color }}></div>
                    <span className="text-sm font-medium tracking-tight text-[#5C5A59]">{title}</span>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-[#3C3C3C] hover:text-black">
                    <Icon iconName={isOpen ? "chevronUp" : "chevronDown"} className="h-5 w-5"/>
                </button>
            </div>
            {isOpen && (
                <div className="flex w-full flex-col items-start gap-2 self-stretch">
                    {records.map(record => (
                        <RecordItem key={record.id} record={record} isActive={activeRecord === record.id} onClick={() => setActiveRecord(record.id)} />
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = ({ activeRecord, setActiveRecord, recordData }) => {
    return (
        <aside className="flex w-[293px] flex-col self-stretch p-4">
            <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-lg border border-solid border-[#ADACA7]">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="rounded bg-[#E9F0F2] px-2 py-1 text-[11px] font-medium tracking-wide text-[#5C5A59]">20</span>
                            <span className="text-base font-medium tracking-tight text-[#5C5A59]">Records</span>
                        </div>
                        <button className="p-2 text-[#424242] hover:text-black"><Icon iconName="filter" /></button>
                    </div>
                    <div className="flex flex-1 flex-col items-start gap-6 self-stretch">
                        <RecordCategory title="Moved to FON" color="#216270" records={recordData.fon} activeRecord={activeRecord} setActiveRecord={setActiveRecord}/>
                        <RecordCategory title="Pending FON Move" color="#FFC8B0" borderColor="border-[#FF7133]" records={recordData.pending} activeRecord={activeRecord} setActiveRecord={setActiveRecord}/>
                        <RecordCategory title="With UST" color="#FFC8B0" borderColor="border-[#FF7133]" records={recordData.ust} activeRecord={activeRecord} setActiveRecord={setActiveRecord}/>
                        <RecordCategory title="Rejected" color="#C02000" records={recordData.rejected} activeRecord={activeRecord} setActiveRecord={setActiveRecord}/>
                    </div>
                </div>
                <div className="border-t border-solid border-[#D9D9D6] bg-white p-4">
                    <p className="text-xs font-medium tracking-wide text-[#3C3C3C]">
                        &#123;Xn&#125; of &#123;Yn&#125; sub-tasks incomplete
                    </p>
                </div>
            </div>
        </aside>
    );
};

// --- Accordion Component ---
const Accordion = ({ title, children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="w-full bg-white rounded-lg border-t border-l border-r border-gray-200 flex flex-col">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-start justify-between self-stretch w-full p-4 text-left"
            >
                <div className="inline-flex items-center gap-2">
                    <div className="p-2 bg-gray-200 rounded">
                        <OmraLogo />
                    </div>
                    <div className="text-base font-medium text-center text-zinc-800">{title}</div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100">
                    <ChevronDownIcon isExpanded={isExpanded} />
                </div>
            </button>
            {isExpanded && children}
        </div>
    );
};

// --- SVG & Icon Components ---
const OmraLogo = () => (<div className="relative w-6 h-6 overflow-hidden"><div className="absolute w-[20.13px] h-[11.07px] left-[2px] top-[11.07px] border-[1.33px] border-zinc-800" /><div className="absolute w-[7.47px] h-[7.47px] left-[8.27px] top-[2px] border-[1.33px] border-orange-600" /></div>);
const ChevronDownIcon = ({ isExpanded }) => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}><path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);

// --- Form Components ---
const MandatoryBindDataForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <M3TextField dropdown label="Operating Territory" id="op-territory" />
                <M3TextField dropdown label="Territorial Scope" id="terr-scope" />
                <M3TextField dropdown label="Reassured Op Territory" id="reassured-op-territory" />
                <M3TextField dropdown label="RI Code" id="ri-code" />
                <M3TextField dropdown label="Tower Code" id="tower-code" />
                <M3TextField label="GWP 100%" id="gwp-100-bind" />
                <M3TextField label="Limit" id="limit-bind" />
                <M3TextField label="Estimated signing" id="estimated-signing-bind" />
                <M3TextField dropdown label="Customer type" id="customer-type" />
                <M3TextField dropdown label="Product" id="product" />
                <M3TextField dropdown label="Cyber coverage" id="cyber-coverage" />
                <M3TextField dropdown label="Exclusion type" id="exclusion-type" />
                <M3TextField label="Other (free text box)" id="other-free-text" />
            </div>
        </div>
    </div>
);

const CATManagementForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <M3TextField dropdown label="Aggregated Risk Data" id="agg-risk-data" />
                <M3TextField label="NAIC" id="naic" />
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

const RiskInformationForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
             <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-6">Risk information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <M3TextField dropdown label="Detained period" id="detained-period" />
                <M3TextField dropdown label="Blocking and trapping period" id="blocking-trapping" />
                <M3TextField dropdown label="JWC Areas" id="jwc-areas" />
                <M3TextField dropdown label="RUB" id="rub" />
                <M3TextField dropdown label="ERN" id="ern" />
                <M3TextField dropdown label="ERN Comment" id="ern-comment" />
                <M3TextField dropdown label="Offshore Terrorism..." id="offshore-terrorism" />
                <M3TextField dropdown label="Offshore Terrorism..." id="offshore-terrorism-clause" />
                <M3TextField dropdown label="Cancellation Notice..." id="cancellation-notice" />
                <M3TextField dropdown label="Cancellation Notice..." id="cancellation-email" />
             </div>
        </div>
    </div>
);

const MandatoryChecklistForm = () => (
     <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
             <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-6">Mandatory Checklist Verification</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <M3TextField dropdown label="Aggs" id="aggs" />
                <M3TextField dropdown label="Brexit Agg" id="brexit-agg" />
                <M3TextField dropdown label="Claims Authority" id="claims-authority" />
                <M3TextField dropdown label="Claims Control" id="claims-control" />
                <M3TextField dropdown label="CL370" id="cl370" />
                <M3TextField dropdown label="Co OpRI" id="co-opri" />
                <M3TextField dropdown label="Demo Spreadsheet" id="demo-spreadsheet" />
                <M3TextField dropdown label="E-Placing Platform" id="e-placing" />
                <M3TextField dropdown label="ESG" id="esg" />
                <M3TextField dropdown label="ESG Reason" id="esg-reason" />
                <M3TextField dropdown label="Expiring Decs Sent..." id="expiring-decs" />
                <M3TextField dropdown label="FAC Ri" id="fac-ri" />
                <M3TextField dropdown label="Flood Check" id="flood-check" />
                <M3TextField dropdown label="Hull War Wording" id="hull-war" />
                <M3TextField dropdown label="LMA3333" id="lma3333" />
                <M3TextField dropdown label="Law & Jurisdiction..." id="law-jurisdiction" />
                <M3TextField dropdown label="Sanctions Clause" id="sanctions-clause" />
                <M3TextField dropdown label="Premium Payment" id="premium-payment" />
                <M3TextField dropdown label="Primary Slip Wording..." id="primary-slip" />
                <M3TextField dropdown label="Proposal Form and..." id="proposal-form" />
                <M3TextField dropdown label="RI Treaty" id="ri-treaty" />
                <M3TextField dropdown label="Subscription Claims..." id="subscription-claims" />
                <M3TextField dropdown label="US Collab Form" id="us-collab" />
                <M3TextField dropdown label="War and Terrorism..." id="war-terrorism" />
                <M3TextField dropdown label="Warranties" id="warranties" />
                <M3TextField dropdown label="Wording Changed" id="wording-changed" />
             </div>
        </div>
    </div>
);

const NotesForUSTForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <M3TextField multiline id="ust-notes" label="Notes for UST" bgClass="bg-white" />
        </div>
    </div>
);

// --- Reusable UI Components ---
const M3TextField = ({ label, id, multiline = false, dropdown = false, containerClassName = "", bgClass = "bg-white", disabled = false, options = [] }) => { 
    const [isFocused, setIsFocused] = useState(false); 
    const [value, setValue] = useState(''); 
    const [isOpen, setIsOpen] = useState(false); 
    const isFloating = isFocused || value !== ''; 
    const heightClass = multiline ? 'h-24' : 'h-14'; 
    const initialLabelPositionClass = multiline ? 'top-4' : 'top-1/2 -translate-y-1/2'; 
    const commonLabelClass = `absolute left-3 transition-all duration-200 ease-in-out pointer-events-none ${isFloating ? `-top-2 text-xs ${disabled ? 'bg-gray-100' : bgClass} px-1 text-zinc-800` : `${initialLabelPositionClass} text-base text-zinc-500`}`; 
    const commonWrapperClass = `relative w-full h-full rounded-md transition-colors duration-200 ${disabled ? 'bg-gray-100' : ''} ${isFocused ? 'outline outline-2 outline-zinc-800' : 'border border-gray-400'}`; 
    
    if (dropdown) { 
        return (
            <div className={`relative self-stretch ${heightClass} ${containerClassName}`}>
                <button onClick={() => !disabled && setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)} className={`w-full h-full text-left ${commonWrapperClass}`}>
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
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                    onChange={(e) => setValue(e.target.value)} 
                    value={value} 
                    disabled={disabled} 
                    className={`w-full h-full px-4 text-base bg-transparent resize-none focus:outline-none text-zinc-800 ${multiline ? 'pt-4' : ''} ${disabled ? 'text-gray-500' : ''}`}
                />
            </div>
        </div>
    );
};

const WritebackCheckbox = ({ label, id }) => { 
    const [checked, setChecked] = useState(false); 
    return (
        <div className="flex-1 min-w-[120px] p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
            <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
            <button onClick={() => setChecked(!checked)}>
                <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${checked ? 'bg-zinc-800 border-zinc-800' : 'border-gray-400'}`}>
                    {checked && <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
            </button>
        </div>
    ); 
};

// Placeholder components for the remaining forms
const SubmissionDataForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-4">Submission Data</h3>
            <p className="text-gray-600">Submission data form content will be implemented here.</p>
        </div>
    </div>
);

const PricingDataForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-4">Pricing Data</h3>
            <p className="text-gray-600">Pricing data form content will be implemented here.</p>
        </div>
    </div>
);

const OMRAForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-4">OMRA</h3>
            <p className="text-gray-600">OMRA form content will be implemented here.</p>
        </div>
    </div>
);

const MainContent = ({ record }) => {
    if (!record) {
        return <div className="flex-1 p-4">Please select a record.</div>;
    }

    return (
        <main className="flex-1 self-stretch overflow-y-auto p-4 pr-2">
            <div className="flex flex-col gap-4">
                <h2 className="px-2 text-xl text-[#3C3C3C]">Binding Details for {record.ref}</h2>
                
                <Accordion title="Mandatory Bind Data">
                    <MandatoryBindDataForm />
                </Accordion>
                
                <Accordion title="CAT Management">
                    <CATManagementForm />
                </Accordion>
                
                <Accordion title="Risk information">
                    <RiskInformationForm />
                </Accordion>
                
                <Accordion title="Mandatory Checklist Verification">
                    <MandatoryChecklistForm />
                </Accordion>
                
                <Accordion title="Notes for UST">
                    <NotesForUSTForm />
                </Accordion>
                
                <Accordion title="Submission data">
                    <SubmissionDataForm />
                </Accordion>
                
                <Accordion title="Pricing data">
                    <PricingDataForm />
                </Accordion>
                
                <Accordion title="OMRA">
                    <OMRAForm />
                </Accordion>
            </div>
        </main>
    );
};

const Footer = () => (
    <footer className="flex h-[84px] w-full items-center justify-between self-stretch border-t border-solid border-[#C4C4C4] bg-white px-6 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
        <button onClick={() => console.log("Clear all clicked")} className="text-sm font-medium text-[#3C3C3C] hover:underline">Clear all</button>
        <div className="flex items-center gap-4">
            <button onClick={() => console.log("Save and Exit clicked")} className="rounded-lg bg-[#F0F0F0] px-6 py-2.5 text-sm font-medium text-[#1C1C1C] hover:bg-gray-200 active:bg-gray-300 transition-colors">Save and Exit</button>
            <button onClick={() => console.log("Review to Submit clicked")} className="rounded-lg bg-[#3C3C3C] px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 active:bg-gray-800 transition-colors">Review to Submit</button>
        </div>
    </footer>
);

export default function App() {
    const [activeRecordId, setActiveRecordId] = useState(2);
    
    const recordData = {
        fon: [{ id: 1, ref: 'CF9571', code: 'A', suffix: '20MAA' }],
        pending: [
            { id: 2, ref: 'CF9572', code: 'B', suffix: '21MAA' },
            { id: 3, ref: 'CF9573', code: 'C', suffix: '22MAA' },
        ],
        ust: [{ id: 4, ref: 'CF9574', code: 'D', suffix: '23MAA' }],
        rejected: [{ id: 5, ref: 'CF9575', code: 'E', suffix: '24MAA' }],
    };

    const allRecords = [].concat(...Object.values(recordData));
    const activeRecord = allRecords.find(r => r.id === activeRecordId);

    return (
        <div className="flex h-screen w-full flex-col items-start justify-start bg-[#F5F5F5] font-sans">
            <Header />
            <div className="flex w-full flex-1 self-stretch overflow-hidden">
                <Sidebar activeRecord={activeRecordId} setActiveRecord={setActiveRecordId} recordData={recordData} />
                <MainContent record={activeRecord} />
            </div>
            <Footer />
        </div>
    );
} 