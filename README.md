# CarCar

Team:

* Person 1 - Which microservice? Jonathan Pinon - Sales
    Inventory --> Manufacturer List & Form, Automobile List & Form
* Person 2 - Which microservice? Diana - Service

## Instructions to Get Started

<p>Clone the repository project at:
https://gitlab.com/sjp19-public-resources/sjp-2022-april/project-beta <br>
*Type this in your terminal to run docker <br>
docker volume create beta-data <br>
 docker-compose build <br>
 docker-compose up <br>

*Confirm that all  containers are running <br>
Run the application at: http://localhost:3000/ <br>

## Design
![alt text](project_beta_diagram.png "Project Beta Diagram")

## Microservice Ports
Front-end application: http://localhost:3000/ <br>
Inventory API: http://localhost:8100/ <br>
Service API: http://localhost:8080/ <br>
Sales API: http://localhost:8090/ <br>

## API
Website Url: `http://localhost:3000/` + specified url path.

### Inventory
The inventory drop down menu allows you to:
- View lists of Manifacturers, Models, and Automobiles (Sold/Unsold) 
- Add new Manifacturers, Models, and Automobiles 

| Url Paths | Method | Action | Required Field(s) |
|---|---|---|---|
| `automobiles/` | GET | List all Automobiles | 
| `automobiles/new/` | POST | Form to add Automobile | Color, Year, Vin, Model Choice|
| `vehicle/` | GET | List all Vehicle Models |
| `vehicle/new/` | POST | Form to add Vehicle Model | Name, Picture Url, Manufacturer Choice|
| `manufacturer/` | GET | List all Manufacturers |
| `manufacturer/new/` | POST | Form to add Manufacturer | Manufacturer Name |

### Sales
The sales drop down menu allows you to:
- View lists of Salespeople, Customers, and Sales/Individual Sale History
- Create new Salespeople, Customers, and Sales

| Url Paths | Method | Action | Required Field(s) |
|---|---|---|---|
| `salespeople/` | GET | List all Salespeople | 
| `salespeople/new/` | POST | Form to add Salesperson | First Name, Last Name, Employee ID|
| `customer/` | GET | List all Customers |
| `customer/new/` | POST | Form to add Customer | First Name, Last Name, Address, Phone|
| `sales/` | GET | List all Sales |
| `sales/new/` | POST | Form to add Sale| VIN, Salesperson, Customer, Price |
| `sales/history/` | GET | List of Employee Sale History |

## Sales microservice

The Sales microservice manages creating, deleting, and recieving data instances created from the four models.The Sales microservice conatins 4 models: Customer, Salesperson, Sale, *AutomobileVO*. 

The *AutomobileVO* is a duplicate of our Inventory Automobile model, and only take in one field `vin`. We use polling to scout for data in our Inventory database, and populate our sales database with the same automobile vins.

Each model, except for the *AutomobileVO*, has two view functions one that handles the methods `GET` and `POST` and another that handles `DELETE`.

Everything request for the sales microservice will be managed at `http://localhost:8090/api/` + specified url paths.

#### Salespeople


The Salesperson Model contains 3 required fields:

- first_name
- last_name
- employee_id

*The "POST" method requires all three fields to be present in the request in order process successfully. It will return an object with the inputted information and a new id field.* 


| Action | Method | Url Path |
|---|---|---|
| Create Salesperson | POST | `salespeople/`|
<details>
<summary>JSON</summary>
<br>

Sent:
```
{
    "first_name": "Bob",
    "last_name": "Saget",
    "employee_id": "BSag",
}
```
Returns:
```
{
    "first_name": "Bob",
    "last_name": "Saget",
    "employee_id": "BSag",
    "id": 2
}
```
</details>

*The "DELETE" method takes the salesperson id (not the emloyee_id), and deletes that instance of the employee from the database. It returns an object stating whether or not the salesperson has been deleted*

| Action | Method | Url Path |
|---|---|---|
| Delete Salesperson | DELETE | `salespeople/:id/`|
<details>
<summary>JSON</summary>

Returns:
```
{
    {"Employee Terminated": True}
}
```
</details>

*The "GET" method returns an object containing the key: "salespeople" and the value: [list of all salespeople on record].*
| Action | Method | Url Path |
|---|---|---|
| List all Salespeople | GET | `salespeople/`|
<details>
<summary>JSON</summary>
<br>

Returns:
```
{
"salespeople": [
    {
        "first_name": "Jonathan",
        "last_name": "Pinon",
        "employee_id": "JPinon",
        "id": 1
    },
    {
        "first_name": "Bob",
        "last_name": "Saget",
        "employee_id": "BSag",
        "id": 2
    }
]
}
```
</details>

#### Customers

The Customer Model contains 4 required fields:

- first_name
- last_name
- address
- phone_number

*The customer "POST" method requires all four fields to be present in order process successfully. It will return an object with the input information and a new id field.* 


| Action | Method | Url Path |
|---|---|---|
| Create Customer | POST | `customers/`|
<details>
<summary>JSON</summary>
<br>

Sent:
```
{
	"first_name": "Quentin",
	"last_name": "Tarantino",
	"address": "123 Hollywood Blvd, CA 90210",
	"phone_number": "323-443-8493",
}
```
Returns:
```
{
	"first_name": "Quentin",
	"last_name": "Tarantino",
	"address": "123 Hollywood Blvd, CA 90210",
	"phone_number": "323-443-8493",
	"id": 1
}
```
</details>

*The customer "DELETE" method takes the customer id, and deletes that instance of the customer. It returns an object stating whether or not they have been deleted*

