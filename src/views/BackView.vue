<script >
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
//這是新增設施
import { reactive } from 'vue'
//這是左邊選擇欄
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'




export default{
    data(){
            return{
                changePageNum:0
            }
    },
    components:{
        RouterView,
    },
    methods:{
        //左邊導覽列開啟跟關閉
        handleOpen(key, keyPath) {
            console.log('Open:', key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log('Close:', key, keyPath);
        },
        //頁面跳轉框
        goaddFacility(){
            this.changePageNum=1
        },
        goBackHome(){
            this.changePageNum=0
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
    },
    mounted(){
    
    },
    setup() {
    // 使用 setup() 創建響應式對象
    const form = reactive({
        name: '',
        desc: '',
        region: '',
        age:'',
        date1: '',
        date2: '',
        published: false,
        type: [],
        resource: '',
        
    });

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
                        
                        
                        <el-sub-menu  index="1">
                            <template #title>
                                <el-icon><location /></el-icon>
                                <span>管理設施</span>
                            </template>
                                <el-menu-item @click="goaddFacility" style="cursor: pointer;" class="child" index="1-1">新增設施</el-menu-item>
                                <el-menu-item @click="" style="cursor: pointer;" class="child" index="1-2">刪除設施</el-menu-item>
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
                <!-- 新增選項 -->
                <div v-if="changePageNum==1"  class="addFacility">
                    <h1 style="color: rgb(47, 47, 47); margin-left: 5vw;">新增設施</h1>

                    <el-form class="formPlace" :model="form" label-width="120px">
                        <el-form-item label="設施名稱">
                            <el-input v-model="form.name" />
                        </el-form-item>

                        <el-form-item label="設施詳情">
                            <el-input v-model="form.desc" type="textarea" />
                        </el-form-item>

                        <el-form-item label="設施位置">
                            <el-select v-model="form.region" placeholder="請選擇島嶼">
                                <el-option label="慢活樂園島" value="慢活樂園島" />
                                <el-option label="溫馨親子島" value="溫馨親子島" />
                                <el-option label="驚險火山島" value="驚險火山島" />
                                <el-option label="凍骨冰山島" value="凍骨冰山島" />
                                <el-option label="刺激飛天島" value="刺激飛天島" />
                                <el-option label="孤島" value="孤島" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="限制年齡">
                            <el-input v-model="form.age" />
                        </el-form-item>

                        <el-form-item label="開放時間">
                            <el-col :span="11">
                                <el-date-picker
                                v-model="form.date1"
                                type="date"
                                placeholder="Pick a date"
                                style="width: 100%"
                                />
                            </el-col>
                            <el-col :span="2" class="text-center">
                                <span class="text-gray-500">-</span>
                            </el-col>

                            <el-col :span="11">
                                <el-date-picker
                                v-model="form.date2"
                                placeholder="Pick a date"
                                style="width: 100%"
                                />
                            </el-col>
                        </el-form-item>

                        <el-form-item label="是否發布">
                        <el-switch v-model="form.published" />
                        </el-form-item>

                        <el-form-item label="選擇照片">
                            <div>
                                <input type="file" @change="handleFileChange">
                                <button @click="uploadImage">上传图片</button>
                            </div>
                        </el-form-item>
                        
                        <el-form-item>
                        <el-button type="primary" @click="onSubmit">Create</el-button>
                        <el-button>Cancel</el-button>
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

        
        .addFacility{
            position: relative;
            .formPlace{
                padding: 3% 5%;
            }
        }

    }
}


</style>
