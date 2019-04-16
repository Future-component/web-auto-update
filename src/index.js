import axios from 'axios'

class AutoUpdate {
  constructor(options) {
    axios({
      url: options.host + '/stat/version',
    })
  }

  run() {
    window.location.reload()
  }
}

export default AutoUpdate