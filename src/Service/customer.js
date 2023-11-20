import axios from "axios";



export const GetAllCustomer = async (pageNumber=0,pageSize=10)=> {
try{
   
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
} catch (error) {
    throw error
  }
}

export const saveCustomer = async (name,surname,mobile,email,username,password)=> {

   try{
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
} catch (error) {
    throw error
  }
    }


   export const updateCustomerService = async(userid,firstName,lastName,mobile,email)=>{

    try{
        let response = await axios.put(`http://localhost:8084/bankapp/updateCustomer`,{
            
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
        } catch (error) {
        throw error
      }
    }


    
   export const deleteCustomerService = async(userid)=>{
  
    try{
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
} catch (error) {
    throw error
  }
}


export const getCustomerByUsername = async(name)=>
{
    try{
    let response = await axios.get(`http://localhost:8084/bankapp/usernameToCustomer`,{
       params:
       {
         name
       },
    headers:
    {
        Authorization:localStorage.getItem('access_token')
    },
    })
    return response;
} catch (error) {
    throw error
  }
}

export const getAllCustomer = async()=>
{
    try{
    let response = await axios.get(`http://localhost:8084/bankapp/getCustomer`,{
    headers:
    {
        Authorization:localStorage.getItem('access_token')
    },
    })
    return response;
} catch (error) {
    throw error
  }
}