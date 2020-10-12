const uuid = require('uuid');
class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
    this.tasks = [];
  }

  toResponse() {
    const { id, title, columns } = this;
    return { id, title, columns };
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  getTaskById(id) {
    return this.tasks.find(task => task.id === id);
  }

  deleteTaskById(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  update(title, columns) {
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
