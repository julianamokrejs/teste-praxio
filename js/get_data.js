function get_data(url) {
    return new Promise(function (resolve, reject) {
      const req = new XMLHttpRequest()
  
      req.open('GET', url)
  
      req.onload = function () {
        if (req.status === 200) {
          resolve(req.response)
        } else {
          reject(req.status + ' ' + req.statusText)
        }
      }
      req.onerror = function () {
        reject('Erro de conexão')
      }

      req.send()
    })
  }