<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'

export default{
  data(){
        return{
          
        }
  },
  methods:{

  },
  components:{
    HomeHeaderView
  },
}
</script>

<template>
      <HomeHeaderView  class="HomeHeaderViewClass" />
  <div class="bootstrapAd">
    <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="../../picture/ad/sky.jpg" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h1>浪漫遨遊~天空比鄰</h1>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
        </div>
        <div class="carousel-item">
            <img src="../../picture/ad/flash.jpg" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
                <h1>玩水世界~驚喜冒險~</h1>
                <p>Some representative placeholder content for the first slide.</p>
            </div>
        </div>
        <div class="carousel-item">
          <img src="../../picture/ad/roller.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
                <h1>一飛衝天!突破天際!</h1>
                <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev change" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next change" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.HomeHeaderViewClass{
  position: fixed;
  z-index: 2;
}
h1{
  width: 100%;
  background-color: rgb(26, 26, 172);
}
p{
  width: 100%;
  background-color: rgb(26, 26, 172);
}
.change{
  width: 5vh;
  height: 10vh;
  border-radius: 10px;
  background-color: rgba(80, 80, 80, 0.6);
  margin: 0 5vw;
  margin-top: 50vh;
}


</style>