const store = require('../store');

const getTasksByBoardId = async boardId =>
  store.tasks.filter(task => task.boardId === boardId);

const addTask = async task => {
  await store.tasks.push(task);
  return task;
};

const deleteTask = async (taskId, boardId) => {
  store.tasks = store.tasks.filter(
    task => task.id !== taskId || task.boardId !== boardId
  );
  return store.tasks;
};
const findTask = async (taskId, boardId) => {
  return store.tasks.find(t => t.id === taskId && t.boardId === boardId);
};

module.exports = { getTasksByBoardId, deleteTask, addTask, findTask };
