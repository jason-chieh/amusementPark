<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'

//彈跳視窗
import Swal from 'sweetalert2'

//qrcode
import { QRious } from "https://cdn.jsdelivr.net/gh/sorcererinferior/qrious-es6@main/qrious.js"

//這是畫面loding
import { ElLoading } from 'element-plus'


export default{
	data(){
			return{
				//購票的資料變數
				nickname:"",
				email:"",
				age:"",
				playDate:"",

				//購買人信箱跟遊玩日期
				loseEmail:"",
				losePlayDate:"",

				//查詢購買人資料
				playerInfo:{}
			}
	},
	methods:{
		//畫面會黑屏loading
		openFullScreen2(){
            const loading = ElLoading.service({
                lock: true,
                text: 'searching',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                loading.close()
            }, 3000)
            
    	},
		//新增失敗提示窗
		showBlockFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "查無資料",
                footer: ''
            });
        },
		//新增成功提示窗
		showBlockSucess(){
            Swal.fire({
            position: "center",
            icon: "success",
            title: "已經寄送資料去信箱",
            showConfirmButton: false,
            timer: 1500
            });
        },
		//讓人可以選擇的checkbox
		// async showDayCanChoose(){
		// 	const colorsArray = this.playerInfo.playerlist;
		// 	/* inputOptions can be an object or Promise */
		// 		const inputOptions = new Promise((resolve) => {
		// 		  // 模拟异步操作，在一秒后解析 Promise
		// 			setTimeout(() => {
		// 				const colorOptions = {};

		// 				colorsArray.forEach((color, index) => {
		// 				colorOptions[color] = `${color.playDate}`; // 根据数组索引设置颜色选项
		// 				});

		// 				resolve(colorOptions); // 解析 Promise 并返回颜色选项对象
		// 			}, 1000);
		// 		});
		// 		const { value: color } = await Swal.fire({
		// 		title: "Select color",
		// 		input: "radio",
		// 		inputOptions,
		// 		inputValidator: (value) => {
		// 			if (!value) {
		// 			return "You need to choose something!";
		// 			}
		// 		}
		// 		});
		// 		if (color) {
		// 		Swal.fire({ html: `You selected: ${color}` });
		// 		}
		// },
		// 請輸入購買帳號
		async getEmail() {
			try {
				const { value: email } = await Swal.fire({
				title: '輸入您的電子信箱',
				input: 'email',
				inputLabel: 'Your email address',
				inputPlaceholder: 'Enter your email address'
				});

				if (email) {
				Swal.fire(`Entered email: ${email}`);
					this.loseEmail = `${email}`
					this.getDate()
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
    	},	
		//請輸入遊玩日期
		async getDate(){
				const { value: date } = await Swal.fire({
				title: '選擇遊玩日期',
				input: 'date',
				inputValue: new Date().toISOString().split('T')[0],
				});


				if (date) {
					//將date資料取出
					this.losePlayDate = date

					this.openFullScreen2()

					//前往後端搜尋
					this.searchAndSentEmail()

					setTimeout(() => {
					Swal.fire({
						title: "核對資料",
						html: "信箱："+this.loseEmail+"<br>"+"日期:"+this.losePlayDate, 
						confirmButtonText: '確定',
						showCloseButton: true,
						}).then((result) => {
							if (result.isConfirmed) {
								if(this.playerInfo.rtncode=="PLAYER_NO_EXIST"){
									this.showBlockFail()
								}else{
									this.showBlockSucess()
								}

							} else if (result.dismiss === Swal.DismissReason.cancel) {

							}
					});
					}, 5000); // 在此設定延遲的毫秒數，這裡是延遲 3 秒 (3000 毫秒)
				}
			
		},
		//跟後端尋找購買人信箱跟遊玩日期
		searchAndSentEmail(){
			const url = 'http://localhost:8080/api/adminuser/forgetQrcode';
                // 要帶入的值

                const queryParams = new URLSearchParams({
					email:this.loseEmail,
					playdate:this.losePlayDate
                });

                // 將查詢字串附加到 URL
                const urlWithParams = `${url}?${queryParams}`;

                fetch(urlWithParams, {
                method: "GET", 
                headers: new Headers({
                    "Accept":"application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }),
                })
                .then(response => {
                // 將API回應轉換為JSON格式
                return  response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
					this.playerInfo = data
					console.log(this.playerInfo)
                })
		},
		//提視窗請你填購票資料
		showBuyFail(){
			Swal.fire({
				icon: "error",
				title: "個人資料必填!",
				text: "請放心個資會妥善保管",		
			});
		},
		//產生qrcode
		showQrcode(uuid){
			//建立qrcode照片
			const qr = new QRious(/* could define initial settings here*/); 
			qr.value = uuid;
			this.$refs.qrcodepreview.src = qr.toDataURL();
			console.log(qr.toDataURL());

			//清空前面輸入的資料
			this.nickname=""
			this.email=""
			this.age=""
			this.playDate=""

			Swal.fire({
			title: "您的入場QRCODE",
			text: "入園時將QRCODE掃描閘門",
			imageUrl: qr.toDataURL(),
			imageWidth: 300,
			imageHeight: 300,
			imageAlt: "Custom image",
			confirmButtonColor: "#d33",
			confirmButtonText:  "下載您的入場卷",
			showCancelButton: true,
			cancelButtonColor: "#3085d6",
			cancelButtonText: "返回",
			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire({
					title: "成功",
					// text: "",
					icon: "success"
					});
					this.downloadQRCode(qr.toDataURL())
				}
            });
		},
		//購買門票向後端請求
		buyTicket(){
			if(this.nickname==""||this.email==""||this.age==""||this.playDate==""){
				this.showBuyFail()
				return
			}

			var url = "http://localhost:8080/api/player/buyTicket";
            var data = {
				"player":{
					"uuid":"",
					"nickname":this.nickname,
					"email":this.email,
					"age":this.age,
					"playDate":this.playDate
				}
			};

            fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) =>{ 
                console.log("Success:", response,)
				console.log(response.uuid)  
				return this.showQrcode(response.uuid)
            });



		},
		//下載qrcode
		downloadQRCode(database64) {
			const base64ImageData = database64; // 这里放置您的 Base64 图片数据
			// console.log(base64ImageData)
			// const [, remainingText] = base64ImageData.split(',');
			// console.log(remainingText)

			// 创建一个临时链接
			const link = document.createElement('a');
			link.href = base64ImageData;
			link.download = 'qrcode.png'; // 下载的文件名

			// 触发点击事件来下载图像
			link.click();
		}
	},
	mounted(){
	},
	setup(){
		
	},
	components:{
    	HomeHeaderView
	}
}
</script>

