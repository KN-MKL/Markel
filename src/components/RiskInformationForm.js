import React from 'react';
import M3TextField from './M3TextField';

const RiskInformationForm = ({ className = "" }) => {
    // Define dropdown options
    const periodOptions = ['30 days', '60 days', '90 days', '120 days', '180 days'];
    const jwcAreasOptions = ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5'];
    const rubOptions = ['RUB001', 'RUB002', 'RUB003', 'RUB004', 'RUB005'];
    const ernOptions = ['ERN001', 'ERN002', 'ERN003', 'ERN004', 'ERN005'];
    const terrorismOptions = ['Included', 'Excluded', 'Optional', 'Not Applicable'];
    const cancellationOptions = ['30 days', '60 days', '90 days', 'Immediate', 'None'];
    const emailOptions = ['Yes', 'No', 'Optional'];

    return (
        <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4 ${className}`}>
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

export default RiskInformationForm;
