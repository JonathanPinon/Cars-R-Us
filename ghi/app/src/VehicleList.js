import React, { useState, useEffect } from 'react'

const VehicleList = (props) => {
  const [vehicleList, setVehicleList] = useState([])
  async function loadVehicles(){
      const response = await fetch('http://localhost:8100/api/models/');
      if(response.ok){
          const data = await response.json();
          setVehicleList(data.models)
      } else {
          console.error(response)
      }
  }
  useEffect(() => {
      loadVehicles()
  }, []);
  return (
    <div className="row">
      <h1 className="mt-3 mb-3 p-0">Vehicle models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Picture</th>
          </tr>
        </thead>
        <tbody>
            {vehicleList.map((vehicle)=>{
              return (
                <tr key={vehicle.href}>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.manufacturer.name}</td>
                  <td><img className='w-25' src={vehicle.picture_url} /></td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList

t
