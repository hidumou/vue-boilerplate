<template>
  <div class="container dashboard">
    <div class="row">
      <div class="alert alert-green">
        <span>会议列表</span>
        <router-link :to="{name:'mall.meeting.add'}" class="btn btn-primary btn-sm">创建</router-link>
      </div>

      <!--数据列表-->
      <div class="list shop-list">
        <table class="table table-center table-parking">
          <colgroup>
            <col width="192">
            <col width="210">
            <col width="210">
            <col width="200">
            <col width="100">
            <col width="100">
            <col width="300">
          </colgroup>
          <tbody>
          <tr>
            <th>标题</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>优惠券类型</th>
            <th>优惠券总数</th>
            <th>状态</th>
            <th>操作</th>
          </tr>

          <tr v-for="(meeting,key) in meetingList">
            <td>
              <router-link :to="{name:'mall.meeting.detail',params:{id:meeting.id}}"
                           v-text="meeting.title"></router-link>
            </td>
            <td>{{meeting.stime | formatDate}}</td>
            <td>{{meeting.etime | formatDate}}</td>
            <td v-html="getCouponTypeStyle(meeting)"></td>
            <td v-text="meeting.climit"></td>
            <td v-html="getMeetingStatus(meeting)"></td>
            <td class="btns">
              <span class="btn btn-xs btn-info" @click="goEdit(meeting)">编辑</span>
              <span class="btn btn-xs btn-success" @click="deleteMeeting(meeting,key)">删除</span>
            </td>
          </tr>

          </tbody>
        </table>
      </div>

      <!--分页-->
      <pager :total="response && response.tn" :page-size="pager.pageSize"></pager>

    </div>
  </div>
</template>
<script>
  import "../../assets/style/shop.scss";

  import {mapState, mapActions, mapGetters} from 'vuex';
  import * as types from '../../stores/mutation-types';
  import layer from 'layui-layer';
  import * as MeetingService from '../../api/shop';

  export default {
    created(){
      this.getMeetingList();
    },

    computed: {

      ...mapGetters({
        meetingList: 'meetingList',
        response: 'response'
      }),

      ...mapState({
        pager: 'pager',
        'couponType': 'couponType'
      }),

    },

    methods: {
      ...mapActions(['nextPage', 'getMeetingList']),
      getMeetingList(){
          this.$store.dispatch('getMeetingList',{
            page: this.pager.currentPage,
            per_page: this.pager.pageSize,
          });
      },
      getCouponTypeStyle(meeting){
        return `<span class="btn btn-xs label-default ${this.couponType[meeting.coupon_type].className}"  style="color: #fff;">${this.couponType[meeting.coupon_type].val}</span>`;
      },

      getMeetingStatus(meeting){
        if (moment().unix() > meeting.etime) {
          return '<span class="label label-info">已结束</span>';
        }

        if (moment().unix() < meeting.stime) {
          return '<span class="label label-success">未开始</span>';
        }

        if (moment().unix() >= meeting.stime && moment().unix() <= meeting.etime) {
          return '<span class="label label-danger">进行中</span>';
        }
      },

      deleteMeeting(meeting,idx){
        const vm = this;
        layer.confirm('确定删除该会议吗？', {
          yes: function (index) {
            const data = Object.assign({}, meeting, {
              status: 1
            });
            MeetingService.saveOrUpdateMeeting(data).then(res => {
              if (res.status !== 0) {
                layer.msg(res.msg || 'error');
                return;
              }
              vm.$store.commit(types.DELETE_MEETING,idx);
              vm.getMeetingList();
              layer.msg('删除成功！');
              layer.close(index);
            });
          }
        });
      },

      goEdit(meeting){
          this.$router.push({name:'mall.meeting.add',query:{id:meeting.id,isEdit:true}});
      }
    }
  }
</script>
