import Vue                  from 'vue'
import Router               from 'vue-router'

import app                  from '@/App.vue'
import appIndex             from '@/component/home/index.vue'
import footMenu             from '@/component/common/footmenu.vue'
import mall                 from '@/component/mall/mall.vue'
import goodsList            from '@/component/mall/goods-list.vue'
import goodsDetail          from '@/component/mall/goods-detail.vue'
import tcshop               from '@/component/tcShop/tcshop.vue'
import shopInfo             from '@/component/tcShop/shop-info.vue'
import shopProList          from '@/component/tcShop/shop-product.vue'
import selectArea           from '@/component/tcShop/select-area.vue'
import shopcar              from '@/component/shopcar.vue'
import userCenter           from '@/component/user/user-center.vue'
import userOrders           from '@/component/user/user-orders.vue'
import detail               from '@/component/user/detail.vue'
import orderInfo            from '@/component/user/order-info.vue'
import login                from '@/component/common/login.vue'
import myWallet             from '@/component/user/my-wallet.vue'
import myEnvlop             from '@/component/user/my-envlop.vue'
import myActivity           from '@/component/user/my-activity.vue'
import myPay                from '@/component/user/my-pay.vue'
import userInfo             from '@/component/user/user-info.vue'
import specialAct           from '@/component/act/special-activities.vue'
import shopCart             from '@/component/trade/shop-cart.vue'
import orderConfirm         from '@/component/trade/order-confirm.vue'
import payDo                from '@/component/trade/pay-do.vue'
import changeName           from '@/component/user/change-name.vue'

Vue.use( Router )

export default new Router({
    routes: [
        {
            // TEST component
            path        : '/',
            name        : 'Filtrate',
            component   :  Login
        }
    ]
})
