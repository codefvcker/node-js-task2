const Board = require('./boards.model');
const Task = require('../tasks/tasks.model');

const getAll = async () => {
  return Board.find({});
};

const addBoard = async board => {
  await board.save();
  return board;
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const update = async ({ title, newColumns, id }) => {
  return Board.updateOne({ _id: id }, { title, columns: newColumns });
};

const deleteBoardById = async id => {
  await Task.deleteMany({ boardId: id });
  return (await Board.deleteOne({ _id: id })).deletedCount;
};

module.exports = { getAll, addBoard, getById, deleteBoardById, update };
