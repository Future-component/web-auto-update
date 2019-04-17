import axios from 'axios'

axios.defaults.withCredentials = true

class AutoUpdate {
  constructor(options) {
    axios({
      url: `${options.host}/stat/version`,
      method: 'GET',
    }).then((response) => {
      let errMsg
      if (response.status >= 200 && response.status < 300) {
        if (response.data.code === 0) {
          const newVersion = Number(`${response.data.data}`.replace(/\./g, ''))
          const oldVersion = Number(`${options.version}`.replace(/\./g, ''))
          console.log(newVersion, oldVersion, newVersion > oldVersion)
          if (newVersion > oldVersion) {
            window.location.reload()
          }
          return response.data
        }
        errMsg = response.data
      } else {
        errMsg = response.statusText
      }

      const error = new Error(errMsg)
      error.response = response
      error.msg = errMsg
      throw error
    }).catch((err) => {
      console.log('version接口报错 ', err)
    })
  }
}

export default AutoUpdate
