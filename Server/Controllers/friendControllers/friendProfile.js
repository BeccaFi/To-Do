exports.friendProfile = function friendProfile(req, res) {
    const {Username} = req.user;

    const {clickedFriend} = req.body;
    console.log(clickedFriend);

    res.send(clickedFriend);
    return;
}