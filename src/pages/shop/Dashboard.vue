<template>
  <div class="container dashboard">
    <div class="row center-block overview">
      <div class="col-lg-3">
        <div class="block record-block">
          <h5>今日充值记录数</h5>
          <h2><span v-text="total.record"></span>
            <small>条</small>
          </h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="block time-block">
          <h5>今日充值总时长</h5>
          <h2 v-html="total.time"></h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="block money-block">
          <h5>今日充值总金额</h5>
          <h2><span v-text="total.money"></span>
            <small>元</small>
          </h2>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="block count-block">
          <h5>今日充值总次数</h5>
          <h2><span v-text="total.count"></span>
            <small>次</small>
          </h2>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="alert alert-green">今日充值记录</div>
      <div class="list">
        <table class="table table-center table-parking">
          <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>类别</th>
            <th>名称</th>
            <th>类型</th>
            <th>面额</th>
            <th>充值时间</th>
            <th>备注</th>
          </tr>
          <tr v-if="rechargeRecordList && rechargeRecordList.length" v-for="record in rechargeRecordList">
            <th>
              <span class="glyphicon glyphicon-bookmark tag"
                    :class="couponExtendsType[record.ex_type].className"></span>
            </th>
            <td v-text="((couponExtendsType[record.ex_type] && couponExtendsType[record.ex_type].val) || '通用')"></td>
            <td>
              <router-link :to="{ name: 'mall.detail',params:{id:record.shop_id}}" v-text="record.name"></router-link>
            </td>
            <td>
              <span v-if="couponType[record.type]" class="label" :class="couponType[record.type].className"
                    v-text="couponType[record.type].val"></span>
            </td>
            <td>{{record.face_value | faceUnitConvert(record.count, record.type, record.ex_type)}}</td>
            <td>{{record.ctime | formatDate}}</td>
            <td>{{record.memo}}</td>
          </tr>

          <tr v-if="!rechargeRecordList || !rechargeRecordList.length">
            <td colspan="7" class="text-center">
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
  import "../../assets/style/dashboard.scss";
  import * as types from '../../stores/mutation-types';
  import {mapGetters, mapActions, mapState} from 'vuex';
  import {sumBy, filter} from 'lodash';

  export default {
    created(){
      this.$store.dispatch('getRechargeList', {
        page: this.pager.currentPage,
        per_page: 200,
        stime: moment().startOf('day').unix(),
        etime: moment().unix()
      });
    },

    methods: {},
    watch: {
      'rechargeRecordList'(newVal, oldVal){
        let vm = this;
        this.total.record = (newVal && newVal.length) || 0;
        if (newVal && newVal.length) {
          $.each(newVal || [], (idx, item) => {
            if (item.type === 0) {
              vm.total.time += item.count;
            }

            else if (item.type === 1) {
              vm.total.money += parseInt(item.count / 100, 10);
            }

            else if (item.type === 2) {
              vm.total.count++;
            } else {

            }
          });
        }
        
        let hours = Math.floor((vm.total.time / 60)),
          min = Math.floor((vm.total.time % 60));
        vm.total.time = `${hours}<small>小时</small>${min < 15 ? 0 : min}<small> 分钟</small>`;

      }
    },
    computed: {
      ...mapGetters(['rechargeRecordList']),
      ...mapState(['pager', 'couponType', 'couponExtendsType'])
    },
    data(){
      return {
        total: {
          time: 0,
          record: 0,
          money: 0,
          count: 0
        }
      }
    }
  }
</script>
