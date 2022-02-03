import type { User } from './user'
import cookie from 'cookie'
import { withIronSessionApiRoute } from 'iron-session/next'
// TODO : fix path alias
import { sessionOptions } from '../../lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default withIronSessionApiRoute(registerRoute, sessionOptions)

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
	const { email, password, name, username } = await req.body

	try {
		const response = await axios.post(
			`${process.env.API_URL}/auth/signup`,
			{ email, password, name, username },
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': 'true',
				},
			}
		)

		const user = {
			isLoggedIn: true,
			data: response.data.data,
		} as User

		req.session.user = user
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('token', response.data.data.token, {
				sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
				path: '/',
				expires: new Date(Date.now() + 60 * 60 * 1000),
				secure: process.env.NODE_ENV === 'production',
				domain:
					process.env.NODE_ENV === 'production' ? '.railway.app' : 'localhost',
			})
		)
		await req.session.save()

		res.json(user)
	} catch (error) {
		console.log('[ERROR IN Register ROUTE]:', error)
		res.status(500).json({ message: (error as Error).message })
	}
}
