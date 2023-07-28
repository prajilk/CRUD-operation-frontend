import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const CreateUser = () => {

    // State variables to store form input values for first name, last name, date of birth, and address.
    const [fname, setFname] = useState('');    // State for first name.
    const [lname, setLname] = useState('');    // State for last name.
    const [dob, setDob] = useState('');        // State for date of birth.
    const [address, setAddress] = useState(''); // State for address.

    // State variables to handle the response message and error status after form submission.
    const [response, setResponse] = useState(''); // State for the response message.
    const [errRes, setErrRes] = useState(false);  // State to indicate if an error occurred during form submission.

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
        if (fname !== '' && lname !== '' && dob !== '' && address !== '') {
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
                    setErrRes(false); // Reset the 'errRes' state to false (no error).
                    setResponse("New user created"); // Update the 'response' state with a success message.
                } else {
                    setErrRes(true) // Set 'errRes' state to true to indicate an error occurred.
                    setResponse("Something went wrong"); // Update the 'response' state with an error message.
                }
            });

        } else {
            setErrRes(true) // Set 'errRes' state to true to indicate an error occurred.
            setResponse("Please fill out all the fields!") // Update the 'response' state with an error message.
        }
    }

    return (
        <div className='rounded-xl mx-auto mt-10 p-7 w-full md:w-[40%] bg-white'>

            <h1 className='text-3xl font-bold text-center mb-4'>Create new User</h1>
            <p className='underline text-blue-500 cursor-pointer' onClick={() => navigate("/")}>Go to home</p>

            <span className={errRes ? 'text-red-500' : 'text-green-400'}>{response}</span>

            {/* Create new User Form */}
            <Form submitFunction={createNewUser} states={states} setStates={setStates} buttonValue="Create User" />
        </div>
    )
}

export default CreateUser