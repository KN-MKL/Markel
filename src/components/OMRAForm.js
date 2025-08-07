import React, { useState } from 'react';
import M3TextField from './M3TextField';

// QuestionCard component from commit e2c8151
const QuestionCard = ({ children }) => (
    <div className="flex flex-col items-start justify-center w-full p-4 bg-white border border-gray-200 rounded-lg gap-3">
        {children}
    </div>
);

// RadioButton component from commit e2c8151
const RadioButton = ({ group, value, selectedValue, onClick, children }) => (
    <div className="flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg cursor-pointer" onClick={() => onClick(group, value)}>
        <div className="flex-1 text-sm leading-5 text-zinc-800 break-words min-w-0">{children}</div>
        <div className="flex items-center justify-center ml-3 flex-shrink-0">
            <RadioIcon selected={selectedValue === value} />
        </div>
    </div>
);

// RadioIcon component from commit e2c8151
const RadioIcon = ({ selected }) => (
    <div className="w-6 h-6 flex items-center justify-center">
        {selected ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.5" stroke="#3C3C3C" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="5" fill="#3C3C3C"/>
            </svg>
        ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.5" stroke="#807F7B" strokeWidth="1.5"/>
            </svg>
        )}
    </div>
);

const OMRAForm = ({ className = "" }) => {
    const [selections, setSelections] = useState({
        needsConfirmation: null,
        policyRenewable: null,
        additionalFees: null,
        premiumFinance: null,
        policySection: null,
        distributionChain: null,
        financialPromotions: null,
    });

    const handleSelection = (group, value) => {
        setSelections(prev => ({ ...prev, [group]: value }));
    };

    return (
        <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col lg:flex-row gap-4 ${className}`}>
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-4">
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Please confirm that consideration has been given to the target customer's needs and expectations</h3>

                    <RadioButton group="needsConfirmation" value="broker" selectedValue={selections.needsConfirmation} onClick={handleSelection}>
                        The Broker/intermediary has confirmed that the target customer's needs and expectations are being met
                    </RadioButton>
                    <RadioButton group="needsConfirmation" value="other" selectedValue={selections.needsConfirmation} onClick={handleSelection}>
                        Other
                    </RadioButton>
                    {selections.needsConfirmation === 'other' && (
                        <M3TextField multiline id="needs-comment" label="Please comment on how the customer's needs and expectations are being met (use the 'Supporting Narrative' link)." bgClass="bg-white" noTruncate={true} />
                    )}
                </QuestionCard>
                
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Please confirm if the policy is renewable</h3>

                    <RadioButton group="policyRenewable" value="annual" selectedValue={selections.policyRenewable} onClick={handleSelection}>
                        This is an annual policy. It is commercially negotiated at renewal each year and it is acknowledged by all parties that if acceptable terms cannot be agreed, then coverage will lapse. Any decision to non-renew prior to renewal will be communicated to the intermediary as soon as possible
                    </RadioButton>
                    <RadioButton group="policyRenewable" value="other" selectedValue={selections.policyRenewable} onClick={handleSelection}>
                        Other
                    </RadioButton>
                    {selections.policyRenewable === 'other' && (
                        <M3TextField multiline id="renewal-comment" label="Please comment on ability to renew cover with reference to items detailed on the 'Supporting Narrative' tab" bgClass="bg-white" noTruncate={true} />
                    )}
                </QuestionCard>
                
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Are there any additional fees charged in the distribution chain (above agreed commission)</h3>

                    <RadioButton group="additionalFees" value="yes" selectedValue={selections.additionalFees} onClick={handleSelection}>
                        Yes - there are additional fees in excess of the commission
                    </RadioButton>
                    {selections.additionalFees === 'yes' && (
                        <M3TextField multiline id="additional-fees-comment" label="Please enter the additional fees in excess of commission" bgClass="bg-white" noTruncate={true} />
                    )}
                    <RadioButton group="additionalFees" value="no" selectedValue={selections.additionalFees} onClick={handleSelection}>
                        No, there are no additional fees in excess of the commission
                    </RadioButton>
                    <RadioButton group="additionalFees" value="no_commission" selectedValue={selections.additionalFees} onClick={handleSelection}>
                        No, there is no commission, a fee has been agreed instead.
                    </RadioButton>
                </QuestionCard>
                
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Is premium finance available?</h3>
                    <RadioButton group="premiumFinance" value="yes" selectedValue={selections.premiumFinance} onClick={handleSelection}>
                        Yes
                    </RadioButton>
                    {selections.premiumFinance === 'yes' && (
                        <M3TextField multiline id="premium-finance-rates" label="Please enter your rates and charges" bgClass="bg-white" noTruncate={true} />
                    )}
                    <RadioButton group="premiumFinance" value="no" selectedValue={selections.premiumFinance} onClick={handleSelection}>
                        No
                    </RadioButton>
                </QuestionCard>
            </div>
            
            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-4">
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">
                        The policy documentation/wording must:- be clear, fair, not misleading- clearly set out what is and isn't covered, how to cancel, claim and complain- meet the target customer's needs and reasonable expectations- make clear any aspects of cover that are optional (and whether they are included on this policy or embedded)<br/><br/>
                        Please choose an option which describes the wording offered to the target customer:
                    </h3>
                    <RadioButton group="policySection" value="markel_approved" selectedValue={selections.policySection} onClick={handleSelection}>
                        Markel approved wording and approved for the customer type
                    </RadioButton>
                    <RadioButton group="policySection" value="wordings_team_reviewed" selectedValue={selections.policySection} onClick={handleSelection}>
                        Reviewed by the Wordings Team and drafted for use for the customer type
                    </RadioButton>
                    <RadioButton group="policySection" value="standard_market" selectedValue={selections.policySection} onClick={handleSelection}>
                        Standard Market wording and appropriate for customer type
                    </RadioButton>
                    <RadioButton group="policySection" value="not_reviewed" selectedValue={selections.policySection} onClick={handleSelection}>
                        Not reviewed by the Wordings team or "Other"
                    </RadioButton>
                    {selections.policySection === 'not_reviewed' && (
                        <M3TextField multiline id="wording-comment" label="Please comment on documentation with reference to items detailed on the 'Supporting Narrative' link" bgClass="bg-white" noTruncate={true} />
                    )}
                    <RadioButton group="policySection" value="cost_fair_value" selectedValue={selections.policySection} onClick={handleSelection}>
                        The cost remains fair value for the insured relative to the coverage and service provided.
                    </RadioButton>
                    <M3TextField multiline id="cost-comment" label="Alternatively please comment with reference to the relevant items detailed on the 'Supporting Narrative' link." bgClass="bg-white" noTruncate={true} />
                </QuestionCard>
                
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Select the distribution chain description</h3>

                    <RadioButton group="distributionChain" value="lloyds" selectedValue={selections.distributionChain} onClick={handleSelection}>
                        Lloyd's / London Intermediary (who has confirmed items detailed in "Supporting Narrative" Q4C)
                    </RadioButton>
                    <RadioButton group="distributionChain" value="international" selectedValue={selections.distributionChain} onClick={handleSelection}>
                        International Intermediary (who has confirmed items detailed in "Supporting Narrative" Q4C)
                    </RadioButton>
                    <RadioButton group="distributionChain" value="other" selectedValue={selections.distributionChain} onClick={handleSelection}>
                        Other
                    </RadioButton>
                    {selections.distributionChain === 'other' && (
                        <M3TextField multiline id="distribution-comment" label="Please comment on distribution chain with reference to items detailed on the 'Supporting Narrative' link." bgClass="bg-white" noTruncate={true} />
                    )}
                </QuestionCard>
                
                <QuestionCard>
                    <h3 className="text-sm font-normal text-zinc-800">Are there any financial promotions (adverts, websites, etc)</h3>

                    <RadioButton group="financialPromotions" value="yes" selectedValue={selections.financialPromotions} onClick={handleSelection}>
                        Yes
                    </RadioButton>
                    {selections.financialPromotions === 'yes' && (
                        <div className="w-full p-3 bg-amber-200 rounded-lg text-sm text-zinc-800 border border-amber-400">
                            Please contact governance@markel.com with the details of the financial promotion
                        </div>
                    )}
                    <RadioButton group="financialPromotions" value="no" selectedValue={selections.financialPromotions} onClick={handleSelection}>
                        No
                    </RadioButton>
                </QuestionCard>
            </div>
        </div>
    );
};

export default OMRAForm;
