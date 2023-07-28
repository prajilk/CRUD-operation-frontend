import React from 'react'

const Input = ({ state, setState, name, id }) => {
    return (
        <input className='border-0 outline-0 bg-slate-200 rounded-lg px-3 py-2 mt-1'
            type="text"
            id={id}
            name={name}
            placeholder={name}
            value={state}
            onChange={(e) => setState(e.target.value)}
            required />
    )
}

export default Input
