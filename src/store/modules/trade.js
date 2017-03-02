import * as types from '../mutation-types'

const state = {
    cartPros:{},
    singlePro:{},
    shopCart:{
        cartBySellerList:{

        },
        failureProductList:[]
    },
    selCartPros:[],
    order:[],
    limitPro:[],
    userVorchers:0
}

const mutations = {
    [types.Add_ShopCart](state,amount){
        state.cartPros = amount;
    },
    [types.Set_ShopCart](state,amount){
        let failids = [];
        if(amount!=null){
            let seller = amount.cartBySellerList||[];
            for (let i=0;i<seller.length;i++){
                seller[i].buyShopSelect = false;
                seller[i].buyShopSelectAll = false;
                let pro = seller[i].shoppingCartDtoList;
                for(let j=0;j<pro.length;j++){
                    pro[j].buyProSelect = false;
                }
            }
            let failcarts = amount.failureProductList;
            for(let i=0;i<failcarts.length;i++){
                failids.push(failcarts[i].id);
            }
            state.shopCart = amount;
            state.shopCart.cartSelectAll = false;
            state.shopCart.failIds = failids;
        }else {
            state.shopCart = amount;
        }
    },
    [types.Select_cart_shop](state,amount){
        let cartSelectAll = true;
        let cartShops = state.shopCart.cartBySellerList;
        cartShops[amount].buyShopSelect = !cartShops[amount].buyShopSelect;
        cartShops[amount].buyShopSelectAll = !cartShops[amount].buyShopSelectAll;
        let selectPros = cartShops[amount].shoppingCartDtoList;
        for(let i=0;i<selectPros.length;i++){
            selectPros[i].buyProSelect = cartShops[amount].buyShopSelectAll;
        }
        for(let i=0;i<cartShops.length;i++){
            cartSelectAll = cartSelectAll&&cartShops[i].buyShopSelectAll;
        }
        state.shopCart.cartSelectAll = cartSelectAll;
    },
    [types.Select_cart_pro](state,amount){
        let cartSelectAll = true, shopSelect = false, shopSelectAll = true;
        let sIndex = amount.si, pIndex = amount.pi;
        let cartShops = state.shopCart.cartBySellerList;
        let _cartPros = cartShops[sIndex].shoppingCartDtoList;
        _cartPros[pIndex].buyProSelect = !_cartPros[pIndex].buyProSelect;
        for(let i=0;i<_cartPros.length;i++){
            shopSelectAll = shopSelectAll&&_cartPros[i].buyProSelect;
            shopSelect = shopSelect||_cartPros[i].buyProSelect;
        }
        cartShops[sIndex].buyShopSelect = shopSelect;
        cartShops[sIndex].buyShopSelectAll = shopSelectAll;
        for(let i=0;i<cartShops.length;i++){
            cartSelectAll = cartSelectAll&&cartShops[i].buyShopSelectAll;
        }
        state.shopCart.cartSelectAll = cartSelectAll;
    },
    [types.Select_cart_all](state,amount){
        state.shopCart.cartSelectAll = !state.shopCart.cartSelectAll;
        let cartShops = state.shopCart.cartBySellerList;
        for(let i=0;i<cartShops.length;i++){
            cartShops[i].buyShopSelect = state.shopCart.cartSelectAll;
            cartShops[i].buyShopSelectAll = state.shopCart.cartSelectAll;
            let cartPros = cartShops[i].shoppingCartDtoList;
            for(let j=0;j<cartPros.length;j++){
                cartPros[j].buyProSelect = state.shopCart.cartSelectAll;
            }
        }
    },
    [types.Del_invalid_carts](state,amount){
        state.shopCart.failureProductList = [];
    },
    [types.Set_Cart_Num](state,amount){
        let setCartId = amount.cartId;
        let setNum = amount.count.count;
        let carts = state.shopCart.cartBySellerList;
        for(let i=0;i<carts.length;i++){
            let pros = carts[i].shoppingCartDtoList;
            for(let j=0;j<pros.length;j++){
                if(pros[j].id==setCartId){
                    pros[j].productCount = setNum;
                }
            }
        }
    },
    [types.Del_Cart_Pro](state){
        let carts = state.shopCart.cartBySellerList;
        for(let i=0;i<carts.length;i++){
            let pros = carts[i].shoppingCartDtoList;
            if(carts[i].buyShopSelectAll){
                carts.splice(i,1);
                i=i-1;
            }else{
                for(let j=0;j<pros.length;j++){
                    if(pros[j].buyProSelect){
                        pros.splice(j,1);
                        j=j-1;
                    }
                }
            }
        }
    },
    [types.Set_order_pros](state,amount){
        for(let i=0;i<amount.length;i++){
            amount[i].freight = 0;
            let orderPros = amount[i].shoppingCartDtoList;
            let total=0,totalCash=0,totalVouchers=0,totalCount=0;
            amount[i].maxUq = 0;
            amount[i].useUqActive = true;
            amount[i].usedUq = 0;
            for(let j=0;j<orderPros.length;j++){
                orderPros[j].isAreaRestrict = false;
                orderPros[j].remainNum  = -1;
                totalCount += orderPros[j].productCount;
                totalCash += orderPros[j].sellerPrice*orderPros[j].productCount;
                totalVouchers += orderPros[j].vouchers*orderPros[j].productCount;
                amount[i].maxUq += orderPros[j].vouchers*orderPros[j].productCount;
            }
            amount[i].totalCount = totalCount;
            amount[i].totalCash = totalCash;
            amount[i].totalVouchers = totalVouchers;
            amount[i].total = totalVouchers+totalCash;
        }
        state.order = amount;
    },
    [types.Set_order_useuq](state,amount){
        let orders = state.order;
        let uservouchers = amount.vouchers;
        let restvouchers = uservouchers;
        state.userVorchers = amount.vouchers;
        for(let i=0;i<orders.length;i++){
            let maxUq = orders[i].maxUq,
                useUqActive = orders[i].useUqActive;
            if(orders[i].useUqActive){
                if(restvouchers>0&&restvouchers>maxUq){
                    orders[i].usedUq = maxUq;
                    restvouchers = restvouchers - orders[i].usedUq;
                }else if(restvouchers>0&&restvouchers<=maxUq){
                    orders[i].usedUq = restvouchers;
                    restvouchers = 0;
                }else{
                    orders[i].useUqActive = false;
                    orders[i].usedUq = 0;
                }
            }else {
                orders[i].usedUq = 0;
                restvouchers = restvouchers - orders[i].usedUq;
            }
        }
    },
    [types.Set_order_freight](state,amount){
        for(let i=0;i<state.order.length;i++){
            state.order[i].freight = amount[i].freight;
        }
    },
    // [types.Change_order_num](state,amount){
    //     let curNum = amount[0];
    //     let curShopIndex = amount[1].sIndex, curProIndex = amount[1].pIndex;
    //     state.order[curShopIndex].shoppingCartDtoList[curProIndex].productCount = curNum;
    //     for(let i=0;i<state.order.length;i++){
    //         let orderPros = state.order[i].shoppingCartDtoList;
    //         let total=0,totalCash=0,totalVouchers=0,totalCount=0,maxUq = 0;
    //         for(let j=0;j<orderPros.length;j++){
    //             totalCount += orderPros[j].productCount;
    //             totalCash += orderPros[j].sellerPrice*orderPros[j].productCount;
    //             totalVouchers += orderPros[j].vouchers*orderPros[j].productCount;
    //             maxUq += orderPros[j].vouchers*orderPros[j].productCount;
    //         }
    //         state.order[i].totalCount = totalCount;
    //         state.order[i].totalCash = totalCash;
    //         state.order[i].totalVouchers = totalVouchers;
    //         state.order[i].maxUq = maxUq;
    //         state.order[i].total = totalVouchers+totalCash;
    //     }
    //     let uservouchers = state.userVorchers;
    //     let restvouchers = uservouchers;
    //     for(let i=0;i<state.order.length;i++){
    //         let maxUq = state.order[i].maxUq,
    //             useUqActive = state.order[i].useUqActive;
    //         if(state.order[i].useUqActive){
    //             if(restvouchers>0&&restvouchers>maxUq){
    //                 state.order[i].usedUq = maxUq;
    //                 restvouchers = restvouchers - state.order[i].usedUq;
    //             }else if(restvouchers>0&&restvouchers<=maxUq){
    //                 state.order[i].usedUq = restvouchers;
    //                 restvouchers = 0;
    //             }else{
    //                 state.order[i].useUqActive = false;
    //                 state.order[i].usedUq = 0;
    //             }
    //         }else {
    //             state.order[i].usedUq = 0;
    //             restvouchers = restvouchers - state.order[i].usedUq;
    //         }
    //     }
    // },
    [types.Set_pro_arealimit](state,amount){
        let shop = state.order;
        state.limitPro = [];
        for(let i=0;i<shop.length;i++){
            let pro = shop[i].shoppingCartDtoList;
            for(let j=0;j<pro.length;j++){
                for(let n=0;n<amount.length;n++){
                    if(pro[j].productId==amount[n].productId&&pro[j].productSpecId==amount[n].skuId){
                        pro[j].isAreaRestrict = amount[n].isAreaRestrict;
                        pro[j].remainNum = amount[n].remainNum;
                        if(pro[j].isAreaRestrict){
                            state.limitPro.push(pro[j]);
                        }
                    }
                }
            }
        }
    },
    [types.Del_order_limitpro](state,amount){
        let shop = state.order;
        for(let i=0;i<shop.length;i++){
            let pro = shop[i].shoppingCartDtoList;
            for(let j=0;j<pro.length;j++){
                if(pro[j].isAreaRestrict){
                    pro.splice(j,1);
                    j = j-1;
                }
            }
            if(shop[i].shoppingCartDtoList.length==0){
                shop.splice(i,1);
                i=i-1;
            }
        }
        state.limitPro = [];
    }
}


export default {
  state,
  mutations
}
