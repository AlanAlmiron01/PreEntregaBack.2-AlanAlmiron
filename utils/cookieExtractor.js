// utils/cookieExtractor.js
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies.token;
    return token;
  };
  
  export default cookieExtractor;
  