import axios from 'axios'
import React from 'react'

export const transactionService= async(accountNumber,type,amount)=> {
  
    
  let response = axios.post(`http://localhost:8084/bankapp/transaction`,{

  "accountNumber":accountNumber,
  "type":type,
  "amount":amount
 },  
 {
 headers:
 {
     Authorization:localStorage.getItem('access_token')
 }

 } )

  return response


}





export const transferService= async(accountNumber,RecieverAccount,type,amount)=> {
  
    
    let response = axios.post(`http://localhost:8084/bankapp/transaction`,{
  
    "accountNumber":accountNumber,
    "recieverAccount":RecieverAccount,
    "type":type,
    "amount":amount
   },  
   {
   headers:
   {
       Authorization:localStorage.getItem('access_token')
   }
  
   } )
  
    return response
  
  
  }
  
  