import React from 'react'

const Button = ({ value }) => {
    return (
        <input className='bg-blue-400 cursor-pointer text-white font-bold p-2 rounded-lg mt-3' type="submit" value={value} />
    )
}

export default Button
