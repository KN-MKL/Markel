import React from 'react';
import M3TextField from './M3TextField';
import CurrencyLabel from './CurrencyLabel';

const MandatoryBindDataForm = ({ className = "" }) => {
    // Define dropdown options
    const territoryOptions = ['UK', 'EU', 'US', 'Global', 'Asia Pacific', 'Middle East'];
    const scopeOptions = ['Worldwide', 'EU Only', 'UK Only', 'US Only', 'Custom'];
    const reassuredOptions = ['UK', 'EU', 'US', 'Global', 'Asia Pacific'];
    const riCodeOptions = ['RI001', 'RI002', 'RI003', 'RI004', 'RI005'];
    const towerCodeOptions = ['T001', 'T002', 'T003', 'T004', 'T005'];
    const estimatedSigningOptions = ['0-25%', '25-50%', '50-75%', '75-100%'];
    const techRatioOptions = ['0.5-1.0', '1.0-1.5', '1.5-2.0', '2.0+'];
    const rateChangeOptions = ['0-5%', '5-10%', '10-15%', '15%+'];
    const brokerOptions = ['Aon', 'Marsh', 'Willis', 'Howden', 'Other'];
    const customerTypeOptions = ['Corporate', 'SME', 'Individual', 'Government'];
    const productOptions = ['Property', 'Liability', 'Cyber', 'Marine', 'Aviation'];
    const cyberCoverageOptions = ['Included', 'Excluded', 'Optional'];
    const otherExclusionOptions = ['War', 'Terrorism', 'Nuclear', 'None'];

    return (
        <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 ${className}`}>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-4 gap-4">
                    {/* First Column - Vertical Stack */}
                    <div className="flex flex-col gap-4">
                        <M3TextField dropdown label="Operating Territory" id="op-territory" options={territoryOptions} />
                        <M3TextField dropdown label="Territorial Scope" id="terr-scope" options={scopeOptions} />
                        <M3TextField dropdown label="Reassured Op Territ..." id="reassured-op-territory" options={reassuredOptions} />
                        <M3TextField dropdown label="RI Code" id="ri-code" options={riCodeOptions} />
                        <M3TextField dropdown label="Tower Code" id="tower-code" options={towerCodeOptions} />
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
                        <M3TextField dropdown label="Estimated Signing" id="estimated-signing-bind" options={estimatedSigningOptions} />
                        <M3TextField dropdown label="Tech Ratio" id="tech-ratio" options={techRatioOptions} />
                        <M3TextField dropdown label="Rate Change" id="rate-change" options={rateChangeOptions} />
                    </div>
                    
                    {/* Third Column */}
                    <div className="flex flex-col gap-4">
                        <M3TextField dropdown label="Broker" id="broker" options={brokerOptions} />
                        <M3TextField label="Broker Contact" id="broker-contact" />
                        <M3TextField dropdown label="Customer Type" id="customer-type" options={customerTypeOptions} />
                        <M3TextField dropdown label="Product" id="product" options={productOptions} />
                        <div></div> {/* Empty space for alignment */}
                    </div>
                    
                    {/* Fourth Column */}
                    <div className="flex flex-col gap-4">
                        <M3TextField dropdown label="Cyber Coverage" id="cyber-coverage" options={cyberCoverageOptions} />
                        <M3TextField label="Exclusion Type" id="exclusion-type" />
                        <M3TextField dropdown label="Other Exclusion" id="other-exclusion-1" options={otherExclusionOptions} />
                        <div></div> {/* Empty space for alignment */}
                        <div></div> {/* Empty space for alignment */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MandatoryBindDataForm;
