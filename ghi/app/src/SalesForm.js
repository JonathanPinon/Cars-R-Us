import React, { useState, useEffect } from 'react';

function SalesForm(){
    const [vins, setVins] = useState([]);
    async function loadVins(){
        const response = await fetch("http://localhost:8100/api/automobiles/")
        if(response.ok){
            const data = await response.json();
            const unsoldCars = data.autos.filter(auto => !auto.sold); 
            setVins(unsoldCars);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        loadVins()
    }, [])

    const [salespeople, setSalespeople] = useState([]);
    async function loadSalesperson(){
        const response = await fetch("http://localhost:8090/api/salespeople/")
        if (response.ok){
            const data = await response.json();
            setSalespeople(data.salespeople);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        loadSalesperson()
    }, [])

    const[customers, setCustomers] = useState([]);
    async function loadCustomers(){
        const response = await fetch("http://localhost:8090/api/customers/")
        if (response.ok){
            const data = await response.json();
            setCustomers(data.customers);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
         loadCustomers()   
    }, [])

    const[automobile, setAutomobile] = useState('');
    const handleVinChange = (event) => {
        const value = event.target.value;
        setAutomobile(value)
    }

    const [salesperson, setSalesperson] = useState('');
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {};
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;
        data.automobile = automobile;

        const saleUrl = "http://localhost:8090/api/sales/"
        const autoUrl = `http://localhost:8100/api/automobiles/${data.automobile}/`
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                'Content-type': 'appliation/json'
            }
        }

        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok){
            const data = await response.json()
            
            const fetchConfig2 = {
                method: 'put',
                body: JSON.stringify({sold: true}),
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const sponse = await fetch (autoUrl, fetchConfig2);
            if (sponse.ok){
            setCustomer('');
            setPrice('');
            setSalesperson('');
            setAutomobile('');
            }
            // setCustomer('');
            // setPrice('');
            // setSalesperson('');
            // setAutomobile('');
        } else {
            console.error(response)
        }
    }
    return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
            <h1>Record a new sale</h1>
                <form onSubmit={handleSubmit} className="row g-3" id="create-manufacturer-form">
                    <div>
                        <select onChange={handleVinChange} id="vin" value={automobile} name="location" className="form-select">
                        <option value=''>Choose an automobile VIN...</option>
                        {vins.map(automobile => {
                            return ( 
                                <option key={automobile.vin} value={automobile.vin}>
                                    {automobile.vin}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <div>
                        <select onChange={handleSalespersonChange} id="salesperson" value={salesperson} name="salesperson" className="form-select">
                        <option value=''>Choose a salesperson...</option>
                        {salespeople.map(employee => {
                            return (
                                <option key={employee.employee_id} value={employee.employee_id}>
                                    {employee.first_name} {employee.last_name}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <div>
                        <select onChange={handleCustomerChange} id="customer" value={customer} name="customer" className="form-select">
                        <option value=''>Choose a customer...</option>
                        {customers.map(customer => {
                            return (
                                <option key={customer.id} value={customer.id}>
                                    {customer.first_name} {customer.last_name}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePriceChange} placeholder="Price" required type="number" value={price} name="price" id="price" className="form-control"/>
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default SalesForm;