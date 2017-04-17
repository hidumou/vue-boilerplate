<template>
  <div class="container">
    <div class="alert alert-green">优惠券充值</div>
    <div class="row">
      <div class="col-md-3">
        <div class="panel panel-gray">
          <div class="panel-heading">请选择商户</div>
          <div class="panel-body">
            <div class="list-group list-group-gray hover" style="margin: 0;">
              <div class="list-group-item" :class="[coupon.shop_id === shop.id ? 'active':'']" v-for="shop in shops"
                   v-text="shop.name" @click="selectShop(shop)"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <!--预定义 自定义 切换头-->
        <ul class="nav nav-tabs col-md-12">
          <li v-for="(item,key) in couponExtendsType" :class="[coupon.ex_type == key ? 'active' :'']">
            <a v-text="item.val" style="cursor: pointer;" @click="changeCouponExType(key)"></a>
          </li>
        </ul>

        <div class="tab-content col-md-12">

          <!--自定义-->
          <div class="tab-pane active" v-if="coupon.ex_type === 1">
            <div class="form-horizontal row">

              <div class="bs-callout bs-callout-danger">
                <h5>自定义充值 只能充值余额 商户将自行分割成具体的优惠券，下发后有效期继承自商场设置的优惠券有效期</h5>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">类型</label>
                <div class="col-sm-10">
                  <label class="radio-inline"><input type="radio" :value="0" v-model="coupon.type">时长</label>
                  <label class="radio-inline"><input type="radio" :value="1" v-model="coupon.type">金额</label>
                  <label class="radio-inline"><input type="radio" :value="2" v-model="coupon.type">次数</label>
                </div>
              </div>

              <div class="form-group" :class="{'has-error':errors.has('count') }">
                <label class="col-sm-2 control-label">充值总额(*)</label>
                <div class="col-sm-10">
                  <div class="input-group" v-if="coupon.type===0">
                    <input type="text" class="form-control" v-validate="'required|numeric|between:1,100000'"
                           data-vv-name="count" data-vv-as="小时" v-model.number="coupon.count">
                    <span class="input-group-addon">时</span>
                  </div>
                  <div class="input-group" v-if="coupon.type===1">
                    <input type="text" class="form-control" v-validate="'required|numeric|between:1,100000'"
                           data-vv-name="count" data-vv-as="金额" v-model.number="coupon.count">
                    <span class="input-group-addon">元</span>
                  </div>
                  <div class="input-group" v-if="coupon.type===2">
                    <input type="text" class="form-control" v-validate="'required|numeric|between:1,100000'"
                           data-vv-name="count" data-vv-as="次数" v-model.number="coupon.count">
                    <span class="input-group-addon">次</span>
                  </div>
                  <span class="help-block" v-show="errors.has('count')">充值总额必须为数字,且大于0小于100000</span>
                </div>
              </div>

              <!--选填-->
              <hr>
              <div class="form-group"><label class="col-sm-2 control-label">选填</label></div>
              <div class="form-group" :class="{'has-error':errors.has('memo') }">
                <label class="col-sm-2 control-label">备注</label>
                <div class="col-sm-10">
                  <textarea rows="3" v-validate="'max:200'" data-vv-name="memo" data-vv-as="备注信息" v-model="coupon.memo"
                            class="form-control"></textarea>
                  <span class="help-block" v-show="errors.has('memo')">{{ errors.first('memo') }}</span>
                </div>
              </div>

              <!--提交-->
              <div class="form-group">
                <div class="col-sm-2 col-sm-offset-2">
                  <button class="btn btn-block btn-success" @click="recharge">立刻充值</button>
                </div>
                <div class="col-sm-2">
                  <!--<button class="btn btn-block">重置</button>-->
                </div>
              </div>
            </div>
          </div>

          <!--预定义-->
          <div class="tab-pane active" v-if="coupon.ex_type === 2">

            <div class="form-horizontal row">

              <div class="form-group">
                <label class="col-sm-2 control-label">类型</label>
                <div class="col-sm-10">
                  <label class="radio-inline"><input type="radio" :value="0" v-model="coupon.type">时长</label>
                  <label class="radio-inline"><input type="radio" :value="1" v-model="coupon.type">金额</label>
                  <label class="radio-inline"><input type="radio" :value="2" v-model="coupon.type">次数</label>
                </div>
              </div>

              <div class="form-group" :class="{'has-error':errors.has('face_value') }">
                <label class="col-sm-2 control-label">单张面额</label>
                <div class="col-sm-10">
                  <div class="input-group" v-if="coupon.type===0">
                    <input type="text" class="form-control" v-validate="'required|numeric|between:1,100000'"
                           data-vv-name="face_value" v-model.number="coupon.face_value">
                    <span class="input-group-addon">时</span>
                  </div>
                  <div class="input-group" v-if="coupon.type===1">
                    <input type="text" class="form-control" v-validate="'required|numeric|between:1,100000'"
                           data-vv-name="face_value" v-model.number="coupon.face_value">
                    <span class="input-group-addon">元</span>
                  </div>
                  <div class="input-group" v-if="coupon.type===2">
                    <input type="text" class="form-control" v-validate="'required|numeric|between:1,100000'"
                           data-vv-name="face_value" v-model.number="coupon.face_value">
                    <span class="input-group-addon">次</span>
                  </div>
                  <span class="help-block" v-show="errors.has('face_value')">面额数值必须为数字，且大于0小于100000</span>
                </div>
              </div>

              <div class="form-group" :class="{'has-error':errors.has('count2') }">
                <label class="col-sm-2 control-label">张数</label>
                <div class="col-sm-10">
                  <div class="input-group">
                    <input type="text" class="form-control" v-validate="'required|numeric|between:1,100000'"
                           data-vv-name="count2"
                           data-vv-as="张数" v-model.number="coupon.count">
                    <span class="input-group-addon">张</span>
                  </div>
                  <span class="help-block" v-show="errors.has('count2')">张数必须为数字，且大于0小于100000</span>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">下发后有效期</label>
                <div class="col-sm-10">
                  <label class="radio-inline"><input type="radio" v-model.number="validTimeType" :value="1">小时</label>
                  <label class="radio-inline"><input type="radio" v-model.number="validTimeType" :value="2">时间段</label>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-10 col-sm-offset-2" v-show="validTimeType===1">
                  <div class="input-group">
                    <input type="text" class="form-control"  v-validate="'required|numeric|between:1,100000'" data-vv-name="lifetime" data-vv-as="小时" v-model.number="coupon.lifetime">
                    <span class="input-group-addon">小时</span>
                  </div>
                  <p :class="{'text-danger':errors.has('lifetime')}" v-show="errors.has('lifetime')">小时必须为数字，且大于0小于100000</p>
                </div>

                <div class="col-sm-10 col-sm-offset-2" v-show="validTimeType===2">
                  <div class="input-group">
                    <date-time-picker v-model="coupon.stime" :icon="false" :options="{format:'HH:mm'}"></date-time-picker>
                    <span class="input-group-addon">-</span>
                    <date-time-picker v-model="coupon.etime" :icon="false" :options="{format:'HH:mm'}"></date-time-picker>
                  </div>
                </div>

              </div>

              <div class="col-sm-offset-2">
                <p><code>小时: 下发后开始计时 超过指定小时失效</code></p>
                <p><code>时间段: 下发后只能在指定时间段有效 其余时间无效 允许跨天(例如 22:00-02:00 当天晚上10点至次日凌晨2点)</code></p>
              </div>
              <hr>
              <div class="form-group">
                <label class="col-sm-2 control-label">选填</label>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">下发前有效期</label>
                <div class="col-sm-10">
                  <div class="input-group">
                    <date-time-picker v-model="coupon.validbtime" :icon="false"></date-time-picker>
                    <span class="input-group-addon">-</span>
                    <date-time-picker v-model="coupon.validetime" :icon="false"></date-time-picker>
                  </div>
                  <p class="help-block">
                    <small>超过此时间段将失效，无法下发给用户 留空将不限制</small>
                  </p>
                </div>
              </div>

              <div class="form-group" :class="{'has-error':errors.has('memo') }">
                <label class="col-sm-2 control-label">备注</label>
                <div class="col-sm-10">
                  <textarea rows="3" v-model="coupon.memo" v-validate="'max:200'" data-vv-name="memo" data-vv-as="备注"
                            class="form-control"></textarea>
                  <span class="help-block" v-show="errors.has('memo')">{{ errors.first('memo') }}</span>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-2 col-sm-offset-2">
                  <button class="btn btn-block btn-success" @click="recharge">立刻充值</button>
                </div>
                <div class="col-sm-2">
                  <!--<button class="btn btn-block">重置</button>-->
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

  import {mapState, mapActions, mapGetters} from 'vuex';
  import * as types from '../../stores/mutation-types';
  import {couponRecharge} from '../../api/shop';
  import layer from 'layui-layer';

  export default {

    created(){
      this.$store.dispatch('getShopList', {page: 1, per_page: 200});
    },

    methods: {
      //选择商户
      selectShop(shop){
        this.coupon.shop_id = shop.id;
      },

      //切换优惠券扩展类型
      changeCouponExType(type){
        this.coupon.ex_type = ~~(type);
      },

      //充值
      recharge(){
        let msg;
        if ((msg = this.validParams())) {
          layer.msg(msg);
          return;
        }

        this.$validator.validateAll().then(() => {
          couponRecharge(this.paramsProcess()).then(res => {
            if (res.status !== 0) {
              layer.msg(res.msg || 'error');
              return;
            }
            this.$router.push({name: 'mall.meeting.list'});
          });
        }).catch(() => {
//          layer.msg('信息输入有误！');
        });


      },


      //参数处理
      paramsProcess(){
        let coupon = Object.assign({}, this.coupon);
        if (coupon.ex_type === 1) {
          if (coupon.type === 0) {
            coupon.count = coupon.count * 60;
          } else if (coupon.type === 1) {
            coupon.count = coupon.count * 10;
          }
        } else if (coupon.ex_type === 2) {
          if (this.coupon.type === 0) {
            coupon.face_value = coupon.face_value * 60;
          } else if (coupon.type === 1) {
            coupon.face_value = coupon.face_value * 10;
          }
          coupon.lifetime = coupon.lifetime * 60;
        }
        return coupon;
      },

      //校验
      validParams(){
        let msg;
        if (!this.coupon.shop_id) msg = '请选择商户！';

        return msg;
      }

    },

    computed: {
      ...mapGetters({
        shops: 'shops',//商户列表
      }),

      ...mapState({
        couponType: 'couponType',
        couponExtendsType: 'couponExtendsType',
      }),
    },

    watch: {
      'coupon.ex_type'(){
        this.$validator.errorBag.clear();
      }
    },

    data () {

      return {
        validTimeType: 1,//下发后有效期类型
        coupon: {
          shop_id: '',
          type: 0,
          ex_type: 1,
          count: 1,
          face_value: 1,
          lifetime: 1,
        }
      }
    }
  }

</script>
