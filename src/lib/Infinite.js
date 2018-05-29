import EventEmitter from 'browser-event-emitter'
import merge from 'lodash.merge'
import isEqual from 'lodash.isequal'


class Infinite extends EventEmitter {
	constructor (options = {}) {
		super()

		if (typeof options.method != 'function')
			throw new Error('Load more method was required')

		this._loadingAll = 0
		this._loadingMore = 0
		this._loadingPreload = 0
		this._lastLoadingState = false

		this._cached = []
		this._preloaded = false
		this._filters = options.filters || {}
		this._sort = options.sort || {}
		this._additional = options.additional || {}

		this._offset = 0
		this._autoSetPreloaded = false
		this._complete = false

		this.firstPageSize = options.firstPageSize || 30
		this.pageSize = options.pageSize || 30
		this.method = options.method
		this.log = options.log || true

		if (this.log) console.log('[inf] [init]')
	}

	async start (params = {}) {
		if (this.log) console.log('[inf] [start] start');
		this.complete = false
		this._offset = 0
		this._preloaded = false

		this.loadingAll++
		let res = await this._load({ ...params, limit: this.firstPageSize })
		this.loadingAll--

		if (this.log) console.log('[inf] [start] end');

		if (res === undefined || res.error) return

		this.cached = res
		this._offset = res.length
		if (!res || !res.length)
			this.complete = true

		this.emit('started', this.cached)
		this._preload(params)
	}

	async more (payload, params = {}) {
		if (this.complete) return
		if (this.loadingMore || this.loadingAll)
			return this._autoSetPreloaded = payload



		if (this._preloaded != false) {
			if (this.log) console.log('[inf] [more] from memory');
			this.cached = [...this.cached, ...this._preloaded]
			payload.loaded()
			if (!this._preloaded) {
				this.complete = true
				payload.complete()
			}
			this._preloaded = false
		} else {
			if (this.loadingPreload) {
				if (this.log) console.log('[inf] [more] wait for preload');
				this._autoSetPreloaded = payload
			} else {
				if (this.log) console.log('[inf] [more] loading start');
				this.loadingMore++
				let res = await this._load(params)
				this.loadingMore--

				if (res === undefined || res.error) return
				if (this.log) console.log('[inf] [more] loading end');

				this.cached = [...this.cached, ...res]
				this._offset += res.length
				payload.loaded()
				if (!res || !res.length) {
					this.complete = true
					payload.complete()
				}
			}
		}

		this._preload(params)
		this.emit('loaded', this.cached)
	}

	async _preload (params) {
		if (this.loadingPreload) return
		if (this.log) console.log('[inf] [preload] start');

		this.loadingPreload++
		let res = await this._load(params)
		this.loadingPreload--

		if (res === undefined || res.error) return
		if (this.log) console.log('[inf] [preload] end');

		if (this._autoSetPreloaded === false) {
			this._preloaded = res
			if (this.log) console.log('[inf] [preload] set data in memory');
		} else {
			if (this.log) console.log('[inf] [preload] set data in cache')
			this.cached = [...this.cached, ...res]
			this._autoSetPreloaded.loaded()
			if (!res || !res.length) {
				this.complete = true
				this._autoSetPreloaded.complete()
			}
			this._autoSetPreloaded = false
		}

		this._offset += res.length
		this.emit('preloaded', this.cached)
	}

	async _load (params = {}) {
		return await this.method( merge({
			limit: this.pageSize,
			offset: this._offset,
			filters: this._filters,
			sort: this._sort
		}, params, this._additional) )
	}

	loadingChange () {
		let loading = {
			start: !!this.loadingAll,
			more: !!this.loadingMore || !!this.loadingPreload
		}

		if (isEqual(loading, this._lastLoadingState)) return

		this._lastLoadingState = loading
		this.emit('loading', loading)
	}

	get sort() {
		return this._sort
	}

	set sort (n) {
		this._sort = n
	}

	get filters () {
		return this._filters
	}

	set filters (n) {
		this._filters = n
	}

	get additional () {
		return this._additional
	}

	set additional (n) {
		this._additional = n
	}

	get complete () {
		return this._complete
	}

	set complete (n) {
		this._complete = n
		this.emit('complete', n)
		console.log('complete', n);
	}

	get cached () {
		return this._cached
	}

	set cached (n) {
		this._cached = n
		this.emit('cached', n)
	}

	get loadingAll () {
		return this._loadingAll
	}

	set loadingAll (n) {
		this._loadingAll = n
		this.loadingChange()
	}

	get loadingMore () {
		return this._loadingMore
	}

	set loadingMore (n) {
		this._loadingMore = n
		this.loadingChange()
	}

	get loadingPreload () {
		return this._loadingPreload
	}

	set loadingPreload (n) {
		this._loadingPreload = n
		this.loadingChange()
	}
}

export default Infinite
