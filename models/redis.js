/*
**configuring redis client to be used for caching
*/
const redis = require('redis')
const redisClient = redis.createClient()

// export const resisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('connect', function () {
  console.log('Redis client connected')
})

redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err)
})

module.exports = redisClient
