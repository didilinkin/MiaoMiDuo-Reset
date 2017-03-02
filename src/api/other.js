import httpVue from './httpVue'

export default {
    imgCodeCheck(){
        let url = httpVue.makeURL('/v1/sms/getSmsFlagState');
        return httpVue.getDataVue(url,{
            credentials:true
        })
    },
    getImgCode(){
        let url = httpVue.makeURL('/v1/code');
        return httpVue.getDataVue(url,{
            credentials:true
        })
    },
    getMsgCodeLogin(data){
        let url = httpVue.makeURL('/v1/sendSNoLogin/'+data.type);
        return httpVue.postDataVue(url,data,{
            credentials:true
        })
    },
    getMsgCodeUnlogin(data){
        let url = httpVue.makeURL('/v1/sms/{type}'+data.type);
        return httpVue.postDataVue(url,data,{
            credentials:true
        })
    }
}
