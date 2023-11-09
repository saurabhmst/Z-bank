import React from 'react'
import { Navbar } from 'react-bootstrap';
import MyNavbar from '../../Shared/MyNavbar';


function CustomerDashBoard() {
  return (
    <div>
      <MyNavbar ></MyNavbar>
   
<div className=''style={{marginTop:"20vh"}}>
<div className='row offset-2 my-5'>
<div class="card col-3 m-2 shadow-lg ">
  <div class="card-body text-center ">
    <h5 class="card-title text-center m-5"><h2>Transaction</h2></h5>
    <a href={('/transaction')} class="btn btn-primary btn-lg btn-block">Do Transaction</a>
  </div>
</div>

<div className="card col-3 m-2 shadow-lg ">
  <div class="card-body text-center ">
    <h5 class="card-title text-center m-5"><h2>Paasbook</h2></h5>
    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    <a href={('/passbook')} class="btn btn-primary btn-lg btn-block">Paasbook</a>
  </div>
</div>

<div class="card col-3 m-2 shadow-lg">
  <div class="card-body text-center">
    <h5 class="card-title text-center m-5"><h2>Profile</h2></h5>
    <a href={('/profile')} class="btn btn-primary btn-lg btn-block">Profile</a>
  </div>
</div>
</div>
</div>
<div style={{marginTop:"30vh"}}>

</div>
</div>

  )
}

export default CustomerDashBoard;