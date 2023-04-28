import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CarCar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Inventory
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li><Link className="dropdown-item" to="manufacturer">Manufacturer List</Link></li>
            <li><Link className="dropdown-item" to="manufacturer/new">Manufacturer Form</Link></li>
            <li><Link className="dropdown-item" to="vehicle">Vehicle List</Link></li>
            <li><Link className="dropdown-item" to="vehicle/new">Vehicle Form</Link></li>
            <li><Link className="dropdown-item" to="automobile">Automobile List</Link></li>
            <li><Link className="dropdown-item" to="automobile/new">Automobile Form</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sales
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><Link className="dropdown-item" to="sales_person">Add Sales Person</Link></li>
            <li><Link className="dropdown-item" to="customer">Add Customer</Link></li>
            <li><Link className="dropdown-item" to="sales_record">Sales Records</Link></li>
            <li><Link className="dropdown-item" to="sales_record/new">Create Sales Record</Link></li>

          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Services
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><Link className="dropdown-item" to="appointment">Appointment List</Link></li>
            <li><Link className="dropdown-item" to="appointment/new">Appointment Form</Link></li>
            <li><Link className="dropdown-item" to="technician">Technician Form</Link></li>
            <li><Link className="dropdown-item" to="service_history">Service History</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Nav;
