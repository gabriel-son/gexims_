/*
**controller for task performed by user
*/
const router = require('express').Router()
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');

/*
** import controllers
*/
const GetAllUsers = require('../controller/tasks/GetAllUsers');

router.use(bodyParser.json())

router.use(auth);

router.get('/api/users',GetAllUsers);

module.exports = router;