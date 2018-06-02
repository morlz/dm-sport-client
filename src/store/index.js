import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import menu from './menu'
import page from './page'
import politics from './politics'
import sport from './sport'
import video from './video'
import anounce from './anounce'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		menu,
		page,
		politics,
		sport,
		video,
		anounce
	},
	namespaced: true
})

export default store
