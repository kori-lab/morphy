const { Schema } = require('mongoose');

module.exports = new Schema({
  _id: String,
  prefix: {
    type: String,
    required: true,
  },
});
