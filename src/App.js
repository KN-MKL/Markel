import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

export default function App() {
    const [activeRecordId, setActiveRecordId] = useState(2);
    const [expandSidebarToken, setExpandSidebarToken] = useState(0);
    
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
            <Header onDuplicate={() => setExpandSidebarToken(prev => prev + 1)} />
            <div className="flex w-full flex-1 self-stretch overflow-hidden">
                <Sidebar 
                    activeRecord={activeRecordId} 
                    setActiveRecord={setActiveRecordId} 
                    recordData={recordData} 
                    expandTrigger={expandSidebarToken}
                />
                <MainContent record={activeRecord} />
            </div>
            <Footer />
        </div>
    );
} 