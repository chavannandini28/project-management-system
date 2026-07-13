// Email validation

export const validateEmail=(email)=>{


const regex =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


return regex.test(email);


};







// Password validation

export const validatePassword=(password)=>{


return password.length >= 6;


};







// Required field validation

export const required=(value)=>{


return (

value !== undefined &&

value !== null &&

value.trim() !== ""

);


};







// Register validation

export const validateRegister=(data)=>{


const errors={};



if(!required(data.name))

errors.name="Name required";



if(!validateEmail(data.email))

errors.email="Invalid email";



if(!validatePassword(data.password))

errors.password=
"Password must be 6 characters";



if(
data.password !==
data.confirmPassword
)

errors.confirmPassword=
"Password mismatch";



return errors;


};







// Login validation

export const validateLogin=(data)=>{


const errors={};



if(!validateEmail(data.email))

errors.email="Invalid email";



if(!required(data.password))

errors.password=
"Password required";



return errors;


};