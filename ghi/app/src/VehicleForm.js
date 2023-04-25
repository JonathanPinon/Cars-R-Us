import React, { useState } from 'react'

const VehicleForm = (props) => {

//#region : useStates
const [name, setName] = useState('')
const [pictureUrl, setPictureUrl] = useState('')
const [manufacturer, setManufacturer] = useState('')
//#endregion

//#region : handler functions
const handleName = (event) => {
  const value = event.target.value
  setName(value)
}
const handlePictureUrl = (event) => {
  const value = event.target.value
  setPictureUrl(value)
}
const handleManufacturer = (event) => {
  const value = event.target.value
  setManufacturer(value)
}
//#endregion

//#region : submission handler

const handleSubmit = async (event) => {
  event.preventDefault();
  const data = {
    name: name,
    picture_url : pictureUrl,
    manufacturer_id: manufacturer
  }

  const url = 'http://localhost:8100/api/models/'
  const fetchConfig = {
    method: 'post',
    body: JSON.stringify(data),
    header: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(url, fetchConfig)
  if(response.ok){
    setName('')
    setPictureUrl('')
    setManufacturer('')
  }

}

//#endregion

  return (
    <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1 className="mb-3">Create a vehicle model</h1>
        <form onSubmit={handleSubmit} id="create-vehicle-model-form">
          <div className="form-floating mb-3">
            <input
              name="name"
              placeholder="Name"
              required
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={handleName}
            />
            <label htmlFor="name">Model Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="picture_url"
              placeholder="Picture URL"
              required
              type="text"
              id="picture_url"
              className="form-control"
              value={pictureUrl}
              onChange={handlePictureUrl}
            />
            <label htmlFor="picture_url">Picture URL</label>
          </div>
          <div className='form-floating mb-3'>
            <select
              required
              name="manufacturer_id"
              id="manufacturer_id"
              className="form-select"
              value={manufacturer}
              onChange={handleManufacturer}
              >
              <option value="">Choose a manufacturer</option>
              {props.manufacturer_list.map((manuf)=>{
                return (
                  <option key={manuf.href} value={manuf.id}>{manuf.name}</option>
                )
              })}
            </select>
          </div>
          <button className="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default VehicleForm
