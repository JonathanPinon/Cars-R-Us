import React, { useEffect, useState } from 'react'

function AutomobileForm(){
    const [models, setModels] = useState([]);
    async function loadModels() {
        const response = await fetch("http://localhost:8100/api/models/")
        if(response.ok){
            const data = await response.json()
            setModels(data.models)
        } else {
            console.error(response)
        }
    }
    useEffect(() => {
        loadModels()
    }, []);

    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [year, setYear] = useState('');
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const [vin, setVin] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const [model, setModel] = useState('');
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const data = {}
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        const autoUrl = "http://localhost:8100/api/automobiles/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(autoUrl, fetchConfig)
        if(response.ok){
            const data = await response.json()
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }
    return (
        <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
                <form onSubmit={handleSubmit} className="row g-3" id="create-hat-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleColorChange} placeholder="Color" required type="text" value={color} name="color" id="color" className="form-control"/>
                        <label htmlFor="color">Color...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleYearChange} placeholder="Year" required type="text" value={year} name="year" id="year" className="form-control"/>
                        <label htmlFor="year">Year...</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleVinChange} placeholder="Vin" required type="text" value={vin} name="vin" id="vin" className="form-control"/>
                        <label htmlFor="vin">Vin...</label>
                    </div>
                    <div className="col-md-4">
                        <select onChange={handleModelChange} required id="location" value={model} name="location" className="form-select">
                        <option value=''>Choose Model</option>
                        {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default AutomobileForm;