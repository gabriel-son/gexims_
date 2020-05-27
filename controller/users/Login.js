const User = require('../../models/user');
const passport = require('passport')
module.exports = async (req, res) => {
  let user = req.body;
  const userInstance = new User(user);
return passport.authenticate('local', { session: false }, async (err, passportUser, info) => {
  if(err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
      data: user
    })
  }
  if(passportUser) {
    const user = passportUser;
    user.token = await userInstance.generateAuthToken();
    return res.status(200).json({ 
      status: 'successful',
      message: 'Login successful',
      data: user
    });
  }else{
    return res.status(200).json({ 
      status: 'fail',
      message: info.message,
      data: user
    })
  }
})(req, res);
}
