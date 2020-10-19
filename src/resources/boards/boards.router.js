const router = require('express').Router();
const boardsService = require('./boards.service');

const boom = require('@hapi/boom');
const { postBoard, putBoard } = require('./boards.scheme');

router.use('/', require('../tasks/tasks.router'));

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(board => board.toResponse()));
});

router.route('/').post(async (req, res, next) => {
  const { title, columns } = req.body;
  const { error } = postBoard.validate({ title, columns });
  if (error) {
    return next(boom.badRequest(error));
  }
  const board = await boardsService.createBoard(title, columns);
  res.json(board.toResponse());

  return next(req);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  try {
    res.json(board.toResponse());
  } catch (error) {
    return next(boom.notFound(error));
  }
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  const board = await boardsService.getById(id);

  const { error } = putBoard.validate({ title, columns, id });

  if (!error) {
    try {
      await boardsService.updateBoard(board, title, columns);
      res.json(board.toResponse());
    } catch (err) {
      return next(boom.notFound(err));
    }
  } else {
    return next(boom.badRequest(error));
  }
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) {
    await boardsService.deleteBoardById(id);
    res.status(204).end();
  } else {
    return next(boom.notFound('This board doesnt exist'));
  }
});

module.exports = router;
