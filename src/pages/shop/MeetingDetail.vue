<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">会议详情</div>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-8 form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label">标题</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.title"></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">地址</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.address"></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">会议活动key</label>
              <div class="col-sm-9">
                <p class="form-control-static"><strong class="text-success" v-text="detail.act_key"></strong></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">办会人访问密钥</label>
              <div class="col-sm-9">
                <p class="form-control-static"><strong class="text-danger" v-text="detail.clt_key"></strong></p>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">办会人信息</label>
              <div class="col-sm-9">
                <p class="form-control-static">
                  <span v-text="detail.clt_name"></span>
                  <span class="glyphicon glyphicon-earphone" style="margin-left:20px;"></span>: <code v-text="detail.clt_phone"></code>
                </p>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">活动时间</label>
              <div class="col-sm-9">
                <p class="form-control-static">{{detail.stime | formatDate}} - {{detail.etime | formatDate}}</p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">优惠券类型</label>
              <div class="col-sm-9">
                <p class="form-control-static">
                  <label class="label label-default" :class="couponType[detail.coupon_type].className" v-text="detail.coupon_type && couponType[detail.coupon_type].val || '' "></label>
                </p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">优惠券剩余</label>
              <div class="col-sm-9">
                <div class="form-control-static">
                  <div class="progress" style="margin-bottom:0">
                    <div class="progress-bar progress-bar-info progress-bar-striped" :style="getProgress">
                      {{detail.overage}}/{{detail.climit}}






                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">优惠券有效期</label>
              <div class="col-sm-9">
                <p class="form-control-static">
                  {{detail.validbtime | formatDate}} - {{detail.validetime | formatDate}}</p>
              </div>
            </div>


            <div class="form-group">
              <label class="col-sm-3 control-label">活动内容</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.content"></p>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">备注</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.memo"></p>
              </div>
            </div>

          </div>
          <div class="col-md-4" v-if="detail.act_key">
            <div class="thumbnail">
              <img :src="detail.qrcode">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading clearfix">
        <button class="btn btn-success btn-sm pull-right">导出Excel</button>
        <div class="panel-title">发放记录</div>
      </div>
      <table class="table table-hover">
        <colgroup>
          <col width="80">
          <col width="200">
          <col width="300">
          <col width="300">
          <col width="">
        </colgroup>
        <tbody>
        <tr>
          <th></th>
          <th>状态</th>
          <th>车牌</th>
          <th>发放时间</th>
          <th>类型</th>
        </tr>
        <tr v-if="!record.tn || record.tn===0">
          <td colspan="5">
            <div class="alert alert-info" role="alert"><strong>Oh snap!:</strong> 没有数据</div>
          </td>
        </tr>
        <tr v-else v-for="(item,key) in record.records">
          <td>{{key + 1}}</td>
          <td v-text="getCouponStatus(item.status)"></td>
          <td v-text="item.vpl"></td>
          <td>{{item.ctime | formatDate}}</td>
          <td v-text="getCouponType(item.type)"></td>
        </tr>
        </tbody>
      </table>
      <div class="panel-footer clearfix">
        <pager :total="record.tn"></pager>
      </div>
    </div>

  </div>
</template>
<script>

  import {saveOrUpdateMeeting, getMeetingDetail, getActivityCouponRecords} from '../../api/shop';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import layer from 'layui-layer';

  export default {
    created(){
      this.$route.params.id && this.getMeetingDetail(this.$route.params.id);
    },
    methods: {

      getMeetingDetail(id){
        let vm = this;
        getMeetingDetail({id: id}).then(res => {
          vm.detail = Object.assign({}, vm.detail, res.data);
          vm.detail.qrcode = 'http://180.97.80.42:9098/m/met/qrcode/' + vm.detail.act_key;
          return vm.detail;
        }).then(() => {
          vm.getRecords();
        });
      },

      getRecords(){
        let vm = this;
        getActivityCouponRecords({
          page: this.pager.currentPage,
          per_page: this.pager.pageSize,
          act_key: this.detail.act_key
        }).then(res => {
          vm.record = res;
        });
      },

      getCouponStatus(status){
        return (this.couponStatus[status] && this.couponStatus[status].text) || '下发失败';
      },

      getCouponType(type){
          return this.couponType[type].val
      }
    },
    computed: {

      ...mapGetters({
        changeRecordList: 'changeRecordList',
        changeRecordRes: 'changeRecordRes',
      }),

      ...mapState({
        'pager': 'pager',
        'couponType': 'couponType',
        'couponStatus':'couponStatus'
      }),

      getProgress(){
        return {width: Math.floor(this.detail.overage / this.detail.climit * 100) + '%'};
      },

    },
    data () {
      return {
        detail: {},
        record: {},
      }
    }
  }
</script>
