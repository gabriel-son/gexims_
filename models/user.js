const mongoose = require('mongoose')
const Schema = mongoose.Schema
const redisClient = require('./redis')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//defining db schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};
//before saving password, hash it
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }
  next();
});
//generating jwt token for client
UserSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign(
    { email: this.email.toString() },
    process.env.TOKEN_SECRET_KEY, { expiresIn: '5m' })
  const refreshToken = await jwt.sign(
    { email: this.email.toString() },
    process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '2h' });
  //saving refresh token to cache
  await redisClient.set(this.email, refreshToken);
  await redisClient.expire(this.email, 7200);
  return token;
}
//validating password after login
UserSchema.methods.comparePassword = function (password, hash) {
  return bcrypt.compare(password, hash);
}
module.exports = mongoose.model('user', UserSchema);

