import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { mutationFn } from '~/lib/fetchJson'
import { useStore } from '~/store/store'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import Modal, { useModal } from '../ui/Modal'

export function UnassignMember({
	user,
}: {
	user: { id: string; name: string }
}) {
	const router = useRouter()
	const unassignModal = useModal()
	const issueId = (router.query.id as string).split(':')[1]
	const currentIssue = useStore((state) => state.currentIssue)
	const setCurrentIssue = useStore((state) => state.setCurrentIssue)

	async function handleUnassign() {
		const response = await mutationFn(`/issues/${issueId}/unassign`, {
			assignedUserId: user.id,
		})

		if (response.success) {
			setCurrentIssue({
				...currentIssue,
				...response.data.updatedIssue,
			})
			toast.success(`${user.name} has been unassigned`)
			unassignModal.close()
		}
	}
	return (
		<>
			<Button onClick={unassignModal.open} variant="ghost">
				Unassign
			</Button>
			<Modal
				className="!overflow-visible"
				size="xl"
				isOpen={unassignModal.props.open}
				onClose={unassignModal.props.onClose}
			>
				<Modal.Header dismiss>
					<Heading size="h5">Unassign Issue?</Heading>
					<p className="text-gray-500 text-sm mt-2">
						Are you sure you want to unassign this issue from {user.name} ?
					</p>
				</Modal.Header>
				<Card.Body
					noPadding
					className="flex items-center justify-end space-x-3 mt-5"
				>
					<Button variant="ghost" size="lg" onClick={unassignModal.close}>
						Cancel
					</Button>
					<Button onClick={handleUnassign} size="lg">
						Submit
					</Button>
				</Card.Body>
			</Modal>
		</>
	)
}
