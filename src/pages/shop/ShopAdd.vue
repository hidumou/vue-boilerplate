<template>
  <div class="container">

    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">添加商户资料</div>
      </div>
      <div class="panel-body">
        <div class="col-md-6">
          <div class="form-horizontal">
            <div class="form-group" :class="{'has-error':errors.has('username') }">
              <label class="col-sm-3 control-label">账号(*)</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-validate="'required|alpha_dash'" data-vv-name="username"
                       data-vv-as="账号" v-model.trim="detail.username">
                <span class="help-block" v-show="errors.has('username')">{{ errors.first('username') }}</span>
              </div>
            </div>
            <div class="form-group" :class="{'has-error':errors.has('name') }">
              <label class="col-sm-3 control-label">商户名称(*)</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-validate="'required|alpha_dash'" data-vv-name="name"
                       data-vv-as="商户名称" v-model.trim="detail.name">
                <span class="help-block" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </div>
            </div>

            <div class="form-group" :class="{'has-error':errors.has('password') }">
              <label class="col-sm-3 control-label">密码(*)</label>
              <div class="col-sm-9">
                <input type="password" class="form-control" v-validate="'required|alpha_dash|max:16|min:6'"
                       data-vv-name="password" data-vv-as="商户名称" v-model.trim="detail.password"/>
                <code>留空不修改</code>
                <span class="help-block" v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">用户类型</label>
              <div class="col-sm-9">
                <label class="radio-inline"><input type="radio" v-model="detail.user_type" :value="0">预付费</label>
                <label class="radio-inline"><input type="radio" v-model="detail.user_type" :value="1">后付费</label>
              </div>
            </div>

            <!--后付费用户权限-->
            <div v-show="detail.user_type===1">
              <hr>
              <div class="form-group">
                <label class="col-sm-3 control-label">
                  小时券限制
                   </label>
                <div class="col-sm-9">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="detail.hour_limit" value="500"/>
                    <span class="input-group-addon">小时</span>
                  </div>
                  <p class="help-block">最大可透支的小时数(0为不限制)  最大不超过30000</p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">金额券限制</label>
                <div class="col-sm-9">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="detail.money_limit" value="500">
                    <span class="input-group-addon">元</span>
                  </div>
                  <p class="help-block">最大可透支的金额(0为不限制)  最大不超过30000</p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">
                  次数券限制
                   </label>
                <div class="col-sm-9">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="detail.num_limit" value="500">
                    <span class="input-group-addon">次</span>
                  </div>
                  <p class="help-block">最大可透支的次数(0为不限制)  最大不超过30000</p>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">
                </label>
                <div class="col-sm-9">
                </div>
              </div>
            </div>
            <!--后付费用户权限-->

            <hr/>


            <div class="form-group">
              <label class="col-sm-3 control-label">时间段券权限</label>
              <div class="col-sm-9">
                <label class="radio-inline">
                  <input type="radio" :value="0" v-model="detail.continue_coupon">可用
								</label>
                <label class="radio-inline">
                  <input type="radio" :value="1" v-model="detail.continue_coupon">禁用
								</label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">次数券权限</label>
              <div class="col-sm-9">
                <label class="radio-inline">
                  <input type="radio" :value="0" v-model="detail.num_coupon"> 可用
								</label>
                <label class="radio-inline">
                  <input type="radio" :value="1" v-model="detail.num_coupon"> 禁用
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
            <div class="form-group" :class="{'has-error':errors.has('phone') }">
              <label class="col-sm-3 control-label">电话</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-validate="'mobile'" data-vv-name="phone" data-vv-as="电话"
                       v-model.trim="detail.phone"/>
                <span class="help-block" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
              </div>
            </div>
            <div class="form-group" :class="{'has-error':errors.has('address') }">
              <label class="col-sm-3 control-label">商户地址</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-validate="'max:30'" data-vv-name="address" data-vv-as="商户地址"
                       v-model.trim="detail.address" value="">
                <span class="help-block" v-show="errors.has('address')">{{ errors.first('address') }}</span>
              </div>
            </div>
            <div class="form-group" :class="{'has-error':errors.has('memo') }">
              <label class="col-sm-3 control-label">备注</label>
              <div class="col-sm-9">
                <textarea class="form-control" rows="4" v-validate="'max:200'" data-vv-name="memo" data-vv-as="备注信息" v-model.trim="detail.memo"></textarea>
                <span class="help-block" v-show="errors.has('memo')">{{ errors.first('memo') }}</span>
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
    methods: {
      saveOrUpdateShop(){
        this.$validator.validateAll().then(() => {
          ShopService.saveOrUpdateShop(this.detail).then(res => {
            if (res.status !== 0) {
              layer.msg(res.msg || 'error');
              return;
            }
            this.$router.push({name: 'mall.list'});
          });
        }).catch(() => {

        });
      }
    },
    data(){
      return {
        detail: {
          user_type: 0,
          continue_coupon: 1,
          num_coupon: 1,
          origin_limit: 0,
          hour_limit: 0,
          money_limit: 0,
          num_limit: 0,
        }
      }
    }
  }
</script>
