import BaseModel from '@/lib/BaseModel'
import api from '@/api'

export default class Anounce extends BaseModel {
	constructor (arg) {
		super({
			title: '',
			image: '',
			...arg
		})
	}

	static async getList (params) {
		let res = await api.get('anounces', params)
		if (Array.isArray(res))
			res = res.map(el => new Anounce(el))

		return res || []
	}

	static async delete (id) {
		return new Anounce(await api.delete('anounce', { id }))
	}

	async create () {
		let res = await api.post('anounce', this)
		if (!res.id) return

		return super.update(res)
	}

	async update () {
		let res = await api.put('anounce', this)
		if (!res.id) return

		return super.update(res)
	}

	async delete () {
		if (!this.id) return
		return await api.delete('anounce', { id: this.id })
	}

	async save () {
		return this.id === undefined ?
			await this.create()
		:	await this.update()
	}
}
