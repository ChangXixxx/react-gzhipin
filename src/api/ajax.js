//封装ajax请求  请求路径，请求参数（默认空），请求方式（默认GET请求）
import axios from 'axios'
export default function ajax(url,data = {},type = 'GET') {
  if(type === 'GET'){
    //将data:{username:'Tom',password='123'} 转化成 username='Tom'&password='123'
    let paramStr = ''
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&'
    })
    //删掉最后一个多余的&
    if(paramStr)
      paramStr = paramStr.substring(0,paramStr.length-1)
    return axios.get(url+'?'+paramStr)
  } else {
    return axios.post(url,data)
  }
}