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

const validateTaskData=(req)=>{
  const allowedTask=["title","description","dueDate","completed"];
  const istaskEditAllowed= Object.keys(req.body).every((field)=>allowedTask.includes(field))
  
  return istaskEditAllowed
}

export {validateSignUpData,validateEditData,validateTaskData};
