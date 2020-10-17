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

  update(title, columns) {
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
