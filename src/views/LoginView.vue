<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'
//彈跳視窗
import Swal from 'sweetalert2'

export default{
	data(){
			return{
				//玩家跟管理者頁面互換
				loginChangeNum:1,

				//管理員登入的帳號密碼
				adminAccount:"",
				adminPassword:"",

				//管理員登入的結果
				loginResult:{},

				//玩家登入結果
				playerLoginResult:{},

				//qrcode登入的
				qrcodeNum:"",

				
			}
	},
	methods:{
		//新增失敗提示窗-帳號密碼有錯誤
		showLoginFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "帳號密碼錯誤",
                footer: ''
            });
        },
		//新增失敗提示窗-遊玩日還未到
		showDateFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "遊玩日還錯誤",
                footer: ''
            });
        },
		//新增失敗提示窗-帳號密碼有空
		showLoginFailEmpty(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "帳號密碼有空",
                footer: ''
            });
        },
		//新增失敗提示窗-玩家登入失敗通知
		showPlayerLoginFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "查無此票卷",
                footer: ''
            });
        },
		//新增失敗提示窗-玩家登入票卷為空
		showPlayerLoginEmpty(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "不能輸入空票卷",
                footer: ''
            });
        },
		//玩家跟使用者小頁面切換
		goAdminLogin(){
			this.loginChangeNum=1
		},
		goplayerLogin(){
			this.loginChangeNum=2
		},
		//前往買票連結
		goBuyTicket(){
			this.$router.push("/about")
		},


		//使用者登入
		adminLogin(){
			//判斷是否為空
			if(this.adminAccount==""||this.adminPassword==""){
				this.showLoginFailEmpty()
				return
			}


			var url = "http://localhost:8080/api/addminUser/login";
            var data = {
				"account":this.adminAccount,
				"password":this.adminPassword
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
				// console.log(response)   
				this.loginResult=response
				return this.checkLoginSucess()
				// console.log(this.loginResult)   
            });
		},
		//登入是否成功
		checkLoginSucess(){
			if(this.loginResult.rtncode=="SUCCESSFUL"){
				this.$router.push({ path: '/BackView', query: { data: JSON.stringify({ key:this.loginResult }) } });
				return
			}
			//假如失敗的話就跳警告視窗
			this.showLoginFail()
		},
		//可以看到隱藏的密碼
		seePwd(){
			var passwordField = document.getElementById("passwordInput");
    
			if (passwordField.type === "password") {
				passwordField.type = "text";
			} else {
				passwordField.type = "password";
			}
		},
		//玩家登入
		playerLogin(){
			if(this.qrcodeNum==""){
				this.showPlayerLoginEmpty()
				return
			}


			const url = 'http://localhost:8080/api/player/playerLogin';
                // 要帶入的值

                const queryParams = new URLSearchParams({
                    uuid:this.qrcodeNum

                });
                
                // 將查詢字串附加到 URL
                const urlWithParams = `${url}?${queryParams}`;

                fetch(urlWithParams, {
                method: "POST", 
                headers: new Headers({
                    "Accept":"application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }),
                })
                .then(response => {
                // 將API回應轉換為JSON格式
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                    console.log(data)
					this.playerLoginResult=data
					return this.checkPlayerLoginSucess()
                })
		},
		checkPlayerLoginSucess(){
			if(this.playerLoginResult.rtncode=="SUCCESSFUL"){ 
				sessionStorage.setItem('qrcode', this.playerLoginResult.player.uuid);
				sessionStorage.setItem('age', this.playerLoginResult.player.age);
				sessionStorage.setItem('nickname', this.playerLoginResult.player.nickname);
				this.$router.push({ path: '/PlayerOrder', query: { data: JSON.stringify({ key:this.playerLoginResult }) } });
				return
			}

			if(this.playerLoginResult.rtncode=="PLAYDATE_IS_NOT_ALREADY"){
				this.showDateFail()
				return
			}
			//假如失敗的話就跳警告視窗
			this.showPlayerLoginFail()
		}

	},
	mounted(){
		
	},
	components:{
    	HomeHeaderView,
		
	}
}
</script>

