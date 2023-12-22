import { defineStore } from 'pinia';


export default defineStore("parkPinia",{
    state:()=>({
        flypeople:0,
        hoursepeople: 0,
        icepeople: 0,
        slowpeople: 0,
        firepeople: 0,
        
    }),
    getters:{

    },
    actions:{

// ===========================================================================get and set===================================

    setpeople(flypeople,hoursepeople,icepeople,slowpeople,firepeople){
        this.flypeople = flypeople;
        this.hoursepeople = hoursepeople;
        this.icepeople = icepeople;
        this.slowpeople = slowpeople;
        this.firepeople = firepeople;
    },
    getflypeople(){
        let arr = [this.flypeople,this.hoursepeople,this.icepeople,this.slowpeople,this.firepeople]
        return  arr
    },

    }
})