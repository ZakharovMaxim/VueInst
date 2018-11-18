import axios from '../configs/axios'

const Network = {
  initInterceptors (instance) {
    axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token')
      if (config.headers['Authorization']) {
        config.headers['Authorization'] = `JWT ${token}`
      }
      return config
    })
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Do something with response data
      return response
    }, function (error) {
      console.dir(error)
      if ((!error.response || error.response.status === 500 || error.status === 500) && instance.$sticky) {
        instance.$sticky.add({
          text: error.message,
          type: 'error'
        })
      }
      if (error.response && error.response.status === 401 && instance.removeToken) {
        instance.removeToken()
        // instance.$router.push('/')
      } else {
        return Promise.reject(error)
      }
    })
  }
}

export default Network
