import React from 'react';
import M3TextField from './M3TextField';

const NotesForUSTForm = ({ className = "" }) => (
    <div className={`w-full p-4 bg-gray-100 rounded-b-lg border-t border-gray-200 ${className}`}>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
            <M3TextField multiline id="ust-notes" label="Notes for UST" bgClass="bg-white" />
        </div>
    </div>
);

export default NotesForUSTForm;
