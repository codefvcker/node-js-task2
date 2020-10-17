const router = require('express').Router();
const tasksService = require('./tasks.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await tasksService.getTasksByBoardId(boardId);
  res.json(tasks.map(task => task.toResponse()));
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  if (boardId) {
    const {
      title,
      order,
      description,
      userId,
      boardId: boardIdInBody,
      columnId
    } = req.body;
    const task = await tasksService.addTask({
      title,
      order,
      description,
      userId,
      boardId: boardIdInBody || boardId,
      columnId
    });
    res.json(task.toResponse());
  } else {
    res.status(400).json('boardId is required');
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  if (boardId && taskId) {
    const task = await tasksService.findTask(taskId, boardId);
    if (task) {
      res.json(task.toResponse());
    } else {
      res.status(404).json("This task doesn't exist");
    }
  } else {
    res.status(400).json(' boardId && taskId is required');
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  if (boardId && taskId) {
    const task = await tasksService.findTask(taskId, boardId);
    if (task) {
      const {
        title,
        order,
        description,
        userId,
        boardId: boardIdInBody,
        columnId
      } = req.body;
      const updatedTask = await tasksService.updateById({
        title,
        order,
        description,
        userId,
        boardId: boardIdInBody || boardId,
        columnId,
        task
      });
      res.json(updatedTask.toResponse());
    } else {
      res.status(404).json("This task doesn't exist");
    }
  } else {
    res.status(400).json('boardId && taskId is required');
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  if (boardId && taskId) {
    const task = await tasksService.findTask(taskId, boardId);
    if (task) {
      await tasksService.deleteTask(taskId, boardId);
      res.status(204).end();
    } else {
      res.status(404).json("This task doesn't exist");
    }
  } else {
    res.status(400).json("This dashboard doesn't exist");
  }
});

module.exports = router;
