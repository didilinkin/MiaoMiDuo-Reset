import httpVue from './httpVue'

export default {
    getBannerList (obj) {
        let str = '/v1/navmenu/getBannerList';
        let data = {regionId:obj.regionId,type:obj.type,appLinkId:obj.appLinkId}
        let url = httpVue.makeURL(str,data);
        let backData = null;
        return httpVue.getDataVue(url)
    },
    getNavMenu(data){
        let str = '/v1/navmenu/getNavMenu';
        let url = httpVue.makeURL(str,data);
        return httpVue.getDataVue(url);
    },
    getMaxAreaVersionTime(){
        let str = '/v1/area/getMaxAreaVersionTime';
        let url = httpVue.makeURL(str);
        return httpVue.getDataVue(url);
    },
    getChannel(data){
        let url = httpVue.makeURL('/v1/channel/getChannelInfo',data);
        return httpVue.getDataVue(url);
    },
    getHotSearchList(data){
        let url = httpVue.makeURL('/v1/search/getHotSearch',data);
        return httpVue.getDataVue(url);
    },
    getTcIndexTcHotList(data){
        let url = httpVue.makeURL('/v1/city/sale/home/hot',data);
        return httpVue.getDataVue(url);
    }
}
