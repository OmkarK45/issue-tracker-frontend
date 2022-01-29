import { PencilIcon } from '@heroicons/react/outline'
import { useEffect, useMemo } from 'react'
import { z } from 'zod'
import { mutationFn } from '~/lib/fetchJson'
import { Issue } from '~/lib/types'
import { useStore } from '~/store/store'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { useZodForm } from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import Modal, { useModal } from '../ui/Modal'
import { CreateIssueSchema, people, tags } from './CreateIssueModal'
import { IssueForm } from './IssueForm'

export function EditIssueModal({ issueDetail }: { issueDetail: Issue }) {
	const editIssueModal = useModal()

	const form = useZodForm({ schema: CreateIssueSchema })
	const setCurrentIssue = useStore((state) => state.setCurrentIssue)

	useEffect(() => {
		form.reset({
			title: issueDetail.title,
			description: issueDetail.description,
			priority: issueDetail.priority,
			status: issueDetail.status,
		})
	}, [])

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
		const response = await mutationFn(`/issues/${issueDetail.id}/update`, {
			title: values.title,
			description: values.description,
			priority: values.priority.value,
			status: values.status.value,
		})
		if (response.success) {
			setCurrentIssue(response.data.updatedIssue)
		}
	}

	return (
		<>
			<Button onClick={editIssueModal.open} size="lg" variant="dark">
				<PencilIcon
					className="-ml-1 mr-2 h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
				<span>Edit</span>
			</Button>
			<Modal
				className="!overflow-visible"
				size="5xl"
				isOpen={editIssueModal.props.open}
				onClose={editIssueModal.close}
			>
				<Modal.Header dismiss>
					<Heading size="h5">Edit this issue.</Heading>
				</Modal.Header>
				<Card.Body noPadding>
					<IssueForm
						form={form}
						handleSubmit={handleSubmit}
						mentions={mentions}
						onClose={editIssueModal.close}
					/>
				</Card.Body>
			</Modal>
		</>
	)
}
