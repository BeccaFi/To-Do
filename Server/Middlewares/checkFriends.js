
function checkClickedFriend(req, res, next) {
    console.log('Checking which friend'); //Will be removed after finishing
    const friend = req.body.clickedFriend;

    console.log(friend);
  
    if(!friend){
      return res.status(400).send('No friend');
    }
    res.status(200).send(friend);

    // try {
    //   const verified = jwt.verify(authToken, secret);
    //   req.user = verified;
    // } catch (error) {
    //   res.status(401).send('Invalid token');
    // }
    
    next();  
  }

exports.checkClickedFriend = checkClickedFriend;