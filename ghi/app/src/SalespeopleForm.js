import React, { useState } from 'react';

function SalespeopleForm() {
    const [firstName, setFirstName] = useState('');
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const [lastName, setLastName] = useState('');
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const [employeeId, setEmployeeId] = useState('');
    const handleIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const data = {}
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const salespersonUrl = "http://localhost:8090/api/salespeople/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }

    return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Add Salesperson</h1>
                <form onSubmit={handleSubmit} className="row g-3" id="create-salesperson-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} placeholder="First Name" required type="text" value={firstName} name="first-name" id="first-name" className="form-control"/>
                        <label htmlFor="first-name">First Name...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" id="last-name" name="last-name" className="form-control" />
                        <label htmlFor="last-name">Last Name...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleIdChange} value={employeeId} name="employeeId" placeholder="Employee ID" id="employeeId" required type="text" className="form-control" />
                        <label htmlFor="employeeId">Employee ID...</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default SalespeopleForm;