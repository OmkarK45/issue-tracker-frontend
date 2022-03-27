import router from 'next/router'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { mutationFn } from '~/lib/fetchJson'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import { Input } from '../ui/Input'
import Modal from '../ui/Modal'
import { TextArea } from '../ui/TextArea'

interface Props {
	isOpen: boolean
	onClose: () => void
}
const schema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	website: z.string().optional(),
	logo: z.string().optional(),
})

export function CreateApplicationModal({ isOpen, onClose }: Props) {
	const form = useZodForm({
		schema,
	})

	async function handleSubmit(values: z.infer<typeof schema>) {
		await mutationFn(`/app/new`, {
			...values,
		}).then((res) => {
			if (res.success) {
				toast.success(
					'Application created successfully. You will be redirected to app page.'
				)
			}
			router.push(`/${res.data.id}`)
		})
	}

	return (
		<Modal size="5xl" isOpen={isOpen} onClose={onClose}>
			<Modal.Header>
				<Heading size="h4">Create an application</Heading>
			</Modal.Header>
			<Card.Body noPadding>
				<Form form={form} onSubmit={(values) => handleSubmit(values)}>
					<Input
						label="Name of application"
						placeholder="Your application name"
						{...form.register('name')}
					/>
					<TextArea
						label="Description of your application"
						placeholder="A short description of your application"
						{...form.register('description')}
					/>
					<Input
						label="Website"
						placeholder="Your application website"
						{...form.register('website')}
					/>
					<Input
						label="Logo URL"
						placeholder="Your application logo URL"
						{...form.register('logo')}
					/>
					<Card.Body className="flex justify-end space-x-2">
						<Button onClick={onClose} size="lg" variant="dark">
							Cancel
						</Button>
						<Form.SubmitButton size="lg" type="submit">
							Create
						</Form.SubmitButton>
					</Card.Body>
				</Form>
			</Card.Body>
		</Modal>
	)
}
