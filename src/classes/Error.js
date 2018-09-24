export default class Error {
  constructor () {
    this.errors = []
  }
  reset () {
    this.errors = []
  }
  has (key) {
    if (this.errors[key]) return !!this.errors[key]
  }
  get (key) {
    if (this.errors[key]) return this.errors[key].message
  }
  add (errors) {
    this.errors = errors
  }
  remove (key1, key2) {
    if (this.errors[key1]) delete this.errors[key1]
    if (key2 && this.errors[key2]) delete this.errors[key2]
  }
}
