// Format Date

export const formatDate=(date)=>{


if(!date)
return "";



return new Date(date)
.toLocaleDateString(
"en-IN",
{

day:"2-digit",

month:"short",

year:"numeric"

}

);


};







// Capitalize text

export const capitalize=(text)=>{


if(!text)
return "";


return (

text.charAt(0)
.toUpperCase()

+

text.slice(1)

);


};







// Get user from localStorage

export const getCurrentUser=()=>{


const user =
localStorage.getItem("user");


return user
?
JSON.parse(user)
:
null;


};







// Check token

export const isLoggedIn=()=>{


return !!localStorage.getItem(
"token"
);


};







// Remove authentication

export const clearAuth=()=>{


localStorage.removeItem(
"token"
);


localStorage.removeItem(
"user"
);


};