<template>
<HomeHeaderView  class="HomeHeaderViewClass" />
<div class="background">
	<div class="imgbg"></div>
	<!-- <div class="content">
		<i style="--i:11;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:21;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:12" class="fa-solid fa-sun"></i>
		<i style="--i:17;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:22" class="fa-solid fa-sun"></i>
		<i style="--i:33" class="fa-solid fa-sun"></i>
		<i style="--i:15" class="fa-solid fa-sun"></i>
		<i style="--i:12;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:11" class="fa-solid fa-sun"></i>
		<i style="--i:2;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:8" class="fa-solid fa-sun"></i>
		<i style="--i:11" class="fa-solid fa-sun"></i>
		<i style="--i:20;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:14" class="fa-solid fa-sun"></i>
		<i style="--i:16" class="fa-solid fa-sun"></i>
		<i style="--i:17" class="fa-solid fa-sun"></i>
		<i style="--i:14;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:11" class="fa-solid fa-sun"></i>
		<i style="--i:23" class="fa-solid fa-sun"></i>
		<i style="--i:11;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:17" class="fa-solid fa-sun"></i>
		<i style="--i:29" class="fa-solid fa-sun"></i>
		<i style="--i:24" class="fa-solid fa-sun"></i>
		<i style="--i:22;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:11" class="fa-solid fa-sun"></i>
		<i style="--i:26;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:11;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:20" class="fa-solid fa-sun"></i>
		<i style="--i:15" class="fa-solid fa-sun"></i>
		<i style="--i:25" class="fa-solid fa-sun"></i>
		<i style="--i:19;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:29" class="fa-solid fa-sun"></i>
		<i style="--i:15;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:25;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:19" class="fa-solid fa-sun"></i>
		<i style="--i:29;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:25" class="fa-solid fa-sun"></i>
		<i style="--i:19;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:29" class="fa-solid fa-sun"></i>
		<i style="--i:15;color: blue;" class="fa-solid fa-sun"></i>
		<i style="--i:25;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:19" class="fa-solid fa-sun"></i>
		<i style="--i:29;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:11;color: red;" class="fa-solid fa-sun"></i>
		<i style="--i:17" class="fa-solid fa-sun"></i>
		<i style="--i:29" class="fa-solid fa-sun"></i>

    </div> -->
	<div class="area">
			<h1>LOGIN</h1>
			<div style="width: 100%;display: flex;justify-content: center;" class="BtnuserOrAdminArea">
				<button @click="goAdminLogin" type="button">玩家登入</button>
				<button @click="goplayerLogin" type="button">管理員登入</button>
			</div>
			<!-- 玩家登入區 -->
			<div   v-show="loginChangeNum==1" class="player LoginPlace">
					<div class="inputBox">
				<input v-model="this.qrcodeNum" type="text" placeholder="Qrcode">
				<i class="fa-solid fa-qrcode"></i>
				</div>
				<button @click="playerLogin" type="button">login</button>
				<div class="register">
					<p>還未購票嗎?
						<span @click="goBuyTicket" style="font-weight: bold;">請前往購票</span>
					</p>
				</div>

			</div>
			<!-- 管理者登入區 -->
			<div   v-show="loginChangeNum==2"  class="admin LoginPlace">
					<div class="admininputBox">
						<input type="account" placeholder="account" v-model="this.adminAccount">
						<i class="fa-solid fa-square-envelope"></i>
					</div>
					<div class="admininputBox">
						<input id="passwordInput" type="password" placeholder="password" v-model="this.adminPassword">
						<i @click="seePwd" class="fa-solid fa-lock"></i>
					</div>
					<button @click="adminLogin" type="button">login</button>
			</div>

			
	</div>
</div>


</template>

<style lang="scss" scoped>
// //頁面 Header
.HomeHeaderViewClass{
  position: fixed;
  z-index: 99;
}

.background{
        width: 100vw;
        height: 100vh;
		overflow: hidden;
		.imgbg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 85vh;
			background-image: url("../../picture/backView/loginBG.jpg");
			background-size:cover;
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

		
		.area{
			position: absolute;
			top: 25%;
			width: 30vw;
			height: 60%;
			border: 2px solid black;
			border-radius: 10px;
			backdrop-filter: blur(4px);
			margin-left: 20vh;
			
			h1{
					text-align: center;
					margin: 5% 0;
					
			}
			button{
					border-radius: 30px;
					font-size: 14pt;
					background-color: transparent;
					box-shadow: 2px 2px 0px  black;
					transition: 0.5s;
					border: 2px solid black;
					margin: 0 2vw;
					&:hover{
							color: white;
							background-color: rgb(78, 116, 233);
					}
			}
			.LoginPlace{
				width: 80%;
				margin: 0 10%;
				min-height: 50%;
				// background-color: white;
				border-radius: 5px;

			}
			.player{
					h1{
					text-align: center;
					margin: 5% 0;
					}
					.inputBox{
							width: 100%;
							height: 40px;
							position: relative;
							display: flex;
							justify-content: center;
							margin-top: 25%;
							
							input{
									width:100% ; 
									font-size: 14pt;
									border-radius: 10px;   
									background-color: transparent; 
									padding: 0 10%;
									border: 1px solid black;
									box-shadow: 2px 2px 0px  black;
							}
							i{
									position: absolute;
									font-size: 16pt;
									top: 50%;
									right: 5%;
									transform:translateY(-50%)
							}
					}
					button{
							width: 50%;
							border-radius: 30px;
							margin: 0 25%;
							font-size: 14pt;
							background-color: transparent;
							box-shadow: 2px 2px 0px  black;
							transition: 0.5s;
							margin-top: 20%;
							&:hover{
									color: white;
									background-color:rgb(78, 116, 233);
							}
					}
					.register{
							width: 100%;
							height: auto;
							text-align: center;
							margin: 3% 0;
							a{
									text-decoration: none;
									color: black;
									font-weight: bold;
							}
					}  
		 	}

			.admin{
				h1{
					text-align: center;
					margin: 5% 0;
					}
					.admininputBox{
							width: 100%;
							height: 40px;
							position: relative;
							display: flex;
							justify-content: center;
							margin-top: 10%;
							
							input{
									width:100% ; 
									font-size: 14pt;
									border-radius: 10px;   
									background-color: transparent; 
									padding: 0 10%;
									border: 1px solid black;
									box-shadow: 2px 2px 0px  black;
							}
							i{
									position: absolute;
									font-size: 16pt;
									top: 50%;
									right: 5%;
									transform:translateY(-50%)
							}
					}
					button{
							width: 50%;
							border-radius: 30px;
							margin: 0 25%;
							font-size: 14pt;
							background-color: transparent;
							box-shadow: 2px 2px 0px  black;
							transition: 0.5s;
							margin-top: 10%;
							&:hover{
									color: white;
									background-color:rgb(78, 116, 233);
							}
					}
					.adminregister{
							width: 100%;
							height: auto;
							text-align: center;
							margin: 3% 0;
					}
			}

		}
}


</style>