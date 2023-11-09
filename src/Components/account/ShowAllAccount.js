import React from 'react'
import { GetAccounts} from "../../Service/account";
import Table from "../../Shared/tablecomp/Table"
import PaginationApp from '../../Shared/tablecomp/PaginationApp'
import PageSizeSetter from '../../Shared/tablecomp/PageSizeSetter'
import { useState,useEffect } from 'react'
import { InputGroup } from 'react-bootstrap';



const ShowAllAccount=()=>{

  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState();
  const [totalpage, setTotalpage] = useState();

 
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
      }, [pageNumber, pageSize, totalpage, totalrecord]);

  
  return (
    <div class="container">
    <div className="row mt-5">
      <div className="col-3 offset-1">
        <PaginationApp
          totalpage={totalpage}
          setpage={setPageNumber}
          pageNumber={pageNumber}
        ></PaginationApp>
      </div>
      
      <div className='col-3'>
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </div>
        <div className='col-1'>
        <button class="btn btn-danger" type="submit">Search</button>
        </div>
      
      
      

      <div className="col-2 offset-1">
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
      <label for="exampleInputPassword1" class="form-label"><h1>Accouts</h1></label>
      </div >
      <div className="m-3 mb-5">
      < Table data={data} isDeleteButton={false} isUpdateButton={false}></Table>
      </div>
      <diV style={{marginTop:"70vh"}}></diV>
    </div>
  </div>
  
  )
}

export default ShowAllAccount