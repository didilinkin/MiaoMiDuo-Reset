import * as types from '../mutation-types'

const state = {
    imgCode:{
        check:false,
        codeVal:''
    },
    msgCodeLogin:'',
    msgCodeUnlogin:''
}

const mutations = {
    [types.Set_imgcode_check](state,amount){
        if(amount==0){
            state.imgCode.check = false;
        }
        if(amount==1){
            state.imgCode.check = true;
        }
    },
    [types.Set_imgcode_val](state,amount){
        state.imgCode.codeVal = amount.imgSrc;
    }
}

export default {
  state,
  mutations
}
