import axios from "axios";
import { getCustomerByUsername } from "./customer";



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
         
        throw error
    
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
            }
            })
        
        
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    
      
    
   
    export const showPassBook = async(pageNumber,pageSize,accountNo)=>{
        try {
            
            console.log("inside passbook api account-----------",pageNumber,pageSize,accountNo)
            let response = await axios.get(`http://localhost:8084/bankapp/printPassBook`,{

            params:{ 
              pageNumber:pageNumber,
              pageSize:pageSize,
             accountNo:accountNo
            },  
            headers:
            {
                Authorization:localStorage.getItem('access_token')
            },
            })
        
            console.log("inside passbook ^^^^^^^ account",response)
            return response;
        }
        catch (error) {

            throw error
           
        }
    }
    
      
    
    export const getCustomerAccounts = async()=>{
        try {
            
            let customer=await getCustomerByUsername(localStorage.getItem('username'));
            let customerId=customer.data.customerId;
            console.log("customer",customerId)
            console.log("inside passbook api account-----------",customerId)
            let response = await axios.get(`http://localhost:8084/bankapp/getCustomerAccounts`,{

            params:{ 
             customerId
            },  
            headers:
            {
                Authorization:localStorage.getItem('access_token')
            },
            })
        
            console.log("inside passbook ^^^^^^^ account",response.data.content)
            return response;
        }
        catch (error) {
           throw error
        }
    }
    
      
    
   