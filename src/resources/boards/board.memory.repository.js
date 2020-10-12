let { boards } = require('../store');

const getAll = async () => {
  return boards;
};

const addBoard = async board => {
  boards.push(board);
  return board;
};

const getById = async id => {
  return boards.find(board => board.id === id);
};

const deleteBoardById = async id => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = { getAll, addBoard, getById, deleteBoardById };
