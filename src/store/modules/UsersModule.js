import Vue from 'vue'

export default {
  state: {
    currentUser: {
      get UserName () {
        return localStorage.getItem('currentUser_name')
      },
      get UserToken () {
        return localStorage.getItem('currentUser_token')
      }
    }
  },
  mutations: {
    setUser (state, {username, usertoken}) {
      // 在这里把用户名和token保存起来
      localStorage.setItem('currentUser_name', username)
      localStorage.setItem('currentUser_token', usertoken)
    }
  },
  actions: {
    userLogin (context, {username, userpass}) {
      // 发送get请求做权限认证(真实开发建议用post的方式)
      let url = 'http://localhost/yiiserver/web/index.php/token?client_appid=' + user_name + '&client_appkey=' + user_pass
      console.log(url)

      Vue.http.get(url)
        .then((res) => {
          if (res != null && res.body != undefined && 'access-token' in res.body) {
            var token = res.body['access-token']
            if (token != '') {
              // 后端API验证通过
              // 调用上面mutations里定义的方法
              context.commit('setUser', {'user_name': user_name, 'user_token': token})
            }
          } else {
            alert('用户名密码错误')
          }
        }, (res) => {
          alert('请求失败进入这里')
        })
    }
  }
}