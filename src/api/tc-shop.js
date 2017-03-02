import httpVue from './httpVue'

export default {
    getLocalCity (products) {
        let url = httpVue.makeURL('/v1/area/getLocalCity');
        return httpVue.getDataVue(url,{credentials:true});
    },
    getHotCity (products) {
        let url = httpVue.makeURL('/v1/area/getHotCity');
        return httpVue.getDataVue(url,{credentials:true});
    },
    getShopList (data) {
        let url = httpVue.makeURL('/v1/shop',data);
        return httpVue.getDataVue(url,{credentials:true});
    },
    getShopClass(){
        let url = httpVue.makeURL('/v1/shop/shopClass');
        return httpVue.getDataVue(url,{credentials:true});
    },
    getArea(data){
        let url = httpVue.makeURL('/v1/area/getArea',data);
        return httpVue.getDataVue(url,{credentials:true});
    },
    getBusiness(data){
        let url = httpVue.makeURL('/v1/buss/getBusinessCircleByRegionId',data);
        return httpVue.getDataVue(url,{credentials:true})
    },
    getShopInfo(data){
        let url = httpVue.makeURL('/v1/shop/'+data.sid);
        return httpVue.getDataVue(url,{credentials:true})
    },
    getShopProduct(data){
        let url = httpVue.makeURL('/v1/city/shop/sale',data);
        return httpVue.getDataVue(url);
    }
}
