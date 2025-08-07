import React from 'react';
import M3TextField from './M3TextField';
import CurrencyLabel from './CurrencyLabel';

const MandatoryBindDataForm = ({ className = "" }) => (
    <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 ${className}`}>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="grid grid-cols-4 gap-4">
                {/* First Column - Vertical Stack */}
                <div className="flex flex-col gap-4">
                    <M3TextField dropdown label="Operating Territory" id="op-territory" />
                    <M3TextField dropdown label="Territorial Scope" id="terr-scope" />
                    <M3TextField dropdown label="Reassured Op Territ..." id="reassured-op-territory" />
                    <M3TextField dropdown label="RI Code" id="ri-code" />
                    <M3TextField dropdown label="Tower Code" id="tower-code" />
                </div>
                
                {/* Second Column - CCY + Input pairs */}
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField label="GWP 100%" id="gwp-100-bind" containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField label="Limit (&CCY)" id="limit-bind" containerClassName="flex-1" />
                    </div>
                    <M3TextField dropdown label="Estimated Signing" id="estimated-signing-bind" />
                    <M3TextField dropdown label="Tech Ratio" id="tech-ratio" />
                    <M3TextField dropdown label="Rate Change" id="rate-change" />
                </div>
                
                {/* Third Column */}
                <div className="flex flex-col gap-4">
                    <M3TextField dropdown label="Broker" id="broker" />
                    <M3TextField label="Broker Contact" id="broker-contact" />
                    <M3TextField dropdown label="Customer Type" id="customer-type" />
                    <M3TextField dropdown label="Product" id="product" />
                    <div></div> {/* Empty space for alignment */}
                </div>
                
                {/* Fourth Column */}
                <div className="flex flex-col gap-4">
                    <M3TextField dropdown label="Cyber Coverage" id="cyber-coverage" />
                    <M3TextField label="Exclusion Type" id="exclusion-type" />
                    <M3TextField dropdown label="Other Exclusion" id="other-exclusion-1" />
                    <div></div> {/* Empty space for alignment */}
                    <div></div> {/* Empty space for alignment */}
                </div>
            </div>
        </div>
    </div>
);

export default MandatoryBindDataForm;
