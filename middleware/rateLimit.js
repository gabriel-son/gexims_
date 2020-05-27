const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
    max: 5, //limit each IP to 5 request per windowMs
    message: "You have exceeded your number of allowed requests in 24 hrs limit!", //message after max request
    headers: true,
  });