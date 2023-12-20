<script >
import { RouterLink, RouterView } from 'vue-router'
import Swal from 'sweetalert2'
import HomeHeaderView from '../views/HomeHeaderView.vue'

export default {
  data() {
    return {
      //讓中間midheader可以跳轉頁面的變數
      page: 1,
      //暫時性可以把卡片v-for出來的陣列
      Arr: [1, 2, 3, 4, 5, 6],
      //抓出已經開放的設施
      publishedFacility: [],

      //登入人的資料
      loginInfo: {},
      //確定是否有登入
      // checkLogin:false,
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
      this.page = 2
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
    //歡迎使用者
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

  },
  components: {
    HomeHeaderView
  },
  mounted() {
    this.searchFacility()
  },
  // 更新頁面後，重新渲染
  updated() {
    if (this.page == 2) {
      this.zoomAndShowText()
    }
    console.log("未登入狀態")
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
        <div class="tour  block">
          <div class="iconPlace">
            <i class="fa-solid fa-fire"></i>
          </div>
          <span>熱門精選</span>
        </div>
        <!-- <div class="Activity  block">
          <div class="iconPlace">
            <i class="fa-solid fa-shoe-prints"></i>
          </div>
          <span>特別活動</span>
        </div> -->
        <div @click="goticket" class="ticket  block">
          <div class="iconPlace">
            <i class="fa-solid fa-ticket"></i>
          </div>
          <span>門票通路</span>
        </div>
        <div @click="goRestaurant" class="restaurant  block">
          <div class="iconPlace">
            <i class="fa-solid fa-utensils"></i>
          </div>
          <span>美食餐廳</span>
        </div>
        <div @click="goSouvenir" class="Activity  block">
          <div class="iconPlace">
            <i class="fa-solid fa-gift"></i>
          </div>
          <span>獨家商品</span>
        </div>
      </div>

  <!-- ========================================================================================= -->

      <div v-if="page==1"  class="bootstrapCard">
        <h1>遊樂設施</h1>
        <div class="cardPlace">
              <div class="card" v-for="item, index in this.publishedFacility"  >
                  <div class="cardFront"  >
                    <img :src=item.photo class="card-img-top" alt="..." >
                    <div class="card-body">
                      <h5 class="card-title" style="font-size: 20pt;">{{item.name}}</h5>
                      <p class="card-text">{{item.description}}</p>
                      <span class="card-text reserve">預計等待時間</span>
                      <span class="card-text reservetime">{{calculateMinute(item.reserveNum)}}分鐘</span>
                    </div>
                    
                    <button @click="changeCard()" class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" >
                      <span class="carousel-control-next-icon" aria-hidden="true" ></span>
                      <span class="visually-hidden" >Next</span>
                    </button>
                  </div>
                  <!-- //===================================================== -->
                  <div class="cardBack">
                    <h3>{{item.name}}</h3>
                    <p>活動期間:{{item.startDate}}~{{item.endDate}}</p>
                    <p>限制年齡:{{item.age}}</p>
                    <p>地點:{{item.place}}</p>
                    <p>預約人數:{{item.reserveNum}}</p>
                    <button class="btnMore" type="button">詳細資訊</button>
                    <button  @click="changeCard(index)" class="carousel-control-next " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" >
                      <span  class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
              </div>
        </div>
      </div>



      <!-- 門票通路 -->
      <div v-if="page == 4" class="ticketAccess">
      >>>>>>> 910e58f095c0df8eda4e8b47e887f25e2f9806bf
      <h1>門票通路</h1>
      <h4><strong style="color:brown ; text-decoration:underline">販賣旅行社</strong></h4>

      <div class="travelAgencyTable">
        <div class="travelAgency">
          <a href="https://www.colatour.com.tw/"></a>
          <a href="https://www.colatour.com.tw/" target="_blank">
            <img src="../../picture/travelAgency/可樂旅遊.png" alt="可樂旅遊" class="colaTour"></a>
          <h6>可樂旅遊</h6>
        </div>
        <div class="travelAgency">
          <a href="https://www.settour.com.tw/"></a>
          <a href="https://www.settour.com.tw/" target="_blank">
            <img src="../../picture/travelAgency/東南旅遊.png" alt="東南旅遊" class="setTour"></a>
          <h6>東南旅遊</h6>
        </div>
        <div class="travelAgency">
          <a href="https://www.liontravel.com/category/zh-tw/index"></a>
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

      </div>

      <!-- 美食餐廳 -->
      <div v-if="page == 5" class="gourmetRestaurant">
        <h1>美味餐點</h1>

        <div class="restaurant1Area">
          <div class="leftPart1">
            <img src="../../picture\restaurant\美式餐廳_FriBay.jpg" alt="FriBay"
              style="width: 600px; height: 350px; display:flex; margin:auto;">
            <!-- <img src="https://picsum.photos/700/350?random=1" style="display:flex; margin:auto;"> -->
          </div>
          <div class="rightPart1">
            <h4 style="text-indent: 0.5em;"><strong>FriBay</strong></h4>
            <p>
              歡迎光臨「FriBay」，我們是一家正統的美式餐廳，將經典的美國美食呈現在您的餐桌上。菜單豐富多樣，包括經典牛排、芝士漢堡、香脆炸雞翅，以及創意十足的美式披薩。每一道菜品都以新鮮、高品質的食材製作，保證為您帶來極致美味的享受。「FriBay」位於樂園驚險火山島，提供寬敞明亮的用餐環境和親切的服務，讓您在這裡感受到最地道的美國風味。不論是家庭聚餐還是與朋友相聚，「FriBay」都是您品味美味、享受愉悅時光的理想之地。
            </p>
          </div>
        </div>

        <div class="restaurant2Area">
          <div class="leftPart2">
            <h4 style="text-indent: 0.5em;"><strong>Trattoria di primo</strong></h4>
            <p>歡迎來到「Trattoria di primo」，這是一家充滿義大利風情的餐廳，為您帶來最道地的義式美食體驗。在「Trattoria di
              primo」，您可以品嚐到新鮮的義大利麵製品、濃郁的奶酪、美味的海鮮和精心調製的義大利咖啡。用餐環境充滿藝術氛圍，讓您彷彿置身於義大利的美麗小鎮，「Trattoria di primo」都能滿足您對義大利美食的所有期待。
            </p>
          </div>
          <div class="rightPart2">
            <img src="../../picture\restaurant\義式餐廳_Trattoria di primo.jpg" alt="FriBay"
              style="width: 600px; height: 350px; display:flex; margin:auto;">
            <!-- <img src="https://picsum.photos/700/350?random=2" style="display:flex; margin:auto;"> -->
          </div>
        </div>

        <div class="restaurant3Area">
          <div class="leftPart3">
            <img src="../../picture\restaurant\台式餐廳_台味小館.jpg" alt="FriBay"
              style="width: 600px; height: 350px; display:flex; margin:auto;">
            <!-- <img src="https://picsum.photos/700/350?random=3" style="display:flex; margin:auto;"> -->
          </div>
          <div class="rightPart3">
            <h4 style="text-indent: 0.5em;"><strong>台味小館</strong></h4>
            <p>
              歡迎蒞臨「台味小館」，這邊專為您呈現正宗的台灣美食。菜單匯集了台灣各地的經典料理，從台南小吃到台北夜市，品嚐滷肉飯、蚵仔煎、牛肉麵等，彷彿帶您置身於台灣街頭美食天堂。簡約舒適的用餐環境中，新鮮食材和獨特口感保證讓您感受到家的溫馨和台灣味覺享受。「台味小館」是您感受台灣美食文化的絕佳選擇。期待為您帶來一場道地的台灣味覺之旅。
            </p>
          </div>
        </div>
      </div>

      <!-- 獨家商品 -->
      <div v-if="page == 6" class="limitedEdition ">
        <h1>周邊商品</h1>

        <div class="souvenirShop">
          <div class="card" style="width: 18rem;">
            <img src="../../picture\souvenir\瑪利歐_瑪利歐造型帽.png" class="card-img-top" alt="瑪利歐造型帽">
            <div class="card-body">
              <h5 class="card-title">瑪利歐造型帽</h5>
              <p class="card-text">瑪利歐突然不見蹤影，碧姬公主正好又被庫巴抓走了，這次輪到你代替瑪利歐進攻庫巴城，將任天堂經典電玩角色瑪利歐所戴的帽子實體化，適合萬聖節、派對活動時穿戴，也是朋友生日送禮的好選擇
              </p>
              <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img src="../../picture\souvenir\瑪莉歐_紅色龜殼聲光小夜燈.png" class="card-img-top" alt="紅色龜殼聲光小夜燈">
            <div class="card-body">
              <h5 class="card-title">紅龜殼聲光小夜燈</h5>
              <p class="card-text">
                還記得在瑪莉歐關卡中連續踩擊龜殼達到花式通關的景象嗎？或是在瑪莉歐賽車中使用龜殼陷害對手露出陰險微笑的瞬間。紅龜殼聲光小夜燈，高度約12CM，可當一般裝飾擺設,，也可當作小夜燈來使用。</p>
                <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img src="../../picture\souvenir\瑪利歐_無敵星泡沫慕斯瓶.png" class="card-img-top" alt="無敵星泡沫慕斯瓶">
            <div class="card-body">
              <h5 class="card-title">無敵星泡沫慕斯瓶</h5>
              <p class="card-text">融合瑪利歐遊戲裡的多樣元素，以問號磚塊作為設計，上頭印有瑪利歐的圖樣，壓嘴部分則是設計成無敵星的樣貌，在瓶罐中加入慕斯洗手乳，即可在按壓後擠出星型泡沫，讓小朋友愛上洗手，遠離病毒
              </p>
              <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img src="../../picture\souvenir\瑪利歐_食人花燈飾.png" class="card-img-top" alt="食人花燈飾">
            <div class="card-body">
              <h5 class="card-title">食人花燈飾</h5>
              <p class="card-text">小巧可愛的食人花不會吃蚊蟲，但會替你照亮夜裡的黑暗，日本 Nintendo
                官方授權英國Paladone製作，枝幹部份可調整照射方向，按動開關按鈕即可開燈，使用電池供電，自用還是送禮都是不錯的選擇</p>
                <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img src="../../picture\souvenir\瑪利歐_鐵罐禮物組.png" class="card-img-top" alt="鐵罐禮物組">
            <div class="card-body">
              <h5 class="card-title">鐵罐禮物組</h5>
              <p class="card-text">整組包含一個鐵盒、馬克杯和杯墊，鐵罐以問號磚塊罪為主題，杯墊和馬克杯分別以蘑菇和瑪利歐當作主要圖示，整體色調鮮明活潑，非常適合坐在沙發上遊玩遊戲時搭配使用，享受著無人打擾的遊戲時光
              </p>
              <a href="https://www.nintendo.tw/switch/aqmxa/" target="_blank" class="btn btn-primary">詳細資訊</a>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img src="../../picture\souvenir\瑪利歐_害羞幽靈USB燈飾.png" class="card-img-top" alt="害羞幽靈USB燈飾">
            <div class="card-body">
              <h5 class="card-title">害羞幽靈USB燈飾</h5>
              <p class="card-text">小心！寂靜的夜晚裡幽靈即將出沒，害羞精靈BOO USB燈飾，適合用來作為夜間照明，也可當作療癒心靈的擺飾，體積不大，不使用時易於收納，使用USB作為燈飾電源來源，可愛的造型值得你擁有</p>
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
  z-index: -10;

  h1 {
    width: 100%;
    background-color: rgb(26, 26, 172);
  }

  p {
    width: 100%;
    background-color: rgb(26, 26, 172);
  }

  .change {
    width: 5vh;
    height: 10vh;
    border-radius: 10px;
    background-color: rgba(80, 80, 80, 0.6);
    margin: 0 5vw;
    margin-top: 50vh;
  }
}

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
        margin-top: 50%;
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

//地圖區
.mapByMyself {

  // 地圖動畫-1218測試
  .hovered {
    transform: scale(1.2) translate(-20px, 0);
  }

  h1 {
    margin: 2vh 10%;
    font-weight: bold;
    font-family: Arial Black;
  }

  svg {
    width: 100%;
    height: 80vh;
    margin-left: auto;
    margin-right: auto;

  }

  .island {
    stroke: black;
    fill: transparent;
    transition: 1s;
    cursor: pointer;

    &:hover {
      transform: translate(-5px, -5px);
      box-shadow: 5px 5px black;
    }
  }

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

// ====================================================================
hr {
  width: 80%;
  margin: 3vh 10%;
  border: 3px solid black;
}

// 門票區
.ticketAccess {
  width: 80vw;
  height: 90vh;
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
    margin-top: 5vh;
    font-weight: bold;
  }
}
// 美食區
.gourmetRestaurant {
  width: 80vw;
  height: 175vh;
  margin: 0 10vw;

  h1 {
    margin: 2vh 0;
    font-weight: bold;
    font-family: Arial Black;
  }

  .restaurant1Area {
    width: inherit;
    height: 50vh;
    display: flex;

    .leftPart1 {
      width: 60%;
      height: inherit;
      // border: 5px solid pink;
      // border-style:dotted;
    }

    .rightPart1 {
      width: 40%;
      height: 47vh;
      border: 5px solid gold;
      border-style: dotted;
      border-radius: 30px;

      h4 {
        color: brown;
        margin-top: 5vh;
      }

      p {
        padding: 1em;
        text-align: justify; // 文字左右對齊
        line-height: 4vh; // 文字行間距
      }
    }
  }

  .restaurant2Area {
    width: inherit;
    height: 50vh;
    margin-top: 5vh;
    display: flex;

    .leftPart2 {
      width: 40%;
      height: 47vh;
      // border: 5px solid pink;
      border: 5px solid gold;
      border-style: dotted;
      border-radius: 30px;

      h4 {
        color: brown;
        margin-top: 5vh;
      }

      p {
        padding: 1em;
        text-align: justify; // 文字左右對齊
        line-height: 4vh; // 文字行間距  
      }
    }

    .rightPart2 {
      width: 60%;
      height: inherit;
      // border: 5px solid gold;
    }
  }

  .restaurant3Area {
    width: inherit;
    height: 50vh;
    margin-top: 5vh;
    display: flex;

    .leftPart3 {
      width: 60%;
      height: inherit;
      // border: 5px solid pink;
    }

    .rightPart3 {
      width: 40%;
      height: 47vh;
      border: 5px solid gold;
      border-style: dotted;
      border-radius: 30px;

      h4 {
        color: brown;
        margin-top: 5vh;
      }

      p {
        padding: 1em;
        text-align: justify; // 文字左右對齊
        line-height: 4vh; // 文字行間距
      }
    }
  }
}

// 紀念品區
.limitedEdition {
  width: 80vw;
  height: 175vh;
  margin: 0 10vw;

  h1 {
    margin: 2vh 0;
    font-weight: bold;
    font-family: Arial Black;
  }

  .souvenirShop {
    display: flex;
    flex-wrap: wrap;

    .card {
      margin-left: 5vw;
      margin-top: 5vh;
    }

    h5{
      text-align: center;
      font-weight: bold;
      color:#009393;
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
}</style>