import React from 'react';
import M3TextField from './M3TextField';

const RiskInformationForm = ({ className = "" }) => (
    <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4 ${className}`}>
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

export default RiskInformationForm;
