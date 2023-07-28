import React from 'react'

const StatusText = ({ navigate }) => {
    return (
        <p className='underline text-blue-500 cursor-pointer' onClick={() => navigate("/")}>Go to home</p>
    )
}

export default StatusText
