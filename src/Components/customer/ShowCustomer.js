import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import PageSizeSetter from '../../Shared/tablecomp/PageSizeSetter';
import PaginationApp from '../../Shared/tablecomp/PaginationApp';
import Table from '../../Shared/tablecomp/Table'
import { GetAllCustomer } from '../../Service/customer';



function ShowCustomer() {

    const [pageSize, setPageSize] = useState(3);
        const [pageNumber, setPageNumber] = useState(0);
        const [data, setData] = useState([]);
        const [totalrecord,setTotalrecord] = useState();
        const [totalpage,setTotalpage]=useState();
        const navigate = new useNavigate();

          const getCustomer = async () => {
          console.log("pageSize.............." + pageSize);
          console.log("pageNumb.............." + pageNumber);
         
          
         let response= await GetAllCustomer(pageNumber, pageSize);
         console.log("request is",response.request.responseURL)
          console.log(response);
          if (response.data) {
              console.log("response=="+response.data.content);
            setData(response.data.content);
            setTotalrecord(response.headers['customer-count'])
            console.log("total records +" +response.headers['customer-count'])
            setTotalpage(Math.ceil(response.headers['customer-count']/pageSize))
            console.log("page ct is "+totalpage)

          }
        }
           
  useEffect(()=>{
    console.log("use effect 1 called");
    getCustomer ();
  },[pageNumber,totalpage,totalrecord])

  return (
    <div className='Container'>
    <div className="row mt-5 ">
      <div className="col-3 offset-1">
        <PaginationApp
          totalpage={totalpage}
          setpage={setPageNumber}
          pageNumber={pageNumber}
          getData={getCustomer}
        ></PaginationApp>
      </div>  

      
      <div className='col-3'>
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </div>
        <div className='col-1'>
        <button class="btn btn-danger" type="submit">Search</button>
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
      <label for="exampleInputPassword1" class="form-label"><h1>CustomerDetails</h1></label>
      </div>
      <div className="m-3 mb-5">
      < Table data={data} isDeleteButton={false} isUpdateButton={false}></Table>
      </div>
          
      </div>     
      </div>
    
  )
}

export default ShowCustomer