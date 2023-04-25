import React, { useEffect, useState } from 'react';

function AutomobileList(){
    const [automobiles, setAutomobileList] = useState([]);
    async function loadAutomobiles(){
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if(response.ok){
            const data = await response.json();
            setAutomobileList(data.autos)
        } else {
            console.error(response)
        }
    }
    useEffect(() => {
        loadAutomobiles()
    }, []);

    return (
        <div>
            <h1>Automobiles</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map((automobile) => {
                        return (
                            <tr key={automobile.href}>
                                <td>{ automobile.vin }</td>
                                <td>{ automobile.color }</td>
                                <td>{ automobile.year }</td>
                                <td>{ automobile.model.name }</td>
                                <td>{ automobile.model.manufacturer.name }</td>
                                <td>{ automobile.sold ? "Yes":"No" }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default AutomobileList;