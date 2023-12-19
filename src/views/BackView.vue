<script >
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
//彈跳視窗
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
                date1: '',//startDate
                date2: '',//endDate
                published: false,
                photoS: "",

                //綁定新增使用者的變數
                account:"",
                pwd:"",
                place:"",
                worknameNum:null,
                
                //管理設施去後端撈的所有資料
                allFacility:[],

                //所有管理員們
                allAdminUser:[],
                
                //編輯設施的時候要有一個舊name讓資料庫可以找因為我的pk是鳴子
                editOldName:"",

                //管理設施搜尋欄綁的變數
                searchName:"",
                searchPlace:"",
                searchOpen:"",

                //人員管理-搜尋的變數
                accountSearch:"",
                placeSearch:"",
                positionSearch:"",

                //登入人的資料
                loginInfo:{},

            }
    },
    components:{
        RouterView,
        Location,       //這是左邊欄位的小icon
        Setting,        //這是左邊欄位的小icon
        Document,       //這是左邊欄位的小icon
        IconMenu,       //這是左邊欄位的小icon
        ChatLineRound,   //這是管理設施統計的
    },
    methods:{
        //登入成功
		loginSucess(datakey){
			Swal.fire({
			title:"歡迎:"+datakey.adminuser.account,
			showClass: {
				popup: `
				animate__animated
				animate__fadeInUp
				animate__faster
				`
			},
			hideClass: {
				popup: `
				animate__animated
				animate__fadeOutDown
				animate__faster
				`
			}
			});
		},	
        //登出提示框-個人資訊欄
        logoutPlace(){
            Swal.fire({
            title: this.loginInfo.adminuser.account,
            text: "職位:"+this.checkPeoplePosition(this.loginInfo.adminuser.manageNum),
            footer: "所屬園區:"+this.loginInfo.adminuser.managePlace,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "登出",
            cancelButtonText: "返回",
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                title: "成功",
                // text: "",
                icon: "success"
                });
                this.$router.push("/")
                this.logput();
            }
            });
        },
        //新增失敗提示窗
        showBlockFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "請確實填寫",
                footer: ''
            });
        },
        //新增權限不夠
        showAuthorizeFail(){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "你的權限不夠",
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
        //新增成功提示窗-更新成功
        showUpdateSucess(){
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been Update",
            showConfirmButton: false,
            timer: 1500
            });
        },
        //確定要刪除嗎-設施
        sureDelete(index){
            Swal.fire({
                title: "確定嗎?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    });
                    this.delFacility(index);
                    // console.log(index)
                }
                });
        },
        //確定要刪除嗎-使用者
        sureDeleteUser(index){
            Swal.fire({
                title: "確定嗎?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    });
                    this.deleteAdminUser(index);
                    // console.log(index)
                }
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
            }, 500)
            
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
        },
        goManageFacility(){
            this.searchAllFacility()
            this.changePageNum=1
        },
        goAddFacility(){
            this.name =""
            this.desc=""
            this.region=""
            this.age=0
            this.date1=""
            this.date2=""
            this.published=false

             //設定照片
             const img = document.getElementById('addFacilityImg')
            img.src = ""


            this.changePageNum=2
        },
        goEdit(index){
            this.name =this.allFacility[index].name
            this.desc=this.allFacility[index].description
            this.region=this.allFacility[index].place
            this.age=this.allFacility[index].age
            this.date1=this.allFacility[index].startDate
            this.date2=this.allFacility[index].endDate
            this.published=this.allFacility[index].published
            this.photoS=this.allFacility[index].photo;
            //設定照片
            const img = document.getElementById('edditimgShow')
            img.src = this.allFacility[index].photo;
            img.style.display = 'block'; // 顯示圖片
            //設定舊姓名
            this.editOldName=this.allFacility[index].name

            

            //頁面跳轉
            this.changePageNum=3
            this.openFullScreen2()
        },
        goaddmanager(){
            this.changePageNum=4
        },
        goManageManager(){
            this.changePageNum=5
        },

