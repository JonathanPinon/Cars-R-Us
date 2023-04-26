import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import SalespeopleList from './SalespeopleList';
import SalespeopleForm from './SalespeopleForm';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';


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
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="new" element={<SalespeopleForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
