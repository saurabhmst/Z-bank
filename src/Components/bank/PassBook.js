import React, { useEffect, useState } from "react";
import PaginationApp from "../../Shared/tablecomp/PaginationApp";
import PageSizeSetter from "../../Shared/tablecomp/PageSizeSetter";
import Table from "../../Shared/tablecomp/Table";
import { getCustomerAccounts, showPassBook } from "../../Service/account";
import MyNavbar from "../../Shared/AdminNavbar";
import CustomerNavbar from "../../Shared/CustomerNavbar";
import { validateUser as validator } from "../../Service/userAuthentication";
import { useNavigate } from "react-router-dom";

function PassBook() {
  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState();
  const [totalpage, setTotalpage] = useState();
  const [customerId, setCustomerId] = useState("");
  let [account, setAccount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [balance,setBalance]= useState();
  const [filterData,setFilteredData]= useState([]);
  const [validateUser,setIsValidUser]=useState()
  const naviagte = new useNavigate()
  let search='';


  const getAccounts = async () => {
    try{
    let response = await getCustomerAccounts();
    console.log("accounts", response.data);
    setData(response.data);
  } catch (error) {
    alert(error.response.data.message)
  }
  };

  const getPassBook = async () => {
    try{
   console.log("inside get passbook)))))))000")
   
    let response = await showPassBook(pageNumber, pageSize, account);
    console.log("request is", response.request.responseURL);
    console.log("value------------------", response);
    if (response.data) {
      console.log("response==", response.data.transaction.content);
      setTransactions(response.data.transaction.content);
      setFilteredData([]);
      setBalance(response.data.balance)
      setTotalrecord(response.headers["transaction-count"]);
      // console.log("total records +" + totalrecord);
      setTotalpage(Math.ceil(response.headers["transaction-count"] / pageSize));
      // console.log("page ct is " + totalpage);
    }
    
  } catch (error) {
    alert(error.response.data.message)
  }
  }
  const ValidateUser = async()=>{
     
    
    let authToken = localStorage.getItem('access_token');
    if(!authToken)
    {
     setIsValidUser(false)
     alert('login as a customer first!')
     naviagte('/')
    }
    console.log("auth value is "+authToken);
    let response = await validator(authToken)
    console.log("responce value is ",response.data.role)
    if(response.data.role != "ROLE_USER")
    {
       setIsValidUser(false);
       naviagte('/')
       alert('login as a customer first!')
    }
   setIsValidUser(true)
   

  } 

  useEffect(()=>{
    ValidateUser()
  },[])

  useEffect(() => {
    getAccounts()
    
  }, []);

  useEffect(() => {
    console.log("get passbook effect ",account)
    if(account!=0)
    getPassBook();
  }, [account,pageNumber,pageSize]);

  return (
    <div>
      <CustomerNavbar></CustomerNavbar>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3 my-5">
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setAccount(e.target.value);
              }}
            >
              <option value={"select"}>AccountNo</option>
              {data.map((d) => {
              return <option value={d.accountNo}>{d.accountNo}</option>;
              })}
              
            </select>
          </div>
        </div>
      </div>
      <div class="container">
        <div className="row mt-5 ms-2">
          <div className="col-3 offset-1">
            <PaginationApp
              totalpage={totalpage}
              setpage={setPageNumber}
              pageNumber={pageNumber}
            ></PaginationApp>
          </div>

          <div class="col-3">
            <input
              type="text"
              class="form-control rounded-pill text-dark "
              placeholder="Search"
              onChange={(e) => {
                search= e.target.value;
                let dat = transactions.filter((d) => {
                  return search.toLowerCase === '' ?
                    d :
                    d.transactionId.toString().includes(search)
                    || d.accountNumber.toString().includes(search)
                    || d.recieverAccount.toString().includes(search)
                    || d.type.includes(search)
                    || d.amount.toString().includes(search)
                })
                setFilteredData(dat);
              }}
            />
          </div>
          <div className="col-2 offset-1">
            <PageSizeSetter
              setPageSize={setPageSize}
              setTotalpage={setTotalpage}
              totalrecord={totalrecord}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
            ></PageSizeSetter>
          </div>
        </div>
        <div className="row">
          <div
            className="h5
           text-white offset-1"
          >
            Balance:{balance}
          </div>
          <h1 className="text-center">Account Details</h1>
          <div className="col-10 offset-1">
            <div className="text-center">
              <label for="exampleInputPassword1" class="form-label">
                
              </label>
            </div>
            <div className="m-3 mb-5">
              {
                account!=0?<Table
                data={data}

                isDeleteButton={false}
                isUpdateButton={false}
              ></Table>:<div className="text-white text-center fw-bold h1">Please Select Account</div>
              }
               
            
            <h1 className="text-center my-5">Transactions</h1>
                 <Table
                data={ filterData.length==0 ? transactions:filterData}
                isDeleteButton={false}
                isUpdateButton={false}
              ></Table>
               
             
            </div>
          </div>
          <div style={{ marginTop: "70vh" }}></div>
        </div>
      </div>
    </div>
  );
}

export default PassBook;
