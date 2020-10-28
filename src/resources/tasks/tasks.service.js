const boom = require('boom');
const tasksRepo = require('./tasks.db.repository');
const Task = require('./tasks.model');
const task = require('./tasks.schema');

const getTasksByBoardId = async boardId =>
  await tasksRepo.getTasksByBoardId(boardId);

const addTask = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  const { error } = task.validate({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  if (error) {
    throw boom.badRequest(error.message, {
      request: 'addTask'
    });
  }
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  return await tasksRepo.addTask(newTask);
};

const updateById = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  taskId
}) => {
  const { error } = task.validate({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  if (error) {
    throw boom.badRequest(error.message, {
      request: 'updateByIdTask'
    });
  }
  return await tasksRepo.update({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
    taskId
  });
};

const deleteTask = async ({ taskId, boardId }) => {
  const ok = await tasksRepo.deleteTask({ taskId, boardId });
  if (!ok) {
    throw boom.notFound("This task doesn't exist", { request: 'deleteTask' });
  }
  return ok;
};
const findTask = async ({ taskId, boardId }) => {
  const existedTask = await tasksRepo.findTask({ taskId, boardId });
  if (!existedTask) {
    throw boom.notFound("This task doesn't exist", { request: 'findTask' });
  }
  return existedTask;
};

module.exports = {
  getTasksByBoardId,
  addTask,
  updateById,
  deleteTask,
  findTask
};
