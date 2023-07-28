// useUserData.js
import { useState } from 'react';

// State variables to handle the response message and error status after form submission.
const useStatus = () => {

    const [status, setStatus] = useState(''); // State for the status message.
    const [errStatus, setErrStatus] = useState(false);  // State to indicate if an error occurred during form submission.

    return {
        status,
        setStatus,
        errStatus,
        setErrStatus
    };
};

export default useStatus;
