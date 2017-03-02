import httpVue from './httpVue'

export default {
    addShopCart(pro) {
        let data = pro;
        let url = httpVue.makeURL('/v1/cart', data);
        return httpVue.postDataVue(url, data,{
            credentials: true
        });
    },
    getShopCart(){
        let url = httpVue.makeURL('/v1/cart');
        return httpVue.getDataVue(url,{
            credentials: true
        });
    },
    editCartNum(data){
        let url = httpVue.makeURL('/v1/cart/'+data.cartId,data.count);
        return httpVue.putDataVue(url,data,{
            credentials: true
        });
    },
    cartDel(data){
        let url = httpVue.makeURL('/v1/cart',data);
        return httpVue.deleteDataVue(url,{
            credentials: true
        })
    },
    getCartFreight(data){
        let url = httpVue.makeURL('/v1/logistics/getProductFreight');
        return httpVue.postDataVue(url,data,{
            credentials:true
        })
    },
    imgCodeCheck(){
        let url = httpVue.makeURL('/v1/order/check');
        return httpVue.getDataVue(url,{
            credentials:true
        })
    },
    checkProductAreaLimit(data){
        let url = httpVue.makeURL('/v1/logistics/checkProductAreaLimit');
        return httpVue.postDataVue(url,data,{
            credentials:true
        })
    },
    orderConfirm(data){
        let url = httpVue.makeURL('/v1/order');
        return httpVue.postDataVue(url,data,{
            credentials:true
        })
    }
}
