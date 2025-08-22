import React from 'react';
import Accordion from './Accordion';
import MandatoryBindDataForm from './MandatoryBindDataForm';
import CATManagementForm from './CATManagementForm';
import RiskInformationForm from './RiskInformationForm';
import MandatoryChecklistForm from './MandatoryChecklistForm';
import NotesForUSTForm from './NotesForUSTForm';
import SubmissionDataForm from './SubmissionDataForm';
import PricingDataForm from './PricingDataForm';
import OMRAForm from './OMRAForm';

const MainContent = ({ record, className = "", hideTitle = false }) => {
    if (!record) {
        return <div className={`flex-1 p-4 ${className}`}>Please select a record.</div>;
    }

    return (
        <main className={`flex-1 self-stretch overflow-y-auto p-4 pr-2 ${className}`}>
            <div className="flex flex-col gap-4">
                {!hideTitle && <h2 className="px-2 text-xl text-[#3C3C3C]">Binding Details for {record.ref}</h2>}
                
                <Accordion title="Bind Data">
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

export default MainContent;
