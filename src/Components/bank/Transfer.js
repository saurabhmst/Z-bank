import React, { useState } from 'react'
import MyNavbar from '../../Shared/MyNavbar';
import {transferService,transactionService} from '../../Service/transaction'



const Transaction=()=>{

  const [account,setAccount] = useState();
  const [transferAccount,setTransferAccount] = useState();
  const [amount,setAmount] = useState();
  const [transactionType ,setTransactionType] = useState('');
  const [value ,setValue] = useState('');


  const handleSubmit=async()=>{
    console.log("value of type is ",value)
   if(value!='TRANSFER')
   {
    let response = await transactionService(account,transactionType,amount)
    console.log("transection response ",response)
    alert("Transaction successful!")
   }
  if(value=='TRANSFER')
   {
    let response = await transferService(account,transferAccount, transactionType,amount)
    console.log("transection response ",response)
    alert("Transaction successful!")
   }
   
  }
  
  return (
    
  <div>
    <MyNavbar> </MyNavbar>
     <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="text-center text-primary text-dark m-5 fw-bold">
            <h1>Transaction</h1>
          </div>
          <form className="shadow-lg p-5 rounded-border border-warning text-white">
            <div class="mb-2">
              <label for="exampleInputEmail1" class="form-label">
                Transaction Type
              </label>
              <select
        className="form-select rounded-pill text-bold"
        id="floatingSelect"
        aria-label="Floating label select example"
        onChange={(e) => {
        setTransactionType(e.target.value);
        setValue(e.target.value)
         }}
         >
       <option selected >Transaction Type</option>
       <option value='CREDIT' selected={"CREDIT" == value}>
       CREDIT
       </option>
       <option value='DEBIT' selected={"DEBIT" == value}>
       DEBIT
       </option>
       <option value='TRANSFER' selected={"TRANSFER" == value}>
       TRANSFER
       </option>
       </select>
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Account Number
              </label>
              <input
                type="text"
                class="form-control rounded-pill text-dark fw-bold"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setAccount(e.target.value);
                }}
              />
            </div>
            {value=='TRANSFER'?
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Receiver Account Number
              </label>
              <input
                type="text"
                class="form-control rounded-pill text-dark fw-bold"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setTransferAccount(e.target.value);
                }}
              />
            </div> :null}
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Amount
              </label>
              <input
                type="number"
                class="form-control rounded-pill text-dark fw-bold"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setAmount(e.target.value);
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
    </div>
    <div style={{marginTop:"20vh"}}></div>
  </div>
  )

}

export default Transaction