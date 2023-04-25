import React from 'react'

const VehicleList = (props) => {
  // need props for models
  // fix spacing in the future
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
            {props.vehicle_list.map((vehicle)=>{
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
