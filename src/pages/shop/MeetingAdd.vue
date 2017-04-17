<template>
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">{{isEdit ? '编辑' : '创建新的'}}会议</div>
      </div>

      <div class="panel-body row">
        <div class="form-horizontal col-lg-7">
          <div class="form-group" :class="{'has-error':errors.has('title') }">
            <label class="col-sm-3 control-label">标题(*)</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-validate="'required|max:15'" data-vv-name="title" data-vv-as="标题" v-model="detail.title"/>
              <span class="help-block" v-show="errors.has('title')">{{ errors.first('title') }}</span>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('address') }">
            <label class="col-sm-3 control-label">地址(*)</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-validate="'required|max:15'" data-vv-name="address" data-vv-as="地址" v-model="detail.address"/>
              <span class="help-block" v-show="errors.has('address')">{{ errors.first('address') }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">活动时间(*)</label>
            <div class="col-sm-9">
              <div class="input-group">
                <date-time-picker :icon="false" :style="{'input-sm':false}" v-model="detail.stime"></date-time-picker>
                <span class="input-group-addon">to</span>
                <date-time-picker :icon="false" :style="{'input-sm':false}" v-model="detail.etime"></date-time-picker>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">优惠券有效期(*)</label>
            <div class="col-sm-9">
              <div class="input-daterange input-group">
                <date-time-picker :icon="false" :style="{'input-sm':false}" v-model="detail.validbtime"></date-time-picker>
                <span class="input-group-addon">to</span>
                <date-time-picker :icon="false" :style="{'input-sm':false}" v-model="detail.validetime"></date-time-picker>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">类型(*)</label>
            <div class="col-sm-9">
              <select class="form-control" v-model="detail.coupon_type">
                <option value="3">时间段优惠券</option>
              </select>
            </div>
          </div>
          <div class="form-group" :class="{'has-error':errors.has('climit') }">
            <label class="col-sm-3 control-label">总数量(*)</label>
            <div class="col-sm-9">
              <!--todo 原本为 count  上线后需要修改一下 为climit-->
              <input type="text" class="form-control" v-validate="'required|numeric'" data-vv-name="climit" data-vv-as="总数量" v-model.number="detail.climit">
              <span class="help-block" v-show="errors.has('climit')">{{ errors.first('climit') }}</span>
            </div>
          </div>

          <div class="form-group" :class="{'has-error':errors.has('content') }">
            <label class="col-sm-3 control-label">内容简介(*)</label>
            <div class="col-sm-9">
                <textarea class="form-control" rows="4" v-model="detail.content" v-validate="'required|max:200'" data-vv-name="content" data-vv-as="内容简介"></textarea>
              <span class="help-block" v-show="errors.has('content')">{{ errors.first('content') }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label"></label>
            <div class="col-sm-9">
              <button class="btn" type="button" @click="otherInfo=!otherInfo">选填内容 (点击展开)</button>
            </div>
          </div>
          <div v-show="otherInfo">
            <div class="form-group" :class="{'has-error':errors.has('clt_name') }">
              <label class="col-sm-3 control-label">办会人姓名</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="detail.clt_name" v-validate="'max:5'"
                       data-vv-name="clt_name" data-vv-as="办会人姓名">
                <span class="help-block" v-show="errors.has('clt_name')">{{ errors.first('clt_name') }}</span>
              </div>
            </div>
            <div class="form-group" :class="{'has-error':errors.has('clt_phone') }">
              <label class="col-sm-3 control-label">电话</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" v-model="detail.clt_phone" v-validate="'mobile'"
                       data-vv-name="clt_phone" data-vv-as="电话">
                <span class="help-block" v-show="errors.has('clt_phone')">{{ errors.first('clt_phone') }}</span>
              </div>
            </div>

            <div class="form-group" :class="{'has-error':errors.has('memo') }">
              <label class="col-sm-3 control-label">备注</label>
              <div class="col-sm-9">
                <textarea class="form-control" rows="4" v-model="detail.memo" v-validate="'max:200'" data-vv-name="memo" data-vv-as="备注"></textarea>
                <span class="help-block" v-show="errors.has('memo')">{{ errors.first('memo') }}</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-9 col-sm-offset-3">
              <button v-if="isEdit" type="button" class="btn btn-primary" @click="save">修改会议</button>
              <button v-else type="button" class="btn btn-primary" @click="save">添加会议</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Validator} from 'vee-validate';

  import {saveOrUpdateMeeting, getMeetingDetail} from '../../api/shop';
  import layer from 'layui-layer';

  export default {
    created(){
      this.$route.query.id && (this.isEdit = true) && this.getMeetingDetail(this.$route.query.id);
    },
    methods: {
      //获取会议详情
      getMeetingDetail(id){
        let vm = this;
        getMeetingDetail({id: id}).then(res => {
          vm.detail = Object.assign({}, vm.detail, res.data);
          vm.isOpenOtherInfo();
        });
      },
      //保存
      save(){
        this.$validator.validateAll().then(() => {
          saveOrUpdateMeeting(this.detail).then(res => {
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
      //是否含有扩展信息，并展示
      isOpenOtherInfo(){
        this.otherInfo = (this.detail.clt_name || this.detail.content || this.detail.memo || this.detail.clt_phone);
      }
    },
    data () {
      return {
        otherInfo: false,
        isEdit: false,
        detail: {
          coupon_type: 3,
        }
      }
    }
  }
</script>
