<template>
  <Table :columns="tableColumns" :data="tableData"></Table>
</template>
<script>

  import '../assets/style/home.scss';

  import {mapGetters,mapActions} from 'vuex';

  export default {
    created(){
      this.$store.dispatch('getHomeListData');
    },
    computed: mapGetters({
      tableData: 'tableData'
    }),
    data () {
      return {
        tableColumns: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '头像',
            key: 'avatar',
            render (row, column, index) {
                return `<img class="ivu-table-img" src="${row.avatar}" />`;
            }
          },
          {
            title: '简介',
            key: 'content',
            className: 'ivu-table-cell-text'
          },
          {
            title: '标签',
            key: 'tag',
            render (row, column, index) {
              if(row.tag && row.tag.length){
                return row.tag.map(function (item) {
                  return `<Tag>${item}</Tag>`
                });
              }
              return '';
            }
          }
        ]
      }
    }
  }
</script>
