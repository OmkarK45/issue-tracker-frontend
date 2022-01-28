import { object, string, z } from 'zod'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import { Input } from '../ui/Input'
import Modal from '../ui/Modal'
import RichTextEditor from '../ui/RichText'
import { Controller } from 'react-hook-form'
import { Button } from '../ui/Button'
import { useMemo } from 'react'
import { Select } from '../ui/Select'
import { FaCheck } from 'react-icons/fa'
import { mutationFn } from '~/lib/fetchJson'

interface Props {
	isOpen: boolean
	onClose: () => void
}

const PRIORITY = {
	URGENT: { value: 'URGENT', label: 'Urgent' },
	HIGH: { value: 'HIGH', label: 'High' },
	MEDIUM: { value: 'MEDIUM', label: 'Medium' },
	LOW: { value: 'LOW', label: 'Low' },
}

const STATUS = {
	OPEN: { value: 'OPEN', label: 'Open' },
	IN_PROGRESS: { value: 'IN_PROGRESS', label: 'In Progress' },
	CLOSED: { value: 'CLOSED', label: 'Closed' },
	BACKLOG: { value: 'BACKLOG', label: 'Backlog' },
	TODO: { value: 'TODO', label: 'To Do' },
	IN_REVIEW: { value: 'IN_REVIEW', label: 'In Review' },
	DONE: { value: 'DONE', label: 'Done' },
	CANCELLED: { value: 'CANCELLED', label: 'Cancelled' },
}

const CreateIssueSchema = object({
	title: string().min(1).max(255),
	description: string().nonempty('Describe the issue in 1 character or more'),
	// sorry i dont know how to type this
	priority: z.any(),
	status: z.any(),
})

const people = [
	{ id: 1, value: 'Bill Horsefighter' },
	{ id: 2, value: 'Amanda Hijacker' },
	{ id: 3, value: 'Leo Summerhalter' },
	{ id: 4, value: 'Jane Sinkspitter' },
]

const tags = [
	{ id: 1, value: 'JavaScript' },
	{ id: 2, value: 'TypeScript' },
	{ id: 3, value: 'Ruby' },
	{ id: 3, value: 'Python' },
]

export function CreateIssueModal({ isOpen, onClose }: Props) {
	const form = useZodForm({
		schema: CreateIssueSchema,
	})

	const mentions = useMemo(
		() => ({
			allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
			mentionDenotationChars: ['@', '#'],
			source: (
				searchTerm: string,
				renderList: (items: any[]) => JSX.Element,
				mentionChar: string
			) => {
				const list = mentionChar === '@' ? people : tags
				const includesSearchTerm = list.filter((item) =>
					item.value.toLowerCase().includes(searchTerm.toLowerCase())
				)
				renderList(includesSearchTerm)
			},
		}),
		[]
	)

	console.log(form.formState.errors)
	async function handleSubmit(values: z.infer<typeof CreateIssueSchema>) {
		const response = await mutationFn(`/issues/new`, {
			title: values.title,
			description: values.description,
			priority: values.priority.value,
			status: values.status.value,
			type: 'TODO',
			// this will go away soon
			application_id: 'f26a8322-d4f8-4aae-906d-33d06339a5e8',
		})
		console.log('Response', response)
	}

	return (
		<Modal
			className="!overflow-visible"
			size="5xl"
			isOpen={isOpen}
			onClose={onClose}
		>
			<Modal.Header dismiss>
				<Heading size="h5">Create a new issue</Heading>
			</Modal.Header>

			<Card.Body noPadding>
				<Form form={form} onSubmit={(values) => handleSubmit(values)}>
					<Input
						label="Issue title"
						placeholder="Something is not working."
						{...form.register('title')}
					/>
					<p className="block text-sm font-medium dark:text-white">
						Describe the issue
					</p>

					<Controller
						name="description"
						control={form.control}
						render={({ field: { onChange, value } }) => {
							return (
								// @ts-ignore
								<RichTextEditor
									controls={[
										['bold', 'italic', 'underline', 'strike'],
										['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
										['link', 'code'],
									]}
									mentions={mentions}
									className="font-sans"
									onChange={onChange}
									value={value}
								/>
							)
						}}
					/>
					<div className="flex items-center space-x-2">
						<div className="flex-1">
							<Controller
								name="priority"
								control={form.control}
								render={({ field: { onChange, value } }) => {
									return (
										<Select
											onChange={onChange}
											value={value}
											label="Choose priority of the issue."
										>
											<Select.Button
												label={value ? value.label : 'Select'}
												variant={value ? 'default' : 'placeholder'}
											/>
											<Select.Options>
												{Object.entries(PRIORITY).map(([key, props]) => (
													<Select.Option
														key={key}
														value={props}
														label={props.label}
														selectedIcon={<FaCheck />}
													/>
												))}
											</Select.Options>
										</Select>
									)
								}}
							/>
						</div>
						<div className="flex-1">
							<Controller
								name="status"
								control={form.control}
								render={({ field: { onChange, value } }) => {
									return (
										<Select
											onChange={onChange}
											value={value}
											label="Choose status of the issue"
										>
											<Select.Button
												label={value ? value.label : 'Select'}
												variant={value ? 'default' : 'placeholder'}
											/>
											<Select.Options>
												{Object.entries(STATUS).map(([key, props]) => (
													<Select.Option
														key={key}
														value={props}
														label={props.label}
														selectedIcon={<FaCheck />}
													/>
												))}
											</Select.Options>
										</Select>
									)
								}}
							/>
						</div>
					</div>
					<Card.Body className="flex justify-end space-x-3">
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
