import indexApi   from '../api/index'
import userApi    from '../api/user'
import mallApi    from '../api/mall'
import tradeApi   from '../api/trade'
import actApi     from '../api/activities'
import tcShop     from '../api/tc-shop'
import otherApi   from '../api/other'
import * as types from './mutation-types'
import store      from './../../static/store.js'

export const increment = ({ commit }, data) => {
    commit(types.ADD_NUMBER, 1)
}

export const getmallIndexData = ({ commit }, data) => {
  indexApi.getBannerList({regionId:-1,type:2,appLinkId:'scrollPicture'}).then((res) => {
    var arr = res.body.module[0].list
    commit(types.Set_indexData, arr)
  });
  indexApi.getChannel(data).then((res)=>{
      commit(types.Set_Channel_Info,res.body.module);
  });
}

export const getTcIndexData = ({commit},data) => {
    indexApi.getNavMenu({areaId:data.areaId}).then((res) => {
        commit(types.Set_tcCate_menu,res.body.module)
    })
    indexApi.getBannerList({regionId:data.areaId,type:1,appLinkId:'TCSY'}).then((res) => {
        if(res.body.success){
            commit(types.Set_tc_ztgg, res.body.module[0])
        }
    });
    indexApi.getTcIndexTcHotList({areaId:data.areaId,topCount:30}).then((res) => {
        if(res.body.success){
            commit(types.Set_tcIndex_tcHot, res.body.module)
        }
    })
}

export const loginfn = ({ commit }, data) => {
    return new Promise((resolve,reject)=>{
            userApi.login(data).then((res) => {
                if(res.body.success){
                    commit(types.Set_user_info,res.body);
                    resolve();
                }else{
                    reject(res.body.errorMessage);
                }
            })
        }
    );
}

export const logoutfn = ({commit},data)=>{
    return new Promise((resolve,reject)=>{
        userApi.logout().then((res)=>{
            if(res.body.success){
                commit(types.Clear_user_info,res.body);
                resolve();
            }else{
                reject(res.body.errorMessage);
            }
        })
    })
}

export const getUserInfo = ({ commit }, data) => {
  userApi.userMas().then((res) => {
      commit(types.Set_user_info, res.body);
  });
}

export const getUserAddress = ({commit}) => {
    userApi.getUserAddress().then((res)=>{
        commit(types.Set_user_address,res.body.module);
    })
}

export const getUserAccount = ({commit})=>{
    return new Promise((resolve,reject)=>{
        userApi.getUserAccount().then((res)=>{
            if(res.body.success){
                commit(types.Set_user_account,res.body.module);
                resolve();
            }else{
                reject(res.body.errorMessage);
            }
        })
    })
}

export const getUserOrders = ({ commit }, data) => {
  indexApi.getBannerList({regionId:-1,type:2,appLinkId:'myOrderBanner'}).then((res) => {
      console.log(res);
    let arr = res.body.module[0].list
    commit(types.Set_orders_banner, arr)
  });

  let parameter = {pageNo: 1,pageSize: 10,orderNo: '',orderState: ''};
  userApi.userOrders(parameter).then((res) => {
      commit(types.Set_user_orders, res.body.module);
  });
}

export const getOrderInfo = ({ commit }, data) => {
  userApi.orderInfo(data).then((res) => {
    commit(types.Set_order_info,res.body.module)
  });
}

export const getGoodsInfo = ({ commit }, data) => {
  userApi.goodsInfo(data).then((res) => {
    console.log(res)
    commit(types.Set_goods_info,res.body.module)
  });
}

export const getWallerData = ({ commit }, data) => {
  userApi.myWaller().then((res) => {
    console.log(res)
    commit(types.Set_waller_data,res.body.module)
  });
}

export const getEnvData = ({ commit }, data) => {
  userApi.myEnvData(data).then((res) => {
    console.log(res)
    commit(types.Set_evnlop_data,res.body.module)
  });
}

