import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import TechnicianForm from "./TechnicianForm";
import ServiceHistory from "./ServiceHistory";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturer">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="vehicle">
            <Route index element={<VehicleList />} />
            <Route path="new" element={<VehicleForm />} />
          </Route>
          <Route path="automobile">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="appointment">
            <Route index element={<AppointmentList/>} />
            <Route
              path="new"element={<AppointmentForm/>}
            />
          </Route>
          <Route path="technician">
            <Route index element={<TechnicianForm />} />
          </Route>
          <Route path="service_history">
            <Route index element={<ServiceHistory />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