<template>
	<HomeHeaderView  class="HomeHeaderViewClass" />
<div class="bg">
	<div class="imgbg"></div>
	<div class="content">
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:21" class="fa-solid fa-star"></i>
		<i style="--i:12" class="fa-solid fa-star"></i>
		<i style="--i:17" class="fa-solid fa-star"></i>
		<i style="--i:22" class="fa-solid fa-star"></i>
		<i style="--i:33" class="fa-solid fa-star"></i>
		<i style="--i:15" class="fa-solid fa-star"></i>
		<i style="--i:12" class="fa-solid fa-star"></i>
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:2" class="fa-solid fa-star"></i>
		<i style="--i:8" class="fa-solid fa-star"></i>
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:20" class="fa-solid fa-star"></i>
		<i style="--i:14" class="fa-solid fa-star"></i>
		<i style="--i:16" class="fa-solid fa-star"></i>
		<i style="--i:17" class="fa-solid fa-star"></i>
		<i style="--i:14" class="fa-solid fa-star"></i>
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:23" class="fa-solid fa-star"></i>
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:17" class="fa-solid fa-star"></i>
		<i style="--i:29" class="fa-solid fa-star"></i>
		<i style="--i:24" class="fa-solid fa-star"></i>
		<i style="--i:22" class="fa-solid fa-star"></i>
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:26" class="fa-solid fa-star"></i>
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:20" class="fa-solid fa-star"></i>
		<i style="--i:15" class="fa-solid fa-star"></i>
		<i style="--i:25" class="fa-solid fa-star"></i>
		<i style="--i:19" class="fa-solid fa-star"></i>
		<i style="--i:29" class="fa-solid fa-star"></i>
		<i style="--i:15" class="fa-solid fa-star"></i>
		<i style="--i:25" class="fa-solid fa-star"></i>
		<i style="--i:19" class="fa-solid fa-star"></i>
		<i style="--i:29" class="fa-solid fa-star"></i>
		<i style="--i:19" class="fa-solid fa-star"></i>
		<i style="--i:29" class="fa-solid fa-star"></i>
		<i style="--i:15" class="fa-solid fa-star"></i>
		<i style="--i:25" class="fa-solid fa-star"></i>
		<i style="--i:19" class="fa-solid fa-star"></i>
		<i style="--i:29" class="fa-solid fa-star"></i>
		<i style="--i:26" class="fa-solid fa-star"></i>
		<i style="--i:11" class="fa-solid fa-star"></i>
		<i style="--i:20" class="fa-solid fa-star"></i>
		<i style="--i:15" class="fa-solid fa-star"></i>
		<i style="--i:25" class="fa-solid fa-star"></i>
		<i style="--i:19" class="fa-solid fa-star"></i>

    </div>
	<!-- style="--i:11" -->
	<div class="buyTicketPlace">
		<h1 style="color:white;">購票</h1>
		<form>
			<div class="row mb-3">
				<label for="inputEmail3" class="col-sm-2 col-form-label">別名</label>
				<div class="col-sm-10">
					<input v-model="this.nickname" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
				</div>
			</div>
			<div class="row mb-3">
				<label for="inputPassword3" class="col-sm-2 col-form-label">信箱</label>
				<div class="col-sm-10">
					<input v-model="this.email"  type="text" class="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1">
				</div>
			</div>
			
			<div class="row mb-3">
				<label for="inputPassword3" class="col-sm-2 col-form-label">年紀</label>
				<div class="col-sm-2">
					<input v-model="this.age" type="text" class="form-control" placeholder="age" aria-label="Username" aria-describedby="basic-addon1">
				</div>
				<label for="inputPassword3" class="col-sm-2 col-form-label testFInal">日期</label>
				<div class="col-sm-5">
					<input v-model="this.playDate" type="date" class="form-control" placeholder="" aria-label="Username" aria-describedby="basic-addon1">
				</div>
			</div>
			<div class="buyBtnPlace">
				<button @click="buyTicket()" type="button" class="btn btn-primary">購買</button>
				<button @click="getEmail" type="button" class="btn btn-primary loseBtn">遺失票卷?</button>
			</div>
			<img id="qrcodeImg" src="" ref="qrcodepreview" style="display: none; max-width: 200px; max-height: 200px;">
		</form>
	</div>
