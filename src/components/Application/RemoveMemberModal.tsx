import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { RiUserUnfollowLine } from 'react-icons/ri'
import useSWR from 'swr'
import { fetcher, mutationFn } from '~/lib/fetchJson'
import { ApiResponse, Application } from '~/lib/types'
import { MemberList } from '../Issue/MemberList'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ErrorFallback } from '../ui/Fallbacks/ErrorFallback'
import Form from '../ui/Form/Form'
import { Heading } from '../ui/Heading'
import Modal, { useModal } from '../ui/Modal'
import { ListCard } from './ListCard'

export function RemoveMemberModal() {
	const router = useRouter()

	const removeMemberModal = useModal()

	const { data, mutate } = useSWR<ApiResponse<Application>>(
		`/app/${router.query.application}`,
		fetcher
	)

	async function handleRemoval(email: string) {
		const response = await mutationFn(
			`/app/${router.query.application}/remove-user`,
			{ email }
		)

		if (response.success) {
			mutate()
			toast.success('Member removed successfully!')
		} else {
			toast.error('Something went wrong.')
		}
	}

	return (
		<>
			<ListCard
				title="Remove member from app"
				description="You can remove member from organization."
				icon={RiUserUnfollowLine}
				onClick={removeMemberModal.open}
			/>
			<Modal
				className="!overflow-visible"
				size="xl"
				isOpen={removeMemberModal.props.open}
				onClose={removeMemberModal.props.onClose}
			>
				<Modal.Header dismiss>
					<Heading size="h5">Remove user from organization</Heading>
					<p className="text-gray-500 text-sm">
						Choose a member to remove from organization.
					</p>
				</Modal.Header>
				<div className="mt-5 space-y-3">
					{data?.data?.members?.length === 0 && (
						<ErrorFallback noAction message="No members to remove." />
					)}
					{data?.data.members?.map((member) => (
						<div className="flex items-center justify-between">
							<MemberList name={`${member.name} - ${member.email}`} />
							<Button
								onClick={() => handleRemoval(member.email!)}
								variant="ghost"
							>
								Remove
							</Button>
						</div>
					))}
				</div>
				<Card.Body
					noPadding
					className="flex items-center justify-end space-x-3 mt-5"
				>
					<Button size="lg" onClick={removeMemberModal.close}>
						Done
					</Button>
				</Card.Body>
			</Modal>
		</>
	)
}
