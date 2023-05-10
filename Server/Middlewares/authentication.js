const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function authentication(req, res, next) {
    const authToken = req.cookies.authToken;
  
    if(!authToken) return res.status(401).send('Access denied');

    try {
      const verified = jwt.verify(authToken, secret);
      req.user = verified;
    } catch (error) {
      res.status(401).send('Invalid token');
    }
    
    next();
  }

exports.authentication = authentication;