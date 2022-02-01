import { UserCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { object, string, z } from 'zod'
import { fetcher, mutationFn } from '~/lib/fetchJson'
import { Activity, PaginatedApiResponse } from '~/lib/types'
import Form, { useZodForm } from '../ui/Form/Form'
import { TextArea } from '../ui/TextArea'

const schema = object({
	text: string().min(1, 'Comment must be at least 1 character long'),
})
export function CommentForm({ page }: { page: number }) {
	const router = useRouter()
	const issueId = (router.query.id as string).split(':')[1]

	const form = useZodForm({
		schema,
	})

	const { data, mutate } = useSWR<PaginatedApiResponse<Activity>>(
		`/issues/${(router.query.id as string).split(':')[1]}/activity?page=${
			page + 1
		}&limit=10`,
		fetcher
	)

	async function handleCommentSubmission(values: z.infer<typeof schema>) {
		const response = await mutationFn(`/comments/${issueId}/comment`, {
			text: values.text,
		})
		if (response.success) {
			form.reset()
			mutate()
			toast.success('Comment added!')
		}
	}

	return (
		<div className="min-w-0 flex-1 py-1.5">
			<Form form={form} onSubmit={(values) => handleCommentSubmission(values)}>
				<TextArea
					label="Comment"
					placeholder="Write you comment."
					{...form.register('text')}
				/>
				<div className="flex justify-end">
					<Form.SubmitButton size="lg">Post Comment</Form.SubmitButton>
				</div>
			</Form>
		</div>
	)
}
