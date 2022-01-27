import { object, string, z } from 'zod'
import { Input } from '../ui/Input'
import Form, { useZodForm } from '~/components/ui/Form/Form'
import { Link } from '../ui/Link'

import { AuthLayout } from './AuthLayout'
import { Card } from '../ui/Card'

import FormSubmitButton from '../ui/Form/SubmitButton'
import useUser from '~/lib/useUser'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import toast from 'react-hot-toast'
import { useAuthRedirect } from '~/lib/useAuthRedirect'

const LoginSchema = object({
	email: string().email(),
	password: string().min(6),
})

export function LoginForm() {
	const authRedirect = useAuthRedirect()

	const { mutateUser } = useUser({
		redirectTo: '/',
		redirectIfFound: true,
	})

	const form = useZodForm({
		schema: LoginSchema,
	})

	async function handleSubmit(values: z.infer<typeof LoginSchema>) {
		const body = {
			email: values.email,
			password: values.password,
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
			authRedirect()
		} catch (error) {
			console.log({ error })
			if (error instanceof FetchError) {
				toast.error(
					'Incorrect username or password. Please sign up or check creds.'
				)
			} else {
				toast.error("We are sorry but something isn't right. Please try again.")
			}
		}
	}

	return (
		<AuthLayout
			title="Sign In."
			subtitle="Welcome back! Sign in to your SimpleIssue account."
		>
			<Form
				form={form}
				onSubmit={async (values) => await handleSubmit(values)}
				className="w-full"
			>
				<Input
					label="Email"
					type="email"
					placeholder="Type your email here"
					autoComplete="email"
					autoFocus
					{...form.register('email')}
				/>

				<Input
					label="Password"
					type="password"
					placeholder="Type your password here"
					autoComplete="current-password"
					{...form.register('password')}
				/>

				<FormSubmitButton>Login</FormSubmitButton>
			</Form>
			<div>
				<Card rounded="lg" className="mt-4">
					<Card.Body>
						<span className="mr-1">Don’t have an account yet ?</span>
						<Link
							className="font-medium text-brand-600 hover:text-brand-400"
							href="/auth/signup"
						>
							Register
						</Link>
					</Card.Body>
				</Card>
			</div>
		</AuthLayout>
	)
}
