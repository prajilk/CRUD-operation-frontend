import React from 'react'

const Label = ({ forId, value }) => {
    return (
        <label htmlFor={forId} className='text-sm mt-3'>{value}</label>
    )
}

export default Label
