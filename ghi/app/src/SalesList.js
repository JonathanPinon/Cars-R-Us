import React, { useEffect, useState } from 'react';

function SalesList(){
    const [sales, setSales] = useState([]);
    async function loadSales(){
        const response = await fetch("http://localhost:8090/api/sales/")
        if(response.ok){
            const data = await response.json();
            setSales(data.sales)
        } else {
            console.error(response)
        }
    }
    useEffect(() => {
        loadSales()
    }, [])

    return (
        <div>
            <h1>Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson ID</th>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => {
                        return (
                            <tr key={sale.id}>
                                <td>{ sale.salesperson.employee_id }</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                                <td>{ sale.automobile.vin }</td>
                                <td> ${ sale.price }.00</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default SalesList;