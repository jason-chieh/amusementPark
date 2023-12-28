<script >
import { RouterLink, RouterView } from 'vue-router'
import Swal from 'sweetalert2'
import HomeHeaderView from '../views/HomeHeaderView.vue'
import ThreeSphereView from "../../src/views/ThreeSphere.vue";

import { mapState, mapActions } from 'pinia'
import parkPinia from '../../src/stores/parkPinia'

export default {
  data() {
    return {
      //讓中間midheader可以跳轉頁面的變數
      page: 1,
      //暫時性可以把卡片v-for出來的陣列
      Arr: [1, 2, 3, 4, 5, 6],
      //抓出已經開放的設施
      publishedFacility: [],

      //選定特定島的設施
      selectIslandFacility: [],

      //登入人的資料
      loginInfo: {},

      //島的名稱
      islandName: "",

      //模糊搜尋綁定的變數
      regxSearchName:"",

      //2d3d地圖切換
      threedmapshow:false,

      //抓出已經開放的設施
      publishedRestaurant: [],

      // 餐廳頁面
      page: 5,
      currentPage: 1,
      pageSize: 3,              // 每頁顯示的餐廳數量
      publishedRestaurant:[]    // 前台餐廳頁面接後端
      // 前台餐廳頁面刻死的
      // publishedRestaurant: [
      //   {
      //     name: "FriBay",
      //     cuisine: "美式餐廳",
      //     photo: "../../picture/restaurant/美式餐廳_FriBay.jpg",
      //     description: "正統的美式餐廳，菜單豐富多樣，包括經典牛排、芝士漢堡、香脆炸雞翅，以及創意十足的美式披薩。「FriBay」位於樂園驚險火山島，提供寬敞明亮的用餐環境和親切的服務，讓您在這裡感受到最地道的美國風味。",
      //   },
      //   {
      //     name: "Trattoria di primo",
      //     cuisine: "義式餐廳",
      //     photo: "../../picture/restaurant/義式餐廳_Trattoria di primo.jpg",
      //     description: "義大利風情的餐廳，可以品嚐到新鮮的義大利麵製品、濃郁的奶酪、美味的海鮮和精心調製的義大利咖啡。用餐環境充滿藝術氛圍，讓您彷彿置身於義大利的美麗小鎮，「Trattoria di primo」都能滿足您對義大利美食的所有期待。",
      //   },
      //   {
      //     name: "台味小館",
      //     cuisine: "台式餐廳",
      //     photo: "../../picture/restaurant/台式餐廳_台味小館.jpg",
      //     description: "正宗的台灣美食。菜單匯集了台灣各地的經典料理，品嚐滷肉飯、蚵仔煎、牛肉麵等，彷彿帶您置身於台灣街頭美食天堂。簡約舒適的用餐環境中，新鮮食材和獨特口感保證讓您感受到家的溫馨和台灣味覺享受。",
      //   },
      //   {
      //     name: "一樂拉麵",
      //     cuisine: "日式餐廳",
      //     photo: "../../picture/restaurant/日式餐廳_一樂拉麵.jpg",
      //     description: "「一樂拉麵」以經典的拉麵、新鮮的生魚片和創意的壽司而聞名，每一道料理都精心製作，保持了日本料理的細緻和原汁原味。用餐環境舒適，充滿和風氛圍，讓您在品味美食的同時，彷彿置身於日本的美麗四季之中。",
      //   },
      //   {
      //     name: "韓老大餐酒館",
      //     cuisine: "韓式餐廳",
      //     photo: "../../picture/restaurant/韓式餐廳_韓老大餐酒館.jpg",
      //     description: "引以為傲的菜單包含了烤肉、拌飯、辣炒年糕等傳統韓國料理。用餐環境溫馨舒適，營造出韓國街頭小店的氛圍，在「韓老大餐酒館」感受到真實的韓式美味和獨特的韓國餐飲文化。",
      //   },
      //   {
      //     name: "Starbucks®AirTime臻選烘焙工坊",
      //     cuisine: "美式咖啡",
      //     photo: "../../picture/restaurant/美式咖啡_Starbucks.jpg",
      //     description: "位於慢活樂園島。精心烘焙的咖啡豆經過巧妙的調配，呈現濃郁香醇的口感，在這邊不僅可品嚐星巴克經典咖啡，還能親臨現場感受咖啡的誕生過程。星巴克®AirTime臻選烘焙工坊絕對是每位遊客不容錯過的特別體驗。",
      //   },
      // ],

    }
  },
  methods: {
    // 讓卡片們旋轉
    changeCard() {
      // 獲取所有的 .card 元素
      const card = event.currentTarget.closest('.card');
      // 對該卡片元素應用旋轉樣式
      card.classList.toggle('rotate');
    },
    // 跳轉到精選頁
    gofacility() {
      this.page = 1
    },
    // 跳轉到地圖頁
    gomap() {
      let flypeople = 0;
      let hoursepeople = 0;
      let icepeople = 0;
      let slowpeople = 0;
      let firepeople = 0;


      for (let i = 0; i < this.publishedFacility.length; i++) {
        if (this.publishedFacility[i].place == "驚險火山島") {
          firepeople = firepeople + this.publishedFacility[i].reserveNum
        }
        if (this.publishedFacility[i].place == "刺激飛天島") {
          flypeople = flypeople + this.publishedFacility[i].reserveNum
        }
        if (this.publishedFacility[i].place == "慢活樂園島") {
          slowpeople = slowpeople + this.publishedFacility[i].reserveNum
        }
        if (this.publishedFacility[i].place == "凍骨冰山島") {
          icepeople = icepeople + this.publishedFacility[i].reserveNum
        }
        if (this.publishedFacility[i].place == "溫馨親子島") {
          hoursepeople = hoursepeople + this.publishedFacility[i].reserveNum
        }
      }
      this.setpeople(flypeople,hoursepeople,icepeople,slowpeople,firepeople)
      this.page = 2

    },
    // 跳轉到3地圖
    go3dmap() {
      this.page = 3

    },
    // 跳轉到門票頁
    goticket() {
      this.page = 4
    },
    // 跳轉到美食頁
    goRestaurant() {
      this.page = 5
    },
    // 跳轉到紀念品頁
    goSouvenir() {
      this.page = 6
    },
    goFacilityInfo(index){
        console.log(index)
        this.$router.push({ path: '/FacilityInfo', query: { data: JSON.stringify({ key:this.publishedFacility[index] }) } })
    },

    // ===========================================================以上跳轉頁

    //歡迎使用者--目前沒用到
    welcomePlayer(nickname) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: nickname + "歡迎遊玩!!!"
      });
    },

    //計算設施使用時間 
    calculateMinute(reserveNum) {
      return Math.floor(reserveNum * 1.5)
    },
    //搜尋遊樂設施
    searchFacility() {
      const url = 'http://localhost:8080/api/park/getAllFacility';

      const queryParams = new URLSearchParams({
      });

      // 將查詢字串附加到 URL
      const urlWithParams = `${url}?${queryParams}`;

      fetch(urlWithParams, {
        method: "GET",
        headers: new Headers({
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }),
      })
        .then(response => {
          // 將API回應轉換為JSON格式
          return response.json();
        })
        .then(data => {
          // 將API回應的JSON數據設置到組件的responseData數據屬性中
          this.publishedFacility = data;

          console.log(this.publishedFacility)

          //將所有陣列裡面照片的字串加上資料型態 讓img可以讀取
          for (let i = 0; i < this.publishedFacility.length; i++) {
            var string = this.publishedFacility[i].photo;
            this.publishedFacility[i].photo = 'data:image/jpeg;base64,' + string;
          }

          console.log(this.publishedFacility)
        })
    },
    //搜尋遊樂設施-模糊搜尋
    searchFacilityRegx() {
      const url = 'http://localhost:8080/api/park/getAllFacilityRegx';

      const queryParams = new URLSearchParams({
        name: this.regxSearchName
      });

      // 將查詢字串附加到 URL
      const urlWithParams = `${url}?${queryParams}`;

      fetch(urlWithParams, {
        method: "GET",
        headers: new Headers({
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }),
      })
        .then(response => {
          // 將API回應轉換為JSON格式
          return response.json();
        })
        .then(data => {
          // 將API回應的JSON數據設置到組件的responseData數據屬性中
          this.publishedFacility = data;

          console.log(this.publishedFacility)

          //將所有陣列裡面照片的字串加上資料型態 讓img可以讀取
          for (let i = 0; i < this.publishedFacility.length; i++) {
            var string = this.publishedFacility[i].photo;
            this.publishedFacility[i].photo = 'data:image/jpeg;base64,' + string;
          }

          console.log(this.publishedFacility)
        })
    },
    //讓svg圖片像左邊移動
    svgMoveLeft(message) {
      //向左邊滑出
      const svgElement = this.$refs.mapPlace;
      svgElement.classList.toggle('move');
      //讓左邊隱藏的跑出來
      this.$refs.mapRightPlace.style.display = "block"
      //島會隨你點選的切換
      this.islandName = message

      for (let i = 0; i < this.publishedFacility.length; i++) {
        if (this.publishedFacility[i].place == message) {
          this.selectIslandFacility.push(this.publishedFacility[i])
        }
      }



    },
    //讓svg圖片像右邊移動
    svgMoveRight() {
      const svgElement = this.$refs.mapPlace;
      // 對該卡片元素應用旋轉樣式
      svgElement.classList.toggle('move');

      this.$refs.mapRightPlace.style.transition = "opacity 1s"
      this.$refs.mapRightPlace.style.display = "none"
      this.selectIslandFacility = []
      this.islandName = ""
    },

    // ==============================================================以上功能方法

    // 地圖島嶼顯示樂園資訊
    zoomAndShowText() {
      const svgElements = document.querySelectorAll(".st1.island");

      svgElements.forEach(svgElement => {
        svgElement.addEventListener("click", () => {
          const message = svgElement.getAttribute("data-message");
          const content = svgElement.getAttribute("data-content");

          console.log(message)
          console.log(content)

          // 點擊時彈跳 SweetAlert 資訊框顯示島嶼資訊
          Swal.fire({
            title: message,
            text: content,
            icon: 'info',
            showConfirmButton: false, // 隱藏確認按鈕
          });
        });
      });
    },

    // 執行方法獲得日期 還有 設定編輯問卷的代碼
    ...mapActions(parkPinia, ["setpeople"]),

    // 餐廳介紹切換頁面
    changePage(offset) {
      this.currentPage += offset;
    },
    // 美食餐廳切換頁面
    gourmetRestaurant() {

      fetch("http://localhost:8080/api/park/searchAllRest")
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          for (let i = 0; i < data.restaurantList.length; i++) {
            var string = data.restaurantList[i].photo;
            data.restaurantList[i].photo = 'data:image/jpeg;base64,' + string;
            if (data.restaurantList[i].published == true) {
              this.publishedRestaurant.push(data.restaurantList[i])
            }
          }
        })
    },

  },
  components: {
    HomeHeaderView,
    ThreeSphereView
  },
  mounted() {
    this.searchFacility()
    this.gourmetRestaurant()
  },
  // 更新頁面後，重新渲染
  updated() {
    console.log(this.threedmapshow)
  },
  computed: {
    // 抓取pinia裡面
    ...mapState(parkPinia, ["", "", ""]),
    // 切換餐廳頁面
    paginatedRestaurants() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.publishedRestaurant.slice(start, end);
    }
  }
}
</script>

