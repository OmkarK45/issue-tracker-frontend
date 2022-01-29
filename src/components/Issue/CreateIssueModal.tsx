import { object, string, z } from 'zod'
import { Card } from '../ui/Card'
import Form, { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import Modal from '../ui/Modal'
import { useMemo } from 'react'
import { fetcher, mutationFn } from '~/lib/fetchJson'
import { Issue, PaginatedApiResponse } from '~/lib/types'
import { useRouter } from 'next/router'
import { useStore } from '~/store/store'
import useSWR from 'swr'
import { IssueForm } from './IssueForm'

interface Props {
	isOpen: boolean
	onClose: () => void
}

export const PRIORITY = {
	URGENT: { value: 'URGENT', label: 'Urgent' },
	HIGH: { value: 'HIGH', label: 'High' },
	MEDIUM: { value: 'MEDIUM', label: 'Medium' },
	LOW: { value: 'LOW', label: 'Low' },
}

export const STATUS = {
	OPEN: { value: 'OPEN', label: 'Open' },
	IN_PROGRESS: { value: 'IN_PROGRESS', label: 'In Progress' },
	CLOSED: { value: 'CLOSED', label: 'Closed' },
	BACKLOG: { value: 'BACKLOG', label: 'Backlog' },
	TODO: { value: 'TODO', label: 'To Do' },
	IN_REVIEW: { value: 'IN_REVIEW', label: 'In Review' },
	DONE: { value: 'DONE', label: 'Done' },
	CANCELLED: { value: 'CANCELLED', label: 'Cancelled' },
}

export const CreateIssueSchema = object({
	title: string().min(1).max(255),
	description: string().nonempty('Describe the issue in 1 character or more'),
	// sorry i dont know how to type this
	priority: z.any(),
	status: z.any(),
})

export const people = [
	{ id: 1, value: 'Bill Horsefighter' },
	{ id: 2, value: 'Amanda Hijacker' },
	{ id: 3, value: 'Leo Summerhalter' },
	{ id: 4, value: 'Jane Sinkspitter' },
]

export const tags = [
	{ id: 1, value: 'JavaScript' },
	{ id: 2, value: 'TypeScript' },
	{ id: 3, value: 'Ruby' },
	{ id: 3, value: 'Python' },
]

export function CreateIssueModal({ isOpen, onClose }: Props) {
	const form = useZodForm({
		schema: CreateIssueSchema,
	})
	const router = useRouter()

	const addNewIssue = useStore((state) => state.addNewIssue)

	const { mutate } = useSWR<PaginatedApiResponse<Issue>>(
		`/issues/${router.query.application}/all?page=1&limit=20`,
		fetcher
	)

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

	async function handleSubmit(values: z.infer<typeof CreateIssueSchema>) {
		const response = await mutationFn(`/issues/new`, {
			title: values.title,
			description: values.description,
			priority: values.priority.value,
			status: values.status.value,
			type: 'TODO',
			application_id: router.query.application,
		}).then((res) => {
			addNewIssue(res.data.newIssue)
			mutate()
		})
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
				<IssueForm
					form={form}
					handleSubmit={handleSubmit}
					mentions={mentions}
					onClose={onClose}
				/>
			</Card.Body>
		</Modal>
	)
}
