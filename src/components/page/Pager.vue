<template>

  <ul class="pagination pull-right" style="margin: 0;" v-if="total!==0">

    <li @click="prev" :class="prevClasses"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>

    <li title="1" :class="firstPageClasses" @click="changePage(1)"><a>1</a></li>
    <li v-if="currentPage - 3 > 1"><a>...</a></li>
    <li v-if="currentPage - 2 > 1" @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
    <li v-if="currentPage - 1 > 1" @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
    <li v-if="currentPage !== 1 && currentPage !== allPages" class="active"><a>{{ currentPage }}</a></li>
    <li v-if="currentPage + 1 < allPages" @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
    <li v-if="currentPage + 2 < allPages" @click="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
    <li v-if="currentPage + 3 < allPages"><a>...</a></li>
    <li v-if="allPages > 1" @click="changePage(allPages)" :class="lastPageClasses"><a>{{ allPages }}</a></li>

    <li @click="next" :class="nextClasses"><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>

  </ul>

</template>
<style>
  .pagination>li>a, .pagination>li>span{
    cursor: pointer;
  }
</style>
<script>
  export default {
    name: 'pager',
    props: {
      current: {//当前页
        type: Number,
        default: 1
      },
      total: {//总页数
        type: Number,
        default: 0
      },
      pageSize: {//分页大小
        type: Number,
        default: 10
      },
      viewed:{//可见页码数字 ，后续扩展
        type: Number,
        default: 5
      }
    },
    watch: {
      current (val) {
        this.currentPage = val;
      },
      pageSize (val) {
        this.currentPageSize = val;
      }
    },
    methods: {
      changePage (page) {
        if (this.currentPage !== page) {
          this.currentPage = page;
          this.$emit('on-change', page);
        }
      },
      prev () {
        const current = this.currentPage;
        if (current <= 1) {
          return false;
        }
        this.changePage(current - 1);
      },
      next () {
        const current = this.currentPage;
        if (current >= this.allPages) {
          return false;
        }
        this.changePage(current + 1);
      },
    },
    computed: {
      //总页数
      allPages () {
        const allPage = Math.ceil(this.total / this.currentPageSize);
        return (allPage === 0) ? 1 : allPage;
      },
      //前一页
      prevClasses () {
        return [
          {
            ['disabled']: this.currentPage === 1
          }
        ];
      },
      //下一页
      nextClasses () {
        return [
          {
            ['disabled']: this.currentPage === this.allPages
          }
        ];
      },
      //第一页
      firstPageClasses(){
        return [
          {
            ['active']: this.currentPage === 1
          }
        ];
      },
      //最后一页
      lastPageClasses () {
        return [
          {
            ['active']: this.currentPage === this.allPages
          }
        ];
      },

    },
    data () {
      return {
        currentPage: this.current,
        currentPageSize: this.pageSize
      }
    }
  }
</script>
