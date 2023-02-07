const { protectFunction } = require('../services/protected');
const {ERROR_CODE, SUCCESS_CODE} = require("../constants/response");

const protect = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;

    const tokenArray = authorization.split(" ");

    if(tokenArray.length === 0){
      res.status(ERROR_CODE).send('Error no token')
      next();
      return;
    }

    const protectedResponse = await protectFunction(tokenArray[1]);

    if(protectedResponse){
      res.status(SUCCESS_CODE).send({data: protectedResponse.data});
      next();
      return;
    }

    res.status(ERROR_CODE).send({data: protectedResponse.data});
    next();
    return;
  } catch (error) {
    res.status(ERROR_CODE).send({data: error});
    next();
    return;
  }
}

module.exports = {
  protect
}