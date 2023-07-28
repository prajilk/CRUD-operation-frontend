import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import useUserData from '../hooks/useUserData';
import useStatus from '../hooks/useStatus';
import FormHeading from '../components/FormHeading';
import StatusText from '../components/StatusText';

const CreateUser = () => {

    // Get all user data states from useUserData.js file
    const { fname, setFname, lname, setLname, dob, setDob, address, setAddress } = useUserData();

    // Get all status states from useStatus.js file
    const { status, setStatus, errStatus, setErrStatus } = useStatus();

    // The 'navigate' function from the 'react-router-dom' library used for programmatic navigation.
    const navigate = useNavigate();

    // Combine all states to send to the child component Form
    const states = {
        fname,
        lname,
        dob,
        address
    }
    // Combine all setStates to send to the child component Form
    const setStates = {
        setFname,
        setLname,
        setDob,
        setAddress
    }

    // Function to create a new user
    const createNewUser = (e) => {

        e.preventDefault(); // Prevent page from reloading

        // Validate user input
        if (fname.trim() !== '' && lname.trim() !== '' && dob !== '' && address.trim() !== '') {
            const newUser = {
                first_name: fname,
                last_name: lname,
                dob: dob,
                address: address
            }

            // Axios POST request to create a new user by sending 'newUser' data to the server.
            axios.post(`${import.meta.env.VITE_SERVER_URL}/create-user`, newUser).then((res) => {
                // The '.then()' block handles the response from the server after the POST request.

                // Check if the user was successfully saved on the server-side.
                if (res.data.saved) {
                    setErrStatus(false); // Reset the 'errStatus' state to false (no error).
                    setStatus("New user created"); // Update the 'status' state with a success message.
                } else {
                    setErrStatus(true) // Set 'errStatus' state to true to indicate an error occurred.
                    setStatus("Something went wrong"); // Update the 'status' state with an error message.
                }
            });

        } else {
            setErrStatus(true) // Set 'errStatus' state to true to indicate an error occurred.
            setStatus("Please fill out all the fields!") // Update the 'status' state with an error message.
        }
    }

    return (
        <div className='rounded-xl mx-auto mt-10 p-7 w-full md:w-[40%] bg-white'>

            {/* Form heading */}
            <FormHeading value='Create new User' />

            {/* Show the user is created successfully or not */}
            <StatusText navigate={navigate} />

            <span className={errStatus ? 'text-red-500' : 'text-green-400'}>{status}</span>

            {/* Create new User Form */}
            <Form submitFunction={createNewUser} states={states} setStates={setStates} buttonValue="Create User" />
        </div>
    )
}

export default CreateUser