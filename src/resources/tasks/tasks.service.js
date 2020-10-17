const tasksRepo = require('./tasks.memory.repository');
const Task = require('./tasks.model');

const getTasksByBoardId = boardId => tasksRepo.getTasksByBoardId(boardId);

const addTask = ({ title, order, description, userId, boardId, columnId }) => {
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  return tasksRepo.addTask(newTask);
};

const updateById = ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
  task
}) => {
  task.update({ title, order, description, userId, boardId, columnId });
  return task;
};

const deleteTask = (taskId, boardId) => tasksRepo.deleteTask(taskId, boardId);
const findTask = (taskId, boardId) => tasksRepo.findTask(taskId, boardId);

module.exports = {
  getTasksByBoardId,
  addTask,
  updateById,
  deleteTask,
  findTask
};
