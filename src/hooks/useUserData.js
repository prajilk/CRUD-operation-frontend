// useUserData.js
import { useState } from 'react';

// State variables to store form input values for first name, last name, date of birth, and address.
const useUserData = () => {
    const [fname, setFname] = useState(''); // State for first name.
    const [lname, setLname] = useState(''); // State for last name.
    const [dob, setDob] = useState(''); // State for date of birth.
    const [address, setAddress] = useState(''); // State for address.

    return {
        fname,
        setFname,
        lname,
        setLname,
        dob,
        setDob,
        address,
        setAddress,
    };
};

export default useUserData;
