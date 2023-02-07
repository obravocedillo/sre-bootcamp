const jwt = require('jsonwebtoken');

/**
 * 
 * @desc verifies the token sended by the client and returns protected data if the code was valid
 * @param {string} authorization 
 */
const protectFunction = async (authorization) => {
  try{
    const decoded = jwt.verify(authorization, 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW');

    if(decoded){
      return {success: true, data:"You are under protected data"}
    }
  
    return {success: false, data: "Error token not valid"};
  }catch(error){
    return {success: false, data: "Error token not valid"}
  }
}

module.exports = {
  protectFunction
}