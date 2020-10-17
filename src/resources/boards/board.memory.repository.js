const store = require('../store');

const getAll = async () => {
  return store.boards;
};

const addBoard = async board => {
  store.boards.push(board);
  return board;
};

const getById = async id => {
  return store.boards.find(board => board.id === id);
};

const deleteBoardById = async id => {
  store.boards = store.boards.filter(board => board.id !== id);
  store.tasks = store.tasks.filter(task => {
    console.log(task.boardId === id);
    return task.boardId !== id;
  });
};

module.exports = { getAll, addBoard, getById, deleteBoardById };
