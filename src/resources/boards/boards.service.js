const boardsRepo = require('./board.memory.repository');
const Board = require('./boards.model');
const Column = require('./columns.model');

const getAll = () => boardsRepo.getAll();

const createBoard = (title, columns) => {
  const columnsInBoard = columns.map(
    ({ title: titleColumn, order }) => new Column({ title: titleColumn, order })
  );
  const board = new Board({ title, columns: columnsInBoard });
  return boardsRepo.addBoard(board);
};

const getById = id => {
  return boardsRepo.getById(id);
};

const deleteBoardById = id => {
  return boardsRepo.deleteBoardById(id);
};

const updateBoard = (board, title, columns) => {
  const newColumns = columns.map(({ title: titleColumn, order, id }) => {
    return new Column({ id, order, title: titleColumn });
  });
  board.update(title, newColumns);
  return board;
};

module.exports = { getAll, createBoard, getById, updateBoard, deleteBoardById };
