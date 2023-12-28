<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'
import Swal from 'sweetalert2'
import axios from 'axios'
// import Tesseract from 'tesseract.js';
import { watch } from 'vue';
export default {
    data() {
        return {
            carnum: "",
            vehicleType:"",
            nowTime: 0,
            note: "",
            page: 0,
            msg: "浪漫遨遊~天空比鄰!!!",
            intervalId: null,
        }
    },
    methods: {

        cancel(){
            this.$router.push('ParkingLotInfo')
        },

        change() {
            this.page = 0;
        },
        
        admission() {
                    const regex = /^[A-Z\d]{2,4}[A-Z\d]{2,4}$/;
                    if (!regex.test(this.carnum) ) {
                    Swal.fire({
                            title: '車牌格式錯誤!',
                            confirmButtonText: 'confirm'
                        })
                    return
                    }
                
            // 创建一个对象，包含请求的数据
            const requestData = {
            license: this.carnum,  // 替换为实际的车牌号
            vehicleType : this.vehicleType   
            };

            // 使用 fetch 函数发送 POST 请求
            fetch('http://localhost:8080/api/parkingLot/admission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
            })
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // 解析 JSON 数据
            })
            .then(data => {
                // 处理从服务器返回的数据
                console.log('Server response:', data);
                
                if(data.rtncode == "ADMISSION_SUCCESSFUL"){
                    this.$router.push('searchCar')
                    this.carnum = "";
                    Swal.fire({
                        title: '歡迎蒞臨 AIR TIME!!',
                        confirmButtonText: '確認'
                    })
                    this.$router.push('ParkingLotInfo')
                } else {
                    Swal.fire({
                        title: 'Fail!',
                        text: "不得重複入場",
                        confirmButtonText: '確認'
                    })
                    this.page = 0;
                }
            
            })
            .catch(error => {
                // 处理请求错误
                console.error('Request failed:', error);
            });

                        
            }
        },
        // lang() {
        //     if (this.intervalId != null) return;

        //     this.intervalId = setInterval(() => {
        //         this.msg = this.msg.substring(1) + this.msg.substring(0, 1);
        //     }, 600);
        // }

    mounted() {
        function randomusefloor(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        function carNum(max) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (let i = 0; i < max; i++) {
                // possible 字串中取得字母，並將該字母加到 text 中。
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        function myrandomstring() {
            var randomCarNum = carNum(3) + randomusefloor(1, 9999);
            return randomCarNum
        }
        var randomCarNum = myrandomstring();
        const carnum = randomCarNum
        console.log("範例車牌號碼:",carnum)

        // this.lang()
    },
    created() {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutess = date.getMinutes()
        this.nowTime = `${year}-${month}-${day}-${hours}-${minutess}`
    },
    components: {
        HomeHeaderView
    },
}
// Tesseract.recognize(
//     '123.png',
//     'eng',
//     { logger: m => console.log(m) }
// ).then(({ data: { text } }) => {
//     console.log(text);
// });
</script>

<template>
    <HomeHeaderView />
    <div class="searchCarPlatePicture" v-show="page == 0">

        <h1 style="margin-bottom: 3vh;"> 車輛入場</h1>

        <div class="carPlate">
            <!-- <div class="SearchCarPlateTitle">
                <h1>{{msg}}</h1>
            </div> -->
            <div class="carnumInput">
                <h2>請輸入車牌號碼 : </h2>       
                    <input type="text" v-model="carnum" maxlength="7" placeholder="範例: ABX1234 " oninput="value=value.replace(/[^A-Z\d]/,'')" />
            </div>

            <div class="vehicleTypeSelect">
                <h2>選擇車種 : </h2>
                <select name="" id="" v-model="vehicleType">
                    <option value="機車">機車</option>
                    <option value="小客車">小客車</option>
                    <option value="大客車">大客車</option>
                </select>
            </div>

            <div class="SearchCarPlateconfirm">
                <button  class ="btn"  @click="cancel" >取消 <span></span><span></span><span></span><span></span></button>
                <button  class ="btn"  @click="admission" >確認 <span></span><span></span><span></span><span></span></button>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.searchCarPlatePicture {
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-color: rgb(35, 139, 224);
    background-image: url(../../picture/backView/下載.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.vehicleTypeSelect{
    display: flex;
    margin: 1% 4.5% 0 0%;
}

select{
    margin:  0 10px ;
}


input{
    margin:  0 10px ;
}
.carnumInput{
    display: flex;
}

button{
    font-size: 16pt;
    font-weight: bolder;
    margin:  20px;
}



// .SearchCarPlateTitle {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: rgb(238, 255, 0);
// }

.carPlate {
    height: 30%;
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    // color: rgb(12, 12, 12);
}

.SearchCarPlateconfirm {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    display: inline-block;
    position: relative;
    z-index: 1;
    min-width: 100px;
    background: #FFFFFF;
    border: 2px solid goldenrod;
    border-radius: 4px;
    color: goldenrod;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    overflow: hidden;
    transition: 0.5s;
    padding: 10px 20px;
}
.btn span {
    position: absolute;
    width: 25%;
    height: 100%;
    background-color: goldenrod;
    transform: translateY(150%);
    border-radius: 50%;
    left: calc((var(--n) - 1) * 25%);
    transition: 0.5s;
    transition-delay: calc((var(--n) - 1) * 0.1s);
    z-index: -1;
}
.btn:hover,
.btn:focus {
    color: white;
    font-size: large;
}
.btn:hover span {
    transform: translateY(0) scale(2);
}
.btn span:nth-child(1) {
    --n: 1;
}
.btn span:nth-child(2) {
    --n: 2;
}
.btn span:nth-child(3) {
    --n: 3;
}
.btn span:nth-child(4) {
    --n: 4;
}
</style>