export const getActivityData = ({commit},data) => {
  userApi.myActivityData(data).then((res) => {
    console.log(res)
    commit(types.Set_activity_data,res.body.module)
  });
}

export const getNavMenu = ({commit},data) => {
  if (store.has('navMenuArr')) {//判断menu版本号是否相同
    let navMenuArr = store.get('navMenuArr');
    commit(types.Set_nav_menu,navMenuArr);
  }else{
    mallApi.getNavMenu(data).then((res) => {
      let navMenuArr = res.body.module;
      commit(types.Set_nav_menu,navMenuArr);
      store.set('navMenuArr',navMenuArr)
    });
  }
}

export const loadSubClass = ({ commit }, data) => {
    commit(types.Set_sub_class,data)
}

export const getGoodsList = ({ commit }, data) => {
  mallApi.getGoodsList(data).then((res) => {
    commit(types.Set_has_next,res.body.hasNext);
    commit(types.Set_goods_list,res.body.module)
  })
}

export const loadMore_mall = ({commit}, data) => {
  commit(types.Set_mall_loading);
  mallApi.getGoodsList(data).then((res) => {
    commit(types.Set_has_next,res.body.hasNext);
    commit(types.Add_mall_proList,res.body.module);
  })
}
export const loadMore_tc = ({commit}, data) => {
    commit(types.Set_tcShop_loading);
  tcShop.getShopList(data).then((res) => {
    //commit(types.Set_has_next,res.body.hasNext);
    commit(types.Add_tc_shopList,res.body.module);
  })
}
export const addPageNum = ({commit}, data) => {
    if(data == 'mall')
    {
        commit(types.Add_mall_pageNum)
    }
    else if (data == 'tc') {
        commit(types.Add_tc_pageNum)
    }
    else if (data == 'speAct'){
        commit(types.Add_SpeAct_PageNum)
    }
}

export const initPageNo = ({commit}, data) => {
  commit(types.Init_page_no);
}

export const getProductTree = ({commit},data) => {
  mallApi.getProductTree().then((res) => {
    commit(types.Set_pro_tree,res.body.module);
  })
}

export const setFilterState = ({commit},data) => {
  commit(types.Set_filter_state,data)
}

export const setTcFilterState = ({commit},data) => {
    commit(types.Set_tc_filter,data)
}

export const getHotCity = ({commit},data) => {
    tcShop.getHotCity().then((res) => {
        commit(types.Set_hot_city,res.body.module)
    })
}

