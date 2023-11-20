import React, { useEffect } from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllBanks } from '../../Service/bank';
import PaginationApp from '../../Shared/tablecomp/PaginationApp';
import PageSizeSetter from '../../Shared/tablecomp/PageSizeSetter';
import Table from '../../Shared/tablecomp/Table'
import { validateUser as validator } from "../../Service/userAuthentication";
import AdminNavbar from '../../Shared/AdminNavbar';


function ShowBank() {

    const [pageSize, setPageSize] = useState(3);
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState([]);
    const [totalrecord,setTotalrecord] = useState();
    const [totalpage,setTotalpage]=useState();
    const naviagte=new useNavigate();
    const [validateUser,setIsValidUser]=useState()
    const [filteredData,setFilteredData]=useState([])
    let search=''; 
    const getBanks = async () => {
      console.log("pageSize.............." + pageSize);
      console.log("pageNumb.............." + pageNumber);
     
      try{
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
      },[pageNumber,pageSize,totalpage,totalrecord])
    

  return (
    <div>
      <div className='row'>
      <AdminNavbar></AdminNavbar>
      </div>
    <div className='container'> 
    <validateUser></validateUser>
    <div className="row mt-5">
    <div className="col-3 offset-1 overflow-auto">
      <PaginationApp
      totalpage={totalpage}
      setpage={setPageNumber}
      pageNumber={pageNumber}
      getData={getBanks}
      ></PaginationApp>
    </div>   
  
    <div className='col-3 '>
      <input class="form-control me-2" type="search" placeholder="Search"
      onChange={(e)=>{
        search= e.target.value;
        let dat = data.filter((d) => {
          return search.toLowerCase === '' ?
            d :
            d.bankName.toString().includes(search)
            || d.branch.toString().includes(search)
            || d.ifscCode.toString().includes(search)
            || d.abbreviation.toString().includes(search)
            
        })
        setFilteredData(dat)}}/>
    
      </div>
  
      

  <div className="col-3 ">
      <PageSizeSetter
        setPageSize={setPageSize}
        setTotalpage={setTotalpage}
        totalrecord={totalrecord}
        pageSize={pageSize}
        setPageNumber={setPageNumber}
      ></PageSizeSetter>
    </div>
  </div> 

  <validateUser></validateUser>

  <div className="col-10 offset-1">
  <div className="text-center">
  <label for="exampleInputPassword1" class="form-label m-5"><h1>BankDetails</h1></label>
  </div >
  <div className="m-3 mb-5">
      < Table data={filteredData.length==0?data:filteredData} isDeleteButton={false} isUpdateButton={false}></Table>
     
  </div>
  <div style={{marginTop:"70vh"}}></div>
  </div>
  </div> 
  </div>
  )
}

export default ShowBank