<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from './views/HomeHeaderView.vue'

export default{
  data(){
        return{
          
        }
  },
  components:{
    RouterView,
    HomeHeaderView
  },
}
</script>

<template>
    <RouterView />
</template>

<style lang="scss" scoped>

</style>
