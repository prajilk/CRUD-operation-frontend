import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form';
import useUserData from '../hooks/useUserData';
import useStatus from '../hooks/useStatus';

const UpdateUser = () => {

    // Get id from param
    const { id } = useParams();

    // Get all user data states from useUserData.js file
    const { fname, setFname, lname, setLname, dob, setDob, address, setAddress } = useUserData();

    // Get all status states from useStatus.js file
    const { status, setStatus, errStatus, setErrStatus } = useStatus();

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

    // The 'navigate' function from the 'react-router-dom' library used for programmatic navigation.
    const navigate = useNavigate();


    // Function to update an existing User 
    const updateUser = (e) => {

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
            axios.post(`${import.meta.env.VITE_SERVER_URL}/update-user/${id}`, newUser).then((res) => {
                // The '.then()' block handles the response from the server after the POST request.

                // Check if the user was successfully saved on the server-side.
                if (res.data.updated) {
                    setErrStatus(false); // Reset the 'errStatus' state to false (no error).
                    setStatus("User update successfully"); // Update the 'status' state with a success message.
                } else {
                    setErrStatus(true) // Set 'errStatus' state to true to indicate an error occurred.
                    setStatus("Something went wrong") // Update the 'status' state with an error message.
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            setErrStatus(true) // Set 'errStatus' state to true to indicate an error occurred.
            setStatus("Please enter valid data.") // Update the 'status' state with an error message.
        }
    }

    useEffect(() => {

        // Axios GET request to get user data by sending 'id' as param to the server.
        axios.get(`${import.meta.env.VITE_SERVER_URL}/fetch-user/${id}`)
            .then((res) => {
                if (res.data.success) {
                    // Set the fetched data to the input fields
                    const user = res.data.user;
                    setFname(user.first_name);
                    setLname(user.last_name);
                    setDob(user.dob);
                    setAddress(user.address);
                }
            })
            .catch((error) => {
                // Handle any errors from the API call
                console.error('Error fetching users:', error);
            });
    }, []); // Empty dependency array to ensure it runs only once

    return (
        <div className='rounded-xl mx-auto mt-10 p-7 w-full md:w-[40%] bg-white'>

            {/* Form heading */}
            <FormHeading value='Update User' />

            {/* Show the user is updated successfully or not */}
            <StatusText navigate={navigate} />

            <span className={errStatus ? 'text-red-500' : 'text-green-400'}>{status}</span>


            <Form submitFunction={updateUser} states={states} setStates={setStates} buttonValue="Update User" />

        </div>
    )
}

export default UpdateUser