export const getAppInitData = ({commit},data) => {
    //var state = 0;
    userApi.userMas().then((res) => {
        commit(types.Set_user_info, res.body);
    });
    var p1 = new Promise(
        function(resolve,reject){
            console.log('开始定位');
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS)
                    {
                        console.log('定位成功');
                        resolve(r)
                    }
                else if(this.getStatus() == BMAP_STATUS_UNKNOWN_LOCATION)
                    {
                        reject();
                        //位置结果未知
                        console.log('位置结果未知');
                    }
                else if(this.getStatus() == BMAP_STATUS_TIMEOUT)
                    {
                        reject();
                        //超时
                        console.log('超时');
                    }
                else if(this.getStatus() == BMAP_STATUS_INVALID_KEY)
                    {
                        reject();
                        //非法密钥
                        console.log('非法密钥');
                    }
                else if(this.getStatus() == BMAP_STATUS_INVALID_REQUEST)
                    {
                        reject();
                        //非法请求
                        console.log('非法请求');
                    }
                else
                    {
                        reject();
                        console.log('定位错误');
                        alert('failed'+this.getStatus());
                    }
            },{enableHighAccuracy: true})
        }
    );
    p1.then(
        function(r){
            console.log('拿到定位数据');
            commit(types.Set_position_data,{lng:r.point.lng,lat:r.point.lat,city:r.address.city})
        },
        function(){
            console.log('失败')
        }
    )

    var p2 = new Promise(
        function(resolve,reject){
            indexApi.getMaxAreaVersionTime().then((res) => {
                if(res.body.success && store.has('areaLastTime') && store.get('areaLastTime') == res.body.module && store.has('areaList')){
                    let arr = store.get('areaList');
                    resolve(arr);
                }else{
                    store.set('areaLastTime',res.body.module);
                    tcShop.getLocalCity().then((res) => {
                        if(res.body.success){
                            let arr = res.body.module;
                            store.set('areaList',arr);
                            resolve(arr);
                        }
                    })
                }
            })
        }
    );
    p2.then(
        function(arr){
            console.log('拿到城市数据');
            commit(types.Set_area_list,arr);
        },
        function(){
            console.log('失败')
        }
    )

    var p = Promise.all([p1,p2]);
    p.then(
        function(){
            commit(types.Set_cover_state,false);
            commit(types.Verify_pos_city);
        },
        function(){
            commit(types.Set_cover_state,false);
            commit(types.Set_pos_state);
        }
    );

    if(store.has('mallHisSearchArr')){
        commit(types.Set_search_list,{data:store.get('mallHisSearchArr'),type:'mall'})
    }
    if(store.has('tcHisSearchArr')){
        commit(types.Set_search_list,{data:store.get('tcHisSearchArr'),type:'tc'})
    }

}

export const getShopList = ({commit},data) => {
    commit(types.Set_tcShop_loading);
    tcShop.getShopList(data).then((res) => {
        commit(types.Set_shop_list,res.body.module)
    })
}

export const initTcPageNo = ({commit},data) => {
    commit(types.Init_tc_PageNo);
}

export const setPosArea = ({commit},data) => {
    commit(types.Set_pos_area,data)
    commit(types.Verify_pos_city);
}

export const getTcShopInitData = ({commit},data) => {
    tcShop.getShopClass().then((res) => {
        commit(types.Set_shop_class,res.body.module)
    })
    tcShop.getArea(data).then((res) => {
        commit(types.Set_tc_area,res.body.module)
    })
}

export const getBusiness = ({commit},data) => {
    tcShop.getBusiness(data).then((res) => {
        commit(types.Set_area_business,res.body.module)
    })
}

export const setLastAreaId = ({commit},data) => {
    commit(types.Set_last_areaId,data)
}

export const getShopInfo = ({commit},data) => {
    tcShop.getShopInfo(data).then((res) => {
        commit(types.Set_shop_info,res.body.module);
    })
}

export const getProductInfo = ({commit},data) => {
    mallApi.getProductInfo(data).then((res)=>{
        commit(types.Set_product_Info,res.body.module);
    })
}

export const getProductDetailHtml = ({commit},data) => {
    mallApi.getProductDetailHtml(data).then((res)=>{
        var reader = new FileReader();
        reader.readAsText(res.data, 'utf-8');
        reader.onload = function (e) {
            commit(types.Set_product_detailHtml,reader.result);
        }
    })
}

export const getShopProduct  = ({commit},data) => {
    tcShop.getShopProduct(data).then((res) => {
        commit(types.Set_shop_product,res.body.module);
    })
}

export const setProductCollect = ({commit},data) => {
    userApi.collectProduct(data).then((res)=>{
        if(res.body.resultCode==11001){
            commit(types.Set_user_info,res.body);
        }else {
            commit(types.Set_product_collect,res.body.module);
        }
    })
}

export const cancleProductCollect = ({commit},data) => {
    userApi.relinquishProduct(data).then((res)=>{
        commit(types.Cancle_product_collect,res.body.module);
    })
}

