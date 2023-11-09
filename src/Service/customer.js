import axios from "axios";



export const GetAllCustomer = async (pageNumber=0,pageSize=10)=> {

   
let response = await axios.get(`http://localhost:8084/bankapp/getAllCustomer`,{
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
);

return response
}

export const saveCustomer = async (name,surname,mobile,email,username,password)=> {

   
    let response = await axios.post(`http://localhost:8084/bankapp/addCustomer`,{
        "name":name,
        "surname":surname,
        "mobile":mobile,
        "email":email,
        "userName":username,
        "password":password
    },
    {
    headers:
    {
        Authorization:localStorage.getItem('access_token')
    }
    
   }
    )
    console.log("bank responce is ------"+response);
    return response
    }


   export const updateCustomerService = async(userid,firstName,lastName,mobile,email)=>{

        let response = await axios.post(`http://localhost:8084/bankapp/updateCustomer`,{
            
             customerId:userid,
             firstName:firstName,
             lastName:lastName,
             mobile:mobile,
             email:email
        },
        {
        headers:
        {
            Authorization:localStorage.getItem('access_token')
        }
        })


        return response;
    }


    
   export const deleteCustomerService = async(userid)=>{
  
    console.log("inside delete customer")
    let response = await axios.delete(`http://localhost:8084/bankapp/deleteCustomer`,{
       params:
       {
         userId:userid,
       },
    headers:
    {
        Authorization:localStorage.getItem('access_token')
    },
    })


    return response;
}