<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'
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
            const regex = /^[A-Z]{3}\d{4}$/
            if (!regex.test(this.carnum) ) {
                alert('請輸入正確車牌')
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
                    this.page = 1;
                    this.carnum = "";
                    return alert(data.rtncode);
                } else {
                    alert(data.rtncode)
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
        this.carnum = randomCarNum
        console.log(this.carnum)

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
        console.log(this.nowTime)
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
    <div class="SearchCarPlatePicture" v-show="page == 0">
        <div class="SearchCarPlateTitle">
            <h1>{{msg}}</h1>
        </div>
        <div class="CarPlate">
            <h3>請輸入車牌號碼</h3>
            <h5>範例:(ABX1234)</h5>
            <input type="text" v-model="carnum" maxlength="7" oninput="value=value.replace(/[^A-Z\d]/g,'')" />
            <label for="">車種</label>
            <select name="" id="" v-model="vehicleType">
                <option value="機車">機車</option>
                <option value="小客車">小客車</option>
                <option value="大客車">大客車</option>
            </select>
        </div>
        <div class="SearchCarPlateconfirm">
            <button @click="cancel">取消</button>
            <button @click="admission()">確認</button>
        </div>

    </div>
    <div class="carPay" v-show="this.page == 1">
        <!-- <h1>繳費金額</h1>
        <h3>{{ 100 }}</h3>
        <div class="SearchCarPlateconfirm">
            <button @click="change()">取消</button>
            <button @click="money()">確認繳費</button>
        </div> -->
        <h1>Welcome to AIR TIME~</h1>
    </div>
</template>

<style lang="scss" scoped>
.SearchCarPlatePicture {
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(35, 139, 224);
}

.SearchCarPlateTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(238, 255, 0);
}

.CarPlate {
    height: 30%;
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: rgb(12, 12, 12);
}

.SearchCarPlateconfirm {
    width: 50vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.carPay {
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(35, 139, 224);
}
</style>