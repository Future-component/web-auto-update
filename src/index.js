import axios from 'axios'

axios.defaults.withCredentials = true;

class AutoUpdate {
  constructor(options) {
    axios({
      url: `${options.host}/stat/version`,
      method: 'GET',
    }).then((response) => {
      console.log('response ', response)
      let errMsg
      if (response.status >= 200 && response.status < 300) {
        if (response.data.code === 0) {
          const newVersion = Number(`${response.data.data}`.replace('.', ''))
          const oldVersion = Number(`${options.version}`.replace('.', ''))
          console.log(response.data.data, options.version, newVersion, oldVersion, '???', newVersion > oldVersion)
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
      console.log('接口报错 ', err)
      let msgTmp = err
      const data = err.response.data
      if (err.response) {
        msgTmp = `${err.response.data.code}_${err.response.data.msg}`
      } else {
        msgTmp = err.message || err.msg
      }
      return { error: { msg: msgTmp, data } }
    })
  }
}

export default AutoUpdate
