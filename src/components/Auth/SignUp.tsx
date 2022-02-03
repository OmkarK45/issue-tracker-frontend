import toast from 'react-hot-toast'
import { z } from 'zod'
import fetchJson, { FetchError } from '~/lib/fetchJson'
import { useAuthRedirect } from '~/lib/useAuthRedirect'
import useUser from '~/lib/useUser'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import FormSubmitButton from '../ui/Form/SubmitButton'
import { Input } from '../ui/Input'
import { Link } from '../ui/Link'
import { AuthLayout } from './AuthLayout'

const SignUpSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2),
	password: z.string().min(5),
	username: z.string().min(2),
})

export function SignUp() {
	const authRedirect = useAuthRedirect()

	const { mutateUser } = useUser({
		redirectTo: '/products',
		redirectIfFound: true,
	})

	const form = useZodForm({
		schema: SignUpSchema,
	})

	async function handleSubmit(values: z.infer<typeof SignUpSchema>) {
		const body = {
			email: values.email,
			password: values.password,
			name: values.name,
			username: values.username,
		}

		try {
			mutateUser(
				await fetchJson('/api/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
					credentials: 'include',
				})
			)
			authRedirect()
		} catch (error) {
			if (error instanceof FetchError) {
				toast.error(error.data.message)
			} else {
				toast.error("We are sorry but something isn't right. Please try again.")
			}
		}
	}

	return (
		<AuthLayout title="Sign Up." subtitle="Sign up and join SimpleIssue!">
			<Form form={form} onSubmit={async (values) => await handleSubmit(values)}>
				<Input
					label="Your Name"
					type="text"
					placeholder="John Doe"
					{...form.register('name')}
				/>
				<Input
					label="Your Username"
					type="text"
					placeholder="im_johndoe"
					{...form.register('username')}
				/>
				<Input
					label="Email Address"
					type="email"
					placeholder="you@example.com"
					{...form.register('email')}
				/>

				<Input
					label="Password"
					type="password"
					placeholder="Your password (min 5)"
					{...form.register('password')}
				/>

				<FormSubmitButton size="lg">Sign Up</FormSubmitButton>
			</Form>
			<div>
				<Card rounded="lg" className="mt-4">
					<Card.Body>
						<span className="mr-1">Already have an account ?</span>
						<Link
							className="font-medium text-brand-600 hover:text-brand-400"
							href="/auth/login"
						>
							Log into SimpleIssue
						</Link>
					</Card.Body>
				</Card>
			</div>
		</AuthLayout>
	)
}
