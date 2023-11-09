import axios from "axios";



export const GetAccounts = async (pageNumber=0,pageSize=10)=> {

 try {
    
 
let response = await axios.get(`http://localhost:8084/bankapp/getAllAccounts`,{
    params:
    {
        pageNumber:pageNumber,
        pageSize:pageSize
        
    },

        headers:
    {
        Authorization:localStorage.getItem('access_token')
    }
}
)

return response
} catch (error) {
    
    
}  
}

export const saveAccount = async (customerId,bankId,balance)=> {
try {
    
   let response = await axios.post(`http://localhost:8084/bankapp/addAccount`,{
        "customerId":customerId,
        "bankId":bankId,
        "balance":balance
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
    } catch (error) {
         
        alert(error.message)
    
}
    }
    
    
    export const deleteAccountService = async(accountNo)=>{
        try {
            
            console.log("inside delete account")
            let response = await axios.delete(`http://localhost:8084/bankapp/deleteAccount`,{
               params:
               {
                 accountNo:accountNo
               },
            headers:
            {
                Authorization:localStorage.getItem('access_token')
            },
            })
        
        
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    
      
    
   
    export const showPassBook = async(accountNo)=>{
        try {
            
            console.log("inside passbook api account")
            let response = await axios.post(`http://localhost:8084/bankapp/printPassBook`,{
               
                "accountNumber":accountNo
            },
            {   
            headers:
            {
                Authorization:localStorage.getItem('access_token')
            },
            })
        
        
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    
      
    
   