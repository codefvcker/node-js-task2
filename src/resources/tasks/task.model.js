const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'new-task',
      required: false
    },
    order: {
      type: Number,
      default: 0,
      required: false
    },
    description: {
      type: String,
      default: '',
      required: false
    },
    userId: {
      type: mongoose.Types.ObjectId || null,
      default: null,
      required: false
    },
    boardId: {
      type: mongoose.Types.ObjectId || null,
      default: null,
      required: false
    },
    columnId: {
      type: mongoose.Types.ObjectId || null,
      default: null,
      required: false
    }
  },
  {
    versionKey: false,
    collection: 'tasks'
  }
);

const toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return { id: _id, title, order, description, userId, boardId, columnId };
};

module.exports = {
  Task: mongoose.model('Task', taskSchema),
  toResponse
};
