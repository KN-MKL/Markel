import React from 'react';

// InfoCard component from commit 40ab18c
const InfoCard = ({ title, children, fullWidth = false }) => (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${fullWidth ? 'col-span-1 lg:col-span-2' : ''}`}>
        <h3 className="text-sm font-medium text-zinc-800 px-4 py-3 border-b border-gray-200 truncate">{title}</h3>
        <div>{children}</div>
    </div>
);

// TableRow component from commit 40ab18c
const TableRow = ({ headers, children, vertical=false }) => { 
    if(vertical) { 
        return (
            <div className="flex p-4 border-b border-gray-100">
                <div className="w-1/2 text-sm text-gray-500 flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 bg-gray-300 rounded-sm flex-shrink-0" />
                    <span className="truncate">{headers[0]}</span>
                </div>
                <div className="w-1/2 text-sm text-zinc-800 min-w-0">
                    <span className="truncate block">{headers[1]}</span>
                </div>
            </div>
        ); 
    } 
    return (
        <div className="flex border-b border-gray-100 last:border-b-0">
            <div className="w-full grid grid-cols-5 gap-4 px-4 py-2">
                <div className="text-sm text-gray-500 col-span-5 mb-1">
                    {headers && headers.map((h, i) => <span key={i} className="inline-block w-1/5 truncate">{h}</span>)}
                </div>
                <div className="col-span-5 grid grid-cols-5 gap-4">{children}</div>
            </div>
        </div>
    );
};

// TableCell component from commit 40ab18c
const TableCell = ({ children }) => (
    <div className="text-sm text-zinc-800 truncate w-full min-w-0">{children}</div>
);

// Tag component from commit 40ab18c
const Tag = ({ children, color }) => { 
    const colors = { 
        orange: 'bg-orange-100 text-orange-800 border border-orange-300', 
        teal: 'bg-teal-100 text-teal-800 border border-teal-300', 
        blue: 'bg-blue-100 text-blue-800 border border-blue-300' 
    }; 
    return (
        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors[color]}`}>
            {children}
        </span>
    );
};

// CountryFlag component from commit 40ab18c
const CountryFlag = ({ code, name }) => (
    <div className="flex items-center gap-2">
        <div className="w-6 h-4 rounded-sm bg-gray-200 overflow-hidden relative">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H22V16H0V0Z" fill="#F93939"/>
                <path d="M0 0H9.42857V7.46667H0V0Z" fill="#1A47B8"/>
            </svg>
        </div>
        <span>{name}</span>
    </div>
);

const SubmissionDataForm = ({ className = "" }) => {
    return (
        <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 flex flex-col gap-4 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <InfoCard title="Client">
                    <TableRow headers={["Client", "Domicile", "Policy Type"]}>
                        <TableCell>DOHA INSURANCE DOHA INSUR...</TableCell>
                        <TableCell><CountryFlag code="US" name="USA" /></TableCell>
                        <TableCell><Tag color="orange">Cover holder</Tag></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>DOHA INSURANCE CO One With An Extra...</TableCell>
                        <TableCell><CountryFlag code="US" name="USA" /></TableCell>
                        <TableCell><Tag color="teal">Re-assured</Tag></TableCell>
                    </TableRow>
                </InfoCard>
                <InfoCard title="Broker Information">
                    <TableRow headers={["Role", "Pseudo", "No.", "Name", "Contact"]}>
                        <TableCell>Placer</TableCell>
                        <TableCell>How</TableCell>
                        <TableCell>1703</TableCell>
                        <TableCell>Howden Speciality...</TableCell>
                        <TableCell>Roger Backhouse</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Producer</TableCell>
                        <TableCell>nonb</TableCell>
                        <TableCell>104688</TableCell>
                        <TableCell>No Producing Broker</TableCell>
                        <TableCell>No contact</TableCell>
                    </TableRow>
                </InfoCard>
            </div>
            <InfoCard title="Policy Identification" fullWidth>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="flex flex-col">
                        <TableRow headers={["Policy Ref", "Content here"]} vertical />
                        <TableRow headers={["Policy Line Ref", "Content here"]} vertical />
                    </div>
                    <div className="flex flex-col">
                        <TableRow headers={["Parent Policy", "Content here"]} vertical />
                        <TableRow headers={["Dec Ref", "Content here"]} vertical />
                    </div>
                    <div className="flex flex-col">
                        <TableRow headers={["Inception Date", "DD/MM/YYYY"]} vertical />
                        <TableRow headers={["Expiry Date", "DD/MM/YYYY"]} vertical />
                        <TableRow headers={["YOA", "DD/MM/YYYY"]} vertical />
                    </div>
                </div>
            </InfoCard>
            <InfoCard title="Policy Details" fullWidth>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col">
                        <TableRow headers={["Underwriter", "(First name) (Surname)"]} vertical />
                        <TableRow headers={["1WF Team", "Content goes here"]} vertical />
                        <TableRow headers={["Lead / Follow", "Content goes here"]} vertical />
                        <TableRow headers={["Placing Basis", "Content goes here"]} vertical />
                        <TableRow headers={["Class Type", "Content goes here"]} vertical />
                    </div>
                    <div className="flex flex-col">
                        <TableRow headers={["Entity", "Content goes here"]} vertical />
                        <TableRow headers={["Producing Team", "Content goes here"]} vertical />
                        <TableRow headers={["Major Class", "Content goes here"]} vertical />
                        <TableRow headers={["Minor Class", "Content goes here"]} vertical />
                        <TableRow headers={["Class", "Content goes here"]} vertical />
                    </div>
                </div>
            </InfoCard>
        </div>
    );
};

export default SubmissionDataForm;
