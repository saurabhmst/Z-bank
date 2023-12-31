import React from 'react'
import { useNavigate } from 'react-router-dom';


const CustomerNavbar =()=> {
const navigate= new useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light center-navbar bg-blue-300 ">
        <div className="container cotent-align-center">
          <div
            className="navbar-collapse justify-content-center "
            id="navbarNav"
          >
            <ul className="navbar-nav h2 p-2 ms-auto">
            <li className="nav-item">
                <a className="nav-link mx-5 " href="/customer_dash_board">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-5 " href="/transaction">
                  Transaction
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link" href="/passbook">
                   PassBook
                </a>
              </li>
              <li className="nav-item mx-5">
                <a className="nav-link" href="/edit_profile">
                   Profile
                </a>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <ul class="nav navbar-nav navbar-right justify-content-right">
                <li>
                  <div class="btn-nav">
                    
                    <button class="btn btn-outline-danger btn-small navbar-btn" onClick={
                      ()=>{

                        localStorage.clear();
                        navigate('/')
                      }
                    }>
                      Logout
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default CustomerNavbar