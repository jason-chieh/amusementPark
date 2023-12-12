<script >
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import Swal from 'sweetalert2'

//這是新增設施
import { reactive } from 'vue'


//這是畫面loding
import { ElLoading } from 'element-plus'

//這是設施管理的統計框框
import { ChatLineRound } from '@element-plus/icons-vue'

//這是左邊選擇欄
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '../../node_modules/@element-plus/icons-vue'




export default{
    data(){
            return{
                //頁面轉換
                changePageNum:0,

                //綁定新增表單的變數
                name: '',
                desc: '',
                region: '',
                age:0,
                date1: '',
                date2: '',
                published: false,
                photoS: "",

            


                //這是測試用去後端拿照片------------測試用
                imgSrc:null,

            }
    },
    components:{
        RouterView,
        Location,       //這是左邊欄位的小icon
        Setting,        //這是左邊欄位的小icon
        Document,       //這是左邊欄位的小icon
        IconMenu,       //這是左邊欄位的小icon
        ChatLineRound   //這是管理設施統計的
    },
    methods:{
        //新增失敗提示窗
        showBlockFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "請確實填寫",
                footer: ''
            });
        },
        //新增成功提示窗
        showBlockSucess(){
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
            });
        },
        //畫面會黑屏loading
        openFullScreen2(){
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                loading.close()
            }, 2000)
            
        },
// ================================================================以上特效提示框
        //左邊導覽列開啟跟關閉
        handleOpen(key, keyPath) {
            console.log('Open:', key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log('Close:', key, keyPath);
        },
// ================================================================以上左邊選擇欄位暫停並且show金色後停留

        //頁面跳轉框
        goBackHome(){
            this.changePageNum=0
            this.openFullScreen2()
        },
        goManageFacility(){
            
            this.changePageNum=1
        },
        goAddFacility(){
            this.changePageNum=2
        },

// ================================================================以上頁面跳轉框

        //新增設施-選擇照片
		handleFileChange(event) {
			// 獲取文件資料
			const file = event.target.files[0];

            console.log(file)

            if (file) {
			const reader = new FileReader();

			reader.onload = (e) => {
				// 將讀取到的照片賦予值給預覽img的src
				this.$refs.preview.src = e.target.result;
				// 顯示預覽img
				this.$refs.preview.style.display = 'block';
                this.photoS =e.target.result
                // console.log(e.target.result)
                // console.log(typeof e.target.result)
			};
			// 讀取文件內容
			reader.readAsDataURL(file);
			}
            
    	},
        //新增設施-提交並傳送到後端
        onSubmit(){
            //確定有沒有填資料
            if(this.name==""||this.desc==""||this.region==""||this.age==""||this.date1==""||this.date2==""||this.photoS==""){
                this.showBlockFail();
                return
            }



            var url = "http://localhost:8080/api/park/create";
            var data = {
                "facility":{
                    "name":this.name,
                    "description":this.desc,
                    "place":this.region,
                    "published":this.published,
                    "photoS":this.photoS,
                    "photo":null,
                    "age":this.age,
                    "startDate":this.date1,
                    "endDate":this.date2
                }
            };

            console.log(data)

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

            //成功視窗並清空欄位
            this.showBlockSucess()
            this.name='';
            this.desc='';
            this.region='';
            this.age=0;
            this.date1='';
            this.date2='';
            this.published= false,
            this.photoS='';
            this.$refs.preview.src='';

        },
        handleChange(value){
            console.log(value)
        },
        // //測試上傳照片到後端-成功
		// getImage() {
		// 	const url = 'http://localhost:8080/api/park/get';
        //     // 要帶入的值
        //     const queryParams = new URLSearchParams({
        //         name:"天女散花"
        //     });

        //     // 將查詢字串附加到 URL
        //     const urlWithParams = `${url}?${queryParams}`;

        //     fetch(urlWithParams, {
        //     method: "GET", 
        //     headers: new Headers({
        //         "Accept":"application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin":"*"
        //     }),
        //     })
        //     .then(response => response.blob()) // 将数据转换为 Blob 对象
		// 	.then(blob => {
		// 	const url = URL.createObjectURL(blob); // 创建 URL 对象

		// 	// 将创建的 URL 对象赋值给组件的 imgSrc 变量，以便在页面中显示图片
		// 	this.imgSrc = url;
		// 	})
		// 	.catch(error => {
		// 	console.error('获取图片失败', error);
		// 	});

            
		// },
// ================================================================以上功能跟連接方法

    },
    mounted(){
    
    },
    setup() {
    // 新增表單-的使用 setup() 創建響應式對象
    const form = reactive({
        name: '',
        desc: '',
        region: '',
        age:null,
        date1: '',
        date2: '',
        published: false,
        photoS: null,
        
    });

    // 新增表單-這是年齡的
    const num = ref(1);


    // 返回数据和方法以在模板中使用
    return {
        form,
    };
    }
}
</script>

