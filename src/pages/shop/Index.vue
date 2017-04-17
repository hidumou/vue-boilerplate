<template>
  <div>
    <iran-header></iran-header>
    <!--<transition name="slide" mode="out-in">-->
    <transition>
      <router-view></router-view>
    </transition>

    <iran-footer></iran-footer>
  </div>
</template>
<script>
  import '../../assets/style/common.scss';

  import MallHeader from '../common/MallHeader.vue';
  import Footer from '../common/Footer.vue';

  export default {
    components:{
        iranHeader:MallHeader,
        iranFooter:Footer,
    }
  }
</script>
