import React, { useEffect, useState } from "react";
import Table from "../../Shared/tablecomp/Table";
import PaginationApp from "../../Shared/tablecomp/PaginationApp";
import {
  GetAllCustomer,
  deleteCustomerService,
  saveCustomer,
  updateCustomerService,
} from "../../Service/customer";
import PageSizeSetter from "../../Shared/tablecomp/PageSizeSetter";
import "./Customer.css";
import MyNavbar from "../../Shared/AdminNavbar";
import EditCustomer from "./EditCustomer";
import { Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { validateUser as validator } from "../../Service/userAuthentication";
import { eightCharAlphanumericPasswordRegex, emailRegex, indianMobileRegex, mobileRegex, nameRegex } from "../../validation/Validation";
import { errorEmail, errorFirstname, errorLastname, errorMobile, errorPassword } from "../../validation/ErrorMessage";

const AddCustomer = () => {
  const [pageSize, setPageSize] = useState(3);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState();
  const [totalpage, setTotalpage] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [mobile, setMobile] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [saveCustomers, setSaveCustomers] = useState();
  const [onDelete, setOnDelete] = useState();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState();
  const [isValidUser, setIsValidUser] = useState(false);
  const [msg, setMsg] = useState();
  const naviagte = new useNavigate();
  const getCustomer = async () => {
    console.log("pageSize.............." + pageSize);
    console.log("pageNumb.............." + pageNumber);

    try{
    let response = await GetAllCustomer(pageNumber, pageSize);
    console.log("request is", response.request.responseURL);
    console.log(response);
    if (response.data) {
      console.log("response==" + response.data.content);
      setData(response.data.content);
      setTotalrecord(response.headers["customer-count"]);
      console.log("total records +" + response.headers["customer-count"]);
      setTotalpage(Math.ceil(response.headers["customer-count"] / pageSize));
      console.log("page ct is " + totalpage);
    }

  } catch (error) {
    alert(error.response.data.message)
  }
  };

  const ValidateUser = async () => {
    
    let authToken = localStorage.getItem("access_token");
    if (!authToken) {
      setIsValidUser(false);
      alert("login as a admin first!");
      naviagte("/");
    }
    console.log("auth value is " + authToken);
    let response = await validator(authToken);
    console.log("responce value is ", response.data.role);
    if (response.data.role != "ROLE_ADMIN") {
      setIsValidUser(false);
      naviagte("/");
      alert("login as a admin first!");
    }
    setIsValidUser(true);
  };

  useEffect(() => {
    ValidateUser();
  }, []);

  useEffect(() => {
    console.log("use effect 1 called");
    getCustomer();
  }, [pageNumber, totalpage, totalrecord, saveCustomers, onDelete]);

  useEffect(() => {
    console.log("use effect 2 called");
    setPageNumber(0);
    getCustomer();
  }, [pageSize]);

  const handleSubmit = async (e) => {

    try{
    e.preventDefault();

    let d = await saveCustomer(
      name,
      surname,
      mobile,
      email,
      username,
      password
    );
    setSaveCustomers(d);
    alert("Customer added successfully!")
  } catch (error) {
    alert(error.response.data.message)
  }
  };

  const updateCustomer = async (customer) => {
    setName(customer.firstName);
    setSurname(customer.lastName);
    setEmail(customer.email);
    setMobile(customer.mobile);
    setUserId(customer.userId);
    setShow(true);

    console.log(
      "values are>>>>>>>>>>>>>>>>>>",
      customer.firstName,
      customer.lastName,
      customer.email,
      customer.mobile,
      customer.userId
    );
  };

  const editCustomerData = async () => {

    try{
    let response = await updateCustomerService(
      userId,
      name,
      surname,
      mobile,
      email
    );
    alert("customer updated successfully!");
    setSaveCustomers(response);

  } catch (error) {
    alert(error.response.data.message)
  }
  };

  const deleteCustomer = async (data) => {
    try{
    console.log("inside delete function", data.customerId);
    let response = await deleteCustomerService(data.customerId);
    setOnDelete(response);
    console.log(response);
  } catch (error) {
    alert(error.response.data.message)
  }
  };

  return (
    <div>
      <MyNavbar> </MyNavbar>
      <validateUser></validateUser>
      {show && (
        <EditCustomer
          firstName={name}
          lastName={surname}
          mobile={mobile}
          email={email}
          show={show}
          setFirstName={setName}
          setLastName={setSurname}
          setMobile={setMobile}
          setEmail={setEmail}
          setShow={setShow}
          editCustomerData={editCustomerData}
        ></EditCustomer>
      )}
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <div className="text-center text-dark m-5 fw-bold">
              <h1>Add New Customer</h1>
            </div>
            <form className="shadow-lg p-5 rounded-border border-warning text-white">
              <div className="text-danger text-center fw-bold">{msg}</div>
              <div class="mb-2">
                <label for="exampleInputEmail1" className="form-label">
                  First Name*
                </label>
                <input
                  type="text"
                  class="form-control rounded-pill text-dark fw-bold"
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!nameRegex.test(e.target.value)) {
                      setMsg(errorFirstname);
                    } else {
                      setMsg("");
                    }
                  }}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label">
                  Last Name*
                </label>
                <input
                  type="text"
                  class="form-control rounded-pill text-dark fw-bold"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setSurname(e.target.value);
                    if (!nameRegex.test(e.target.value)) {
                      setMsg(errorLastname);
                    } else {
                      setMsg("");
                    }
                  }}
                />
              </div>
              <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label">
                  Mobile*
                </label>
                <input
                  type="text"
                  class="form-control rounded-pill text-dark fw-bold"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setMobile(e.target.value);
                    if (!mobileRegex.test(e.target.value)) {
                      setMsg(errorMobile);
                    } else {
                      setMsg("");
                    }
                  }}
                />
              </div>
              <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label">
                  Email*
                </label>
                <input
                  type="text"
                  class="form-control rounded-pill text-dark fw-bold"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!emailRegex.test(e.target.value)) {
                      setMsg(errorEmail);
                    } else {
                      setMsg("");
                    }
                  }}
                />
              </div>
              <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label">
                  Username*
                </label>
                <input
                  type="text"
                  class="form-control rounded-pill text-dark fw-bold"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label">
                  Password*
                </label>
                <input
                  type="text"
                  class="form-control rounded-pill text-dark fw-bold"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!eightCharAlphanumericPasswordRegex.test(e.target.value)) {
                      setMsg(errorPassword);
                    } else {
                      setMsg("");
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary btn btn-lg rounded-pill border border-warning"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="row mt-5 ">
          <div className="col-8 offset-1">
            <PaginationApp
              totalpage={totalpage}
              setpage={setPageNumber}
              pageNumber={pageNumber}
              getData={getCustomer}
            ></PaginationApp>
          </div>

          <div className="col-2">
            <PageSizeSetter
              setPageSize={setPageSize}
              setTotalpage={setTotalpage}
              totalrecord={totalrecord}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            ></PageSizeSetter>
          </div>
        </div>

        <div className="col-10 offset-1">
          <div className="text-center">
            <label for="exampleInputPassword1" class="form-label">
              <h1>CustomerDetails</h1>
            </label>
          </div>
          <div className="m-3 mb-5">
            <Table
              data={data}
              isDeleteButton={true}
              isUpdateButton={true}
              deleteFun={deleteCustomer}
              UpdateFun={updateCustomer}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