<template>
    <div class="bigBg">
            <!-- 左半邊 -->
            <div class="leftBg">
                <el-row class="tac">
                    <el-col  :span="12">
                        <!-- 外面大框 -->
                    <el-menu 
                            active-text-color="#ffd04b"
                            background-color="#545c64"
                            class="el-menu-vertical-demo"
                            default-active="2"
                            text-color="#fff"
                            @open="handleOpen"
                            @close="handleClose"
                            
                            >
                            <!-- 後臺標語title -->
                            <span @click="goBackHome" style="cursor: pointer;" class="titleSpan">後臺管理頁面</span>    
                            
                            
                            <el-sub-menu  index="1" >
                                <template #title >
                                    <el-icon><Document /></el-icon>
                                    <span >管理設施</span>
                                </template>
                                    <el-menu-item @click="goManageFacility" style="cursor: pointer;" class="child" index="1-1">管理設施</el-menu-item>
                                    <el-menu-item @click="goAddFacility" style="cursor: pointer;" class="child" index="1-2">新增設施</el-menu-item>
                                    <el-menu-item @click="" style="cursor: pointer;" class="child" index="1-3">刪除設施</el-menu-item>
                            </el-sub-menu>


                            <el-menu-item index="2">
                                <el-icon><icon-menu /></el-icon>
                                <span>Navigator Two</span>    
                            </el-menu-item>



                        

                            <el-menu-item index="3">
                                <el-icon><setting /></el-icon>
                                <span>Navigator Four</span>
                            </el-menu-item>

                    </el-menu>
                    </el-col>
                </el-row>
            </div>


            <!-- 右半邊 -->
            <div class="rightBg">
                <img src="" alt="">

                <!-- 管理設施 -->
                <div v-if="changePageNum==1" class="manageFacility">
                    <div class="manageTop">
                        <h1>123</h1>
                    </div>

                    <div class="manageBot" >
                        <h1>123</h1>
                    </div>
                    
                </div>


                <!-- 新增選項 -->
                <div v-if="changePageNum==2"  class="addFacility">
                    <h1 style="color: rgb(255, 255, 255); margin-left: 7vw;">新增設施</h1>

                    <el-form class="formPlace" :model="form" label-width="120px">
                        <el-form-item label="設施名稱">
                            <el-input v-model="this.name" />
                        </el-form-item>

                        <el-form-item label="設施詳情">
                            <el-input v-model="this.desc" type="textarea" />
                        </el-form-item>

                        <el-form-item label="設施位置">
                            <el-select v-model="this.region" placeholder="請選擇島嶼">
                                <el-option label="慢活樂園島" value="慢活樂園島" />
                                <el-option label="溫馨親子島" value="溫馨親子島" />
                                <el-option label="驚險火山島" value="驚險火山島" />
                                <el-option label="凍骨冰山島" value="凍骨冰山島" />
                                <el-option label="刺激飛天島" value="刺激飛天島" />
                                <el-option label="孤島" value="孤島" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="限制年齡">
                            <el-input-number v-model="this.age" :min="1" :max="120" @change="handleChange" />
                        </el-form-item>

                        <el-form-item label="開放時間">
                            <el-col :span="11">
                                <input
                                v-model="this.date1"
                                type="date"
                                style="width: 100%"
                                >
                            </el-col>
                            <el-col :span="2" class="text-center">
                                <span class="text-gray-500">-</span>
                            </el-col>

                            <el-col :span="11">
                                <input
                                type="date"
                                v-model="this.date2"
                                style="width: 100%"
                                >
                            </el-col>
                        </el-form-item>

                        <el-form-item label="是否開放">
                        <el-switch v-model="this.published" />
                        </el-form-item>

                        <el-form-item label="選擇照片">
                            <div class="photoPlace">
                                <label for="file-upload" class="custom-file-upload">選擇照片</label>
                                <input  id="file-upload" type="file" @change="handleFileChange">
                                <img src="" ref="preview" style="display: none; max-width: 200px; max-height: 200px;">
                            </div>
                        </el-form-item>
                        
                        <el-form-item>
                        <el-button type="primary" @click="onSubmit">Create</el-button>
                        <el-button @click="">Cancel</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>

    </div>




</template>

<style lang="scss" scoped>
.bigBg{
    display: flex;
    //左半邊
    .leftBg{
        .titleSpan{
            color: white;
            padding: 2% 2%;
            margin-left: 2vw;
            font-size: 25pt;
        }
        .el-menu-vertical-demo{
            width: 20vw;
            height: 100vh;
        }
        .child{
            margin-left: 2vw;
        }
    }

    //右半邊
    .rightBg{
        position: relative;
        width: 80vw;
        &::before{
            content: "";
            position: absolute;
            /* 偏移值皆設為 0，讓僞元素跟父元素一樣大小 */
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: 0.5;
            background-image: url("../../picture/backView/pexels-lisa-fotios-6477673.jpg");
            background-repeat: no-repeat;
            background-size: cover;

        }
        //管理設施
        .manageFacility{
            position: relative;


        }
        //新增設施
        .addFacility{
            position: relative;
            .formPlace{
                padding: 3% 5%;
            }
            .photoPlace{
                display: flex;
                    /* 隐藏默认的文件选择按钮 */
                    input[type="file"] {
                        display: none;
                    }
                    /* 自定义文件选择按钮外观 */
                    .custom-file-upload {
                    height: 5vh;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    display: inline-block;
                    padding: 6px 12px;
                    cursor: pointer;
                    background-color: #2669fb;
                    color: #333;
                    }
                    /* 当文件选择按钮被激活（hover 或 focus 时），改变其外观 */
                    .custom-file-upload:hover,
                    .custom-file-upload:focus {
                    background-color: #ffffff;
                    }
            }

        }

    }
}


</style>
