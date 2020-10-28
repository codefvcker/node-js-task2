const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: String,
  columns: {
    type: Array,
    of: Object
  },
  _id: {
    type: String,
    default: uuid
  }
});

boardSchema.statics.toResponse = obj => {
  const { id, title, columns } = obj;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
