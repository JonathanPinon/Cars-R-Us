import React, { useState } from 'react';

function CustomerForm(){
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

    const [address, setAddress] = useState('');
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const [phone, setPhone] = useState('');
    const handlePhoneChange = (event) => {
        const value = event.target.value;
        setPhone(value);
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const data = {}
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phone;

        const customerUrl = "http://localhost:8090/api/customers/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok){
            const data = await response.json();

            setAddress('');
            setFirstName('');
            setLastName('');
            setPhone('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add Customer</h1>
                    <form onSubmit={handleSubmit} className="row g-3" id="create-customer-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} placeholder="First Name" required type="text" value={firstName} name="first-name" id="first-name" className="form-control"  />
                            <label htmlFor="first-name">First Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} placeholder="Last Name" required type="text" value={lastName} name="last-name" id="last-name" className="form-control"  />
                            <label htmlFor="last-name">Last Name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleAddressChange} placeholder="Address" required type="text" value={address} name="address" id="address" className="form-control"  />
                            <label htmlFor="address">Address...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePhoneChange} placeholder="Phone" required type="text" value={phone} name="phone" id="phone" className="form-control"  />
                            <label htmlFor="phone">Phone...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm;
