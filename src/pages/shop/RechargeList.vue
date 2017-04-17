<template>
  <div class="container dashboard">

    <ul class="row list-group">
      <li class="list-group-item">
        <div class="form-inline">
          <div class="form-group">
            <select class="form-control input-sm">
              <option value="0">全部</option>
              <option value="1">自定义</option>
              <option value="2">预定义</option>
            </select>
          </div>
          <div class="form-group">
            <select class="form-control input-sm">
              <option value="-1">全部</option>
              <option value="0">时长</option>
              <option value="1">金额</option>
              <option value="2">次数</option>
            </select>
          </div>
          <date-time-picker v-model="searchParam.stime"></date-time-picker>
          <label style="font-size: 12px;">至</label>
          <date-time-picker v-model="searchParam.stime"></date-time-picker>
          <div class="form-group ">
            <input type="text" class="form-control input-sm" placeholder="商户名称"/>
          </div>

          <button class="btn btn-default btn-sm">查询</button>
          <button class="btn btn-default btn-sm">导出Excel</button>

          <div class="pull-right">
            <router-link :to="{name: 'mall.recharge.add'}" class="btn btn-primary btn-sm">优惠券充值</router-link>
          </div>
        </div>
      </li>
    </ul>

    <div class="row">

      <div class="alert alert-green">优惠券充值记录</div>

      <!--数据列表-->
      <div class="list">
        <table class="table table-center table-parking">
          <colgroup>
            <col width="60">
            <col width="120">
            <col width="100">
            <col width="150">
            <col width="200">
            <col width="170">
            <col width="">
          </colgroup>

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

      <!--分页-->
      <pager :total="response.tn" :page-size="pager.pageSize"></pager>

    </div>

  </div>
</template>
<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import * as types from '../../stores/mutation-types';

  export default {
    created(){
      this.$store.dispatch('getRechargeList', {
        page: this.pager.currentPage,
        per_page: this.pager.pageSize
      });
    },
    computed: {
      ...mapGetters(['rechargeRecordList']),

      ...mapState(['pager', 'couponExtendsType', 'couponType']),

      ...mapState({
        response: ({recharge}) => recharge.response
      }),

      couponExtendsTypeCondition(){
        const types = [{name: '所有类别', value: null}], couponExtendsType = this.$store.state.couponExtendsType;
        Object.keys(couponExtendsType).forEach((key) => {
          types.push({name: couponExtendsType[key].val, value: key});
        });
        return types;
      },

      couponTypeCondition(){
        const types = [{name: '所有类型', value: null}], couponTypes = this.$store.state.couponType;
        Object.keys(couponTypes).forEach((key) => {
          types.push({name: couponTypes[key].val, value: key});
        });
        return types;
      }
    },
    data () {
      return {
        //搜索条件
        searchParam: {
        },
      }
    }
  }
</script>