export const getSpeActDetail = ({commit},data)=>{
    return new Promise((resolve,reject)=>{
            actApi.getSpeActDetail(data).then((res)=>{
                if(res.body.success){
                    commit(types.Set_SpeAct_Filter,{
                        actId:res.body.module.id,
                        partId:res.body.module.partitionId
                    })
                    commit(types.Set_SpeAct_Detail,res.body.module);
                    resolve(res.body.module.categoryList[0]);
                }else{
                    reject(res.body.errorMessage);
                }
            })
        }
    );
}

export const getSpeActSubList = ({commit},data)=>{
    actApi.getSpeActSubList(data).then((res)=>{
        commit(types.Set_SpeAct_Filter,{
            cateId:data.activitySpecCategoryId,
            pageNo:data.pageNo,
            hasNext:res.body.hasNext
        });
        commit(types.Set_SpeAct_SubList,res.body.module);
    })
}

export const addSpeActSon = ({commit},data)=>{
    commit(types.Set_SpeAct_Loading,true);
    actApi.getSpeActSubList(data).then((res)=>{
        console.log(res.body.hasNext);
        commit(types.Set_SpeAct_Filter,{
            hasNext:res.body.hasNext
        });
        commit(types.Add_SpeAct_SubList,res.body.module);
    })
}

export const setSpeActFileter = ({commit},data)=>{
    commit(types.Set_SpeAct_Filter,data);
}

export const getChannelInfo = ({commit},data)=>{
    indexApi.getChannel(data).then((res)=>{
        commit(types.Set_Channel_Info,res.body.module);
    })
}

export const addShopCart = ({commit},data)=>{
    tradeApi.addShopCart(data).then((res)=>{
        commit(types.Add_ShopCart,res.body.module);
    })
}

export const getShopCart = ({commit},data)=>{
    tradeApi.getShopCart().then((res)=>{
        commit(types.Set_ShopCart,res.body.module);
    })
}

export const selectShop = ({commit},data)=>{
    commit(types.Select_cart_shop,data);
}

export const selectPro = ({commit},data)=>{
    commit(types.Select_cart_pro,data);
}

export const selectAll = ({commit},data)=>{
    commit(types.Select_cart_all);
}

export const cartDel = ({commit},data)=>{
    tradeApi.cartDel(data).then((res)=>{
        commit(types.Del_Cart_Pro);
    })
}

export const delInvalidCarts = ({commit},data)=>{
    tradeApi.cartDel(data).then((res)=>{
        commit(types.Del_invalid_carts);
    })
}

export const editCartNum = ({commit},data)=>{
    return new Promise((resolve,reject)=>{
        tradeApi.editCartNum(data).then((res)=>{
            if(res.body.success){
                resolve();
                commit(types.Set_Cart_Num,data);
            }else{
                reject(res.body.errorMessage);
            }
        })
    })
}

export const cartCommit = ({commit},data) =>{
    commit(types.Set_order_pros,data);
}

export const loadOrders = ({commit},data) => {
    return new Promise((resolve,reject)=>{
        userApi.getUserAddress().then((res)=>{
            if(res.body.success){
                commit(types.Set_user_address,res.body.module);
                commit(types.Set_order_useuq,data);
                resolve();
            }else{
                reject(res.body.errorMessage);
            }
        });
    })
}

export const getCartFreight = ({commit},data)=>{
    return new Promise((resolve,reject)=>{
        tradeApi.getCartFreight(data).then((res)=>{
            if(res.body.success){
                commit(types.Set_order_freight,res.body.module);
                resolve();
            }else{
                reject(res.body.errorMessage);
            }
        });
    })
}

// export const orderChangeNum = ({commit},data)=>{
//     return new Promise((resolve,reject)=>{
//         commit(types.Change_order_num,data);
//         resolve();
//     })
// }

export const swicthUseUq = ({commit},data)=>{
    commit(types.Set_order_useuq,data);
}

export const orderImgCodeCheck = ({commit},data) => {
    return new Promise((resolve,reject)=>{
        tradeApi.imgCodeCheck().then((res)=>{
            if(res.body.success){
                commit(types.Set_imgcode_check,res.body.module);
                resolve();
            }else{
                reject(res.body.errorMessage);
            }
        })
    })
}

