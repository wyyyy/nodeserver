import { baseUrl } from '@/config/env'
import axiosHttp from '@/core/axiosHttp'
function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && (!res.data.success)) {
    alert(res.data.error_msg)
  }
  return res
}
export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url
  console.log('data')
  console.log(data)
  let params = data
  console.log(params)
  console.log(url)
  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  if (type === 'GET') {
    return new Promise((resolve, reject) => {
      axiosHttp.get(url, {
        params: data
      })
        .then(response => {
          checkStatus(response)
          resolve(response.data)
        })
        .then(res => {
          checkCode(res)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          // reject(err)
        })
    })
  } else if (type === 'POST') {
    return new Promise((resolve, reject) => {
      axiosHttp.post(url,
        data
      )
        .then(response => {
          console.log(response)
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
}