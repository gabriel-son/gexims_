/*
**module to allow user sign up
*/
const User = require('../../models/user');

module.exports = async (req, res) => {
    //initializing mongoose client
    const user = new User(req.body);
    try {
        //throw error if details provided not complete
        if (!req.body.email || !req.body.password) {
            throw new Error('Complete User details required');
        } else {
            let checkForUser = await User.findOne({ email: user.email })
            // Checking if email is already taken
            if (checkForUser) {
                throw new Error('Email is already registered');
            } else {
                let successfulSignUp = await user.save();
                if (!successfulSignUp) {
                    throw new Error('Unable to complete signup');
                } else {
                    return res.status(201).json({
                        status: 'success',
                        message: 'Signup successful',
                        data: user
                    });
                }
            }
        }

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
            data: req.body
        });
    }
}