<template>
  <nav class="navbar navbar-parking" style="border-radius: 0;">
    <div class="container">
      <div class="navbar-header">
          <span class="navbar-brand">
            <strong>停车王优惠券</strong>
            <strong style="color: #29a67c;">「商场」</strong>
          </span>
      </div>
      <ul class="nav navbar-nav">
        <router-link tag="li" to="/mall/dashboard">
          <a>控制台</a>
        </router-link>
        <router-link tag="li" to="/mall/list">
          <a>商户</a>
        </router-link>
        <router-link tag="li" to="/mall/recharge">
          <a>充值</a>
        </router-link>
        <router-link tag="li" to="/mall/dispatch">
          <a>发放记录</a>
        </router-link>
        <router-link tag="li" to="/mall/meeting">
          <a>会议</a>
        </router-link>
        <li>
          <a target="_blank" href="http://180.97.80.42:9098/welcome/app">下载app</a>
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
        <li>
          <router-link :to="{name:'mall.user.center'}">
            <span class="glyphicon glyphicon-cog"></span>
          </router-link>
        </li>
        <li><a @click="logout" title="退出" style="cursor: pointer;"><span class="glyphicon glyphicon-off"></span></a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import * as types from '../../stores/mutation-types';
  import {mapActions, mapGetters, mapState} from 'vuex';

  export default {
    methods: {
      ...mapActions(['logout'])
    },
    computed: mapGetters({user: 'info'}),
    watch: {
      'user': function () {
        if (!this.user || $.isEmptyObject(this.user)) {
          this.$router.push('/login');
        }
      }
    }
  }
</script>
