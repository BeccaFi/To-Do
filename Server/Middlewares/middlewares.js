const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function authentication(req, res, next) {
    console.log('kör authentication!!!');
    //Hämtar en "authToken" i våra cookies.
    const authToken = req.cookies.authToken;
  

    const loggedInUser = jwt.verify(authToken, secret);

    // req.user = loggedInUser; //Sätter en nyckel på vår request user, och den innehåller värdet av den inloggade användaren. Varje gång en request går igenom den här middlewaren kommer vi sätta fast den här nyckeln på requesten. Det betyder, att vi sen i våra endpoints alltid kommer ha åtkomst till den inloggade användaren genom requestens

    // next();
    // res.status(403).send(`Access forbidden`)
  
  }

module.exports.authentication = authentication;