const { loginFunction } = require('../services/login');
const {ERROR_CODE, SUCCESS_CODE} = require("../constants/response");

const login = async (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    const loginResponse = await loginFunction(username, password);

    if(loginResponse.success){
      res.status(SUCCESS_CODE).send({data: loginResponse.data});
      next();
      return;
    }
 
    res.status(ERROR_CODE).send({data: loginResponse.data});
    next();
    return;

  } catch (error) {
    res.status(ERROR_CODE).send({data: loginResponse.data});
    next();
    return;
  }
}

module.exports = {
  login
}
