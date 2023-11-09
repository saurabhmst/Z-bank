import React from 'react'

function PageSizeSetter({setPageSize,setTotalpage,totalrecord,pageSize}) {
  
  return (
    <select
    className="form-select"
    id="floatingSelect"
    aria-label="Floating label select example"
    onChange={(e) => {
      setPageSize(e.target.value);
      console.log("totalRecord========" + totalrecord);
      setTotalpage(Math.ceil(totalrecord / e.target.value));
      }}
      >
    <option selected >Page Size</option>
    <option value="1" selected={1 == pageSize}>
      1
    </option>
    <option value="2" selected={2 == pageSize}>
      2
    </option>
    <option value="4" selected={4 == pageSize}>
      4
    </option>
    <option value="5" selected={5 == pageSize}>
      5
    </option>
    <option value="10" selected={10 == pageSize}>
      10
    </option>
  </select>
  )
}

export default PageSizeSetter;