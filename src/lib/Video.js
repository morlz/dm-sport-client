import BaseModel from '@/lib/BaseModel'
import api from '@/api'

export default class Video extends BaseModel {
	constructor (arg) {
		super({
			title: '',
			url: '',
			...arg
		})
	}

	static async getList (params) {
		let res = await api.get('videos', params)
		if (Array.isArray(res))
			res = res.map(el => new Video(el))

		return res || []
	}

	static async delete (id) {
		return new Video(await api.delete('video', { id }))
	}

	static async getOne (id) {
		return new Video(await api.get('video', { id }))
	}

	get description () {
		return this.content
	}

	async create () {
		return new Video(await api.post('video', this))
	}

	async update () {
		return new Video(await api.put('video', this))
	}

	async save () {
		return this.id === undefined ?
			await this.create()
		:	await this.update()
	}
}
