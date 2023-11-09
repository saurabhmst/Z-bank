import React, { useEffect } from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllBanks } from '../../Service/bank';
import PaginationApp from '../../Shared/tablecomp/PaginationApp';
import PageSizeSetter from '../../Shared/tablecomp/PageSizeSetter';
import Table from '../../Shared/tablecomp/Table'

function ShowBank() {

    const [pageSize, setPageSize] = useState(3);
    const [pageNumber, setPageNumber] = useState(0);
    const [data, setData] = useState([]);
    const [totalrecord,setTotalrecord] = useState();
    const [totalpage,setTotalpage]=useState();
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

    useEffect(()=>{
        console.log("use effect called")
        getBanks(); 
      },[pageNumber,pageSize,totalpage,totalrecord])
    

  return (
    <div className='container'> 
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
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </div>
        <div className='col-1'>
        <button class="btn btn-danger" type="submit">Search</button>
        </div>
      

  <div className="col-3 ">
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
      < Table data={data} isDeleteButton={false} isUpdateButton={false}></Table>
     
  </div>
  <div style={{marginTop:"70vh"}}></div>
  </div>
  </div> 
  )
}

export default ShowBank