<template>
  <div class="container dashboard">
    <div class="row center-block overview">
      <div class="col-lg-3">
        <div class="block record-block">
          <h5>今日充值记录数</h5>
          <h2>0<small>条</small>
          </h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="block time-block">
          <h5>今日充值总时长</h5>
          <h2>0<small>小时</small>
            0<small> 分钟</small>
          </h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="block money-block">
          <h5>今日充值总金额</h5>
          <h2>0<small>元</small>
          </h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="block count-block">
          <h5>今日充值总次数</h5>
          <h2>0<small>次</small>
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="alert alert-green">今日充值记录</div>
      <div class="recently-list">
        <table class="table table-center table-parking">
          <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>类别</th>
            <th>名称</th>
            <th>类型</th>
            <th>面额</th>
            <th>充值时间</th>
          </tr>
          <tr class="active" v-if="rechargeRecordList && rechargeRecordList.length" v-for="record in rechargeRecordList">
            <th><span class="glyphicon glyphicon-bookmark tag tag-red"></span></th>
            <td v-text="couponExtendsType[record.ex_type]"></td>
            <td>
              <router-link to="" v-text="record.name"></router-link>
            </td>
            <td>
              <span class="label label-success" v-text="couponType[record.type]"></span>
            </td>
            <td v-text="record.face_value"></td>
            <td>{{record.ctime | formatDate}}</td>
          </tr>

          <tr v-if="!rechargeRecordList || !rechargeRecordList.length">
            <td colspan="6" class="text-center">
              <div class="alert" role="alert">没有记录</div>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import "../assets/style/dashboard.scss";
  import * as types from '../stores/mutation-types';
  import {mapGetters, mapActions,mapState} from 'vuex';
  import moment from 'moment';

  export default {
    created(){
      this.$store.dispatch('getRechargeList',{
        stime:moment().startOf('day').valueOf(),
        etime:Date.now()
      });
    },
    computed: {
      ...mapGetters(['pageSize', 'rechargeRecordList', 'currentPage']),
      ...mapState({
        couponType: state => state.couponType,
        couponValue: state => state.couponValue,
        couponExtendsType: state => state.couponExtendsType,
      })
    },
    methods: {

    },
  }
</script>
