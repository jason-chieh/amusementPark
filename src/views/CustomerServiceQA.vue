<script>
import HomeHeaderView from '../views/HomeHeaderView.vue'
export default {
    data() {
        return {
            context: "introduction", //PageControl
            allFacility: [], //所有設施
        }
    },
    components: {
        HomeHeaderView,
    },
    methods: {
        //顯示控制
        goIntroduction() {
            this.context = "introduction"
        },
        //前往設施相關
        goFacility() {
            this.context = "facility"
            this.searchAllFacility();
        },
        //前往門票資訊相關
        goticketInformation() {
            this.context = "ticketInformation"
        },
        //前往聯絡我們
        goContactUs() {
            this.context = "contactUs"
        },
    }
}

</script>

<template>
    <HomeHeaderView />
    <div class="CustomerServiceBody">

        <div class="btnArea">
            <button class="btn" @click="goIntroduction()">客服相關</button>
            <button class="btn" @click="goFacility()">設施相關</button>
            <button class="btn" @click="goticketInformation()">門票資訊相關</button>
            <button class="btn" @click="goContactUs()">聯繫我們</button>
        </div>

        <div class="infoArea">
            <div v-if="this.context == 'introduction'" class="context">
                <h1>客戶服務相關</h1>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <p>請問 AIR TIME 營業時間?</p>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>AIR TIME 營業時間為 8:30 ~ 21:00</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <p>園區有提供幼兒、長者，或行動不便者之載具嗎 ?</p>
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>本樂園提供幼兒、長者，或行動不便者之載具，如有相關需求，歡迎至遊客服務中心辦理租借。</p>
                                <br />
                                <tr>
                                    <td>1.</td>
                                    <td>嬰兒車：租金為$100元(車歸還不退費)，押金為$500元(車歸還，退費500元)。</td>
                                </tr>
                                <br />
                                <tr>
                                    <td>2.</td>
                                    <td> 輪椅：押金為$500元(車歸還，退費500元)。</td>
                                </tr>

                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                園區有提供寵物寄放服務嗎?
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>服務中心設有寵物之家，提供寵物寄放需求。入園前請至遊客服務中心辦理付費託管(NT$100元/隻)，需提供有照證件。</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFour">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                <p>園區有提供行利寄放或置物櫃服務嗎?</p>
                            </button>
                        </h2>
                        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>AIRTIME 樂園提供大型行李寄放服務，每件收費$50元，於當日營業時間內寄放。</p>
                                <p>園區另有投幣式寄物櫃規格及收費標準如下：</p>
                                <p>1. 深42公分*寬26公分*高53公分(每次30元、不限時間)</p>
                                <p>2. 深42公分*寬42公分*高53公分(每次30元、不限時間)</p>
                                <p>3. 深42公分*寬30公分*高30公分(每次20元、不限時間)</p>
                                <p>置物櫃設置位置：Starbucks®AirTime臻選烘焙工坊旁、FriBay美式餐廳旁、台味小館旁。</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingFive">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                園區有提供飲水機嗎?
                            </button>
                        </h2>
                        <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>園區無設置開放式飲水機！考量個人飲水安全衛生，可自備或自購瓶裝水，或自備容器到各餐廳索取冷、溫水；園區無提供熱水泡麵服務。</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingSix">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                園區可使用信用卡嗎?
                            </button>
                        </h2>
                        <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>本園售票處、各餐廳及商店，接受VISA、MASTER、JCB及聯合信用卡消費。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="this.context == 'facility'" class="context">
                <h1>設施相關</h1>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <p>若遇下雨，設施會開放嗎?</p>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>如遇到下雨天，AIR TIME仍正常營業，若持續打雷則視情況暫停設施運作</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="this.context == 'ticketInformation'" class="context">
                <h1>門票資訊相關</h1>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <p>一張門票就可以遊玩所有島嶼的設施嗎?</p>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>是的，一張票卷即可暢玩所有島嶼的設施</p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <p>門票有使用期限嗎?</p>
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <p>門票並無使用期限喔!，只要憑QRCODE即可。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="this.context == 'contactUs'" class="context">
                <div id="form">
                    <iframe width="60%" height="480px" src="https://www.surveycake.com/s/ekVmX"
                        style="border:#ddd 1px solid;margin-top: 3vh;" allowTransparency="true" frameborder="0"></iframe>

                    <!-- 因為目前為http協議開發環境中不是正式的網路環境https所以會報錯誤，不過功能是正常的 -->
                        <!-- <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLScnd3-75_alqaHrLVqMgXB5N2VR0iHSpWLFnSXs6oMGj9TcnA/viewform?embedded=true"
                            width="640" height="970" frameborder="0" marginheight="0" marginwidth="0">載入中…</iframe> -->
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.CustomerServiceBody {
    width: 100vw;
    height: 90vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;

    h1 {
        margin-top: 3vh;
        margin-bottom: 3vh;
    }

    .btnArea {
        width: 96vw;
        margin-top: 5vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        background-color: whitesmoke;
    }

    .btn {
        font-size: 16pt;
        height: 10vh;
        width: 20vw;
        margin: 1% 0;
        background-color: #0779E4;
        color: whitesmoke;
        font-weight: bolder;
    }

    .infoArea {
        width: 90vw;
        height: 100%;
        background-color: whitesmoke;
    }

    #form {
        display: flex;
        justify-content: center;
    }

    p {
        margin: 0%;
    }

    .context {
        width: 100%;
    }
}
</style>
