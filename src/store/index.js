import Vue 			from 'vue'
import Vuex 		from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import indexData 	from './modules/indexData.js'
import userInfo 	from './modules/userInfo.js'
import mall		 	from './modules/mall.js'
import tcShop		from './modules/tcShop.js'
import activities   from './modules/activities.js'
import trade        from './modules/trade.js'
import other        from './modules/other.js'

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  getters,
  modules : {
    indexData,
    userInfo,
    mall,
    tcShop,
    activities,
    trade,
    other
  }
  //strict: true
})
