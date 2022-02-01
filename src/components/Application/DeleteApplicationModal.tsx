import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { mutationFn } from '~/lib/fetchJson'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Heading } from '../ui/Heading'
import Modal, { useModal } from '../ui/Modal'

export function DeleteApplicationModal() {
	const deleteApplicationModal = useModal()
	const router = useRouter()

	if (typeof window === 'undefined') return null

	async function handleDeleteApplication() {
		const response = await mutationFn(
			`/app/${router.query.application}/delete`,
			{}
		)
		if (response.success) {
			toast.success('Application deleted successfully!')
			window.location.replace('/my-apps')
		} else {
			toast.error(response.message)
		}
	}

	return (
		<>
			<Button onClick={deleteApplicationModal.open} variant="danger" fullWidth>
				Delete Application
			</Button>
			<Modal
				className="!overflow-visible"
				size="2xl"
				isOpen={deleteApplicationModal.props.open}
				onClose={deleteApplicationModal.props.onClose}
			>
				<Modal.Header dismiss>
					<Heading size="h5">Delete this organization?</Heading>
					<p className="text-gray-500 text-sm">
						This is destructive action and cannot be undone.
					</p>
				</Modal.Header>
				<Card.Body
					noPadding
					className="flex items-center justify-end space-x-3 mt-5"
				>
					<Button
						variant="ghost"
						size="lg"
						onClick={deleteApplicationModal.close}
					>
						Cancel
					</Button>
					<Button onClick={() => handleDeleteApplication()} size="lg">
						Delete
					</Button>
				</Card.Body>
			</Modal>
		</>
	)
}
