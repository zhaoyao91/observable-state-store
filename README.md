# observable-state-store

Simple observable state store.

[![Travis build status](http://img.shields.io/travis/zhaoyao91/observable-state-store.svg?style=flat)](https://travis-ci.org/zhaoyao91/observable-state-store)
[![Code Climate](https://codeclimate.com/github/zhaoyao91/observable-state-store/badges/gpa.svg)](https://codeclimate.com/github/zhaoyao91/observable-state-store)
[![Test Coverage](https://codeclimate.com/github/zhaoyao91/observable-state-store/badges/coverage.svg)](https://codeclimate.com/github/zhaoyao91/observable-state-store)
[![Dependency Status](https://david-dm.org/zhaoyao91/observable-state-store.svg)](https://david-dm.org/zhaoyao91/observable-state-store)
[![devDependency Status](https://david-dm.org/zhaoyao91/observable-state-store/dev-status.svg)](https://david-dm.org/zhaoyao91/observable-state-store#info=devDependencies)

## Features

- Clear state definitions
- Clear action definitions
- Observable
- Simple to use and maintain

## Installation
`npm i --save observable-state-store`

## Usage

```
import Store from 'observable-state-store'

// define state
const state = {
  count: 0
}

// define actions
const actions = {
  inc: (state, number) => Object.assign({}, state, {count: state.count + number})
}

// create store
const store = new Store({state, actions})

// subscribe to the state
const subscription = store.subscribe((newState, oldState) => {
  if (newState.count > oldState.count) {
    console.log('count inc!')
  }
});

// execute action
store.actions.inc(-2); // nothing
store.actions.inc(3); // print 'count inc!'

// stop subscription
subscription.stop();
store.actions.inc(2); // nothing 
```

## APIs

### Store

#### constructor(options)

`options` is an object with fields
- state
- actions

`state` can be anything,
but we recommend to use [Immutable.js](https://facebook.github.io/immutable-js/)
or similar things as your state.

`actions` are functions grouped into an object.
The signature of any action is

```
function(oldState, ...args): newState
```
 
Inside the action body, you should not modify the old state directly.
Instead, you should create and return an new state.

#### subscribe(observer): subscription

Subscribe to the store, and get notified by any execution of the actions.

`observer` is an function with the signature

```
function(newState, oldState)
```

You should not modify either `newState` or `oldState`.

Call `subscription.stop()` to stop the subscription.

#### actions

`actions` are mapped from the actions you passed into the constructor
with new signature

```
function(...args)
```

For example, if you passed into constructor such an action

```
{
  inc: (state, number) => Object.assign({}, state, {count: state.count + number})
}
```

then you can call the corresponding version of action on the store this way

```
store.actions.inc(3)
```

#### getState(): state

Get current state directly.
You should not modify the state it returns.

## License
[MIT](https://github.com/zhaoyao91/observable-state-store/blob/master/LICENSE)
