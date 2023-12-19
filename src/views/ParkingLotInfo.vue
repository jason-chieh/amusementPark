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
            <button @click="admission">入場</button>
            <button @click="departure">繳費</button>
            <button>查詢</button>
        </div>
    </div>
</div>

</template>
<style lang="scss" scoped>

.btnArea{
    width: 100%;
    display: flex;
    justify-content: center;
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
    width: 15vw;
    border: 1px black solid;
    font-weight: bolder;
}

td{
    border: 1px black solid;
    font-size: 16pt;
    font-weight: bolder;
}
</style>