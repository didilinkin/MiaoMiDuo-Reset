import * as types from '../mutation-types'

const state = {
	positionState : 0,//比对同城状态 0 初始化 1 成功 2 定位失败 3 未开通同城服务
	shopListLoading : true,
	positionData : {
		lng : null,
		lat : null,
		city: "定位中"
	},
	indexName : {
		A : 0,
		B : 1,
		C : 2,
		D : 3,
		E : 4,
		F : 5,
		G : 6,
		H : 7,
		I : 8,
		J : 9,
		K : 10,
		L : 11,
		M : 12,
		N : 13,
		O : 14,
		P : 15,
		Q : 16,
		R : 17,
		S : 18,
		T : 19,
		U : 20,
		V : 21,
		W : 22,
		X : 23,
		Y : 24,
		Z : 25
	},
	areaList : [],
	hotCity : null,
	allCityList : [],
    filterState : {
		areaId	  : null,
		typeId 	  : 0,
		trade 	  : 0,
		sort 	  : 2,
		filter 	  : 0,
      	pageNo    : 1,
      	pageSize  : 10,
		lon 	  : 0,
		lat 	  : 0,
		hasNext   : true
    },
	tcShopList : [],
	shopClass : [],
	tcArea	: [],
	areaBusinessList : [],
	lastAreaId : null,
	shopInfo : {},
	shopProList : {}
}

const mutations = {
	[types.Set_position_data] (state,amount){
		for(let attr in amount){
			state.positionData[attr] = amount[attr];
		}
		state.filterState.lon = amount.lng;
		state.filterState.lat = amount.lat;
	},
	[types.Set_area_list] (state,amount){
		if(state.areaList.length > 0){
			return;
		}
		state.allCityList = amount;
		let areaList = [
			{
				indexName : 'A',
				content   : []
			},
			{
				indexName : 'B',
				content   : []
			},
			{
				indexName : 'C',
				content   : []
			},
			{
				indexName : 'D',
				content   : []
			},
			{
				indexName : 'E',
				content   : []
			},
			{
				indexName : 'F',
				content   : []
			},
			{
				indexName : 'G',
				content   : []
			},
			{
				indexName : 'H',
				content   : []
			},
			{
				indexName : 'I',
				content   : []
			},
			{
				indexName : 'J',
				content   : []
			},
			{
				indexName : 'K',
				content   : []
			},
			{
				indexName : 'L',
				content   : []
			},
			{
				indexName : 'M',
				content   : []
			},
			{
				indexName : 'N',
				content   : []
			},
			{
				indexName : 'O',
				content   : []
			},
			{
				indexName : 'P',
				content   : []
			},
			{
				indexName : 'Q',
				content   : []
			},
			{
				indexName : 'R',
				content   : []
			},
			{
				indexName : 'S',
				content   : []
			},
			{
				indexName : 'T',
				content   : []
			},
			{
				indexName : 'U',
				content   : []
			},
			{
				indexName : 'V',
				content   : []
			},
			{
				indexName : 'W',
				content   : []
			},
			{
				indexName : 'X',
				content   : []
			},
			{
				indexName : 'Y',
				content   : []
			},
			{
				indexName : 'Z',
				content   : []
			}
		];
		for(var i = 0; i < amount.length; i++){
			areaList[state.indexName[amount[i].letter]].content.push(amount[i]);
		}
		for(var i = 0; i < areaList.length; i++){
			if(areaList[i].content.length == 0){
				areaList.splice(i,1);
				i = i-1;
			}
		}
		state.areaList = areaList;
	},
	[types.Set_hot_city] (state,amount){
		state.hotCity = amount;
	},
	[types.Verify_pos_city] (state){

		for(var i = 0; i < state.allCityList.length; i ++ ){

			if(state.allCityList[i].name == state.positionData.city){
				state.filterState.areaId =  state.allCityList[i].id;
				if(state.allCityList[i].whetherCity == 1){
					console.log(state.allCityList[i].name);
					state.positionState = 1;
					return;
				}else{
					state.positionState = 3;
					return;
				}
			}
		}

		state.positionState = 3;
	},
	[types.Set_pos_state](state){
		//定位失败
		state.positionState = 2;
	},
	[types.Init_tc_PageNo](state){
		state.filterState.pageNo = 1;
	},
	[types.Set_shop_list](state,amount){
		state.tcShopList = amount;
		state.shopListLoading = false;
	},
	[types.Add_tc_shopList](state,amount){
		for(var i = 0; i < amount.length; i ++){
			state.tcShopList.push(amount[i])
		}
		state.shopListLoading = false;
	},
	[types.Add_tc_pageNum](state){
		state.filterState.pageNo++;
	},
	[types.Set_pos_area](state,amount){
		state.positionData.city = amount.city;
		state.filterState.areaId = amount.areaId;
		state.filterState.lon = 0;
		state.filterState.lat = 0;
	},
	[types.Set_shop_class](state,amount){
		state.shopClass = amount;
	},
	[types.Set_tc_area](state,amount){
		state.tcArea = amount;
	},
	[types.Set_area_business](state,amount){
		state.areaBusinessList = amount;
	},
	[types.Set_tc_filter](state,amount){
		for(var attr in amount){
			state.filterState[attr] = amount[attr];
		}
	},
    [types.Set_tcShop_loading] (state,amount){
      state.shopListLoading = true;
    },
	[types.Set_last_areaId] (state,amount){
		state.lastAreaId = amount;
	},
	[types.Set_shop_info] (state,amount){
		console.log(amount);
		state.shopInfo = amount;
	},
	[types.Set_shop_product] (state,amount){
		state.shopProList = amount;
	}
}

export default {
  state,
  mutations
}
