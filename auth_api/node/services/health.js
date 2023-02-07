const health = (req, res, next) => {
    res.send('OK');
    next();
}

module.exports = {
    health 
}
