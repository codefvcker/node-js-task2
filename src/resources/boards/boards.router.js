const router = require('express').Router();
const boardsService = require('./boards.service');

router.use('/', require('../tasks/tasks.router'));

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(board => board.toResponse()));
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.createBoard(title, columns);
  res.json(board.toResponse());
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) {
    res.json(board.toResponse());
  } else {
    res.status(404).json("This board doesn't exist");
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) {
    const { title, columns } = req.body;
    await boardsService.updateBoard(board, title, columns);
    res.json(board.toResponse());
  } else {
    res.status(404).json("This board doesn't exist");
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getById(id);
  if (board) {
    await boardsService.deleteBoardById(id);
    res.status(204).end();
  } else {
    res.status(404).json("This board doesn't exist");
  }
});

module.exports = router;
