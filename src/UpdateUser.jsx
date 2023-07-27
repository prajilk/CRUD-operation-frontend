import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {

    // Get id from param
    const { id } = useParams();

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


    // Function to update an existing User 
    const updateUser = (e) => {

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
            axios.post(`http://localhost:3000/update-user/${id}`, newUser).then((res) => {
                // The '.then()' block handles the response from the server after the POST request.

                // Check if the user was successfully saved on the server-side.
                if (res.data.updated) {
                    setErrRes(false);
                    setResponse("User update successfully");
                } else {
                    setErrRes(true)
                    setResponse("Something went wrong")
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            setErrRes(true)
            setResponse("Please enter valid data.")
        }
    }

    useEffect(() => {

        // Axios GET request to get user data by sending 'id' as param to the server.
        axios.get(`http://localhost:3000/fetch-user/${id}`)
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

            <h1 className='text-3xl font-bold text-center mb-4'>Update User</h1>
            <p className='underline text-blue-500 cursor-pointer' onClick={() => navigate("/")}>Go to home</p>

            <span className={errRes ? 'text-red-500' : 'text-green-400'}>{response}</span>

            {/* Form to update user data */}
            <form onSubmit={updateUser} method='post' className='flex flex-col'>

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
                <input className='bg-blue-400 cursor-pointer text-white font-bold p-2 rounded-lg mt-3' type="submit" value="Update User" />
            </form>
        </div>
    )
}

export default UpdateUser