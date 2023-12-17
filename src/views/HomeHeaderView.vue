<script >
import { RouterLink, RouterView } from 'vue-router'

export default{
    data(){
            return{
            
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
        }
    },
}
</script>

<template>
    <div class="headerBody">
        <div class="headerBodyLeft">
            <img @click="goHome" src="../../picture/logo/logo2.jpg" alt="">
        </div>
        <div class="headerBodyRight">
            <button type="button">精選內容</button>
            <button type="button">最新消息</button>
            <button type="button">停車資訊</button>
            <button @click="goLogin()" type="button">購票登入</button>
            <button @click="goBuyTicket()" type="button">購票通道</button>
            <!-- <button @click="goBack()" type="button">暫時性後台通道</button> -->
            <i class="fa-solid fa-magnifying-glass"></i>
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
        justify-content: end;
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