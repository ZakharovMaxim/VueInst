import Errors from './Error.js'
import axios from 'axios'
export default class Form {
  constructor (data) {
    this.originalData = data
    for (let field in data) {
      this[field] = data[field]
    }
    this.errors = new Errors()
  }
  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }
    this.errors.reset()
  }
  data () {
    let r = Object.assign({}, this)
    delete r.originalData
    delete r.errors
    return r
  }
  submit (requestType, path, withToken) {
    if (JSON.stringify(this.data()) === JSON.stringify(this.originalData)) return new Promise((resolve) => resolve())
    Object.assign(this.originalData, this.data())
    const token = localStorage.getItem('token')
    if (withToken) {
      return axios[requestType](path, this.data(), {
        headers: { Authorization: `JWT ${token}`, withCredentials: true }
      })
    }
    return axios[requestType](path, this.data())
  }
}
