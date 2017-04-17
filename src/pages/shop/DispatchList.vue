<template>
  <div class="container dashboard">
    <ul class="row list-group">
      <li class="list-group-item">
        <!--搜索条件-->
        <div class="row">
          <div class="col-md-2">
            <label class="control-label">商户：</label>
            <select class="form-control input-sm" v-model="searchParam.shop_id">
              <option value="">全部商户</option>
              <option :value="shop.id" v-for="shop in shops" v-text="shop.name"></option>
            </select>
          </div>

          <div class="col-md-2">
            <label>优惠券类型：</label>
            <select class="form-control input-sm" v-model.number="searchParam.type">
              <option value="">全部</option>
              <option v-for="(item,key) in couponType" :value="key" v-text="item.val"></option>
            </select>
          </div>

          <div class="col-md-2">
            <label>优惠券扩展类型：</label>
            <select class="form-control input-sm" v-model.number="searchParam.ex_type">
              <option value="">全部</option>
              <option v-for="(item,key) in couponExtendsType" :value="key" v-text="item.val"></option>
            </select>
          </div>

          <div class="col-md-2">
            <label>开始时间：</label>
            <date-time-picker v-model="searchParam.stime"></date-time-picker>
          </div>

          <div class="col-md-2">
            <label>结束时间：</label>
            <date-time-picker v-model="searchParam.etime"></date-time-picker>
          </div>

          <div class="col-md-2">
            <label>车牌号：</label>
            <input type="text" placeholder="车牌号" class="form-control input-sm" v-model.trim="searchParam.vpl"/>
          </div>

        </div>
        <!--搜索按钮-->
        <div class="row">
          <div class="col-md-2 col-md-offset-4">
            <button class="btn btn-default btn-sm btn-block" @click="search(1)">
              <span class="glyphicon glyphicon-search"></span>
              <span>查询</span>
            </button>
          </div>
          <div class="col-md-2">
            <button class="btn btn-success btn-sm btn-block">导出Excel</button>
          </div>
        </div>

      </li>
    </ul>

    <div class="row">
      <div class="alert alert-green">发放记录</div>

      <!--数据列表-->
      <div class="list shop-list">
        <table class="table table-center table-parking">
          <colgroup>
            <col width="100">
            <col width="200">
            <col width="150">
            <col width="200">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
            <col width="100">
          </colgroup>
          <tbody>
          <tr>
            <th>状态</th>
            <th>商户</th>
            <th>车牌</th>
            <th>发放时间</th>
            <th>类别</th>
            <th>类型</th>
            <th>面额</th>
            <th>备注1</th>
            <th>备注2</th>
            <th>备注3</th>
          </tr>
          <tr v-if="list && list.length" v-for="(item,key) in list">
            <td>
              <span class="label" :class="getCouponStatus(item.status).className"
                    v-text="getCouponStatus(item.status).text"></span>
            </td>
            <td>{{item.shop}}</td>
            <td>{{item.vpl}}</td>
            <td>{{item.ctime | formatDate}}</td>
            <td v-text="couponType[item.type].val"></td>
            <td><span class="btn btn-xs"
                      :class="'btn-' + couponExtendsType[item.ex_type].classNameForDispatch">{{couponExtendsType[item.ex_type].val}}</span>
            </td>
            <td>{{item.face_value | faceUnitConvert(item.face_value, item.type, item.ex_type)}}</td>
            <td>{{item.memo1}}</td>
            <td>{{item.memo2}}</td>
            <td>{{item.memo3}}</td>
          </tr>
          <tr v-if="list && list.length === 0">
            <td colspan="10">
              <div class="alert alert-info text-center" role="alert">没有记录</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!--分页-->
      <pager :total="res && res.tn" :current="searchParam.page" :page-size="pager.pageSize" @on-change="search"></pager>

    </div>
  </div>
</template>
<script>
  import "../../assets/style/shop.scss";

  import {mapState, mapActions, mapGetters} from 'vuex';
  import * as types from '../../stores/mutation-types';

  export default {
    created(){
      this.$store.dispatch('getShopList', {page: 1, per_page: 200});
      this.setSearchParam().search();
    },

    computed: {
      ...mapGetters({
        list: 'dispatchRecordData',//数据列表
        shops: 'shops',//商户列表
        res: 'dispatchRecordRes'//响应数据
      }),

      ...mapState({
        pager: 'pager',
        couponStatus: 'couponStatus',
        couponType: 'couponType',
        couponExtendsType: 'couponExtendsType',
      }),
    },

    watch: {
      '$route'(){
        this.setSearchParam().getData();
      }
    },
    methods: {

      //获取优惠券状态
      getCouponStatus(status){
        return (this.couponStatus[status] && this.couponStatus[status]);
      },

      //设置搜索参数
      setSearchParam(){
        this.searchParam = Object.assign({}, this.searchParam, {
          shop_id: this.$route.query.shop_id || '',
          type: this.$route.query.type || '',
          ex_type: this.$route.query.ex_type || '',
          vpl: this.$route.query.vpl || '',
          page: ~~(this.$route.query.page || 1),
//          stime: this.$route.query.stime || '' ,//|| moment().unix(),
//          etime: this.$route.query.etime || '' //|| moment().unix()
        });

        return this;
      },

      //获取数据
      getData(){
        this.setSearchParam();
        let searchParam = Object.assign({}, this.searchParam);

        //时间换算
        searchParam.stime && (searchParam.stime = moment(searchParam.stime).unix());
        searchParam.etime && (searchParam.etime = moment(searchParam.etime).unix());

        //删除无用字段
        Object.keys(searchParam).forEach(function (key) {
          if (searchParam[key] === '') delete searchParam[key];
        });

        this.$store.dispatch('getDispatchRecordList', Object.assign({}, {
          per_page: this.pager.pageSize
        }, searchParam));

      },

      //搜索
      search(page){
        page && (this.searchParam.page = page);
        this.$router.push({name: 'mall.dispatch', query: Object.assign({}, this.searchParam)});
        this.getData();
      },
    },

    data () {
      return {
        //搜索条件
        searchParam: {
          shop_id: '',
          type: '',
          ex_type: '',
          vpl: '',
          page: 1
        }
      }
    }
  }
</script>
