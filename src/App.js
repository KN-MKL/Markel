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
                <div className="inline-flex items-center gap-2 min-w-0 flex-1">
                    <div className="p-2 bg-gray-200 rounded flex-shrink-0">
                        <OmraLogo />
                    </div>
                    <div className="text-base font-medium text-center text-zinc-800 truncate">{title}</div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100 flex-shrink-0">
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
const MandatoryBindDataForm = () => {
    const territoryOptions = ['UK', 'EU', 'US', 'International', 'Global'];
    const scopeOptions = ['Worldwide', 'EU Only', 'UK Only', 'US Only', 'Custom'];
    const riCodeOptions = ['RI001', 'RI002', 'RI003', 'RI004', 'RI005'];
    const towerCodeOptions = ['T001', 'T002', 'T003', 'T004', 'T005'];
    const customerTypeOptions = ['Individual', 'Corporate', 'SME', 'Enterprise', 'Government'];
    const productOptions = ['Property', 'Liability', 'Cyber', 'Professional', 'Directors & Officers'];
    const cyberOptions = ['Yes', 'No', 'Optional'];
    const exclusionOptions = ['Standard', 'Enhanced', 'Custom', 'None'];

    return (
        <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <M3TextField dropdown label="Operating Territory" id="op-territory" options={territoryOptions} />
                    <M3TextField dropdown label="Territorial Scope" id="terr-scope" options={scopeOptions} />
                    <M3TextField dropdown label="Reassured Op Territory" id="reassured-op-territory" options={territoryOptions} />
                    <M3TextField dropdown label="RI Code" id="ri-code" options={riCodeOptions} />
                    <M3TextField dropdown label="Tower Code" id="tower-code" options={towerCodeOptions} />
                    <M3TextField label="GWP 100%" id="gwp-100-bind" />
                    <M3TextField label="Limit" id="limit-bind" />
                    <M3TextField label="Estimated signing" id="estimated-signing-bind" />
                    <M3TextField dropdown label="Customer type" id="customer-type" options={customerTypeOptions} />
                    <M3TextField dropdown label="Product" id="product" options={productOptions} />
                    <M3TextField dropdown label="Cyber coverage" id="cyber-coverage" options={cyberOptions} />
                    <M3TextField dropdown label="Exclusion type" id="exclusion-type" options={exclusionOptions} />
                    <M3TextField label="Other (free text box)" id="other-free-text" />
                </div>
            </div>
        </div>
    );
};

