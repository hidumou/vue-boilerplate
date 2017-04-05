<template>
  <div>
    <iran-header></iran-header>

    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>

    <iran-footer></iran-footer>
  </div>
</template>
<script>
  import '../assets/style/common.scss';

  import Header from './common/Header.vue';
  import Footer from './common/Footer.vue';

  export default {
    components:{
        iranHeader:Header,
        iranFooter:Footer,
    }
  }
</script>
