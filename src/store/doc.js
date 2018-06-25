import { Doc } from '@/lib'
import Infinite from '@/lib/Infinite'

const state = {
	cached: [],
	infinite: null,
	complete: false,
	current: false
}

const actions = {
	init ({ commit, dispatch }) {
		let infinite = new Infinite({
			method: Doc.getList
		})

		infinite.on('cached', n => commit('cacheSet', n))
		infinite.on('complete', n => commit('completeSet', n))

		commit('infiniteSet', infinite)
		dispatch('start')
	},
	async start ({ commit, dispatch, state }) {
		await state.infinite.start()
	},
	async more ({ commit, dispatch, state }, payload) {
		await state.infinite.more(payload)
	},
	async getOne ({ commit, dispatch }, id) {
		let res = await Doc.getOne(id)
		commit('currentSet', res)
	},
	async save ({ commit, dispatch }, payload) {
		let res = await payload.save()

		if (!res.id) return

		router.push(`/docs/${res.id}`)
	},
	async delete ({ commit, dispatch, state }, id) {
		let res = await Doc.delete(id)

		if (!res.id) return

		commit('removeDocFromCache', res.id)
		if (state.current.id == res.id)
			router.push('/')
	}
}

const mutations = {
	infiniteSet: (state, payload) => state.infinite = payload,
	cacheSet: (state, payload) => state.cached = payload,
	completeSet: (state, payload) => state.complete = payload,
	currentSet: (state, payload) => state.current = payload,
	removeDocFromCache: (state, payload) => state.cached = state.cached.filter(el => el.id != payload)
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
