import Vue         from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

export default {
    data : {
        //serviceHost : 'http://test.youdui.org:8090/api/'
        serviceHost : 'http://api.youdui.org/api'
        //serviceHost : 'http://fapi.udui.com/api'
    },
    getDataVue : function(url,options) {
        return Vue.http.get(url,options);
    },
    postDataVue: function (url, data,options) {
        Vue.http.options.emulateJSON = true;
        return Vue.http.post(url,data,options);
    },
    patchDataVue: function (url, data,options) {
        Vue.http.options.emulateJSON = true;
        return Vue.http.patch(url,data,options);
    },
    putDataVue: function (url,data,options){
        Vue.http.options.emulateJSON = true;
        return Vue.http.put(url,data,options);
    },
    deleteDataVue: function (url,options){
        Vue.http.options.emulateJSON = true;
        return Vue.http.delete(url,options);
    },
    jsonpDataVue : function (url) {
        return Vue.http.jsonp(url);
    },
    makeURL : function (url,data){
        var link = this.data.serviceHost + url;
        if (typeof data != "undefined" && data != "") {
            var paramArr = [];
            for (var attr in  data) {
                paramArr.push(attr + '=' +  data[attr]);
            }
            link += '?' + paramArr.join('&');
        }
        return link;
    }
}

// 请求拦截器 可以在请求发送前和发送请求后做一些处理。暂不适用
// Vue.http.interceptors.push((request, next) => {
//         // ...
//         // 请求发送前的处理逻辑
//         // ...
//     next((response) => {
//         // ...
//         // 请求发送后的处理逻辑
//         // ...
//         // 根据请求的状态，response参数会返回给successCallback或errorCallback
//         return response
//     })
// })
