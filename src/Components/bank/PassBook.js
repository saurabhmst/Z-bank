import React, { useEffect, useState } from 'react'
import PaginationApp from '../../Shared/tablecomp/PaginationApp';
import PageSizeSetter from '../../Shared/tablecomp/PageSizeSetter';
import Table from '../../Shared/tablecomp/Table'
import { showPassBook } from '../../Service/account';

function PassBook() {

  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState(10);
  const [totalpage, setTotalpage] = useState();
  const [userId,setUserId] = useState();
  
  function passbook(){
  
      let response =  showPassBook(userId)
      setData(response.data)
      console.log("passbook responce++++++++++++",response)

  }

 

  return (
      <div>
      <h6>hi  {localStorage.getItem('username')}</h6>
    <div class="container">
    <div className="row mt-5">
      <div className="col-3 offset-1">
        <PaginationApp
          totalpage={totalpage}
          setpage={setPageNumber}
          pageNumber={pageNumber}
        ></PaginationApp>
      </div>


      <div class="col-2">
              <input
                type="number"
                class="form-control rounded-pill text-dark fw-bold"
                onChange={(e) => {
                  setUserId(e.target.value);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div class='col-1'>
           <button className='btn btn-outline-success' type='submit' onClick={()=>{passbook()}}>Search</button>
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
      <label for="exampleInputPassword1" class="form-label"><h1>Transactions</h1></label>
      </div >
      <div className="m-3 mb-5">
      < Table data={data} isDeleteButton={false} isUpdateButton={false}></Table>
      </div>
      <diV style={{marginTop:"70vh"}}></diV>
    </div>
  </div>
  </div>

  
  
  )
}

export default PassBook