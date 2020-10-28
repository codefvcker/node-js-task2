const boom = require('boom');
const boardsRepo = require('./board.db.repository');
const Board = require('./boards.model');
const Column = require('./columns.model');
const { newBoard } = require('./boards.schema');

const getAll = async () => await boardsRepo.getAll();

const createBoard = (title, columns) => {
  const { error } = newBoard.validate({ title, columns });
  if (error) throw boom.badRequest(error.message, { request: 'createBoard' });
  const columnsInBoard = columns.map(
    ({ title: titleColumn, order }) => new Column({ title: titleColumn, order })
  );
  const board = new Board({ title, columns: columnsInBoard });
  return boardsRepo.addBoard(board);
};

const getById = async id => {
  const board = await boardsRepo.getById(id);
  if (!board) {
    throw boom.notFound("This board doesn't exist", {
      request: 'getByIdBoard'
    });
  }
  return board;
};

const deleteBoardById = async id => {
  const ok = await boardsRepo.deleteBoardById(id);
  if (!ok) {
    throw boom.notFound("This board doesn't exist", {
      request: 'getByIdBoard'
    });
  }
  return ok;
};

const updateBoard = async (id, title, columns) => {
  const { error } = newBoard.validate({ title, columns });
  if (error) throw boom.badRequest(error.message, { request: 'updateBoard' });
  const newColumns = columns.map(({ title: titleColumn, order, id: colId }) => {
    return new Column({ id: colId, order, title: titleColumn });
  });
  return await boardsRepo.update({ id, title, newColumns });
};

module.exports = { getAll, createBoard, getById, updateBoard, deleteBoardById };
