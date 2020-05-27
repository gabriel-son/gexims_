const router = require('express').Router()
const bodyParser = require('body-parser');

/*
** import controllers
*/
const Login = require('../controller/users/Login')
const SignUp = require('../controller/users/SignUp')

router.use(bodyParser.json())

router.post('/api/users/register',SignUp);
router.post('/api/users/login',Login);

module.exports = router;