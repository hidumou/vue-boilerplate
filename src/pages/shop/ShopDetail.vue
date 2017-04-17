<template>
  <div class="container">

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title" v-text="(isEdit?'修改':'查看') + '商户资料' "></div>
      </div>
      <div class="panel-body">
        <div class="col-md-6">

          <div class="form-horizontal" v-if="isEdit">
            <div class="form-group">
              <label class="col-sm-3 control-label">账号(*)</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" readonly v-model="detail.username">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">商户名称(*)</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" readonly v-model="detail.name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">密码(*)</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" v-model.trim="detail.password"/>
                <p class="help-block">6-16位长度 <code>留空不修改</code></p>
              </div>
            </div>
            <hr/>
            <div class="form-group">
              <label class="col-sm-3 control-label">时间段券权限</label>
              <div class="col-sm-9">
                <label class="radio-inline">
                  <input type="radio" value="0" v-model="detail.continue_coupon">可用
								</label>
                <label class="radio-inline">
                  <input type="radio" value="1" v-model="detail.continue_coupon">禁用
								</label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">次数券权限</label>
              <div class="col-sm-9">
                <label class="radio-inline">
                  <input type="radio" value="0" v-model="detail.num_coupon"> 可用
								</label>
                <label class="radio-inline">
                  <input type="radio" value="1" v-model="detail.num_coupon"> 禁用
								</label>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label class="col-sm-3 control-label">预定义发放限额</label>
              <div class="col-sm-9">
                <div class="input-group">
                  <label class="input-group-addon"><input type="checkbox" v-model="detail.origin_limit" :true-value="0"
                                                          :false-value="10"/>开启限制</label>
                  <input type="text" class="form-control" :readonly="detail.origin_limit== 0 "
                         v-model="detail.origin_limit">
                  <span class="input-group-addon">次/天</span>
                </div>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label class="col-sm-3 control-label">电话</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model.trim="detail.phone" value="">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">商户地址</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model.trim="detail.address" value="">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">备注</label>
              <div class="col-sm-9">
                <textarea class="form-control" rows="4" v-model.trim="detail.memo"></textarea>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">现在激活？</label>
              <div class="col-sm-9">
                <label class="checkbox-inline">
                  <input type="checkbox" v-model.trim="detail.status" :true-value="0" :false-value="1"> 立即激活
								</label>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-3 col-md-offset-3">
                <button type="button" class="btn btn-primary btn-sm btn-block" @click="saveOrUpdateShop">提交</button>
              </div>
            </div>
          </div>

          <div class="form-horizontal" v-else>
            <div class="form-group">
              <label class="col-sm-3 control-label">账号</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.username"></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">商户名称</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.name"></p>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label class="col-sm-3 control-label">时间段券权限</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.continue_coupon ? '禁用':'开启' "></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">次数券权限</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.num_coupon ? '禁用':'开启' "></p>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label class="col-sm-3 control-label">预定义发放限额</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-if="detail.origin_limit === 0 || detail.origin_limit === '0' ">不限制</p>
                <p class="form-control-static" v-else v-text="(detail.origin_limit || 0) + '次/天'"></p>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label class="col-sm-3 control-label">电话</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.phone"></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">商户地址</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.address"></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">备注</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.memo"></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">状态</label>
              <div class="col-sm-9">
                <p class="form-control-static" v-text="detail.status === 0 ? '正常':'冻结'"></p>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-3 col-md-offset-3">
                <button type="button" class="btn btn-danger btn-sm btn-block" @click="edit">修改</button>
              </div>
            </div>
          </div>

        </div>

        <div class="col-md-3 col-md-offset-3">
          <ul class="list-group">
            <li class="list-group-item">预定义优惠券限额</li>
            <li class="list-group-item list-group-item-info"
                v-if="detail.origin_limit === 0 || detail.origin_limit === '0' ">
              <p class="well-sm"><strong>不限制</strong></p>
            </li>
            <li class="list-group-item list-group-item-info" v-else>
              <p class="well-sm">当天可用:<strong>{{detail.now_limit}}/{{detail.origin_limit || 0}}次</strong></p>
            </li>
          </ul>
          <ul class="list-group">
            <li class="list-group-item">自定义优惠券余额</li>
            <li class="list-group-item list-group-item-info">
              <p class="well-sm" v-for="item in balance" v-html="item"></p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

  import {mapState} from 'vuex';
  import * as ShopService from '../../api/shop';
  import layer from 'layui-layer';

  export default {
    created(){
      this.isEdit = !!this.$route.query.isEdit;
      this.getShopDetailById();
    },
    methods: {
      getShopDetailById(){
        const vm = this;
        ShopService.getShopDetailById({
          id: this.$route.params.id
        }).then(res => {
          if (res.status !== 0) {
            layer.msg(res.msg || 'error');
            return;
          }
          vm.detail = res.data;
        });
      },
      edit(){
        this.isEdit = true;
      },
      saveOrUpdateShop(){
        const vm = this;
        ShopService.saveOrUpdateShop(this.detail).then(res => {
          if (res.status !== 0) {
            layer.msg(res.msg || 'error');
            return;
          }
          vm.$router.go(-1);
        });
      }
    },
    computed: {
      ...mapState(['couponType']),

      //余额换算
      balance(){
        if (!this.detail || !this.detail.balance || !this.detail.balance.length) return [];
        const res = [], self = this;
        $.each(this.detail.balance, function (idx, item) {
          const html = [];
          const o = self.couponType[item.type];
          html.push(o.val);
          html.push(': ');
          html.push('<strong>');
          html.push(o.calc(item.count, 'hh:mm'));
          item.type !== 0 ? html.push('/' + o.unit) : '';
          html.push('</strong>');

          res.push(html.join(''));
        });
        return res;
      }
    },
    data(){
      return {
        isEdit: false,
        detail: {}
      }
    }
  }
</script>
