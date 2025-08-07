import React from 'react';
import M3TextField from './M3TextField';

const MandatoryChecklistForm = ({ className = "" }) => (
     <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4 ${className}`}>
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

export default MandatoryChecklistForm;
