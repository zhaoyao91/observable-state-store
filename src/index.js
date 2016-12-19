class Subject {
  _observers = new Set();

  subscribe(observer) {
    this._observers.add(observer);
    return {
      stop: () => this._observers.delete(observer)
    }
  }

  publish(...args) {
    for (let observer of this._observers) {
      observer(...args);
    }
  }
}

class Store {
  constructor({ state, actions }) {
    this._state = state;
    this._subject = new Subject();
    this.actions = {};
    this._addActions(actions);
  }

  getState() {
    return this._state;
  }

  subscribe(observer) {
    return this._subject.subscribe(observer);
  }

  _addAction(name, action) {
    this.actions[ name ] = (...args) => {
      const oldState = this._state;
      const newState = action(oldState, ...args);
      this._state = newState;
      this._subject.publish(newState, oldState);
    }
  }

  _addActions(actions = {}) {
    for (let name in actions) {
      const action = actions[ name ];
      this._addAction(name, action);
    }
  }
}

export default Store;
