import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const ViewUsers = () => {

    // State variables to store all users in the db
    const [users, setUsers] = useState([]);

    // The 'navigate' function from the 'react-router-dom' library used for programmatic navigation.
    const navigate = useNavigate();

    // Function to fetch all users from the Database
    const fetchUser = () => {
        // Axios GET request to fetch all users from the DB
        axios.get(`${import.meta.env.VITE_SERVER_URL}/users`)
            .then((res) => {
                if (res.data.success) {
                    setUsers(res.data.users);
                }
            })
            .catch((error) => {
                // Handle any errors from the API call
                console.error('Error fetching users:', error);
            });
    }

    useEffect(() => {
        fetchUser();
    }, []); // Empty dependency array to ensure it runs only once


    // Function that takes user id to delete user data 
    const deleteUser = (userId) => {

        // Confirm the request to delete the user
        const response = confirm("Are you sure you want to delete this user?");
        if (response) {
            // Axios DELETE request to delete the given user from the DB by ID
            axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete-user/${userId}`).then((res) => {
                if (res.data.success) {
                    // Call fetch method to fetch user data after DELETION
                    fetchUser();
                }
            })
        }
    }

    // Redirect to "/update-user" route when EDIT button pressed
    const updateUser = (userId) => {
        navigate(`/update-user/${userId}`);
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className='flex justify-between items-center'>
                            <h1 className='text-white text-2xl font-bold'>User Data</h1>
                            <button className='float-right bg-green-600 px-3 py-2 text-white rounded-md my-3 cursor-pointer' onClick={() => navigate('/create-user')}>Create new user</button>
                        </div>
                        <table className="min-w-full text-left text-sm font-light bg-white">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">id</th>
                                    <th scope="col" className="px-6 py-4">First name</th>
                                    <th scope="col" className="px-6 py-4">Last name</th>
                                    <th scope="col" className="px-6 py-4">DOB</th>
                                    <th scope="col" className="px-6 py-4">Address</th>
                                    <th scope="col" className="px-6 py-4">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Using map function loop through all the users from the DB */}
                                {users.map((user, index) => {
                                    return (
                                        <tr className="border-b dark:border-neutral-500" key={index}>
                                            <td className="whitespace-nowrap px-6 py-4 font-bold">{user.id}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.first_name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.last_name}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.dob}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.address}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <button
                                                    className='bg-blue-700 px-2 py-1 text-white rounded-md me-2'
                                                    onClick={() => updateUser(user.id)}>Edit</button>
                                                <button
                                                    className='bg-red-700 px-2 py-1 text-white rounded-md'
                                                    onClick={() => deleteUser(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUsers
