<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'

//彈跳視窗
import Swal from 'sweetalert2'
//qrcode
import { QRious } from "https://cdn.jsdelivr.net/gh/sorcererinferior/qrious-es6@main/qrious.js"


export default{
	data(){
			return{
				//購票的資料變數
				nickname:"",
				email:"",
				age:"",
				playDate:"",


			}
	},
	methods:{
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
            <span style="--i:11"></span>
            <span style="--i:12"></span>
            <span style="--i:18"></span>
            <span style="--i:24"></span>
            <span style="--i:10"></span>
            <span style="--i:14"></span>
            <span style="--i:23"></span>
            <span style="--i:18"></span>
            <span style="--i:16"></span>
            <span style="--i:19"></span>
            <span style="--i:12"></span>
            <span style="--i:22"></span>
            <span style="--i:25"></span>
            <span style="--i:18"></span>
            <span style="--i:21"></span>
            <span style="--i:13"></span>
            <span style="--i:15"></span>
            <span style="--i:11"></span>
            <span style="--i:12"></span>
            <span style="--i:18"></span>
            <span style="--i:24"></span>
            <span style="--i:10"></span>
            <span style="--i:14"></span>
            <span style="--i:22"></span>
            <span style="--i:18"></span>
            <span style="--i:16"></span>
            <span style="--i:19"></span>
            <span style="--i:12"></span>
            <span style="--i:22"></span>
            <span style="--i:25"></span>
            <span style="--i:18"></span>
            <span style="--i:21"></span>
            <span style="--i:13"></span>
            <span style="--i:15"></span>
            <span style="--i:14"></span>
            <span style="--i:21"></span>
            <span style="--i:13"></span>
            <span style="--i:17"></span>
            <span style="--i:11"></span>
            <span style="--i:12"></span>
            <span style="--i:18"></span>
            <span style="--i:18"></span>
            <span style="--i:21"></span>
            <span style="--i:11"></span>
            <span style="--i:15"></span>
            <span style="--i:11"></span>
            <span style="--i:19"></span>
            <span style="--i:12"></span>
    </div>
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
			<button @click="buyTicket()" type="button" class="btn btn-primary">購買</button>
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
		background-image: url("../../picture/backView/pexels-david-geib-3220852.jpg");
		margin-top: 15vh;
	}
	.content{
		display: flex;
		span{
			width: 50px;
			height: 50px;
			background: #4fc3dc;
			box-shadow: 0 0 0 10px #4fc3dc44,
			0 0 80px #4fc3dc,
			-250px 0 #4fc3dc99,
			300px 0 #ff2d7599;
			border-radius: 50%;
			animation: animate ease infinite;
			animation-duration: calc(100s/var(--i));

			&:nth-child(even){
				background: #ff2d75;
				box-shadow: 0 0 0 10px #ff2d7544,
				0 0 100px #ff2d75,
				-250px 0 #4fc3dc99,
				400px 0 #4fc3fc99;
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
		.btn{
			margin-top: 5vh;
			// margin-left: 10vw;
		}
	}

}



</style>