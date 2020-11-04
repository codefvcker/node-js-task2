const { Task } = require('./task.model');
const ObjectId = require('mongoose').Types.ObjectId;

const getByBoardId = async boardId => {
  return Task.find({ boardId: ObjectId(boardId) });
};

const getByBoardIdAndTaskId = async (boardId, taskId) => {
  return Task.findOne({
    _id: taskId,
    boardId: ObjectId(boardId)
  });
};

const createTask = async task => {
  const newTask = new Task({
    ...task
  });
  await newTask.save();
  return newTask;
};

const updateTask = async (boardId, taskId, task) => {
  const output = {};

  if (task.title) {
    output.title = task.title;
  }
  if (task.order) {
    output.order = task.order;
  }
  if (task.description) {
    output.description = task.description;
  }
  if (task.userId || task.userId === null) {
    output.userId = task.userId;
  }
  if (task.boardId || task.boardId === null) {
    output.boardId = task.boardId;
  }
  if (task.columnId || task.columnId === null) {
    output.columnId = task.columnId;
  }
  await Task.updateOne(
    { _id: taskId, boardId: ObjectId(boardId) },
    {
      $set: { ...output }
    }
  );

  return Task.findOne({ _id: taskId });
};

const deleteTask = async (boardId, taskId) => {
  await Task.deleteOne({
    _id: taskId,
    boardId: ObjectId(boardId)
  });
  return null;
};

module.exports = {
  getByBoardId,
  getByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask
};
