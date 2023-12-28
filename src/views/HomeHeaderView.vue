<script >
import { RouterLink, RouterView } from 'vue-router'

export default{
    data(){
            return{
                loginInfo:{},
                checkLogin:false
            }
    },
    methods:{
        goBack(){
            this.$router.push("/BackView")
        },
        goHome(){
            this.$router.push("/")
        },
        goBuyTicket(){
            this.$router.push("/about")
        },
        goLogin(){
            this.$router.push("/LoginView")
        },
        parking() {
            this.$router.push("/ParkingLotInfo")
        },
        QA() {
            this.$router.push("/CustomerServiceQA")
        },
    },
    mounted(){

    //確定登入人資料是否有資料
    if(!(JSON.parse(this.$route.query.data==undefined))){
         //將登入頁傳來的個人資料轉成json可讀取
        const data = JSON.parse(this.$route.query.data);
         // 輸出 'value' 拿取裡面的key
        this.loginInfo = data.key; 
        console.log(this.loginInfo)
        return
    }




        // this.goHome()
    },
    props: {

    }
}
</script>

<template>
    <div class="headerBody">
        <div class="headerBodyLeft">
            <img @click="goHome" src="../../picture/logo/logo2.jpg" alt="">
        </div>
        <div class="headerBodyRight">
            <!-- <button type="button">精選內容</button>
            <button type="button">最新消息</button> -->
            <i class="fa-regular fa-credit-card"><button @click="goBuyTicket()" type="button"> 線上購票</button></i>            
            <i class="fa-solid fa-right-to-bracket"><button @click="goLogin()" type="button"> 購票登入</button></i>            
            <i class="fa-solid fa-square-parking"><button @click="parking()" type="button"> 停車資訊</button></i>
            <i class="fa-regular fa-circle-question"><button @click="QA()" type="button"> 常見問題</button></i>    
            <!-- <i class="fa-solid fa-road-barrier"><button @click="goBack()" type="button">臨時後台入口</button></i>      -->
            <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
        </div>
        
    </div>
    
</template>

<style lang="scss" scoped>
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
        // justify-content: end;
        justify-content: space-around;
        align-items: center;
        button{
            color: white;
            border: 0;
            max-width: 100px;
            background-color: #0779E4;
            font-weight: bold;
            font-size: 16pt;
        }
        i{
            color: white;
            font-weight: bold;
            font-size: 16pt;
            margin: 0 1vw;
        }
    }
}

</style>