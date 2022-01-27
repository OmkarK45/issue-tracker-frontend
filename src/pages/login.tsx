import type { NextPage } from 'next'

import useUser from '../lib/useUser'
import fetchJson, { FetchError } from '../lib/fetchJson'
import { useState } from 'react'

const Home: NextPage = () => {
	const [errorMsg, setErrorMsg] = useState('')

	const { mutateUser } = useUser({
		redirectTo: '/profile-sg',
		redirectIfFound: true,
	})

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const body = {
			email: 'root_user2@gmail.com',
			password: 'root_user',
		}

		try {
			mutateUser(
				await fetchJson('/api/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
					credentials: 'include',
				})
			)
		} catch (error) {
			if (error instanceof FetchError) {
				setErrorMsg(error.data.message)
			} else {
				console.error('An unexpected error happened:', error)
			}
		}
	}

	// return <LoginForm />
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Home
