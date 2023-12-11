<script >
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'

import HomeHeaderView from '../views/HomeHeaderView.vue'


export default{
	data(){
			return{
				imageFile: null, // 用于保存选择的文件对象
				imgSrc:null,
				testImg:null,


				
			}
	},
	methods:{
		count(){
		console.log("你好")
		},

		//測試上傳照片到後端-成功
		handleFileChange(event) {
			// 获取选择的文件
			const file = event.target.files[0];
			this.imageFile = file; // 保存文件对象到组件数据中
			console.log(this.imageFile)
			console.log(typeof this.imageFile)
    	},
		//測試上傳照片到後端-成功
		uploadImage() {
			const fileInput = document.querySelector('input[type="file"]');
				const file = fileInput.files[0];

				const formData = new FormData();
				formData.append('file', file);

				fetch('http://localhost:8080/api/quiz/savePhoto1', {
					method: 'POST',
					body: formData
				})
				.then(response => {
					if (response.ok) {
					console.log('图片上传成功');
					console.log(formData)
					console.log(typeof formData)
					// 可以执行其他操作，比如刷新页面或更新数据等
					} else {
					console.error('图片上传失败');
					}
				})
				.catch(error => {
					console.error('发生错误:', error);
				});
    	},
		//測試上傳照片到後端-成功
		getImage() {
			const url = 'http://localhost:8080/api/quiz/getPhotoById';
            // 要帶入的值
            const queryParams = new URLSearchParams({
                photoId:30
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
            .then(response => response.blob()) // 将数据转换为 Blob 对象
			.then(blob => {
			const url = URL.createObjectURL(blob); // 创建 URL 对象

			// 将创建的 URL 对象赋值给组件的 imgSrc 变量，以便在页面中显示图片
			this.imgSrc = url;
			})
			.catch(error => {
			console.error('获取图片失败', error);
			});
		},

		//測試設施到後端-成功
		addfacility(){
			var url = "http://localhost:8080/api/quiz/create";
            var data = {
				"facility":{
					"name":"測試新增111",
					"description":"測試新增",
					"place":"火山島",
					"published":true,
					"photo":null,
					"age":18
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
            .then((response) => console.log("Success:", response));
		},






		test(event){
			this.testImg = event.target.files[0];
		},
		test2(){
			// const testData = new FormData();
			// testData.append('image', this.testImg,this.testImg.name);
			// axios.post('http://localhost:8080/api/quiz/savePhoto1',testData)
			// .then(res=>{
			// 	console.log(res)
			// })
				const dataToSend = {
					imageData: this.testImg // 将字节数组作为imageData参数发送到后端
				};
				axios.post('http://localhost:8080/api/quiz/savePhoto', dataToSend)
				.then(response => {
					// 请求成功处理逻辑
					console.log('Response:', response.data);
				})
				.catch(error => {
					// 错误处理逻辑
					console.error('Error:', error);
				});
		},
		selfTest(){
			var url = "http://localhost:8080/api/quiz/savePhoto";
            var data = {
                "imageData":this.base64Image
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
            .then((response) => console.log("Success:", response));
		}
		






	},
	mounted(){
		
	},
	components:{
    	HomeHeaderView
	}
}
</script>

<template>
	<HomeHeaderView  class="HomeHeaderViewClass" />
<h1>sss</h1>
<img src="../../picture/logo/logo.png" alt="">


<div class="container">
    <form method="post" action="~/login/verify">
        <label>Account</label>
        <br />
        <input type="text" name="account" />
        <br /><br />
        <label>Password</label>
        <br />
        <input type="text" name="password" />
        <br /><br />
        <input type="submit" name="submit" value="Login" class="btn btn-primary" />
    </form>
</div>



<div>
    <input type="file" @change="handleFileChange">
    <button @click="uploadImage">上传图片</button>
</div>





<div>
   <img style="width: 30vw;" :src="this.imgSrc" alt="Fetched Image" v-if="this.imgSrc" />
    <button @click="getImage">获取图片</button>
  </div>


  <button @click="addfacility">測試新增資料到後端</button>
</template>

<style lang="scss" scoped>
//頁面 Header
.HomeHeaderViewClass{
  position: fixed;
  z-index: 99;
}


img{
  width: 100px;
}

</style>