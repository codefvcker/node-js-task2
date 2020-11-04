const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');
const ObjectId = require('mongoose').Types.ObjectId;

const getAll = async () => {
  return Board.find({});
};

const getById = async id => {
  return Board.findOne({ _id: id });
};

const createBoard = async board => {
  const newBoard = new Board({
    ...board
  });
  await newBoard.save();
  return newBoard;
};

const updateBoard = async (boardId, boardBody) => {
  await Board.updateOne(
    { _id: boardId },
    {
      $set: { ...boardBody }
    }
  );

  return Board.findOne({ _id: boardId });
};

const deleteBoard = async id => {
  await Task.deleteMany({ boardId: ObjectId(id) });
  await Board.deleteOne({ _id: id });
  return null;
};

module.exports = {
  getAll,
  getById,
  createBoard,
  updateBoard,
  deleteBoard
};
