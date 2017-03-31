<template>
  <div>
    <nav class="navbar navbar-parking">
      <div class="container">
        <div class="navbar-header">
          <span class="navbar-brand">
            <strong>停车王优惠券</strong>
            <small>{商场}</small>
          </span>
        </div>
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/dashboard">
            <a>控制台</a>
          </router-link>
          <router-link tag="li" to="/role">
            <a>商户</a>
          </router-link>
          <router-link tag="li" to="/recharge">
            <a>充值</a>
          </router-link>
          <router-link tag="li" to="/record">
            <a>发放记录</a>
          </router-link>
          <router-link tag="li" to="/meeting">
            <a>会议</a>
          </router-link>
          <li>
            <a>下载app</a>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li>
            <a>
              <span class="glyphicon glyphicon-user"></span>
              <strong v-text="user.name"></strong>
              <code title="车场编号" v-text="user.id"></code>
            </a>
          </li>
          <li><a href="/m/welcome/set" title="设置"><span class="glyphicon glyphicon-cog"></span></a></li>
          <li><a @click="removeUser" title="退出"><span class="glyphicon glyphicon-off"></span></a></li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

  </div>

</template>
<style lang="scss">
  @import "../assets/style/nav.scss";
</style>
<script>

  import * as types from '../stores/mutation-types';
  import {mapActions, mapGetters,mapState} from 'vuex';

  export default {
    methods: {
      ...mapActions(['logout']),
      removeUser:function () {
        this.$store.commit(types.USER_LOGOUT);
      }
    },
    computed: mapGetters({user:'info'}),
    watch: {
      'user': function () {
        if(!this.user || $.isEmptyObject(this.user)){
          this.$router.push('login');
        }
      }
    }
  }
</script>
