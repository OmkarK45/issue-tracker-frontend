import { PencilIcon } from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import { Issue } from '~/lib/types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Interweave } from '../ui/Interweave'
import { IssueMetadata } from './IssueMetadata'

const IssueActivity = dynamic(() => import('./IssueActivity'), {
	ssr: false,
	loading: () => <p>Loading Issue Activity...</p>,
})

export function IssueDetail({ issueDetail }: { issueDetail: Issue }) {
	return (
		<main className="flex-1 relative focus:outline-none">
			<div className="py-8 xl:py-10">
				<div className="max-w-3xl relative mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl xl:grid xl:grid-cols-3">
					<div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
						<div>
							<div>
								<div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
									<div>
										<span className="text-2xl flex items-center space-x-2 font-bold text-gray-900">
											<Badge variant="orange">{issueDetail.status}</Badge>
											<p>{issueDetail.title}</p>
										</span>

										<p className="mt-2 text-sm text-gray-500">
											#{issueDetail.number} opened by{' '}
											<b className="font-medium">
												{issueDetail.createdBy.name}
											</b>
										</p>
									</div>
									<div className="mt-4 flex space-x-3 md:mt-0">
										<Button size="lg" variant="dark">
											<PencilIcon
												className="-ml-1 mr-2 h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
											<span>Edit</span>
										</Button>
									</div>
								</div>
								<div className="md:hidden">
									<IssueMetadata issueDetail={issueDetail} />
								</div>
								<div className="xl:pb-0">
									<h2 className="sr-only">Description</h2>
									<div className="prose max-w-none">
										<Interweave content={issueDetail.description} />
									</div>
								</div>
							</div>
							<div className="w-full my-32">
								<IssueActivity />
							</div>
						</div>
					</div>
					<aside className="hidden xl:block xl:pl-8">
						<IssueMetadata issueDetail={issueDetail} />
					</aside>
				</div>
			</div>
		</main>
	)
}
