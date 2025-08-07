import React from 'react';
import Icon from './Icon';
import RecordItem from './RecordItem';

// RecordCategory component
const RecordCategory = ({ title, color, borderColor, records, activeRecord, setActiveRecord }) => {
    const [isOpen, setIsOpen] = React.useState(true);
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

const Sidebar = ({ activeRecord, setActiveRecord, recordData, className = "" }) => {
    return (
        <aside className={`flex w-[293px] flex-col self-stretch p-4 ${className}`}>
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
                        <RecordCategory 
                            title="Moved to FON" 
                            color="#216270" 
                            records={recordData.fon} 
                            activeRecord={activeRecord} 
                            setActiveRecord={setActiveRecord}
                        />
                        <RecordCategory 
                            title="Pending FON Move" 
                            color="#FFC8B0" 
                            borderColor="border-[#FF7133]" 
                            records={recordData.pending} 
                            activeRecord={activeRecord} 
                            setActiveRecord={setActiveRecord}
                        />
                        <RecordCategory 
                            title="With UST" 
                            color="#FFC8B0" 
                            borderColor="border-[#FF7133]" 
                            records={recordData.ust} 
                            activeRecord={activeRecord} 
                            setActiveRecord={setActiveRecord}
                        />
                        <RecordCategory 
                            title="Rejected" 
                            color="#C02000" 
                            records={recordData.rejected} 
                            activeRecord={activeRecord} 
                            setActiveRecord={setActiveRecord}
                        />
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

export default Sidebar;
