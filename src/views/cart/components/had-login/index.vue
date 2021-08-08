<template>
  <section class="had_login_container">
    <van-empty description="您当前还没有交易订单喔～" />
  </section>
</template>
<script lang="ts" >
import { defineComponent } from 'vue';
import { Empty } from 'vant';
export default defineComponent({
  name: 'HadLogin',
  components: {
    [Empty.name]: Empty,
  },
});
</script>
<style lang="scss" scoped >
</style>
