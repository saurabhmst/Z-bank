import React, { useEffect, useState } from "react";
import PaginationApp from "../../Shared/tablecomp/PaginationApp";
import PageSizeSetter from "../../Shared/tablecomp/PageSizeSetter";
import { GetAccounts, deleteAccountService, saveAccount } from "../../Service/account";
import Table from "../../Shared/tablecomp/Table";
import './Account.css'
import MyNavbar from "../../Shared/AdminNavbar";
import ShowAllaccount from './ShowAllAccount';
import { useNavigate } from "react-router-dom";
import { GetAllBanks, GetBanks } from "../../Service/bank";
import { validateUser as validator } from "../../Service/userAuthentication";
import { getAllCustomer } from "../../Service/customer";
import { nameRegex } from "../../validation/Validation";
import { errorBankName } from "../../validation/ErrorMessage";


const AddAccount = () => {
  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState();
  const [totalpage, setTotalpage] = useState();
  const [customerId, setCustomerId] = useState(0);
  const [bankId, setBankId] = useState();
  const [balance, setBalance] = useState();
  const [saveAccounts, setSaveAccounts] = useState();
  const [onDelete,setOnDelete] = useState();
  const [validateUser,setIsValidUser]=useState()
  const navigate = new useNavigate();
  const [customer,setCustomer]=useState([])
  const [bank,setBank]=useState([])
  const [msg,setMsg]=useState('');
  const getAccount = async () => {
    try
    {
    console.log("pageSize.............." + pageSize);
    console.log("pageNumb.............." + pageNumber);

    let response = await GetAccounts(pageNumber, pageSize);
    console.log("request is", response.request.responseURL);
    console.log(response);
    if (response.data) {
      console.log("response==" + response.data.content);
      setData(response.data.content);
      setTotalrecord(response.headers["account-count"]);
      console.log("total records +" + totalrecord);
      setTotalpage(Math.ceil(response.headers["account-count"] / pageSize));
      console.log("page ct is " + totalpage);
    }

  } catch (error) {
    alert(error.response.data.message)
  }
    
  };

  const ValidateUser = async()=>{
     
    let authToken = localStorage.getItem('access_token');
    if(!authToken)
    {
     setIsValidUser(false)
     alert('login as a admin first!')
     navigate('/')
    }
    console.log("auth value is "+authToken);
    let response = await validator(authToken)
    console.log("responce value is ",response.data.role)
    if(response.data.role != "ROLE_ADMIN")
    {
       setIsValidUser(false);
       navigate('/')
       alert('login as a admin first!')
    }
   setIsValidUser(true)
   

  } 

  useEffect(()=>{
    ValidateUser()
  },[])

  useEffect(() => {
    console.log("use effect called");
    getAccount();
  }, [pageNumber, pageSize, totalpage, totalrecord,saveAccounts, onDelete]);

  const handleSubmit = async (e) => {
    if(balance<2000)
    alert("amount should be greater then 2000")
  else
  {
    try{
    let d = await saveAccount(customerId, bankId, balance);
    setSaveAccounts(d);
    getCustomer();
    alert("Account Created Successfully!")
  } catch (error) {
    alert(error.response.data.message)
  }
  }
    
    
  };


   const deleteAccount=async(data)=>{

     try{
     console.log("inside delete function",data.accountNo)
     let response = await deleteAccountService(data.accountNo)
     setOnDelete(response);
     console.log(response);
    } catch (error) {
      alert(error.response.data.message)
    }
    }

    const getCustomer=async()=>
    {
      try{
      let response = await getAllCustomer();
      console.log("getcustomer data is-----------------",response);
      setCustomer(response.data);
    } catch (error) {
      alert(error.response.data.message)
    }

    }


    const getBank=async()=>
    {
      try{
      let response = await GetBanks(customerId);
      console.log("bank data is-----------------",response);
      setBank(response.data);
    } catch (error) {
      alert(error.response.data.message)
    }
    }

    useEffect(()=>
    {
       getCustomer();
  
    },[])

    useEffect(()=>
    {
      if(customerId!=0)
       getBank()
    },[customerId])

  return (
   <div>
    <MyNavbar> </MyNavbar>
    {customer!=null?
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="text-center text-primary text-dark m-5 fw-bold rounded-pill">
            <h1>Add New Account</h1>
          </div>
          <form className="shadow-lg p-5 rounded-border border-warning text-white">
          <div className="text-danger text-center fw-bold">{msg}</div>
            <div class="mb-2">
              <label for="exampleInputEmail1" class="form-label">
                CustomerId
              </label>
              <select
                  class="form-select rounded-pill"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCustomerId(e.target.value);
                  }}
                >
                  <option value={"select"}>Customer's</option>
                  {customer.map((customer) => {
                    return <option value={customer.customerId}>{customer.customerId+'_'+customer.firstName}</option>;
                  })}
                </select>
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                BankId
              </label>
              <select
                  class="form-select rounded-pill"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setBankId(e.target.value);
                  }}
                >
                  <option value={"select"}>Avaliable Banks</option>
                  {bank.map((b) => {
                    return <option value={b.bankId}>{b.ifscCode+'_'+b.bankName}</option>;
                  })}
                </select>
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Amount
              </label>
              <input
                type="number"
                class="form-control rounded-pill text-dark fw-bold"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setBalance(e.target.value);
                  if(e.target.value<2000)
                  {
                     setMsg("amount should be greater then 2000")
                  }

                  else{
                    setMsg("")
                  }

                }}
              />
            </div>
            <div className="mt-3 ">
            <button
              type="submit"
              class="btn btn-primary btn-lg rounded-pill border border-warning"
              onClick={handleSubmit}
            >
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-8 offset-1">
          <PaginationApp
            totalpage={totalpage}
            setpage={setPageNumber}
            pageNumber={pageNumber}
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
        <label for="exampleInputPassword1" class="form-label"><h1>AccoutDetails</h1></label>
        </div >
        <div className="m-3 mb-5">
        < Table data={data} isDeleteButton={true} isUpdateButton={false} deleteFun={deleteAccount}></Table>
        </div>
    </div> 
  </div>:<div className="text-center text-danger h5">please select customer</div>
}
 </div>
  );
};

export default AddAccount;