const CATManagementForm = () => {
    const aggRiskDataOptions = ['Yes', 'No', 'Not Applicable', 'Pending'];
    
    return (
        <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <M3TextField dropdown label="Aggregated Risk Data" id="agg-risk-data" options={aggRiskDataOptions} />
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
};

const RiskInformationForm = () => {
    const periodOptions = ['30 days', '60 days', '90 days', '120 days', '180 days'];
    const jwcAreasOptions = ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5'];
    const rubOptions = ['RUB001', 'RUB002', 'RUB003', 'RUB004', 'RUB005'];
    const ernOptions = ['ERN001', 'ERN002', 'ERN003', 'ERN004', 'ERN005'];
    const terrorismOptions = ['Included', 'Excluded', 'Optional', 'Not Applicable'];
    const cancellationOptions = ['30 days', '60 days', '90 days', 'Immediate', 'None'];
    const emailOptions = ['Yes', 'No', 'Optional'];

    return (
        <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                 <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-6">Risk information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <M3TextField dropdown label="Detained period" id="detained-period" options={periodOptions} />
                    <M3TextField dropdown label="Blocking and trapping period" id="blocking-trapping" options={periodOptions} />
                    <M3TextField dropdown label="JWC Areas" id="jwc-areas" options={jwcAreasOptions} />
                    <M3TextField dropdown label="RUB" id="rub" options={rubOptions} />
                    <M3TextField dropdown label="ERN" id="ern" options={ernOptions} />
                    <M3TextField dropdown label="ERN Comment" id="ern-comment" options={['Yes', 'No', 'Optional']} />
                    <M3TextField dropdown label="Offshore Terrorism..." id="offshore-terrorism" options={terrorismOptions} />
                    <M3TextField dropdown label="Offshore Terrorism..." id="offshore-terrorism-clause" options={terrorismOptions} />
                    <M3TextField dropdown label="Cancellation Notice..." id="cancellation-notice" options={cancellationOptions} />
                    <M3TextField dropdown label="Cancellation Notice..." id="cancellation-email" options={emailOptions} />
                 </div>
            </div>
        </div>
    );
};

const MandatoryChecklistForm = () => {
    const yesNoOptions = ['Yes', 'No', 'Not Applicable', 'Pending'];
    const authorityOptions = ['Full', 'Limited', 'None', 'Delegated'];
    const controlOptions = ['Yes', 'No', 'Partial', 'Delegated'];
    const platformOptions = ['Yes', 'No', 'Optional', 'Required'];
    const esgOptions = ['Compliant', 'Non-Compliant', 'Pending Review', 'Not Applicable'];
    const paymentOptions = ['Standard', 'Extended', 'Immediate', 'Installment'];
    const treatyOptions = ['Yes', 'No', 'Partial', 'Under Review'];
    const warrantyOptions = ['Standard', 'Enhanced', 'Custom', 'None'];

    return (
         <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                 <h3 className="text-sm font-medium text-gray-700 tracking-tight mb-6">Mandatory Checklist Verification</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <M3TextField dropdown label="Aggs" id="aggs" options={yesNoOptions} />
                    <M3TextField dropdown label="Brexit Agg" id="brexit-agg" options={yesNoOptions} />
                    <M3TextField dropdown label="Claims Authority" id="claims-authority" options={authorityOptions} />
                    <M3TextField dropdown label="Claims Control" id="claims-control" options={controlOptions} />
                    <M3TextField dropdown label="CL370" id="cl370" options={yesNoOptions} />
                    <M3TextField dropdown label="Co OpRI" id="co-opri" options={yesNoOptions} />
                    <M3TextField dropdown label="Demo Spreadsheet" id="demo-spreadsheet" options={yesNoOptions} />
                    <M3TextField dropdown label="E-Placing Platform" id="e-placing" options={platformOptions} />
                    <M3TextField dropdown label="ESG" id="esg" options={esgOptions} />
                    <M3TextField dropdown label="ESG Reason" id="esg-reason" options={['Compliance', 'Risk', 'Policy', 'Other']} />
                    <M3TextField dropdown label="Expiring Decs Sent..." id="expiring-decs" options={yesNoOptions} />
                    <M3TextField dropdown label="FAC Ri" id="fac-ri" options={yesNoOptions} />
                    <M3TextField dropdown label="Flood Check" id="flood-check" options={yesNoOptions} />
                    <M3TextField dropdown label="Hull War Wording" id="hull-war" options={yesNoOptions} />
                    <M3TextField dropdown label="LMA3333" id="lma3333" options={yesNoOptions} />
                    <M3TextField dropdown label="Law & Jurisdiction..." id="law-jurisdiction" options={['UK Law', 'US Law', 'EU Law', 'Other']} />
                    <M3TextField dropdown label="Sanctions Clause" id="sanctions-clause" options={yesNoOptions} />
                    <M3TextField dropdown label="Premium Payment" id="premium-payment" options={paymentOptions} />
                    <M3TextField dropdown label="Primary Slip Wording..." id="primary-slip" options={yesNoOptions} />
                    <M3TextField dropdown label="Proposal Form and..." id="proposal-form" options={yesNoOptions} />
                    <M3TextField dropdown label="RI Treaty" id="ri-treaty" options={treatyOptions} />
                    <M3TextField dropdown label="Subscription Claims..." id="subscription-claims" options={yesNoOptions} />
                    <M3TextField dropdown label="US Collab Form" id="us-collab" options={yesNoOptions} />
                    <M3TextField dropdown label="War and Terrorism..." id="war-terrorism" options={yesNoOptions} />
                    <M3TextField dropdown label="Warranties" id="warranties" options={warrantyOptions} />
                    <M3TextField dropdown label="Wording Changed" id="wording-changed" options={yesNoOptions} />
                 </div>
            </div>
        </div>
    );
};

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
    const commonLabelClass = `absolute left-3 transition-all duration-200 ease-in-out pointer-events-none max-w-[calc(100%-24px)] ${isFloating ? `-top-2 text-xs ${disabled ? 'bg-gray-100' : bgClass} px-1 text-zinc-800` : `${initialLabelPositionClass} text-base text-zinc-500`}`; 
    const commonWrapperClass = `relative w-full h-full rounded-md transition-colors duration-200 ${disabled ? 'bg-gray-100' : ''} ${isFocused ? 'outline outline-2 outline-zinc-800' : 'border border-gray-400'}`; 
    
    if (dropdown) { 
        return (
            <div className={`relative self-stretch ${heightClass} ${containerClassName} z-10`} style={{ position: 'relative', zIndex: isOpen ? 9999 : 10 }}>
                <button onClick={() => !disabled && setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 150)} className={`w-full h-full text-left ${commonWrapperClass}`}>
                    <label htmlFor={id} className={`${commonLabelClass} truncate`}>{label}</label>
                    <span className="w-full h-full px-4 text-base text-zinc-800 flex items-center truncate">{value}</span>
                    <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
                        <ChevronDownIcon isExpanded={isOpen} />
                    </div>
                </button>
                {isOpen && (
                    <ul className="absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto" style={{ position: 'absolute', top: '100%', left: 0, right: 0 }}>
                        {options.map(opt => 
                            <li key={opt} onMouseDown={() => { setValue(opt); setIsOpen(false); }} className="px-4 py-2 text-base hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                                <span className="truncate flex-1">{opt}</span> {value === opt && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="#3C3C3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
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
                <label htmlFor={id} className={`${commonLabelClass} truncate`}>{label}</label>
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
            <label htmlFor={id} className="text-sm text-gray-700 truncate flex-1 min-w-0">{label}</label>
            <button onClick={() => setChecked(!checked)} className="flex-shrink-0 ml-2">
                <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${checked ? 'bg-zinc-800 border-zinc-800' : 'border-gray-400'}`}>
                    {checked && <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
            </button>
        </div>
    ); 
};

// --- Additional UI Components for Forms ---
const RadioButton = ({ group, value, selectedValue, onClick, children }) => (
    <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg cursor-pointer" onClick={() => onClick(group, value)}>
        <div className="flex-1 text-sm leading-5 text-zinc-800 break-words min-w-0">{children}</div>
        <div className="flex items-center justify-center ml-3 flex-shrink-0">
            <RadioIcon selected={selectedValue === value} />
        </div>
    </div>
);

const RadioIcon = ({ selected }) => (
    <div className="w-6 h-6 flex items-center justify-center">
        {selected ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.5" stroke="#3C3C3C" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="5" fill="#3C3C3C"/>
            </svg>
        ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.5" stroke="#807F7B" strokeWidth="1.5"/>
            </svg>
        )}
    </div>
);

const FilledField = ({ label }) => (
    <div className="relative h-14 bg-gray-100 rounded-md flex items-center border-b border-gray-400 w-24">
        <span className="px-4 text-base text-gray-500">{label}</span>
    </div>
);

const ToggleButton = ({ options, selected, setSelected, dark = false }) => (
    <div className="flex items-center rounded-md border border-gray-200">
        {options.map(option => (
            <button key={option} onClick={() => setSelected(option)} className={`px-4 py-1 text-xs font-medium transition-colors duration-200 first:rounded-l-md last:rounded-r-md ${selected === option ? (dark ? 'bg-zinc-800 text-white' : 'bg-green-100 text-zinc-800') : 'bg-white text-zinc-800'}`}>
                {option}
            </button>
        ))}
    </div>
);

const QuestionCard = ({ children }) => (
    <div className="flex flex-col items-start justify-center w-full p-4 bg-white border border-gray-200 rounded-lg gap-3">
        {children}
    </div>
);

const CheckboxWithNA = ({ label, id }) => { 
    const [isNA, setIsNA] = useState(false); 
    return (
        <div className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <button onClick={() => setIsNA(!isNA)} className="focus:outline-none flex-shrink-0">
                    <CheckboxIcon checked={isNA} />
                </button>
                <span className="text-base text-gray-700 truncate">{label}</span>
            </div>
            <M3TextField label={isNA ? 'N/A' : ''} id={id} disabled={isNA} containerClassName="w-40 flex-shrink-0" bgClass="bg-white" />
        </div>
    );
};

const CheckboxIcon = ({ checked }) => (
    <div className={`w-6 h-6 flex items-center justify-center rounded-sm transition-colors ${checked ? 'bg-zinc-800' : 'border-2 border-zinc-800'}`}>
        {checked && <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
);

const InfoCard = ({ title, children, fullWidth = false }) => (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${fullWidth ? 'col-span-1 lg:col-span-2' : ''}`}>
        <h3 className="text-sm font-medium text-zinc-800 px-4 py-3 border-b border-gray-200 truncate">{title}</h3>
        <div>{children}</div>
    </div>
);

const TableRow = ({ headers, children, vertical=false }) => { 
    if(vertical) { 
        return (
            <div className="flex p-4 border-b border-gray-100">
                <div className="w-1/2 text-sm text-gray-500 flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 bg-gray-300 rounded-sm flex-shrink-0" />
                    <span className="truncate">{headers[0]}</span>
                </div>
                <div className="w-1/2 text-sm text-zinc-800 min-w-0">
                    <span className="truncate block">{headers[1]}</span>
                </div>
            </div>
        ); 
    } 
    return (
        <div className="flex border-b border-gray-100 last:border-b-0">
            <div className="w-full grid grid-cols-5 gap-4 px-4 py-2">
                <div className="text-sm text-gray-500 col-span-5 mb-1">
                    {headers && headers.map((h, i) => <span key={i} className="inline-block w-1/5 truncate">{h}</span>)}
                </div>
                <div className="col-span-5 grid grid-cols-5 gap-4">{children}</div>
            </div>
        </div>
    );
};

const TableCell = ({ children }) => (
    <div className="text-sm text-zinc-800 truncate w-full min-w-0">{children}</div>
);

const Tag = ({ children, color }) => { 
    const colors = { 
        orange: 'bg-orange-100 text-orange-800 border border-orange-300', 
        teal: 'bg-teal-100 text-teal-800 border border-teal-300', 
        blue: 'bg-blue-100 text-blue-800 border border-blue-300' 
    }; 
    return (
        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors[color]}`}>
            {children}
        </span>
    );
};

const CountryFlag = ({ code, name }) => (
    <div className="flex items-center gap-2">
        <div className="w-6 h-4 rounded-sm bg-gray-200 overflow-hidden relative">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H22V16H0V0Z" fill="#F93939"/>
                <path d="M0 0H9.42857V7.46667H0V0Z" fill="#1A47B8"/>
            </svg>
        </div>
        <span>{name}</span>
    </div>
);

// --- Form 3: Submission Data ---
const SubmissionDataForm = () => (
    <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InfoCard title="Client">
                <TableRow headers={["Client", "Domicile", "Policy Type"]}>
                    <TableCell>DOHA INSURANCE DOHA INSUR...</TableCell>
                    <TableCell><CountryFlag code="US" name="USA" /></TableCell>
                    <TableCell><Tag color="orange">Cover holder</Tag></TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>DOHA INSURANCE CO One With An Extra...</TableCell>
                    <TableCell><CountryFlag code="US" name="USA" /></TableCell>
                    <TableCell><Tag color="teal">Re-assured</Tag></TableCell>
                </TableRow>
            </InfoCard>
            <InfoCard title="Broker Information">
                 <TableRow headers={["Role", "Pseudo", "No.", "Name", "Contact"]}>
                    <TableCell>Placer</TableCell>
                    <TableCell>How</TableCell>
                    <TableCell>1703</TableCell>
                    <TableCell>Howden Speciality...</TableCell>
                    <TableCell>Roger Backhouse</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell>Producer</TableCell>
                    <TableCell>nonb</TableCell>
                    <TableCell>104688</TableCell>
                    <TableCell>No Producing Broker</TableCell>
                    <TableCell>No contact</TableCell>
                </TableRow>
            </InfoCard>
        </div>
        <InfoCard title="Policy Identification" fullWidth>
            <div className="grid grid-cols-1 md:grid-cols-3">
                 <div className="flex flex-col">
                    <TableRow headers={["Policy Ref", "Content here"]} vertical />
                    <TableRow headers={["Policy Line Ref", "Content here"]} vertical />
                </div>
                 <div className="flex flex-col">
                    <TableRow headers={["Parent Policy", "Content here"]} vertical />
                    <TableRow headers={["Dec Ref", "Content here"]} vertical />
                </div>
                 <div className="flex flex-col">
                    <TableRow headers={["Inception Date", "DD/MM/YYYY"]} vertical />
                    <TableRow headers={["Expiry Date", "DD/MM/YYYY"]} vertical />
                    <TableRow headers={["YOA", "DD/MM/YYYY"]} vertical />
                </div>
            </div>
        </InfoCard>
         <InfoCard title="Policy Details" fullWidth>
            <div className="grid grid-cols-1 md:grid-cols-2">
                 <div className="flex flex-col">
                    <TableRow headers={["Underwriter", "(First name) (Surname)"]} vertical />
                    <TableRow headers={["1WF Team", "Content goes here"]} vertical />
                    <TableRow headers={["Lead / Follow", "Content goes here"]} vertical />
                    <TableRow headers={["Placing Basis", "Content goes here"]} vertical />
                    <TableRow headers={["Class Type", "Content goes here"]} vertical />
                </div>
                <div className="flex flex-col">
                    <TableRow headers={["Entity", "Content goes here"]} vertical />
                    <TableRow headers={["Producing Team", "Content goes here"]} vertical />
                    <TableRow headers={["Major Class", "Content goes here"]} vertical />
                    <TableRow headers={["Minor Class", "Content goes here"]} vertical />
                    <TableRow headers={["Class", "Content goes here"]} vertical />
                </div>
            </div>
        </InfoCard>
    </div>
);

// --- Form 2: Pricing Data (Correct Layout) ---
const PricingDataForm = () => {
    const [basis, setBasis] = useState('Whole');
    const [deductionType, setDeductionType] = useState('#');

    const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY'];
    const levelOptions = ['Level 1', 'Level 2', 'Level 3'];
    const brokerageOptions = ['Standard', 'Preferred', 'Custom'];
    const taxOptions = ['Standard IPT', 'VAT', 'No Tax'];

    return (
        <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4">
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <h3 className="text-sm font-medium text-gray-700 tracking-tight">Lines</h3>
                    <M3TextField id="written-line" label="Written Line(%)" />
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <span className="text-base text-gray-500">Select Basis:</span>
                        <ToggleButton options={['Whole', 'Order']} selected={basis} setSelected={setBasis} />
                    </div>
                    <M3TextField id="order-percent" label="Order %" />
                    <M3TextField id="estimated-signing" label="Estimated Signing" />
                    <M3TextField id="effective-line" label="Effective Line" />
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <h3 className="text-sm font-medium text-gray-700 tracking-tight">Premium</h3>
                    <M3TextField dropdown id="currency" label="Currency" options={currencyOptions} />
                    <div className="flex gap-4"><FilledField label="CCY" /><M3TextField id="gwp-100" label="GWP 100%" /></div>
                    <div className="flex gap-4"><FilledField label="CCY" /><M3TextField id="gwp-mkl" label="GWP MKL Share" /></div>
                    <div className="flex gap-4"><FilledField label="CCY" /><M3TextField id="net-100" label="Net 100%" /></div>
                    <div className="flex gap-4"><FilledField label="CCY" /><M3TextField id="net-mkl" label="Net MKL Share" /></div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <h3 className="text-sm font-medium text-gray-700 tracking-tight">Limits</h3>
                    <M3TextField dropdown id="limit-currency" label="Limit Currency" options={currencyOptions} />
                    <div className="flex gap-4"><FilledField label="CCY" /><M3TextField id="limit" label="Limit" /></div>
                    <div className="flex gap-4"><FilledField label="CCY" /><M3TextField id="excess" label="Excess" /></div>
                    <div className="flex gap-4"><FilledField label="CCY" /><M3TextField id="deductible" label="Deductible" /></div>
                    <M3TextField id="exposure" label="Exposure" />
                </div>
            </div>
            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                 <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                     <div className="flex items-center justify-between">
                         <h3 className="text-sm font-medium text-gray-700 tracking-tight">Deductions</h3>
                         <ToggleButton options={['%', '#']} selected={deductionType} setSelected={setDeductionType} dark />
                     </div>
                    <div className="flex flex-wrap gap-4">
                        <M3TextField dropdown label="Brokerage" id="brokerage" options={brokerageOptions} containerClassName="w-full" />
                        <M3TextField label="(%)" id="brokerage-percent" containerClassName="w-20" />
                        <M3TextField dropdown label="Level" id="brokerage-level" options={levelOptions} containerClassName="flex-1" />
                    </div>
                     <div className="flex flex-wrap gap-4">
                        <M3TextField dropdown label="Insurer Premium Tax" id="ipt" options={taxOptions} containerClassName="w-full" />
                        <M3TextField label="(%)" id="ipt-percent" containerClassName="w-20" />
                        <M3TextField dropdown label="Level" id="ipt-level" options={levelOptions} containerClassName="flex-1" />
                    </div>
                    <button className="flex items-center justify-center gap-2 self-start px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3.75V14.25M3.75 9H14.25" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span className="text-sm font-medium text-zinc-800">Add Deductions</span>
                    </button>
                </div>
                 <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                     <h3 className="text-sm font-medium text-gray-700 tracking-tight">Premium Rating Index & Ratio</h3>
                    <CheckboxWithNA label="Rate Change" id="rate-change" />
                    <CheckboxWithNA label="Tech Ratio" id="tech-ratio" />
                    <CheckboxWithNA label="Rate Adequacy" id="rate-adequacy" />
                    <M3TextField multiline id="pricing-notes" label="Pricing Notes" bgClass="bg-white" />
                </div>
            </div>
        </div>
    );
};

// --- Form 1: OMRA (Complete) ---
const OMRAForm = () => {
    const [selections, setSelections] = useState({
        needsConfirmation: null,
        policyRenewable: null,
        additionalFees: 'yes',
        premiumFinance: null,
        wordingOffered: null,
        costFairValue: null,
        distributionChain: null,
        financialPromotions: null,
    });

    const handleSelection = (group, value) => {
        setSelections(prev => ({ ...prev, [group]: value }));
    };

    return (
        <div className="w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col lg:flex-row gap-4">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-4">
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Please confirm that consideration has been given to the target customer's needs and expectations</h3>
                    <RadioButton group="needsConfirmation" value="broker" selectedValue={selections.needsConfirmation} onClick={handleSelection}>
                        The Broker/intermediary has confirmed that the target customer's needs and expectations are being met
                    </RadioButton>
                    <RadioButton group="needsConfirmation" value="other" selectedValue={selections.needsConfirmation} onClick={handleSelection}>
                        Other
                    </RadioButton>
                    {selections.needsConfirmation === 'other' && <M3TextField multiline id="needs-comment" label="Please comment on how the customer's needs and expectations are being met..." bgClass="bg-white" />}
                </QuestionCard>
                <QuestionCard>
                     <h3 className="text-sm font-normal text-zinc-800">Please confirm if the policy is renewable</h3>
                    <RadioButton group="policyRenewable" value="annual" selectedValue={selections.policyRenewable} onClick={handleSelection}>
                        This is an annual policy. It is commercially negotiated at renewal each year...
                    </RadioButton>
                    <RadioButton group="policyRenewable" value="other" selectedValue={selections.policyRenewable} onClick={handleSelection}>
                        Other
                    </RadioButton>
                    {selections.policyRenewable === 'other' && <M3TextField multiline id="renewal-comment" label="Please comment on ability to renew cover..." bgClass="bg-white" />}
                </QuestionCard>
                 <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Are there any additional fees charged in the distribution chain (above agreed commission)</h3>
                    <RadioButton group="additionalFees" value="yes" selectedValue={selections.additionalFees} onClick={handleSelection}>
                        Yes - there are additional fees in excess of the commission
                    </RadioButton>
                    <RadioButton group="additionalFees" value="no" selectedValue={selections.additionalFees} onClick={handleSelection}>
                        No, there are no additional fees in excess of the commission
                    </RadioButton>
                    <RadioButton group="additionalFees" value="no_commission" selectedValue={selections.additionalFees} onClick={handleSelection}>
                        No, there is no commission, a fee has been agreed instead.
                    </RadioButton>
                </QuestionCard>
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Is premium finance available?</h3>
                    <RadioButton group="premiumFinance" value="yes" selectedValue={selections.premiumFinance} onClick={handleSelection}>
                        Yes
                    </RadioButton>
                    <RadioButton group="premiumFinance" value="no" selectedValue={selections.premiumFinance} onClick={handleSelection}>
                        No
                    </RadioButton>
                </QuestionCard>
            </div>
            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-4">
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">The policy documentation/wording must:- be clear, fair, not misleading...<br/><br/>Please choose an option which describes the wording offered to the target customer:</h3>
                    <RadioButton group="wordingOffered" value="markel_approved" selectedValue={selections.wordingOffered} onClick={handleSelection}>
                        Markel approved wording and approved for the customer type
                    </RadioButton>
                     <RadioButton group="wordingOffered" value="wordings_team_reviewed" selectedValue={selections.wordingOffered} onClick={handleSelection}>
                        Reviewed by the Wordings Team and drafted for use for the customer type
                    </RadioButton>
                    <RadioButton group="wordingOffered" value="standard_market" selectedValue={selections.wordingOffered} onClick={handleSelection}>
                        Standard Market wording and appropriate for customer type
                    </RadioButton>
                    <RadioButton group="wordingOffered" value="not_reviewed" selectedValue={selections.wordingOffered} onClick={handleSelection}>
                        Not reviewed by the Wordings team or "Other"
                    </RadioButton>
                    {selections.wordingOffered === 'not_reviewed' && <M3TextField multiline id="wording-comment" label="Please comment on documentation..." bgClass="bg-white" />}
                </QuestionCard>
                 <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">The cost remains fair value for the insured relative to the coverage and service provided.</h3>
                    <RadioButton group="costFairValue" value="yes" selectedValue={selections.costFairValue} onClick={handleSelection}>
                        The cost remains fair value for the insured relative to the coverage and service provided.
                    </RadioButton>
                    <M3TextField multiline id="cost-comment" label="Alternatively please comment..." bgClass="bg-white" />
                </QuestionCard>
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Select the distribution chain description</h3>
                    <RadioButton group="distributionChain" value="lloyds" selectedValue={selections.distributionChain} onClick={handleSelection}>
                        Lloyd's / London Intermediary...
                    </RadioButton>
                    <RadioButton group="distributionChain" value="international" selectedValue={selections.distributionChain} onClick={handleSelection}>
                        International Intermediary...
                    </RadioButton>
                    <RadioButton group="distributionChain" value="other" selectedValue={selections.distributionChain} onClick={handleSelection}>
                        Other
                    </RadioButton>
                    {selections.distributionChain === 'other' && <M3TextField multiline id="distribution-comment" label="Please comment on distribution chain..." bgClass="bg-white" />}
                </QuestionCard>
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Are there any financial promotions (adverts, websites, etc)</h3>
                    <RadioButton group="financialPromotions" value="yes" selectedValue={selections.financialPromotions} onClick={handleSelection}>
                        Yes
                    </RadioButton>
                    {selections.financialPromotions === 'yes' && (
                        <div className="w-full p-3 bg-amber-200 rounded-lg text-sm text-zinc-800">
                            Please contact governance@markel.com with the details of the financial promotion"
                        </div>
                    )}
                    <RadioButton group="financialPromotions" value="no" selectedValue={selections.financialPromotions} onClick={handleSelection}>
                        No
                    </RadioButton>
                </QuestionCard>
            </div>
        </div>
    );
};

const MainContent = ({ record }) => {
    if (!record) {
        return <div className="flex-1 p-4">Please select a record.</div>;
    }

    return (
        <main className="flex-1 self-stretch overflow-y-auto p-4 pr-2">
            <div className="flex flex-col">
                <h2 className="px-2 text-xl text-[#3C3C3C] pt-8 pb-4">Binding Details</h2>
                
                <div className="flex flex-col gap-4">
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