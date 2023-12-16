<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'
import Swal from 'sweetalert2'

export default{
	data(){
			return{
				loginChangeNum:1,

				//管理員登入的帳號密碼
				adminAccount:"",
				adminPassword:"",

				//登入的結果
				loginResult:{},
				
			}
	},
	methods:{
		//新增失敗提示窗
		showLoginFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "請帳號密碼錯誤",
                footer: ''
            });
        },
		goAdminLogin(){
			this.loginChangeNum=1
		},
		goplayerLogin(){
			this.loginChangeNum=2
		},

		//使用者登入
		adminLogin(){
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
	<div class="area">
			<h1>LOGIN</h1>
			<div style="width: 100%;display: flex;justify-content: center;" class="BtnuserOrAdminArea">
				<button @click="goAdminLogin" type="button">玩家登入</button>
				<button @click="goplayerLogin" type="button">管理員登入</button>
			</div>
			<!-- 玩家登入區 -->
			<div   v-show="loginChangeNum==1" class="player LoginPlace">
					<div class="inputBox">
				<input type="text" placeholder="Qrcode">
				<i class="fa-solid fa-qrcode"></i>
				</div>
				<button type="button">login</button>
				<div class="register">
					<p>還未購票嗎?
						<a href="">請前往購票</a>
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
//頁面 Header
.HomeHeaderViewClass{
  position: fixed;
  z-index: 99;
}

.background{
        width: 100vw;
        height: 100vh;
        background-color: rgb(206, 202, 181);
        margin: 0;
        display: flex;
        justify-content: baseline;
        align-items: center;
		background-image: url("../../picture/backView/loginBG.jpg");
		background-size: cover;
		
		.area{
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