import useSWR from 'swr'
import Select from 'react-select'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form'
import { array, object, string, z } from 'zod'

import { fetcher, mutationFn } from '~/lib/fetchJson'
import { ApiResponse, Application } from '~/lib/types'

import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Heading } from '../ui/Heading'
import Modal, { useModal } from '../ui/Modal'
import Form, { useZodForm } from '../ui/Form/Form'
import { useStore } from '~/store/store'

const schema = object({
	assignee: array(string()).nonempty('Please select an assignee'),
})

export function AssignIssueModal() {
	const assignIssueModal = useModal()
	const router = useRouter()

	const setCurrentIssue = useStore((state) => state.setCurrentIssue)
	const currentIssue = useStore((state) => state.currentIssue)

	const { data, mutate } = useSWR<ApiResponse<Application>>(
		`/app/${router.query.application}`,
		fetcher
	)

	const form = useZodForm({
		schema,
	})

	if (!data || !data.data || !data.data.members) {
		return <p>Loading...</p>
	}

	const options = data.data.members.map((member) => ({
		value: member.id,
		label: member.name,
	}))
	async function handleAssignee(values: z.infer<typeof schema>) {
		const response = await mutationFn(
			`/issues/${(router.query.id as string).split(':')[1]}/assign`,
			{
				assignedUserIds: values.assignee.map((assignee) => assignee),
			}
		)
		if (response.success) {
			console.log('CUrrent issue', currentIssue, response.data.updatedIssue)

			setCurrentIssue({
				...currentIssue,
				...response.data.updatedIssue,
			})

			toast.success('Assigned issue successfully.')
			assignIssueModal.close()
			form.reset()
		} else {
			toast.error('Failed to assign issue.')
		}
	}

	return (
		<>
			<Button onClick={assignIssueModal.open} variant="ghost">
				Assign issue
			</Button>
			<Modal
				className="!overflow-visible"
				size="2xl"
				isOpen={assignIssueModal.props.open}
				onClose={assignIssueModal.props.onClose}
			>
				<Modal.Header dismiss>
					<Heading size="h5">Assign this issue</Heading>
					<p className="text-gray-500 text-sm">
						You can assign this issue to multiple users.
					</p>
				</Modal.Header>
				<Card.Body noPadding className="mt-5">
					<Form form={form} onSubmit={(values) => handleAssignee(values)}>
						<p className="block text-sm font-medium dark:text-white ">
							Choose members to assign issue to
						</p>
						<Controller
							name="assignee"
							control={form.control}
							render={({ field: { onChange, value } }) => {
								return (
									<Select
										// @ts-ignore
										options={options}
										isMulti
										// @ts-ignore -> TS does not know about onChange
										value={options.find((c) => c.value === value)}
										onChange={(val) => onChange(val.map((c) => c.value))}
									></Select>
								)
							}}
						/>

						<Card.Body className="flex items-center justify-end space-x-3">
							<Button
								size="lg"
								variant="ghost"
								onClick={assignIssueModal.close}
							>
								Cancel
							</Button>
							<Form.SubmitButton size="lg" type="submit">
								Submit
							</Form.SubmitButton>
						</Card.Body>
					</Form>
				</Card.Body>
			</Modal>
		</>
	)
}
