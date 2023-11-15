import React, { useEffect, useState } from "react";
import PaginationApp from "../../Shared/tablecomp/PaginationApp";
import PageSizeSetter from "../../Shared/tablecomp/PageSizeSetter";
import { GetAccounts, deleteAccountService, saveAccount } from "../../Service/account";
import Table from "../../Shared/tablecomp/Table";
import './Account.css'
import MyNavbar from "../../Shared/MyNavbar";
import ShowAllaccount from './ShowAllAccount';
import { useNavigate } from "react-router-dom";
import { GetAllBanks } from "../../Service/bank";

const AddAccount = () => {
  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState();
  const [totalpage, setTotalpage] = useState();
  const [customerId, setCustomerId] = useState();
  const [bankId, setBankId] = useState();
  const [balance, setBalance] = useState();
  const [saveAccounts, setSaveAccounts] = useState();
  const [onDelete,setOnDelete] = useState();
  const navigate = new useNavigate();
  const getAccount = async () => {
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
  };

  useEffect(() => {
    console.log("use effect called");
    getAccount();
  }, [pageNumber, pageSize, totalpage, totalrecord,saveAccounts, onDelete]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let d = await saveAccount(customerId, bankId, balance);
    setSaveAccounts(d);
  };


   const deleteAccount=async(data)=>{

     console.log("inside delete function",data.accountNo)
     let response = await deleteAccountService(data.accountNo)
     setOnDelete(response);
     console.log(response);
    }


  return (
   <div>
    <MyNavbar> </MyNavbar>
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="text-center text-primary text-dark m-5 fw-bold">
            <h1>Add New Account</h1>
          </div>
          <form className="shadow-lg p-5 rounded-border border-warning text-white">
            <div class="mb-2">
              <label for="exampleInputEmail1" class="form-label">
                CustomerId
              </label>
              <input
                type="text"
                class="form-control rounded-pill text-dark fw-bold"
                onChange={(e) => {
                  setCustomerId(e.target.value);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                BankId
              </label>
              <input
                type="text"
                class="form-control rounded-pill text-dark fw-bold"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setBankId(e.target.value);
                }}
              />
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
  </div>
 </div>
  );
};

export default AddAccount;
