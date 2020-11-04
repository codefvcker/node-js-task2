const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'new-column'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
);

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      default: 'new-board'
    },
    columns: {
      type: [columnSchema],
      default: [],
      required: false
    }
  },
  {
    versionKey: false,
    collection: 'boards'
  }
);

const toResponse = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

module.exports = {
  Board: mongoose.model('Board', boardSchema),
  toResponse
};
