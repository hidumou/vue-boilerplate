<template>
  <div class="login-container">
    <div class="row">
      <div class="col-lg-6">
        <img class="login-left-img" src="../assets/image/img-login-left@2X.png" alt="">
      </div>
      <div class="col-lg-6 login-right-form">
        <form @submit.prevent="login">
          <div class="alert alert-danger" role="alert" v-if="errorMsg" v-text="errorMsg"></div>
          <div class="form-group">
            <img class="logo" src="../assets/image/logo.png" alt="">
            <span class="system-name">停车王电子优惠券系统</span>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                  <span v-text="currentRole.role"></span>
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                  <li v-for="item in roles" @click="selectRole(item)">
                    <a v-text="item.role" :data-role="item.value"></a>
                  </li>
                </ul>
              </div>
              <input type="text" class="form-control" name="username" v-model="loginData.username" placeholder="账号">
            </div>
          </div>
          <div class="form-group" v-show="currentRole.value !== 2">
            <input type="text" class="form-control" name="mallid" v-model="loginData.mallid" placeholder="商场编号">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" name="password" v-model="loginData.password" placeholder="密码">
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="isLogin" type="submit"
                    v-text="isLogin ? '登录中...':'登 录'"></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import * as UserService from '../api/user';
  import Storage from '../commons/utils/Storage';
  import layer from 'layui-layer';
  import '../assets/style/login.scss';

  export default {
    created(){
      this.initRole();
    },
    methods: {
      initRole: function () {
        this.currentRole = this.roles[0];
        return this;
      },
      selectRole: function (role) {
        this.currentRole = role;
        return this;
      },
      changeLoginBtnState: function () {
        this.isLogin = !this.isLogin;
        return this;
      },
      validate: function () {
        return true;
      },
      login: function () {
        let self = this;
        this.validate() && this.changeLoginBtnState().buildParam();
        UserService.login(this.loginData).then(function (res) {
          self.isLogin = false;
          if (res.status !== 0) {
            layer.msg(res.msg || 'error');
            return;
          }
          Storage.set(Storage.TOKEN, res.data);
          self.$router.push('login');
        });
      },
      buildParam: function () {
        this.loginData.role = this.currentRole.value;
        return this;
      }
    },
    computed: {},
    data () {
      return {
        isLogin: false,
        currentRole: undefined,
        loginData: {
          username: '',
          password: '',
          mallid: '',
          role: ''
        },
        roles: [{role: '商场', value: 2}, {role: '商户', value: 3}, {role: '店员', value: 4}],
        errorMsg: ''
      }
    }
  }
</script>
