const { login } = require('./login');
const { protect } = require('./protected');
const { health } = require('../services/health');

const routes = {
   init: (app) => {
    app.post('/login', login);
    app.get('/protected', protect);
    app.get('/_health', health);
  }
}


module.exports = routes;