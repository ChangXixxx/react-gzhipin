// 包含n个工具函数的模块

//getRedirectTo()函数用于得到用户即将跳转的路径
//通过user.type user.header确定四种不同的跳转路径
export function getRedirectTo(type,header) {
  let path
  if(type === 'laoban'){
    path = '/laoban'
  }else{
    path = '/dashen'
  }
  if(!header){  //用户信息未完善
    path += 'info'
  }
  return path
}