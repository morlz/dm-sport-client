import { User } from '@/lib'

const state = {
	login: '',
	pass: '',
	user: null
}

const actions = {
	async signin ({ commit, dispatch, state }) {
		let res = await User.signin({ login: state.login, pass: state.pass })
		if (!res) return

		commit('userSet', res)
		router.push('/')
	},
	async getUserData ({ commit, dispatch }) {
		let res = await User.getUserData()
		if (!res.id) return

		commit('userSet', res)
	}
}

const mutations = {
	loginSet: (state, payload) => state.login = payload,
	passSet: (state, payload) => state.pass = payload,
	userSet: (state, payload) => {
		state.user = payload
		if (payload.api_token) localStorage.setItem('api_token', payload.api_token)
		if (payload.id) localStorage.setItem('uid', payload.id)
	},
	signout: state => state.user = null
}

const getters = {
	logined: state => !!state.user
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
