import validator from "validator"

const {isEmail,isStrongPassword}= validator;


const validateSignUpData=(req)=>{
 
const {firstName,lastName,emailId,password}=req.body;

if(!firstName|| !lastName){
    throw new Error("Name is not valid")
}else if(!isEmail(emailId)){
    throw new Error("EmailId is not valid")
}else if(!isStrongPassword(password)){
    throw new Error("Invalid Password")
}
}

export default validateSignUpData;