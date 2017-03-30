<template>
  <div>123</div>
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
      return {}
    }
  }
</script>
