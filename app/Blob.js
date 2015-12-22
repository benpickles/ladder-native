import Immutable from 'immutable'

export default class {
  constructor(data) {
    this.callbacks = []
    this.data = Immutable.fromJS(data)
  }

  commit() {
    this.callbacks.forEach(function(callback) {
      callback()
    })
  }

  get(name) {
    return this.data.get(name)
  }

  merge(data) {
    this.data = this.data.merge(data)
    return this
  }

  onCommit(callback) {
    this.callbacks.push(callback)
  }

  set(name, value) {
    this.data = this.data.set(name, value)
    return this
  }
}
