import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { RiUserAddLine } from 'react-icons/ri'
import { object, string, z } from 'zod'
import { mutationFn } from '~/lib/fetchJson'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import { Input } from '../ui/Input'
import Modal, { useModal } from '../ui/Modal'
import { ListCard } from './ListCard'

const schema = object({ email: string().nonempty('Email is required') })

export function AddMemberModal() {
	const addMemeberModal = useModal()

	const router = useRouter()

	const form = useZodForm({
		schema,
	})

	async function handleAddMember(values: z.infer<typeof schema>) {
		const response = await mutationFn(
			`/app/${router.query.application}/add-user`,
			{ email: values.email }
		)
		if (response.success) {
			toast.success('Member added successfully!')
			addMemeberModal.close()
		} else {
			console.log({ response })
			toast.error(`Failed to add member. ${response.message}`)
		}
	}
	return (
		<>
			<ListCard
				title="Add Member to app"
				description="You can add a member to your organization"
				icon={RiUserAddLine}
				onClick={addMemeberModal.open}
			/>
			<Modal
				className="!overflow-visible"
				size="2xl"
				isOpen={addMemeberModal.props.open}
				onClose={addMemeberModal.props.onClose}
			>
				<Modal.Header dismiss>
					<Heading size="h5">Add user to organization</Heading>
					<p className="text-gray-500 text-sm">
						Please enter email address of the user to be added. Please note that
						they need to have an active account on SimpleIssue to be able join
						your organization.
					</p>
				</Modal.Header>
				<Form
					className="mt-5"
					form={form}
					onSubmit={(values) => handleAddMember(values)}
				>
					<Input
						label="Email Address of member"
						{...form.register('email')}
						placeholder="member@example.com"
					/>

					<Card.Body
						noPadding
						className="flex items-center justify-end space-x-3 mt-5"
					>
						<Button variant="ghost" size="lg" onClick={addMemeberModal.close}>
							Cancel
						</Button>
						<Form.SubmitButton type="submit" size="lg">
							Add
						</Form.SubmitButton>
					</Card.Body>
				</Form>
			</Modal>
		</>
	)
}
