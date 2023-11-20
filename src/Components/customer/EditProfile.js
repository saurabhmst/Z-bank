import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Shared/AdminNavbar";
import {
  getCustomerByUsername,
  updateCustomerService,
} from "../../Service/customer";
import { emailRegex, indianMobileRegex, mobileRegex, nameRegex } from "../../validation/Validation";
import { errorEmail, errorFirstname, errorLastname, errorMobile, fname, lname } from "../../validation/ErrorMessage";
import CustomerNavbar from "../../Shared/CustomerNavbar";
import { validateUser as validator } from "../../Service/userAuthentication";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [msg,setMsg]=useState("")
  const [validateUser,setIsValidUser] = useState()
  const navigate = new useNavigate();

  const getCustomerDetails = async () => {
    try{
    let response = await getCustomerByUsername(
      localStorage.getItem("username")
    );
    console.log("customer", response);
    setData(response.data);
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setMobile(response.data.mobile);
    setEmail(response.data.email);

  } catch (error) {
    alert(error.response.data.message)
  }
  };

  const saveCustomerDetail = async () => {
    try {
      let response = await updateCustomerService(
        data.customerId,
        firstName,
        lastName,
        mobile,
        email
      );

      if (response.status == 200) {
        alert("profile updated successfully!");
      }
      setCustomer(response);
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
      setCustomer(error)
    }
  };

  const ValidateUser = async()=>{
     
    let authToken = localStorage.getItem('access_token');
    if(!authToken)
    {
     setIsValidUser(false)
     alert('login as a customer first!')
     navigate('/')
    }
    console.log("auth value is "+authToken);
    let response = await validator(authToken)
    console.log("responce value is ",response.data.role)
    if(response.data.role != "ROLE_USER")
    {
       setIsValidUser(false);
       navigate('/')
       alert('login as a customer first!')
    }
   setIsValidUser(true)
   

  } 

  useEffect(()=>{
    ValidateUser()
  },[])

  useEffect(() => {
    getCustomerDetails();
  }, [customer]);

  return (
    <div>
      <CustomerNavbar></CustomerNavbar>

      <div class="container rounded mt-5 mb-5">
        <div class="row offset-3">
          <div class="col-md-3 border-right bg-white">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
              <span class="font-weight-bold"></span>
              {data.firstName + " " + data.lastName}
              <span class="text-black-50">{data.email}</span>
              <span> </span>
            </div>
          </div>

          <div class="col-5 border-right bg-white">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Settings</h4>
               
              </div>
              <div className="text-danger text-center">{msg}</div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <label class="labels">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if(!nameRegex.test(e.target.value)){
                        setMsg(errorFirstname)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">Surname</label>
                  <input
                    type="text"
                    class="form-control"
                    value={lastName}
                    placeholder="surname"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if(!nameRegex.test(e.target.value)){
                        setMsg(errorLastname)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <label class="labels">Mobile Number</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter phone number"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if(!mobileRegex.test(e.target.value)){
                        setMsg(errorMobile)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if(!emailRegex.test(e.target.value)){
                        setMsg(errorEmail)
                      }
                      else{
                        setMsg("")
                      }
                    }}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div class=" col-6 d-flex">
                  <button
                    className="btn btn-warning fw-bold"
                    type="button"
                    onClick={() => {
                      getCustomerDetails();
                    }}
                  >
                    Close
                  </button>
                  <button
                    class="btn btn-primary px-3 fw-bold ms-3"
                    type="button"
                    onClick={() => {
                      saveCustomerDetail();
                    }}
                  >
                    Save
                  </button>
                </div>
                
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30vh" }}></div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
