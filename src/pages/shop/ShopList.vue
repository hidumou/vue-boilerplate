<template>
  <div class="container dashboard">
    <div class="row">
      <div class="alert alert-green">
        商户列表<router-link class="btn btn-primary btn-sm" tag="a" :to="{ name: 'mall.add'}">添加商户</router-link>
      </div>

      <!--数据列表-->
      <div class="list shop-list">
        <table class="table table-center table-parking">
          <colgroup>
            <col width="192">
            <col width="104">
            <col width="152">
            <col width="256">
            <col width="104">
            <col width="216">
            <col width="360">
          </colgroup>
          <tbody>
          <tr>
            <th>商户名</th>
            <th>类型</th>
            <th>联系电话</th>
            <th>地址</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>

          <tr v-for="(shop,key) in list">
            <td>
              <router-link :to="{ name: 'mall.detail',params:{id:shop.id}}" v-text="shop.name"></router-link>
            </td>
            <td class="user-type">
              <span class="btn btn-xs btn-success" :class="{'btn-info':shop.user_type===1}"
                    v-text="userPayType[shop.user_type].val"></span>
            </td>
            <td v-text="shop.phone || '--' "></td>
            <td v-text="shop.address || '--'" class="address"></td>
            <td>
              <span class="label label-success" :class="{'label-info':shop.status===1}"
                    v-text="userState[shop.status].val"></span>
            </td>
            <td>{{shop.ctime | formatDate}}</td>
            <td class="btns">
              <router-link :to="{ name: 'mall.detail',params:{id:shop.id},query:{isEdit:true}}"><span
                class="btn btn-xs btn-info">编辑</span></router-link>
              <span class="btn btn-xs btn-danger" :class="{'btn-success':shop.status===1}"
                    v-text="shop.status !==1 ? '冻结':'激活'" @click="updateShopStatus(shop)"></span>
              <span class="btn btn-xs btn-warning">充值</span>
              <span class="btn btn-xs btn-success" @click="removeShop(shop,key)">删除</span>
            </td>
          </tr>

          </tbody>
        </table>
      </div>

      <!--分页-->
      <pager :total="result && result.tn" :page-size="pager.pageSize"></pager>

    </div>
  </div>
</template>
<script>
  import "../../assets/style/shop.scss";

  import {mapState, mapActions, mapGetters} from 'vuex';
  import {UPDATE_SHOP,DELETE_SHOP} from '../../stores/mutation-types';
  import layer from 'layui-layer';
  import {saveOrUpdateShop} from '../../api/shop';

  export default {
    created(){
      this.$store.dispatch('getShopList');
    },
    computed: {
      ...mapGetters({
        list: 'shops',
        result: 'res'
      }),
      ...mapState({
        pager: 'pager',
        userState: 'accountState',
        userPayType: 'userPayType',
      }),
    },
    methods: {
      ...mapActions(['nextPage']),

      removeShop(shop,idx){
        const self = this;
        layer.confirm('确定删除该商户吗？', {
          yes: function (index) {
            const data = Object.assign({}, shop, {
              status: 2
            });
            saveOrUpdateShop(data).then(res => {
              if (res.status !== 0) {
                layer.msg(res.msg || 'error');
                return;
              }
              self.$store.commit(DELETE_SHOP, idx);
              self.$store.dispatch('getShopList');
              layer.close(index);
            });
          }
        });
      },

      updateShopStatus(shop){
        const self = this;
        layer.confirm(`确定${shop.status === 1 ? '激活' : '冻结'}该商户吗？`, {
          yes: function (index) {
            const data = Object.assign({}, shop, {
              status: (shop.status === 1 ? 0 : 1)
            });
            saveOrUpdateShop(data).then(res => {
              if (res.status !== 0) {
                layer.msg(res.msg || 'error');
                return;
              }
              self.$store.commit(UPDATE_SHOP, data);
              layer.close(index);
            });
          }
        });
      }
    },
    data () {
      return {
        msg: 'RoleList'
      }
    }
  }
</script>