| Action | Method | Url Path |
|---|---|---|
| Delete Customer | DELETE | `customers/:id/`|
<details>
<summary>JSON</summary>

Returns:
```
{
    {"Customer Deleted": True}
}
```
</details>

*The customers "GET" method returns an object containing the key: "customers" and the value: [list of all customers on record].*

| Action | Method | Url Path |
|---|---|---|
| List all Customers | GET | `customers/`|
<details>
<summary>JSON</summary>
<br>

Returns:
```
{
"customers":[
    {
            "first_name": "Quentin",
            "last_name": "Tarantino",
            "address": "123 Hollywood Blvd, CA 90210",
            "phone_number": "323-443-8493",
            "id": 1
        },
        {
            "first_name": "Ronnie",
            "last_name": "Coleman",
            "address": "124 Hollywood Blvd, CA 90210",
            "phone_number": "800-443-8456",
            "id": 2
        }
    ]
}
```
</details>
The Sale Model contains 4 required fields:

- Price
- id (Customer)
- Employee_id (Salesperson)
- Vin (Automobile)

*The sale "POST" method requires all four fields to be present, and valid, in order process successfully. It will return an object with the complete information from user input, a new id field, and the key: "sold" with a value: "true" in our automobile object.* 


| Action | Method | Url Path |
|---|---|---|
| Create Sale | POST | `sales/`|
<details>
<summary>JSON</summary>
<br>

Sent:
```
{
	"price": 200000.00,
	"customer": 5,
	"salesperson": "CJay",
	"automobile": "12345JONATHAN1998"
}
```
Returns:
```
{
	"price": 200000.0,
	"customer": {
		"first_name": "Quentin",
		"last_name": "Tarantino",
		"address": "123 Hollywood Blvd, CA 90210",
		"phone_number": "323-443-8493",
		"id": 5
	},
	"salesperson": {
		"first_name": "Charles",
		"last_name": "Jay",
		"employee_id": "CJay",
		"id": 2
	},
	"automobile": {
		"vin": "12345JONATHAN1998",
		"sold": true
	},
	"id": 1
}
```
</details>

*The sale "DELETE" method takes the sales id, and deletes that instance of the sale. It returns an object stating whether or not the sale has been deleted.*

| Action | Method | Url Path |
|---|---|---|
| Delete Sale | DELETE | `sales/:id/`|
<details>
<summary>JSON</summary>

Returns:
```
{
    {"Sale Removed": True}
}
```
</details>

*The sales "GET" method returns an object containing the key: "sales" and the value: [list of all sales on record].*

| Action | Method | Url Path |
|---|---|---|
| List all Sales | GET | `sales/`|
<details>
<summary>JSON</summary>
<br>

Returns:
```
{
"sales":[
    {
        "price": 200000.0,
        "customer": {
            "first_name": "Quentin",
            "last_name": "Tarantino",
            "address": "123 Hollywood Blvd, CA 90210",
            "phone_number": "323-443-8493",
            "id": 5
        },
        "salesperson": {
            "first_name": "Charles",
            "last_name": "Jay",
            "employee_id": "CJay",
            "id": 2
        },
        "automobile": {
            "vin": "12345JONATHAN1998",
            "sold": true
        },
        "id": 1
    },
        {
        "price": 73000,
        "customer": {
            "first_name": "Ronnie",
            "last_name": "Coleman",
            "address": "124 Hollywood Blvd, CA 90210",
            "phone_number": "800-443-8456",
            "id": 6
        },
        "salesperson": {
            "first_name": "Michael",
            "last_name": "Jordan",
            "employee_id": "MJordan",
            "id": 8
        },
        "automobile": {
            "vin": "091TACOMA0192TACO",
            "sold": true
        },
        "id": 15
    }
    ]
}
```
</details>

## Service microservice

The Service microservice retrieves car data from the Inventory microservice and creates value objects for managing car data through the Service API. Users can create service appointments, technicians, view appointments, cancel or mark them as finished, and delete technicians.

## RestFul API (Port 8080):


# Technicians API

This API provides endpoints to manage technicians in a system.

## Endpoints

| Action              | Method | URL                                          |
|---------------------|--------|----------------------------------------------|
| List Technicians    | GET    | http://localhost:8080/api/technicians/       |
| Create a Technician | POST   | http://localhost:8080/api/technicians/       |
| Show Technician Details | GET | http://localhost:8080/api/technicians/:id |

### List Technicians

Retrieves a list of all technicians.

* Method: `GET`
* Response: A list of all technicians in the system. The exact format of the response will depend on the implementation of the API.

### Create a Technician

Adds a new technician to the system.

* Method: `POST`
* Request Body: A JSON object containing the details of the new technician.
* Response: The details of the newly created technician in a JSON object.

### Show Technician Details

Retrieves the details of a specific technician.

* Method: `GET`
* URL Parameters:
  * `id`: The ID of the technician to retrieve.
* Response: The details of the specified technician in a JSON object.

### Create Technicians Input
```
{
	"name": "Tim",
	"employee_number": 200
}
```

### Get Technician Output
```
{
	"technician": {
		"name": "Bob",
		"employee_number": 2,
		"id": 2
	}
}
```



# Appointments API

This API provides endpoints to manage appointments in a system.

## Endpoints

| Action                  | Method | URL                                          |
|-------------------------|--------|----------------------------------------------|
| List All Appointments   | GET    | http://localhost:8080/api/appointments/     |

### List All Appointments

Retrieves a list of all appointments.

* Method: `GET`
* Response: A list of all appointments in the system.
