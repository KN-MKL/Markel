import React, { useState } from 'react';
import M3TextField from './M3TextField';
import CurrencyLabel from './CurrencyLabel';

// ToggleButton component from commit 40ab18c
const ToggleButton = ({ options, selected, setSelected, dark = false }) => (
    <div className="flex items-center rounded-md border border-gray-200">
        {options.map(option => (
            <button key={option} onClick={() => setSelected(option)} className={`px-4 py-1 text-xs font-medium transition-colors duration-200 first:rounded-l-md last:rounded-r-md ${selected === option ? (dark ? 'bg-zinc-800 text-white' : 'bg-green-100 text-zinc-800') : 'bg-white text-zinc-800'}`}>
                {option}
            </button>
        ))}
    </div>
);

const PricingDataForm = ({ className = "" }) => {
    const [basis, setBasis] = useState('Whole');
    const [deductionType, setDeductionType] = useState('#');
    const [rateChangeChecked, setRateChangeChecked] = useState(false);
    const [techRatioChecked, setTechRatioChecked] = useState(false);
    const [rateAdequacyChecked, setRateAdequacyChecked] = useState(false);

    const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY'];
    const levelOptions = ['Level 1', 'Level 2', 'Level 3'];
    const brokerageOptions = ['Standard', 'Preferred', 'Custom'];
    const taxOptions = ['Standard IPT', 'VAT', 'No Tax'];

    return (
        <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4 ${className}`}>
            {/* Top Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <h3 className="text-sm font-medium text-gray-700 tracking-tight">Lines</h3>
                    <M3TextField id="written-line" label="Written Line(%)" />
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <span className="text-base text-gray-500">Select Basis:</span>
                        <ToggleButton options={['Whole', 'Order']} selected={basis} setSelected={setBasis} />
                    </div>
                    <M3TextField id="order-percent" label="Order %" />
                    <M3TextField id="estimated-signing" label="Estimated Signing" />
                    <M3TextField id="effective-line" label="Effective Line" />
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <h3 className="text-sm font-medium text-gray-700 tracking-tight">Premium</h3>
                    <M3TextField dropdown id="currency" label="Currency" options={currencyOptions} />
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField id="gwp-100" label="GWP 100%" containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField id="gwp-mkl" label="GWP MKL Share" containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField id="net-100" label="Net 100%" containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField id="net-mkl" label="Net MKL Share" containerClassName="flex-1" />
                    </div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <h3 className="text-sm font-medium text-gray-700 tracking-tight">Limits</h3>
                    <M3TextField dropdown id="limit-currency" label="Limit Currency" options={currencyOptions} />
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField id="limit" label="Limit" containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField id="excess" label="Excess" containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <CurrencyLabel currency="CCY" />
                        <M3TextField id="deductible" label="Deductible" containerClassName="flex-1" />
                    </div>
                    <M3TextField id="exposure" label="Exposure" />
                </div>
            </div>
            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 tracking-tight">Deductions</h3>
                        <ToggleButton options={['%', '#']} selected={deductionType} setSelected={setDeductionType} dark />
                    </div>
                    <div className="flex gap-4">
                        <M3TextField dropdown label="Brokerage" id="brokerage" options={brokerageOptions} containerClassName="flex-1" />
                        <M3TextField label="(%)" id="brokerage-percent" containerClassName="w-20" />
                        <M3TextField dropdown label="Level" id="brokerage-level" options={levelOptions} containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <M3TextField dropdown label="Insurer Premium Tax" id="ipt" options={taxOptions} containerClassName="flex-1" />
                        <M3TextField label="(%)" id="ipt-percent" containerClassName="w-20" />
                        <M3TextField dropdown label="Level" id="ipt-level" options={levelOptions} containerClassName="flex-1" />
                    </div>
                    <div className="flex gap-4">
                        <M3TextField dropdown label="Deduction Type" id="deduction-type" options={['Custom Deduction 1', 'Custom Deduction 2', 'Custom Deduction 3']} containerClassName="flex-1" />
                        <M3TextField label="(%)" id="deduction-percent" containerClassName="w-20" />
                        <M3TextField dropdown label="Level" id="deduction-level" options={levelOptions} containerClassName="flex-1" />
                    </div>
                    <button className="flex items-center justify-center gap-2 self-start px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 3.75V14.25M3.75 9H14.25" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm font-medium text-zinc-800">Add Deductions</span>
                    </button>
                </div>
                <div className="p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-700 tracking-tight">Premium Rating Index & Ratio</h3>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4">
                            <div className="bg-gray-100 rounded-t-lg border-b border-gray-300 p-2 flex items-center gap-2">
                                <button onClick={() => setRateChangeChecked(!rateChangeChecked)} className="flex items-center gap-2">
                                    {rateChangeChecked ? (
                                        <div data-state="Enabled" data-type="Selected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                            <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                                <div style={{width: 18, height: 18, borderRadius: 2, background: '#3C3C3C', position: 'relative'}}>
                                                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 3, top: 4.5}}>
                                                        <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div data-state="Enabled" data-type="Unselected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                            <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                                <div style={{width: 18, height: 18, borderRadius: 2, border: '2px #807F7B solid'}} />
                                            </div>
                                        </div>
                                    )}
                                    <span className="text-gray-600 text-sm">N/A</span>
                                </button>
                            </div>
                            <M3TextField label="Rate Change" id="rate-change-input" containerClassName="flex-1" disabled={rateChangeChecked} />
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-gray-100 rounded-t-lg border-b border-gray-300 p-2 flex items-center gap-2">
                                <button onClick={() => setTechRatioChecked(!techRatioChecked)} className="flex items-center gap-2">
                                    {techRatioChecked ? (
                                        <div data-state="Enabled" data-type="Selected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                            <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                                <div style={{width: 18, height: 18, borderRadius: 2, background: '#3C3C3C', position: 'relative'}}>
                                                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 3, top: 4.5}}>
                                                        <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div data-state="Enabled" data-type="Unselected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                            <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                                <div style={{width: 18, height: 18, borderRadius: 2, border: '2px #807F7B solid'}} />
                                            </div>
                                        </div>
                                    )}
                                    <span className="text-gray-600 text-sm">N/A</span>
                                </button>
                            </div>
                            <M3TextField label="Tech Ratio" id="tech-ratio-input" containerClassName="flex-1" disabled={techRatioChecked} />
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-gray-100 rounded-t-lg border-b border-gray-300 p-2 flex items-center gap-2">
                                <button onClick={() => setRateAdequacyChecked(!rateAdequacyChecked)} className="flex items-center gap-2">
                                    {rateAdequacyChecked ? (
                                        <div data-state="Enabled" data-type="Selected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                            <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                                <div style={{width: 18, height: 18, borderRadius: 2, background: '#3C3C3C', position: 'relative'}}>
                                                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 3, top: 4.5}}>
                                                        <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div data-state="Enabled" data-type="Unselected" style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                            <div style={{padding: 11, borderRadius: 100, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                                <div style={{width: 18, height: 18, borderRadius: 2, border: '2px #807F7B solid'}} />
                                            </div>
                                        </div>
                                    )}
                                    <span className="text-gray-600 text-sm">N/A</span>
                                </button>
                            </div>
                            <M3TextField label="Rate Adequacy" id="rate-adequacy-input" containerClassName="flex-1" disabled={rateAdequacyChecked} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingDataForm;
