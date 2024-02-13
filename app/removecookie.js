import Cookies from "js-cookie";

async function removeCookieValueByName(name){
    Cookies.remove(name);
} 
export default removeCookieValueByName;
