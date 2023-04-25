import React, { useState, useEffect} from 'react';

function ManufacturerList() {
    const [manufacturerList, setManufacturerList] = useState([])
    async function loadManufacturers(){
        const response = await fetch('http://localhost:8100/api/manufacturers/');
        if(response.ok){
            const data = await response.json();
            setManufacturerList(data.manufacturers)
        } else {
            console.error(response)
        }
    }
    useEffect(() => {
        loadManufacturers()
    }, []);

    return (
        <div>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturerList.map((manufacturer) => {
                        return (
                            <tr key={manufacturer.href}>
                                <td>{ manufacturer.name }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default ManufacturerList;