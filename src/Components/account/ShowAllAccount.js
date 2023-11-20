import React from 'react'
import { GetAccounts} from "../../Service/account";
import Table from "../../Shared/tablecomp/Table"
import PaginationApp from '../../Shared/tablecomp/PaginationApp'
import PageSizeSetter from '../../Shared/tablecomp/PageSizeSetter'
import { useState,useEffect } from 'react'
import { InputGroup } from 'react-bootstrap';
import { validateUser as validator } from "../../Service/userAuthentication";
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../Shared/AdminNavbar';



const ShowAllAccount=()=>{

  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState();
  const [totalpage, setTotalpage] = useState();
  const [filteredData,setFilteredData] = useState([]);
  const [validateUser,setIsValidUser]=useState()
  const navigate = new useNavigate();
  
  let search ='';
 
  const getAccount = async () => {
    console.log("pageSize.............." + pageSize);
    console.log("pageNumb.............." + pageNumber);
     try{
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
      }, [pageNumber, pageSize]);

  
  return (
    <div>
      <div className='row'>
      <AdminNavbar></AdminNavbar>
      </div>
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
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
        
        onChange={(e) => {
          search= e.target.value;
          let dat = data.filter((d) => {
            return search.toLowerCase === '' ?
              d :
              d.lastName.toString().includes(search)
              || d.bankName.toString().includes(search)
              || d.branch.toString().includes(search)
              || d.firstName.toString().includes(search)
              || d.balance.toString().includes(search)
              ||d.ifsc.toString().includes(search)
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

    <div className="col-10 offset-1">
      <div className="text-center">
      <label for="exampleInputPassword1" class="form-label"><h1>Accouts</h1></label>
      </div >
      <div className="m-3 mb-5">
      < Table data={filteredData.length==0?data:filteredData} isDeleteButton={false} isUpdateButton={false}></Table>
      </div>
      <diV style={{marginTop:"70vh"}}></diV>
    </div>
  </div>
</div>  
  )
}

export default ShowAllAccount