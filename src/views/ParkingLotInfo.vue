<script>
import HomeHeaderView from '../views/HomeHeaderView.vue'
export default{
    data(){
        return{
            moto:0,
            car:0,
            bus:0,


        }
    },
    methods:{
        //查詢
        search(){
            this.$router.push('searchCar')
        },

        //離場
        departure(){
            this.$router.push('departure')
        },  
        //入場
        admission(){
            this.$router.push('admission')
        },
        //停車位
        generateRandomNumber() {
        return Math.floor(Math.random() * 201);
    }
    },
    components: {
        HomeHeaderView
    },

    created(){
        this.moto = this.generateRandomNumber();
        this.car = this.generateRandomNumber();
        this.bus = this.generateRandomNumber();
    }
}
</script>
<template>
    <HomeHeaderView />
<div class="body">
    <div>
        <h1>AIR TIME停車繳費系統</h1>
        <table>
            <tr>
                <th id="vehicleType"></th>
                <th>剩餘車位</th>
            </tr>
            <tr>
                <td>機車</td>
                <td >{{ this.moto }}</td>
            </tr>
            <tr>
                <td>小客車</td>
                <td>{{ this.car }}</td>
            </tr>
            <tr>
                <td>大客車</td>
                <td>{{ this.bus }}</td>
            </tr>
        
        </table>
        <div class="btnArea">
            <button  class ="btn" @click="admission">車輛入場<span></span><span></span><span></span><span></span></button>
            <button  class ="btn" @click="departure">車輛離場<span></span><span></span><span></span><span></span></button>
            <button  class ="btn" @click="search">停車紀錄<span></span><span></span><span></span><span></span></button>
        </div>
    </div>
</div>

</template>
<style lang="scss" scoped>
button{
    font-weight: bolder;
    font-size: 16pt;
    width: 100%;
    margin: 10px 0;
}

.btnArea{
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: center;
}
.body{
    height: 85vh;
    width: 99%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(35, 139, 224);
    
}

table{
    height: 100%;
    width: 100%;
    background-color: whitesmoke;
}

#vehicleType{
    width: 8vw;
}

th{
    font-size: 16pt;
    width: 15vw;
    border: 1px black solid;
    font-weight: bolder;
    background-color: rgb(35, 139, 224);
}

td{
    border: 1px black solid;
    font-size: 16pt;
    font-weight: bolder;
}

.btn {
    display: inline-block;
    position: relative;
    z-index: 1;
    min-width: 200px;
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
    color: black;
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