import React from 'react'
import Label from './Label'
import Input from './Input'
import Button from './Button'

const Form = ({ submitFunction, states, setStates, buttonValue }) => {
    return (
        <form onSubmit={submitFunction} method='post' className='flex flex-col'>

            {/* Input first name  */}
            <Label value='First name' forId='fname' />
            <Input state={states.fname} setState={setStates.setFname} name='firstname' id='fname' />

            {/* Input last name  */}
            <Label value='Last name' forId='lname' />
            <Input state={states.lname} setState={setStates.setLname} name='lastname' id='lname' />

            {/* Input date of birth  */}
            <Label value='Date of Birth' forId='dob' />
            <input
                className='border-0 outline-0 bg-slate-200 rounded-lg px-3 py-2 mt-1'
                type="date"
                name="dob"
                id="dob"
                value={states.dob}
                onChange={(e) => setStates.setDob(e.target.value)}
                required />

            {/* Input Address */}
            <Label value='Address' forId='address' />
            <Input state={states.address} setState={setStates.setAddress} name='address' id='address' />

            {/* Submit form */}
            <Button value={buttonValue} />

        </form>
    )
}

export default Form