// ================================================================以上頁面跳轉框
        handleChange(value){
            console.log(value)
        },


        //新增設施---選擇照片
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

                const img = document.getElementById('edditimgShow')
                img.src = e.target.result
                // console.log(e.target.result)
                // console.log(typeof e.target.result)
			};
			// 讀取文件內容
			reader.readAsDataURL(file);
			}
            
    	},
        //新增設施---提交並傳送到後端
        onSubmit(){
            //確定有沒有填資料
            if(this.name==""||this.desc==""||this.region==""||this.age==""||this.date1==""||this.date2==""||this.photoS==""){
                this.showBlockFail();
                return
            }

            //判斷你是不是超級管理員
            if (this.loginInfo.adminuser.account!="superadmin") {
                    //確定你有沒有權利
                    if(this.loginInfo.adminuser.managePlace!=this.region||this.loginInfo.adminuser.manageNum<20){
                        this.showAuthorizeFail();
                        return
                    }
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

        //管理設施---往後端搜尋所有的遊樂設施-fetch
        searchAllFacility(){

                const url = 'http://localhost:8080/api/park/getAllFacilityFromBack';
                // 要帶入的值

                const queryParams = new URLSearchParams({
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
                this.allFacility = data;

                //將所有陣列裡面照片的字串加上資料型態 讓img可以讀取
                for(let i = 0;i<this.allFacility.length;i++){
                var string = this.allFacility[i].photo;
                this.allFacility[i].photo = 'data:image/jpeg;base64,' + string;
                }
                })
        },
        //管理設施---搜尋條件遊樂設施
        searchCondition(){
            this.openFullScreen2()
            //假如是否開放有帶到的話用這個三個條件的方法
            if(this.searchOpen!=""){
                const url = 'http://localhost:8080/api/park/searchThreeCondition';
                // 要帶入的值

                const queryParams = new URLSearchParams({
                    name:this.searchName,
                    place:this.searchPlace,
                    published:this.searchOpen

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
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                    this.allFacility = data
                    console.log(data)
                     //將所有陣列裡面照片的字串加上資料型態 讓img可以讀取
                    for(let i = 0;i<this.allFacility.length;i++){
                    var string = this.allFacility[i].photo;
                    this.allFacility[i].photo = 'data:image/jpeg;base64,' + string;
                    }

                })
                return;
            }


            const url = 'http://localhost:8080/api/park/searchTwoCondition';
                // 要帶入的值

                const queryParams = new URLSearchParams({
                    name:this.searchName,
                    place:this.searchPlace,

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
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                    this.allFacility = data
                    console.log(data)
                     //將所有陣列裡面照片的字串加上資料型態 讓img可以讀取
                    for(let i = 0;i<this.allFacility.length;i++){
                    var string = this.allFacility[i].photo;
                    this.allFacility[i].photo = 'data:image/jpeg;base64,' + string;
                    }

                })

        },
        //管理設施---刪除設施
        delFacility(index){

            //判斷你是不是超級管理員
            if (this.loginInfo.adminuser.account!="superadmin") {
                    //確定你有沒有權利
                    if(this.loginInfo.adminuser.managePlace!=this.allFacility[index].place||this.loginInfo.adminuser.manageNum<20){
                        this.showAuthorizeFail();
                        return
                    }
            }



            //後端先
            console.log(this.allFacility[index].name)
            const url = 'http://localhost:8080/api/park/deleteFacility';
                // 要帶入的值

                const queryParams = new URLSearchParams({
                    name:this.allFacility[index].name,
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
                .then(response => {return response.json();})      // 將API回應轉換為JSON格式
                .then(data => {console.log(data)})


            //前段最後刪
            this.allFacility.splice(index,1)

        },
        //管理設施---更新設施
        updateFacility(){ 

            //判斷你是不是超級管理員
            if (this.loginInfo.adminuser.account!="superadmin") {
                    //確定你有沒有權利
                    if(this.loginInfo.adminuser.managePlace!=this.region||this.loginInfo.adminuser.manageNum<20){
                        this.showAuthorizeFail();
                        return
                    }
            }


            const url = 'http://localhost:8080/api/park/updateFacility';
                // 要帶入的值
                const queryParams = new URLSearchParams({
                    oldname:this.editOldName,
                });

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
                
                // 將查詢字串附加到 URL
                const urlWithParams = `${url}?${queryParams}`;

                fetch(urlWithParams, {
                method: "POST", 
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    "Accept":"application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }),
                })
                .then(response => {return response.json();})      // 將API回應轉換為JSON格式
                .then(data => {
                    console.log(data)
                    return this.searchCondition()
                })
                // this.searchCondition()
                this.showUpdateSucess()
                this.changePageNum=1


        },


        //人員管理--新增人員
        createAdminUser(){
            //確定有沒有填資料
            if(this.account==""||this.pwd==""||this.place==""||this.worknameNum==0){
                alert("部的微空")
                return
            }

            //判斷你是不是超級管理員
            if (this.loginInfo.adminuser.account!="superadmin") {
                    //確定你有沒有權利
                    if(this.loginInfo.adminuser.managePlace!=this.place||this.loginInfo.adminuser.manageNum<20){
                        this.showAuthorizeFail();
                        return
                    }
            }



            var url = "http://localhost:8080/api/addminUser/addAdminInfo";
            var data = {
                "adminuser":{
                    "account":this.account,
                    "pwd":this.pwd,
                    "managePlace":this.place,
                    "manageNum":this.worknameNum
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
                return this.searchAdminUser()
            });

            //成功視窗並清空欄位
            this.showBlockSucess()
            this.account='';
            this.pwd='';
            this.place='';
            this.worknameNum=null;
        },
        deleteAdminUser(index){
            //後端先刪除
                const url = 'http://localhost:8080/api/addminUser/deleteAdminuser';
                // 要帶入的值
                const queryParams = new URLSearchParams({
                    account:this.allAdminUser[index].account,
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
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                    console.log(data)
                })
            //前端要刪除
            this.allAdminUser.splice(index,1)
        },
        //人員管理-搜尋人員
        searchAdminUser(){

            //假如職位帶空的話
            if(this.positionSearch==""){
                const url = 'http://localhost:8080/api/addminUser/searchAdminuserByTwo';
                // 要帶入的值
                const queryParams = new URLSearchParams({
                    account:this.accountSearch,
                    place:this.placeSearch,
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
                return response.json();
                })
                .then(data => {
                // 將API回應的JSON數據設置到組件的responseData數據屬性中
                    this.allAdminUser = data
                    console.log(this.allAdminUser)
                })
                return
            }
            
            const url = 'http://localhost:8080/api/addminUser/searchAdminuser';
            // 要帶入的值
            console.log(this.accountSearch)
            console.log(this.placeSearch)
            console.log(this.positionSearch)


            const queryParams = new URLSearchParams({
                account:this.accountSearch,
                place:this.placeSearch,
                position:this.positionSearch,

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
            return response.json();
            })
            .then(data => {
            // 將API回應的JSON數據設置到組件的responseData數據屬性中
                this.allAdminUser = data
            })
        },
        //確認工作職位
        checkPeoplePosition(num){
            if(num==1){
                return "工讀生"
            }
            if(num==10){
                return "設施人員"
            }
            if(num==20){
                return "區域管理者"
            }
            if(num==99){
                return "超級管理員"
            }
            return "員工"
        },

        //使用者登出
        logput(){
            var url = "http://localhost:8080/api/addminUser/logout";
            var data = {

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
            });
        }


        
// ================================================================以上功能跟連接方法

    },
    mounted(){
        this.searchAllFacility()
        this.searchAdminUser();


        //將登入頁傳來的個人資料轉成json可讀取
        const data = JSON.parse(this.$route.query.data);
        // 輸出 'value' 拿取裡面的key
        this.loginInfo = data.key; 

        //登入成功的提示窗-看是誰登入
        this.loginSucess(data.key)
        
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
                                    <!-- <el-menu-item @click="" style="cursor: pointer;" class="child" index="1-3">刪除設施</el-menu-item> -->
                            </el-sub-menu>


                            <el-sub-menu  index="2">
                                <template #title >
                                    <el-icon><Document /></el-icon>
                                    <span >人員管理</span>
                                </template>
                                    <el-menu-item @click="goManageManager" style="cursor: pointer;" class="child" index="2-1">管理人員</el-menu-item>
                                    <el-menu-item @click="goaddmanager" style="cursor: pointer;" class="child" index="2-2">新增人員</el-menu-item>
                            </el-sub-menu>



                        

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
                <div v-show="changePageNum==1" class="manageFacility">
                    <div class="manageTop">
                        <div class="search">
                            <h4>搜尋名稱</h4>
                            <input v-model="this.searchName" style="width:10vw ; border-radius: 5px;border: 0;height: 5vh;color: black;" type="text">
                        </div>
                        <div class="place">
                            <h4>搜尋地區</h4>
                            <select v-model="this.searchPlace" style="border-radius: 5px;border: 0;height: 5vh;color: black;width: 10vw;">
                                <option value="">請選擇</option>
                                <option value="慢活樂園島">慢活樂園島</option>
                                <option value="溫馨親子島">溫馨親子島</option>
                                <option value="驚險火山島">驚險火山島</option>
                                <option value="凍骨冰山島">凍骨冰山島</option>
                                <option value="刺激飛天島">刺激飛天島</option>
                                <option value="孤島">孤島</option>
                            </select>
                        </div>
                        <div class="openNow">
                            <h4>搜尋開放</h4>
                            <select v-model="this.searchOpen" style="border-radius: 5px;border: 0;height: 5vh;color: black;width: 10vw;">
                                <option value="">請選擇</option>
                                <option value="true">開放中</option>
                                <option value="false">停止中</option>
                            </select>
                        </div>
                        <i @click="searchCondition" style="font-size: 20pt;margin-left: 2vw;cursor: pointer;" class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div class="manageBot" >
                        <div class="itemBlock" v-for="facility, index in this.allFacility">
                            <img :src=facility.photo alt="">
                            <div class="TextPlace">
                                <span>{{facility.name}}</span>
                                <span>{{facility.place}}</span>
                                <span>{{facility.published==true? "開放中":"停止中"}}</span>
                            </div>
                            <div class="BtnPlace">
                                <button :key="index" @click="goEdit(index)" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button :key="index" @click="sureDelete(index)" type="button"><i class="fa-solid fa-trash"></i></button>
                            </div>

                        </div>
                    </div>
                    
                </div>

                <!-- 新增選項 -->
                <div v-show="changePageNum==2"  class="addFacility">
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
                                <img id="addFacilityImg" src="" ref="preview" style="display: none; max-width: 200px; max-height: 200px;">
                            </div>
                        </el-form-item>
                        
                        <el-form-item>
                        <el-button type="primary" @click="onSubmit">Create</el-button>
                        <el-button @click="goBackHome">Cancel</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <!-- 編輯選項 -->
                <div v-show="changePageNum==3"  class="addFacility">
                    <h1 style="color:rgb(255, 255, 255); margin-left: 7vw;">更新設施</h1>

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
                                <label  for="file-upload" class="custom-file-upload">選擇照片</label>
                                <input  id="file-upload" type="file" @change="handleFileChange">
                                <img id="edditimgShow" src=""  style="display: none; max-width: 200px; max-height: 200px;">
                            </div>
                        </el-form-item>
                        
                        <el-form-item>
                        <el-button style="background-color: rgb(0, 174, 0);" type="primary" @click="updateFacility">Update</el-button>
                        <el-button @click="goManageFacility">Cancel</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <!-- 新增管理員 -->
                <div v-show="changePageNum==4" class="addmanager">
                    <h1 style="color: rgb(255, 255, 255); margin-left: 7vw;">新增人員</h1>

                    <el-form class="addformPlace" :model="form" label-width="120px">
                        <el-form-item label="帳號">
                            <el-input class="userinput" v-model="this.account" />
                        </el-form-item>

                        <el-form-item label="密碼">
                            <el-input class="userinput" v-model="this.pwd" />
                        </el-form-item>

                        <el-form-item label="管理區域">
                            <el-select v-model="this.place" placeholder="請選擇島嶼">
                                <el-option label="慢活樂園島" value="慢活樂園島" />
                                <el-option label="溫馨親子島" value="溫馨親子島" />
                                <el-option label="驚險火山島" value="驚險火山島" />
                                <el-option label="凍骨冰山島" value="凍骨冰山島" />
                                <el-option label="刺激飛天島" value="刺激飛天島" />
                                <el-option label="孤島"       value="孤島" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="職位">
                            <el-select v-model="this.worknameNum" placeholder="請選擇職位">
                                <el-option label="區域總管理" value="20" />
                                <el-option label="區域設施人員" value="10" />
                                <el-option label="區域工讀生" value="1" />
                            </el-select>
                        </el-form-item>

                        <el-form-item class="userBtnPlace">
                            <el-button type="primary" @click="createAdminUser">Create</el-button>
                            <el-button class="userCancelBtn" @click="">Cancel</el-button>
                        </el-form-item>
                        
                    </el-form>
                </div>

                <!-- 管理人員 -->
                <div v-show="changePageNum==5"  class="manageManager">
                    <div class="PeoplemanageTop">
                        <div class="search">
                            <h4>搜尋帳號</h4>
                            <input v-model="this.accountSearch" style="width:10vw ; border-radius: 5px;border: 0;height: 5vh;color: black;" type="text">
                        </div>
                        <div class="place">
                            <h4>搜尋地區</h4>
                            <select v-model="this.placeSearch" style="border-radius: 5px;border: 0;height: 5vh;color: black;width: 10vw;">
                                <option value="">請選擇</option>
                                <option value="慢活樂園島">慢活樂園島</option>
                                <option value="溫馨親子島">溫馨親子島</option>
                                <option value="驚險火山島">驚險火山島</option>
                                <option value="凍骨冰山島">凍骨冰山島</option>
                                <option value="刺激飛天島">刺激飛天島</option>
                                <option value="孤島">孤島</option>
                            </select>
                        </div>
                        <div class="openNow">
                            <h4>搜尋職位</h4>
                            <select v-model="this.positionSearch" placeholder="請選擇" style="border-radius: 5px;border: 0;height: 5vh;color: black;width: 10vw;">
                                <option value="">請選擇</option>
                                <option value="20">區域總管理</option>
                                <option value="10">區域設施人員</option>
                                <option value="1">區域工讀生</option>
                            </select>
                        </div>
                        <i @click="searchAdminUser" style="font-size: 20pt;margin-left: 2vw;cursor: pointer;" class="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div class="PeoplemanageBot" >
                        <div class="itemBlock" v-for="adminuser, index in this.allAdminUser">
                            <div class="TextPlace">
                                <span>帳號:{{adminuser.account}}</span>
                                <span>職位:{{checkPeoplePosition(adminuser.manageNum)}}</span>
                                <span>管轄區:{{adminuser.managePlace}}</span>
                            </div>
                            <div class="BtnPlace">
                                <button :key="index" @click="" type="button"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button :key="index" @click="sureDeleteUser(index)" type="button"><i class="fa-solid fa-trash"></i></button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <!-- 使用者資訊 -->
            <div @click="logoutPlace" class="userIconPlace">
                <i class="fa-solid fa-user"></i>
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
            margin:0 2vw;
            font-size: 25pt;

        }
        .userSpan{
            color: white;
            font-size: 18pt;
            padding: 1% 1%;
            text-decoration: underline;
            border-radius: 10px;
            &:hover{
                background-color: white;
                color: gray;
            }
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
            .manageTop{
                width: 70vw;
                margin: 0 5vw;
                height: 20vh;
                display: flex;
                justify-content: space-around;
                align-items: center;
                // background-color: #ccc;
                border-radius: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid black;
                padding: 0 8vw;
                option{
                    font-size: 16pt;
                }
            }
            .manageBot{
                width: 70vw;
                margin: 0 5vw;
                height: 70vh;
                border-radius: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid black;
                margin-top: 5vh;
                overflow:auto;
                


                    .itemBlock{
                        width: 100%; 
                        height: calc(20%); 
                        display: flex; 
                        // border: 1px solid blue;
                        text-align: center;
                        
                        &:hover{
                            background-color: rgb(157, 157, 157);
                        }
                        .TextPlace{
                            width: 70%;
                            display: flex;
                            justify-content:baseline;
                            align-items: center;
                            padding:0  1vw;

                            span{
                                min-width: 10vw;
                                margin-right: 5vw;
                            }
                        }
                        .BtnPlace{
                            width: 20%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            button{
                                border: 0;
                                border-radius: 10px;
                                width: 3vw;
                                height: 5vh;
                                margin: 0 0.5vw;
                                &:hover{
                                    background-color: black;
                                    color: white;
                                }
                            }
                        }
                    }
            }


        }
        //新增設施
        .addFacility{
            position: relative;
            .formPlace{
                padding: 3% 5%;
            }
            .photoPlace{
                display: flex;
                    //隱藏預設的外框
                    input[type="file"] {
                        display: none;
                    }
                    /* 自定义文件选择按钮外观 */
                    .custom-file-upload {
                    height: 5vh;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    display: inline-block;
                    padding: 2px 12px;
                    cursor: pointer;
                    background-color: #2669fb;
                    color: black;
                    }
                    /* 当文件选择按钮被激活（hover 或 focus 时），改变其外观 */
                    .custom-file-upload:hover,
                    .custom-file-upload:focus {
                    background-color: #ffffff;
                    }
            }

        }
        //人員管理-新增
        .addmanager{
            position: relative;
            .addformPlace{
                padding: 3% 5%;
            }
            .userinput{
                width: 40%;
            }
            .userBtnPlace{
                margin-top: 5vh;
                .userCancelBtn{
                    margin-left: 5vw;
                }
            }
        }
        //人員管理-搜尋
        .manageManager{
            position: relative;
            .PeoplemanageTop{
                width: 70vw;
                margin: 0 5vw;
                height: 20vh;
                display: flex;
                justify-content: space-around;
                align-items: center;
                // background-color: #ccc;
                border-radius: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid black;
                padding: 0 8vw;
                option{
                    font-size: 16pt;
                }
            }
            .PeoplemanageBot{
                width: 70vw;
                margin: 0 5vw;
                height: 70vh;
                border-radius: 10px;
                backdrop-filter: blur(10px);
                border: 1px solid black;
                margin-top: 5vh;
                overflow:auto;
                


                    .itemBlock{
                        width: 100%; 
                        height: calc(20%); 
                        display: flex; 
                        justify-content: space-between;
                        text-align: center;
                        
                        &:hover{
                            background-color: rgb(157, 157, 157);
                        }
                        .TextPlace{
                            width: 70%;
                            display: flex;
                            justify-content:baseline;
                            align-items: center;
                            padding:0  1vw;

                            span{
                                min-width: 14vw;
                                margin-right: 3vw;
                                overflow: hidden;
                            }
                        }
                        .BtnPlace{
                            width: 20%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            button{
                                border: 0;
                                border-radius: 10px;
                                width: 3vw;
                                height: 5vh;
                                margin: 0 0.5vw;
                                &:hover{
                                    background-color: black;
                                    color: white;
                                }
                            }
                        }
                    }
            }
        }

    }
}

.userIconPlace{
    position: absolute;
    bottom: 1%;
    left: 1%;
    width: 2vw;
    height: 4vh;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20pt;
    cursor: pointer;
}

</style>
