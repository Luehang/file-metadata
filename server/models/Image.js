import mongoose from 'mongoose';
const { Schema } = mongoose;
mongoose.Promise = require('bluebird');

const imageSchema = new Schema({
  filename: String,
  mimetype: String,
  encoding: String,
  size: Number,
  data: Array
});

module.exports = mongoose.model('Image', imageSchema);