export const getImgCode = ({commit},data) => {
    return new Promise((resolve,reject)=>{
        otherApi.getImgCode().then((res)=>{
            if(res.body.success){
                commit(types.Set_imgcode_val,res.body.module);
                resolve(res.body.module);
            }else{
                reject(res.body.errorMessage);
            }
        })
    })
}

export const checkProductAreaLimit = ({commit},data) => {
    return new Promise((resolve,reject)=>{
        tradeApi.checkProductAreaLimit(data).then((res)=>{
            if(res.body.success){
                commit(types.Set_pro_arealimit,res.body.module);
                resolve(res.body.module);
            }else{
                reject(res.body.errorMessage);
            }
        })
    })
}

export const orderConfirm = ({commit},data) => {
    return new Promise((resolve,reject)=>{
        tradeApi.orderConfirm(data).then((res)=>{
            if(res.body.success){
                resolve();
            }else{
                reject(res.body.errorMessage);
            }
        })
    })
}

export const deleteLimitPro = ({commit},data) => {
    return new Promise((resolve,reject)=>{
        tradeApi.cartDel(data).then((res)=>{
            if(res.body.success){
                commit(types.Del_order_limitpro,data);
                resolve();
            }else{
                reject();
            }
        })
    })
}

export const searchGoodsList = ({commit},data) => {
    mallApi.mallSearch(data).then((res)=>{
        commit(types.Set_has_next,res.body.hasNext);
        commit(types.Set_goods_list,res.body.module)
    })
}

export const loadMore_mall_search = ({commit},data) => {
    commit(types.Set_mall_loading);
    mallApi.mallSearch(data).then((res)=>{
        commit(types.Set_has_next,res.body.hasNext);
        commit(types.Add_mall_proList,res.body.module);
    })
}

export const setHisSearch = ({commit},data) => {
    if(store.has(data.type+'HisSearchArr'))
    {
        let arr = store.get(data.type+'HisSearchArr');
        let set = new Set(arr);
        if(set.has(data.text))
        {
            set.delete(data.text);
            set.add(data.text);
            setData(Array.from(set),data.type);
        }
        else
        {
            if(set.size==4)
            {
                let sraechList = Array.from(set);
                sraechList.shift();
                sraechList.push(data.text);
                setData(sraechList,data.type);
            }
            else
            {
                set.add(data.text);
                setData(Array.from(set),data.type);
            }
        }
    }
    else
    {
        let sraechList = [data.text];
        setData(sraechList,data.type);
    }
    function setData(list,type){
        store.set(type+'HisSearchArr',list)
        commit(types.Set_search_list,{data:list,type:type})
    }

}

export const clearSearchList = ({commit},data) => {
    store.clear(data.type+'HisSearchArr')
    commit(types.Clear_search_list,{type:data.type})
}

export const getHotSearchList = ({commit},data) => {
    if(data.type=='mall'){
        indexApi.getHotSearchList({source:0}).then((res)=>{
            console.log(res);
            commit(types.Set_hotSearch_list,{type:0,list:res.body.module})
        })
    }else{
        indexApi.getHotSearchList({source:1}).then((res)=>{
            commit(types.Set_hotSearch_list,{type:1,list:res.body.module})
        })
        indexApi.getHotSearchList({source:2}).then((res)=>{
            commit(types.Set_hotSearch_list,{type:2,list:res.body.module})
        })
    }
}

export const changeName = ({commit},data) => {
    return new Promise((resolve,reject)=>{
            userApi.changeName(data).then((res)=>{
                if(res.body.success){
                    console.log(res);
                    commit(types.Set_user_nickName,data)
                    resolve();
                }else{
                    reject(res.body.errorMessage);
                }
            })
        }
    );
}
