import httpVue from './httpVue'
import encrypt from './../../static/md5'

export default {
  login(products) {
    let url = httpVue.makeURL('/v1/auth/login');
    products.pwd = encrypt.hex_md5(products.pwd);
    let data = products;
    return httpVue.postDataVue(url, data, {
      credentials: true
    })
  },
  logout(data){
      let url = httpVue.makeURL('/v1/auth/loginout');
      return httpVue.postDataVue(url,data,{
          credentials:true
      })
  },
  userMas(products) {
    let url = httpVue.makeURL('/v1/user/details');
    return httpVue.getDataVue(url, {
      credentials: true
    });
  },
  userOrders(products) {
    let data = {
      pageNo: products.pageNo,
      pageSize: products.pageSize,
      orderNo: products.orderNo,
      orderState: products.orderState
    };
    let url = httpVue.makeURL('/v1/order', data);
    return httpVue.getDataVue(url, {
      credentials: true
    });
  },
  orderInfo(products) {
    let link = '/v1/order/' + products.orderNo;
    let url = httpVue.makeURL(link);
    return httpVue.getDataVue(url, {
      credentials: true
    });
  },
  goodsInfo(products) {
    let link = '/v1/goods/' + products.goodsId;
    let url = httpVue.makeURL(link);
    return httpVue.getDataVue(url, {
      credentials: true
    });
  },
  myWaller() {
    let url = httpVue.makeURL('/v1/user/purse/get');
    return httpVue.getDataVue(url, {
      credentials: true
    });
  },
  myEnvData(products) {
    let url = httpVue.makeURL('/v1/lottery/envelope/myprizes', products);
    return httpVue.getDataVue(url, {
      credentials: true
    });
  },
  myActivityData(products) {
    let url = httpVue.makeURL('/v1/lottery/myactivities', products);
    return httpVue.getDataVue(url, {
      credentials: true
    });
  },
  collectProduct(proId) {
      let url = httpVue.makeURL('/v1/product/collectProduct');
      return httpVue.postDataVue(url,proId,{
          credentials: true
      });
  },
  relinquishProduct(proIds){
      let url = httpVue.makeURL('/v1/product/relinquishProduct/batch',{productIds:proIds});
      return httpVue.deleteDataVue(url,{
          credentials: true
      });
  },
  getUserAddress(){
      let url = httpVue.makeURL('/v1/user/address/shoppingAddressList');
      return httpVue.getDataVue(url,{
          credentials: true
      });
  },
  getUserAccount(){
      let url = httpVue.makeURL('/v1/user/purse/get');
      return httpVue.getDataVue(url,{
          credentials: true
      });
  },
  changeName(data){
      let url = httpVue.makeURL('/v1/auth/nick',data);
      return httpVue.getDataVue(url,{
          credentials: true
      });
  }
}
