
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const {getConnection} = require("./db");

/**
 * 
 * @desc receives a username and password and validates that the encrypted password is correct
 * @param {string} username the username sended by the client
 * @param {string} password the password sended by the client
 */
const loginFunction = async (username, password) => {
  try {
    const db = await getConnection();
    const [rows] = await db.execute('SELECT * FROM `users` WHERE `username` = ?', [username]);

    if(rows.length === 0){
      return {success: false, data:'Error user not found'};
    }
  
    const passwordWithSalt = `${password}${rows[0].salt}`;
  
    const hash = crypto.createHash('sha512');
    const data = hash.update(passwordWithSalt, 'utf-8');
    const generatedHash = data.digest('hex');
  
    if(generatedHash === rows[0].password){
      const token = jwt.sign(rows[0].role, 'my2w7wjd7yXF64FIADfJxNs1oupTGAuW');
      return {success: true, data:token}; 
    }
  
    return {success:false, data:'Error password not valid'};
  } catch (error) {
    return {success:false, data:error};
  }
}

module.exports = {
  loginFunction
}