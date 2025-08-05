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

const FormSection = ({ title, children, icon, isCollapsible = true, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    const HeaderContent = () => (
         <div className="flex w-full items-center justify-between p-4 text-[#3C3C3C] hover:text-black">
            <div className="flex items-center gap-2">
                <div className="rounded bg-[#ECECEC] p-2">{icon}</div>
                <h3 className="text-base font-medium">{title}</h3>
            </div>
            {isCollapsible && <Icon iconName={isOpen ? "chevronUp" : "chevronDown"} className="h-5 w-5" />}
        </div>
    );

    return (
        <div className="flex flex-col items-start self-stretch rounded-lg border border-solid border-[#D9D9D6] bg-white">
            {isCollapsible ? (
                 <button onClick={() => setIsOpen(!isOpen)} className="w-full">
                    <HeaderContent />
                 </button>
            ) : (
                <HeaderContent />
            )}
            {isOpen && <div className="w-full p-4 pt-0">{children}</div>}
        </div>
    );
};

const FormField = ({ id, label, value, onChange, options }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);
    const hasValue = value && value.length > 0;
    const isSelect = Array.isArray(options);

    const handleSelect = (option) => {
        onChange({ target: { id, value: option } });
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    
    const handleFocus = () => {
        setIsFocused(true);
        if (isSelect) {
            setIsOpen(true);
        }
    };

    const handleBlur = () => {
        if (!isOpen) {
            setIsFocused(false);
        }
    };

    const containerOnClick = isSelect ? () => {
        if (!isOpen) {
          setIsFocused(true);
          setIsOpen(true);
        }
    } : undefined;

    return (
        <div ref={wrapperRef} className="relative h-14 flex-1 min-w-[200px]" onClick={containerOnClick}>
            <div className={`absolute inset-0 rounded-md transition-all duration-200 pointer-events-none ${isFocused || isOpen ? 'border-2 border-[#3C3C3C]' : 'border border-[#ADACA7]'}`}></div>
            <label 
                htmlFor={id} 
                className={`absolute left-3 transition-all duration-200 pointer-events-none ${isFocused || hasValue || isOpen ? '-top-2 text-xs bg-white px-1 text-[#3C3C3C]' : 'top-1/2 -translate-y-1/2 text-base text-[#5C5A59]'}`}
            >
                {label}
            </label>
            <input
                id={id}
                type="text"
                value={value || ''}
                onChange={isSelect ? undefined : onChange}
                readOnly={isSelect}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full h-full px-4 bg-transparent text-[#3C3C3C] text-base tracking-wide outline-none ${isSelect ? 'cursor-pointer' : ''}`}
            />
            {isSelect && (
                <div className="absolute right-0 top-0 h-full flex items-center px-4 pointer-events-none">
                    <Icon iconName={isOpen ? "chevronUp" : "chevronDown"} className="h-5 w-5 text-[#3C3C3C]" />
                </div>
            )}
            {isSelect && isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-solid border-[#ADACA7] rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleSelect(option)} className="px-4 py-2 text-base text-[#3C3C3C] cursor-pointer hover:bg-gray-100">
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const CheckboxItem = ({ label, isChecked, onToggle }) => (
    <button onClick={onToggle} className="flex w-[230px] items-center justify-between rounded-lg border border-solid border-[#D9D9D6] bg-[#FEFEFD] p-3 hover:bg-gray-50">
        <span className="text-sm text-[#5C5A59]">{label}</span>
        <Icon iconName={isChecked ? "checkboxChecked" : "checkboxUnchecked"} />
    </button>
);

const MainContent = ({ record }) => {
    const [formData, setFormData] = useState({});
    const [checkboxes, setCheckboxes] = useState({});
    
    useEffect(() => {
        setFormData({
            customerType: 'XYZ goes here'
        });
        setCheckboxes({});
    }, [record]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxToggle = (label) => {
        setCheckboxes(prev => ({...prev, [label]: !prev[label]}));
    };
    
    if (!record) {
        return <div className="flex-1 p-4">Please select a record.</div>;
    }

    const dummyOptions = ['Option 1', 'Option 2', 'Option 3'];

    return (
    <main className="flex-1 self-stretch overflow-y-auto p-4 pr-2">
        <div className="flex flex-col gap-4">
            <h2 className="px-2 text-xl text-[#3C3C3C]">Binding Details for {record.ref}</h2>
            <FormSection title="Mandatory Bind Data" icon={<Icon iconName="building" />}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-6">
                        <FormField id="opTerritory" label="Operating Territory" value={formData.opTerritory || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="territorialScope" label="Territorial Scope" value={formData.territorialScope || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="reassuredOpTerritory" label="Reassured Op Territory" value={formData.reassuredOpTerritory || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="riCode" label="RI Code" value={formData.riCode || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                     <div className="flex flex-wrap gap-6">
                        <FormField id="towerCode" label="Tower Code" value={formData.towerCode || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="gwp" label="GWP 100%" value={formData.gwp || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="limit" label="Limit" value={formData.limit || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="estimatedSigning" label="Estimated signing" value={formData.estimatedSigning || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <FormField id="customerType" label="Customer type" value={formData.customerType || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="product" label="Product" value={formData.product || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="cyberCoverage" label="Cyber coverage" value={formData.cyberCoverage || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="exclusionType" label="Exclusion type" value={formData.exclusionType || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                     <div className="flex flex-wrap gap-6">
                        <FormField id="other" label="Other (free text box)" value={formData.other || ''} onChange={handleInputChange} />
                    </div>
                </div>
            </FormSection>

            <FormSection title="CAT Management" icon={<Icon iconName="building" />}>
                <div className="flex flex-col gap-4">
                    <div className="text-sm font-medium text-[#5C5A59]">Writebacks</div>
                    <div className="flex flex-wrap gap-4 rounded-lg border border-solid border-[#D9D9D6] bg-[#F0F0F0] p-4">
                        {['PV', 'S&T', 'NBCR', 'SRCC', 'War'].map(label => (
                            <CheckboxItem key={label} label={label} isChecked={!!checkboxes[label]} onToggle={() => handleCheckboxToggle(label)} />
                        ))}
                    </div>
                </div>
            </FormSection>
            
            <FormSection title="Risk Information" icon={<Icon iconName="building" />}>
                 <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-6">
                        <FormField id="detainedPeriod" label="Detained period" value={formData.detainedPeriod || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="blockingTrapping" label="Blocking and trapping period" value={formData.blockingTrapping || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="jwcAreas" label="JWC Areas" value={formData.jwcAreas || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="rub" label="RUB" value={formData.rub || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                     <div className="flex flex-wrap gap-6">
                        <FormField id="ern" label="ERN" value={formData.ern || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="ernComment" label="ERN Comment" value={formData.ernComment || ''} onChange={handleInputChange} />
                        <FormField id="offshoreTerrorism" label="Offshore Terrorism Buy Back" value={formData.offshoreTerrorism || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="offshoreTerrorismClause" label="Offshore Terrorism Buy Back Clause" value={formData.offshoreTerrorismClause || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                </div>
            </FormSection>

            <FormSection title="Mandatory Checklist Verification" icon={<Icon iconName="building" />}>
                 <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-6">
                        <FormField id="aggs" label="Aggs" value={formData.aggs || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="brexitAgg" label="Brexit Agg" value={formData.brexitAgg || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="claimsAuthority" label="Claims Authority" value={formData.claimsAuthority || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="claimsControl" label="Claims Control" value={formData.claimsControl || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                     <div className="flex flex-wrap gap-6">
                        <FormField id="cl370" label="CL370" value={formData.cl370 || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="coOpRI" label="Co OpRI" value={formData.coOpRI || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="demoSpreadsheet" label="Demo Spreadsheet" value={formData.demoSpreadsheet || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="eplacingPlatform" label="E-Placing Platform" value={formData.eplacingPlatform || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <FormField id="esg" label="ESG" value={formData.esg || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="esgReason" label="ESG Reason" value={formData.esgReason || ''} onChange={handleInputChange} />
                        <FormField id="expiringDecs" label="Expiring Decs Sentto UST" value={formData.expiringDecs || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="facRi" label="FAC Ri" value={formData.facRi || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                     <div className="flex flex-wrap gap-6">
                        <FormField id="floodCheck" label="Flood Check" value={formData.floodCheck || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="hullWarWording" label="Hull War Wording" value={formData.hullWarWording || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="lma3333" label="LMA3333" value={formData.lma3333 || ''} onChange={handleInputChange} options={dummyOptions} />
                        <FormField id="lawJurisdiction" label="Law & Jurisdiction Clause" value={formData.lawJurisdiction || ''} onChange={handleInputChange} options={dummyOptions} />
                    </div>
                </div>
            </FormSection>
        </div>
    </main>
    )
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