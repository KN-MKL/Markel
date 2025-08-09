import React from 'react';
import M3TextField from './M3TextField';

const MandatoryChecklistForm = ({ className = "" }) => {
    // Define dropdown options
    const yesNoOptions = ['Yes', 'No', 'Not Applicable', 'Pending'];
    const authorityOptions = ['Full', 'Limited', 'None', 'Delegated'];
    const controlOptions = ['Yes', 'No', 'Partial', 'Delegated'];
    const platformOptions = ['Yes', 'No', 'Optional', 'Required'];
    const esgOptions = ['Compliant', 'Non-Compliant', 'Pending Review', 'Not Applicable'];
    const paymentOptions = ['Standard', 'Extended', 'Immediate', 'Installment'];
    const treatyOptions = ['Yes', 'No', 'Partial', 'Under Review'];
    const warrantyOptions = ['Standard', 'Enhanced', 'Custom', 'None'];

    return (
         <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4 ${className}`}>
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

export default MandatoryChecklistForm;