<template>
  <HomeHeaderView class="HomeHeaderViewClass" />
  <!-- 上方bootstrap輪播 -->
  <div class="bootstrapAd">
    <div id="carouselExampleControls" class="carousel slide " data-bs-ride="carousel" data-interval="3000">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <!-- <img src="../../picture/ad/sky.jpg" class="d-block w-100" alt="..."> -->
          <img src="../../picture/ad/ferris wheel.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h1>浪漫遨遊～天空比鄰</h1>
            <!-- <p>Ascend to new heights of joy on the Ferris Wheel—a mesmerizing ride offering panoramic views and delightful
              spins.</p> -->
          </div>
        </div>
        <div class="carousel-item">
          <img src="../../picture/ad/flash.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h1>玩水世界～驚喜冒險</h1>
            <!-- <p>Dive into aquatic fun with our water attractions—splash, slide, and soak in thrilling adventures for a
              refreshing experience!</p> -->
          </div>
        </div>
        <div class="carousel-item">
          <img src="../../picture/ad/roller.jpg" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h1>一飛衝天！突破天際</h1>
            <!-- <p>Experience exhilarating thrills with the Sky Coaster a soaring ride that defies gravity and leaves you
              breathless with excitement!"</p> -->
          </div>
        </div>
      </div>
      <button class="carousel-control-prev change" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next change" type="button" data-bs-target="#carouselExampleControls"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- 中間變色功能列 -->
  <div class="midHeader">
    <div @click="gofacility" class="facility block">
      <div class="iconPlace">
        <i class="fa-solid fa-brands fa-fort-awesome-alt"></i>
      </div>
      <span>遊樂設施</span>
    </div>
    <div @click="gomap" class="map  block">
      <div class="iconPlace">
        <i class="fa-solid fa-map-location-dot"></i>
      </div>
      <span>地圖資訊</span>
    </div>
    <div @click="go3dmap" class="tour  block">
      <div class="iconPlace">
        <!-- <i class="fa-solid fa-street-view"></i> -->
        <i class="fa-solid fa-fire"></i>
      </div>
      <span>最新活動</span>
    </div>
    <!-- 門市通路 -->
    <div @click="goticket" class="ticket  block">
      <div class="iconPlace">
        <i class="fa-solid fa-ticket"></i>
      </div>
      <span>門票通路</span>
    </div>
    <!-- 美食餐廳 -->
    <div @click="goRestaurant" class="restaurant  block">
      <div class="iconPlace">
        <i class="fa-solid fa-utensils"></i>
      </div>
      <span>美食餐廳</span>
    </div>
    <!-- 獨家商品 -->
    <div @click="goSouvenir" class="Activity  block">
      <div class="iconPlace">
        <i class="fa-solid fa-gift"></i>
      </div>
      <span>獨家商品</span>
    </div>
  </div>

  <!-- ========================================================================================= -->

  <!-- 設施展示區 -->
  <div v-if="page == 1" class="bootstrapCard">
    <div style="display:flex;width:100%;height:100%;justify-content: space-between;padding:0 2%;"
      class="bootstrapCardTop">
      <h1>遊樂設施</h1>
      <div style="display:flex;align-items: center;" class="botSearch">
        <input style="width: 20vw;height: 4vh;" type="text" placeholder="設施名稱" v-model="this.regxSearchName">
        <i @click="this.searchFacilityRegx" style="margin:0 5%;font-size:24pt;cursor:pointer;"
          class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
    <div class="cardPlace">
      <div class="card" v-for="item, index in this.publishedFacility">
        <div class="cardFront">
          <img :src=item.photo class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title" style="font-size: 20pt;">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <span class="card-text reserve">預計等待時間</span>
            <span class="card-text reservetime">{{ calculateMinute(item.reserveNum) }}分鐘</span>
          </div>

          <button @click="changeCard()" class="carousel-control-next" type="button"
            data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <!-- //===================================================== -->
        <div class="cardBack">
          <h3>{{ item.name }}</h3>
          <p>活動期間:{{ item.startDate }}~{{ item.endDate }}</p>
          <p>限制年齡:{{ item.age }}</p>
          <p>地點:{{ item.place }}</p>
          <p>預約人數:{{ item.reserveNum }}</p>
          <button @click="goFacilityInfo(index)" class="btnMore" type="button">詳細資訊</button>
          <button @click="changeCard(index)" class="carousel-control-next " type="button"
            data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>


  <!-- 地圖資訊 -->
  <div v-if="page == 2" class="mapByMyself" ref="mapPlace">
          <div class="left">
            <!-- //上方文字區 -->
            <div class="leftTitle" style="display:flex;align-items: center;">
              <h1>地圖資訊</h1>
              <!-- //切換地圖按鈕 -->
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" v-model="this.threedmapshow" role="switch" id="flexSwitchCheckDefault">
                <label class="form-check-label" for="flexSwitchCheckDefault">觀看3D跟及時人數資訊</label>
              </div>
            </div>

            <!-- 自己做的地圖區 -->
            <div v-if="this.threedmapshow==false" class="svgdiv">
              <!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
              <svg class="mySvg"  version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
                <!-- //底層地圖 -->
                <g>
                  <defs>
                    <rect id="SVGID_3_" width="841.9" height="595.3" />
                  </defs>
                  <clipPath id="SVGID_4_">
                    <use xlink:href="#SVGID_3_" style="overflow:visible;" />
                  </clipPath>
                  <g class="st2">
                    <g>
                      <defs>
                        <path id="SVGID_7_"
                          d="M837.3,0.8V0H0.2v15v29v347.2c0,64.3,0,128.6,0,193l-0.2,11h820.9h21v-11V0.8H837.3z M782.6,584.1
                                c-12.1-2.8-24.4-5.1-36.6-3.7c-6,0.7-11.9,2.2-17.8,3.7h-52c-17.4-4.8-34.7-11.8-52.7-11c-16.6,0.6-32.1,7.8-48.4,11
                                c0,0,0,0,0,0h-90.5c-16-0.7-32.1-1.5-48.1-2.2c-27.5,0.9-55.1,1.7-82.7,2.2H264c-12-0.3-24-0.7-36-1.2
                                c-23-1.1-46-2.7-68.9-0.7c-5.8,0.5-11.6,1.3-17.5,1.9h-33.9c-6.9-1.2-13.7-3.2-20.8-3.4c-7.9-0.2-15.9,1.8-23.8,3.4
                                c-10.3,0-25.3,3-33.5-4.5c-0.1-0.1,2.5-9.1,2.6-9.8c0.7-4.8,0.6-9.7-0.1-14.5c-1.3-9.6-4.6-18.9-8.6-27.6
                                c-7.7-16.9-7.7-38.9-3.4-56.6c2.4-9.9,6.4-19.6,5.8-29.7c-0.5-9-4.5-17.5-4.7-26.5c-0.2-8.9,3.2-17.5,5.7-26.1
                                c4.9-17.6,1.8-38.4-2.7-55.7c-2.6-10.2,0.4-21.8,1.5-32.1c0.2-1.8,0.4-3.7-0.3-5.4c-0.7-1.7-2.2-2.8-3.3-4.3
                                c-1.9-2.7-2.1-6.2-2-9.5c0.5-11.7,6-19.1,9.7-29.3c4.4-12.3,0.6-24,1.3-36.3c0.8-15.4-1.3-31.9,2.1-47.1
                                c2.1-9.4,6.8-18.7,5.2-28.2c-1.7-10.2-10-17.8-16.4-25.9C6.8,95.1,22,81,30.6,62.3c4.6-9.9,10.2-19.3,16.9-27.9
                                c1.3-1.7,5.1-7,9.3-12c26.2-2.4,52.7-2.5,79-0.1c21.1,1.9,42.1,5.2,63.3,5c10.8-0.1,21.5-1.7,32.1-3.9
                                c10.1-2.1,21.2-6.6,31.4-6.4c17,0.2,34,1.5,51,0.7c15.5-0.8,30.2-3.1,45.6-4.6c5.9-0.6,11.9-0.8,17.7,0.6
                                c6.6,1.5,8.2,3.1,13.1,4.5c10.7,2.9,15.8-1.9,28-3.1c14.5-1.4,16.9,4.7,33.1,5.9c7.8,0.6,19.6,0.1,34.6-5.8h66.3
                                c6.5,1.8,12.9,3.7,19.5,4.8c14.4,2.4,29.1,0.7,43.6,0.2c31.9-1,63.6,3.5,95.5,4.4c15.9,0.4,31.9-0.1,47.6-2.7
                                c5.7-1,11.6-4.9,16.8-2.9c6.4,2.4,12.6,8.1,17.1,13c4.6,5,9,7.3,12.5,13.5c3.8,6.7,6.5,13.9,9.1,21.1
                                c6.9,19.7,9.5,40.7,9.6,61.5c0.1,15.5-1.2,37.8-8.3,51.6c-3,5.9-7.6,10.8-11,16.5c-5.6,9.4-7.8,20.9-6,31.7
                                c3.5,20.6,20.4,33.6,23.4,54c2.9,19.9,1.2,44.8-7.3,63.1c-6.3,13.6-3.8,23.1,1.4,36.4c5.7,14.3,9.1,30.6,11,46
                                c3.7,31.3-3.4,59.9-7.8,90.6c-1.6,11.1-1.3,18.5-5.6,29c-2.5,6.1-3.5,12.5-3.2,18.9c0.4,10.2-7.9,18.6-18.1,18.6H782.6z" />
                      </defs>
                      <clipPath id="SVGID_8_">
                        <use xlink:href="#SVGID_7_" style="overflow:visible;" />
                      </clipPath>
    
                      <linearGradient id="SVGID_9_" gradientUnits="userSpaceOnUse" x1="-1.449462e-08" y1="595.3" x2="1" y2="595.3"
                        gradientTransform="matrix(841.9 0 0 -841.9 1.220312e-05 501480.6563)">
                        <stop offset="0" style="stop-color:#885C3B" />
                        <stop offset="1" style="stop-color:#3C2315" />
                      </linearGradient>
                      <rect x="0" y="0" class="st4" width="841.9" height="595.2" />
                    </g>
                    <g class="st3">
                      <defs>
                        <path id="SVGID_10_"
                          d="M436.1,581.9c0.1,0,0.2,0,0.3,0c1.3,0,2.6-0.1,3.9-0.1C438.9,581.9,437.5,581.9,436.1,581.9" />
                      </defs>
                      <clipPath id="SVGID_11_">
                        <use xlink:href="#SVGID_10_" style="overflow:visible;" />
                      </clipPath>
    
                      <linearGradient id="SVGID_12_" gradientUnits="userSpaceOnUse" x1="-1.914903e-04" y1="595.3" x2="0.9999"
                        y2="595.3" gradientTransform="matrix(4.1436 0 0 -4.1436 436.1468 3048.5647)">
                        <stop offset="0" style="stop-color:#885C3B" />
                        <stop offset="1" style="stop-color:#3C2315" />
                      </linearGradient>
                      <rect x="436.1" y="581.8" class="st5" width="4.1" height="0.1" />
                    </g>
                  </g>
                  <path class="st6" d="M769.4,518.5l-4.4-19.8l-4.4,19.8l-19.9,4.4l19.9,4.4l4.4,20l4.4-20l19.9-4.4L769.4,518.5z M765,527.6
                        c-2.3,0-4.1-1.8-4.1-4.1c0-0.2,0-0.3,0-0.5c0.1-0.5,0.2-0.9,0.4-1.3h-0.1l3.8-17l3.8,17h-0.1c0.2,0.4,0.3,0.8,0.4,1.3
                        c0,0.2,0,0.3,0,0.5C769.1,525.7,767.3,527.6,765,527.6" />
                <path class="st6" d="M765,520.1c-0.9,0-1.8,0.4-2.4,1c-0.6,0.6-1,1.5-1,2.4c0,0.9,0.4,1.8,1,2.4c0.6,0.6,1.5,1,2.4,1
                        c0.9,0,1.8-0.4,2.4-1c0.6-0.6,1-1.5,1-2.4c0-0.9-0.4-1.8-1-2.4C766.8,520.5,765.9,520.1,765,520.1" />
                <polygon class="st6" points="767.9,487 769.1,487 769.1,496.3 767.9,496.3 762.9,488.9 762.9,496.3 761.7,496.3 761.7,487 
                        762.9,487 767.9,494.4 		" />
                <path class="st6" d="M763.5,553.7c0,0.3,0.1,0.6,0.3,0.8s0.4,0.4,0.7,0.5c0.3,0.1,0.6,0.2,1,0.3c0.4,0.1,0.7,0.2,1.1,0.3
                        c0.4,0.1,0.7,0.2,1,0.4c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.3,0.7,0.3,1.2c0,0.7-0.3,1.4-0.8,1.9c-0.6,0.5-1.3,0.8-2.3,0.8
                        c-0.9,0-1.7-0.2-2.3-0.7c-0.6-0.4-0.9-1-0.9-1.8h1.3c0,0.4,0.2,0.8,0.5,1c0.3,0.3,0.7,0.4,1.3,0.4c0.6,0,1.1-0.2,1.4-0.5
                        c0.3-0.3,0.5-0.7,0.5-1.1c0-0.4-0.1-0.7-0.3-0.9c-0.2-0.2-0.4-0.4-0.7-0.5c-0.3-0.1-0.6-0.2-1-0.3c-0.4-0.1-0.7-0.2-1.1-0.3
                        c-0.4-0.1-0.7-0.2-1-0.4c-0.3-0.2-0.5-0.4-0.7-0.7c-0.2-0.3-0.3-0.7-0.3-1.2c0-0.8,0.3-1.4,0.8-1.9c0.6-0.5,1.3-0.7,2.2-0.7
                        c0.9,0,1.6,0.2,2.1,0.6c0.5,0.4,0.8,1,0.9,1.7H767c0-0.4-0.2-0.7-0.5-0.9c-0.3-0.3-0.7-0.4-1.2-0.4c-0.5,0-1,0.1-1.3,0.4
                        C763.6,552.8,763.5,553.2,763.5,553.7" />
                <polygon class="st6" points="799.1,517.5 799.1,518.5 795.4,518.5 795.4,521.7 798.7,521.7 798.7,522.6 795.4,522.6 795.4,525.9 
                        799.1,525.9 799.1,526.8 794.2,526.8 794.2,517.5 		" />
                <polygon class="st6" points="737,517.5 738.3,517.5 735.5,526.8 734.1,526.8 732,519.3 729.7,526.8 728.4,526.9 725.8,517.5 
                        727,517.5 729.1,525.4 731.4,517.5 732.7,517.5 734.8,525.4 		" />
                </g>
                <!-- 背景圖 -->
                <g class="st1 botmap">
                  <defs>
                    <rect id="SVGID_13_" width="841.9" height="595.3" />
                  </defs>
                  <clipPath id="SVGID_14_">
                    <use xlink:href="#SVGID_13_" style="overflow:visible;" />
                  </clipPath>
                </g>

                <!-- 測試點選地圖後，顯示地圖資訊 -->
                <!-- 島嶼1 刺激飛天島-->
                <g class="st1 island"  @click="svgMoveLeft('刺激飛天島')" id="island1" data-message="刺激飛天島" data-content="飛天島好好玩">
    
                  <defs>
                    <path id="SVGID_15_" d="M266,81l-82.3,102.5c-0.7,0.8-1.5,1.5-2.5,1.9L90,227.2c-26.1,12-37.8,42-26.7,68.5l48.1,114.5
                          c5.5,13,4.3,28-2.9,40.1l-2.1,3.5c-2.5,4.2-3,9.2-1.5,13.8c1.6,4.6,5,8.4,9.5,10.2c6.7,2.8,13.8,4.2,21,4.2c8,0,15.8-1.7,23-5
                          l71.8-33c8.8-4,17.8-7.6,27-10.7l70.7-23.9L313.8,78.8c-5.7-0.3-11.3-1.9-16.3-4.5c-3.6-1.8-7.7-2.8-11.7-2.8
                          C278,71.5,270.9,75,266,81" />
                  </defs>
                  <clipPath id="SVGID_16_">
                    <use xlink:href="#SVGID_15_" style="overflow:visible;" />
                  </clipPath>
                  <path class="st7" d="M135.4,480.5c-7.1,0-13.9-1.4-20.4-4.1c-4-1.6-7.2-5-8.7-9.3c-1.4-4.2-0.9-8.8,1.4-12.5l2.1-3.5
                        c7.5-12.6,8.6-28.1,3-41.5L64.6,295.1c-10.8-25.7,0.6-54.9,25.9-66.6l91.2-41.8c1-0.4,2-1.1,3-2.3l82.3-102.5
                        c4.6-5.7,11.4-8.9,18.6-8.9c3.7,0,7.6,0.9,11,2.6c4.9,2.5,10.2,4.1,15.5,4.6l14,328.1l-69.6,23.5c-8.9,3-18.1,6.6-27.1,10.8
                        l-71.8,33C150.7,478.9,143.2,480.5,135.4,480.5" />
                  <path class="st8" d="M285.8,74.5c3.5,0,7.2,0.9,10.3,2.5c4.6,2.4,9.7,4,14.8,4.6l13.9,325.7l-68.6,23.2c-9,3-18.1,6.7-27.3,10.8
                        l-71.8,33c-6.8,3.1-14.2,4.7-21.8,4.7c-6.9,0-13.5-1.3-19.9-4c-3.6-1.4-6.4-4.5-7.8-8.4c-1.2-3.8-0.8-7.9,1.2-11.3l2.1-3.5
                        c7.8-13,8.9-29,3.1-42.8L66,294.5c-10.4-24.9,0.6-53.3,25.2-64.6l91.1-41.8c1.3-0.5,2.5-1.4,3.6-2.7c0,0,0.1-0.1,0.1-0.1
                        l82.3-102.5C272.7,77.5,278.9,74.5,285.8,74.5 M285.8,71.5c-7.8,0-14.9,3.5-19.8,9.5l-82.3,102.5c-0.7,0.8-1.5,1.5-2.5,1.9
                        L90,227.2c-26.1,12-37.8,42-26.7,68.5l48.1,114.5c5.5,13,4.3,28-2.9,40.1l-2.1,3.5c-2.5,4.2-3,9.2-1.5,13.8
                        c1.6,4.6,5,8.4,9.5,10.2c6.7,2.8,13.8,4.2,21,4.2c8,0,15.8-1.7,23-5l71.8-33c8.8-4,17.8-7.6,27-10.7l70.7-23.9L313.8,78.8
                        c-5.7-0.3-11.3-1.9-16.3-4.5C293.9,72.5,289.8,71.5,285.8,71.5" />
                  <path class="st9" d="M171.1,276.1c0.5-0.7,1.1-0.9,1.9-0.8c5.2,0.1,10.3,0.1,15.5,0.1c0.2,0,0.3,0,0.5,0c0-0.7,0-1.3,0-1.9
                        c0-0.2,0-0.4-0.1-0.5c-0.6-0.6-0.5-1.2-0.3-1.9c0.6-2.1,1.2-4.3,1.8-6.4c0.4-1.2,0.9-1.5,2.1-1.2c1.2,0.3,2.5,0.7,3.8,1.1
                        c0-2.5,1-4.3,3.4-4.9c1.7-0.4,3.2,0.1,4.4,1.5c1.3,1.6,1.3,3.1,0,5.6c0.9,0.3,1.8,0.5,2.6,0.8c3.7,1.1,5.3,4,4.2,7.6
                        c-0.2,0.6-0.3,1.1-0.5,1.7c0.3,0.2,0.6,0.4,0.9,0.6c1.4-1.3,2.7-2.7,4.1-4c1.3-1.3,1.7-1.3,3,0c0.8,0.8,1.7,1.6,2.5,2.4
                        c1.2-2,2.9-3.1,5.4-2.4c1.8,0.5,2.8,1.8,3,3.6c0.3,2.2-0.8,3.7-2.8,4.7c0.7,0.7,1.3,1.4,2,2c2.7,2.7,2.6,6-0.1,8.7
                        c-0.6,0.6-1.2,1.2-1.8,1.8c-0.5,0.4-1,0.6-1.6,0.3c-0.1-0.1-0.4-0.1-0.5,0c-0.5,0.3-1.1,0.6-1.8,1c1.5,2.5,2.9,5.1,4.6,7.4
                        c5.5,7.6,12.9,12.3,22,14.2c2.1,0.4,4.2,0.5,6.4,0.7c1.5,0.1,1.8,0.4,1.8,1.9c0,8,0,16.1,0,24.1c0,1-0.3,1.6-1.2,2h-0.2
                        c-0.9-0.3-1.2-1-1.2-1.9c0-5.8,0-11.5,0-17.3v-1c-1.8-0.2-3.4-0.3-5.2-0.4v1.1c0,5.9,0,11.8,0,17.6c0,1-0.3,1.6-1.2,1.9h-0.2
                        c-0.9-0.3-1.2-1-1.2-2c0-3.4,0-6.8,0-10.2c0-2.8,0-5.5,0-8.3c0-0.3-0.1-0.7-0.3-0.8c-1.6-0.5-3.1-0.9-4.8-1.3v1.1
                        c0,6.5,0,13,0,19.5c0,1-0.3,1.6-1.2,1.9h-0.2c-0.9-0.3-1.3-1-1.2-1.9c0.1-0.7,0-1.5,0-2.2c0-6.2,0-12.4,0-18.7
                        c0-0.3-0.1-0.8-0.3-0.9c-1.5-0.8-3.1-1.5-4.8-2.3v1c0,7.7,0,15.4,0,23c0,1-0.3,1.6-1.2,1.9h-0.2c-0.9-0.3-1.2-1-1.2-1.9
                        c0-8.3,0-16.6,0-24.9c0-0.6-0.1-0.9-0.6-1.3c-1.3-1-2.6-2-3.9-3c-0.2-0.1-0.3-0.2-0.6-0.4v1c0,9.5,0,19,0,28.5c0,1-0.3,1.6-1.2,2
                        h-0.2c-0.9-0.3-1.2-0.9-1.2-1.9c0-9.9,0-19.7,0.1-29.6c0-1.8-0.2-3.4-1.6-4.6c-0.2-0.2-0.4-0.4-0.5-0.7c-0.9-1.3-1.9-2.6-2.9-4
                        v1.1c0,7.5,0,15,0,22.5c0,1.4-0.4,2-1.3,2c-0.9,0-1.3-0.6-1.3-2c0-8.3,0-16.6,0-24.8c0-3.8,0-3.8-2.3-6.8
                        c-0.8-1.1-1.7-2.1-2.6-3.1c-0.1,0-0.1,0.1-0.2,0.1v1c0,16.2,0,32.5,0,48.7c0,0.4,0,0.9-0.1,1.2c-0.2,0.6-0.7,0.8-1.3,0.8
                        c-0.6,0-1-0.4-1.1-1c-0.1-0.4-0.1-0.8-0.1-1.2c0-17,0-34.1,0-51.1c0-0.3,0-0.5,0-0.8c-0.1-0.3-0.2-0.5-0.4-0.7
                        c-0.7-0.6-1.5-1.2-2.3-1.8c-0.7-0.5-1.5-1-2.4-1.6v1.2c0,18.2,0,36.4,0,54.7c0,0.4,0,0.8-0.1,1.3c-0.1,0.6-0.6,0.9-1.2,0.9
                        c-0.6,0-1.1-0.3-1.2-0.9c-0.1-0.4-0.1-0.8-0.1-1.3c0-18.7,0-37.4,0-56.1c0-0.3,0-0.5,0-0.8c0-0.2-0.1-0.4-0.2-0.5
                        c-1.5-0.6-3.1-1.3-4.8-2v1.3c0,19.3,0,38.6,0,58c0,0.4,0,0.8-0.1,1.3c-0.1,0.6-0.5,0.9-1.1,1c-0.6,0-1.1-0.3-1.3-0.9
                        c-0.1-0.4-0.1-0.8-0.1-1.3c0-19.6,0-39.2,0-58.8v-1.2c-1.7-0.2-3.3-0.5-5.1-0.7v1.3c0,19.8,0,39.6,0,59.4c0,0.4,0,0.7,0,1.1
                        c-0.1,0.6-0.5,1-1.1,1.1c-0.6,0-1.1-0.2-1.3-0.9c-0.1-0.4-0.1-0.8-0.1-1.3c0-19.9,0-39.8,0-59.7v-1h-5.1v1c0,2.4,0,4.7,0,7.1
                        c0,0.9-0.5,1.5-1.3,1.5c-0.7,0-1.2-0.6-1.3-1.4c0-1.5,0-3.1,0-4.6V283h-5.1v1.2c0,19.9,0,39.9,0,59.8c0,1-0.2,1.7-1.2,2h-1.4
                        C171.1,322.7,171.1,299.4,171.1,276.1 M173.7,280.4h1.1c3.6,0,7.2,0,10.8,0c5.6,0,11.1,1,16.2,3.4c8.1,3.7,14.2,9.6,18.4,17.5
                        c1.8,3.4,3.9,6.5,6.6,9.3c6.6,6.9,14.6,11,24,12.3c1.4,0.2,2.8,0.3,4.3,0.4v-2.6c-0.4,0-0.8-0.1-1.2-0.1c-4-0.2-7.9-1.1-11.6-2.6
                        c-8.8-3.6-15.3-9.6-19.8-17.9c-3.1-5.8-7.2-10.7-12.6-14.6c-6.4-4.6-13.6-7.2-21.5-7.5c-4.6-0.2-9.3-0.1-13.9-0.1
                        c-0.2,0-0.4,0-0.7,0.1V280.4z M213.6,279.4c4,4.1,8.1,8.3,12.4,12.7c0.3-0.4,0.4-0.8,0.7-1c1.9-1.9,1.9-3.5,0.1-5.4
                        c-2.7-2.8-5.4-5.5-8.1-8.3c-0.5-0.5-1-1.1-1.5-1.6C215.9,277,214.7,278.1,213.6,279.4 M208.1,275.9c0.2-0.5,0.3-1,0.4-1.4
                        c0.6-2.2-0.2-3.7-2.4-4.4c-3.7-1.1-7.4-2.1-11.1-3.2c-0.8-0.2-1.6-0.5-2.5-0.7c-0.5,1.6-0.9,3.2-1.4,4.8
                        C196.8,272.7,202.4,274.3,208.1,275.9 M200.7,265.8c1,0,1.8-0.8,1.8-1.8c0-0.9-0.8-1.8-1.7-1.8c-1,0-1.8,0.7-1.9,1.7
                        C198.9,264.9,199.7,265.8,200.7,265.8 M225.2,276c-1,0-1.8,0.9-1.8,1.8c0,1,0.9,1.7,1.8,1.7c1,0,1.8-0.8,1.8-1.8
                        C227,276.8,226.2,276,225.2,276 M207.4,280.8c0.7,0.4,1.3,0.8,2,1.2c0.3-0.7,0.7-1.3,1-2c-0.6-0.4-1.1-0.7-1.6-1.1
                        C208.3,279.6,207.9,280.2,207.4,280.8 M215.6,286.6c1,0.9,1.9,1.8,2.8,2.7c0.1-0.2,0.3-0.5,0.5-0.7c-0.9-0.9-1.7-1.7-2.6-2.6
                        C216.1,286.3,215.8,286.4,215.6,286.6 M200.6,276.4c-1.2-0.3-2.3-0.6-3.4-1c-0.2,0.4-0.3,0.7-0.5,1c1.3,0.4,2.5,0.7,3.8,1.1
                        C200.5,277.2,200.5,276.8,200.6,276.4 M191.5,273.8c-0.2,1,0.5,1.6,1.1,1.8c0.8,0.2,1.5-0.1,1.9-0.9c-0.1-0.1-0.3-0.1-0.4-0.2
                        C193.3,274.3,192.4,274.1,191.5,273.8 M203.1,277.2c-0.1,1,0.4,1.7,1.2,1.9c0.7,0.2,1.4-0.2,1.8-1
                        C205.2,277.8,204.2,277.5,203.1,277.2 M214.5,284.2c-0.8-0.7-1.5-1.5-2.3-2.2c-0.4,0.7-0.3,1.4,0.2,2
                        C213,284.6,213.7,284.7,214.5,284.2 M222.9,292.9c-0.8-0.7-1.5-1.4-2.3-2.1c-0.4,0.7-0.3,1.4,0.2,1.9
                        C221.5,293.2,222.1,293.3,222.9,292.9" />
                  <path class="st9" d="M179.9,346c-0.9-0.4-1.2-1-1.2-2c0-15.7,0-31.3,0-47c0-0.3,0-0.6,0-0.8c0.2-0.7,0.6-1.1,1.3-1.1
                        c0.7,0,1.1,0.5,1.2,1.2c0,0.2,0,0.4,0,0.6c0,15.7,0,31.4,0,47.1c0,1-0.3,1.6-1.2,1.9H179.9z" />
                  <path class="st9" d="M218.1,346c-1-0.3-1.3-0.9-1.2-1.9c0-3,0-6,0-9c0-0.5,0.2-1.1,0.6-1.4c0.2-0.2,1-0.3,1.2-0.1
                        c0.4,0.3,0.7,0.8,0.7,1.3c0.1,1.3,0,2.6,0,4c0,1.7,0,3.4,0,5.1c0,1-0.3,1.6-1.2,2H218.1z" />
                  <path class="st9"
                    d="M176.4,263.2c2.7,0.4,5.3,0.7,8,1.1c0.4,0.1,0.9,0.1,1.3,0.2c0.9,0.2,1.3,0.7,1.1,1.5c-0.1,0.7-0.7,1.1-1.6,1
                        c-2-0.3-4.1-0.5-6.1-0.8c-1-0.1-2.1-0.3-3.1-0.4c-0.9-0.1-1.3-0.7-1.3-1.4C174.9,263.6,175.5,263.2,176.4,263.2" />
                  <path class="st9" d="M176.7,267.8c2.9,0.4,6,0.8,9.1,1.2c0.8,0.1,1.3,0.7,1.2,1.5c-0.1,0.7-0.6,1.1-1.5,1c-2.3-0.3-4.7-0.6-7-0.9
                        c-0.8-0.1-1.5-0.2-2.3-0.3c-0.9-0.1-1.3-0.7-1.3-1.4C174.9,268.1,175.5,267.7,176.7,267.8" />
                </g>
                <!-- 島嶼2 溫馨親子島-->
                <g class="st1 island"  @click="svgMoveLeft('溫馨親子島')" id="island2"  data-message="溫馨親子島" data-content="親子島好好玩">
                  <defs>
                    <path id="SVGID_17_" d="M401.8,25.2l-52.6,43.7c-4.3,3.7-9.3,6.3-14.7,7.5l9.3,220.1l146.7,3.5l6.2-184l-24.9-16.8
                          c-13.2-9.1-18-26.2-11.3-40.8c2.2-4.7,2.2-10.1,0.3-15c-2.1-4.8-5.9-8.6-10.9-10.4l-29.4-11c-2.1-0.7-4.3-1.1-6.5-1.1
                          C409.6,20.9,405.2,22.3,401.8,25.2" />
                  </defs>
                  <clipPath id="SVGID_18_">
                    <use xlink:href="#SVGID_17_" style="overflow:visible;" />
                  </clipPath>
                  <path class="st10"
                    d="M345.2,295L336,77.6c5.1-1.3,9.9-3.9,14.1-7.5l52.6-43.7c3.1-2.6,7.1-4,11.2-4c2.1,0,4.1,0.3,6,1l29.4,11
                        c4.5,1.6,8.1,5,10.1,9.6c1.8,4.6,1.7,9.5-0.3,13.8c-7,15.2-2,33.1,11.8,42.7l24.2,16.3L489,298.5L345.2,295z" />
                  <path class="st11" d="M413.9,23.9L413.9,23.9c1.9,0,3.7,0.3,5.5,0.9l29.4,11c4.1,1.5,7.3,4.6,9.1,8.7c1.6,4.3,1.6,8.7-0.3,12.6
                        c-7.3,15.9-2.1,34.6,12.3,44.5l23.5,15.9l-6,179.4l-140.9-3.4l-9.1-214.9c4.9-1.5,9.5-4,13.5-7.5l52.6-43.7
                        C406.5,25.2,410.1,23.9,413.9,23.9 M413.9,20.9c-4.4,0-8.7,1.4-12.2,4.3l-52.6,43.7c-4.3,3.7-9.3,6.3-14.7,7.5l9.3,220.1
                        l146.7,3.5l6.2-184l-24.9-16.8c-13.2-9.1-18-26.2-11.3-40.8c2.2-4.7,2.2-10.1,0.3-15c-2.1-4.8-5.9-8.6-10.9-10.4l-29.4-11
                        C418.4,21.3,416.1,20.9,413.9,20.9" />
                  <path class="st12"
                    d="M412,224v-44c-1.3,0.5-2.5,0.8-3.8,0.4c-1.3-0.3-2.3-1.1-3.1-2.1c-2.9,3.3-6.8,2.6-8.9,0
                        c-1.9,2-3.6,2.5-6.1,2v22.2c0.7,0.3,0.9,0,1.1-0.7c0.5-1.9,1.1-3.8,1.7-5.7c1.4-4.1,5.3-7,9.6-7c2,0,3.6,1.4,3.5,3.4
                        c-0.1,1.3,0.3,2,1.5,2.4c0.2,0.1,0.4,0.2,0.6,0.3c2,1,2.5,2.6,1.3,4.5c-0.8,1.3-1.9,2-3.4,2c-0.4,0-0.8,0-1.3,0v1
                        c0,5.4,0,10.8,0,16.2c0,1.3-0.3,1.5-1.5,1.5c-0.5,0-1,0-1.5,0c-1.3,0-1.4-0.1-1.8-1.3c-0.7-2-1.4-3.9-2.2-5.9
                        c-3.1,0.6-6.2,0.7-9.4,0c-0.5,1.3-0.9,2.5-1.4,3.8c-0.3,0.8-0.6,1.7-0.9,2.5c-0.2,0.6-0.6,1-1.3,0.9c-0.7,0-1.4,0-2.2,0
                        c-0.9,0-1.2-0.4-1.2-1.3c0-1.6,0-3.3,0-4.9c-0.8,0.3-1.6,0.6-2.4,0.8c-1.1,0.2-1.6-0.2-1.6-1.4c0-1.6,0-3.3,0-4.9
                        c0-3.5,2.8-6.3,6.3-6.3c1.4,0,2.8,0,4.4,0v-1c0-7.2,0-14.3,0-21.5c0-0.8-0.2-1.4-0.8-1.8c-1.8,2-4,2.9-6.5,1.8
                        c-2.7-1.1-3.5-3.4-3.3-6.1c-1.2-0.4-1.3-0.5-1.3-1.7c0-1,0-2.1,0-3.1c0-1,0.3-1.3,1.3-1.3c0.5,0,1-0.2,1.5-0.4
                        c11.3-6.8,22.5-13.7,33.8-20.5c3.9-2.4,7.8-2.4,11.7,0c11.3,6.8,22.5,13.7,33.8,20.5c0.4,0.3,1,0.4,1.5,0.5
                        c0.9,0.1,1.2,0.4,1.2,1.3c0,1.1,0,2.1,0,3.2c0,1.2-0.1,1.4-1.3,1.6c0.2,2.8-0.7,5.1-3.6,6.2c-2.5,1-4.6,0.1-6.3-1.9
                        c-2.9,3.3-6.8,2.6-8.9,0c-0.9,0.6-1.3,1.4-1.3,2.6c0.1,6.9,0,13.7,0,20.6v0.9c0.7,0.2,1,0.1,1.2-0.6c0.5-1.9,1.1-3.8,1.7-5.7
                        c1.4-4.2,5.4-7,9.7-7c2,0,3.6,1.4,3.4,3.4c-0.1,1.3,0.4,2.1,1.6,2.4c0.1,0,0.3,0.1,0.4,0.2c2.5,1.3,2.8,3.9,0.6,5.6
                        c-0.7,0.5-1.7,0.7-2.6,1c-0.4,0.1-0.8,0-1.3,0v0.9c0,5.4,0,10.8,0,16.2c0,1.3-0.3,1.6-1.5,1.6c-3.3,0-2.6,0.4-3.8-2.6
                        c-0.6-1.5-1.1-3-1.6-4.4c-1.7,0.1-3.2,0.3-4.8,0.3c-1.5,0-3.1-0.2-4.7-0.4c-0.7,1.9-1.4,3.8-2.1,5.8c-0.4,1.2-0.6,1.3-1.8,1.3
                        c-0.6,0-1.1,0-1.7,0c-1,0-1.4-0.3-1.4-1.3c0-1.6,0-3.2,0-4.8c-0.8,0.3-1.5,0.6-2.3,0.8c-1.2,0.3-1.7-0.2-1.7-1.4
                        c0-1.6,0-3.2,0-4.8c0-3.6,2.8-6.3,6.4-6.4c1.4,0,2.8,0,4.3,0v-22.1c-2.3,0.4-4.1-0.4-5.6-2.1c-1.9,2.2-4.2,2.8-7,1.7v44h1h33.4
                        c1.4,0,1.6,0.2,1.6,1.6c0,1.1,0,2.1,0,3.2c0,0.8-0.4,1.2-1.2,1.2c-0.2,0-0.4,0-0.6,0h-81.3c-1.6,0-1.8-0.2-1.8-1.8
                        c0-0.9,0-1.8,0-2.8c0-1.2,0.3-1.5,1.5-1.5c8.1,0,16.1,0,24.2,0H412z M402.7,218.6v-0.9c0-5.4,0-10.8,0-16.2c0-1.3,0.3-1.6,1.5-1.6
                        c0.8,0,1.6,0,2.3-0.2c0.9-0.2,1.3-0.9,1.5-1.7c0.1-0.8-0.7-0.9-1.2-1.1c-1.4-0.6-2.8-1.3-4.3-1.6c-2.2-0.5-3.5,0.4-4.2,2.6
                        c-0.4,1.3-0.7,2.5-1.1,3.8c-0.6,1.9-1.9,2.8-3.8,2.9c-1.8,0-3.7,0-5.5,0c-2.8,0-4.6,1.8-4.6,4.6c0,2.9,0,5.8,0,8.7
                        c0,0.2,0,0.5,0,0.7h0.9c0.8-2.1,1.5-4.2,2.3-6.3c0.3-0.9,0.6-1.1,1.6-0.9c3.2,0.7,6.4,0.7,9.6,0c1-0.2,1.3-0.1,1.6,0.9
                        c0.7,1.8,1.4,3.7,2,5.6C401.6,218.5,401.9,218.8,402.7,218.6 M432.7,218.5c0.7,0.3,1,0,1.3-0.7c0.6-1.9,1.3-3.8,2-5.6
                        c0.3-0.9,0.6-1.1,1.6-0.8c3.2,0.7,6.4,0.7,9.6,0c0.9-0.2,1.3-0.1,1.6,0.9c0.7,1.9,1.4,3.7,2,5.6c0.2,0.6,0.5,0.9,1.3,0.7v-0.9
                        c0-5.5,0-10.9,0-16.4c0-1.1,0.3-1.4,1.4-1.4c0.6,0,1.2,0,1.8,0c1.1-0.1,1.9-0.8,2.1-1.7c0-0.2,0-0.6-0.2-0.7
                        c-1.9-1-3.7-2.1-5.9-2.2c-1.9-0.1-3,0.7-3.5,2.5c-0.4,1.3-0.7,2.7-1.1,4c-0.6,1.9-1.9,2.8-3.8,2.8c-1.9,0-3.7,0-5.6,0
                        c-2.6,0-4.5,1.9-4.5,4.5c0,1.4,0,2.8,0,4.2V218.5z M458.7,226H378v1.9h80.7V226z M378,171.8h80.7v-1.9H378V171.8z M425,167.8
                        c0-0.1,0-0.2,0-0.2c-1.9-6.5-3.8-13.1-5.8-19.6c-0.1-0.3-0.5-0.7-0.8-0.7c-0.3,0-0.7,0.4-0.8,0.8c-1.1,3.6-2.1,7.2-3.2,10.8
                        c-0.9,3-1.8,6-2.7,9.1H425z M409.6,167.9c1.8-6.1,3.6-12.1,5.3-18.1c-0.1,0-0.1-0.1-0.2-0.1c-6,6-11.9,12.1-18,18.2H409.6z
                        M422,149.7c-0.1,0-0.1,0.1-0.2,0.1c1.8,6,3.5,12,5.3,18h12.8C433.9,161.7,428,155.7,422,149.7 M454.6,167.9c0-0.1,0-0.1,0-0.2
                        c-9.7-5.9-19.5-11.8-29.2-17.7c0,0.2,0,0.3,0.1,0.3c5.7,5.7,11.3,11.5,17,17.2c0.2,0.2,0.6,0.4,0.9,0.4c2,0,4.1,0,6.1,0H454.6z
                        M382,167.8c0.3,0,0.4,0,0.5,0c3.6,0,7.3,0,10.9,0c0.3,0,0.7-0.2,0.9-0.4c5.6-5.6,11.2-11.3,16.7-16.9c0.1-0.1,0.2-0.3,0.4-0.4
                        c0,0-0.1-0.1-0.1-0.1C401.6,155.9,391.9,161.8,382,167.8 M414,220.7c2.9-1.4,5.6-2.8,8.3-4.2c0.2-0.1,0.3-0.3,0.4-0.4
                        c0-1.5,0-2.9,0-4.5c-2.9,1.4-5.6,2.8-8.4,4.2c-0.2,0.1-0.3,0.4-0.3,0.6C414,217.8,414,219.2,414,220.7 M414,192.9
                        c2.9-1.4,5.6-2.8,8.4-4.2c0.1-0.1,0.3-0.3,0.3-0.4c0-1.4,0-2.9,0-4.4c-2.9,1.4-5.6,2.8-8.4,4.2c-0.1,0.1-0.3,0.3-0.3,0.5
                        C414,190,414,191.4,414,192.9 M414,199.7c0.1,0,0.2,0,0.2,0c2.7-1.3,5.4-2.7,8-4c0.2-0.1,0.4-0.4,0.4-0.5c0-1.4,0-2.8,0-4.2
                        c-0.1,0-0.2,0-0.3,0c-2.7,1.3-5.4,2.7-8,4c-0.2,0.1-0.4,0.3-0.4,0.5C414,196.9,414,198.3,414,199.7 M414,206.8
                        c2.9-1.4,5.6-2.8,8.4-4.2c0.1-0.1,0.3-0.3,0.3-0.4c0-1.4,0-2.9,0-4.4c-2.8,1.4-5.4,2.7-8.1,4c-0.1,0.1-0.2,0.1-0.3,0.2
                        c-0.1,0.2-0.3,0.4-0.3,0.6C414,203.9,414,205.3,414,206.8 M422.7,204.8c-0.1,0-0.2,0-0.2,0c-2.7,1.3-5.4,2.7-8.1,4.1
                        c-0.2,0.1-0.3,0.3-0.3,0.5c0,1.4,0,2.8,0,4.2c0.1,0,0.2,0,0.2,0c2.7-1.3,5.4-2.7,8.1-4c0.2-0.1,0.3-0.3,0.3-0.5
                        C422.7,207.7,422.7,206.2,422.7,204.8 M422.7,178.4c-1.3,1.4-2.7,2.1-4.4,2.1c-1.7,0-3.1-0.8-4.3-2.1v7.4c2.8-1.4,5.6-2.8,8.3-4.2
                        c0.2-0.1,0.3-0.3,0.3-0.5C422.7,180.4,422.7,179.5,422.7,178.4 M453.4,193.5c0.2-1.8-0.4-2.4-2.1-2.2c-3.1,0.4-5.5,1.9-6.7,4.8
                        c-0.9,2.1-1.4,4.3-2.1,6.5c1.4,0.1,2-0.2,2.3-1.4c0.4-1.4,0.8-2.8,1.2-4.2c0.7-2.3,2.6-3.7,5-3.7
                        C451.8,193.3,452.5,193.4,453.4,193.5 M403.9,193.5c0.3-1.7-0.4-2.4-2.1-2.2c-3.4,0.4-5.8,2.2-7.1,5.4c-0.5,1.2-0.8,2.5-1.2,3.7
                        c-0.2,0.7-0.4,1.4-0.6,2.1c1.4,0.1,1.9-0.3,2.3-1.5c0.4-1.3,0.8-2.7,1.2-4c0.7-2.5,2.6-3.9,5.2-3.8
                        C402.4,193.3,403.2,193.4,403.9,193.5 M414.1,223.9h8.6v-5.3c-0.3,0.1-0.6,0.2-0.8,0.4c-2.4,1.2-4.7,2.4-7.1,3.5
                        C414.1,222.8,413.9,223.2,414.1,223.9 M441.7,173.9c-0.2,1.8,0.1,3.2,1.7,4.2c1.2,0.7,2.5,0.7,3.7-0.1c1.4-1,1.7-2.4,1.5-4
                        c-0.2,0-0.4,0-0.5,0C445.9,173.9,443.8,173.9,441.7,173.9 M415,173.9c-0.3,1.9,0.3,3.3,1.6,4.1c1.2,0.7,2.7,0.7,3.8-0.2
                        c1.3-1,1.6-2.4,1.4-3.9H415z M395.1,173.9h-6.8c-0.2,1.7,0.1,3.1,1.6,4.1c1.2,0.8,2.5,0.8,3.7,0
                        C395,177.1,395.2,175.6,395.1,173.9 M406,173.9c-0.2,1.8,0.1,3.3,1.7,4.2c1.3,0.7,2.5,0.6,3.7-0.2c1.4-1,1.6-2.4,1.4-4H406z
                        M430.7,174h-6.8c-0.2,2.7,1.1,4.5,3.4,4.5C429.5,178.5,430.8,176.8,430.7,174 M450.6,173.9c-0.2,1.7,0.1,3.2,1.6,4.1
                        c1.2,0.7,2.7,0.6,3.8-0.2c1.1-0.9,1.6-2.4,1.2-3.9H450.6z M439.6,173.9h-6.8c-0.2,1.7,0.1,3.2,1.7,4.1c1.2,0.7,2.5,0.7,3.6-0.1
                        C439.5,177,439.8,175.6,439.6,173.9 M379.3,173.9c-0.2,1.7,0.1,3.2,1.7,4.1c1.2,0.7,2.5,0.7,3.7-0.2c1.4-0.9,1.6-2.3,1.4-3.9
                        H379.3z M397.2,173.9c-0.2,1.7,0.1,3.2,1.6,4.1c1.2,0.7,2.7,0.6,3.8-0.2c1.1-0.9,1.6-2.4,1.2-3.9H397.2z M382.8,204.8
                        c-1.6,0.1-3.2,1.5-3.4,3.3c-0.2,1.6,0,3.2,0,4.9c1.2-0.4,1.9-1.4,1.9-2.8C381.2,208.2,381.5,206.4,382.8,204.8 M428.7,213
                        c1.3-0.5,2-1.4,2-2.8c-0.1-2,0.2-3.8,1.6-5.4c-1.8,0.1-3.4,1.9-3.5,3.8C428.7,210.1,428.7,211.5,428.7,213" />
                  <path class="st12"
                    d="M388.6,152.2c0,1.7-1.4,3-3,3c-1.6,0-3-1.4-3-3c0-1.7,1.4-3,3-3C387.3,149.2,388.6,150.5,388.6,152.2
                        M385.7,153.2c0.6-0.1,1-0.4,1-1c0-0.6-0.4-1-1-0.9c-0.6,0-0.9,0.4-0.9,1C384.7,152.8,385,153.1,385.7,153.2" />
                  <path class="st12"
                    d="M380.3,185.3c1.7,0,3,1.3,3,3c0,1.6-1.3,3-3,3c-1.7,0-3-1.3-3-3C377.3,186.6,378.6,185.3,380.3,185.3
                        M380.3,187.3c-0.6,0.1-1,0.4-1,1c0,0.6,0.3,1,0.9,1c0.6,0,1-0.3,1.1-0.9C381.3,187.7,380.9,187.4,380.3,187.3" />
                  <path class="st12"
                    d="M460.8,157.5c0,1.7-1.4,3-3.1,3c-1.6,0-3-1.4-3-3c0-1.7,1.4-3,3.1-3C459.4,154.6,460.8,155.9,460.8,157.5
                        M458.8,157.5c-0.1-0.6-0.4-1-1-0.9c-0.6,0-0.9,0.4-1,0.9c0,0.6,0.3,1,1,1C458.4,158.5,458.7,158.1,458.8,157.5" />
                  <path class="st12"
                    d="M443.1,145.2c1.6,0,3,1.4,3,3c0,1.7-1.4,3-3,3c-1.6,0-3-1.4-3-3C440.1,146.5,441.4,145.2,443.1,145.2
                        M443.2,147.2c-0.6,0-1,0.3-1.1,0.9c0,0.6,0.3,1,0.9,1c0.6,0.1,1-0.3,1.1-0.9C444.1,147.7,443.7,147.3,443.2,147.2" />
                </g>
                <!-- 島嶼3 凍骨冰山島-->
                <g class="st1 island"  @click="svgMoveLeft('凍骨冰山島')" id="island3" data-message="凍骨冰山島" data-content="冰山島好好玩">
                  <defs>
                    <path id="SVGID_19_"
                      d="M347.3,417.1c6.4-1.9,13.1-2.9,19.9-2.9c24.7,0,47.6,13.4,59.9,34.8l14.4,25.4c1.2,1.8,3,2.9,5.2,2.9
                          c1,0,2.8-0.2,4.3-1.9l9.7-10.6c3.9-4.3,9.4-6.7,15.2-6.7c8.5,0,16,5,19.2,12.9l16.7,38.6c1.6,4.5,3.5,9.8,5.9,15.9
                          c1,2.5,2.4,6.1,5.7,7.4c0.6,0.3,2.1,0.8,3.4,0.1c1.6-0.9,1.7-3,1.7-3.2c4.2-67.3,8.3-134.5,12.5-201.8l-197.7-4.6L347.3,417.1z" />
                  </defs>
                  <clipPath id="SVGID_20_">
                    <use xlink:href="#SVGID_19_" style="overflow:visible;" />
                  </clipPath>
                  <path class="st13" d="M525.3,531.9c-0.6,0-1.2-0.2-1.4-0.4c-2.7-1.1-4-4.4-4.8-6.6c-2.1-5.3-4-10.6-5.9-15.8c0,0,0-0.1,0-0.1
                        l-16.7-38.6c-3.4-8.4-11.5-13.8-20.6-13.8c-6.2,0-12.2,2.6-16.3,7.2l-9.7,10.6c-0.8,1-1.9,1.4-3.2,1.4c-2,0-3.2-1.2-3.9-2.2
                        l-14.4-25.4c-12.6-21.9-36.1-35.6-61.2-35.6c-6.2,0-12.4,0.8-18.5,2.4l-3.9-90.1l194.5,4.5L527,529.8c0,0-0.1,1.5-1,2
                        C525.8,531.9,525.6,531.9,525.3,531.9" />
                  <path class="st14" d="M346.4,326.6l191.4,4.5l-5.9,94.7l-6.4,103.9c0,0.2-0.1,0.6-0.2,0.7c-0.3,0-0.7-0.2-0.8-0.2
                        c-2.1-0.9-3.3-3.8-4-5.8c-2.1-5.3-4-10.6-5.9-15.8c0-0.1,0-0.1-0.1-0.2l-16.7-38.6c-3.6-9-12.3-14.7-22-14.7
                        c-6.6,0-13,2.8-17.4,7.7l-9.7,10.6c0,0,0,0,0,0c-0.5,0.6-1.2,0.9-2,0.9c-1.1,0-2-0.5-2.6-1.5l-14.3-25.3
                        c-12.9-22.4-36.8-36.3-62.5-36.3c-5.7,0-11.5,0.7-17.1,2L346.4,326.6 M343.3,323.5l4,93.6c6.4-1.9,13.1-2.9,19.9-2.9
                        c24.7,0,47.6,13.4,59.9,34.8l14.4,25.4c1.2,1.8,3,2.9,5.2,2.9c1,0,2.8-0.2,4.3-1.9l9.7-10.6c3.9-4.3,9.4-6.7,15.2-6.7
                        c8.5,0,16,5,19.2,12.9l16.7,38.6c1.6,4.5,3.5,9.8,5.9,15.9c1,2.5,2.4,6.1,5.7,7.4c0.4,0.2,1.2,0.5,2,0.5c0.5,0,1-0.1,1.4-0.4
                        c1.6-0.9,1.7-3,1.7-3.2c4.2-67.3,8.3-134.5,12.5-201.8L343.3,323.5z" />
                  <path class="st15" d="M392.3,370.8c0.4,0.2,0.5,0.4,0.5,0.9c0,0.6,0,1.2,0,1.9c0.1-0.1,0.1-0.1,0.2-0.1c0.5-0.4,1-0.7,1.5-1.1
                        c0.2-0.2,0.5-0.2,0.8,0c0.3,0.2,0.4,0.4,0.3,0.7c0,0.2-0.2,0.4-0.3,0.5c-0.8,0.6-1.5,1.1-2.3,1.7c-0.1,0.1-0.1,0.2-0.1,0.2
                        c0,1.2,0,2.4,0,3.7c0,0,0,0.1,0,0.1c0.1,0,0.1,0,0.2-0.1c1-0.6,2.1-1.2,3.1-1.9c0.1,0,0.1-0.1,0.1-0.2c0.1-0.9,0.2-1.9,0.3-2.8
                        c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.4,0.7,0.8c-0.1,0.6-0.1,1.3-0.2,1.9c0,0,0,0,0,0.1c0.1,0,0.1-0.1,0.2-0.1
                        c0.5-0.3,1-0.6,1.6-0.9c0.3-0.2,0.7-0.1,0.9,0.2c0.2,0.3,0.2,0.7,0,0.9c-0.1,0.1-0.1,0.1-0.2,0.2c-0.5,0.3-1,0.6-1.5,0.9
                        c-0.1,0-0.1,0.1-0.2,0.1c0.6,0.3,1.2,0.5,1.8,0.8c0.3,0.1,0.5,0.5,0.5,0.8c-0.1,0.4-0.5,0.7-1,0.5c-0.9-0.4-1.8-0.7-2.7-1.1
                        c-0.1,0-0.2,0-0.3,0c-1.1,0.6-2.1,1.3-3.2,1.9c0,0-0.1,0-0.1,0.1c0.1,0,0.1,0.1,0.1,0.1c1,0.6,2.1,1.2,3.1,1.9
                        c0.1,0.1,0.2,0.1,0.3,0c0.9-0.4,1.8-0.7,2.7-1.1c0.3-0.1,0.7,0,0.9,0.3c0.2,0.3,0.1,0.7-0.2,0.9c-0.1,0.1-0.2,0.1-0.3,0.2
                        c-0.6,0.2-1.2,0.5-1.8,0.7c0.1,0,0.1,0.1,0.2,0.1c0.5,0.3,1.1,0.6,1.6,1c0.3,0.2,0.4,0.4,0.3,0.7c-0.1,0.3-0.3,0.5-0.5,0.5
                        c-0.2,0-0.4,0-0.5-0.1c-0.5-0.3-1-0.6-1.5-0.9c-0.1,0-0.1-0.1-0.2-0.1c0,0.4,0.1,0.8,0.1,1.2c0,0.3,0.1,0.6,0.1,0.8
                        c0,0.4-0.2,0.7-0.6,0.7c-0.4,0.1-0.7-0.2-0.8-0.6c-0.1-0.5-0.1-1.1-0.2-1.6c0-0.4-0.1-0.9-0.1-1.3c0-0.1,0-0.1-0.1-0.2
                        c-1.1-0.6-2.1-1.3-3.2-1.9c0,0,0,0-0.1,0c0,0.1,0,0.1,0,0.2c0,1.2,0,2.4,0,3.6c0,0.1,0,0.2,0.1,0.3c0.8,0.6,1.5,1.1,2.3,1.7
                        c0.3,0.2,0.4,0.5,0.3,0.8c-0.1,0.5-0.7,0.6-1.1,0.4c-0.5-0.4-1-0.7-1.5-1.1c0,0-0.1-0.1-0.2-0.1v1.2c0,0.3,0,0.5,0,0.8
                        c0,0.4-0.3,0.7-0.7,0.7s-0.7-0.3-0.7-0.7c0-0.6,0-1.2,0-1.9c0,0,0-0.1,0-0.1c-0.1,0-0.1,0.1-0.1,0.1c-0.5,0.4-1,0.8-1.5,1.1
                        c-0.2,0.2-0.6,0.2-0.8,0c-0.2-0.2-0.4-0.5-0.3-0.7c0.1-0.2,0.2-0.3,0.3-0.4c0.8-0.6,1.5-1.1,2.3-1.7c0.1-0.1,0.1-0.2,0.1-0.2
                        c0-1.2,0-2.4,0-3.6c0,0,0-0.1,0-0.2c-0.1,0-0.1,0.1-0.2,0.1c-1,0.6-2,1.2-3,1.8c-0.1,0.1-0.2,0.2-0.2,0.3
                        c-0.1,0.9-0.2,1.9-0.3,2.8c0,0.4-0.4,0.7-0.7,0.6c-0.4,0-0.6-0.3-0.6-0.8c0-0.6,0.1-1.1,0.2-1.7c0-0.1,0-0.2,0-0.4
                        c-0.1,0-0.1,0.1-0.2,0.1c-0.5,0.3-1,0.6-1.6,0.9c-0.3,0.2-0.5,0.1-0.8,0c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.2,0.2-0.4,0.4-0.5
                        c0.5-0.3,1-0.6,1.5-0.9c0.1,0,0.1-0.1,0.2-0.1c-0.2-0.1-0.4-0.2-0.6-0.2c-0.4-0.2-0.9-0.3-1.3-0.5c-0.3-0.1-0.5-0.4-0.4-0.7
                        c0-0.3,0.2-0.5,0.5-0.6c0.2,0,0.4,0,0.5,0c0.9,0.3,1.8,0.7,2.7,1.1c0.1,0,0.2,0,0.2,0c1.1-0.6,2.2-1.3,3.2-1.9c0,0,0,0,0.1-0.1
                        c-0.1,0-0.1-0.1-0.1-0.1c-1-0.6-2.1-1.3-3.1-1.9c-0.1-0.1-0.2-0.1-0.3,0c-0.9,0.4-1.8,0.7-2.6,1.1c-0.2,0.1-0.4,0.1-0.5,0
                        c-0.3-0.1-0.5-0.3-0.5-0.6c0-0.3,0.1-0.6,0.4-0.7c0.6-0.2,1.1-0.5,1.7-0.7c0.1,0,0.1-0.1,0.2-0.1c-0.2-0.1-0.3-0.2-0.4-0.3
                        c-0.4-0.3-0.9-0.5-1.3-0.8c-0.4-0.2-0.5-0.6-0.3-1c0.2-0.3,0.6-0.4,1-0.2c0.5,0.3,1,0.6,1.5,0.9c0.1,0,0.1,0.1,0.2,0.1
                        c0-0.3,0-0.5-0.1-0.7c0-0.4-0.1-0.9-0.1-1.3c0-0.3,0.2-0.6,0.5-0.7c0.4-0.1,0.8,0.2,0.8,0.6c0.1,0.7,0.1,1.4,0.2,2.1
                        c0,0.3,0.1,0.6,0.1,0.9c0,0.1,0.1,0.2,0.1,0.2c1.1,0.6,2.1,1.3,3.2,1.9c0,0,0,0,0.1,0V379c0-1.2,0-2.4,0-3.5c0-0.1,0-0.2-0.1-0.3
                        c-0.8-0.6-1.5-1.1-2.3-1.7c-0.3-0.2-0.4-0.6-0.2-0.9c0.2-0.4,0.7-0.4,1-0.2c0.5,0.4,1,0.7,1.5,1.1c0,0,0.1,0.1,0.2,0.1
                        c0-0.1,0-0.1,0-0.2c0-0.6,0-1.1,0-1.7c0-0.4,0.1-0.7,0.5-0.8H392.3z" />
                  <path class="st15" d="M497.1,406.1c-0.7,1.8-2,2.4-3.9,2.4c-22.4,0-44.8,0-67.2,0c-0.3,0-0.6,0-1,0c-0.8-0.1-1.4-0.6-1.3-1.4
                        c0-0.7,0.6-1.2,1.3-1.2c0.9,0,1.7,0,2.7,0v-6.3h-12.9v6.3c1.2,0,2.5,0,3.7,0c0.4,0,0.9,0.1,1.2,0.4c0.3,0.3,0.5,0.9,0.3,1.2
                        c-0.2,0.4-0.7,0.8-1.1,0.9c-0.8,0.2-1.6,0.1-2.4,0.1c-1.9,0-3.9,0-5.8,0c-2.2,0-3.4-1.2-3.4-3.4c0-4,0-8.1,0-12.1
                        c0.1-17.6,11.7-32.6,28.7-37c6.2-1.6,12.5-1.6,18.7-0.1c1.2,0.3,1.7,0.8,1.5,1.7c-0.2,0.9-0.9,1.2-2.1,0.9
                        c-8.8-2.1-17.3-1.1-25.4,3.2c-1.1,0.6-2.2,1.3-3.3,2c-0.2,0.1-0.5,0.5-0.5,0.7c0.1,2.6,0.2,5.2,1,7.7c0.2,0.8,0.4,1.7,1.4,1.9
                        c0.9,0.1,1.4-0.7,1.9-1.4c0.8-1.1,1.5-2.3,2.3-3.4c2.6-3.5,6.2-4,9.6-1.2c2.3,1.8,3.8,4.3,5.2,6.8c1.3,2.3,2.6,4.6,3.9,6.9
                        c0.3,0.5,0.7,1,1,1.5c0.7,1,1.4,1.1,2.5,0.1c0.5-0.5,0.9-1.2,1.2-1.9c0.7-1.9,1.2-3.8,1.8-5.7c1.1-3.4,2.6-6.5,5.5-8.7
                        c1.3-1,2.8-1.8,4.3-2.7c-1.6-1-3.3-2-4.9-2.9c-0.4-0.3-0.9-0.4-1.3-0.7c-0.9-0.5-1.2-1.1-0.8-1.9c0.4-0.7,1.1-0.9,2-0.5
                        c2.8,1.3,5.4,2.9,7.8,4.8c7.1,5.7,11.6,13,13.6,21.9c0.1,0.6,0.4,0.7,0.9,0.7c1.5,0,3,0,4.6,0c4.2,0.1,7.6,3,8.4,7.2
                        c0,0.1,0.1,0.3,0.2,0.4V406.1z M484.6,389.5c-1.5,1.2-2.3,2.6-2.4,4.5c0,0.9,0,1.8,0,2.6c0,0.9-0.6,1.4-1.4,1.4
                        c-0.7,0-1.2-0.6-1.2-1.4c0-0.6,0-1.3,0-1.9c0-2.2,0.6-4.2,2.1-6c0.1-0.1,0.1-0.3,0.3-0.5c-2.6,0-5.2,0-7.7,0
                        c-3.7,0-6.3,2.6-6.3,6.3c0,3.4,0,6.9,0,10.3c0,0.8,0.3,1,1,1c3.3,0,6.6,0,9.9,0c0.3,0,0.5,0,0.8-0.1c0-0.9,0-1.8,0-2.7
                        c0-1,0.5-1.5,1.3-1.6c0.8,0,1.3,0.6,1.3,1.5c0,0.7,0,1.4,0,2.1c0,0.2,0.3,0.6,0.5,0.6c1.4,0.1,2.8,0,4.1,0
                        c0.1-0.1,0.1-0.2,0.1-0.2c0-4.1,0.1-8.1-0.1-12.2C486.9,391.8,485.9,390.5,484.6,389.5 M430.5,405.8h12.9v-6.3h-12.9V405.8z
                        M459,399.5h-12.9v6.3H459V399.5z M487.3,388.4c1.9,2.1,2.4,4.5,2.4,7.1c-0.1,3.1,0,6.2,0,9.4v1c1.5,0,2.9,0,4.3,0
                        c0.2,0,0.5-0.5,0.6-0.8c0-3.7,0.1-7.3,0-11C494.4,390.4,490.9,387.6,487.3,388.4 M443.4,382h-12.9v6h12.9V382z M414.9,388h12.9v-6
                        h-12.9V388z M435.3,390.8h-12.9v6h12.9V390.8z M438,396.7h12.9v-6H438V396.7z M453.7,396.8H465c0.2-2,0.4-4,0.6-6h-12V396.8z
                        M461.8,382v6.1c1.9,0,3.8,0,5.7,0c0.3,0,0.6-0.2,0.8-0.4c1.3-1,2.7-1.7,4.3-2c0.7-0.1,1.3-0.1,2-0.1V382H461.8z M435.3,379.3v-6
                        c-1.7-0.2-3.5-0.5-4.4,1.5c0,0.1-0.1,0.1-0.2,0.2c-2.2,2.4-5,2-6.5-0.9c-0.5-0.9-1-1-1.9-0.8v6H435.3z M419.7,390.8h-9.5v6h9.5
                        V390.8z M469.3,373.2v6h9.5c-1.1-2-2.1-3.9-3.2-5.7c-0.1-0.2-0.4-0.3-0.5-0.3C473.2,373.2,471.3,373.2,469.3,373.2 M459.1,382.1
                        c-0.8-0.2-1.3-0.1-1.7,0.7c-0.4,0.9-1,1.8-1.7,2.5c-1.9,1.8-4.4,1.6-6.1-0.4c-0.5-0.6-1.1-1.3-1.4-2c-0.5-0.9-1.1-1.1-2-0.8v6
                        h12.9V382.1z M458.6,379.3h8v-6c-1.8,0-3.6,0-5.4,0c-0.2,0-0.4,0.2-0.5,0.4C460,375.5,459.3,377.3,458.6,379.3 M438,379.3h8.2
                        c-1.2-2-2.3-3.9-3.4-5.7c-0.1-0.1-0.3-0.3-0.4-0.3c-1.4,0-2.9,0-4.4,0V379.3z M412.7,379.3h7v-6c-1.1,0-2.2,0-3.3,0
                        c-0.2,0-0.4,0.1-0.5,0.3C414.9,375.4,413.8,377.2,412.7,379.3 M462.6,370.5h10.6c0.1-0.1,0.1-0.2,0.2-0.3
                        c-1.5-1.4-2.9-2.7-4.4-4.1C466.8,367.4,464.3,368.3,462.6,370.5 M461.8,405.8h3.4v-6.3h-3.4V405.8z M412.2,399.5h-2.1v4.7
                        c0,1.8,0,1.8,1.8,1.6c0.1,0,0.2-0.1,0.3-0.1V399.5z M423.1,370.6c-0.2-1.6-0.3-3-0.5-4.7c-1.6,1.6-3,3.1-4.6,4.7H423.1z
                        M480.6,385.5c-0.3-1.1-0.6-2.2-0.9-3.2c0-0.1-0.3-0.3-0.4-0.3c-0.6,0-1.2,0-1.9,0v3.6H480.6z M434,370.5h6.2
                        C438.4,368.2,435.5,368.2,434,370.5 M412.1,388v-6c-0.1,0-0.2,0-0.3,0c-0.7,1.9-1.1,4-1.4,6.1H412.1z" />
                  <path class="st15" d="M453.9,364.5c-0.3,0.5-0.4,1-0.6,1c-1.2,0.2-1.1,1.9-2.4,1.9c-0.2,0-0.5,0-0.6-0.1c-0.6-0.7-1.3-1.4-2-2
                        c-0.5-0.6-0.1-1.5,0.7-1.8c0.3-0.1,0.4-0.4,0.7-0.6c0.4-0.3,0.7-0.7,1.2-0.9c0.6-0.2,1,0.3,1.3,0.8c0.1,0.3,0.5,0.5,0.7,0.7
                        C453.2,363.7,453.5,364.1,453.9,364.5" />
                  <path class="st15"
                    d="M488.4,375.9c-0.5-0.4-0.9-0.8-1.2-1.1c-0.2-0.2-0.5-0.5-0.7-0.7c-0.3-0.4-0.8-0.8-0.8-1.3
                        c0-0.4,0.4-0.9,0.8-1.1c0.4-0.2,0.5-0.4,0.7-0.7c0.3-0.4,0.8-0.8,1.2-0.8c0.4,0,1,0.4,1.2,0.8c0.2,0.4,0.4,0.5,0.7,0.7
                        c0.4,0.3,0.8,0.8,0.8,1.2c0,0.4-0.4,0.9-0.8,1.2c-0.4,0.2-0.6,0.4-0.8,0.8C489.3,375.3,488.9,375.5,488.4,375.9" />
                  <path class="st15" d="M474.8,346.1c0.5,0.3,1,0.4,1.1,0.6c0.2,1.2,1.9,1.1,1.8,2.3c0,0.4-0.4,0.9-0.7,1.2
                        c-0.3,0.2-0.6,0.4-0.9,0.8c-0.2,0.4-0.8,0.8-1.2,0.7c-0.4,0-0.8-0.5-1.2-0.8c-0.2-0.2-0.4-0.4-0.6-0.7c-0.3-0.4-0.8-0.8-0.8-1.3
                        c0-0.4,0.6-0.8,0.9-1.2c0.2-0.2,0.4-0.4,0.6-0.6C474.1,346.8,474.4,346.5,474.8,346.1" />
                  <path class="st15" d="M432.5,350.7c-0.5-0.5-0.8-0.8-1.2-1.2c-0.2-0.2-0.5-0.4-0.7-0.7c-0.3-0.4-0.8-0.8-0.8-1.3
                        c0-0.4,0.5-0.8,0.8-1.2c0.2-0.3,0.4-0.5,0.7-0.7c0.4-0.3,0.8-0.8,1.2-0.8c0.4,0,0.8,0.5,1.2,0.8c0.3,0.2,0.5,0.5,0.7,0.7
                        c0.3,0.4,0.8,0.8,0.8,1.2c0,0.4-0.4,1-0.8,1.2c-0.4,0.2-0.6,0.4-0.8,0.8C433.5,350,433,350.2,432.5,350.7" />
                  <path class="st15" d="M444.3,347.3c0.7,0,1.3,0.6,1.3,1.3c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.6-1.3-1.3
                        C443,347.9,443.6,347.3,444.3,347.3" />
                  <path class="st15" d="M454.2,345.6c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.5-1.3-1.3c0-0.7,0.5-1.4,1.3-1.4
                        C453.6,344.3,454.2,344.9,454.2,345.6" />
                  <path class="st15" d="M482.2,360.3c0,0.7-0.7,1.3-1.4,1.3c-0.7,0-1.2-0.6-1.2-1.3c0-0.8,0.6-1.3,1.3-1.3
                        C481.6,359,482.2,359.6,482.2,360.3" />
                  <path class="st15" d="M416.2,356.1c0.8,0,1.3,0.6,1.3,1.3c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.6-1.3-1.3
                        C414.9,356.7,415.5,356.2,416.2,356.1" />
                  <path class="st15" d="M465,352.4c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.6-1.3-1.4c0-0.8,0.6-1.3,1.4-1.3
                        C464.5,351.1,465,351.7,465,352.4" />
                </g>
                <!-- 島嶼4 慢活樂園島-->
                <g class="st1 island"  @click="svgMoveLeft('慢活樂園島')" id="island4" data-message="慢活樂園島" data-content="樂園島好好玩">
                  <defs>
                    <path id="SVGID_21_"
                      d="M561.8,121.2c-4.5,3-10.6,6.4-18.3,8.7c-7.7,2.2-13.2,2.1-14.7,2.3c-8.8,1.3-17.2,35.4-16.7,172l45.2,1.1
                          c1.9,0,3.7,0.8,5,2.2c1.2,1.4,1.9,3.3,1.8,5.2l-3.5,51.6l193.2,12.5c0.4-2.8,0.6-5.7,0.7-8.5c1.2-32.3-10.5-59.8-22.8-79.5
                          c-17.8-27.8-36.2-60.3-53.6-97.6c-14.3-30.8-25.6-59.9-34.5-86.6c-0.9-4.3-5.2-7.3-9.7-6.5c-1.3,0.2-2.6,0.3-3.9,0.3
                          c-5.4,0-9.3-2.4-14.1-5.1c-7.4-4.2-11.2-6.4-14.1-6.7c-0.3,0-0.7-0.1-1-0.1C589.8,86.5,584.7,105.8,561.8,121.2" />
                  </defs>
                  <clipPath id="SVGID_22_">
                    <use xlink:href="#SVGID_21_" style="overflow:visible;" />
                  </clipPath>
                  <path class="st16" d="M562.2,362.8l3.4-50.1c0.1-2.3-0.7-4.5-2.2-6.3c-1.6-1.7-3.8-2.7-6.1-2.7l-43.7-1.1
                        c-0.5-144.9,9.5-168.1,15.4-169c0.3,0,0.7-0.1,1.3-0.1c2.6-0.2,7.3-0.5,13.5-2.3c6.5-1.9,12.6-4.8,18.8-8.9
                        c11.5-7.7,18.5-16.3,24.1-23.1c5.4-6.6,9.2-11.3,14.1-11.3c0.3,0,0.6,0,0.8,0c2.6,0.3,6.2,2.3,13.5,6.5l0.7,0.4
                        c4.6,2.7,8.6,4.9,14.2,4.9c1.4,0,2.8-0.1,4.1-0.3c0.4-0.1,0.8-0.1,1.2-0.1c3.3,0,6.1,2.3,6.8,5.4c0,0.1,0,0.1,0,0.2
                        c9.9,29.5,21.5,58.7,34.6,86.8c15.6,33.6,33.7,66.5,53.7,97.7c10.9,17.5,23.8,45.4,22.6,78.6c-0.1,2.6-0.3,4.9-0.5,7L562.2,362.8z
                        " />
                  <path class="st17"
                    d="M600.8,86.5v3c0.2,0,0.5,0,0.7,0c2.3,0.2,6,2.4,12.9,6.3l0.7,0.4c4.6,2.6,9,5.1,14.9,5.1
                        c1.4,0,2.9-0.1,4.4-0.3c0,0,0,0,0.1,0c0.3-0.1,0.6-0.1,0.9-0.1c2.5,0,4.8,1.8,5.3,4.2c0,0.1,0.1,0.2,0.1,0.3
                        c9.9,29.5,21.5,58.8,34.7,87c15.7,33.7,33.7,66.6,53.7,97.9c15.8,25.3,23.3,51.4,22.3,77.8c-0.1,2-0.2,3.8-0.3,5.4l-187.4-12.1
                        l3.3-48.6c0.1-2.6-0.8-5.3-2.5-7.3c0,0-0.1-0.1-0.1-0.1c-1.9-2-4.5-3.1-7.2-3.2l-42.2-1c-0.2-60.8,1.5-105.6,4.8-133.4
                        c3.8-31,8.8-32.6,9.3-32.7c0.2,0,0.7-0.1,1.2-0.1c2.4-0.2,7.5-0.5,13.8-2.3c6.6-1.9,12.9-4.9,19.2-9.1
                        c11.7-7.8,18.7-16.5,24.4-23.4c5.1-6.3,8.8-10.8,12.9-10.8L600.8,86.5 M600.8,86.5c-10.9,0-16.1,19.4-39,34.7
                        c-4.5,3-10.6,6.4-18.3,8.7c-7.7,2.2-13.2,2.1-14.7,2.3c-8.8,1.3-17.2,35.4-16.7,172l45.2,1.1c1.9,0,3.7,0.8,5,2.2
                        c1.2,1.4,1.9,3.3,1.8,5.2l-3.5,51.6l193.2,12.5c0.4-2.8,0.6-5.7,0.7-8.5c1.2-32.3-10.5-59.8-22.8-79.5
                        c-17.8-27.8-36.2-60.3-53.6-97.6c-14.3-30.8-25.6-59.9-34.5-86.6c-0.8-3.8-4.3-6.6-8.2-6.6c-0.5,0-1,0-1.5,0.1
                        c-1.3,0.2-2.6,0.3-3.9,0.3c-5.4,0-9.3-2.4-14.1-5.1c-7.4-4.2-11.2-6.4-14.1-6.7C601.4,86.5,601.1,86.5,600.8,86.5" />
                  <path class="st18"
                    d="M565.4,256c0.6-1.7,2-2.1,3.5-2.3c4.4-0.3,8.1,1.9,9.8,6c0.2,0.5,0.5,0.6,1,0.6c2.4-0.1,4.6,0.4,6.1,2.3
                        c0.7,0.9,1.2,1.9,1.6,3c0.3,0.7-0.1,1.4-0.8,1.6c-0.7,0.2-1.2-0.1-1.6-0.9c-1.1-2.8-2.3-3.6-5.3-3.6c-0.5,0-0.9,0-1.4,0
                        c-1.1,0-1.4-0.2-1.7-1.3c-0.5-1.8-1.5-3.2-3.1-4.2c-1.6-1-3.3-1.3-5.1-0.9c-0.2,0-0.6,0.4-0.6,0.6c0,2.2-0.1,4.5,0.1,6.7
                        c0.2,2.9,2.4,4.9,5.4,4.9c7.4,0.1,14.8,0,22.1,0c2.4,0,4.3-1.7,4.6-3.9c0.2-2.4-1.1-4.5-3.4-5c-1-0.2-2-0.1-3-0.1
                        c-1.4,0-1.6-0.2-2-1.5c-1.1-3.8-4.9-5.9-8.7-4.8c-1.3,0.4-1.5,0.3-2.3-0.8c-2.7-3.6-8-3.8-10.9-0.4c-0.8,0.9-1.5,1.1-2.1,0.6
                        c-0.6-0.5-0.5-1.3,0.2-2.2c3-3.5,8.2-4.3,12.2-1.8c0.2,0.1,0.4,0.2,0.7,0.4c0.6-1.3,1.2-2.6,1.8-3.9c-0.8-0.5-1.6-1-2.4-1.6
                        c-0.8-0.5-1-1.2-0.6-1.9c0.4-0.6,1.1-0.7,2-0.2c0.6,0.4,1.2,0.8,1.8,1.2c0.1,0,0.1,0.1,0.3,0.1c0.5-1.2,1-2.3,1.6-3.5
                        c-5.8-3.9-9.1-9.2-9.2-16.2c-0.1-5.3,1.8-9.8,5.6-13.5c7.7-7.7,19.8-7.2,27.1,0.2c2.7,2.8,4.4,6.1,5.1,10c0.6,3.8,0.2,7.5-1.4,11
                        c-1.6,3.5-4.1,6.3-7.5,8.4c0.5,1.2,1.1,2.3,1.6,3.6c0.7-0.4,1.3-0.9,2-1.2c0.8-0.5,1.5-0.4,1.9,0.2c0.4,0.6,0.2,1.3-0.5,1.8
                        c-0.7,0.5-1.5,1-2.3,1.5c1,2.3,2,4.5,3,6.7c0.1,0.1,0.2,0.3,0.3,0.3c0.8-0.1,1.7,0.1,2.5-0.3c4.3-1.9,8.1-4.7,11.3-8.2
                        c0.7-0.8,1.5-1.4,2.5-1.6c1.6-0.3,2.8,0.3,3.9,1.4c1.4,1.4,2.8,2.7,4.3,4c2.2,1.9,4.7,3.3,7.3,4.6c0.5,0.2,0.9,0.6,1.4,0.9v15.9
                        c-0.4,1.1-1.2,1.9-2.3,2.3h-14.2c-0.7-0.4-0.8-1.1-0.8-1.8c0-1.6,0-3.2,0-4.8v-2.6c-0.1,0-0.1,0-0.2-0.1c-1.9,2.2-3.8,4.4-5.8,6.8
                        c1.1,0,2,0,2.9,0c0.9,0,1.5,0.7,1.2,1.5c-0.1,0.3-0.5,0.6-0.7,0.9h-16.4c-0.3-0.3-0.6-0.5-0.7-0.8c-0.3-0.8,0.3-1.6,1.3-1.6
                        c1.2,0,2.4,0,3.6,0v-5.8c-2.2,0-4.4,0-6.5,0c-1.1,0-1.7-0.4-1.7-1.2c0-0.8,0.6-1.2,1.7-1.2c0.6,0,1.3,0,1.9,0h4.6v-5.8h-0.9
                        c-4.5,0-9.1,0-13.6,0c-0.3,0-0.6,0-0.8,0c-0.6-0.1-1-0.5-1.1-1.1c-0.1-0.6,0.3-1.1,0.9-1.3c0.3-0.1,0.6-0.1,0.8-0.1
                        c3.3,0,6.6,0,10,0h0.9c-0.9-2.1-1.8-4-2.7-6c-3.3,1.4-6.8,2.1-10.3,2.1c-3.5,0-6.9-0.7-10.2-2.1c-0.7,1.6-1.4,3-2,4.5
                        c0.2,0,0.3,0,0.3,0c4.1-0.8,7.9,0.9,10,4.4c0.4,0.6,0.5,1.5,1.1,1.8c0.6,0.3,1.5,0.1,2.2,0.2c4.7,0.4,7.7,5.5,5.7,9.8
                        c-0.3,0.6-0.6,1.1-0.9,1.7c0.7,0,1.4,0,2,0c0.8,0,1.4,0.8,1.1,1.5c-0.1,0.4-0.5,0.6-0.7,0.9h-31.2c-0.1,0-0.2-0.1-0.3-0.1
                        c-1.9-0.4-3.4-1.3-4.6-2.8c-0.9-1.1-1.4-2.5-1.8-3.8V256z M603.6,236.8c5.6-3.3,9-10.5,7.4-17.6c-1.7-7.5-8.3-12.9-16.2-12.9
                        c-7.8,0-14.4,5.3-16.1,13c-1.6,7.1,1.9,14.2,7.4,17.4c0.1-0.2,0.2-0.5,0.3-0.7c1.3-2.9,2.6-5.7,3.9-8.6c0.2-0.5,0.2-0.8-0.1-1.3
                        c-1.5-1.9-1.5-4.7-0.1-6.7c1.4-2.1,4-3,6.4-2.3c4,1.2,5.6,5.7,3.1,9.1c-0.1,0.2-0.3,0.6-0.2,0.8
                        C600.7,230.4,602.2,233.5,603.6,236.8 M629,268.5h0.7c3.5,0,7.1,0,10.6,0c0.9,0,1-0.1,1-1c0-4.1,0-8.2,0-12.3c0-0.2,0-0.4-0.1-0.7
                        h-0.9c-1.8,0-3.5,0-5.3,0c-1,0-1.5-0.7-1.3-1.6c0.2-0.7,0.7-0.9,1.4-0.9c0.7,0,1.4,0,2.1,0c-3-2-5.7-4.3-8.1-6.9
                        c-1.1-1.2-1.8-1.2-2.9,0c-2.3,2.4-4.8,4.6-7.7,6.4c-0.2,0.1-0.3,0.2-0.5,0.4h1c3.9,0,7.8,0,11.7,0c0.9,0,1.4,0.5,1.5,1.2
                        c0,0.8-0.5,1.2-1.4,1.2c-0.6,0-1.2,0-1.8,0V268.5z M626.5,254.5h-12.4c0,4.5,0,9,0,13.4c0,0.2,0.4,0.5,0.6,0.5
                        c0.7,0.1,1.3,0.1,2,0c0.3,0,0.6-0.2,0.8-0.4c2.9-3.3,5.7-6.6,8.6-10c0.2-0.2,0.3-0.4,0.3-0.6C626.5,256.5,626.5,255.5,626.5,254.5
                        M601.4,237.9c-1.5-3.3-2.9-6.5-4.4-9.7c-1.5,0.6-3,0.5-4.5,0c-1.5,3.3-2.9,6.5-4.4,9.7C592.1,239.8,597.6,239.8,601.4,237.9
                        M602.5,240.3c-5.1,2.1-10.2,2.1-15.3,0c-0.5,1.2-1.1,2.4-1.6,3.5c6.2,2.5,12.3,2.5,18.4,0C603.5,242.6,603,241.5,602.5,240.3
                        M598.2,222.8c0-1.8-1.5-3.3-3.4-3.3c-1.8,0-3.4,1.5-3.4,3.4c0,1.9,1.5,3.4,3.4,3.4C596.7,226.2,598.2,224.7,598.2,222.8" />
                  <path class="st18"
                    d="M643.8,238.8c-0.4,0.6-1,0.8-1.8,0.8c-5.7,0-11.4,0-17.1,0c-0.1,0-0.3,0-0.4,0c-0.8,0-1.4-0.5-1.4-1.2
                        c0-0.7,0.6-1.2,1.4-1.3c1.2,0,2.3,0,3.5,0h3.3v-1c0-9.3,0-18.5,0-27.8c0-0.4,0-0.7,0.1-1.1c0.2-0.6,0.6-0.8,1.2-0.8
                        c0.6,0.1,1,0.4,1.1,1c0,0.3,0,0.6,0,0.9c0,9.2,0,18.4,0,27.7v1h2.5v-1c0-9.2,0-18.3,0-27.5c0-0.3,0-0.7,0-1c0.1-0.6,0.5-1,1.1-1
                        c0.7,0,1.1,0.3,1.2,1c0.1,0.3,0.1,0.7,0.1,1c0,9.2,0,18.3,0,27.5v1.1c1.1,0,2.2,0,3.3,0c0.8,0,1.3,0.2,1.7,0.9V238.8z" />
                  <path class="st18" d="M643.8,202.8c-0.6,1.7-1.9,2.3-3.7,2.3c-3.3-0.1-6.6,0-9.9,0c-1.6,0-2.9-0.3-3.6-1.9
                        c-0.6-1.4,0.1-3.3,1.3-4.4c1-0.8,2.1-1.1,3.4-1.2c0-0.4,0-0.7,0-1c0-2.2,1.5-3.8,3.6-3.9c2-0.1,3.7,1.4,3.8,3.6c0,0.4,0,0.8,0,1.2
                        c0.6,0.1,1,0.1,1.5,0.2c1.6,0.4,2.7,1.4,3.2,3c0.1,0.2,0.2,0.4,0.2,0.6V202.8z M635.1,202.6c1.8,0,3.6,0,5.4,0
                        c0.7,0,0.9-0.3,0.7-1c-0.2-0.8-0.8-1.3-1.7-1.5c-0.2,0-0.4,0-0.6,0c-2.5,0-5.1,0-7.6,0c-1.2,0-1.9,0.5-2.2,1.4
                        c-0.3,0.8-0.1,1.1,0.7,1.1C631.6,202.6,633.4,202.6,635.1,202.6 M636.4,197.6c0-0.8,0.3-1.7-0.6-2.2c-0.3-0.2-1-0.2-1.3,0
                        c-0.8,0.5-0.6,1.3-0.6,2.1H636.4z" />
                  <path class="st18" d="M565.4,221c0.9-1.8,0.9-1.8,3.8-2.2c0.4-1.5,0.8-3.1,1.2-4.6c0.3-0.8,0.6-1.7,1-2.5c0.3-0.8,1-1.1,1.7-0.8
                        c0.7,0.3,0.9,1,0.6,1.7c-0.8,2-1.5,4-1.8,6.1c1.9,1.1,2.5,2.2,2,4c-0.5,1.9-2,3.2-4,3.4c-1.8,0.1-3.6-1-4.2-2.7
                        c-0.1-0.3-0.2-0.5-0.3-0.8V221z M569.8,221.3c-0.4,0-0.9,0-1.3,0c-0.5,0-0.6,0.2-0.6,0.7c0.1,1,0.9,1.7,1.8,1.7
                        c0.9,0,1.7-0.7,1.8-1.6c0.1-0.6-0.1-0.8-0.7-0.8C570.5,221.3,570.1,221.3,569.8,221.3" />
                  <path class="st18" d="M643.8,245.4c-0.4,0.6-1,0.8-1.8,0.8c-2,0-3.9,0-5.9,0c-0.9,0-1.4-0.5-1.4-1.2c0-0.7,0.4-1.3,1.2-1.3
                        c2.2,0,4.4-0.1,6.6,0c0.4,0,0.8,0.6,1.2,0.9V245.4z" />
                  <path class="st18" d="M565.4,194.2c0.1-0.1,0.2-0.2,0.3-0.3c0.5-0.6,1.3-0.7,1.9-0.1c0.5,0.5,0.5,1.5-0.1,1.9
                        c-0.5,0.5-1.3,0.4-1.8-0.2c-0.1-0.1-0.2-0.2-0.3-0.3V194.2z" />
                  <path class="st18" d="M565.4,244.5c0.3-0.5,0.7-1,1.4-0.9c0.6,0.1,1,0.4,1.1,1c0.1,0.6-0.1,1.2-0.7,1.4c-0.5,0.2-1,0.1-1.4-0.3
                        c-0.1-0.1-0.2-0.2-0.3-0.3V244.5z" />
                  <path class="st18" d="M643.8,222.5c-0.3,0.3-0.6,0.6-0.9,0.7c-0.6,0.2-1.1,0-1.4-0.6c-0.3-0.6-0.1-1.4,0.5-1.7
                        c0.6-0.3,1.1-0.2,1.6,0.2c0.1,0.1,0.2,0.3,0.3,0.4V222.5z" />
                  <path class="st18" d="M611.3,202.7c0.8-1,1.9-1.1,3-1.1c0.8,0,1.5,0,2.3,0c1.5,0.1,2.6,1.2,2.7,2.7c0.1,2.3-1.3,4.1-3.5,4.5
                        c-2.1,0.4-4.1-0.8-4.9-2.9c-0.1-0.3-0.3-0.5-0.5-0.7c-2.6-2.4-5.6-4.1-9-5.1c-0.2-0.1-0.5-0.1-0.7-0.2c-0.8-0.3-1.2-0.9-1-1.6
                        c0.2-0.7,0.9-1,1.7-0.8c1,0.3,1.9,0.6,2.9,1C606.8,199.5,609.2,201,611.3,202.7 M615.1,204.1c-0.4,0-0.9,0-1.3,0
                        c-0.4,0-0.6,0.2-0.6,0.6c0.1,1,0.9,1.8,1.8,1.8c0.9,0,1.7-0.7,1.8-1.7c0.1-0.5-0.1-0.7-0.6-0.7
                        C615.9,204.2,615.5,204.1,615.1,204.1" />
                  <path class="st18" d="M578.6,202.5c2.6-2.1,5.7-3.8,9.2-4.8c0.2,0,0.3-0.1,0.5-0.1c0.7-0.2,1.4,0.2,1.6,0.9
                        c0.2,0.6-0.1,1.2-0.9,1.5c-0.7,0.3-1.4,0.4-2.1,0.7c-2.9,1-5.5,2.6-7.7,4.7c-0.2,0.2-0.3,0.4-0.4,0.7c-0.8,2.1-2.9,3.4-5,2.9
                        c-2.2-0.5-3.6-2.5-3.4-4.7c0.1-1.4,1.2-2.5,2.6-2.5c1.1,0,2.2-0.1,3.3,0C577,201.8,577.7,202.2,578.6,202.5 M574.7,204.1
                        c-0.4,0-0.9,0-1.3,0c-0.5,0-0.6,0.2-0.6,0.7c0.1,1,0.9,1.7,1.8,1.7c0.9,0,1.6-0.7,1.8-1.6c0.1-0.6,0-0.9-0.7-0.8
                        C575.4,204.2,575,204.1,574.7,204.1" />
                  <path class="st18" d="M572.6,235.9c-0.9-2.2-1.7-4.3-2.6-6.5c-0.1-0.2-0.1-0.4-0.2-0.6c-0.2-0.7,0.2-1.4,0.9-1.6
                        c0.6-0.2,1.2,0.1,1.5,0.8c0.4,1.2,0.7,2.4,1.3,3.5c0.6,1.3,1.4,2.6,2.1,3.9c0.1,0.2,0.3,0.3,0.5,0.4c2.2,0.4,3.1,1.7,2.7,3.8
                        c-0.4,2.3-2.7,3.8-4.9,3.4c-2.3-0.4-3.9-2.6-3.6-4.9C570.5,237.1,571.3,236.3,572.6,235.9 M574.7,238.4c-0.5,0-0.9-0.1-1.4,0
                        c-0.2,0-0.5,0.3-0.5,0.5c-0.1,0.9,0.6,1.7,1.6,1.8c0.8,0.1,1.7-0.4,1.9-1.2c0.3-0.9,0.1-1.1-0.8-1.1
                        C575.2,238.4,574.9,238.4,574.7,238.4" />
                  <path class="st18" d="M616.8,235.9c1.8,0.6,2.5,1.4,2.5,2.9c0,2-1.1,3.6-2.8,4.2c-3.1,1.1-6.2-1.4-5.8-4.6
                        c0.2-1.3,1.2-2.3,2.5-2.5c0.3,0,0.7-0.3,0.9-0.5c1.2-1.7,2.1-3.6,2.8-5.6c0.1-0.3,0.2-0.6,0.3-0.9c0.3-0.7,0.9-1,1.5-0.8
                        c0.6,0.2,1,0.8,0.7,1.5c-0.6,1.7-1.4,3.4-2.1,5.1C617.3,235.1,617,235.5,616.8,235.9 M616.9,238.7c-0.1-0.1-0.3-0.3-0.5-0.3
                        c-0.9,0-1.8,0-2.7,0c-0.2,0-0.4,0.3-0.5,0.5c0,1,0.8,1.9,1.8,1.9C616,240.8,616.8,239.9,616.9,238.7" />
                  <path class="st18" d="M617.9,218.8c-0.5-1.7-1-3.3-1.5-5c-0.1-0.4-0.3-0.7-0.5-1.1c-0.2-0.7,0-1.3,0.6-1.6
                        c0.6-0.3,1.3-0.1,1.6,0.7c0.5,1.3,1,2.6,1.4,3.9c0.3,1,0.5,2.1,0.8,3.3c0.4,0,0.8,0,1.2,0c1.5,0.1,2.6,1.2,2.7,2.7
                        c0.1,2.6-1.8,4.6-4.2,4.6c-2.5,0-4.4-2-4.3-4.5C615.7,220.2,616.5,219.3,617.9,218.8 M620,221.3c-0.5,0-0.9,0-1.4,0
                        c-0.2,0-0.4,0.3-0.5,0.4c-0.1,0.8,0.6,1.7,1.4,1.9c0.9,0.2,1.8-0.3,2.1-1.1c0.3-1,0.2-1.2-0.8-1.2
                        C620.5,221.3,620.3,221.3,620,221.3" />
                  <path class="st18" d="M594.9,193.1c0.4,0,0.7,0,1.1,0c1.9-0.2,3.6,1.2,3.1,3.9c-0.4,2.3-2.7,3.8-4.9,3.4c-2.3-0.4-3.9-2.6-3.6-4.9
                        c0.2-1.3,1.3-2.3,2.6-2.3C593.7,193.1,594.3,193.1,594.9,193.1L594.9,193.1z M594.9,195.6c-0.4,0-0.9,0-1.3,0
                        c-0.4,0-0.6,0.2-0.6,0.6c0.1,1,0.9,1.8,1.8,1.8c0.9,0,1.7-0.7,1.8-1.7c0.1-0.5-0.1-0.7-0.6-0.7
                        C595.6,195.6,595.3,195.6,594.9,195.6" />
                  <path class="st18" d="M620.7,197.3c0,0.7-0.6,1.3-1.2,1.3c-0.7,0-1.2-0.6-1.2-1.4c0-0.7,0.6-1.2,1.3-1.2
                        C620.2,196,620.7,196.6,620.7,197.3" />
                  <path class="st18" d="M626.1,216.7c-0.7,0-1.2-0.5-1.3-1.2c0-0.7,0.5-1.4,1.2-1.4c0.7,0,1.2,0.6,1.2,1.3
                        C627.3,216.1,626.8,216.7,626.1,216.7" />
                  <path class="st18" d="M578.2,198.4c-0.7,0-1.2-0.6-1.2-1.3c0-0.8,0.6-1.3,1.3-1.3c0.7,0,1.2,0.6,1.2,1.3
                        C579.4,197.9,578.8,198.4,578.2,198.4" />
                  <path class="st18" d="M624.5,231.4c-0.7,0-1.2-0.5-1.3-1.3c0-0.7,0.6-1.4,1.3-1.3c0.7,0,1.2,0.6,1.2,1.3
                        C625.7,230.8,625.1,231.4,624.5,231.4" />
                  <path class="st18" d="M605.9,223.7c0,0.7-0.5,1.3-1.2,1.3c-0.7,0-1.2-0.6-1.2-1.3c0-0.8,0.6-1.3,1.3-1.3
                        C605.4,222.4,605.9,223,605.9,223.7" />
                  <path class="st18" d="M584.4,220.3c0,0.7-0.5,1.3-1.2,1.3c-0.7,0-1.2-0.5-1.3-1.2c0-0.8,0.5-1.3,1.2-1.4
                        C583.8,219.1,584.4,219.6,584.4,220.3" />
                  <path class="st18" d="M604.2,213.8c0,0.7-0.5,1.3-1.2,1.3c-0.7,0-1.2-0.6-1.3-1.3c0-0.7,0.6-1.4,1.3-1.3
                        C603.7,212.5,604.2,213,604.2,213.8" />
                </g>
                <g class="st1 botmap">
                  <defs>
                    <rect id="SVGID_23_" x="592.6" y="287.7" width="82.4" height="57.6" />
                  </defs>
                  <clipPath id="SVGID_24_">
                    <use xlink:href="#SVGID_23_" style="overflow:visible;" />
                  </clipPath>
                </g>
                <!-- 島嶼5 驚險火山島-->
                <g class="st1 island"  @click="svgMoveLeft('驚險火山島')" id="island5" data-message="驚險火山島" data-content="火山島好好玩">
                  <defs>
                    <path id="SVGID_25_" d="M553.6,545c0.2,1.3,0.6,3.3,1.8,5.2c2.8,4.2,7.9,5.4,11.3,6c16.6,3.2,25.5,2.8,25.5,2.8
                          c19.4-0.8,29.1-1.1,34.6-2.3c35.1-7.5,58.5-28.1,68.1-37.8c8.8-8.9,13.8-16.4,23.6-31.3c18.7-28.5,27.8-52.9,30.7-61
                          c3.1-8.6,5.1-15.9,6.5-20.8l-192-12.4C560.3,443.8,556.9,494.4,553.6,545" />
                  </defs>
                  <clipPath id="SVGID_26_">
                    <use xlink:href="#SVGID_25_" style="overflow:visible;" />
                  </clipPath>
                  <path class="st19" d="M591.2,557.5c-2.9,0-11.1-0.3-24.2-2.8c-2.7-0.5-7.7-1.5-10.3-5.4c-0.8-1.3-1.4-2.7-1.6-4.4l9.9-150.1
                        L753.7,407c-1.7,6.3-3.7,12.7-5.9,19c-7.1,19.9-17.9,41.5-30.5,60.7c-9.7,14.8-14.6,22.2-23.4,31.1c-10.9,10.9-34,30.3-67.3,37.4
                        c-4.8,1-13.3,1.4-28.9,2l-5.5,0.2C592.1,557.5,591.8,557.5,591.2,557.5" />
                  <path class="st20" d="M566.4,396.4l185.3,12c-1.6,5.7-3.4,11.5-5.4,17.1c-5,14-14.3,35.8-30.4,60.4c-9.6,14.7-14.5,22.1-23.2,30.9
                        c-10.7,10.8-33.7,30-66.6,37c-4.7,1-13.2,1.4-28.6,2l-5.5,0.2c0,0-0.3,0-0.9,0c-2.9,0-11-0.3-24-2.8c-3.4-0.7-7.3-1.6-9.3-4.7
                        c-0.7-1-1.1-2.2-1.3-3.6l5-75.6L566.4,396.4 M563.6,393.2c-3.3,50.6-6.6,101.2-10,151.8c0.2,1.3,0.6,3.3,1.8,5.2
                        c2.8,4.2,7.9,5.4,11.3,6c13.4,2.6,21.8,2.8,24.5,2.8c0.7,0,1,0,1,0c19.4-0.8,29.1-1.1,34.6-2.3c35.1-7.5,58.4-28.1,68.1-37.8
                        c8.8-8.9,13.8-16.4,23.6-31.3c18.7-28.5,27.8-52.9,30.7-61c3.1-8.6,5.1-15.9,6.5-20.8L563.6,393.2z" />
                  <path class="st21" d="M670.7,492.4c-0.4,0.6-0.9,0.8-1.6,0.8c-25.1,0-50.3,0-75.4,0c-0.1,0-0.2,0-0.3,0c-0.6,0-1.1-0.3-1.3-0.9
                        c-0.2-0.6,0.2-1.1,0.7-1.4c2.6-1.4,4.9-3,7.2-4.8c1-0.8,2-1.6,3-2.4c0.6-0.5,1.3-0.5,1.8,0c0.5,0.5,0.4,1.2-0.2,1.8
                        c-2,1.7-4.1,3.4-6.2,4.9c-0.2,0.2-0.5,0.2-0.6,0.6h67.5c-0.2-0.3-0.5-0.4-0.7-0.6c-7-4.8-12.8-10.8-17.8-17.7
                        c-0.5-0.8-0.5-1.4,0.1-1.8c0.6-0.4,1.3-0.3,1.8,0.5c4.4,6.1,9.6,11.5,15.6,16c1.8,1.3,3.6,2.5,5.5,3.6c0.4,0.2,0.7,0.5,1,0.8
                        V492.4z" />
                  <path class="st21" d="M649.2,483.7c0,0.5-0.2,0.8-0.6,1c-0.5,0.3-0.9,0.2-1.4-0.2c-1.3-1-2.5-2.1-3.6-3.3
                        c-2.7-2.9-4.9-6.1-6.3-9.8c-0.1-0.2-0.2-0.5-0.2-0.7c-0.2-0.7,0.1-1.3,0.7-1.5c0.6-0.2,1.2,0.1,1.5,0.8c0.2,0.5,0.3,1,0.6,1.4
                        c1.9,4.4,4.8,8,8.4,11C648.7,482.8,649.2,483.1,649.2,483.7" />
                  <path class="st21" d="M623.6,474c-0.1,0.2-0.1,0.4-0.2,0.7c-1.7,5-4.5,9.3-8.6,12.7c-0.3,0.2-0.6,0.5-0.9,0.6
                        c-0.6,0.3-1.1,0.1-1.4-0.4c-0.3-0.5-0.3-1,0.1-1.4c0.1-0.1,0.3-0.2,0.4-0.3c3.8-3.1,6.6-7.1,8.2-11.7c0.1-0.3,0.2-0.5,0.3-0.8
                        c0.3-0.5,0.7-0.6,1.3-0.5C623.3,473,623.5,473.4,623.6,474" />
                  <path class="st21" d="M632.5,475.1c0,1.7,0,3.4,0,5.1c0,0.9-0.4,1.3-1.2,1.3c-0.7,0-1.1-0.5-1.2-1.3c0-1.7,0-3.4,0-5.1
                        c0-1.7,0-3.3,0-5c0-0.9,0.4-1.4,1.1-1.4c0.8,0,1.2,0.5,1.2,1.4C632.5,471.8,632.5,473.5,632.5,475.1" />
                  <path class="st21" d="M642.9,419.3c-0.4,0.1-0.7,0.1-1.1-0.1c-2.1-0.6-4.1-0.6-6.2,0.1c-0.5,0.2-0.7,0.2-1-0.3
                        c-1.4-2.2-3.4-3.5-5.9-4.3c-0.5-0.1-1-0.1-1.4-0.4h-2.9c-0.3,0.3-0.7,0.2-1,0.3c-3.2,0.8-5.6,2.7-7,5.7c-0.6,1.4-0.6,1.4-2.1,1.3
                        c-7.1-0.2-11.9,7.2-8.6,13.5c2.2,4.2,7.2,6.1,11.8,4.5c0.3-0.1,0.6-0.3,1,0c2.3,1.3,4.7,1.7,7.3,1.3c0.4-0.1,0.6,0,0.6,0.5
                        c0,2.3,0,4.6,0,6.9c0,0.3,0,0.5-0.3,0.6c-1.1,0.5-1.6,1.4-2,2.5c-2.9,8.5-7.1,16.3-12.7,23.3c-1.5,1.8-3.1,3.6-4.7,5.3
                        c-0.7,0.7-0.7,1.4-0.2,1.9c0.5,0.5,1.2,0.4,1.9-0.3c0.1-0.1,0.1-0.2,0.2-0.2c4.3-4.4,8-9.2,11.1-14.6c0.2-0.3,0.3-0.6,0.7-0.7
                        c2.4-0.6,4.3-2,5.9-3.8c0.3-0.4,0.7-0.7,1-1.1c0.2,0.5,0.4,0.9,0.5,1.4c0.3,0.9,0.7,1.8,1.4,2.5c0.9,1,2.2,1.3,3.3,0.7
                        c0.8-0.4,1.4-1.1,1.7-1.9c0.4-0.9,0.8-1.8,1.2-2.7c0.4,0.4,0.8,0.8,1.1,1.2c1.3,1.4,2.7,2.7,4.6,3.3c1.3,0.4,2.1,1.1,2.6,2.3
                        c0.4,0.8,1.1,1,1.7,0.6c0.6-0.4,0.7-1,0.3-1.8c-3-5-5.4-10.2-7.2-15.7c-0.3-0.9-0.8-1.6-1.7-2.1c-0.3-0.2-0.5-0.3-0.5-0.7
                        c0-2,0-4,0-6.1c0-0.4,0.1-0.5,0.5-0.6c0.9-0.2,1.8-0.6,2.6-1.1c0.3-0.2,0.6-0.1,0.9,0c2.3,1.1,4.8,1.3,7.3,0.9
                        c5.1-0.9,9.1-5.5,9.3-10.5C657.1,423.5,650.3,417.8,642.9,419.3 M636.3,452.1c1.2,3.7,2.7,7.3,4.5,10.8c0,0.1,0.1,0.2,0.1,0.4
                        c-1.1-0.6-1.9-1.4-2.6-2.2c-0.6-0.6-1.2-1.4-1.9-1.9c-1.1-0.7-2.1-0.5-2.7,0.6c-0.5,0.9-0.7,1.9-1.1,2.8c-0.3,0.5-0.4,1.3-1.1,1.3
                        c-0.7,0-0.9-0.8-1.1-1.3c-0.3-0.8-0.6-1.6-0.9-2.4c-0.7-1.7-2.1-1.9-3.4-0.7c-0.7,0.7-1.4,1.4-2.1,2.1c-0.6,0.6-1.2,1.1-1.9,1.5
                        c-0.1-0.3,0.1-0.4,0.1-0.6c1.7-3.3,3.1-6.8,4.2-10.3c0.3-1,0.6-1.2,1.7-1.2c2.3,0,4.6,0,6.9,0
                        C635.6,451.1,636.1,451.3,636.3,452.1 M640.8,435.7c-1.1,2.2-2.9,3.6-5.4,4c-1.2,0.2-1.4,0.5-1.4,1.7c0,2.3,0,4.5,0,6.8
                        c0,0.5-0.1,0.7-0.6,0.7c-1.4,0-2.7,0-4.1,0c-0.5,0-0.6-0.2-0.6-0.7c0-2.7,0-5.4,0-8.1c0-1.6-0.6-2-2.1-1.5
                        c-4.6,1.6-9.2-0.8-10.6-5.4c-0.3-0.9-0.8-1.2-1.5-1.1c-0.7,0.2-0.9,0.8-0.7,1.7c0.4,1.5,1.1,2.8,2.2,4.2c-2.8,0.6-5.2,0-7.2-2
                        c-2.1-2.1-2.5-5.3-1.2-7.9c1.4-2.6,4.4-4.2,7.3-3.8c0.6,0.1,0.7,0.5,0.3,1.1c-0.5,0.8-1,1.7-1.3,2.6c-0.3,0.8,0,1.5,0.6,1.7
                        c0.7,0.2,1.2-0.1,1.5-0.9c0-0.1,0.1-0.2,0.1-0.3c1.1-1.7,1.5-3.6,1.8-5.6c0.6-3.3,3.5-5.6,7-6c3.2-0.4,6.5,1.4,8.1,4.3
                        c0.8,1.5,1,1.6,2.5,0.8c4.7-2.4,10.2,0.7,10.5,5.9c0.2,2.7-1.4,5.3-4,6.5C641.5,434.7,641.1,435.1,640.8,435.7 M651.5,437.1
                        c-2.7,2.4-7,3.1-9.8,1.6c0.4-0.6,0.9-1.2,1.2-1.9c0.1-0.2,0.3-0.3,0.5-0.4c5.5-2.8,6.8-10.1,2.5-14.6c-0.1-0.1-0.2-0.2-0.2-0.3
                        c3.4,0,6.9,2.4,8.2,5.8C655.3,430.8,654.3,434.6,651.5,437.1" />
                  <path class="st21" d="M656.4,451.4c-2.4,0-4.4,2-4.4,4.3c0,2.4,2,4.3,4.4,4.3c2.4,0,4.5-2,4.4-4.4
                        C660.8,453.4,658.8,451.4,656.4,451.4 M656.4,457.8c-1.1,0-2.1-0.9-2.1-2c0-1.1,1-2,2.1-2c1.1,0,2.1,0.9,2.1,2
                        C658.5,456.9,657.5,457.8,656.4,457.8" />
                  <path class="st21" d="M608.5,443.8c-2.4,0-4.4,1.9-4.4,4.3c0,2.4,2,4.4,4.5,4.3c2.4,0,4.4-2,4.3-4.4
                        C612.9,445.7,610.9,443.7,608.5,443.8 M608.5,450.1c-1.1,0-2.1-0.9-2.1-2c0-1.1,0.9-2,2.1-2c1.2,0,2.1,0.9,2.1,2
                        C610.6,449.2,609.6,450.1,608.5,450.1" />
                  <path class="st21" d="M605.2,462.4c-2.4,0-4.4,1.9-4.4,4.3c0,2.4,2,4.3,4.4,4.3c2.4,0,4.4-1.9,4.4-4.3
                        C609.7,464.3,607.7,462.3,605.2,462.4 M605.2,468.7c-1.2,0-2.1-0.9-2.1-2c0-1.1,1-2,2.1-2c1.1,0,2.1,0.9,2.1,2
                        C607.3,467.8,606.4,468.7,605.2,468.7" />
                </g>
                <!-- 島嶼6 孤島_停車場-->
                <g class="st1 island"  @click="svgMoveLeft('孤島')" id="island6" data-message="孤島" data-content="這是停車場你知道的">
                  <defs>
                    <path id="SVGID_27_" d="M194.7,463.7c-20.2,0-36.5,16.3-36.5,36.5v35.4c0,20.2,16.3,36.5,36.5,36.5h14.7
                          c20.2,0,36.5-16.3,36.5-36.5v-35.4c0-20.2-16.3-36.5-36.5-36.5H194.7z" />
                  </defs>
                  <clipPath id="SVGID_28_">
                    <use xlink:href="#SVGID_27_" style="overflow:visible;" />
                  </clipPath>
                  <path class="st22"
                    d="M192.2,568.8c-3.4,0-8.4-0.6-13.1-3.5c-13-7.9-17.7-29.5-9.5-43.6c5.4-9.4,15.5-13.3,20.4-15.1
                        c6.8-2.6,12.8-3.1,18.1-3.5c2.6-0.2,5.1-0.4,7.7-0.4c4.3,0,8,0.5,11.7,1.6c6.1,1.8,12.4,3.7,14.8,8.3
                        c5.6,10.8-14.2,30.7-27.3,43.9c-6.8,6.8-12.2,11-19.4,12C194.6,568.7,193.4,568.8,192.2,568.8L192.2,568.8z" />
                  <path class="st23" d="M215.8,504.2c4.1,0,7.7,0.5,11.3,1.6c5.8,1.7,11.8,3.6,13.9,7.5c5.1,9.9-15,30.1-27,42.2
                        c-6.7,6.8-11.7,10.6-18.5,11.6c-1,0.1-2.1,0.2-3.2,0.2c-3.2,0-7.9-0.6-12.3-3.2c-5.9-3.6-10.3-10.4-12-18.6
                        c-1.7-8.3-0.6-16.6,3-22.9c5.2-8.9,14.9-12.7,19.6-14.5c6.6-2.6,12.2-3,17.7-3.4C210.8,504.4,213.3,504.2,215.8,504.2
                        M215.8,501.2c-2.7,0-5.2,0.2-7.8,0.4c-5.4,0.4-11.6,0.8-18.6,3.6c-4.8,1.9-15.4,6-21.1,15.8c-8.4,14.4-3.9,37.2,10,45.7
                        c5.1,3.1,10.4,3.7,13.9,3.7c1.9,0,3.2-0.2,3.7-0.2c7.5-1,13-5.1,20.2-12.4c13.7-13.7,33.7-33.9,27.6-45.7c-2.6-5.1-9.3-7.1-15.7-9
                        C223.6,501.6,219.6,501.2,215.8,501.2" />
                </g>
    
              </svg>
            </div>
            <div v-if="this.threedmapshow==true" class="3dAccess">
                <ThreeSphereView />
            </div>
          </div>

          <div class="right" ref="mapRightPlace">
            <h1 @click="svgMoveRight">{{ this.islandName }}</h1>
            <div class="uniqueMap">
                <div class="uniqueMapLeft">
                  
                      <!--  孤島 Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)    -->
                      <svg v-if="this.islandName=='孤島'" version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
                      <g>
                        <defs>
                          <path id="SVGID_1_" d="M380.8,100c-59.9,0-108.4,48.5-108.4,108.4v105.2c0,59.9,48.5,108.4,108.4,108.4h43.5
                            c59.9,0,108.4-48.5,108.4-108.4V208.4c0-59.9-48.5-108.4-108.4-108.4H380.8z"/>
                        </defs>
                        <clipPath id="SVGID_2_">
                          <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                        </clipPath>
                        <path class="alonest0" d="M373.6,412.4c-10,0-25-1.8-39-10.3c-38.7-23.5-52.6-87.7-28.2-129.6c16.2-27.8,46.1-39.4,60.5-45
                          c20.2-7.8,38-9.1,53.8-10.3c7.9-0.6,15.2-1.1,23-1.1c12.7,0,23.8,1.6,34.9,4.9c18.2,5.5,36.9,11.1,43.9,24.5
                          c16.7,32.2-42.2,91.3-81.1,130.5c-20.2,20.3-36.1,32.7-57.5,35.7C380.7,412.1,377.2,412.4,373.6,412.4L373.6,412.4z"/>
                        <path class="alonest1" d="M443.7,220.5c12.2,0,22.9,1.5,33.6,4.7c17.3,5.2,35.1,10.6,41.2,22.3c15.2,29.3-44.6,89.4-80.3,125.3
                          c-20,20.1-34.7,31.6-55,34.4c-2.9,0.4-6.2,0.6-9.6,0.6c-9.5,0-23.5-1.7-36.7-9.6c-17.5-10.6-30.5-30.8-35.7-55.4
                          c-5.2-24.6-1.9-49.4,9-68.2c15.4-26.4,44.3-37.7,58.2-43.1c19.6-7.6,36.3-8.8,52.6-10C428.8,221.1,436.2,220.5,443.7,220.5
                          M443.7,211.6c-7.9,0-15.5,0.6-23.3,1.1c-16.2,1.2-34.3,2.5-55.1,10.6c-14.4,5.6-45.8,17.8-62.7,46.9
                          c-25,42.9-11.7,110.5,29.7,135.7c15,9.1,30.9,10.9,41.3,10.9c5.5,0,9.4-0.5,10.9-0.7c22.2-3.1,38.5-15.3,60.1-37
                          c40.6-40.8,100-100.6,81.9-135.7c-7.8-15.1-27.6-21.1-46.5-26.7C466.8,212.8,455,211.6,443.7,211.6"/>
                      </g>
                      </svg>

                      <!-- 凍骨冰山島 Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                      <svg v-if="this.islandName=='凍骨冰山島'"  version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
                      <g>
                        <defs>
                          <path id="SVGID_1_" d="M212.8,274.7c12.9-3.8,26.5-5.9,40.2-5.9c49.9,0,96.3,27.1,121.1,70.4l29.1,51.4c2.4,3.6,6.1,5.9,10.5,5.9
                            c2,0,5.7-0.4,8.7-3.8l19.6-21.4c7.9-8.7,19-13.5,30.7-13.5c17.2,0,32.4,10.1,38.8,26.1l33.8,78.1c3.2,9.2,7.1,19.9,11.9,32.1
                            c2,5.1,4.9,12.4,11.5,15.1c1.3,0.5,4.3,1.7,7,0.2c3.2-1.8,3.5-6,3.5-6.5c8.4-136,16.8-272,25.2-408l-399.8-9.3L212.8,274.7z"/>
                        </defs>
                        <clipPath id="SVGID_2_">
                          <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                        </clipPath>
                        <path class="icest0" d="M572.9,506.9c-1.1,0-2.3-0.5-2.9-0.7c-5.5-2.3-8.1-8.9-9.8-13.4c-4.2-10.7-8.2-21.5-11.9-32
                          c0-0.1-0.1-0.1-0.1-0.2l-33.8-78.1c-6.9-16.9-23.2-27.9-41.6-27.9c-12.6,0-24.6,5.3-33,14.5l-19.6,21.4c-1.7,1.9-3.8,2.9-6.5,2.9
                          c-4.1,0-6.5-2.4-7.9-4.4l-29.1-51.3c-25.5-44.4-72.9-71.9-123.8-71.9c-12.6,0-25.2,1.7-37.4,4.9l-7.8-182.2l393.4,9.2l-25,404.9
                          c0,0-0.2,3-1.9,4C573.9,506.7,573.5,506.9,572.9,506.9"/>
                        <path class="icest1" d="M211.1,91.6l387,9l-11.8,191.6l-13,210.2c0,0.5-0.2,1.1-0.4,1.5c-0.5,0-1.3-0.3-1.7-0.5
                          c-4.3-1.8-6.6-7.7-8.1-11.7c-4.2-10.7-8.2-21.4-11.8-31.9c0-0.1-0.1-0.3-0.2-0.4l-33.8-78c-7.4-18.1-24.8-29.8-44.4-29.8
                          c-13.4,0-26.3,5.7-35.2,15.5l-19.6,21.4c0,0,0,0.1-0.1,0.1c-1.1,1.2-2.4,1.8-4.1,1.8c-2.2,0-4-1-5.4-3l-29-51.2
                          c-26-45.3-74.5-73.4-126.4-73.4c-11.6,0-23.2,1.4-34.5,4.1L211.1,91.6 M204.7,85.4l8.1,189.3c12.9-3.8,26.5-5.9,40.2-5.9
                          c49.9,0,96.3,27.1,121.1,70.4l29.1,51.4c2.4,3.6,6.1,5.9,10.5,5.9c2,0,5.7-0.4,8.7-3.8l19.6-21.4c7.9-8.7,19-13.5,30.7-13.5
                          c17.2,0,32.4,10.1,38.8,26.1l33.8,78.1c3.2,9.2,7.1,19.9,11.9,32.1c2,5.1,4.9,12.4,11.5,15.1c0.8,0.3,2.4,1,4.1,1
                          c1,0,2-0.2,2.9-0.7c3.2-1.8,3.5-6,3.5-6.5c8.4-136,16.8-272,25.2-408L204.7,85.4z"/>
                        <path class="icest2" d="M303.9,181.1c0.8,0.3,1.1,0.9,1.1,1.7c0,1.2,0,2.5,0,3.8c0.2-0.1,0.3-0.2,0.4-0.3c1-0.7,2-1.5,3-2.2
                          c0.5-0.4,1-0.4,1.5-0.1c0.5,0.3,0.7,0.8,0.6,1.4c-0.1,0.4-0.3,0.8-0.7,1c-1.5,1.1-3.1,2.3-4.6,3.4c-0.1,0.1-0.3,0.3-0.3,0.5
                          c0,2.5,0,4.9,0,7.4c0,0.1,0,0.1,0,0.2c0.1-0.1,0.2-0.1,0.3-0.2c2.1-1.2,4.2-2.5,6.2-3.8c0.1-0.1,0.3-0.3,0.3-0.4
                          c0.2-1.9,0.4-3.8,0.6-5.7c0.1-0.9,0.6-1.4,1.4-1.5c0.9,0,1.5,0.7,1.4,1.6c-0.1,1.3-0.3,2.6-0.4,3.8c0,0,0,0.1,0,0.1
                          c0.1-0.1,0.3-0.1,0.4-0.2c1.1-0.6,2.1-1.3,3.2-1.9c0.6-0.4,1.4-0.2,1.8,0.3c0.4,0.5,0.4,1.3-0.1,1.8c-0.1,0.1-0.3,0.2-0.4,0.3
                          c-1,0.6-2,1.2-3.1,1.8c-0.1,0.1-0.2,0.1-0.4,0.2c1.3,0.5,2.5,1,3.7,1.5c0.7,0.3,1.1,0.9,0.9,1.6c-0.2,0.9-1.1,1.3-1.9,1
                          c-1.8-0.7-3.6-1.5-5.4-2.2c-0.1-0.1-0.4-0.1-0.5,0c-2.2,1.3-4.3,2.6-6.5,3.9c-0.1,0-0.1,0.1-0.2,0.1c0.1,0.1,0.2,0.1,0.3,0.2
                          c2.1,1.3,4.2,2.5,6.3,3.8c0.2,0.1,0.4,0.1,0.6,0.1c1.8-0.7,3.6-1.5,5.4-2.2c0.7-0.3,1.4,0,1.7,0.6c0.3,0.6,0.2,1.3-0.3,1.7
                          c-0.2,0.1-0.4,0.2-0.6,0.3c-1.2,0.5-2.4,1-3.6,1.5c0.2,0.1,0.3,0.2,0.4,0.2c1.1,0.6,2.1,1.3,3.2,1.9c0.5,0.3,0.8,0.9,0.6,1.5
                          c-0.1,0.6-0.5,1-1.1,1c-0.3,0-0.7-0.1-1-0.2c-1.1-0.6-2.1-1.2-3.1-1.9c-0.1-0.1-0.2-0.1-0.4-0.2c0.1,0.8,0.2,1.6,0.2,2.4
                          c0.1,0.6,0.1,1.1,0.2,1.7c0.1,0.7-0.5,1.4-1.2,1.5c-0.8,0.1-1.5-0.3-1.6-1.1c-0.2-1.1-0.2-2.2-0.4-3.3c-0.1-0.9-0.2-1.8-0.3-2.7
                          c0-0.1-0.1-0.3-0.2-0.4c-2.1-1.3-4.3-2.6-6.5-3.9c0,0-0.1,0-0.1-0.1c0,0.1,0,0.2,0,0.3c0,2.4,0,4.8,0,7.2c0,0.3,0.1,0.4,0.3,0.6
                          c1.5,1.1,3.1,2.3,4.6,3.4c0.6,0.4,0.8,1,0.6,1.6c-0.3,0.9-1.4,1.3-2.2,0.7c-1-0.7-2-1.5-3-2.2c-0.1-0.1-0.2-0.1-0.4-0.2v2.5
                          c0,0.5,0,1.1,0,1.6c0,0.8-0.6,1.4-1.4,1.5s-1.4-0.6-1.4-1.4c0-1.3,0-2.5,0-3.8c0-0.1,0-0.2,0-0.3c-0.1,0.1-0.2,0.1-0.3,0.2
                          c-1,0.8-2,1.5-3,2.3c-0.5,0.4-1.1,0.4-1.6,0c-0.5-0.3-0.7-0.9-0.5-1.5c0.1-0.3,0.4-0.6,0.6-0.9c1.5-1.2,3.1-2.3,4.6-3.5
                          c0.1-0.1,0.3-0.3,0.3-0.5c0-2.4,0-4.9,0-7.3c0-0.1,0-0.2,0-0.3c-0.1,0.1-0.2,0.1-0.3,0.2c-2,1.2-4.1,2.5-6.1,3.7
                          c-0.3,0.2-0.4,0.4-0.4,0.7c-0.2,1.9-0.4,3.8-0.6,5.7c-0.1,0.8-0.7,1.4-1.5,1.3c-0.8-0.1-1.3-0.7-1.2-1.5c0.1-1.1,0.2-2.3,0.3-3.4
                          c0-0.2,0-0.4,0.1-0.7c-0.2,0.1-0.3,0.2-0.4,0.2c-1.1,0.6-2.1,1.3-3.2,1.9c-0.5,0.3-1,0.3-1.5-0.1c-0.5-0.4-0.6-0.8-0.5-1.4
                          c0.1-0.4,0.4-0.7,0.7-0.9c1-0.6,2.1-1.2,3.1-1.9c0.1-0.1,0.2-0.1,0.4-0.3c-0.4-0.2-0.8-0.3-1.2-0.5c-0.9-0.4-1.7-0.7-2.6-1.1
                          c-0.6-0.3-0.9-0.8-0.9-1.4c0-0.6,0.4-1.1,1-1.2c0.3-0.1,0.7,0,1,0.1c1.8,0.7,3.6,1.4,5.4,2.2c0.1,0.1,0.4,0.1,0.5,0
                          c2.2-1.3,4.4-2.6,6.6-3.9c0,0,0.1-0.1,0.1-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-2.1-1.3-4.2-2.5-6.3-3.8c-0.2-0.1-0.4-0.1-0.6,0
                          c-1.8,0.7-3.5,1.5-5.3,2.2c-0.3,0.1-0.7,0.1-1.1,0.1c-0.6-0.1-0.9-0.7-1-1.2c0-0.6,0.3-1.1,0.9-1.4c1.1-0.5,2.2-0.9,3.4-1.4
                          c0.1-0.1,0.3-0.1,0.4-0.2c-0.3-0.2-0.6-0.4-0.8-0.5c-0.9-0.5-1.8-1.1-2.6-1.6c-0.8-0.5-1-1.3-0.6-2c0.4-0.7,1.2-0.9,2-0.4
                          c1,0.6,2,1.2,3.1,1.8c0.1,0.1,0.2,0.1,0.4,0.2c-0.1-0.5-0.1-1-0.1-1.5c-0.1-0.9-0.2-1.8-0.3-2.7c0-0.7,0.4-1.3,1.1-1.4
                          c0.8-0.2,1.6,0.3,1.7,1.2c0.2,1.4,0.3,2.8,0.4,4.2c0.1,0.6,0.1,1.2,0.2,1.7c0,0.1,0.1,0.3,0.2,0.4c2.1,1.3,4.3,2.6,6.5,3.9
                          c0,0,0.1,0,0.2,0.1v-0.4c0-2.4,0-4.8,0-7.2c0-0.3-0.1-0.4-0.3-0.6c-1.6-1.2-3.1-2.3-4.6-3.5c-0.6-0.5-0.8-1.2-0.4-1.9
                          c0.4-0.7,1.3-0.9,2-0.4c1,0.7,2,1.5,3,2.2c0.1,0.1,0.2,0.1,0.3,0.2c0-0.2,0-0.3,0-0.4c0-1.1,0-2.3,0-3.4c0-0.8,0.3-1.4,1.1-1.7
                          H303.9z"/>
                        <path class="icest2" d="M515.9,252.4c-1.4,3.7-4.1,4.9-7.9,4.8c-45.3-0.1-90.5,0-135.8,0c-0.6,0-1.3,0-1.9,0c-1.6-0.1-2.7-1.3-2.7-2.7
                          c0.1-1.4,1.1-2.4,2.7-2.5c1.8-0.1,3.5,0,5.4,0v-12.8h-26v12.8c2.5,0,5-0.1,7.4,0c0.8,0,1.9,0.2,2.4,0.8c0.5,0.6,0.9,1.8,0.7,2.5
                          c-0.3,0.8-1.4,1.7-2.2,1.9c-1.5,0.3-3.2,0.1-4.8,0.1c-3.9,0-7.8,0-11.7,0c-4.4,0-6.9-2.5-6.9-6.9c0-8.1,0-16.3,0-24.4
                          c0.2-35.6,23.7-65.9,58.1-74.9c12.6-3.3,25.2-3.2,37.8-0.2c2.4,0.6,3.4,1.7,3,3.4c-0.4,1.8-1.8,2.4-4.3,1.8
                          c-17.9-4.2-35-2.2-51.3,6.4c-2.3,1.2-4.5,2.6-6.6,4c-0.5,0.3-1,1-1,1.5c0.1,5.3,0.4,10.5,2.1,15.5c0.5,1.5,0.8,3.5,2.7,3.8
                          c1.9,0.3,2.8-1.5,3.8-2.8c1.6-2.2,3-4.6,4.7-6.9c5.3-7.1,12.5-8.1,19.5-2.5c4.6,3.7,7.6,8.7,10.5,13.7c2.7,4.6,5.3,9.4,7.9,14
                          c0.6,1.1,1.4,2.1,2.1,3.1c1.4,2,2.8,2.2,5.1,0.3c1.1-0.9,1.9-2.4,2.4-3.8c1.4-3.8,2.5-7.6,3.7-11.4c2.2-6.8,5.3-13.2,11.1-17.7
                          c2.6-2,5.6-3.6,8.8-5.5c-3.3-2-6.6-3.9-9.9-5.9c-0.9-0.5-1.8-0.9-2.7-1.3c-1.9-1-2.5-2.3-1.7-3.8c0.7-1.4,2.1-1.8,3.9-1
                          c5.7,2.6,10.9,5.8,15.8,9.7c14.3,11.5,23.4,26.3,27.4,44.2c0.3,1.1,0.8,1.4,1.8,1.4c3.1,0,6.1-0.1,9.2,0c8.6,0.3,15.3,6,17,14.5
                          c0.1,0.3,0.2,0.5,0.3,0.8V252.4z M490.6,218.8c-3,2.4-4.6,5.4-4.8,9.1c-0.1,1.8,0,3.5-0.1,5.3c-0.1,1.7-1.3,2.9-2.8,2.8
                          c-1.4-0.1-2.4-1.2-2.5-2.9c0-1.3,0-2.6,0-3.9c-0.1-4.5,1.3-8.6,4.2-12.1c0.2-0.2,0.3-0.5,0.5-1c-5.3,0-10.5,0-15.6,0
                          c-7.6,0.1-12.8,5.3-12.8,12.8c0,7,0,13.9,0,20.9c0,1.6,0.6,2,2.1,2c6.7-0.1,13.3,0,20,0c0.5,0,1-0.1,1.7-0.1c0-1.9,0-3.6,0-5.4
                          c0-1.9,1-3.1,2.6-3.1c1.6,0,2.6,1.2,2.7,3.1c0,1.4-0.1,2.8,0.1,4.2c0,0.5,0.7,1.2,1,1.2c2.8,0.1,5.6,0.1,8.4,0.1
                          c0.1-0.3,0.2-0.4,0.2-0.5c0-8.2,0.1-16.4-0.1-24.6C495.2,223.5,493.3,220.9,490.6,218.8 M381.2,251.8h26V239h-26V251.8z
                          M438.9,239.1h-26v12.7h26V239.1z M496,216.5c3.8,4.2,4.9,9,4.8,14.4c-0.1,6.3,0,12.6,0,18.9v2.1c3,0,5.8,0.1,8.7-0.1
                          c0.4,0,1.1-1,1.1-1.5c0.1-7.4,0.2-14.9,0-22.3C510.3,220.7,503.3,215.1,496,216.5 M407.3,203.7h-26v12.2h26V203.7z M349.7,215.9h26
                          v-12.1h-26V215.9z M390.9,221.4h-26.1v12.1h26.1V221.4z M396.4,233.5h26.1v-12.1h-26.1V233.5z M428,233.5h23
                          c0.4-4.1,0.9-8.1,1.3-12.1H428V233.5z M444.4,203.7V216c3.9,0,7.8,0,11.6,0c0.6,0,1.2-0.5,1.6-0.9c2.6-2.1,5.5-3.5,8.7-4
                          c1.3-0.2,2.7-0.2,4.1-0.3v-7.1H444.4z M390.8,198.2v-12.1c-3.5-0.4-7-0.9-8.9,3.1c-0.1,0.2-0.2,0.3-0.3,0.4
                          c-4.5,4.8-10.2,4.1-13-1.8c-0.9-1.9-2-2.1-3.8-1.6v12.1H390.8z M359.3,221.4H340v12.1h19.3V221.4z M459.6,186v12.2h19.2
                          c-2.3-4.1-4.3-7.8-6.5-11.5c-0.2-0.3-0.7-0.6-1.1-0.7C467.4,186,463.6,186,459.6,186 M438.9,203.8c-1.6-0.5-2.6-0.2-3.4,1.5
                          c-0.9,1.8-2.1,3.6-3.5,5c-3.9,3.6-8.9,3.2-12.3-0.8c-1.1-1.3-2.1-2.6-2.8-4c-0.9-1.9-2.2-2.1-4.1-1.7v12.1h26.1V203.8z
                          M437.9,198.2H454V186c-3.7,0-7.3,0-10.9,0c-0.4,0-0.9,0.4-1,0.7C440.7,190.5,439.4,194.2,437.9,198.2 M396.4,198.2h16.6
                          c-2.4-4.1-4.7-7.8-6.9-11.6c-0.2-0.3-0.5-0.6-0.8-0.6c-2.9,0-5.8,0-8.8,0V198.2z M345.1,198.2h14.2V186c-2.3,0-4.5,0-6.6,0
                          c-0.3,0-0.8,0.3-1,0.5C349.5,190.3,347.4,194.1,345.1,198.2 M446.1,180.5h21.5c0.1-0.2,0.3-0.4,0.4-0.6c-2.9-2.7-5.9-5.5-8.8-8.2
                          C454.6,174.1,449.5,175.9,446.1,180.5 M444.4,251.8h6.8v-12.7h-6.8V251.8z M344.1,239.1h-4.2v9.5c0,3.6,0.1,3.6,3.7,3.3
                          c0.2,0,0.3-0.1,0.6-0.2V239.1z M366.1,180.6c-0.4-3.1-0.7-6.1-1.1-9.6c-3.2,3.3-6.1,6.3-9.2,9.6H366.1z M482.4,210.8
                          c-0.6-2.3-1.2-4.4-1.8-6.5c-0.1-0.3-0.6-0.6-0.9-0.6c-1.3-0.1-2.5,0-3.8,0v7.2H482.4z M388.3,180.5h12.6
                          C397.1,175.7,391.3,175.7,388.3,180.5 M344,215.9v-12.2c-0.2,0-0.3-0.1-0.5-0.1c-1.5,3.9-2.3,8-2.9,12.3H344z"/>
                        <path class="icest2" d="M428.4,168.2c-0.5,0.9-0.8,2-1.2,2c-2.4,0.4-2.2,3.8-4.8,3.8c-0.4,0-1,0-1.2-0.3c-1.3-1.5-2.7-2.8-4.1-4.1
                          c-1.1-1.1-0.2-2.9,1.4-3.7c0.5-0.3,0.8-0.9,1.3-1.3c0.8-0.6,1.5-1.5,2.4-1.7c1.2-0.3,2,0.5,2.6,1.6c0.3,0.6,1,0.9,1.4,1.4
                          C427.1,166.7,427.7,167.4,428.4,168.2"/>
                        <path class="icest2" d="M498.2,191.4c-1-0.9-1.8-1.5-2.5-2.2c-0.5-0.5-1-0.9-1.4-1.5c-0.6-0.8-1.6-1.7-1.7-2.6c0-0.8,0.9-1.9,1.7-2.3
                          c0.7-0.4,1-0.9,1.4-1.5c0.6-0.7,1.6-1.6,2.4-1.6c0.8,0,1.9,0.9,2.3,1.6c0.4,0.8,0.9,1,1.5,1.4c0.8,0.6,1.7,1.6,1.7,2.4
                          c0,0.8-0.9,1.9-1.6,2.4c-0.7,0.4-1.2,0.8-1.5,1.6C500.1,190.1,499.2,190.6,498.2,191.4"/>
                        <path class="icest2" d="M470.7,131.1c1,0.5,2.1,0.8,2.1,1.2c0.4,2.3,3.9,2.2,3.7,4.7c-0.1,0.8-0.8,1.8-1.5,2.4
                          c-0.7,0.5-1.3,0.8-1.7,1.6c-0.4,0.8-1.6,1.5-2.4,1.5c-0.8,0-1.6-1-2.4-1.7c-0.5-0.4-0.9-0.8-1.3-1.3c-0.6-0.8-1.7-1.7-1.7-2.5
                          c0-0.8,1.1-1.7,1.8-2.5c0.3-0.4,0.8-0.8,1.1-1.2C469.2,132.6,470,131.9,470.7,131.1"/>
                        <path class="icest2" d="M385.2,140.3c-1-0.9-1.7-1.7-2.5-2.4c-0.4-0.4-0.9-0.8-1.3-1.3c-0.6-0.8-1.7-1.7-1.7-2.6c0-0.8,1-1.6,1.6-2.4
                          c0.4-0.5,0.9-1.1,1.4-1.5c0.8-0.6,1.6-1.6,2.5-1.6c0.8,0,1.7,1,2.4,1.6c0.5,0.4,1,0.9,1.4,1.4c0.6,0.8,1.6,1.6,1.6,2.4
                          c0,0.8-0.8,2-1.6,2.4c-0.8,0.4-1.1,0.9-1.5,1.6C387.2,138.9,386.2,139.4,385.2,140.3"/>
                        <path class="icest2" d="M409,133.4c1.5,0,2.7,1.2,2.7,2.7c0,1.5-1.3,2.7-2.7,2.6c-1.4,0-2.5-1.2-2.6-2.6
                          C406.4,134.7,407.6,133.5,409,133.4"/>
                        <path class="icest2" d="M429.1,130.1c0,1.5-1.2,2.7-2.7,2.7c-1.4,0-2.5-1.1-2.6-2.5c-0.1-1.5,1.1-2.7,2.5-2.8
                          C427.8,127.4,429,128.6,429.1,130.1"/>
                        <path class="icest2" d="M485.6,159.7c0,1.5-1.3,2.7-2.8,2.6c-1.4-0.1-2.5-1.3-2.5-2.7c0-1.6,1.2-2.7,2.7-2.6
                          C484.6,157.1,485.7,158.3,485.6,159.7"/>
                        <path class="icest2" d="M352.2,151.4c1.5,0,2.7,1.1,2.7,2.7c0,1.4-1.2,2.6-2.6,2.6c-1.5,0-2.7-1.2-2.6-2.7
                          C349.7,152.5,350.8,151.4,352.2,151.4"/>
                        <path class="icest2" d="M450.9,143.8c0,1.4-1.2,2.6-2.6,2.6c-1.5,0-2.7-1.2-2.6-2.7c0-1.5,1.2-2.6,2.8-2.6
                          C449.9,141.2,450.9,142.3,450.9,143.8"/>
                      </g>
                      </svg>

                      <!-- 刺激飛天島 Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                      <svg v-if="this.islandName=='刺激飛天島'" version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
                      <g>
                        <defs>
                          <path id="SVGID_1_" d="M483.6,53.7l-100,124.6c-0.9,1-1.8,1.8-3,2.3l-110.9,50.8c-31.7,14.6-45.9,51.1-32.5,83.3l58.5,139.2
                            c6.7,15.8,5.2,34-3.5,48.7l-2.6,4.3c-3,5.1-3.6,11.2-1.8,16.8c1.9,5.6,6.1,10.2,11.5,12.4c8.1,3.4,16.8,5.1,25.5,5.1
                            c9.7,0,19.2-2.1,28-6.1l87.3-40.1c10.7-4.9,21.6-9.2,32.8-13l85.9-29.1L541.7,51c-6.9-0.4-13.7-2.3-19.8-5.5
                            c-4.4-2.2-9.4-3.4-14.2-3.4C498.2,42.1,489.6,46.4,483.6,53.7"/>
                        </defs>
                        <clipPath id="SVGID_2_">
                          <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                        </clipPath>
                        <path class="flyst0" d="M324.9,539.3c-8.6,0-16.9-1.7-24.8-5c-4.9-1.9-8.7-6.1-10.5-11.3c-1.7-5.1-1.1-10.7,1.7-15.2l2.5-4.2
                          c9.1-15.4,10.5-34.2,3.6-50.4L238.9,314c-13.1-31.2,0.8-66.8,31.5-80.9l110.9-50.8c1.3-0.5,2.4-1.4,3.7-2.8L485,54.8
                          c5.6-6.9,13.9-10.9,22.6-10.9c4.5,0,9.3,1.1,13.4,3.2c5.9,3.1,12.4,5,18.9,5.5l17,398.9l-84.6,28.6c-10.8,3.7-21.9,8.1-33,13.1
                          l-87.3,40.1C343.5,537.3,334.4,539.3,324.9,539.3"/>
                        <path class="flyst1" d="M507.7,45.8c4.2,0,8.7,1.1,12.5,3c5.6,2.9,11.8,4.8,18,5.6l16.9,395.9l-83.3,28.2
                          c-10.9,3.7-22.1,8.1-33.2,13.1l-87.3,40.1c-8.3,3.8-17.2,5.7-26.4,5.7c-8.3,0-16.5-1.6-24.2-4.8c-4.3-1.7-7.8-5.4-9.4-10.2
                          c-1.5-4.6-0.9-9.6,1.5-13.7l2.6-4.3c9.4-15.8,10.8-35.3,3.8-52l-58.5-139.2c-12.7-30.3,0.8-64.8,30.6-78.5L382,183.9
                          c1.6-0.6,3-1.7,4.3-3.3c0,0,0.1-0.1,0.1-0.1L486.4,56C491.8,49.4,499.4,45.8,507.7,45.8 M507.7,42.1c-9.5,0-18.1,4.3-24.1,11.5
                          l-100,124.6c-0.9,1-1.8,1.8-3,2.3l-110.9,50.8c-31.7,14.6-45.9,51.1-32.5,83.3l58.5,139.2c6.7,15.8,5.2,34-3.5,48.7l-2.6,4.3
                          c-3,5.1-3.6,11.2-1.8,16.8c1.9,5.6,6.1,10.2,11.5,12.4c8.1,3.4,16.8,5.1,25.5,5.1c9.7,0,19.2-2.1,28-6.1l87.3-40.1
                          c10.7-4.9,21.6-9.2,32.8-13l85.9-29.1L541.7,51c-6.9-0.4-13.7-2.3-19.8-5.5C517.5,43.4,512.6,42.1,507.7,42.1"/>
                        <path class="flyst2" d="M368.3,290.8c0.6-0.8,1.3-1,2.3-1c6.3,0.1,12.5,0.1,18.8,0.1c0.2,0,0.4,0,0.6,0c0-0.8,0-1.5,0-2.3
                          c0-0.2,0-0.4-0.2-0.6c-0.7-0.7-0.6-1.4-0.4-2.3c0.8-2.6,1.5-5.2,2.2-7.8c0.4-1.5,1.1-1.8,2.6-1.4c1.5,0.4,3,0.9,4.6,1.3
                          c0-3,1.2-5.2,4.2-5.9c2.1-0.5,3.9,0.1,5.3,1.8c1.6,1.9,1.6,3.8,0,6.8c1.1,0.3,2.2,0.6,3.2,0.9c4.4,1.3,6.4,4.8,5.1,9.3
                          c-0.2,0.7-0.4,1.4-0.6,2.1c0.4,0.3,0.7,0.5,1.1,0.8c1.7-1.6,3.3-3.2,5-4.9c1.6-1.6,2.1-1.6,3.7,0.1c1,1,2,1.9,3.1,2.9
                          c1.4-2.5,3.5-3.8,6.5-2.9c2.1,0.6,3.4,2.2,3.7,4.3c0.3,2.7-0.9,4.5-3.4,5.8c0.8,0.9,1.6,1.7,2.4,2.5c3.2,3.3,3.2,7.3-0.1,10.6
                          c-0.7,0.7-1.5,1.4-2.2,2.2c-0.6,0.5-1.2,0.8-2,0.4c-0.2-0.1-0.5-0.1-0.6,0c-0.7,0.3-1.3,0.7-2.1,1.2c1.8,3,3.5,6.2,5.5,9
                          c6.6,9.2,15.6,15,26.8,17.2c2.5,0.5,5.2,0.6,7.7,0.8c1.8,0.2,2.2,0.5,2.2,2.4c0,9.8,0,19.5,0,29.3c0,1.2-0.3,2-1.5,2.4h-0.2
                          c-1.1-0.4-1.5-1.2-1.5-2.3c0-7,0-14,0-21v-1.2c-2.2-0.2-4.2-0.4-6.3-0.5v1.3c0,7.1,0,14.3,0,21.4c0,1.2-0.3,2-1.5,2.3h-0.2
                          c-1.1-0.4-1.5-1.2-1.5-2.4c0-4.1,0-8.3,0-12.4c0-3.4,0-6.7,0-10.1c0-0.3-0.1-0.9-0.3-0.9c-1.9-0.6-3.8-1-5.8-1.6v1.3
                          c0,7.9,0,15.8,0,23.7c0,1.2-0.3,2-1.5,2.3h-0.2c-1.1-0.4-1.5-1.2-1.5-2.4c0.1-0.9,0-1.8,0-2.7c0-7.6,0-15.1,0-22.7
                          c0-0.4-0.1-0.9-0.4-1c-1.9-1-3.8-1.9-5.8-2.8v1.2c0,9.3,0,18.7,0,28c0,1.2-0.3,2-1.5,2.4h-0.2c-1.1-0.4-1.5-1.2-1.5-2.3
                          c0-10.1,0-20.2,0-30.3c0-0.7-0.2-1.1-0.7-1.5c-1.6-1.2-3.1-2.4-4.7-3.7c-0.2-0.2-0.4-0.3-0.7-0.5v1.3c0,11.6,0,23.1,0,34.7
                          c0,1.2-0.3,2-1.5,2.4h-0.2c-1.1-0.4-1.5-1.1-1.5-2.3c0-12,0-24,0.1-35.9c0-2.2-0.2-4.1-2-5.6c-0.3-0.2-0.4-0.5-0.6-0.8
                          c-1.1-1.6-2.3-3.1-3.5-4.9v1.3c0,9.1,0,18.2,0,27.3c0,1.7-0.5,2.4-1.6,2.4c-1.1,0-1.6-0.7-1.6-2.4c0-10.1,0-20.1,0-30.2
                          c0-4.6,0-4.6-2.8-8.3c-1-1.3-2.1-2.6-3.1-3.8c-0.1,0-0.2,0.1-0.2,0.1v1.2c0,19.8,0,39.5,0,59.3c0,0.5,0,1-0.2,1.5
                          c-0.2,0.7-0.8,1-1.5,1c-0.7-0.1-1.2-0.5-1.3-1.2c-0.1-0.5-0.1-1-0.1-1.4c0-20.7,0-41.4,0-62.1c0-0.3,0.1-0.6,0-0.9
                          c-0.1-0.3-0.2-0.7-0.4-0.9c-0.9-0.7-1.8-1.5-2.8-2.1c-0.9-0.6-1.8-1.2-2.9-1.9v1.5c0,22.1,0,44.3,0,66.4c0,0.5,0,1-0.1,1.5
                          c-0.2,0.7-0.7,1.1-1.4,1.1c-0.8,0-1.3-0.4-1.5-1.1c-0.1-0.5-0.1-1-0.1-1.5c0-22.7,0-45.5,0-68.2c0-0.3,0-0.6,0-0.9
                          c0-0.2-0.1-0.5-0.3-0.6c-1.9-0.8-3.8-1.5-5.8-2.4v1.6c0,23.5,0,47,0,70.4c0,0.5,0,1-0.1,1.5c-0.1,0.7-0.6,1.1-1.4,1.2
                          c-0.8,0-1.4-0.3-1.5-1.1c-0.1-0.5-0.1-1-0.1-1.5c0-23.8,0-47.7,0-71.5v-1.5c-2-0.3-4-0.6-6.1-0.9v1.6c0,24.1,0,48.1,0,72.2
                          c0,0.4,0,0.9-0.1,1.3c-0.1,0.8-0.6,1.2-1.4,1.3c-0.8,0.1-1.4-0.3-1.6-1c-0.1-0.5-0.1-1-0.1-1.5c0-24.2,0-48.4,0-72.6v-1.2h-6.1v1.2
                          c0,2.9,0,5.8,0,8.6c0,1.1-0.7,1.8-1.6,1.8c-0.9,0-1.5-0.7-1.5-1.7c0-1.9,0-3.8,0-5.6v-4.2h-6.1v1.4c0,24.2,0,48.5,0,72.7
                          c0,1.2-0.3,2.1-1.5,2.4h-1.6C368.3,347.5,368.3,319.2,368.3,290.8 M371.5,296.1h1.3c4.4,0,8.8,0,13.1,0c6.9,0,13.5,1.2,19.7,4.1
                          c9.9,4.5,17.3,11.6,22.3,21.2c2.2,4.1,4.8,7.9,8,11.2c8,8.3,17.7,13.3,29.2,15c1.7,0.2,3.4,0.3,5.2,0.5V345c-0.5-0.1-1-0.1-1.5-0.1
                          c-4.9-0.3-9.6-1.4-14.1-3.2c-10.7-4.3-18.6-11.7-24-21.8c-3.7-7.1-8.8-13.1-15.3-17.7c-7.8-5.6-16.6-8.7-26.2-9.1
                          c-5.6-0.2-11.3-0.1-16.9-0.2c-0.3,0-0.5,0.1-0.8,0.1V296.1z M419.9,294.8c4.9,5,9.9,10.1,15.1,15.4c0.3-0.5,0.5-0.9,0.9-1.2
                          c2.3-2.3,2.3-4.2,0.1-6.5c-3.3-3.4-6.6-6.7-9.9-10.1c-0.6-0.6-1.2-1.3-1.8-2C422.7,291.9,421.4,293.3,419.9,294.8 M413.3,290.6
                          c0.2-0.6,0.4-1.2,0.5-1.7c0.8-2.7-0.2-4.5-2.9-5.3c-4.5-1.3-9-2.6-13.5-3.9c-1-0.3-2-0.6-3-0.9c-0.6,2-1.1,3.9-1.7,5.9
                          C399.6,286.7,406.4,288.6,413.3,290.6 M404.2,278.3c1.2,0,2.2-0.9,2.2-2.2c0-1.2-1-2.2-2.1-2.2c-1.2,0-2.2,0.9-2.3,2.1
                          C402,277.3,403,278.3,404.2,278.3 M434,290.8c-1.2,0-2.2,1.1-2.2,2.2c0,1.2,1,2.1,2.2,2.1c1.2,0,2.2-1,2.2-2.2
                          C436.3,291.7,435.3,290.7,434,290.8 M412.4,296.6c0.8,0.5,1.6,1,2.4,1.4c0.4-0.8,0.8-1.6,1.2-2.4c-0.7-0.4-1.3-0.9-1.9-1.3
                          C413.5,295.1,413,295.8,412.4,296.6 M422.4,303.6c1.2,1.1,2.3,2.2,3.4,3.3c0.2-0.2,0.4-0.6,0.6-0.9c-1.1-1.1-2.1-2.1-3.1-3.1
                          C423,303.2,422.7,303.4,422.4,303.6 M404.1,291.2c-1.4-0.4-2.8-0.8-4.2-1.2c-0.2,0.5-0.4,0.8-0.6,1.3c1.6,0.5,3.1,0.9,4.6,1.4
                          C404,292.2,404.1,291.8,404.1,291.2 M393.1,288.1c-0.3,1.2,0.6,2,1.3,2.2c0.9,0.3,1.8-0.1,2.4-1.1c-0.2-0.1-0.3-0.2-0.5-0.2
                          C395.3,288.7,394.3,288.4,393.1,288.1 M407.2,292.1c-0.1,1.3,0.5,2,1.4,2.3c0.9,0.2,1.7-0.2,2.2-1.2
                          C409.7,292.9,408.5,292.5,407.2,292.1 M421,300.7c-0.9-0.9-1.8-1.8-2.7-2.7c-0.4,0.8-0.4,1.7,0.3,2.4
                          C419.2,301.2,420.1,301.2,421,300.7 M431.3,311.2c-0.9-0.9-1.9-1.8-2.7-2.6c-0.4,0.8-0.4,1.7,0.3,2.3
                          C429.5,311.7,430.3,311.7,431.3,311.2"/>
                        <path class="flyst2" d="M379,375.8c-1.1-0.4-1.4-1.2-1.4-2.4c0-19,0-38.1,0-57.1c0-0.3,0-0.7,0.1-1c0.2-0.8,0.7-1.3,1.6-1.3
                          c0.9,0.1,1.4,0.6,1.4,1.5c0,0.2,0,0.5,0,0.7c0,19.1,0,38.2,0,57.3c0,1.2-0.4,2-1.5,2.3H379z"/>
                        <path class="flyst2" d="M425.4,375.8c-1.2-0.3-1.5-1.1-1.5-2.3c0.1-3.7,0-7.3,0-11c0-0.6,0.3-1.3,0.7-1.7c0.3-0.3,1.2-0.3,1.5-0.1
                          c0.4,0.3,0.8,1,0.9,1.6c0.1,1.6,0,3.2,0,4.8c0,2.1,0,4.2,0,6.3c0,1.2-0.3,2-1.4,2.4H425.4z"/>
                        <path class="flyst2" d="M374.7,275.2c3.2,0.4,6.5,0.9,9.7,1.3c0.5,0.1,1.1,0.1,1.6,0.2c1,0.2,1.5,0.9,1.4,1.8
                          c-0.1,0.9-0.9,1.4-1.9,1.3c-2.5-0.3-4.9-0.7-7.4-1c-1.3-0.2-2.5-0.3-3.8-0.5c-1-0.2-1.6-0.9-1.5-1.7
                          C373,275.7,373.7,275.2,374.7,275.2"/>
                        <path class="flyst2" d="M375.1,280.7c3.5,0.5,7.3,1,11,1.5c1,0.1,1.5,0.9,1.4,1.8c-0.1,0.8-0.8,1.4-1.8,1.3c-2.8-0.3-5.7-0.7-8.5-1.1
                          c-0.9-0.1-1.8-0.2-2.7-0.4c-1-0.2-1.6-0.9-1.5-1.7C373,281.1,373.7,280.6,375.1,280.7"/>
                      </g>
                      </svg>

                      <!-- 驚險火山島 Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                      <svg v-if="this.islandName=='驚險火山島'" version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
                      <g>
                        <defs>
                          <path id="SVGID_1_" d="M209.6,479.8c0.4,3.4,1.5,8.3,4.7,13.2c7.2,10.8,20.2,13.7,28.7,15.3c42.3,8.1,65,7.1,65,7.1
                            c49.4-2.1,74.2-2.9,88.1-5.9c89.3-19.1,148.9-71.6,173.4-96.4c22.5-22.7,35-41.7,60-79.8c47.7-72.7,70.8-134.7,78.1-155.5
                            c7.8-21.9,13.1-40.5,16.4-53.1L235,93.2C226.5,222.1,218.1,350.9,209.6,479.8"/>
                        </defs>
                        <clipPath id="SVGID_2_">
                          <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                        </clipPath>
                        <path class="firest0" d="M305.4,511.6c-7.4,0-28.3-0.7-61.7-7.1c-6.9-1.3-19.6-3.8-26.2-13.6c-2.1-3.2-3.5-6.9-4-11.2l25.1-382.4
                          l480.5,31c-4.4,16.2-9.5,32.4-15.1,48.3c-18,50.7-45.6,105.6-77.7,154.7c-24.7,37.7-37.1,56.6-59.5,79.2
                          c-27.6,27.8-86.7,77.2-171.5,95.3c-12.2,2.6-34,3.5-73.5,5.2l-13.9,0.6C307.7,511.5,306.9,511.6,305.4,511.6"/>
                        <path class="firest1" d="M242.1,101.3l472,30.5c-4.1,14.6-8.7,29.2-13.8,43.5C687.7,211,664,266.6,623,329.2
                          c-24.6,37.5-36.9,56.3-59.1,78.6c-27.3,27.5-85.7,76.4-169.6,94.3c-11.9,2.5-33.5,3.4-72.9,5.1l-13.9,0.6c-0.1,0-0.8,0-2.2,0
                          c-7.3,0-27.9-0.7-61-7c-8.7-1.7-18.5-4.1-23.7-12c-1.7-2.6-2.9-5.7-3.4-9.2L229.9,287L242.1,101.3 M235,93.2
                          c-8.5,128.9-16.9,257.7-25.4,386.6c0.4,3.4,1.5,8.3,4.7,13.2c7.2,10.8,20.2,13.7,28.7,15.3c34.1,6.5,55.5,7.2,62.4,7.2
                          c1.7,0,2.5,0,2.5,0c49.4-2.1,74.2-2.9,88.1-5.9c89.3-19.1,148.9-71.6,173.4-96.4c22.5-22.7,35.1-41.7,60-79.8
                          c47.7-72.7,70.8-134.7,78.1-155.5c7.8-21.9,13.1-40.5,16.4-53.1L235,93.2z"/>
                        <path class="firest2" d="M507.7,345.9c-1,1.5-2.3,2-4.1,2c-64.1,0-128.1,0-192.2,0c-0.3,0-0.5,0-0.8,0c-1.6,0-2.8-0.6-3.2-2.3
                          c-0.4-1.6,0.4-2.7,1.8-3.5c6.5-3.5,12.6-7.7,18.4-12.2c2.6-2,5-4.1,7.6-6.2c1.6-1.4,3.4-1.4,4.5-0.1c1.2,1.3,1,3-0.6,4.5
                          c-5,4.4-10.3,8.6-15.9,12.4c-0.6,0.4-1.3,0.6-1.6,1.4h172c-0.4-0.8-1.2-1.1-1.8-1.5c-17.8-12.3-32.7-27.5-45.2-45.1
                          c-1.4-1.9-1.3-3.5,0.2-4.6c1.5-1.1,3.2-0.6,4.6,1.3c11.2,15.6,24.3,29.3,39.8,40.7c4.5,3.3,9.2,6.5,14.1,9.1c1,0.5,1.8,1.2,2.5,2.1
                          V345.9z"/>
                        <path class="firest2" d="M453,323.7c0,1.2-0.5,2-1.5,2.6c-1.2,0.7-2.4,0.4-3.5-0.4c-3.3-2.5-6.3-5.3-9.1-8.3c-6.9-7.3-12.4-15.6-16-25
                          c-0.2-0.6-0.4-1.2-0.6-1.9c-0.5-1.8,0.2-3.2,1.8-3.8c1.5-0.5,3,0.2,3.7,1.9c0.5,1.2,0.9,2.5,1.4,3.6c4.9,11.1,12.1,20.3,21.5,28
                          C451.8,321.4,453,322.1,453,323.7"/>
                        <path class="firest2" d="M387.9,298.8c-0.1,0.5-0.3,1.1-0.5,1.7c-4.3,12.9-11.5,23.7-22,32.4c-0.7,0.6-1.4,1.2-2.2,1.6
                          c-1.4,0.6-2.7,0.3-3.6-1c-0.9-1.2-0.7-2.5,0.3-3.6c0.3-0.3,0.7-0.6,1-0.9c9.8-8,16.7-18,20.8-29.9c0.2-0.7,0.4-1.4,0.8-2
                          c0.8-1.2,1.9-1.6,3.2-1.2C387.1,296.3,387.7,297.3,387.9,298.8"/>
                        <path class="firest2" d="M410.5,301.9c0,4.3,0,8.6,0,12.9c0,2.2-1.1,3.4-2.9,3.4c-1.8,0-2.9-1.2-2.9-3.4c0-4.3,0-8.6,0-12.9
                          c0-4.2,0-8.5,0-12.7c0-2.4,1-3.6,2.8-3.7c1.9-0.1,3,1.2,3,3.7C410.5,293.4,410.5,297.6,410.5,301.9"/>
                        <path class="firest2" d="M437.1,159.7c-1,0.2-1.9,0.1-2.9-0.2c-5.3-1.6-10.5-1.6-15.7,0.4c-1.2,0.5-1.9,0.4-2.7-0.8
                          c-3.6-5.5-8.7-9-15-10.9c-1.2-0.3-2.4-0.2-3.5-0.9h-7.4c-0.7,0.7-1.7,0.5-2.5,0.7c-8.2,2.2-14.2,6.9-17.9,14.6
                          c-1.6,3.4-1.6,3.5-5.3,3.3c-18.1-0.6-30.3,18.4-22,34.4c5.5,10.6,18.3,15.6,30,11.5c0.8-0.3,1.6-0.7,2.6-0.1
                          c5.8,3.4,12,4.4,18.6,3.3c1.1-0.2,1.5,0.1,1.5,1.3c0,5.9,0,11.7,0,17.6c0,0.7-0.1,1.2-0.8,1.6c-2.8,1.3-4.1,3.6-5,6.4
                          c-7.3,21.7-18,41.6-32.4,59.4c-3.8,4.7-7.8,9.1-12,13.4c-1.7,1.7-1.9,3.5-0.5,4.8c1.4,1.3,3,1.1,4.8-0.7c0.2-0.2,0.4-0.4,0.5-0.6
                          c11-11.2,20.4-23.6,28.3-37.1c0.5-0.8,0.8-1.6,1.8-1.9c6.2-1.4,10.9-5.1,15-9.7c0.8-0.9,1.7-1.8,2.7-2.8c0.5,1.3,0.9,2.4,1.3,3.5
                          c0.9,2.3,1.8,4.6,3.5,6.5c2.3,2.5,5.6,3.3,8.5,1.9c2.1-1,3.5-2.8,4.4-4.8c1-2.2,1.9-4.5,2.9-7c1,1.1,1.9,2.1,2.9,3.1
                          c3.3,3.6,6.9,7,11.6,8.3c3.4,0.9,5.3,2.9,6.7,5.8c1,2.1,2.7,2.6,4.3,1.6c1.5-0.9,1.9-2.7,0.7-4.6c-7.7-12.6-13.8-26-18.4-40
                          c-0.8-2.3-2.2-4.2-4.4-5.3c-0.8-0.4-1.2-0.9-1.2-1.8c0-5.2,0-10.3,0-15.5c0-0.9,0.3-1.4,1.2-1.6c2.3-0.6,4.6-1.5,6.6-2.9
                          c0.9-0.6,1.5-0.4,2.3,0c5.9,2.8,12.1,3.4,18.5,2.2c13-2.4,23.2-14.1,23.6-26.9C473.1,170.3,455.9,155.9,437.1,159.7 M420.2,243.1
                          c3.1,9.4,6.9,18.6,11.4,27.4c0.1,0.2,0.1,0.5,0.3,1.1c-2.8-1.6-4.8-3.5-6.7-5.6c-1.6-1.6-3-3.5-4.9-4.8c-2.7-1.8-5.4-1.2-7,1.6
                          c-1.3,2.2-1.8,4.7-2.9,7c-0.6,1.4-1,3.4-2.8,3.4c-1.8,0-2.2-2-2.8-3.4c-0.9-2-1.5-4-2.4-6c-1.9-4.2-5.3-5-8.7-1.8
                          c-1.9,1.7-3.5,3.7-5.3,5.5c-1.5,1.5-3,2.8-4.9,3.8c-0.3-0.7,0.2-1.1,0.4-1.5c4.2-8.5,7.8-17.2,10.8-26.2c0.9-2.6,1.5-3.1,4.2-3.1
                          c5.9,0,11.7,0,17.6,0C418.3,240.6,419.6,241.2,420.2,243.1 M431.7,201.4c-2.8,5.7-7.4,9.1-13.7,10.2c-3,0.5-3.7,1.2-3.7,4.2
                          c0,5.7,0,11.5,0,17.2c0,1.3-0.3,1.7-1.6,1.7c-3.5-0.1-6.9-0.1-10.4,0c-1.3,0-1.6-0.4-1.6-1.7c0.1-6.9,0-13.8,0-20.7
                          c0-4-1.5-5.1-5.2-3.8c-11.6,4-23.4-2-27-13.8c-0.7-2.2-2-3.2-3.8-2.7c-1.7,0.5-2.4,2.1-1.8,4.3c1,3.9,2.9,7.2,5.7,10.6
                          c-7.2,1.5-13.3-0.1-18.2-5.1c-5.3-5.4-6.4-13.4-3-20.1c3.5-6.7,11.2-10.7,18.6-9.7c1.4,0.2,1.8,1.3,0.7,2.9
                          c-1.4,2.1-2.6,4.2-3.4,6.6c-0.7,2.1-0.1,3.7,1.6,4.3c1.7,0.6,3-0.2,3.9-2.3c0.1-0.2,0.2-0.5,0.3-0.7c2.9-4.3,3.8-9.2,4.7-14.3
                          c1.5-8.4,8.9-14.2,17.8-15.2c8.2-1,16.6,3.5,20.5,10.9c2,3.8,2.6,4,6.3,2.1c12-6,26,1.8,26.9,15.1c0.5,6.8-3.6,13.5-10.2,16.6
                          C433.5,198.9,432.5,199.9,431.7,201.4 M458.8,205c-6.9,6-17.8,7.8-24.9,4c1.1-1.6,2.2-3.1,3-4.8c0.3-0.6,0.8-0.8,1.3-1.1
                          c14.1-7.3,17.3-25.7,6.4-37.1c-0.2-0.2-0.5-0.4-0.4-0.8c8.7-0.1,17.6,6.2,20.9,14.8C468.5,188.9,466.1,198.7,458.8,205"/>
                        <path class="firest2" d="M471.3,241.5c-6.1,0-11.2,5-11.2,11c0,6,5.1,11,11.2,11c6.2,0,11.4-5.1,11.3-11.1
                          C482.6,246.4,477.4,241.5,471.3,241.5 M471.3,257.6c-2.9,0-5.3-2.4-5.3-5.2c0-2.8,2.4-5.1,5.4-5.1c2.9,0,5.3,2.4,5.3,5.2
                          C476.7,255.4,474.2,257.7,471.3,257.6"/>
                        <path class="firest2" d="M349.4,221.9c-6.2,0-11.2,5-11.2,11c0,6.1,5.2,11.2,11.3,11c6.2-0.1,11.1-5,11-11.1
                          C360.6,226.8,355.5,221.9,349.4,221.9 M349.4,238.1c-2.9,0-5.3-2.3-5.3-5.1c0-2.8,2.4-5.1,5.3-5.1c2.9,0,5.3,2.3,5.3,5.1
                          C354.7,235.8,352.3,238.1,349.4,238.1"/>
                        <path class="firest2" d="M341.1,269.3c-6.2,0.1-11.1,5-11.1,11c0,6.1,5,11,11.2,11c6.1,0,11.2-4.9,11.2-10.9
                          C352.4,274.3,347.3,269.2,341.1,269.3 M341.1,285.4c-2.9,0-5.3-2.3-5.2-5.2c0-2.8,2.4-5.1,5.4-5.1c2.9,0,5.3,2.4,5.3,5.2
                          C346.4,283.2,344,285.5,341.1,285.4"/>
                      </g>
                      </svg>

                      <!-- 溫馨親子島 Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                      <svg v-if="this.islandName=='溫馨親子島'" version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
                      <g>
                        <defs>
                          <path id="SVGID_1_" d="M399.6,66.7l-81.5,67.7c-6.7,5.7-14.4,9.8-22.8,11.6l14.4,341l227.3,5.4l9.6-285.1l-38.6-26
                            c-20.5-14.1-27.9-40.6-17.5-63.2c3.4-7.3,3.4-15.7,0.5-23.2c-3.3-7.4-9.1-13.3-16.9-16.1l-45.6-17c-3.3-1.1-6.7-1.7-10.1-1.7
                            C411.6,60,404.9,62.2,399.6,66.7"/>
                        </defs>
                        <clipPath id="SVGID_2_">
                          <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                        </clipPath>
                        <path class="childst0" d="M311.9,484.8l-14.2-336.9c7.9-2.1,15.4-6.1,21.9-11.7L401,68.5c4.8-4,11-6.1,17.4-6.1c3.2,0,6.3,0.5,9.3,1.6
                          l45.5,17c7,2.5,12.5,7.8,15.6,14.9c2.8,7.2,2.6,14.8-0.4,21.3c-10.8,23.6-3.1,51.4,18.3,66.1l37.5,25.3l-9.5,281.5L311.9,484.8z"/>
                        <path class="childst1" d="M418.4,64.6L418.4,64.6c2.9,0,5.8,0.5,8.5,1.4l45.6,17c6.3,2.3,11.3,7.1,14.2,13.5c2.5,6.6,2.4,13.5-0.4,19.5
                          c-11.3,24.6-3.2,53.6,19.1,69l36.4,24.6l-9.4,277.9l-218.3-5.2l-14.1-332.9c7.5-2.3,14.7-6.2,21-11.6l81.5-67.7
                          C406.9,66.6,412.5,64.6,418.4,64.6 M418.4,60c-6.8,0-13.5,2.2-18.9,6.7l-81.5,67.7c-6.7,5.7-14.4,9.8-22.8,11.6l14.4,341l227.3,5.4
                          l9.6-285.1l-38.6-26c-20.5-14.1-27.9-40.6-17.5-63.2c3.4-7.3,3.4-15.6,0.5-23.2c-3.3-7.4-9.1-13.3-16.9-16.1l-45.6-17
                          C425.3,60.6,421.8,60,418.4,60"/>
                        <path class="childst2" d="M415.4,374.7v-68.2c-1.9,0.8-3.9,1.2-5.9,0.7c-2-0.5-3.6-1.7-4.8-3.2c-4.6,5-10.5,4.1-13.8,0
                          c-2.9,3.2-5.5,3.9-9.4,3.1v34.3c1.1,0.4,1.5,0,1.7-1c0.8-2.9,1.7-5.9,2.6-8.8c2.1-6.4,8.3-10.8,14.9-10.8c3.1,0,5.6,2.2,5.4,5.3
                          c-0.1,2,0.5,3.1,2.4,3.7c0.3,0.1,0.6,0.3,0.9,0.5c3.1,1.6,3.8,4,2,7c-1.2,2-3,3-5.3,3.2c-0.6,0-1.3,0-2,0v1.5c0,8.4,0,16.7,0,25.1
                          c0,1.9-0.4,2.4-2.3,2.4c-0.8,0-1.6,0-2.3,0c-2,0-2.2-0.1-2.8-1.9c-1.1-3-2.2-6.1-3.3-9.2c-4.8,0.9-9.6,1-14.6,0
                          c-0.7,2-1.4,3.9-2.1,5.8c-0.5,1.3-1,2.6-1.4,3.9c-0.3,1-0.9,1.5-2,1.4c-1.1,0-2.2,0-3.4,0c-1.4,0-1.9-0.6-1.9-2c0-2.5,0-5.1,0-7.6
                          c-1.3,0.4-2.5,0.9-3.7,1.2c-1.8,0.4-2.5-0.3-2.5-2.1c0-2.5,0-5.1,0-7.6c0.1-5.5,4.3-9.7,9.8-9.8c2.2,0,4.4,0,6.8,0V340
                          c0-11.1,0-22.2,0-33.2c0-1.2-0.2-2.1-1.2-2.8c-2.7,3.1-6.1,4.4-10.1,2.8c-4.1-1.7-5.5-5.2-5.2-9.4c-1.9-0.5-2.1-0.8-2.1-2.7
                          c0-1.6,0-3.2,0-4.8c0-1.5,0.5-2,2-2.1c0.8-0.1,1.6-0.3,2.3-0.7c17.5-10.6,34.9-21.2,52.4-31.8c6-3.6,12.1-3.7,18.1,0
                          c17.5,10.6,34.9,21.2,52.4,31.7c0.7,0.4,1.6,0.6,2.4,0.7c1.4,0.1,1.9,0.6,1.9,2c0,1.6,0,3.3,0,4.9c0,1.9-0.2,2.1-2.1,2.6
                          c0.3,4.4-1.1,8-5.5,9.6c-3.9,1.5-7.2,0.2-9.8-2.9c-4.5,5.1-10.6,4-13.8,0c-1.4,1-2,2.2-2,4.1c0.1,10.6,0,21.3,0,31.9v1.4
                          c1,0.4,1.5,0.1,1.8-0.9c0.8-2.9,1.7-5.9,2.6-8.8c2.1-6.5,8.3-10.9,15-10.8c3,0,5.5,2.2,5.3,5.3c-0.1,2.1,0.6,3.2,2.5,3.8
                          c0.2,0.1,0.4,0.2,0.6,0.3c3.9,2,4.4,6,0.9,8.7c-1.1,0.8-2.6,1.1-4,1.6c-0.5,0.2-1.2,0-2,0v1.5c0,8.4,0,16.7,0,25.1
                          c0,2-0.4,2.4-2.4,2.4c-5.1,0-4.1,0.7-5.9-4.1c-0.9-2.3-1.7-4.7-2.5-6.9c-2.6,0.2-5,0.5-7.4,0.5c-2.4,0-4.8-0.3-7.3-0.5
                          c-1.1,2.9-2.2,5.9-3.3,9c-0.7,1.8-0.9,2-2.8,2c-0.9,0-1.7,0-2.6,0c-1.6,0-2.1-0.5-2.1-2.1c0-2.5,0-5,0-7.5
                          c-1.2,0.4-2.4,0.9-3.5,1.2c-1.9,0.4-2.7-0.2-2.7-2.2c0-2.5,0-5,0-7.5c0.1-5.6,4.3-9.8,9.9-9.9c2.2,0,4.4,0,6.6,0v-34.3
                          c-3.5,0.6-6.4-0.6-8.7-3.3c-3,3.5-6.5,4.4-10.8,2.6v68.2h1.5h51.7c2.2,0,2.5,0.3,2.5,2.5c0,1.6,0,3.3,0,4.9c0,1.3-0.6,1.8-1.8,1.9
                          c-0.3,0-0.6,0-0.9,0h-126c-2.4,0-2.7-0.3-2.7-2.8c0-1.4,0-2.8,0-4.3c0-1.8,0.4-2.3,2.3-2.3c12.5,0,25,0,37.5,0H415.4z M401,366.3
                          v-1.3c0-8.4,0-16.7,0-25.1c0-2,0.4-2.4,2.4-2.4c1.2,0,2.4,0,3.6-0.2c1.3-0.3,2.1-1.4,2.3-2.7c0.2-1.3-1.1-1.3-1.8-1.6
                          c-2.2-0.9-4.4-2-6.7-2.5c-3.4-0.8-5.5,0.7-6.4,4.1c-0.6,1.9-1.1,3.9-1.7,5.8c-0.9,2.9-2.9,4.4-5.9,4.4c-2.8,0-5.7,0-8.5,0
                          c-4.3,0-7.1,2.8-7.1,7.1c0,4.5,0,9,0,13.4c0,0.4,0,0.7,0.1,1.1h1.4c1.2-3.3,2.4-6.6,3.6-9.8c0.5-1.4,1-1.7,2.4-1.4
                          c5,1.1,9.9,1.1,14.9,0c1.5-0.3,2-0.1,2.5,1.4c1.1,2.9,2.1,5.7,3.1,8.6C399.3,366.2,399.8,366.7,401,366.3 M447.5,366.2
                          c1.2,0.4,1.6,0,1.9-1c1-2.9,2.1-5.8,3.2-8.7c0.5-1.4,1-1.7,2.5-1.3c5,1.1,9.9,1.1,14.9,0c1.5-0.3,1.9-0.1,2.5,1.3
                          c1.1,2.9,2.2,5.8,3.2,8.7c0.3,1,0.8,1.4,2,1v-1.4c0-8.4,0-16.9,0-25.3c0-1.7,0.5-2.1,2.2-2.1c0.9,0,1.9,0,2.8,0
                          c1.6-0.1,2.9-1.2,3.2-2.7c0.1-0.4-0.1-1-0.3-1.1c-2.9-1.5-5.7-3.2-9.1-3.4c-2.9-0.1-4.6,1.1-5.5,3.9c-0.6,2.1-1.2,4.1-1.8,6.2
                          c-0.9,2.9-2.9,4.4-5.9,4.4c-2.9,0-5.8,0-8.7,0c-4.1,0-6.9,2.9-7,6.9c0,2.2,0,4.3,0,6.5V366.2z M487.8,377.9h-125v3h125V377.9z
                          M362.7,293.9h125.1v-2.9H362.7V293.9z M435.5,287.7c0-0.2,0-0.3,0-0.3c-3-10.1-5.9-20.3-9-30.4c-0.1-0.5-0.8-1.2-1.3-1.1
                          c-0.4,0-1.1,0.7-1.2,1.2c-1.7,5.6-3.3,11.1-5,16.7c-1.4,4.7-2.7,9.3-4.1,14H435.5z M411.7,287.7c2.8-9.4,5.5-18.7,8.2-28
                          c-0.1-0.1-0.2-0.1-0.3-0.2c-9.2,9.3-18.5,18.7-27.9,28.2H411.7z M430.9,259.5c-0.1,0.1-0.2,0.1-0.3,0.2c2.7,9.3,5.5,18.7,8.2,27.9
                          h19.9C449.3,278.2,440.1,268.8,430.9,259.5 M481.3,287.7c0-0.1,0-0.2,0-0.3c-15.1-9.2-30.2-18.3-45.2-27.5c0,0.3,0,0.4,0.1,0.5
                          c8.8,8.9,17.6,17.8,26.4,26.6c0.3,0.3,1,0.6,1.5,0.6c3.1,0.1,6.3,0,9.4,0H481.3z M368.9,287.7c0.5,0,0.7,0.1,0.8,0.1
                          c5.6,0,11.3,0,16.9,0c0.5,0,1.1-0.3,1.4-0.7c8.7-8.7,17.3-17.5,25.9-26.2c0.2-0.2,0.4-0.4,0.6-0.7c0,0-0.1-0.1-0.2-0.1
                          C399.3,269.2,384.2,278.4,368.9,287.7 M418.6,369.6c4.4-2.2,8.7-4.3,12.9-6.4c0.2-0.1,0.5-0.4,0.5-0.6c0-2.2,0-4.5,0-6.9
                          c-4.5,2.2-8.7,4.4-13,6.5c-0.2,0.1-0.4,0.6-0.4,0.9C418.5,365.1,418.6,367.2,418.6,369.6 M418.6,326.5c4.5-2.2,8.7-4.4,13-6.5
                          c0.2-0.1,0.4-0.4,0.4-0.7c0-2.2,0-4.4,0-6.8c-4.5,2.2-8.7,4.4-13,6.5c-0.2,0.1-0.5,0.5-0.5,0.8C418.5,322,418.6,324.1,418.6,326.5
                          M418.6,337.1c0.2,0,0.3,0,0.4,0c4.2-2.1,8.3-4.1,12.4-6.2c0.3-0.1,0.6-0.5,0.6-0.8c0-2.2,0-4.3,0-6.5c-0.2,0-0.3-0.1-0.4,0
                          c-4.2,2.1-8.3,4.1-12.5,6.2c-0.3,0.1-0.6,0.5-0.6,0.7C418.5,332.6,418.6,334.8,418.6,337.1 M418.6,348c4.5-2.2,8.7-4.4,13-6.5
                          c0.2-0.1,0.4-0.4,0.5-0.7c0-2.2,0-4.4,0-6.8c-4.3,2.2-8.4,4.2-12.5,6.2c-0.2,0.1-0.4,0.1-0.4,0.2c-0.2,0.3-0.4,0.6-0.5,0.9
                          C418.5,343.6,418.6,345.7,418.6,348 M432,345c-0.2,0-0.3,0-0.4,0c-4.2,2.1-8.4,4.2-12.6,6.3c-0.2,0.1-0.5,0.5-0.5,0.8
                          c0,2.2,0,4.4,0,6.5c0.2,0,0.3,0.1,0.4,0c4.2-2.1,8.4-4.2,12.6-6.3c0.2-0.1,0.5-0.5,0.5-0.8C432,349.4,432,347.2,432,345 M432,304.1
                          c-2,2.2-4.1,3.3-6.8,3.3c-2.6,0-4.7-1.2-6.6-3.2v11.5c4.4-2.2,8.6-4.3,12.9-6.5c0.2-0.1,0.5-0.5,0.5-0.8
                          C432,307.1,432,305.8,432,304.1 M479.5,327.4c0.3-2.7-0.6-3.8-3.3-3.4c-4.8,0.6-8.5,2.9-10.4,7.4c-1.4,3.2-2.2,6.7-3.3,10
                          c2.1,0.2,3.1-0.4,3.6-2.2c0.6-2.1,1.2-4.3,1.8-6.4c1.1-3.6,4.1-5.8,7.8-5.7C477,327.1,478.2,327.3,479.5,327.4 M402.9,327.5
                          c0.4-2.7-0.5-3.8-3.2-3.5c-5.3,0.6-9,3.4-10.9,8.4c-0.7,1.9-1.2,3.9-1.8,5.8c-0.3,1.1-0.6,2.2-1,3.3c2.2,0.1,3-0.4,3.6-2.3
                          c0.6-2.1,1.2-4.1,1.8-6.2c1.1-3.8,4.1-6,8.1-5.9C400.6,327.1,401.8,327.3,402.9,327.5 M418.6,374.6h13.3v-8.2
                          c-0.5,0.2-0.9,0.4-1.2,0.6c-3.7,1.8-7.3,3.7-11,5.5C418.7,372.9,418.3,373.4,418.6,374.6 M461.4,297.1c-0.2,2.7,0.2,5,2.6,6.5
                          c1.9,1.1,3.9,1.1,5.7-0.2c2.2-1.5,2.6-3.7,2.3-6.2c-0.3,0-0.6-0.1-0.8-0.1C467.9,297.1,464.7,297.1,461.4,297.1 M420.1,297.1
                          c-0.5,2.9,0.4,5.1,2.4,6.4c1.9,1.1,4.2,1.1,6-0.3c2.1-1.6,2.4-3.7,2.1-6.1H420.1z M389.2,297.1h-10.6c-0.3,2.6,0.1,4.8,2.4,6.3
                          c1.9,1.2,3.9,1.2,5.7,0C389,302,389.5,299.7,389.2,297.1 M406.2,297.1c-0.3,2.8,0.2,5.1,2.7,6.5c1.9,1.1,3.9,1,5.7-0.3
                          c2.1-1.5,2.4-3.7,2.1-6.1H406.2z M444.4,297.2h-10.6c-0.3,4.3,1.7,7,5.2,7C442.5,304.3,444.6,301.5,444.4,297.2 M475.2,297.1
                          c-0.4,2.7,0.2,4.9,2.5,6.4c1.8,1.1,4.2,0.9,5.9-0.4c1.8-1.3,2.5-3.7,1.9-6H475.2z M458.1,297.1h-10.5c-0.3,2.6,0.2,4.9,2.6,6.3
                          c1.9,1.1,3.8,1,5.6-0.2C458,301.8,458.4,299.6,458.1,297.1 M364.8,297.1c-0.3,2.7,0.2,4.9,2.6,6.3c1.9,1.1,3.9,1,5.7-0.2
                          c2.1-1.5,2.5-3.6,2.2-6.1H364.8z M392.4,297.1c-0.4,2.7,0.2,4.9,2.5,6.4c1.8,1.1,4.2,0.9,5.9-0.4c1.8-1.3,2.5-3.7,1.9-6H392.4z
                          M370.2,345c-2.5,0.1-5,2.3-5.3,5.1c-0.3,2.5-0.1,5-0.1,7.5c1.9-0.7,3-2.2,2.9-4.4C367.7,350.3,368.1,347.4,370.2,345 M441.3,357.7
                          c2-0.8,3.1-2.2,3.1-4.3c-0.1-3,0.3-5.9,2.4-8.4c-2.8,0.2-5.3,2.9-5.5,5.9C441.2,353.1,441.3,355.4,441.3,357.7"/>
                        <path class="childst2" d="M379.2,263.4c0,2.6-2.1,4.7-4.7,4.7c-2.5,0-4.6-2.1-4.6-4.6c0-2.6,2.1-4.7,4.7-4.7
                          C377.2,258.8,379.2,260.9,379.2,263.4 M374.6,265c0.9-0.1,1.5-0.6,1.5-1.6c0-0.9-0.7-1.5-1.6-1.5c-0.9,0-1.4,0.6-1.4,1.5
                          C373.1,264.4,373.7,264.9,374.6,265"/>
                        <path class="childst2" d="M366.2,314.7c2.6,0,4.7,2.1,4.7,4.7c0,2.5-2.1,4.6-4.6,4.6c-2.6,0-4.7-2.1-4.7-4.7
                          C361.6,316.8,363.7,314.7,366.2,314.7 M366.3,317.8c-0.9,0.1-1.6,0.6-1.6,1.5c0,0.9,0.5,1.5,1.4,1.5c1,0.1,1.6-0.5,1.6-1.4
                          C367.9,318.4,367.3,317.9,366.3,317.8"/>
                        <path class="childst2" d="M491,271.7c0,2.6-2.1,4.7-4.7,4.6c-2.5,0-4.6-2.1-4.6-4.7c0-2.6,2.1-4.7,4.7-4.6
                          C488.9,267.1,491,269.2,491,271.7 M487.9,271.6c-0.2-0.9-0.6-1.5-1.6-1.5c-0.9,0-1.5,0.6-1.5,1.5c0,1,0.5,1.6,1.5,1.6
                          C487.3,273.2,487.8,272.6,487.9,271.6"/>
                        <path class="childst2" d="M463.6,252.6c2.5,0,4.6,2.1,4.6,4.6c0,2.6-2.1,4.7-4.7,4.7c-2.5,0-4.6-2.1-4.6-4.6
                          C458.9,254.6,461,252.5,463.6,252.6 M463.7,255.7c-1,0-1.6,0.5-1.7,1.4c-0.1,0.9,0.4,1.5,1.3,1.6c1,0.1,1.6-0.4,1.7-1.3
                          C465.2,256.4,464.6,255.9,463.7,255.7"/>
                      </g>
                      </svg>

                      <!-- 慢活樂園島 Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
                      <svg v-if="this.islandName=='慢活樂園島'" version="1.1" id="圖層_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
                      <g>
                        <defs>
                          <path id="SVGID_1_" d="M330.3,136.4c-6.4,4.3-14.8,9-25.6,12.1c-10.8,3.1-18.5,3-20.5,3.3c-12.4,1.8-24,49.5-23.3,240.3l63.2,1.5
                            c2.7,0,5.2,1.1,7,3.1c1.7,2,2.7,4.6,2.5,7.3l-4.9,72.1l270,17.5c0.6-3.9,0.8-8,1-11.9c1.6-45.2-14.7-83.6-31.9-111.1
                            c-24.8-38.8-50.6-84.3-74.9-136.4c-20-43-35.8-83.8-48.3-121.1c-1.3-6-7.3-10.2-13.6-9.1c-1.8,0.3-3.6,0.4-5.5,0.4
                            c-7.6,0-13.1-3.4-19.8-7.2c-10.4-5.9-15.6-8.9-19.7-9.3c-0.5,0-0.9-0.1-1.4-0.1C369.5,87.9,362.3,114.9,330.3,136.4"/>
                        </defs>
                        <clipPath id="SVGID_2_">
                          <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                        </clipPath>
                        <path class="heavenst0" d="M330.8,474.2l4.7-70c0.2-3.2-0.9-6.3-3-8.8c-2.3-2.4-5.4-3.8-8.6-3.8l-61.1-1.5
                          c-0.7-202.6,13.2-235,21.6-236.2c0.4-0.1,1-0.1,1.9-0.2c3.6-0.2,10.2-0.7,18.9-3.2c9.1-2.6,17.6-6.6,26.2-12.4
                          c16.1-10.8,25.8-22.7,33.7-32.3C372.6,96.6,378,90,384.8,90c0.4,0,0.8,0,1.2,0.1c3.6,0.4,8.7,3.3,18.8,9.1l1,0.6
                          c6.5,3.7,12.1,6.9,19.8,6.9c1.9,0,3.9-0.1,5.8-0.4c0.6-0.1,1.2-0.2,1.7-0.2c4.6,0,8.5,3.2,9.5,7.6c0,0.1,0,0.2,0.1,0.2
                          c13.8,41.2,30.1,82,48.4,121.3c21.8,47,47.1,92.9,75,136.6c15.3,24.5,33.2,63.5,31.5,109.9c-0.1,3.6-0.4,6.8-0.7,9.7L330.8,474.2z"
                          />
                        <path class="heavenst1" d="M384.8,87.9v4.2c0.3,0,0.6,0,1,0.1c3.2,0.3,8.4,3.3,18,8.8l1,0.6c6.5,3.7,12.6,7.2,20.9,7.2
                          c2,0,4.1-0.2,6.1-0.5c0,0,0.1,0,0.1,0c0.4-0.1,0.9-0.1,1.3-0.1c3.5,0,6.7,2.6,7.4,5.9c0,0.2,0.1,0.3,0.1,0.5
                          c13.8,41.2,30.1,82.1,48.4,121.5c21.9,47.1,47.2,93.1,75.1,136.8c22,35.3,32.6,71.9,31.2,108.8c-0.1,2.8-0.3,5.3-0.5,7.6
                          l-261.9-16.9l4.6-68c0.2-3.7-1.1-7.4-3.5-10.2c0,0-0.1-0.1-0.1-0.1c-2.6-2.8-6.2-4.4-10-4.4L265,388c-0.2-84.9,2-147.6,6.8-186.4
                          c5.3-43.3,12.2-45.5,13-45.7c0.3,0,1-0.1,1.7-0.1c3.4-0.2,10.4-0.7,19.4-3.2c9.3-2.6,18-6.8,26.8-12.7c16.3-10.9,26.2-23,34.1-32.8
                          c7.1-8.7,12.3-15.1,18-15.1L384.8,87.9 M384.8,87.9c-15.3,0-22.5,27.1-54.5,48.5c-6.4,4.3-14.8,9-25.6,12.1
                          c-10.8,3.1-18.5,3-20.5,3.3c-12.4,1.8-24,49.5-23.3,240.3l63.2,1.5c2.7,0,5.2,1.1,7,3.1c1.7,2,2.7,4.6,2.5,7.3l-4.9,72.1l270,17.5
                          c0.6-3.9,0.8-8,1-11.9c1.6-45.2-14.7-83.6-31.9-111.1c-24.8-38.8-50.6-84.3-74.9-136.4c-20-43-35.8-83.8-48.3-121.1
                          c-1.1-5.4-6-9.3-11.5-9.3c-0.7,0-1.4,0.1-2,0.2c-1.8,0.3-3.6,0.4-5.5,0.4c-7.6,0-13.1-3.4-19.8-7.2c-10.4-5.9-15.6-8.9-19.7-9.3
                          C385.7,87.9,385.2,87.9,384.8,87.9"/>
                        <path class="heavenst2" d="M335.3,324.8c0.8-2.4,2.8-3,5-3.2c6.2-0.5,11.3,2.7,13.7,8.3c0.3,0.7,0.7,0.9,1.4,0.8c3.3-0.2,6.4,0.6,8.6,3.3
                          c1,1.2,1.6,2.7,2.2,4.2c0.4,1-0.1,1.9-1.1,2.2c-1,0.3-1.7-0.1-2.2-1.2c-1.6-3.9-3.2-5-7.5-5c-0.6,0-1.3,0-1.9,0
                          c-1.5,0-1.9-0.3-2.4-1.8c-0.7-2.5-2.1-4.5-4.3-5.9c-2.2-1.4-4.6-1.8-7.2-1.3c-0.3,0.1-0.9,0.5-0.9,0.8c0,3.1-0.2,6.3,0.1,9.4
                          c0.3,4.1,3.3,6.8,7.5,6.9c10.3,0.1,20.6,0.1,30.9,0c3.4,0,6.1-2.4,6.4-5.5c0.3-3.4-1.6-6.3-4.8-7c-1.4-0.3-2.8-0.2-4.3-0.2
                          c-1.9,0-2.2-0.3-2.8-2.1c-1.6-5.3-6.8-8.2-12.2-6.7c-1.9,0.5-2.1,0.5-3.2-1.1c-3.7-5-11.1-5.3-15.2-0.6c-1.1,1.3-2.1,1.6-3,0.8
                          c-0.9-0.8-0.8-1.8,0.3-3.1c4.2-4.9,11.5-6,17-2.5c0.3,0.2,0.5,0.3,0.9,0.6c0.8-1.8,1.6-3.6,2.5-5.5c-1.2-0.8-2.3-1.5-3.3-2.2
                          c-1.1-0.8-1.4-1.7-0.8-2.6c0.6-0.9,1.6-1,2.7-0.2c0.8,0.5,1.7,1.1,2.5,1.6c0.1,0.1,0.2,0.1,0.4,0.1c0.7-1.6,1.5-3.2,2.2-4.9
                          c-8.1-5.4-12.7-12.8-12.8-22.6c-0.1-7.4,2.6-13.7,7.8-18.9c10.8-10.7,27.7-10.1,37.8,0.3c3.8,3.9,6.2,8.6,7.1,14
                          c0.9,5.3,0.3,10.5-2,15.4c-2.3,5-5.8,8.8-10.5,11.8c0.7,1.7,1.5,3.3,2.2,5c1-0.6,1.9-1.2,2.8-1.7c1.1-0.7,2.1-0.5,2.6,0.3
                          c0.6,0.9,0.3,1.8-0.8,2.6c-1,0.7-2.1,1.4-3.2,2.1c1.4,3.1,2.8,6.3,4.2,9.4c0.1,0.2,0.3,0.4,0.4,0.4c1.2-0.1,2.4,0.1,3.4-0.4
                          c6.1-2.7,11.3-6.6,15.8-11.5c1-1.1,2-2,3.5-2.3c2.2-0.4,3.9,0.4,5.5,1.9c1.9,1.9,3.9,3.8,6,5.6c3.1,2.6,6.6,4.6,10.2,6.4
                          c0.7,0.3,1.3,0.9,1.9,1.3v22.2c-0.5,1.6-1.6,2.7-3.2,3.2h-19.9c-0.9-0.6-1.1-1.5-1.1-2.6c0.1-2.2,0-4.5,0-6.7v-3.6
                          c-0.1,0-0.2-0.1-0.2-0.1c-2.7,3.1-5.3,6.2-8.2,9.5c1.6,0,2.8,0,4.1,0c1.3,0,2.1,1,1.7,2.1c-0.2,0.5-0.7,0.9-1,1.3h-22.9
                          c-0.4-0.4-0.8-0.7-1-1.2c-0.5-1.2,0.4-2.2,1.7-2.3c1.7,0,3.3,0,5,0v-8.1c-3.1,0-6.1,0-9.1,0c-1.6,0-2.3-0.6-2.3-1.7
                          c0-1.1,0.8-1.7,2.3-1.7c0.9,0,1.8,0,2.7,0h6.4v-8.1h-1.2c-6.3,0-12.7,0-19,0c-0.4,0-0.8,0-1.2,0c-0.9-0.1-1.4-0.7-1.5-1.6
                          c-0.1-0.9,0.4-1.5,1.3-1.7c0.4-0.1,0.8-0.1,1.2-0.1c4.6,0,9.3,0,13.9,0h1.3c-1.3-2.9-2.5-5.6-3.8-8.3c-4.7,2-9.4,3-14.4,3
                          c-4.9,0-9.7-1-14.2-2.9c-1,2.2-1.9,4.2-2.8,6.3c0.3,0,0.4,0,0.5,0c5.7-1.1,11,1.3,14,6.2c0.5,0.9,0.8,2.1,1.5,2.6
                          c0.8,0.5,2.1,0.2,3.1,0.3c6.5,0.5,10.7,7.8,7.9,13.7c-0.4,0.8-0.8,1.5-1.3,2.4c1,0,1.9,0,2.8,0c1.2,0.1,2,1.1,1.6,2.1
                          c-0.2,0.5-0.7,0.9-1,1.3h-43.7c-0.2-0.1-0.3-0.2-0.5-0.2c-2.6-0.5-4.7-1.8-6.5-3.9c-1.3-1.6-1.9-3.4-2.5-5.3V324.8z M388.7,298
                          c7.8-4.7,12.6-14.6,10.3-24.5c-2.4-10.5-11.6-18-22.6-18c-10.8,0-20.1,7.4-22.6,18.2c-2.3,9.9,2.6,19.8,10.3,24.4
                          c0.2-0.3,0.3-0.6,0.5-1c1.8-4,3.6-8,5.4-12c0.3-0.7,0.3-1.2-0.2-1.8c-2-2.6-2.1-6.5-0.2-9.3c2-2.9,5.7-4.2,8.9-3.2
                          c5.6,1.7,7.8,8,4.3,12.8c-0.2,0.3-0.3,0.8-0.2,1.1C384.7,289,386.7,293.5,388.7,298 M424.3,342.3h1c5,0,9.9,0,14.9,0
                          c1.3,0,1.4-0.1,1.4-1.4c0-5.7,0-11.5,0-17.2c0-0.3,0-0.6-0.1-1h-1.2c-2.5,0-4.9,0-7.4,0c-1.3,0-2.1-1-1.8-2.2
                          c0.3-0.9,1-1.2,1.9-1.3c1,0,1.9,0,2.9,0c-4.2-2.8-7.9-6-11.3-9.6c-1.5-1.7-2.5-1.6-4.1,0c-3.2,3.4-6.8,6.4-10.7,8.9
                          c-0.2,0.1-0.4,0.3-0.8,0.6h1.4c5.5,0,10.9,0,16.4,0c1.3,0,2,0.7,2,1.7c0,1.1-0.7,1.7-2,1.7c-0.8,0-1.6,0-2.5,0V342.3z M420.7,322.8
                          h-17.3c0,6.3,0,12.5,0,18.7c0,0.3,0.6,0.7,0.9,0.8c0.9,0.1,1.9,0.1,2.8,0c0.4,0,0.9-0.3,1.1-0.6c4-4.6,8-9.3,12-13.9
                          c0.2-0.3,0.4-0.6,0.5-0.9C420.8,325.5,420.7,324.2,420.7,322.8 M385.7,299.6c-2.1-4.6-4.1-9-6.1-13.6c-2.1,0.8-4.2,0.8-6.2,0
                          c-2.1,4.6-4.1,9.1-6.1,13.6C372.7,302.2,380.4,302.2,385.7,299.6 M387.1,302.9c-7.2,2.9-14.2,2.9-21.3,0c-0.8,1.7-1.5,3.3-2.2,4.9
                          c8.7,3.5,17.2,3.5,25.8,0C388.6,306.1,387.9,304.6,387.1,302.9 M381.2,278.5c0-2.6-2.1-4.7-4.7-4.7c-2.6,0-4.7,2.1-4.7,4.7
                          c0,2.6,2.1,4.7,4.8,4.7C379.1,283.2,381.2,281.1,381.2,278.5"/>
                        <path class="heavenst2" d="M445,300.9c-0.6,0.9-1.4,1.1-2.5,1.1c-8,0-15.9,0-23.9,0c-0.2,0-0.4,0-0.5,0c-1.2,0-1.9-0.7-2-1.7
                          c0-1,0.8-1.7,2-1.8c1.6,0,3.3,0,4.9,0h4.6v-1.3c0-13,0-25.9,0-38.9c0-0.5,0-1,0.2-1.5c0.3-0.8,0.9-1.2,1.7-1.1
                          c0.8,0.1,1.4,0.6,1.5,1.4c0.1,0.4,0,0.9,0,1.3c0,12.9,0,25.8,0,38.7v1.3h3.5v-1.4c0-12.8,0-25.6,0-38.4c0-0.5,0-0.9,0.1-1.4
                          c0.1-0.9,0.7-1.4,1.6-1.5c0.9,0,1.6,0.5,1.7,1.4c0.1,0.5,0.1,0.9,0.1,1.4c0,12.8,0,25.6,0,38.4v1.5c1.6,0,3.1,0,4.5,0
                          c1.1,0,1.9,0.3,2.4,1.3V300.9z"/>
                        <path class="heavenst2" d="M445,250.4c-0.9,2.4-2.7,3.3-5.2,3.2c-4.6-0.1-9.2-0.1-13.8,0c-2.2,0-4.1-0.4-5-2.6c-0.8-1.9,0.1-4.6,1.9-6.2
                          c1.3-1.2,2.9-1.6,4.8-1.6c0-0.5,0-0.9,0-1.4c0.1-3.1,2.1-5.3,5-5.5c2.8-0.1,5.1,2,5.4,5.1c0,0.6,0,1.1,0,1.7
                          c0.8,0.1,1.5,0.1,2.1,0.3c2.2,0.6,3.7,2,4.5,4.2c0.1,0.3,0.2,0.6,0.3,0.9V250.4z M432.8,250.2c2.5,0,5.1,0,7.6,0c1,0,1.3-0.4,1-1.3
                          c-0.3-1.2-1.1-1.9-2.3-2.1c-0.3,0-0.6-0.1-0.9-0.1c-3.6,0-7.1,0-10.7,0c-1.7,0-2.7,0.6-3.1,1.9c-0.4,1.1-0.1,1.5,1,1.5
                          C427.9,250.2,430.3,250.2,432.8,250.2 M434.6,243.2c0-1.1,0.4-2.4-0.8-3c-0.5-0.3-1.4-0.3-1.8,0c-1.1,0.7-0.8,1.9-0.8,3H434.6z"/>
                        <path class="heavenst2" d="M335.3,275.9c1.2-2.5,1.3-2.5,5.4-3.1c0.6-2.1,1.1-4.3,1.7-6.4c0.4-1.2,0.9-2.3,1.4-3.5
                          c0.5-1.1,1.4-1.5,2.3-1.1c0.9,0.4,1.3,1.3,0.8,2.4c-1.2,2.8-2.1,5.6-2.6,8.5c2.7,1.5,3.4,3.1,2.8,5.6c-0.6,2.7-2.8,4.5-5.6,4.7
                          c-2.5,0.1-5-1.5-5.9-3.8c-0.1-0.4-0.3-0.7-0.4-1.1V275.9z M341.4,276.3c-0.6,0-1.2,0-1.8,0c-0.7,0-0.9,0.3-0.8,0.9
                          c0.2,1.4,1.2,2.4,2.5,2.4c1.2,0,2.3-1,2.5-2.3c0.1-0.8-0.1-1.2-0.9-1.1C342.4,276.3,341.9,276.3,341.4,276.3"/>
                        <path class="heavenst2" d="M445,310.1c-0.6,0.9-1.4,1.1-2.5,1.1c-2.7,0-5.5,0-8.2,0c-1.2,0-1.9-0.6-2-1.6c0-1,0.6-1.8,1.7-1.8
                          c3.1-0.1,6.1-0.1,9.2,0c0.6,0,1.2,0.8,1.7,1.2V310.1z"/>
                        <path class="heavenst2" d="M335.3,238.5c0.1-0.1,0.2-0.2,0.4-0.4c0.8-0.9,1.9-0.9,2.6-0.2c0.7,0.7,0.6,2-0.1,2.7
                          c-0.8,0.7-1.8,0.6-2.5-0.3c-0.1-0.1-0.2-0.2-0.4-0.4V238.5z"/>
                        <path class="heavenst2" d="M335.3,308.8c0.4-0.7,1-1.4,1.9-1.2c0.8,0.1,1.4,0.6,1.5,1.4c0.1,0.9-0.1,1.6-1,2c-0.8,0.3-1.5,0.2-2-0.5
                          c-0.1-0.2-0.3-0.3-0.4-0.5V308.8z"/>
                        <path class="heavenst2" d="M445,278c-0.4,0.4-0.8,0.9-1.3,1c-0.9,0.3-1.6-0.1-2-0.9c-0.4-0.8-0.1-1.9,0.6-2.3c0.8-0.5,1.6-0.3,2.2,0.3
                          c0.2,0.2,0.3,0.4,0.4,0.6V278z"/>
                        <path class="heavenst2" d="M399.5,250.4c1.1-1.4,2.6-1.6,4.3-1.5c1.1,0,2.1,0,3.2,0c2.1,0.1,3.7,1.7,3.7,3.8c0.1,3.2-1.8,5.7-4.9,6.4
                          c-3,0.6-5.7-1.1-6.9-4.1c-0.1-0.4-0.4-0.7-0.7-1c-3.7-3.3-7.9-5.7-12.6-7.1c-0.3-0.1-0.7-0.2-1-0.3c-1.1-0.4-1.6-1.2-1.3-2.2
                          c0.3-0.9,1.2-1.4,2.3-1.1c1.4,0.4,2.7,0.8,4.1,1.3C393.2,246,396.5,247.9,399.5,250.4 M404.8,252.4c-0.6,0-1.2,0-1.8,0
                          c-0.6,0-0.8,0.3-0.8,0.8c0.1,1.4,1.2,2.5,2.5,2.5c1.3,0,2.4-1,2.5-2.4c0.1-0.7-0.2-1-0.9-1C405.9,252.4,405.3,252.4,404.8,252.4"/>
                        <path class="heavenst2" d="M353.7,250.1c3.7-3,8-5.3,12.8-6.7c0.2-0.1,0.5-0.1,0.7-0.2c1-0.2,1.9,0.3,2.2,1.2c0.2,0.9-0.2,1.7-1.2,2.1
                          c-1,0.3-2,0.6-2.9,1c-4,1.5-7.6,3.7-10.8,6.6c-0.3,0.2-0.5,0.6-0.6,1c-1,3-4,4.7-7,4c-3-0.7-5-3.5-4.7-6.6c0.2-1.9,1.7-3.4,3.7-3.5
                          c1.5-0.1,3.1-0.1,4.6,0C351.5,249.1,352.5,249.7,353.7,250.1 M348.3,252.4c-0.6,0-1.2,0-1.8,0c-0.7,0-0.9,0.3-0.8,0.9
                          c0.2,1.4,1.2,2.4,2.5,2.4c1.2,0,2.3-0.9,2.5-2.2c0.2-0.8,0-1.3-0.9-1.2C349.3,252.4,348.8,252.4,348.3,252.4"/>
                        <path class="heavenst2" d="M345.4,296.8c-1.2-3-2.4-6-3.6-9c-0.1-0.3-0.2-0.5-0.2-0.8c-0.2-1,0.3-1.9,1.2-2.2c0.9-0.3,1.7,0.2,2.1,1.2
                          c0.6,1.6,1,3.3,1.8,4.9c0.9,1.9,1.9,3.6,3,5.4c0.1,0.2,0.5,0.5,0.7,0.5c3,0.6,4.3,2.4,3.8,5.4c-0.6,3.2-3.7,5.4-6.9,4.8
                          c-3.3-0.6-5.5-3.6-5-6.8C342.5,298.4,343.5,297.4,345.4,296.8 M348.3,300.2c-0.6,0-1.3-0.1-1.9,0c-0.3,0-0.6,0.4-0.7,0.7
                          c-0.1,1.3,0.9,2.4,2.2,2.6c1.2,0.2,2.3-0.6,2.7-1.7c0.4-1.3,0.2-1.6-1.2-1.6C349,300.2,348.6,300.2,348.3,300.2"/>
                        <path class="heavenst2" d="M407.2,296.7c2.5,0.8,3.5,2,3.5,4.1c0,2.7-1.5,5-3.9,5.9c-4.3,1.5-8.6-1.9-8.1-6.5c0.2-1.8,1.6-3.2,3.4-3.4
                          c0.4-0.1,1-0.4,1.2-0.7c1.7-2.4,3-5,3.9-7.8c0.1-0.4,0.3-0.8,0.4-1.2c0.4-0.9,1.3-1.4,2.2-1.1c0.9,0.3,1.4,1.2,1,2.2
                          c-0.9,2.4-1.9,4.7-2.9,7.1C407.8,295.7,407.5,296.2,407.2,296.7 M407.3,300.7c-0.1-0.1-0.4-0.5-0.7-0.5c-1.2-0.1-2.5-0.1-3.7,0
                          c-0.2,0-0.6,0.5-0.6,0.7c-0.1,1.4,1.2,2.6,2.5,2.6C406.1,303.6,407.2,302.4,407.3,300.7"/>
                        <path class="heavenst2" d="M408.8,272.8c-0.7-2.3-1.4-4.7-2.2-7c-0.2-0.5-0.5-1-0.6-1.6c-0.3-1,0-1.9,0.8-2.2c0.9-0.4,1.9-0.1,2.3,0.9
                          c0.7,1.8,1.4,3.6,2,5.4c0.5,1.4,0.7,3,1.1,4.6c0.6,0,1.1,0,1.7,0c2.1,0.1,3.7,1.7,3.7,3.8c0.1,3.6-2.5,6.4-5.9,6.5
                          c-3.4,0.1-6.1-2.8-6.1-6.3C405.6,274.8,406.7,273.6,408.8,272.8 M411.6,276.3c-0.6,0-1.3-0.1-1.9,0c-0.2,0-0.6,0.4-0.6,0.6
                          c-0.2,1.2,0.8,2.3,2,2.6c1.2,0.3,2.5-0.4,2.9-1.6c0.5-1.3,0.2-1.7-1.2-1.7C412.4,276.3,412,276.3,411.6,276.3"/>
                        <path class="heavenst2" d="M376.5,237c0.5,0,1,0,1.5,0c2.6-0.2,5.1,1.6,4.3,5.4c-0.6,3.2-3.7,5.3-6.9,4.8c-3.3-0.6-5.5-3.7-5-6.9
                          c0.3-1.8,1.8-3.2,3.7-3.3C374.9,236.9,375.7,237,376.5,237L376.5,237z M376.5,240.4c-0.6,0-1.2,0-1.8,0c-0.6,0-0.8,0.3-0.8,0.8
                          c0.1,1.4,1.2,2.5,2.5,2.5c1.3,0,2.4-1,2.5-2.4c0.1-0.7-0.2-1-0.9-1C377.6,240.4,377.1,240.4,376.5,240.4"/>
                        <path class="heavenst2" d="M412.6,242.8c0,1-0.8,1.8-1.7,1.8c-1,0-1.7-0.9-1.7-1.9c0-1,0.8-1.7,1.8-1.7C412,241,412.7,241.8,412.6,242.8"
                          />
                        <path class="heavenst2" d="M420.2,269.9c-1,0-1.7-0.7-1.8-1.7c0-1,0.8-1.9,1.7-1.9c0.9,0,1.7,0.8,1.7,1.8
                          C421.9,269.1,421.2,269.9,420.2,269.9"/>
                        <path class="heavent2" d="M353.2,244.4c-0.9,0-1.7-0.8-1.7-1.9c0-1.1,0.8-1.8,1.8-1.8c1,0.1,1.7,0.9,1.6,1.9
                          C354.9,243.6,354.1,244.4,353.2,244.4"/>
                        <path class="heavenst2" d="M417.9,290.4c-1,0-1.7-0.8-1.8-1.8c0-1,0.8-1.9,1.8-1.9c1,0,1.7,0.8,1.7,1.8
                          C419.6,289.7,418.8,290.4,417.9,290.4"/>
                        <path class="heavenst2" d="M391.9,279.7c0,1-0.8,1.8-1.7,1.8c-1,0-1.7-0.8-1.7-1.8c0-1.1,0.8-1.9,1.8-1.8
                          C391.2,277.9,391.9,278.7,391.9,279.7"/>
                        <path class="heavenst2" d="M361.9,275c0,1-0.7,1.8-1.7,1.9c-0.9,0-1.7-0.7-1.8-1.7c0-1.1,0.7-1.9,1.7-1.9
                          C361.1,273.2,361.9,274,361.9,275"/>
                        <path class="heavenst2" d="M389.5,265.8c0,1-0.7,1.8-1.7,1.8c-1,0-1.7-0.8-1.8-1.8c0-1,0.8-1.9,1.8-1.9
                          C388.8,264,389.6,264.8,389.5,265.8"/>
                      </g>
                      </svg>






                </div>
                <div class="uniqueMapRight">
                    <div  class="facilityBlock" v-for="item in this.selectIslandFacility">
                          <img  :src=item.photo  class="facilityBlockImg" style="height:100%;" alt="..." >
                          <span>{{item.name}}</span>
                          <div class="facilityBlockbot">
                            <div class="facilityBlockReserve">
                              <span>預約人數:<span style="color:red;font-weight:bold;">{{item.reserveNum}}</span>人</span>
                            </div>

                            <span>等待時間:<span style="color:red;font-weight:bold;">{{calculateMinute(item.reserveNum)}}</span>分</span>

                          </div>
                    </div>
                </div>
            </div>
          </div>
  </div>
  
  <!-- 最新活動 -->
  <div v-if="page == 3" class="newActiveity">
      <h1>最新活動</h1>
      <!-- 下方v-for遊樂設施區 -->
      <div class="activeityArrPlace">
          <!-- 活動 -->
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../../picture/activeity/活動1.jpg" style="height: 100%;width:auto;" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">浪漫摩天輪</h5>
                  <p class="card-text">浪漫就是一個很溫馨的感覺.享受當下的感覺，你可以跟你愛的人一起乘坐</p>
                  <p class="card-text"><small class="text-muted">限時活動</small></p>
                </div>
              </div>
            </div>
          </div>
          <!-- 活動 -->
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../../picture/activeity/活動2.jpg"  style="height: 100%;width:auto;"  class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">旋轉木馬</h5>
                  <p class="card-text">旋轉木馬是一種很好玩的旋轉器材.旋轉木馬是一種很好玩的旋轉器材</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
          <!-- 活動 -->
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../../picture/activeity/活動3.jpg"  style="height: 100%;" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">游泳很好玩</h5>
                  <p class="card-text"> 水上活動很精采也很刺激可以來玩樂，小孩大人都可以</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
          <!-- 活動 -->
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="../../picture/activeity/活動4.jpg"  style="height: 100%;" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">雀躍地跳舞</h5>
                  <p class="card-text">可以一起跳舞的話我真的會很開心也很快樂，大家可以一起來同樂，一起快樂的遊玩快樂.</p>
                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>


  <!-- 門票通路 -->
  <div v-if="page == 4" class="ticketAccess">

    <h1>門票通路</h1>
    <h4><strong style="color:brown ; text-decoration:underline">販賣旅行社</strong></h4>

    <div class="travelAgencyTable">
      <div class="travelAgency">
        <a href="https://www.colatour.com.tw/" target="_blank">
          <img src="../../picture/travelAgency/可樂旅遊.png" alt="可樂旅遊" class="colaTour"></a>
        <h6>可樂旅遊</h6>
      </div>
      <div class="travelAgency">
        <a href="https://www.settour.com.tw/" target="_blank">
          <img src="../../picture/travelAgency/東南旅遊.png" alt="東南旅遊" class="setTour"></a>
        <h6>東南旅遊</h6>
      </div>
      <div class="travelAgency">
        <a href="https://www.liontravel.com/category/zh-tw/index" target="_blank">
          <img src="../../picture/travelAgency/雄獅旅遊.png" alt="雄獅旅遊" class="lionTravel"></a>
        <h6>雄獅旅遊</h6>
      </div>
    </div>

    <h4><strong style="color:brown ; text-decoration:underline">線上平台</strong></h4>

    <div class="onlinePlatformTable">
      <div class="onlinePlatform">
        <a href="https://www.kkday.com/zh-tw" target="_blank"></a>
        <img src="../../picture/travelAgency/kkday.png" alt="KKday" class="KKday">
        <h6>KKday</h6>
      </div>
      <div class="onlinePlatform">
        <a href="https://www.klook.com/zh-TW/">
          <img src="../../picture/travelAgency/klook.png" alt="Klook" class="Klook"></a>
        <h6>Klook</h6>
      </div>
    </div>

    <h4><strong style="color:brown ; text-decoration:underline">入口處購票</strong></h4>
    <p>可於 AIRTIME 樂園園區的入口售票處購票</p>
    <p>* 售票處營業時間為開園前1小時前，至閉園前2小時為止</p>

    <h4><strong style="color:brown ; text-decoration:underline">營業時間</strong></h4>
    <p>8：30 ～ 21：00</p>

  </div>

  <!-- 美食餐廳 -->
  <div v-if="page == 5" class="gourmetRestaurant">
    <h1>美味餐點</h1>

    <!-- <div class="restaurantArea" v-for="item, index in this.publishedRestaurant">
      <div class="leftPart">
        <img :src="item.photo" class="rest-img-top" alt="..."
          style="width: 600px; height: 350px; display:flex; margin:auto; border-radius: 10px;">
      </div>
      <div class="rightPart">
        <h4 style="text-indent: 0.5em;"><strong>♘ {{ item.name }}</strong></h4>
        <p class="card-text">{{ item.description }}</p>
      </div>
    </div> -->

    <!-- <div class="restaurant1Area">
        <div class="leftPart1">
          <img src="../../picture\restaurant\美式餐廳_FriBay.jpg" alt="FriBay"
            style="width: 600px; height: 350px; display:flex; margin:auto;">
        </div>
        <div class="rightPart1">
          <h4 style="text-indent: 0.5em;"><strong>FriBay</strong></h4>
          <p>
            正統的美式餐廳，菜單豐富多樣，包括經典牛排、芝士漢堡、香脆炸雞翅，以及創意十足的美式披薩。「FriBay」位於樂園驚險火山島，提供寬敞明亮的用餐環境和親切的服務，讓您在這裡感受到最地道的美國風味。
          </p>
        </div>
      </div>

      <div class="restaurant2Area">
        <div class="leftPart2">
          <h4 style="text-indent: 0.5em;"><strong>Trattoria di primo</strong></h4>
          <p>義大利風情的餐廳，可以品嚐到新鮮的義大利麵製品、濃郁的奶酪、美味的海鮮和精心調製的義大利咖啡。用餐環境充滿藝術氛圍，讓您彷彿置身於義大利的美麗小鎮，「Trattoria di
            primo」都能滿足您對義大利美食的所有期待。
          </p>
        </div>
        <div class="rightPart2">
          <img src="../../picture\restaurant\義式餐廳_Trattoria di primo.jpg" alt="Trattoria di primo"
            style="width: 600px; height: 350px; display:flex; margin:auto;">
        </div>
      </div>

      <div class="restaurant3Area">
        <div class="leftPart3">
          <img src="../../picture\restaurant\台式餐廳_台味小館.jpg" alt="台味小館"
            style="width: 600px; height: 350px; display:flex; margin:auto;">
        </div>
        <div class="rightPart3">
          <h4 style="text-indent: 0.5em;"><strong>台味小館</strong></h4>
          <p>
            正宗的台灣美食。菜單匯集了台灣各地的經典料理，品嚐滷肉飯、蚵仔煎、牛肉麵等，彷彿帶您置身於台灣街頭美食天堂。簡約舒適的用餐環境中，新鮮食材和獨特口感保證讓您感受到家的溫馨和台灣味覺享受。
          </p>
        </div>
      </div>

      <div class="restaurant4Area">
        <div class="leftPart4">
          <h4 style="text-indent: 0.5em;"><strong>一樂拉麵</strong></h4>
          <p>
            「一樂拉麵」以經典的拉麵、新鮮的生魚片和創意的壽司而聞名，每一道料理都精心製作，保持了日本料理的細緻和原汁原味。用餐環境舒適，充滿和風氛圍，讓您在品味美食的同時，彷彿置身於日本的美麗四季之中。
          </p>
        </div>
        <div class="rightPart4">
          <img src="../../picture\restaurant\日式餐廳_一樂拉麵.jpg" alt="一樂拉麵"
            style="width: 600px; height: 350px; display:flex; margin:auto;">
        </div>
      </div>

      <div class="restaurant5Area">
        <div class="leftPart5">
          <img src="../../picture\restaurant\韓式餐廳_韓老大餐酒館.jpg" alt="韓老大餐酒館"
            style="width: 600px; height: 350px; display:flex; margin:auto;">
        </div>
        <div class="rightPart5">
          <h4 style="text-indent: 0.5em;"><strong>韓老大餐酒館</strong></h4>
          <p>引以為傲的菜單包含了烤肉、拌飯、辣炒年糕等傳統韓國料理。用餐環境溫馨舒適，營造出韓國街頭小店的氛圍，在「韓老大餐酒館」感受到真實的韓式美味和獨特的韓國餐飲文化。
          </p>
        </div>
      </div>

      <div class="restaurant6Area">
        <div class="leftPart6">
          <h4 style="text-indent: 0.5em;"><strong>Starbucks®AirTime臻選烘焙工坊</strong></h4>
          <p>
            位於慢活樂園島。精心烘焙的咖啡豆經過巧妙的調配，呈現濃郁香醇的口感，在這邊不僅可品嚐星巴克經典咖啡，還能親臨現場感受咖啡的誕生過程。星巴克®AirTime臻選烘焙工坊絕對是每位遊客不容錯過的特別體驗。
          </p>
        </div>
        <div class="rightPart6">
          <img src="../../picture\restaurant\美式咖啡_Starbucks.jpg" alt="Starbucks"
            style="width: 600px; height: 350px; display:flex; margin:auto;">
        </div>
      </div> -->

    <div v-for="(item, index) in paginatedRestaurants" :key="index" class="restaurantArea">
      <div class="leftPart">
        <img :src="item.photo" class="rest-img-top" alt="..." style="width: 600px; height: 350px; display:flex; margin:auto; border-radius: 10px;">
      </div>
      <div class="rightPart">
        <h4 style="text-indent: 0.5em;"><strong>♘ {{ item.name }}</strong></h4>
        <p class="card-text">{{ item.description }}</p>
      </div>
    </div>

    <div class="pagination" style="justify-content:center; margin-bottom: 2vh;">
      <button style="border:none; border-radius: 10%;" @click="changePage(-1)" :disabled="currentPage === 1">◀️</button>
      <span style="margin-left:1vw;margin-right:1vw;">第 {{ currentPage }} 頁</span>
      <button style="border:none; border-radius: 10%;" @click="changePage(1)" :disabled="currentPage * pageSize >= publishedRestaurant.length">▶️</button>
    </div>

  </div>

  <!-- 獨家商品 -->
  <div v-if="page == 6" class="limitedEdition ">
    <h1>周邊商品</h1>

    <div class="souvenirShop">
      <div class="card">
        <img src="../../picture\souvenir\瑪利歐_瑪利歐造型帽.png" class="card-img-top" alt="瑪利歐造型帽">
        <div class="card-body">
          <h5 class="card-title">瑪利歐造型帽</h5>
          <p class="card-text">瑪利歐突然不見蹤影，碧姬公主正好又被庫巴抓走了，這次輪到你代替瑪利歐進攻庫巴城，將任天堂經典電玩角色瑪利歐所戴的帽子實體化，適合萬聖節、派對活動時穿戴，也是朋友生日送禮的好選擇
          </p>
          <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
        </div>
      </div>
      <div class="card">
        <img src="../../picture\souvenir\瑪莉歐_紅色龜殼聲光小夜燈.png" class="card-img-top" alt="紅色龜殼聲光小夜燈">
        <div class="card-body">
          <h5 class="card-title">紅龜殼聲光小夜燈</h5>
          <p class="card-text">
            還記得在瑪莉歐關卡中連續踩擊龜殼達到花式通關的景象嗎？或是在瑪莉歐賽車中使用龜殼陷害對手露出陰險微笑的瞬間。紅龜殼聲光小夜燈，高度約12CM，可當一般裝飾擺設,，也可當作小夜燈來使用。</p>
          <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
        </div>
      </div>
      <div class="card">
        <img src="../../picture\souvenir\瑪利歐_無敵星泡沫慕斯瓶.png" class="card-img-top" alt="無敵星泡沫慕斯瓶">
        <div class="card-body">
          <h5 class="card-title">無敵星泡沫慕斯瓶</h5>
          <p class="card-text">融合瑪利歐遊戲裡的多樣元素，以問號磚塊作為設計，上頭印有瑪利歐的圖樣，壓嘴部分則是設計成無敵星的樣貌，在瓶罐中加入慕斯洗手乳，即可在按壓後擠出星型泡沫，讓小朋友愛上洗手，遠離病毒
          </p>
          <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
        </div>
      </div>
      <div class="card">
        <img src="../../picture\souvenir\瑪利歐_食人花燈飾.png" class="card-img-top" alt="食人花燈飾">
        <div class="card-body">
          <h5 class="card-title">食人花燈飾</h5>
          <p class="card-text">小巧可愛的食人花不會吃蚊蟲，但會替你照亮夜裡的黑暗，日本 Nintendo
            官方授權英國Paladone製作，枝幹部份可調整照射方向，按動開關按鈕即可開燈，使用電池供電，自用還是送禮都是不錯的選擇</p>
          <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
        </div>
      </div>
      <div class="card">
        <img src="../../picture\souvenir\瑪利歐_鐵罐禮物組.png" class="card-img-top" alt="鐵罐禮物組">
        <div class="card-body">
          <h5 class="card-title">鐵罐禮物組</h5>
          <p class="card-text">整組包含一個鐵盒、馬克杯和杯墊，鐵罐以問號磚塊罪為主題，杯墊和馬克杯分別以蘑菇和瑪利歐當作主要圖示，整體色調鮮明活潑，非常適合坐在沙發上遊玩遊戲時搭配使用，享受著無人打擾的遊戲時光
          </p>
          <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
        </div>
      </div>
      <div class="card">
        <img src="../../picture\souvenir\瑪利歐_害羞幽靈USB燈飾.png" class="card-img-top" alt="害羞幽靈USB燈飾">
        <div class="card-body">
          <h5 class="card-title">害羞幽靈USB燈飾</h5>
          <p class="card-text">小心！寂靜的夜晚裡幽靈即將出沒，害羞精靈BOO USB燈飾，適合用來作為夜間照明，也可當作療癒心靈的擺飾，體積不大，不使用時易於收納，使用USB作為燈飾電源來源，可愛的造型值得你擁有
          </p>
          <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
        </div>
      </div>
    </div>

  </div>
  <!-- ========================================================================================= -->

  <footer class="footerPlace"></footer>
