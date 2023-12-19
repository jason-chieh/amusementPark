<script>
import HomeHeaderView from '../views/HomeHeaderView.vue'
export default{
    data(){
        return{
            carnum:"",
            nowTime: 0,
            page: 1,
            msg: "浪漫遨遊~天空比鄰!!!",
            intervalId: null,

        }
    },
    methods:{
        //下一步
        next(){
            this.page = 2;
        },

        //上一步
        front(){
            this.page = 0;
        },

        //搜尋
        search() {
        const license = this.carnum; // 从你的数据中获取license的值

        // 构建带有查询参数的 URL
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
            console.log(responseData);
            if(responseData.rtncode == "SERACH_SUCCESSFUL"){
                this.page = 1;
                return
            }
           alert(responseData.rtncode)
        })
        .catch(error => {
            console.error('Error:', error);
            // 处理错误
        });
    },

        //取消
        cancel(){
            this.$router.push('ParkingLotInfo')
        },
    },

    components: {
        HomeHeaderView
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
}
</script>
<template>
    <HomeHeaderView />
    <div v-if="page == 0">
        <div class="SearchCarPlatePicture">
        <div class="SearchCarPlateTitle">
                <h1>{{msg}}</h1>
            </div>
            <div class="CarPlate">
                <h3>請輸入車牌號碼</h3>
                <h5>範例:(ABX1234)</h5>
                <input type="text" v-model="carnum" maxlength="7" oninput="value=value.replace(/[^A-Z\d]/g,'')" />
            </div>
            <div class="SearchCarPlateconfirm">
                <button @click="cancel">取消</button>
                <button @click="search()">確認</button>
            </div>
        </div>
    </div>
    <div v-if="page == 1" class="page1">
        <div >
            <h1>停車費:100元</h1>
            <h1>請選擇付款方式:</h1>
            <div class="mainArea">
                <div class="payway">
                    <i class="fa-solid fa-sack-dollar fa-2xl" style="cursor: pointer;"></i>
                    <p>現金支付</p>
                </div>
                <div class="payway" style="cursor: pointer;" >
                    <img src="../../public/parking/LINE-Pay.png">
                    <p >LinePay</p>
                </div>
                <div class="payway" style="cursor: pointer;">
                    <i class="fa-brands fa-cc-apple-pay fa-2xl"></i>
                    <p>ApplePay</p>
                </div>
                <div class="payway" style="cursor: pointer;">
                    <i class="fa-brands fa-cc-visa fa-2xl"></i>
                    <!-- <i class="fa-brands fa-cc-mastercard fa-2xl"></i>
                    <i class="fa-brands fa-cc-jcb fa-2xl"></i> -->
                    <p>信用卡</p>
                </div>
            </div>
    
            <button @click="front">取消</button>
            <button @click="next">下一步</button>
        </div>
    </div>
    <div v-if="page == 2">
        <h1>付款成功!!歡應再次蒞臨AIR TIME</h1>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>
<style lang="scss" scoped>
h1{
    color: white;
}

p{
    font-weight: bold;
    font-size: 16pt;
    color: white;
}
.mainArea{
    display: flex;
}
.payway{
    width: 150px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 10px;
    padding: 2%;
}   

.page1{
    height: 85vh;
    display: flex;
    justify-content: center;
    background-color: rgb(35, 139, 224);

}

td{
    font-size: 16pt;
    font-weight: bolder;
}
.fa-brands{
    font-size : 50px ;
    margin: 25px 0 20px 0px;

}
.fa-solid{
    font-size : 50px ;
    margin: 25px 0px 20px 0px;

}


img{
    width: 45px;
    display: block; /* 將圖片設置為區塊元素 */
    margin: 0 auto; /* 使用 margin:auto 將圖片水平置中 */
    
}

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