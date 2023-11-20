import axios from "axios"



export const login = async (userName,password)=>{
try
{
      
let response = await axios.post(`http://localhost:8084/bankapp/login`,{
    
        "username":userName,
        "password":password
        
    }

)

return response

} catch (error) {
  throw error
}


}

export const validateUser= async (authToken)=>{
  try{

  console.log("inside validator >>>>>>>>>>>>>>>>>>>>>>>>>>>>>",authToken)

let response = await axios.get(`http://localhost:8084/bankapp/validator`,{

  headers:
  {
    Authorization: authToken
  }


})

console.log("response value is ----------------",response)
return response;
} catch (error) {
  throw error
}

}

