import httpVue from './httpVue'

export default {
    getNavMenu(products) {
        let data = products;
        let url = httpVue.makeURL('/v1/navmenu/getNavMenu', data);
        return httpVue.getDataVue(url, data, {
            credentials: true
        })
    },
    getGoodsList(products) {
        let data = products;
        let url = httpVue.makeURL('/v1/mall/list', data);
        return httpVue.getDataVue(url, data, {
            credentials: true
        })
    },
    getProductTree() {
        let url = httpVue.makeURL('/v1/product/category/tree');
        return httpVue.getDataVue(url, {
            credentials: true
        })
    },
    getProductInfo(proId) {
        let url = httpVue.makeURL('/v1/goods/'+proId);
        return httpVue.getDataVue(url,{
            credentials: true
        })
    },
    getProductDetailHtml(proId){
        let url = httpVue.makeURL('/v1/goods/text/'+proId);
        return httpVue.getDataVue(url)
    },
    mallSearch(data){
        let url = httpVue.makeURL('/v1/search/mallProduct');
        return httpVue.postDataVue(url,data);
    }
}
