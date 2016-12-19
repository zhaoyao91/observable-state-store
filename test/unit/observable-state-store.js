import Store from '../../src/index';

describe('Store', () => {
  describe('basic setup', () => {
    it('should create a store instance without error', () => {
      const state = {};
      const actions = {};
      const store = new Store({ state, actions });

      expect(store).to.be.an.instanceof(Store);
    });
  });

  describe('getState', () => {
    const state = {
      count: 123,
      user: {
        name: 'bob'
      }
    };
    const store = new Store({ state });

    it('should return current state', () => {
      const state = store.getState();

      expect(state).to.have.property('count', 123);
      expect(state).to.have.deep.property('user.name', 'bob');
    })
  });

  describe('basic usage', () => {
    const state = {
      count: 0
    };
    const actions = {
      inc(state, number) {
        return Object.assign({}, state, { count: state.count + number });
      },
      reset(state) {
        return Object.assign({}, state, { count: 0 });
      }
    };
    const store = new Store({ state, actions });

    beforeEach(() => {
      store.actions.reset();
    });

    it('should count to 0', () => {
      const state = store.getState();
      expect(state).to.have.property('count', 0);
    });

    it('should inc count by 1', () => {
      store.actions.inc(1);
      expect(store.getState().count).to.equal(1);
    });

    it('should subscribe successfully', (done) => {
      const sub = store.subscribe((state, oldState) => {
        expect(state.count).to.equal(2);
        expect(oldState.count).to.equal(0);
        sub.stop();
        done();
      });
      store.actions.inc(2);
    });

    it('should stop subscribe successfully', () => {
      const callback = spy();
      const sub = store.subscribe(callback);

      store.actions.inc(1);
      expect(callback).to.have.been.calledOnce;

      sub.stop();
      store.actions.inc(1);
      expect(callback).to.have.been.calledOnce;
    })
  })
});
