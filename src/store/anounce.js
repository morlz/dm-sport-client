import { Anounce } from '@/lib'
import api from '@/api'

const state = {
	cached: []
}

const actions = {
	async get ({ commit, dispatch }) {
		let res = await Anounce.getList()
		if (!res) return
		commit('cachedSet', res)
	},
	async add ({ commit, dispatch }, anounce) {
		let res = await anounce.save()
		if (!res.id) return

		commit('cachedAppend', anounce)
	},
	async delete ({ commit, dispatch }, anounce) {
		let res = await anounce.delete()

		if (!res.id) return
		commit('cachedRemove', res)
	}
}

const mutations = {
	cachedSet: (state, payload) => state.cached = payload,
	cachedAppend: (state, payload) => state.cached.push(payload),
	cachedRemove: (state, payload) => state.cached = state.cached.filter(el => el.id != payload.id)
}

const getters = {
	anounces: state => state.cached.sort( api.sortFnFactory(item => new Date(item.date).valueOf(), true) )
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
