import axios from 'axios'
//导入 NProgress 包对应的Js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/* export function request(config,success,failure) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
  //发送真正的网络请求
  instance(config)
    .then(res => {
      // console.log(res);
      success(res);
    })
    .catch(err => {
      // console.log(err);
      failure(err);
    })
} */

/* export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  }) */

  //发送真正的网络请求
/*   instance(config.baseConfig)
    .then(res => {
      // console.log(res);
      config.success(res);
    })
    .catch(err => {
      // console.log(err);
      config.failure(err);
    })
} */

/* export function request(config) {
  return new Promise((resolve, reject) => {
    //1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/z8',
      timeout: 5000
    })

    //发送真正的请求
    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
} */

/* export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/z8',
      timeout: 5000
    })
    //发送真正的请求
    return instance(config)
}  */


export function request(config) {
//1.创建axios的实例
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 5000
  })
  
// 2.axios的拦截器
  // 2.1请求拦截的作用

  instance.interceptors.request.use(config => {

  //在request拦截器中，展示进度条NProgress.start()
    NProgress.start()
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，希望在界面中显示一个请求的图标
    // 3.某些网络请求（比如登录（token），必须携带一些特殊的信息
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token');

     return config;
  }, err => {
    // console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    
  // 在response拦截器中，隐藏进度条NProgress.done()
    NProgress.done()
    // console.log(res);
    return res.data;
  }, err => {
    console.log(err);
  })
  // 3.发送真正的请求
  return instance(config)
} 
 

