const tasksRepo = require('./task.memory.repository');

const getByBoardId = id => tasksRepo.getByBoardId(id);

const getByBoardIdAndTaskId = (boardId, taskId) =>
  tasksRepo.getByBoardIdAndTaskId(boardId, taskId);

const createTask = task => tasksRepo.createTask(task);

const updateTask = (boardId, taskId, task) =>
  tasksRepo.updateTask(boardId, taskId, task);

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getByBoardId,
  getByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask
};
