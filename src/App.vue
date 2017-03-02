<template lang="pug">
#app( v-bind:style="{ height: '100%' }" )
    cover( v-bind:show="loading" )
    router-view( v-if="!loading" class="view a" name="main" )
    router-view( class="view b" name="footerMenu" )
</div>
</template>

<script>
import cover                from      './component/cover.vue'   //欢迎动画组件
import { mapGetters }       from 'vuex'
const components = { cover }

export default {
    name: 'app',
    data() {
        return { }
    },
    computed: mapGetters({
        loading : "loading"
    }),
    created() {
        this.$store.dispatch('getAppInitData');
    },
    components: components
}
</script>

<style lang="scss" scoped>
@import '../static/base.css'
@import 'http://at.alicdn.com/t/font_9ae7eba3p7mpwrk9.css'

#app{
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
