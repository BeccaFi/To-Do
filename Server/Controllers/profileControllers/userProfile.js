const { authentication } = require("../../Middlewares/authentication");

exports.userProfile = function userProfile(req, res) {
    const {Username} = req.user;
    res.send(Username);
    return;
}