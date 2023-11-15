import React, { useEffect, useState } from "react";
import PaginationApp from "../../Shared/tablecomp/PaginationApp";
import PageSizeSetter from "../../Shared/tablecomp/PageSizeSetter";
import Table from "../../Shared/tablecomp/Table";
import { showPassBook } from "../../Service/account";

function PassBook() {
  const [pageSize, setPageSize] = useState(2);
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState([]);
  const [totalrecord, setTotalrecord] = useState();
  const [totalpage, setTotalpage] = useState();
  const [userId, setUserId] = useState(35);

  const getPassBook = async () => {
    console.log("pageSize.............." + pageSize);
    console.log("pageNumb.............." + pageNumber);

  
    let response = await showPassBook(pageNumber, pageSize, userId);
    // console.log("request is", response.request.responseURL);
    console.log("value------------------",response);
    if (response.data) {
      console.log("response==" , response.data.transaction.content);
      setData(response.data);
      setTotalrecord(response.headers["transaction-count"]);
      console.log("total records +" + totalrecord);
      setTotalpage(Math.ceil(response.headers["transaction-count"] / pageSize));
      console.log("page ct is " + totalpage);
    }
  };

  useEffect(() => {
    getPassBook();
    console.log("use data",data)
  },[pageNumber,pageSize,totalrecord]);

  return (data.transaction?
    <div>
      <h6>hi {localStorage.getItem("username")}</h6>
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

          <div class="col-1">
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={getPassBook}
            >
              Search
            </button>
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
        <div className="row">
          <div className="h3
           text-white">Balance:{data.balance}</div>
        <div className="col-10 offset-1">
          <div className="text-center">
            <label for="exampleInputPassword1" class="form-label">
              <h1>Transactions</h1>
            </label>
          </div>
          <div className="m-3 mb-5">
            <Table
              data={data.transaction.content}
              isDeleteButton={false}
              isUpdateButton={false}
            ></Table>
          </div>
          </div>
          <div style={{ marginTop: "70vh" }}></div>
        </div>
      </div>
    </div> :null
  );
}

export default PassBook;
