import axios from "axios";
import { getCustomerByUsername } from "./customer";



export const GetAllBanks = async (pageNumber=0,pageSize=10)=> {
try {
    
let response = await axios.get(`http://localhost:8084/bankapp/allBanks`,{
    params:
    {
        pageNumber:pageNumber,
        pageSize:pageSize
        
    },
    headers:
    {
        Authorization:localStorage.getItem('access_token')
    },
}
)

return response

} catch (error) {
    throw error
}
}  

export const saveBank = async (bankName,abbreviation,branch,ifsc)=> {

   try {
    
   
    let response = await axios.post(`http://localhost:8084/bankapp/addBank`,{
        "bankName":bankName,
       "abbreviation":abbreviation,
       "branch":branch,
       "ifscCode":ifsc

    },
    {
       headers:
    {
        Authorization:localStorage.getItem('access_token')
    },
    }
    )
    console.log("bank responce is ------"+response);
    return response
    }
 catch (error) {
    throw error
}
}   

    export const updateBankService = async(bankName,abbreviation,branch,ifscCode)=>{

        try {
            
        
        console.log("ifsc in service")
        console.log(ifscCode)

        let response = await axios.post(`http://localhost:8084/bankapp/updateBank`,{
            
         bankName:bankName,
	
         abbreviation:abbreviation,
        
         branch:branch,
        
         ifscCode:ifscCode
        

        },
        {
        headers:
        {
            Authorization:localStorage.getItem('access_token')
        }
        })


        return response;
    } catch (error) {
        throw error    
    }
    }


    
   export const deleteBankService = async(Bankid)=>{

    try {
    
    let response = await axios.delete(`http://localhost:8084/bankapp/delete`,{
       params:
       {
         bankId:Bankid,
       },
    headers:
    {
        Authorization:localStorage.getItem('access_token')
    }
    })


    return response;

        
} catch (error) {
      throw error  
}
}

export const GetBanks = async (userId)=> {
      try {
        
      
   
    let response = await axios.get(`http://localhost:8084/bankapp/getBank`,{
        params:
        {
            customerId:userId
            
        },
        headers:
        {
            Authorization:localStorage.getItem('access_token')
        },
    }
    )
    
    return response
} catch (error) {
    throw error
  }
    }
    