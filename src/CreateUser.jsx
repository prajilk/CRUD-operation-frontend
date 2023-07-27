import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

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
            <form onSubmit={createNewUser} method='post' className='flex flex-col'>

                {/* Input first name  */}
                <label htmlFor="fname" className='text-sm mt-3'>First name</label>
                <input
                    className='border-0 outline-0 bg-slate-200 rounded-lg px-3 py-2 mt-1'
                    type="text"
                    id='fname'
                    name='firstname'
                    placeholder='firstname'
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required />

                {/* Input last name  */}
                <label htmlFor="lname" className='text-sm mt-3'>Last name</label>
                <input
                    className='border-0 outline-0 bg-slate-200 rounded-lg px-3 py-2 mt-1'
                    type="text"
                    id='lname'
                    name="lastname"
                    placeholder='lastname'
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required />

                {/* Input date of birth  */}
                <label htmlFor="dob" className='text-sm mt-3'>Date of birth</label>
                <input
                    className='border-0 outline-0 bg-slate-200 rounded-lg px-3 py-2 mt-1'
                    type="date"
                    name="dob"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required />

                {/* Input Address */}
                <label htmlFor="address" className='text-sm mt-3'>Address</label>
                <input
                    className='border-0 outline-0 bg-slate-200 rounded-lg px-3 py-2 mt-1'
                    type="text"
                    name="address"
                    id="address"
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required />

                {/* Submit form */}
                <input className='bg-blue-400 cursor-pointer text-white font-bold p-2 rounded-lg mt-3' type="submit" value="Create User" />
            </form>
        </div>
    )
}

export default CreateUser