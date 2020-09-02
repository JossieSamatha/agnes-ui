import Vue from 'vue'
import Vuex from 'vuex'
import user from '@hex/ares-ui/src/store/modules/user'
import local from '@hex/ares-ui/src/store/local'
import dataVTemplate from './modules/datav-template/index'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        user,
        dataVTemplate
    },
    getters: local
});

export default store