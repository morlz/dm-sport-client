import { Video } from '@/lib'
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
			method: Video.getList
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
		let res = await Video.getOne(id)
		commit('currentSet', res)
	},
	async save ({ commit, dispatch }, payload) {
		let res = await payload.save()

		if (!res.id) return

		router.push(`/videos/${res.id}`)
	},
	async delete ({ commit, dispatch, state }, id) {
		let res = await Video.delete(id)

		if (!res.id) return

		commit('removeVideoFromCache', res.id)
		if (state.current.id == res.id)
			router.push('/')
	}
}

const mutations = {
	infiniteSet: (state, payload) => state.infinite = payload,
	cacheSet: (state, payload) => state.cached = payload,
	completeSet: (state, payload) => state.complete = payload,
	currentSet: (state, payload) => state.current = payload,
	removeVideoFromCache: (state, payload) => state.cached = state.cached.filter(el => el.id != payload)
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
