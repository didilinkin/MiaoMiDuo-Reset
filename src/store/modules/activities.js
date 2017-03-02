import * as types from '../mutation-types'

const state = {
    speActDetail:{
        bannerList:[],
        categoryList:[],
        rootProducts:{}
    },
    speActSubList:[],
    speActFilter:{
        actId:'',
        cateId:'',
        partId:0,
        pageNo:1,
        hasNext:true
    },
    speActLoad:true
}

const mutations = {
    [types.Set_SpeAct_Detail] (state,amount) {
      state.speActDetail = amount;
    },
    [types.Set_SpeAct_SubList] (state,amount) {
        state.speActSubList = amount;
        state.speActLoad= false;
    },
    [types.Add_SpeAct_SubList](state,amount){
        for(var i=0;i<amount.length;i++){
            state.speActSubList.push(amount[i]);
        }
        state.speActLoad= false;
    },
    [types.Add_SpeAct_PageNum] (state){
        state.speActFilter.pageNo++;
    },
    [types.Set_SpeAct_Filter](state,amount){
        if(amount.actId){state.speActFilter.actId = amount.actId;}
        if(amount.cateId){state.speActFilter.cateId = amount.cateId;}
        if(amount.hasNext||amount.hasNext==false){state.speActFilter.hasNext = amount.hasNext;}
        if(amount.partId){state.speActFilter.partId = amount.partId;}
        if(amount.pageNo){state.speActFilter.pageNo = amount.pageNo;}
    },
    [types.Set_SpeAct_Loading](state,amount){
        state.speActLoad = amount;
    }
}


export default {
  state,
  mutations
}
