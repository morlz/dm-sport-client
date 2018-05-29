import BaseModel from '@/lib/BaseModel'
import api from '@/api'

export default class Page extends BaseModel {
	constructor (arg) {
		super(arg)
	}

	static async getOne (id) {
		return new this(await api.get('page', { id }))
	}

	async update () {
		return new Page(await api.put('/page', this))
	}

	async save () {
		return await this.update()
	}
}
