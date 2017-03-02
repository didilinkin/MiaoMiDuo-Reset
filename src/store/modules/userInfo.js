import * as types from '../mutation-types'

const state = {
  	isLogin: false,
	userName        : null,
    realName        : null,
    headPic         : null,
    userAddress     : [],
    userAccount     : {},
    defaultAddress  : {},
    selectAddress   : {},
    carousel        : null,
    orderList       : null,
    orderInfo       : {receiverName:null},
    goodsInfo       : null,
    wallerData      : {vouchers:null},
    myEnvData       : null,
    myActivityData  : null
}

const mutations = {
    [types.Set_user_info] (state,amount) {
        state.isLogin = amount.success;
        if (amount.success) {
            for(let attr in amount.module){
                state[attr] = amount.module[attr];
            }
            // state.userName = amount.module.userName;
            // state.realName = amount.module.realName;
            // state.headPic  = amount.module.headPic;
        }
    },
    [types.Clear_user_info](state,amount){
        if(amount.success){
            state.isLogin = false;
            state.userName = null;
            state.realName = null;
            state.headPic = null;
            state.carousel = null;
            state.orderList = null;
            state.orderInfo = null;
            state.goodsInfo = null;
            state.wallerData = null;
            state.myEnvData = null;
            state.myActivityData = null;
        }
    },
    [types.Set_user_orders] (state,amount) {
        state.orderList = amount;
    },
    [types.Set_orders_banner](state,amount){
        state.carousel = amount;
    },
    [types.Set_order_info](state,amount){
        state.orderInfo = amount;
    },
    [types.Set_goods_info](state,amount){
        state.goodsInfo = amount;
    },
    [types.Set_waller_data](state,amount){
        state.wallerData = amount;
    },
    [types.Set_evnlop_data](state,amount){
        state.myEnvData = amount;
    },
    [types.Set_activity_data](state,amount){
        state.myActivityData = amount;
    },
    [types.Set_user_address](state,amount){
        state.userAddress = amount;
        let addrDefault;
        for(let i=0;i<amount.length;i++){
            if(amount[i].isDefault==1){
                addrDefault = amount[i];
            }
        }
        addrDefault||(addrDefault=amount[0]);
        state.defaultAddress = addrDefault;
        state.selectAddress = addrDefault;
    },
    [types.Set_user_account](state,amount){
        state.userAccount = amount;
    },
    [types.Set_user_nickName](state,amount){
        state.nickName = amount.nickName;
    }
}

export default {
  state,
  mutations
}
