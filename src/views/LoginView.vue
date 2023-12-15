<script >
import { RouterLink, RouterView } from 'vue-router'
import HomeHeaderView from '../views/HomeHeaderView.vue'

export default{
	data(){
			return{
				loginChangeNum:1
				
			}
	},
	methods:{
		goAdminLogin(){
			this.loginChangeNum=1
		},
		goplayerLogin(){
			this.loginChangeNum=2
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
				<div style="width: 100%;"  v-show="loginChangeNum==1" class="playerLoginPlace">
					<div class="inputBox">
				<input type="email" placeholder="email">
				<i class="fa-solid fa-square-envelope"></i>
				</div>
				<div class="inputBox">
					<input type="password" placeholder="password">
					<i class="fa-solid fa-lock"></i>
				</div>
				<div class="rember-foget">
					<label for=""><input type="checkbox" name="" id="">remenber me</label>
					<a href="">forget password</a>
				</div>
				<button type="button">login</button>
				<div class="register">
					<p>Don't have account?
						<a href="">register</a>
					</p>
				</div>

			</div>
			<div style="width: 100%;"  v-show="loginChangeNum==2"  class="adminLoginPlace">
				<h1>admin</h1>
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
        justify-content: center;
        align-items: center;
		background-image: url("../../picture/backView/loginBG.jpg");
		background-size: cover;
		
		.area{
			width: 30vw;
			height: 60%;
			border: 2px solid black;
			border-radius: 10px;
			backdrop-filter: blur(4px);
			h1{
					text-align: center;
					margin: 5% 0;
			}
			button{
					border-radius: 30px;
					font-size: 14pt;
					background-color: white;
					box-shadow: 2px 2px 0px  black;
					transition: 0.5s;
					border: 2px solid black;
					margin: 0 2vw;
					&:hover{
							color: white;
							background-color: rgb(78, 116, 233);
					}
			}
			.playerLoginPlace{

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
							margin: 5% 0;
							padding: 0 20%;  
							input{
									width:100% ; 
									font-size: 14pt;
									border-radius: 30px;   
									background-color: transparent; 
									padding: 0 10%;
							}
							i{
									position: absolute;
									font-size: 16pt;
									top: 50%;
									right: 22%;
									transform:translateY(-50%)
							}
					}
					.rember-foget{
							width: 100%;
							height: 40px;
							display: flex;
							justify-content: space-between;
							padding: 0 20%;
							a{
									text-decoration: none;
									color: black;
									font-weight: bold;
							}
					}
					button{
							width: 50%;
							border-radius: 30px;
							margin: 0 25%;
							font-size: 14pt;
							background-color: white;
							box-shadow: 2px 2px 0px  black;
							transition: 0.5s;
							&:hover{
									color: white;
									background-color: rgb(92, 92, 92);
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

		}
}


</style>