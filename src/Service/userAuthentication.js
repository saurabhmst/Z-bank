import axios from "axios"



export const login = async (userName,password)=>{

      
let response = await axios.post(`http://localhost:8084/bankapp/login`,{
    
        "username":userName,
        "password":password
        
    }

)

return response


}

export const validateUser= async (authToken)=>{

  console.log("inside validator >>>>>>>>>>>>>>>>>>>>>>>>>>>>>",authToken)

let response = await axios.get(`http://localhost:8084/bankapp/validator`,{

  headers:
  {
    Authorization: authToken
  }


})

console.log("response value is ----------------",response)
return response;

}

