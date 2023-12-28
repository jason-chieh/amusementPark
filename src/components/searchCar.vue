<script>
import HomeHeaderView from '../views/HomeHeaderView.vue'
export default {
    data() {
        return {
            license: "",
            parkingInfo: [],
        }
    },

    methods: {
        //轉換時間單位
        formatDate(dateTime) {
            const formattedDate = new Date(dateTime).toLocaleString('zh-TW', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });
            return formattedDate;
        },

        search() {
            // 假设有以下 JSON 数据
            const departureData = {
                "license": this.license,
                // "license": "NLU3346",
            };
            // 使用 Fetch API 发送 GET 请求
            // 将参数附加到 URL 的查询字符串中
            const queryString = new URLSearchParams(departureData).toString();
            fetch(`http://localhost:8080/api/parkingLot/searchAll?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.parkingInfo = data;
                    this.license = "";
                })
                .catch(error => {
                    console.error('发生错误:', error);
                });
        }
    },

    components: {
        HomeHeaderView
    },

    mounted() {
        this.search();
    }
}
</script>
<template>
    <HomeHeaderView />
    <div class="body">

        <div class="mainArea">

            <h1 style="margin-top: 3vh;">查詢車輛</h1>
            <input type="text" v-model="this.license">
            <button @click="search" style="margin-left: 2vw;">搜尋</button>

            <table>
                <tr>
                    <th>車牌號碼</th>
                    <th>車輛種類</th>
                    <th>入場時間</th>
                    <th>狀態</th>
                </tr>

                <!-- for Infolist -->
                <tr v-for=" info in this.parkingInfo.parkingInfoList" v-if="this.parkingInfo.parkingInfoList != null">
                    <td>{{ info.license }}</td>
                    <td>{{ info.vehicleType }}</td>
                    <td>{{ formatDate(info.admissionTime) }}</td>
                    <td v-if="info.departureTime == null"> 尚未離場</td>
                    <td v-else>{{ formatDate(info.departureTime) }}</td>
                </tr>

                <!-- for singleInfo -->
                <tr v-else-if="this.parkingInfo.parkingLot != null">
                    <td>{{ this.parkingInfo.parkingLot.license }}</td>
                    <td>{{ this.parkingInfo.parkingLot.vehicleType }}</td>
                    <td>{{ formatDate(this.parkingInfo.parkingLot.admissionTime) }}</td>
                    <td v-if="this.parkingInfo.parkingLot.departureTime == null"> 尚未離場</td>
                    <td v-else>{{ formatDate(this.parkingInfo.parkingLot.departureTime) }}</td>
                </tr>

            </table>

        </div>

    </div>

</template>
<style lang="scss" scoped>
.body {
    width: 100vw;
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgb(35, 139, 224);
    background-image: url(../../picture/backView/下載.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.mainArea {
    width: 90%;
    height: 100%;
    // margin-top: 1%;
}

table {
    width: 100%;
    // background-color: whitesmoke;
    margin-top: 2%;
}

td {
    width: 20%;
    text-align: center;
    font-size: 16pt;
    font-weight: bold;
    border: 1px black solid;
}

th {
    width: 25%;
    text-align: center;
    font-size: 16pt;
    font-weight: bold;
    border: 1px black solid;
    background-color: white;
    // color: white;
    // background-color: rgb(35, 139, 224);
    // background-image: url(../../picture/parking/parking_background.png);
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-position: center;
}

tr {
    border: 1px black solid;
}


</style>