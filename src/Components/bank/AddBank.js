
import React, { useEffect, useState } from "react";
import { GetAllBanks, deleteBankService, saveBank, updateBankService } from "../../Service/bank";
import Table from "../../Shared/tablecomp/Table"
import PaginationApp from "../../Shared/tablecomp/PaginationApp"
import PageSizeSetter from "../../Shared/tablecomp/PageSizeSetter";
import './Bank.css'
import MyNavbar from "../../Shared/MyNavbar";
import { useNavigate } from "react-router-dom";
import EditBank from './EditBank';
import { validateUser as validator } from "../../Service/userAuthentication";


    
    const Addbank = () => {
        const [pageSize, setPageSize] = useState(3);
        const [pageNumber, setPageNumber] = useState(0);
        const [data, setData] = useState([]);
        const [totalrecord,setTotalrecord] = useState();
        const [totalpage,setTotalpage]=useState();
        const [bankName,setBankname] =useState();
        const [abbreviation,setAbbreviation] =useState();
        const [branch,setBranch] =useState();
        const [ifsc,setIfsc] =useState();
        const [saveBanks,setSaveBanks]=useState();
        const [isValidUser,setIsValidUser] = useState(false)
        const [onDelete,setonDelete] = useState();
        const [show,setShow]=useState(false)
        const naviagte=new useNavigate();
        const getBanks = async () => {
          console.log("pageSize.............." + pageSize);
          console.log("pageNumb.............." + pageNumber);
         
          
         let response= await GetAllBanks(pageNumber, pageSize);
         console.log("request is",response.request.responseURL)
          console.log(response);
          if (response.data) {
              console.log("response=="+response.data.content);
            setData(response.data.content);
            setTotalrecord(response.headers['bank-count'])
            console.log("total records +" +totalrecord)
            setTotalpage(Math.ceil(response.headers['bank-count']/pageSize))
            console.log("page ct is "+totalpage)

          }
      
        };
   
        
    const ValidateUser = async()=>{
     
      let authToken = localStorage.getItem('access_token');
      if(!authToken)
      {
       setIsValidUser(false)
       alert('login as a admin first!')
       naviagte('/')
      }
      console.log("auth value is "+authToken);
      let response = await validator(authToken)
      console.log("responce value is ",response.data.role)
      if(response.data.role != "ROLE_ADMIN")
      {
         setIsValidUser(false);
         naviagte('/')
         alert('login as a admin first!')
      }
     setIsValidUser(true)
     
 
    } 

    useEffect(()=>{
      ValidateUser()
    },[])
   
        
  useEffect(()=>{
    console.log("use effect called")
    getBanks(); 
  },[pageNumber,pageSize,totalpage,totalrecord,saveBanks,onDelete])


  useEffect(()=>
   {
      getBanks();
   },
    [bankName,branch,abbreviation,ifsc]
   ) 

  const handleSubmit=async(e)=>{
   
    e.preventDefault();
     let d=await saveBank(bankName,branch,ifsc,abbreviation);
     setSaveBanks(d);
  
  }

  const updateBank=(bank)=>{
   
   setBankname(bank.bankName);
   setAbbreviation(bank.abbreviation);
   setBranch(bank.branch);
   setIfsc(bank.ifscCode);
   setShow(true);
   
  }

  const editBankData=async()=>{
    let response=await updateBankService(bankName,abbreviation,branch,ifsc);
    setSaveBanks(response);
    alert('bank updated successfully')

  }


  const deleteBank=async(data)=>{
    console.log("inside delete function",data.bankId)
    let response = await deleteBankService(data.bankId)
    setonDelete(response);
    console.log(response);
   }


  return (
    <div>

    {show && <EditBank bankName={bankName} abbreviation={abbreviation} branch={branch}  show={show} setBankname={setBankname} setBranch={setBranch} setAbbreviation={setAbbreviation} setShow= {setShow}
    editBankData={editBankData}
    ></EditBank>}
    <MyNavbar> </MyNavbar>
    <div className="container">
      <div className="row">  
        <div className="col-6 offset-3">
          <div className="text-center text-primary text-dark m-5 fw-bold"><h1>Add New Bank</h1></div>
            <form className="shadow-lg p-5 rounded-border border-warning text-white">
            <div class="mb-2">
              <label for="exampleInputEmail1" class="form-label">Bank Name</label>
              <input type="text" class="form-control rounded-pill text-dark fw-bold required" onChange={(e)=>{setBankname(e.target.value)}}   id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">Branch</label>
              <input type="text" class="form-control rounded-pill text-dark fw-bold required" id="exampleInputPassword1" onChange={(e)=>{setBranch(e.target.value)}}/>
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">Abbrevation</label>
              <input type="text" class="form-control rounded-pill text-dark fw-bold" id="exampleInputPassword1" onChange={(e)=>{setAbbreviation(e.target.value)}}/>
            </div>
            <div class="mb-2">
              <label for="exampleInputPassword1" class="form-label">ifsc</label>
              <input type="text" class="form-control rounded-pill text-dark fw-bold" id="exampleInputPassword1" onChange={(e)=>{setIfsc(e.target.value)}}/>
            </div>
              <button type="submit" class="btn btn-primary rounded-pill btn-lg border border-warning" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
        
      <div className="row mt-5">
        <div className="col-8 offset-1">
          <PaginationApp
          totalpage={totalpage}
          setpage={setPageNumber}
          pageNumber={pageNumber}
          getData={getBanks}
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
    
      <validateUser></validateUser>

      <div className="col-10 offset-1">
      <div className="text-center">
      <label for="exampleInputPassword1" class="form-label m-5"><h1>BankDetails</h1></label>
      </div >
      <div className="m-3 mb-5">
          < Table data={data} isDeleteButton={true} isUpdateButton={true} deleteFun={deleteBank} UpdateFun={updateBank}></Table>
         
      </div>
      </div>
      </div>
      </div>
  );
}

export default Addbank;

