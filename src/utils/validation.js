import validator from "validator";

const { isEmail, isStrongPassword } = validator;

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!isEmail(emailId)) {
    throw new Error("EmailId is not valid");
  } else if (!isStrongPassword(password)) {
    throw new Error("Invalid Password");
  }
};

const validateEditData=(req)=>{
  const allowedFields=["companyName","jobTitle","jobUrl","location","status","jobType","appliedDate","salary","notes","interviewDate"];
  const isEditAllowed= Object.keys(req.body).every((field)=>
    allowedFields.includes(field)
  )

  return isEditAllowed;

  
}

export {validateSignUpData,validateEditData};
