/*
**module to retrieve all users
*/
const User = require('../../models/user')
module.exports = async (req, res) => {
    let users = await User.find({});
    try {
        if (users) {
            res.status(200).json({
                status: 'successful',
                data: {
                    user: req.user,
                    token: req.token
                },
            })
        }
        //no else block
    } catch (err) {
        console.log(err);
    }
}