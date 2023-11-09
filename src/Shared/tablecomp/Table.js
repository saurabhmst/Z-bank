import React from 'react'


    

function Tab({data,isUpdateButton,isDeleteButton,deleteFun,UpdateFun}) {
    let headerdata=<></>;
    
    if (data.length!=0) {
        console.log("data=="+data);
        console.log("key=="+ Object.keys(data[0]))
        
        let key = Object.keys(data[0])
        if(isUpdateButton==true)
        {
        key.push('Update')
        }

        if(isDeleteButton==true)
        {
        key.push('Delete')
        }
        headerdata=key.map((d) => {
          return <th>{d}</th>;
        });
       
    }

    let rowofusers = <></>
    if (data.length > 0) {
        rowofusers = data.map((value,ind) => {
            return (
                <tr key={ind}>
                  
                    {
                        Object.values(value).map((t) => {
                            return (
                                <td>{t}</td>
                            )
                        })
                    }
                    {isUpdateButton && <td><button type="button" className='btn btn-outline-primary' onClick={()=>{
                       console.log("data value in update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",value.bankId)
                      UpdateFun(value)
                    }}>Update</button></td>}
                    {isDeleteButton && <td><button type="button" className='btn btn-outline-danger' onClick={()=>{
                      console.log("data value is >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",value.accountNo)
                      deleteFun(value)
                    }}>Delete</button></td>}
                 
                </tr>
                
            )

        });
    }

return (<>
<table className="table table-secondary table-bordered shadow-lg">
  <thead>
    <tr className='text-center'>
      {headerdata}
    </tr>
  </thead>
  <tbody className='text-center'>
    {rowofusers}
  </tbody>
</table>
</>)

}
export default Tab




