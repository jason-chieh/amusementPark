<script>
import HomeHeaderView from '../views/HomeHeaderView.vue'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            parkingInfo: [],
            carnum: "",
            departureTime: "",
            nowTime: 0,
            parkingFee: 0,
            page: 0,
            msg: "浪漫遨遊~天空比鄰!!!",
            intervalId: null,
            isPay: false,


        }
    },
    methods: {
        //departure
        departure() {
            // 假設有以下 JSON 數據
            const departureData = {
                "license": this.carnum,
                "parkingFee": this.parkingFee

            };

            // 使用 Fetch API 發送 POST 請求
            fetch('http://localhost:8080/api/parkingLot/departure', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(departureData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // 在這裡處理 API 的響應
                    if (data.rtncode == "PAYMENT_SUCCESSFUL") {
                        Swal.fire({
                            title: 'successful!',
                            text: '付款成功!!',
                            confirmButtonText: '確認'
                        })
                        this.isPay = true;
                        // this.$router.push('ParkingLotInfo')
                        return
                    } else if (data.rtncode == "IS_ALREADY_PAID") {
                        Swal.fire({
                            title: 'Fail!',
                            text: '已經付款!!',
                            confirmButtonText: '確認'
                        })
                        this.isPay = true;
                        // this.$router.push('ParkingLotInfo')
                    }
                })
                .catch(error => {
                    console.error('發生錯誤:', error);
                });
        },

        //停車費計算
        timeCalculation() {
            const originalDateTimeObj = new Date(this.parkingInfo.admissionTime);
            const dateTime1 = originalDateTimeObj;

            // 將日期時間字串轉換成 JavaScript 的 Date 物件
            const date1 = new Date(dateTime1);
            const date2 = new Date();
            // 計算時間差（毫秒數）
            const timeDifference = date2 - date1;
            // 將毫秒數轉換成小時數
            const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
            console.log("兩個日期時間之間的時間差（小時）：", hoursDifference);
            this.parkingFee = 10 * hoursDifference;

        },

        //當下時間for離場
        nowDateTime() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            let period = '上午'; // 預設為上午
            if (hours >= 12) {
                // 如果小時數大於等於12，表示下午
                period = '下午';
            }
            // 處理小時數為12小時制
            const formattedHours = hours % 12 || 12;

            this.nowTime = `${year}/${month}/${day} ${period}${formattedHours}:${minutes}`;
        },

        //進場時間格式轉換
        formatDatetime() {
            // 將ISO格式轉換為年月日時分格式
            const originalDateTimeObj = new Date(this.parkingInfo.admissionTime);
            this.departureTime = originalDateTimeObj.toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
            this.timeCalculation()
        },

        //下一步包含刪除資訊
        next() {
            if (this.isPay == false) {
                Swal.fire({
                    title: 'Fail!',
                    text: '請先繳納停車費!!',
                    confirmButtonText: '確認'
                })
                return
            }
            console.log(this.carnum);
            fetch('http://localhost:8080/api/parkingLot/deleteParkingInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    license: this.carnum,
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        // 处理非成功的响应
                        throw new Error(`HTTP 错误！状态码: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // 根据需要处理来自服务器的响应
                    console.log(data);
                    this.page = 2;
                    // 你可以根据响应执行额外的操作
                })
                .catch(error => {
                    // 处理错误，例如网络问题或服务器错误
                    console.error('删除停车信息时发生错误:', error.message);
                });
        },

        //上一步
        front() {
            this.page = 0;
        },

        //搜尋
        search() {
            const license = this.carnum; // 从你的数据中获取license的值

            const url = new URL('http://localhost:8080/api/parkingLot/search');
            url.searchParams.append('license', license);

            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 添加其他必要的头部
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(responseData => {
                    this.parkingInfo = responseData.parkingLot;
                    console.log(this.parkingInfo);
                    if (responseData.rtncode == "SERACH_SUCCESSFUL") {
                        this.page = 1;
                        this.formatDatetime();
                        this.nowDateTime();
                        return
                    } else if (responseData.rtncode == "LICENSE_PLATE_NUMBER_NOT_FOUND") {
                        Swal.fire({
                            title: 'Fail!',
                            text: '無此車牌號碼!!',
                            confirmButtonText: '確認'
                        })
                    }
                })
                .catch(error => {
                    console.error('Error:', error);

                });
        },

        //取消
        cancel() {
            this.$router.push('ParkingLotInfo')
        },
    },

    components: {
        HomeHeaderView
    },

}
</script>
<template>
    <HomeHeaderView />
    <div v-if="page == 0">
        <div class="SearchCarPlatePicture">
            <div class="CarPlate">
                <!-- <div class="SearchCarPlateTitle">
                        <h1>{{msg}}</h1>
                    </div> -->
                <h1 style="color: black; margin-bottom: 3vh;">車輛離場</h1>
                <div class="carNuminputArea">
                    <h2>請輸入車牌號碼 : </h2>
                    <input type="text" v-model="carnum" placeholder="範例: ABX1234 " maxlength="7"
                        oninput="value=value.replace(/[^A-Z\d]/g,'')" />
                </div>
                <div class="SearchCarPlateconfirm">
                    <button class="btn" @click="cancel">取消 <span></span><span></span><span></span><span></span></button>
                    <button class="btn" @click="search()">確認<span></span><span></span><span></span><span></span></button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="page == 1" class="page1">
        <div>
            <h1>入場時間 :{{ this.departureTime }}</h1>
            <h1>離場時間 :{{ this.nowTime }}</h1>
            <h1>停車費 : {{ this.parkingFee }}元</h1>
            <h1>請選擇付款方式:</h1>
            <div class="mainArea">
                <div class="payway" style="cursor: pointer;" @click="departure">
                    <i class="fa-solid fa-sack-dollar fa-2xl"></i>
                    <p>現金支付</p>
                </div>
                <div class="payway" style="cursor: pointer;" @click="departure">
                    <img src="../../public/parking/LINE-Pay.png">
                    <p>LinePay</p>
                </div>
                <div class="payway" style="cursor: pointer;" @click="departure">
                    <i class="fa-brands fa-cc-apple-pay fa-2xl"></i>
                    <p>ApplePay</p>
                </div>
                <div class="payway" style="cursor: pointer;" @click="departure">
                    <i class="fa-brands fa-cc-visa fa-2xl"></i>
                    <!-- <i class="fa-brands fa-cc-mastercard fa-2xl"></i>
                    <i class="fa-brands fa-cc-jcb fa-2xl"></i> -->
                    <p>信用卡</p>
                </div>
            </div>
            <div class="btnArea">
                <button class="btn" @click="front">取消 <span></span><span></span><span></span><span></span></button>
                <button class="btn" @click="next">確認 <span></span><span></span><span></span><span></span></button>
            </div>
        </div>
    </div>
    <div v-if="page == 2" class="page2">
        <div class="body">
            <h1>歡應再次蒞臨AIR TIME</h1>
            <button class="btn" @click="cancel">確認<span></span><span></span><span></span><span></span></button>
        </div>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>
<style lang="scss" scoped>
.body {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.btnArea {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    margin: 0 10px;
}

.carNuminputArea {
    display: flex;
}

button {
    font-size: 16pt;
    font-weight: bolder;
    margin: 20px;
}

h1 {
    color: black;
}

p {
    font-weight: bold;
    font-size: 16pt;
    color: white;
}

.mainArea {
    display: flex;
}

.payway {
    width: 150px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 10px;
    padding: 2%;
}

.page1 {
    height: 85vh;
    display: flex;
    justify-content: center;
    // background-color: rgb(35, 139, 224);
    background-image: url(../../picture/backView/下載.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.page2 {
    height: 85vh;
    // background-color: rgb(35, 139, 224);
    background-image: url(../../picture/backView/下載.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

}

td {
    font-size: 16pt;
    font-weight: bolder;
}

.fa-brands {
    font-size: 50px;
    margin: 25px 0 20px 0px;

}

.fa-solid {
    font-size: 50px;
    margin: 25px 0px 20px 0px;

}


img {
    width: 45px;
    display: block;
    /* 將圖片設置為區塊元素 */
    margin: 0 auto;
    /* 使用 margin:auto 將圖片水平置中 */

}

.SearchCarPlatePicture {
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    // background-color: rgb(35, 139, 224);
    background-image: url(../../picture/backView/下載.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
    justify-content: center;
    align-items: center;
}

.carPay {
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    // background-color: rgb(35, 139, 224);
    background-image: url(../../picture/parking/parking_background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
}</style>