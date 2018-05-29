import BaseModel from '@/lib/BaseModel'
import { New } from '@/lib'
import api from '@/api'

export default class User extends BaseModel {
	constructor (arg) {
		super()
		this.define({
			news: [New]
		}, arg)
	}

	static async signin (data) {
		let res = await api.post('signin', data)
		if (res)
			return new User(res)

		return res
	}

	static async getUserData () {
		let res = await api.get('userdata')
		if (res && res != 'Unauthorized.')
			return new User(res)

		return
	}
}