</template>

<style lang="scss" scoped>
//頁面 Header
.HomeHeaderViewClass {
  position: fixed;
  z-index: 99;
}

//輪播廣告
.bootstrapAd {
  width: 100vw;
  z-index: -10;

  // h1 {
  //   width: 100%;
  //   font-weight: bold;
  //   background-color: #FFD306;
  //   // background-color: rgb(26, 26, 172);
  // }

  // p {
  //   width: 100%;
  //   font-weight: bold;
  //   // color: #9393FF;
  //   background-color: #FFD306;
  //   // background-color: rgb(26, 26, 172);
  // }

  .change {
    width: 5vh;
    height: 10vh;
    border-radius: 10px;
    background-color: rgba(80, 80, 80, 0.6);
    margin: 0 5vw;
    margin-top: 50vh;
  }

  // 文字特效
  .carousel-caption {
    text-align: center;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 10px;
    color: #fff;
  }

  h1 {
    font-size: 16pt;
    margin-bottom: 10px;
  }
}

//中間功能選擇
.midHeader {
  max-width: 80vw;
  margin: 0 10vw;
  display: flex;
  height: 15vh;
  border-radius: 20px;
  background-color: white;
  margin-top: -6vh;
  position: relative;
  /* 或者是其他值，除了 static */
  z-index: 2;

  .fa-solid {
    font-size: 25pt;
    color: rgb(26, 26, 172);
  }

  .block {
    width: calc(16.66%);
    height: 100%;
    text-align: center;

    &:hover {
      background-color: rgb(26, 26, 172);
      color: white;

      .fa-solid {
        color: white;
      }
    }
  }

  .iconPlace {
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// ====================================================================
//精選內容--卡片v-for區
.bootstrapCard {
  width: 80vw;
  margin: 0 10vw;

  h1 {
    margin: 2vh 0;
    font-weight: bold;
    font-family: Arial Black;
  }

  .cardPlace {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    /* 控制左對齊 */
    flex-wrap: wrap;

    .card {
      width: calc(33.33% - 2vw);
      margin: 2vh 1vw;
      height: 60vh;
      // /* 使這個div具有3d屬性 */
      transform-style: preserve-3d;
      /*動畫持續時間 */
      transition: 1s;
      /* 使具有旋转效果 */
      perspective: 1000px;
      // object-fit: cover;
    }

    .cardFront {
      width: 100%;
      height: 100%;
      // /* 讓卡片正反片重疊 */
      position: absolute;
      // /* 隐藏卡片背面 */
      backface-visibility: hidden;


      img {
        width: 100%;
      }

      .reserve {
        position: absolute;
        bottom: 3%;
        left: 5%;
        font-weight: bold;
      }

      .reservetime {
        position: absolute;
        bottom: 3%;
        left: 35%;
        font-weight: bold;
        color: red;
      }
    }

    .cardBack {
      width: 100%;
      height: 100%;
      background-color: #0779E4;
      color: white;
      font-size: 26px;
      /* 让在背面显示的内容转到背面 */
      transform: rotateY(180deg);
      /* 让卡片背面与正面重合 */
      position: absolute;
      backface-visibility: hidden;
      padding: 5% 5%;

      p {
        font-size: 12pt;
      }

      button {
        border: 0;
        border-radius: 10px;
        font-size: 14pt;
        color: #0779E4;
      }

      .btnMore {
        margin-top: 45%;
      }
    }

    .cardBack {
      width: 100%;
      height: 100%;
      background-color: #0779E4;
      color: white;
      font-size: 26px;
      /* 让在背面显示的内容转到背面 */
      transform: rotateY(180deg);
      /* 让卡片背面与正面重合 */
      position: absolute;
      backface-visibility: hidden;
      padding: 5% 5%;

      p {
        font-size: 12pt;
      }

      button {
        border: 0;
        border-radius: 10px;
        font-size: 14pt;
        color: #0779E4;
      }

      .btnMore {
        margin-top: 45%;
      }
    }

    .carousel-control-next {
      /* 自定義位置，可以根據需要進行微調 */
      width: 5vh;
      height: 5vh;
      border-radius: 10px;
      background-color: #0779E4;
      position: absolute;
      top: 95%;
      right: 1%;
      /* 右側位置，可以調整 */
      transform: translateY(-50%);
      z-index: 1;
      /* 確保在前景顯示 */
    }
  }
}

//當按鈕按下卡片可以旋轉
.card.rotate {
  transform: rotateY(180deg);

  .carousel-control-next {
    background-color: white;
    color: #0779E4;
  }

  .carousel-control-next-icon {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(100deg) brightness(200%);
  }
}

.mapByMyself.move {
  transform: translate(-100vw);
  transition: 1s;
}

//地圖區
.mapByMyself {
  width: 100vw;
  display: flex;
  position: relative;
  transition: 1s;

  .left {
    width: 100vw;

    h1 {
      margin: 2vh 0;
      margin-left: 10%;
      margin-right: 3%;
      font-weight: bold;
      font-family: Arial Black;
    }

    .svgdiv {
      display: flex;
      justify-content: center;
      margin: 3vh 0;

      svg {
        width: 37%;
        // height: 80vh;
        margin-left: auto;
        margin-right: auto;

        .st0 {
          clip-path: url(#SVGID_2_);
          fill: #EDEEE3;
        }

        .st1 {
          clip-path: url(#SVGID_2_);
        }

        .st2 {
          opacity: 0.28;
          clip-path: url(#SVGID_4_);
        }

        .st3 {
          clip-path: url(#SVGID_6_);
        }

        .st4 {
          clip-path: url(#SVGID_8_);
          fill: url(#SVGID_9_);
        }

        .st5 {
          clip-path: url(#SVGID_11_);
          fill: url(#SVGID_12_);
        }

        .st6 {
          clip-path: url(#SVGID_4_);
          fill: #3C2315;
        }

        .st7 {
          clip-path: url(#SVGID_16_);
          fill: #96E096;
        }

        .st8 {
          clip-path: url(#SVGID_16_);
          fill: #070001;
        }

        .st9 {
          clip-path: url(#SVGID_16_);
        }

        .st10 {
          clip-path: url(#SVGID_18_);
          fill: #96E096;
        }

        .st11 {
          clip-path: url(#SVGID_18_);
          fill: #070001;
        }

        .st12 {
          clip-path: url(#SVGID_18_);
        }

        .st13 {
          clip-path: url(#SVGID_20_);
          fill: #96E096;
        }

        .st14 {
          clip-path: url(#SVGID_20_);
          fill: #070001;
        }

        .st15 {
          clip-path: url(#SVGID_20_);
        }

        .st16 {
          clip-path: url(#SVGID_22_);
          fill: #96E096;
        }

        .st17 {
          clip-path: url(#SVGID_22_);
          fill: #070001;
        }

        .st18 {
          clip-path: url(#SVGID_22_);
        }

        .st19 {
          clip-path: url(#SVGID_26_);
          fill: #96E096;
        }

        .st20 {
          clip-path: url(#SVGID_26_);
          fill: #070001;
        }

        .st21 {
          clip-path: url(#SVGID_26_);
        }

        .st22 {
          clip-path: url(#SVGID_28_);
          fill: #96E096;
        }

        .st23 {
          clip-path: url(#SVGID_28_);
          fill: #0E0E0E;
        }

      }

      .island {
        stroke: black;
        fill: transparent;
        transition: 1s;
        cursor: pointer;

        &:hover {
          transform: translate(-10px, -10px);
          box-shadow: 10px 5px 5px black;
        }
      }
    }
  }

  .right {
    width: 100vw;
    /* 让在背面显示的内容转到背面 */
    transform: translate(100vw);
    /* 让卡片背面与正面重合 */
    position: absolute;
    display: none;
    padding: 1vw 10vw;

    .uniqueMap {
      display: flex;

      .uniqueMapLeft {
        width: 40%;
        height: 50vh;

        //孤島
        .alonest0 {
          clip-path: url(#SVGID_2_);
          fill: #95CC91;
        }

        .alonest1 {
          clip-path: url(#SVGID_2_);
          fill: #0E0E0E;
        }

        //凍骨冰山島
        .icest0 {
          clip-path: url(#SVGID_2_);
          fill: #95CC91;
        }

        .icest1 {
          clip-path: url(#SVGID_2_);
          fill: #090103;
        }

        .icest2 {
          clip-path: url(#SVGID_2_);
        }

        //刺激飛天島
        .flyst0 {
          clip-path: url(#SVGID_2_);
          fill: #95CC91;
        }

        .flyst1 {
          clip-path: url(#SVGID_2_);
          fill: #090103;
        }

        .flyst2 {
          clip-path: url(#SVGID_2_);
        }

        //驚險火山島
        .firest0 {
          clip-path: url(#SVGID_2_);
          fill: #95CC91;
        }

        .firest1 {
          clip-path: url(#SVGID_2_);
          fill: #090103;
        }

        .firest2 {
          clip-path: url(#SVGID_2_);
          fill: #040000;
        }

        //溫馨親子島
        .childst0 {
          clip-path: url(#SVGID_2_);
          fill: #95CC91;
        }

        .childst1 {
          clip-path: url(#SVGID_2_);
          fill: #090103;
        }

        .childst2 {
          clip-path: url(#SVGID_2_);
        }

        //慢活樂園島
        .heavenst0 {
          clip-path: url(#SVGID_2_);
          fill: #95CC91;
        }

        .heavenst1 {
          clip-path: url(#SVGID_2_);
          fill: #090103;
        }

        .heavenst2 {
          clip-path: url(#SVGID_2_);
          fill: #040000;
        }
      }

      .uniqueMapRight {
        width: 60%;
        height: 50vh;
        border: 5px solid black;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        overflow: auto;

        .facilityBlock {
          width: calc(80%);
          height: calc(30%);
          // background-color: pink;
          margin: 4% 2%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }

  }

}

//3d地圖區
.ThreeSphereViewInf{
  width:100%;
  height: 10vh;
  display:flex;
  justify-content:center;
  align-items: center;
}

//最新活動地區
.newActiveity{
  width: 80vw;
  margin: 0 10vw;
  min-height: 30vh;
  
  h1 {
    margin: 2vh 0;
    font-weight: bold;
    font-family: Arial Black;
  }
  .activeityArrPlace{
    display:flex;
    justify-content: space-around;
    flex-wrap:wrap;
  }

}


// ====================================================================
hr {
  width: 80%;
  margin: 3vh 10%;
  border: 3px solid black;
}

// 門票區
.ticketAccess {
  width: 80vw;
  margin: 0 10vw;

  h1 {
    margin: 2vh 0;
    font-weight: bold;
    font-family: Arial Black;
  }

  .travelAgencyTable {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    margin-top: 5vh;

    .travelAgency {
      padding: 10px;
      text-align: center;
    }

    .travelAgency img {
      width: 200px;
      height: 70px;
    }

    h6 {
      margin-top: 5vh;
      margin-bottom: 0;
    }
  }

  .onlinePlatformTable {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    text-align: center;
    margin-top: 5vh;

    .onlinePlatform {
      padding: 10px;
    }

    .onlinePlatform img {
      width: 200px;
      height: 70px;
    }

    h6 {
      margin-top: 5vh;
      margin-bottom: 0;
    }
  }

  p {
    margin-top: 3vh;
    font-weight: bold;
  }
}

// 美食區
.gourmetRestaurant {
  width: 80vw;
  margin: 0 10vw;
  // height: 175vh;
  // overflow-y: auto; //自動產生 y 軸捲軸

  h1 {
    margin: 2vh 0;
    font-weight: bold;
    font-family: Arial Black;
  }

  .restaurantArea {
    width: inherit;
    height: 50vh;
    margin-top: 5vh;
    display: flex;

    .leftPart {
      width: 60%;
      height: inherit;
    }

    .rightPart {
      width: 40%;
      height: 35vh;
      margin-top: 6.5vh;
      border: 5px solid gold;
      border-style: dotted;
      border-radius: 30px;

      h4 {
        color: brown;
        margin-top: 5vh;
        margin-left: 0.5vw;
      }

      p {
        padding: 1em;
        text-align: justify; // 文字左右對齊
        line-height: 4vh; // 文字行間距
      }
    }
  }

  // .restaurant1Area {
  //   width: inherit;
  //   height: 50vh;
  //   margin-top: 5vh;
  //   display: flex;

  //   .leftPart1 {
  //     width: 60%;
  //     height: inherit;
  //   }

  //   .rightPart1 {
  //     width: 40%;
  //     height: 35vh;
  //     margin-top: 6.5vh;
  //     border: 5px solid gold;
  //     border-style: dotted;
  //     border-radius: 30px;

  //     h4 {
  //       color: brown;
  //       margin-top: 5vh;
  //     }

  //     p {
  //       padding: 1em;
  //       text-align: justify; // 文字左右對齊
  //       line-height: 4vh; // 文字行間距
  //     }
  //   }
  // }

  // .restaurant2Area {
  //   width: inherit;
  //   height: 50vh;
  //   margin-top: 5vh;
  //   display: flex;

  //   .leftPart2 {
  //     width: 40%;
  //     height: 35vh;
  //     margin-top: 6.5vh;
  //     border: 5px solid gold;
  //     border-style: dotted;
  //     border-radius: 30px;

  //     h4 {
  //       color: brown;
  //       margin-top: 5vh;
  //     }

  //     p {
  //       padding: 1em;
  //       text-align: justify; // 文字左右對齊
  //       line-height: 4vh; // 文字行間距  
  //     }
  //   }

  //   .rightPart2 {
  //     width: 60%;
  //     height: inherit;
  //   }
  // }

  // .restaurant3Area {
  //   width: inherit;
  //   height: 50vh;
  //   margin-top: 5vh;
  //   display: flex;

  //   .leftPart3 {
  //     width: 60%;
  //     height: inherit;
  //   }

  //   .rightPart3 {
  //     width: 40%;
  //     height: 35vh;
  //     margin-top: 6.5vh;
  //     border: 5px solid gold;
  //     border-style: dotted;
  //     border-radius: 30px;

  //     h4 {
  //       color: brown;
  //       margin-top: 5vh;
  //     }

  //     p {
  //       padding: 1em;
  //       text-align: justify; // 文字左右對齊
  //       line-height: 4vh; // 文字行間距
  //     }
  //   }
  // }

  // .restaurant4Area {
  //   width: inherit;
  //   height: 50vh;
  //   margin-top: 5vh;
  //   display: flex;

  //   .leftPart4 {
  //     width: 40%;
  //     height: 35vh;
  //     margin-top: 6.5vh;
  //     border: 5px solid gold;
  //     border-style: dotted;
  //     border-radius: 30px;

  //     h4 {
  //       color: brown;
  //       margin-top: 5vh;
  //     }

  //     p {
  //       padding: 1em;
  //       text-align: justify; // 文字左右對齊
  //       line-height: 4vh; // 文字行間距  
  //     }
  //   }

  //   .rightPart4 {
  //     width: 60%;
  //     height: inherit;
  //   }
  // }

  // .restaurant5Area {
  //   width: inherit;
  //   height: 50vh;
  //   margin-top: 5vh;
  //   display: flex;

  //   .leftPart5 {
  //     width: 60%;
  //     height: inherit;
  //   }

  //   .rightPart5 {
  //     width: 40%;
  //     height: 35vh;
  //     margin-top: 6.5vh;
  //     border: 5px solid gold;
  //     border-style: dotted;
  //     border-radius: 30px;

  //     h4 {
  //       color: brown;
  //       margin-top: 5vh;
  //     }

  //     p {
  //       padding: 1em;
  //       text-align: justify; // 文字左右對齊
  //       line-height: 4vh; // 文字行間距
  //     }
  //   }
  // }

  // .restaurant6Area {
  //   width: inherit;
  //   height: 50vh;
  //   margin-top: 5vh;
  //   display: flex;

  //   .leftPart6 {
  //     width: 40%;
  //     height: 35vh;
  //     margin-top: 6.5vh;
  //     border: 5px solid gold;
  //     border-style: dotted;
  //     border-radius: 30px;

  //     h4 {
  //       color: brown;
  //       margin-top: 5vh;
  //     }

  //     p {
  //       padding: 1em;
  //       text-align: justify; // 文字左右對齊
  //       line-height: 4vh; // 文字行間距  
  //     }
  //   }

  //   .rightPart6 {
  //     width: 60%;
  //     height: inherit;
  //   }
  // }


}

// 紀念品區
.limitedEdition {
  width: 80vw;
  margin: 0 10vw;

  h1 {
    margin: 2vh 0;
    font-weight: bold;
    font-family: Arial Black;
  }

  .souvenirShop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .card {
      width: calc(27%);
      margin: 2% 2%;
      overflow: hidden;
    }

    h5 {
      text-align: center;
      font-weight: bold;
      color: #009393;
    }

    p {
      padding: 1em;
      text-align: justify; // 文字左右對齊
      line-height: 2.5vh; // 文字行間距
    }
  }

}

.footerPlace {
  width: 100vw;
  height: 5vh;
  background-color: #0779E4;
}
</style>