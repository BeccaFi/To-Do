const { authentication } = require("../../Middlewares/authentication");

exports.userProfile = function userProfile(req, res) {
    const {Username} = req.user;
    return res.send(Username);
}