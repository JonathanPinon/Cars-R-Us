import React, { useEffect, useState } from 'react';

function SalespeopleList() {
    const [people, setPeople] = useState([]);
    async function loadSalespeople(){
        const response = await fetch("http://localhost:8090/api/salespeople/")
        if (response.ok) {
            const data = await response.json();
            setPeople(data.salespeople)
        } else {
            console.error(response)
        }
    }
    useEffect(() => {
        loadSalespeople()
    }, [])

    return (
        <div>
            <h1>Salespeople</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((person) => {
                        return (
                            <tr key={person.id}>
                                <td>{ person.employee_id }</td>
                                <td>{ person.first_name }</td>
                                <td>{ person.last_name }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default SalespeopleList;