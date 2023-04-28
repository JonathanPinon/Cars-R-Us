import React, { useEffect, useState } from 'react';

function SaleHistory(){

    const [salespeople, setSalespeople] = useState([]);
    async function loadSalespeople(){
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if(response.ok){
            const data = await response.json();
            setSalespeople(data.salespeople);
        } else {
            console.error(response)
        }
    }
    const [saleHistory, setHistory] = useState([]);
    async function loadHistory() {
        const response = await fetch("http://localhost:8090/api/sales/");
        if(response.ok){
            const data = await response.json();
            setHistory(data.sales);
        } else {
            console.error(response);
        }
    }
    useEffect(() => {
        loadHistory()
        loadSalespeople()
    }, [])
    const [salesperson, setSalesperson] = useState('');
    const [historyList, setHistoryList] = useState([]);
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value)
        const filteredHistory = saleHistory.filter(history => history.salesperson.employee_id === value)
        setHistoryList(filteredHistory)
    }
    return (
    <div>
        <div>
            <div>
            <h1>Salesperson History</h1>
            <div>
                <select value={salesperson} onChange={handleSalespersonChange} id="salesperson" name="salesperson">
                <option value=''>Select salesperson</option>
                {salespeople.map(salesperson =>  {
                    return ( 
                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                            {salesperson.first_name} {salesperson.last_name}
                        </option>
                    )
                })}
                </select>
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {historyList.map(sale => {
                        return (
                            <tr key={sale.id}>
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
            </div>
        </div>
    </div>
    )

}
export default SaleHistory;