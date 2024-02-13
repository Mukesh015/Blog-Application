

async function getCookieValueByName(name){
    const cookies = document.cookie;
    const cookieArray = cookies.split(';').map(cookie => cookie.trim());
    const desiredCookie = cookieArray.find(cookie => cookie.startsWith(`${name}=`));

    if (desiredCookie) {
      const [, value] = desiredCookie.split('=');
      return value;
    } else {
      return null;
    }
  };


export default getCookieValueByName;