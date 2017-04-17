<template>
  <div class="container">
    <div class="panel panel-default m-t">
      <div class="panel-heading">
        <div class="panel-title">设置</div>
      </div>
      <div class="panel-body">
        <div class="form-horizontal" style="max-width:720px;">
          <div class="form-group">
            <label class="col-sm-3 control-label">名称 / 编号</label>
            <div class="col-sm-9">
              <p class="form-control-static">
                <span v-text="user.name"></span>
                <code v-text="user.id"></code>
              </p>
            </div>
          </div>

          <div class="form-group" :class="{'has-error':errors.has('email') }">
            <label class="col-sm-3 control-label">Email</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-validate="'email'" data-vv-name="email" data-vv-as="Email"
                     v-model="user.email">
              <span class="help-block" v-show="errors.has('email')">{{ errors.first('email') }}</span>
            </div>
          </div>

          <div class="form-group" :class="{'has-error':errors.has('phone') }">
            <label class="col-sm-3 control-label">电话</label>
            <div class="col-sm-9">
              <input type="text" class="form-control" v-validate="'mobile'" data-vv-name="phone" data-vv-as="电话号码"
                     v-model="user.phone">
              <span class="help-block" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
            </div>
          </div>

          <div class="form-group" :class="{'has-error':errors.has('valid_period') }">
            <label class="col-sm-3 control-label">优惠券有效期</label>
            <div class="col-sm-9">
              <div class="input-group">
                <input type="text" class="form-control" v-validate="'numeric'" data-vv-name="valid_period" data-vv-as="优惠券有效期" v-model.number="user.valid_period">
                <span class="input-group-addon">小时</span>
              </div>
              <code>正整数0为不限制</code>
              <span class="help-block" v-show="errors.has('valid_period')">{{ errors.first('valid_period') }}</span>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-3"></div>
            <div class="col-sm-9">
              <button @click="submit" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> 提交</button>
            </div>
          </div>
          <hr>
          <div class="form-group">
            <label class="col-sm-3 control-label"></label>
            <div class="col-sm-9">
              <p class="help-block">安全选项</p>
              <button data-toggle="modal" data-target="#modify-info" type="button" class="btn btn-danger">
                <span class="glyphicon glyphicon-lock"></span>
                <span>修改密码</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modify-info" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
      <div class="modal-dialog " role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">修改密码</h4></div>
          <div class="modal-body">
            <div class="bootbox-body">
              <div class="row">
                <form class="form-horizontal">
                  <div class="form-group" :class="{'has-error':errors.has('old_password') }">
                    <label class="col-md-4 control-label">您的旧密码</label>
                    <div class="col-md-6">
                      <input class="form-control" type="password" placeholder="您的旧密码" v-validate="'max:20'" data-vv-name="old_password" data-vv-as="旧密码"  v-model="user.old_password">
                      <span class="help-block" v-show="errors.has('old_password')">{{ errors.first('old_password') }}</span>
                    </div>
                  </div>
                  <div class="form-group" :class="{'has-error':errors.has('new_password')}">
                    <label class="col-md-4 control-label">新密码</label>
                    <div class="col-md-6">
                      <input class="form-control" type="password" name="pwd" data-vv-as="新密码" placeholder="新密码">
                    </div>
                  </div>
                  <div class="form-group" :class="{'has-error':errors.has('new_password')}">
                    <label class="col-md-4 control-label">再输入一次新密码</label>
                    <div class="col-md-6">
                      <input type="password" placeholder="再输入一次新密码" v-model="user.new_password" v-validate="'confirmed:pwd|max:20'" data-vv-name="new_password" data-vv-as="确认密码"  class="form-control">
                      <span class="help-block" v-show="errors.has('new_password')">两次密码输入不一致</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="submit">更改密码</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {getUser, getUserInfo, editUserInfo} from '../../api/user';
  import layer from 'layui-layer';

  export default {
    created(){
      getUserInfo().then(res => {
        this.user = res.data;
      });
    },
    methods: {
      submit(){
        this.$validator.validateAll().then(() => {
          editUserInfo(this.user).then(res => {
            if (res.status !== 0) {
              layer.msg(res.msg || 'error');
              return;
            }
            layer.msg('修改成功！');
            location.reload();
          });
        }).catch(() => {});
      }
    },
    data () {
      return {
        user: {}
      }
    }
  }
</script>