</div>

</template>

<style lang="scss" scoped>
//頁面 Header
.HomeHeaderViewClass{
  position: fixed;
  z-index: 99;
}
.bg{
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	.imgbg{
		position: absolute;
		top: 0;
  		left: 0;
		width: 100vw;
  		height: 85vh;
		background-image: url("../../picture/backView/pexels-vlad-chețan-3387165.jpg");
		background-position: center;
		margin-top: 15vh;
	}
	.content{
		display: flex;
		i{
			// width: 50px;
			// height: 50px;
			background: transparent;
			font-size: 28pt;
			color: yellow;
			animation: animate ease infinite;
			animation-duration: calc(100s/var(--i));

			&:nth-child(even){
				background: transparent;
			}

			@keyframes animate {
				0%{
					transform: translateY(120vh) scale(0) rotate(0deg);
				}
				20%{
					transform: translateY(100vh) scale(1) rotate(0deg);
				}
				100%{
					transform: translateY(-50vh) scale(0.5) rotate(360deg);
				}

			}
		}
	}

	.buyTicketPlace{
		position: absolute;
		transform: translate(-50%,-50%);
		top: 60%;
		left: 65%;
		width: 40vw;
		height: 50vh;
		border-radius: 20px;
		backdrop-filter: blur(90px);
		color: white;
		padding-top: 3vh;
		padding-right: 10vw;
		padding-left: 2vw;
		.testFInal{
			margin-left: 2vw;
		}
		.buyBtnPlace{
			margin-top: 5vh;
			display: flex;
			justify-content: space-between;
			.loseBtn{
				background-color: rgb(246, 115, 115);
			}
		}
	}

}



</style>