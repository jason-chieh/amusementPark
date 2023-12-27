<script >
import { RouterLink, RouterView } from 'vue-router'

//彈跳視窗
import Swal from 'sweetalert2'

export default{
    data(){
            return{
            //讓中間midheader可以跳轉頁面的變數
            page:1,
            //抓出已經開放的設施
            publishedFacility:[],

            //登入人的資料
            loginInfo:{},
            //確定是否有登入
            checkLogin:false,

            //抓出登入者的預約資訊
            reserveFacilityArr:[],

            //判斷有沒有預約相同
            checkSameReserve:0
            }
    },
    methods:{
        //登出提示框-個人資訊欄
        logoutPlace(){
            Swal.fire({
            title: this.loginInfo.player.nickname,
            text: "年紀:"+this.loginInfo.player.age,
            footer: "遊玩日期:"+this.loginInfo.player.playDate,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "登出",
            cancelButtonText: "返回",
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "成功",
                // text: "",
                icon: "success"
                });
                this.$router.push("/")
                this.logput()
            }
            });
        },
        //新增失敗提示窗-年紀沒有符合
        showAgeFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "年紀未達規定",
                footer: ''
            });
        },
        //新增失敗提示窗-預定相同的設施
        showReserveFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "你已經預約過囉",
                footer: ''
            });
        },
        //新增成功提示窗
        showBlockSucess(){
            Swal.fire({
            position: "center",
            icon: "success",
            title: "預約成功",
            showConfirmButton: false,
            timer: 1500
            });
        },


        // 讓卡片們旋轉
        changeCard(){

        // 獲取所有的 .card 元素
        const card = event.currentTarget.closest('.card');

        // 對該卡片元素應用旋轉樣式
        card.classList.toggle('rotate');

        },
        //跳轉到order首頁
        goOrderHome(){
            this.$router.push("/PlayerOrder")
        },

        // 跳轉到精選頁
        gofacility(){
        this.page=1
        },
        // 跳轉到地圖頁
        gomap(){
        this.page=2
        },
        //跳轉到留言區
        goFacilityInfo(index){
            console.log( this.loginInfo.player.nickname)
            this.$router.push({ path: '/FacilityInfo', query: { data: JSON.stringify({ key:this.publishedFacility[index] }),
            secondParam:  this.loginInfo.player.nickname } })
        },

        //計算設施使用時間
        calculateMinute(reserveNum){
            return Math.floor(reserveNum*1.5)
        },

        //使用者登出
        logput(){
            var url = "http://localhost:8080/api/addminUser/logout";
            var data = {

			};

            fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) =>{ 
                console.log("Success:", response,)    
            });
        },

        //預約設施
        reserveFacility(index){
            //判斷年紀是否達規定
            if(this.loginInfo.player.age<this.publishedFacility[index].age){
                this.showAgeFail()
                return
            }

            for (let i = 0; i < this.reserveFacilityArr.length; i++) {
                if(this.reserveFacilityArr[i].facilityName==this.publishedFacility[index].name){
                    this.checkSameReserve = 1
                    this.showReserveFail()
                    return
                }
            }


            
            const url = 'http://localhost:8080/api/park/reserveFacility';
                // 要帶入的值
                const queryParams = new URLSearchParams({
                    facilityname:this.publishedFacility[index].name
                });

                // 將查詢字串附加到 URL
                const urlWithParams = `${url}?${queryParams}`;

                fetch(urlWithParams, {
                method: "POST", 
                headers: new Headers({
                    "Accept":"application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }),
                })
                .then(response => {
                // 將API回應轉換為JSON格式
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                console.log(data)
                return this.searchFacility()
                })
                this.addReserveFacility(index)
        },
        //新增預約細項
        addReserveFacility(index){

            var url = "http://localhost:8080/api/park/addReserveInfo";
            var data = {
                "reserveFacility":{
                    "facilityName":this.publishedFacility[index].name,
                    "uuid":this.loginInfo.player.uuid,
                    "facilityPlace":this.publishedFacility[index].place,
                    "age":this.loginInfo.player.age
                }
            };

            fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                console.log("Success:", response)
                return this.searchReserveFacility();
            });

            this.showBlockSucess()

        },

        //歡迎使用者
        welcomePlayer(nickname){
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
        title: nickname+"歡迎遊玩!!!"
        });
        },
        //搜尋所有的已開放遊樂施
        searchFacility(){
                const url = 'http://localhost:8080/api/park/getAllFacility';
                // 要帶入的值

                const queryParams = new URLSearchParams({
                });

                // 將查詢字串附加到 URL
                const urlWithParams = `${url}?${queryParams}`;

                fetch(urlWithParams, {
                method: "GET", 
                headers: new Headers({
                    "Accept":"application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }),
                })
                .then(response => {
                // 將API回應轉換為JSON格式
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                this.publishedFacility = data;

                // console.log(this.publishedFacility)

                //將所有陣列裡面照片的字串加上資料型態 讓img可以讀取
                for(let i = 0;i<this.publishedFacility.length;i++){
                var string = this.publishedFacility[i].photo;
                this.publishedFacility[i].photo = 'data:image/jpeg;base64,' + string;
                }

                    // console.log(this.publishedFacility)
                })
        },

        // //搜尋登入者的預約細項
        searchReserveFacility(){
                const url = 'http://localhost:8080/api/park/searchReserveFacility1';
                // 要帶入的值

                const queryParams = new URLSearchParams({
                    uuid:this.loginInfo.player.uuid
                });
                
                // 將查詢字串附加到 URL
                const urlWithParams = `${url}?${queryParams}`;

                fetch(urlWithParams, {
                method: "GET", 
                headers: new Headers({
                    "Accept":"application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }),
                })
                .then(response => {
                // 將API回應轉換為JSON格式
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                    // console.log(data)
                    this.reserveFacilityArr=data



                    //將所有陣列裡面照片的字串加上資料型態 讓img可以讀取
                    for (let i = 0; i < this.reserveFacilityArr.length; i++) {
                        var string = this.reserveFacilityArr[i].photo;
                        this.reserveFacilityArr[i].photo = 'data:image/jpeg;base64,' + string;
                    }
                })


        },
        delReserveFacility(index){

            const url = 'http://localhost:8080/api/park/deleteReserveFacility';
            // 要帶入的值
            const queryParams = new URLSearchParams({
                facilityname:this.reserveFacilityArr[index].facilityName,
                uuid:this.reserveFacilityArr[index].uuid
            });
            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParams}`;

            fetch(urlWithParams, {
            method: "GET", 
            headers: new Headers({
                "Accept":"application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"*"
            }),
            })
            .then(response => {
            // 將API回應轉換為JSON格式
            return response.json();
            })
            .then(data => {
            // 將API回應的JSON數據設置到組件的responseData數據屬性中
                return  this.searchFacility()
            })
            //把前端陣列刪掉
            this.reserveFacilityArr.splice(index,1)
        }
        
    },
    components:{
        
    },
    mounted(){
        this.searchFacility()

        //確定登入人資料是否有資料
        if(!(JSON.parse(this.$route.query.data==undefined))){
            //將登入頁傳來的個人資料轉成json可讀取
            const data = JSON.parse(this.$route.query.data);
            // 輸出 'value' 拿取裡面的key
            this.loginInfo = data.key; 
            // console.log(this.loginInfo)
            this.checkLogin =true
            this.welcomePlayer(this.loginInfo.player.nickname)
            this.searchReserveFacility();
            return
        }


    }
}
</script>

<template>
        <!-- //上方header欄位 -->
        <div class="headerBody">
            <div class="headerBodyLeft">
                <img @click="goOrderHome" src="../../picture/logo/logo2.jpg" alt="">
            </div>
            <div class="headerBodyRight">
                <div class="dropdownMenu">
                        <button type="button" class="dropbtn">預約列表</button>
                        <div class="dropcontent">
                            <div  class="reserveBlock" v-for="reserve, index in this.reserveFacilityArr">
                                <img :src=reserve.photo alt="" style="height: 100%;">
                                <p>{{reserve.facilityName}}</p>
                                <button @click="delReserveFacility(index)" class="banBtn" type="button"><i class="fa-solid fa-x"></i></button>
                            </div>
                        </div>
                </div>
                <!-- 使用者資訊 -->
                <div v-if="checkLogin==true" class="UserPlace">
                    <i @click="logoutPlace" class="fa-solid fa-poo"></i>
                </div>
                
            </div>
            
        </div>

        <!-- 中間變色功能列 -->
        <!-- <div class="midHeader">
            <div @click="gofacility" class="facility   block">
                <div class="iconPlace">
                <i class="fa-solid fa-brands fa-fort-awesome-alt"></i>
                </div>
                <span>遊樂設施</span>
            </div>
            <div @click="gomap" class="map        block">
                <div class="iconPlace">
                <i class="fa-solid fa-map-location-dot"></i>
                </div>
                <span>地圖資訊</span>
            </div>
            <div  class="tour       block">
                <div class="iconPlace">
                <i class="fa-solid fa-fire"></i>
                </div>
                <span>熱門精選</span>
            </div>
            <div class="Activity   block">
                <div class="iconPlace">
                <i class="fa-solid fa-shoe-prints"></i>
                </div>
                <span>特別活動</span>
            </div>
            <div class="ticket     block">
                <div class="iconPlace">
                <i class="fa-solid fa-ticket"></i>
                </div>
                <span>門票通路</span>
            </div>
            <div class="restaurant block">
                <div class="iconPlace">
                <i class="fa-solid fa-utensils"></i>
                </div>
                <span>美食餐廳</span>
            </div>
        </div> -->

        <!-- ========================================================================================= -->

        <!-- 遊樂設施資訊 -->
        <div v-if="page==1"  class="bootstrapCard">
            <h1>遊樂設施</h1>
            <div class="cardPlace">
                <div class="card" v-for="item, index in this.publishedFacility"  >
                    <div class="cardFront"  >
                        <img :src=item.photo class="card-img-top" alt="..." >
                        <div class="card-body">
                        <h5 class="card-title" style="font-size: 20pt;">{{item.name}}</h5>
                        <p class="card-text">{{item.description}}</p>
                        <span class="card-text reserve">預計等待時間:</span>
                        <span class="card-text reservetime">{{calculateMinute(item.reserveNum)}}分鐘</span><br>
                        <span class="card-text reserve">人數:</span>
                        <span class="card-text reservetime">{{item.reserveNum}}人</span>
                        </div>
                        <i @click="this.reserveFacility(index)" class="fa-solid fa-circle-plus"></i>
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
                        <button @click="goFacilityInfo(index)" class="btnMore" type="button">詳細資訊</button>
                        <button  @click="changeCard(index)" class="carousel-control-next " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" >
                        <span  class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- ========================================================================================= -->

        <footer class="footerPlace"></footer>


</template>

<style lang="scss" scoped>
    //header
    .headerBody{
    width: 100vw;
    height: 15vh;
    display: flex;
    background-color:#0779E4;
    padding: 0 10vw;
    border: 1px solid black;
        .headerBodyLeft{
            width: 30%;
            img{
                width: auto;
                height: 100%;
                &:hover{
                    cursor: pointer;
                }
            }

        }
        .headerBodyRight{
            width: 70%;
            display: flex;
            justify-content: end;
            align-items: center;
            .UserPlace{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgb(255, 255, 255);
                font-size: 26pt;
                margin-left: 1vw;
                &:hover{
                    background-color: rgb(217, 232, 253);
                }
            }
            .dropdownMenu{
                position: relative;
                &:hover{
                        .dropcontent{
                            display:block;
                        }
                    }
                button{
                    color: white;
                    border: 0;
                    max-width: 200px;
                    background-color: #0779E4;
                    font-weight: bold;
                    font-size: 16pt;
                }
                .dropcontent{
                    position: absolute;
                    right: 50%;
                    width: 30vw;
                    height: 60vh;
                    background-color: white;
                    z-index: 10;
                    border-radius: 10px;
                    overflow: auto;
                    padding: 15% 15%;
                    display:none;
                    .reserveBlock{
                        width: 100%;
                        height: 20%;
                        background-color: rgb(231, 230, 230);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 1% 1%;
                        overflow: hidden;
                        p{
                            margin: 0;
                        }
                        .banBtn{
                            width: 50px;
                            height: 50px;
                            background-color: transparent;
                            &:hover{
                                background-color: rgb(157, 157, 157);
                            }
                            i{
                                color: red;
                            }
                        }
                        &:hover{
                            background-color: gray;
                        }
                    }
                }
            }
        }
    }

    .midHeader{
    max-width: 80vw;
    margin: 0 10vw;
    display: flex;
    height: 15vh;
    border-radius: 20px;
    background-color: white;
    // margin-top: -6vh;
    position: relative; /* 或者是其他值，除了 static */
    z-index: 2; 
    .fa-solid{
        font-size: 25pt;
        color: rgb(26, 26, 172);
    }
    .block{
        width: calc(16.66%);
        height: 100%;
        text-align: center;
        &:hover{
        background-color:rgb(26, 26, 172);
        color: white;
        .fa-solid{
            color:white;
        }
        }
    }
    .iconPlace{
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    }

    // ====================================================================
    //精選內容--卡片v-for區
    .bootstrapCard{
        width: 80vw;
        margin: 0 10vw;
        h1{
            margin: 2vh 0;
            font-weight: bold;
            font-family:Arial Black;
        }
        .cardPlace{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start; /* 控制左對齊 */
            flex-wrap: wrap;
            .card{
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
                img{
                    width: 100%;
                }
                i{
                    position: absolute;
                    bottom: 2%;
                    left: 2%;
                    font-size: 24pt;
                    color: rgb(240, 151, 151);
                    
                    // transition: 1s;
                    &:hover{
                        // font-size: 24pt;
                        color: rgb(248, 72, 72);
                    }
                }
                .reservetime{
                    color:red;
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
                p{
                font-size: 12pt;
                }
                button{
                border: 0;
                border-radius: 10px;
                font-size: 14pt;
                color: #0779E4;
                }
                .btnMore{
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
            right: 1%; /* 右側位置，可以調整 */
            transform: translateY(-50%);
            z-index: 1; /* 確保在前景顯示 */
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
    .mapByMyself{
    h1{
        margin: 2vh 10%;
        font-weight: bold;
        font-family:Arial Black;
    }
    svg{
        width: 100%;
        height: 80vh;
        margin-left: auto;
        margin-right: auto;
        
    }
    .island{
    stroke: black;
    fill: transparent;
        transition: 1s;
        cursor: pointer;
        &:hover{
            transform: translate(-5px,-5px);
            box-shadow: 5px 5px  black ;
        }
    }
    // .st0{
    //   stroke: black;
    //   fill: transparent;
    //     transition: 1s;
    //     cursor: pointer;
    //     &:hover{
    //         transform: translate(-5px,-5px);
    //         box-shadow: 5px 5px  black ;
    //     }
    // }
    .st0{clip-path:url(#SVGID_2_);fill:#EDEEE3;}
        .st1{clip-path:url(#SVGID_2_);}
        .st2{opacity:0.28;clip-path:url(#SVGID_4_);}
        .st3{clip-path:url(#SVGID_6_);}
        .st4{clip-path:url(#SVGID_8_);fill:url(#SVGID_9_);}
        .st5{clip-path:url(#SVGID_11_);fill:url(#SVGID_12_);}
        .st6{clip-path:url(#SVGID_4_);fill:#3C2315;}
        .st7{clip-path:url(#SVGID_16_);fill:#96E096;}
        .st8{clip-path:url(#SVGID_16_);fill:#070001;}
        .st9{clip-path:url(#SVGID_16_);}
        .st10{clip-path:url(#SVGID_18_);fill:#96E096;}
        .st11{clip-path:url(#SVGID_18_);fill:#070001;}
        .st12{clip-path:url(#SVGID_18_);}
        .st13{clip-path:url(#SVGID_20_);fill:#96E096;}
        .st14{clip-path:url(#SVGID_20_);fill:#070001;}
        .st15{clip-path:url(#SVGID_20_);}
        .st16{clip-path:url(#SVGID_22_);fill:#96E096;}
        .st17{clip-path:url(#SVGID_22_);fill:#070001;}
        .st18{clip-path:url(#SVGID_22_);}
        .st19{clip-path:url(#SVGID_26_);fill:#96E096;}
        .st20{clip-path:url(#SVGID_26_);fill:#070001;}
        .st21{clip-path:url(#SVGID_26_);}
        .st22{clip-path:url(#SVGID_28_);fill:#96E096;}
        .st23{clip-path:url(#SVGID_28_);fill:#0E0E0E;}
    }

    // ====================================================================
    hr{
    width: 80%;
    margin: 3vh  10%;
    border: 3px solid black;
    }
    .footerPlace{
        width: 100vw;
        height: 5vh;
        background-color:#0779E4;
    }


</style>