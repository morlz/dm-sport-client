import { Page, New } from '@/lib'

const state = {
	current: null,
	currentNew: null
}

const actions = {
	async getNew ({ commit, dispatch }, id) {
		let res = await New.getOne(id)
		commit('currentNewSet', res)
	},
	async getPage ({ commit, dispatch }, id) {
		let res = await Page.getOne(id)
		commit('currentSet', res)
	},
	async saveNew ({ commit, dispatch }, payload) {
		let res = await payload.save()

		if (!res.id) return

		router.push(`/news/${res.id}`)
	},
	async savePage ({ commit, dispatch }, payload) {
		let res = await payload.save()

		if (!res.id) return

		router.push(`/page/${res.id}`)
	},
	async deleteNew ({ commit, dispatch }, id) {
		let res = await New.delete(id)

		if (!res.id) return

		router.push('/')
	}
}

const mutations = {
	currentNewSet: (state, payload) => state.currentNew = payload,
	currentSet: (state, payload) => state.current = payload,
}

const getters = {

}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
