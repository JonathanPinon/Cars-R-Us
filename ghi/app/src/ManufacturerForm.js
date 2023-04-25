import React, { useState, useEffect } from 'react';

function ManufacturerForm() {
    const [manufacturer, setManufacturer] = useState('')
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {};
        data.name = manufacturer;
        console.log(data)

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/"
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }

        const response = await fetch(manufacturerUrl, fetchConfig)
        if(response.ok){
            const data = await response.json();
            setManufacturer('');
        }
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Create a manufacturer</h1>
                <form onSubmit={handleSubmit} className="row g-3" id="create-hat-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleManufacturerChange} placeholder="Manufacturer Name..." required type="text" value={manufacturer} name="name" id="name" className="form-control"/>
                        <label htmlFor="name">Manufacturer Name...</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    )
}
export default ManufacturerForm;