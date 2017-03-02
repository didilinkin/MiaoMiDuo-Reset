import httpVue from './httpVue'

export default {
    getSpeActDetail(data) {
        let url = httpVue.makeURL('/v1/activity/specialDetail', data);
        return httpVue.getDataVue(url, data)
    },
    getSpeActSubList(data){
        let url = httpVue.makeURL('/v1/activity/spePrpList',data);
        return httpVue.getDataVue(url,data)
    }
}
