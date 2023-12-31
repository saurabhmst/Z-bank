import React from 'react'
import { Navbar } from 'react-bootstrap';
import "./Admin.css"
import AdminNavbar from '../../Shared/AdminNavbar';


function AdminDashBoard() {
  return (
    <div className='m-0'>
      <div className='row'>
      <AdminNavbar></AdminNavbar>
      </div>
     
   <div className='text-center mt-5'><h1>Admin Dash-Board</h1></div>
<div className=''style={{marginTop:"10vh"}}>
<div className='row justify-content-center'>
<div className="card col-3 m-3 shadow-lg">
  <div className="card-body text-center ">
    <h5 className="card-title m-5"><h2>Add New Customer</h2></h5>  
    <a href={('/add_customer')} className="btn btn-primary btn-lg btn-block flex">Add Customer</a> 
  </div>
</div>

<div className="card col-3 m-3 shadow-lg ">
  <div className="card-body text-center ">
    <h5 className="card-title text-center m-5"><h2>Add New Account</h2></h5>
    <a href={('/add_account')} className="btn btn-primary btn-lg btn-block">Add Account</a>
  </div>
</div>

<div className="card col-3 m-3 shadow-lg">
  <div className="card-body text-center ">
    <h5 className="card-title text-center m-5"><h2>Add A New Bank</h2></h5>
    <a href={('/add_bank')} className="btn btn-primary btn-lg btn-block">Add Bank</a>
  </div>
</div>
</div>


<div className='row my-5 justify-content-center '>
<div className=" card col-3 m-3 shadow-lg">
  <div className="card-body text-center">
    <h5 className="card-title m-5"><h2>Show Customer</h2></h5> 
    <a href={('/get_customer')} className="btn btn-primary btn-lg btn-block">Show Customer</a>
  </div>
</div>

<div className="card col-3 m-3 shadow-lg ">
  <div className="card-body text-center ">
    <h5 className="card-title text-center m-5"><h2>Show Accounts</h2></h5>
    <a href={('/get_account')} className="btn btn-primary btn-lg btn-block">Show Account</a>
  </div>
</div>
<div className="card col-3 m-3 shadow-lg ">
  <div className="card-body text-center ">
    <h5 className="card-title text-center m-5 hoverable"><h2>Show Banks</h2></h5>
    <a href={('/get_bank')} className="btn btn-primary btn-lg btn-block">Show Transactions</a>
  </div>
  </div> 
</div>
</div>
<div style={{marginTop:"20vh"}}>

</div>




</div>

  )
}

export default AdminDashBoard;